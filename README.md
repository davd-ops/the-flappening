# The Flappening 🐧

A real-time dashboard tracking PENGU's journey to become the world's leading memecoin by market cap. Watch as PENGU's market value approaches and potentially surpasses major memecoins like DOGE, SHIBA, and PEPE.

## Contributions

Built and maintained by $PENGU community. Any and all contributors are welcome.

### Ideas for additional features
- Holder count chart comparisons
- Transaction count chart comparisons
- Engagement/social chart comparisons

## Inspiration

Inspired by [The Flippening](https://flippening.org/)

## For Developers

### Prerequisites

- Node.js 18.x or later
- pnpm (recommended) or npm

### Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/the-flappening.git
cd the-flappening
```

2. Install dependencies:
```bash
pnpm install
# or
npm install
```

3. Create a `.env` file in the root directory and add your environment variables:
```env
UPSTASH_REDIS_REST_URL=your_redis_url
UPSTASH_REDIS_REST_TOKEN=your_redis_token
COINGECKO_API_KEY=your_coingecko_api_key
```

4. Start the development server:
```bash
pnpm dev
# or
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Available Scripts

- `pnpm dev` - Start the development server
- `pnpm build` - Build the application for production

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.