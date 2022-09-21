const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
    app.use(
        createProxyMiddleware(
            ["/api/**", "/user/**", "/order/**", "/service/**"],
            {
                target: "http://localhost:7500",
                changeOrigin: true,
                secure: false,
            }
        )
    );
};
