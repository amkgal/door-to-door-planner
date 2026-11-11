/**
 * /api/health.js - Service health and API configuration inspector
 */
export function getHealthData() {
  const hasLtaKey = Boolean(
    process.env.LTA_ACCOUNT_KEY && process.env.LTA_ACCOUNT_KEY !== 'YOUR_LTA_ACCOUNT_KEY'
  );
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
    services: {
      ltaDataMall: {
        configured: hasLtaKey,
        endpoint: 'https://datamall2.mytransport.sg/ltaodataservice/v3/BusArrival',
        version: 'v3 (20-second cache)',
        note: hasLtaKey
          ? 'Ready for live arrival queries'
          : 'LTA_ACCOUNT_KEY missing, using deterministic simulated live feeds',
      },
      oneMap: {
        configured: hasOneMapToken || hasOneMapCreds,
        hasToken: hasOneMapToken,
        endpoints: {
          token: 'https://www.onemap.gov.sg/api/auth/post/getToken',
          search: 'https://www.onemap.gov.sg/api/common/elastic/search',
          reverseGeocode: 'https://www.onemap.gov.sg/api/public/revgeocode',
          routing: 'https://www.onemap.gov.sg/api/public/routingsvc/route',
        },
        note:
          hasOneMapToken || hasOneMapCreds
            ? 'OneMap API authentication configured'
            : 'OneMap credentials missing, using internal SG postal coordinates and fallback routing',
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
