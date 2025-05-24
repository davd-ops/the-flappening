import { Redis } from '@upstash/redis';
import { NextResponse } from 'next/server';
import axios from 'axios';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const CACHE_DURATION = 60 * 60; // 60 minutes

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const coinId = searchParams.get('coinId');
  const days = searchParams.get('days');

  const daysNum = Number(days);

  if (!coinId || !days || isNaN(daysNum)) {
    return NextResponse.json(
      { error: 'Missing or invalid parameters: coinId and numeric days are required.' },
      { status: 400 }
    );
  }

  const cacheKey = `crypto:${coinId}:${daysNum}`;

  try {
    const cachedData = await redis.get(cacheKey);
    if (cachedData) {
      return NextResponse.json(cachedData);
    }

    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart`,
      {
        params: {
          vs_currency: 'usd',
          days: daysNum,
          interval: daysNum <= 1 ? 'hourly' : 'daily',
          x_cg_demo_api_key: process.env.COINGECKO_API_KEY!
        },
      }
    );

    const data = {
      ...response.data,
      market_caps: response.data.market_caps || [],
    };

    await redis.set(cacheKey, data, {
      ex: CACHE_DURATION,
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error(`Error fetching CoinGecko data for ${coinId}:`, error);
    return NextResponse.json(
      { error: 'Failed to fetch data from CoinGecko. It might be rate limited or unavailable.' },
      { status: 500 }
    );
  }
}
