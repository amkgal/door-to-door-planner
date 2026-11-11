/**
 * /api/health.js - Service health and OneMap API configuration inspector
 */
export function getHealthData() {
  const hasOneMapToken = Boolean(
    process.env.ONEMAP_TOKEN && process.env.ONEMAP_TOKEN !== 'OPTIONAL_PREMINTED_ONEMAP_TOKEN'
  );
  const hasOneMapCreds = Boolean(
    process.env.ONEMAP_EMAIL &&
      process.env.ONEMAP_PASSWORD &&
      process.env.ONEMAP_EMAIL !== 'YOUR_ONEMAP_EMAIL'
  );

  return {
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
    provider: 'OneMap API (Singapore Land Authority)',
    services: {
      oneMap: {
        configured: hasOneMapToken || hasOneMapCreds,
        hasToken: hasOneMapToken,
        endpoints: {
          token: 'https://www.onemap.gov.sg/api/auth/post/getToken',
          search: 'https://www.onemap.gov.sg/api/common/elastic/search',
          reverseGeocode: 'https://www.onemap.gov.sg/api/public/revgeocode',
          publicTransportRouting: 'https://www.onemap.gov.sg/api/public/routingsvc/route?routeType=pt',
          walkingRouting: 'https://www.onemap.gov.sg/api/public/routingsvc/route?routeType=walk',
        },
        features: [
          'Postal code & address geocoding',
          'Reverse geocoding',
          'Pedestrian walking routing',
          'Public transport bus arrival timings & itineraries',
        ],
        note:
          hasOneMapToken || hasOneMapCreds
            ? 'OneMap API authentication configured for live queries'
            : 'OneMap credentials optional; using local Singapore postal & bus stop directory with rate-limit protection',
      },
    },
  };
}

export default function healthHandler(req, res) {
  try {
    const health = getHealthData();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(health);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    res.status(500).json({ status: 'error', error: message });
  }
}
