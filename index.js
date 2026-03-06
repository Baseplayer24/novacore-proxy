process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const express = require("express");
const fetch = require("node-fetch");
const app = express();

app.get("/proxy", async (req, res) => {
    const target = req.query.url;
    if (!target) return res.send("No URL provided.");

    try {
        const response = await fetch(target);
        let text = await response.text();

        // Basic rewrite for relative links
        text = text.replace(/href="\//g, `href="${target}/`);
        text = text.replace(/src="\//g, `src="${target}/`);

        res.send(text);
    } catch (e) {
        res.send("Error loading site: " + e);
    }
});

app.listen(3000, () => console.log("Proxy running"));
