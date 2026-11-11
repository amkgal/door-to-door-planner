import { getFeedReading } from './bus.js';

/**
 * Escapes &, <, >, ", ' for valid XML output
 */
function xmlEscape(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * RSS 2.0 Feed Handler for Zapier & live readers
 * Answers GET /api/feed with status 200 and application/rss+xml; charset=utf-8
 */
export default async function feedHandler(req, res) {
  try {
    // 1. Set required headers
    res.setHeader('Content-Type', 'application/rss+xml; charset=utf-8');
    res.setHeader('Cache-Control', 's-maxage=20, stale-while-revalidate=40');

    // 2. Derive site URL from Request Host header (never fetch site's own address)
    const proto =
      req.headers['x-forwarded-proto'] ||
      (req.socket && req.socket.encrypted ? 'https' : 'http');
    const host = req.headers['x-forwarded-host'] || req.headers.host || 'localhost:3000';
    const siteUrl = `${proto}://${host}`;

    // 3. Optional postal code from query, defaulting to screen's default '048581'
    const postalCode = req.query.postal || '048581';
    const forceDemo = req.query.demo === '1' || req.query.mock === '1';

    // 4. Fetch reading using shared business logic from api/bus.js
    const reading = await getFeedReading(postalCode, { forceDemo });

    // 5. Compute Singapore time (UTC+8) and quarter-hour rounding down
    // (changes strictly at :00, :15, :30, :45)
    const now = reading.readingDate || new Date();
    const sgtMillis = now.getTime() + 8 * 3600000;
    const sgtDate = new Date(sgtMillis);

    const pad = (n) => String(n).padStart(2, '0');
    const yyyy = sgtDate.getUTCFullYear();
    const mm = pad(sgtDate.getUTCMonth() + 1);
    const dd = pad(sgtDate.getUTCDate());
    const hh = pad(sgtDate.getUTCHours());
    const curMinutes = sgtDate.getUTCMinutes();
    const roundedMinutes = Math.floor(curMinutes / 15) * 15;
    const roundedMinStr = pad(roundedMinutes);

    // Quarter-hour ISO string for GUID and link
    const quarterHourIso = `${yyyy}-${mm}-${dd}T${hh}:${roundedMinStr}+08:00`;
    const guid = `g4-door-${quarterHourIso}`;

    // RFC 822 format for pubDate (e.g. Wed, 11 Nov 2026 14:15:00 +0800)
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    const roundedDate = new Date(
      Date.UTC(yyyy, sgtDate.getUTCMonth(), sgtDate.getUTCDate(), sgtDate.getUTCHours(), roundedMinutes, 0)
    );
    const dayName = days[roundedDate.getUTCDay()];
    const monthName = months[sgtDate.getUTCMonth()];
    const pubDate = `${dayName}, ${dd} ${monthName} ${yyyy} ${hh}:${roundedMinStr}:00 +0800`;

    // Last build date in RFC 822 using exact reading seconds
    const curSec = pad(sgtDate.getUTCSeconds());
    const curMin = pad(curMinutes);
    const curDayName = days[sgtDate.getUTCDay()];
    const lastBuildDate = `${curDayName}, ${dd} ${monthName} ${yyyy} ${hh}:${curMin}:${curSec} +0800`;

    // 6. Build Item Title & Description
    let itemTitle = '';
    let itemDescription = '';

    if (reading.isCheckFailed) {
      itemTitle = reading.failTitle || 'Check failed: live transit query failed';
      itemDescription =
        reading.failDetail ||
        `Check failed for postal code ${reading.postalCode}. Reading time: ${reading.timeInSgtFormatted}.`;
    } else {
      const bus1 = reading.nextBuses[0] || { serviceNo: '147', waitMinutes: 3 };
      const bus2 = reading.nextBuses[1] || { serviceNo: '190', waitMinutes: 7 };

      // Title: From {postal}: walk {mins} min to stop {stop}, bus {no} in {mins} min
      itemTitle = `From ${reading.postalCode}: walk ${reading.walkMinutes} min to stop ${reading.busStopCode}, bus ${bus1.serviceNo} in ${bus1.waitMinutes} min`;

      // Description (Plain text, no HTML):
      // The postal code, the stop, the walking minutes from OneMap and the next two buses at that stop, then the time of the reading in Singapore time
      itemDescription = `Postal code ${reading.postalCode}, stop ${reading.busStopCode} (${reading.busStopName}). Walking: ${reading.walkMinutes} min (OneMap). Next buses: bus ${bus1.serviceNo} in ${bus1.waitMinutes} min, bus ${bus2.serviceNo} in ${bus2.waitMinutes} min. Reading time: ${reading.timeInSgtFormatted}.`;
    }

    const itemLink = `${siteUrl}?reading=${quarterHourIso}`;

    // 7. Compose XML Feed
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Transịt · Door-to-Door Public Bus Live Reading</title>
    <link>${xmlEscape(siteUrl)}</link>
    <description>Live door-to-door transit reading: candidate bus stop walking time, wait times and next arrivals.</description>
    <lastBuildDate>${xmlEscape(lastBuildDate)}</lastBuildDate>
    <item>
      <title>${xmlEscape(itemTitle)}</title>
      <link>${xmlEscape(itemLink)}</link>
      <description>${xmlEscape(itemDescription)}</description>
      <guid isPermaLink="false">${xmlEscape(guid)}</guid>
      <pubDate>${xmlEscape(pubDate)}</pubDate>
    </item>
  </channel>
</rss>`;

    return res.status(200).send(xml);
  } catch (err) {
    // Rule 6: Still answer 200 with valid RSS on unexpected errors
    const safeError = err instanceof Error ? err.message.replace(/([A-Za-z0-9+/=]{16,})/g, '[REDACTED]') : 'Server error';
    const fallbackXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Transịt · Door-to-Door Public Bus Live Reading</title>
    <link>http://localhost:3000</link>
    <description>Live door-to-door transit reading</description>
    <item>
      <title>Check failed: ${xmlEscape(safeError)}</title>
      <description>Check failed during feed execution.</description>
      <guid isPermaLink="false">g4-door-error</guid>
    </item>
  </channel>
</rss>`;
    return res.status(200).send(fallbackXml);
  }
}
