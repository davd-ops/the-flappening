export function generateSchemaMarkup() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "The Flappening",
    "description": "Track PENGU's journey to become the world's leading memecoin by market cap. Compare with DOGE, SHIBA, PEPE and more in real-time.",
    "url": "https://theflappening.com",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "author": {
      "@type": "Person",
      "name": "David Bailey"
    }
  };

  return JSON.stringify(schema);
}