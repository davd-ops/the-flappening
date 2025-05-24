import axios from 'axios';
import { ComparisonCoin } from '../components/ClientApp';

const COIN_IDS = {
  doge: 'dogecoin',
  shiba: 'shiba-inu',
  pepe: 'pepe',
  usd: 'usd'
};

export async function fetchCryptoData(coinId: string, days: number = 7) {
  if (coinId === 'usd') {
    // static USD data (always $1)
    const now = Date.now();
    const dataPoints = Array.from({ length: days + 1 }, (_, i) => {
      const timestamp = now - (days - i) * 24 * 60 * 60 * 1000;
      return [timestamp, 1];
    });

    return {
      prices: dataPoints,
      market_caps: dataPoints,
    };
  }

  try {
    const response = await axios.get(`/api/crypto/market-chart?coinId=${coinId}&days=${days}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching ${coinId} data:`, error);
    throw new Error(`Failed to fetch ${coinId} data. CoinGecko API might be rate limited.`);
  }
}

export function getCoinId(comparison: ComparisonCoin): string {
  return COIN_IDS[comparison] || COIN_IDS.doge;
}