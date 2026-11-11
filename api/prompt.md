# Door-to-Door Transit Planner: Compiled Prompts

This document compiles all user prompts and requirement specifications provided throughout the development of the Door-to-Door Public Transport Planner application in chronological order.

---

### Prompt 1: Initial Product Specification
> "build a minimalist door to door planner for a traveller going around public transport. the user will key in both starting and destination postal codes and the user needs to make the decision of which bus stop to walk to from the starting destination, find out how long the walk is and which buses the user can take to get to the destination. the application should propose three options, each with walking time to the bus stop, the waiting time for the bus, the arrival time of the next bus, the actual journey on bus, and walking to the destination after getting off the bus.
>
> build just the front end for now. I will integrate the backend connection later."

---

### Prompt 2: Live Backend Connection Setup
> "1. add a serverless connection that pulls live data from LTA Data mall and OneMap using the following endpoints:
>
> #LTA Data Mall
> # Next buses at a stop (v3 - the current version; 20-second refresh):
> https://datamall2.mytransport.sg/ltaodataservice/v3/BusArrival?BusStopCode=83139
> # ...optionally one service: &ServiceNo=15
> # All requests need the header:  AccountKey:
>
> #OneMap
> # Mint a token (POST, JSON body {"email":"...","password":"..."}; lasts 3 days):
> https://www.onemap.gov.sg/api/auth/post/getToken
> # Geocode / search (Authorization header now officially required):
> https://www.onemap.gov.sg/api/common/elastic/search?searchVal=raffles%20place&returnGeom=Y&getAddrDetails=Y&pageNum=1
> # Reverse geocode (token required):
> https://www.onemap.gov.sg/api/public/revgeocode?location=1.3,103.8&buffer=40&addressType=All
> # Routing: walk | drive | cycle | pt (token required):
> https://www.onemap.gov.sg/api/public/routingsvc/route?start=1.320981,103.844150&end=1.326762,103.8559&routeType=walk
>
> 2. store this in /api folder (at project root level)
> - include 1. /health.ts and 2. /bus.ts"

---

### Prompt 3: Git Remote Synchronization
> "git push https://<GITHUB_PERSONAL_ACCESS_TOKEN>@github.com/amkgal/door-to-door-planner.git"

---

### Prompt 4: Zapier RSS 2.0 Feed Integration
> "Add an RSS 2.0 feed of this app's own live reading, so that Zapier can watch it. Change nothing else on the screen.
> 1) api/feed.js in the PROJECT ROOT, a sibling of package.json and of api/bus.js and api/health.js, never inside src/. It answers GET /api/feed with status 200 and the header Content-Type: application/rss+xml; charset=utf-8.
> 2) The feed is one <rss version="2.0"> with one <channel>: <title>, <link> (this site's address, built from the request's Host header), <description> and <lastBuildDate>. The channel holds one <item> only, the reading made now.
> 3) The item:
>    <title>: from our screen's default postal code, the stop to walk to, the walk in minutes and the next bus there, for example: From 529510: walk 5 min to stop 75009, bus 29 in 3 min
>    <description>: The postal code, the stop, the walking minutes from OneMap and the next two buses at that stop, then the time of the reading in Singapore time. If the OneMap token has expired, the title starts with Check failed and says so.
>    <link>: this site's address with ?reading= and the same rounded quarter-hour time as the guid, so that the link changes only when the guid changes.
>    <guid isPermaLink="false">: g4-door- followed by the current time in Singapore (UTC+8) rounded DOWN to the quarter hour, for example g4-door-2026-11-11T14:15+08:00. It stays the same for the whole quarter hour and changes at :00, :15, :30 and :45.
>    <pubDate>: that same rounded time in RFC 822 format, for example Wed, 11 Nov 2026 14:15:00 +0800.
> 4) Reuse the code that api/bus.js and our second service already use to fetch and simplify the data, and import that code into api/feed.js. Do not fetch this site's own address from inside the function. If our second service is called only from the browser today, move that call into a shared module that both the screen and api/feed.js import, and check that the screen still works.
> 5) Read every key with process.env, the same way api/bus.js does. Never write a key, any part of it, or its length into the feed or into an error message.
> 6) If a source fails or a key is missing, still answer 200 with valid RSS. The item title then starts with "Check failed:" and names the source and its HTTP status, so that the failure reaches my inbox.
> 7) Escape &, < and > in every text field. Put plain text in <description>, with no HTML inside it.
> 8) Set Cache-Control: s-maxage=20, stale-while-revalidate=40, the same as the bus response.
> 9) Register the same handler in server.ts as app.get("/api/feed"), importing the shared handler without copying it, so that the AI Studio preview runs it too.
> When you finish, list every file you changed, and show me the feed for one reading."

---

### Prompt 5: Git Remote Synchronization
> "git push https://<GITHUB_PERSONAL_ACCESS_TOKEN>@github.com/amkgal/door-to-door-planner.git"

---

### Prompt 6: Strict JavaScript File Cleanup in /api
> "remove bus.ts and only keep bus.js. remove health.ts and keep only health.js"

---

### Prompt 7: Git Remote Synchronization
> "git push https://<GITHUB_PERSONAL_ACCESS_TOKEN>@github.com/amkgal/door-to-door-planner.git"

---

### Prompt 8: Live Postal Code Autocomplete & Geocoding
> "for postal code entry, use the live input instead of the mock data"

---

### Prompt 9: Git Remote Synchronization
> "git push https://<GITHUB_PERSONAL_ACCESS_TOKEN>@github.com/amkgal/door-to-door-planner.git"

---

### Prompt 10: Dynamic Live Routing Without Hardcoded Candidates
> "for routing and planning, use live data from the live APIs and not hardcode any results."

---

### Prompt 11: Error Resolution (OneMap 429 Rate Limiting)
> "Fix the errors in the app
> error 0: OneMap search error for "048581": OneMap search failed with status 429
> error 1: OneMap search error for "238839": OneMap search failed with status 429
> error 2: OneMap search error for "Transit Corridor bus stop": OneMap search failed with status 429"

---

### Prompt 12: Architecture Simplification - Sole OneMap Integration
> "use only onemap and omit LTA Data mall api. use only onemap to retrieve bus arrival timing."

---

### Prompt 13: Time Synchronization & Prompt Compilation
> "the time shown are not the same, so fix that. compile the prompts used and store them in /api/prompt.md"

---

### Prompt 14: Git Remote Synchronization
> "git push https://<GITHUB_PERSONAL_ACCESS_TOKEN>@github.com/amkgal/door-to-door-planner.git"

---

### Prompt 15: Route Efficiency, Authentic Bus Services & Honest Arrival Timing
> "when there are no efficient routes involving buses, show 'consider other modes of transportation'
> when bus timings cannot be retrieved, show 'no timings available'
> the buses between venues at times are fake, so show only real buses between routes."
