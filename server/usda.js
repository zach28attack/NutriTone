const https = require("node:https");

// Keep provider credentials in the server environment and out of browser bundles.
module.exports = (req, res) => {
  const key = process.env.USDA_API_KEY;
  if (!key || !key.trim()) return res.status(503).json({message: "USDA_API_KEY must be configured"});
  const query = typeof req.query.query === "string" ? req.query.query.trim() : "";
  if (!query || query.length > 200) return res.status(400).json({message: "A search query of 1 to 200 characters is required"});
  const url = new URL("https://api.nal.usda.gov/fdc/v1/foods/search");
  url.searchParams.set("api_key", key);
  url.searchParams.set("query", query);
  const upstream = https.get(url, {headers: {Accept: "application/json", "User-Agent": "NutriTone"}}, (response) => {
    let body = "";
    response.setEncoding("utf8");
    response.on("data", (chunk) => { body += chunk; });
    response.on("error", () => {
      if (!res.headersSent) res.status(502).json({message: "Provider request failed"});
    });
    response.on("end", () => {
      if (res.headersSent) return;
      if (response.statusCode !== 200) return res.status(502).json({message: "Provider request failed"});
      try { res.json(JSON.parse(body)); }
      catch { res.status(502).json({message: "Invalid provider response"}); }
    });
  });
  upstream.setTimeout(10000, () => upstream.destroy());
  upstream.on("error", () => {
    if (!res.headersSent) res.status(502).json({message: "Provider request failed"});
  });
};
