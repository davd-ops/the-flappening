export type ComparisonCoin = 'doge' | 'shiba' | 'pepe' | 'usd';
export type TimeRange = '30d' | '90d';
// export type TimeRange = '30d' | '90d' | '180d' | '365d';

const COIN_IDS = {
  doge: 'dogecoin',
  shiba: 'shiba-inu',
  pepe: 'pepe',
  usd: 'usd'
};

export function getCoinId(comparison: ComparisonCoin): string {
  return COIN_IDS[comparison] || COIN_IDS.doge;
}