import { createProxyMiddleware } from 'http-proxy-middleware';

export default function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://dataservice.accuweather.com', // Correct API server
      changeOrigin: true,
      pathRewrite: {
        '^/api': '', // Remove '/api' prefix when forwarding the request
      },
    })
  );
};