// https://api.github.com/users
// "https://api.github.com/users?per_page=20"



//  const url = "https://text.pollinations.ai/" + encodeURIComponent(message);



// # Get latest rates with USD as base
// https://api.frankfurter.dev/v1/latest?base=USD

// # Convert USD to INR specifically
// https://api.frankfurter.dev/v1/latest?base=USD&symbols=INR

// # Get multiple targets at once
// https://api.frankfurter.dev/v1/latest?base=INR&symbols=USD,EUR,GBP,JPY

// # Historical rate on a specific date
// https://api.frankfurter.dev/v1/2024-01-15?base=USD&symbols=INR

// # Time series (rates over a date range, good for graphs)
// https://api.frankfurter.dev/v1/2026-01-01..2026-06-01?base=USD&symbols=INR

// # List of all supported currencies
// https://api.frankfurter.dev/v1/currencies




// # Bitcoin price in USD
// https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd

// # Bitcoin price in INR (for Indian students!)
// https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=inr

// # Multiple coins, multiple currencies, with 24h change + market cap
// https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,dogecoin&vs_currencies=usd,inr&include_24hr_change=true&include_market_cap=true

// # Top 50 coins by market cap (great for a "crypto leaderboard" project)
// https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1

// # Historical price chart data (last 30 days, for graphs)
// https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=30

// # Search any coin by name
// https://api.coingecko.com/api/v3/search?query=shiba