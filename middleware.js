import { NextResponse } from "next/server";

// Define routes that should trigger app deep linking
const APP_DEEP_LINK_ROUTES = [
  "/transactions-screen",
  "/explore-screen",
  "/app",
];

// Play Store and App Store URLs
const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.bepay.user";
const APP_STORE_URL = "https://apps.apple.com/app/6749352458"; // Replace with your actual App Store ID

export async function middleware(request) {
  const { pathname, search } = request.nextUrl;
  const userAgent = request.headers.get("user-agent") || "";

  // ─────────────────────────────────────────────
  // 🌍 COUNTRY DETECTION (works both locally and on Vercel)
  // ─────────────────────────────────────────────
  let country = request.geo?.country || "";

  if (!country) {
    try {
      // NOTE: Relying solely on Vercel's geo headers is best practice,
      // but the fallback to an external API remains for non-Vercel environments.
      const res = await fetch("https://ipapi.co/json/");
      const data = await res.json();
      country = data.country_code || "";
      console.log("Detected country (via API):", country);
    } catch (error) {
      console.error("Geo detection failed:", error);
    }
  }

  // ─────────────────────────────────────────────
  // 🌏 COUNTRY-BASED REDIRECT SECTION (MODIFIED)
  // Ensures redirect to /upi happens EVERY time for IN users
  // Unless they manually navigate to personal page via ?personal=true
  // ─────────────────────────────────────────────
  if (pathname === "/" || pathname === "/index.html") {
    const url = new URL(request.url);
    const isPersonalPage = url.searchParams.get("personal") === "true";
    
    if (country === "IN" && !isPersonalPage) {
      // **Redirect Indian users to /upi by default**
      // They can access personal page via /?personal=true
      return NextResponse.redirect(new URL("/upi", request.url));
    }
    
  }

  // ─────────────────────────────────────────────
  // 📱 APP DEEP LINK HANDLING SECTION
  // ─────────────────────────────────────────────
  const isAppRoute = APP_DEEP_LINK_ROUTES.some((route) =>
    pathname.startsWith(route)
  );

  if (isAppRoute) {
    const isMobile = /android|iphone|ipad|ipod/i.test(userAgent);
    const isAndroid = /android/i.test(userAgent);
    const isIOS = /iphone|ipad|ipod/i.test(userAgent);

    if (isMobile) {
      const deepLinkUrl = `bepay://${pathname}${search}`;

      // (The rest of your HTML/JS deep-linking logic remains the same)
      const html = `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="utf-8">
            <title>Opening BePay Money...</title>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <style>
              :root { color-scheme: light dark; }
              body {
                font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                display: flex; justify-content: center; align-items: center;
                min-height: 100vh; margin: 0;
                background-color: #000; color: #fff; text-align: center; padding: 24px;
              }
              .container { max-width: 380px; width: 100%; }
              .spinner {
                border: 2px solid rgba(255,255,255,0.1);
                border-top: 2px solid white;
                border-radius: 50%;
                width: 42px; height: 42px;
                animation: spin 1s linear infinite;
                margin: 0 auto 20px;
              }
              @keyframes spin { 0% {transform: rotate(0);} 100% {transform: rotate(360deg);} }
              .store-button {
                display: inline-block; background: #fff; color: #000;
                padding: 12px 32px; border-radius: 30px;
                text-decoration: none; font-weight: 600; transition: all 0.3s ease;
              }
              .store-button:hover { background: #000; color: #fff; border: 1px solid #fff; }
              .logo { font-size: 18px; font-weight: 700; margin-bottom: 24px; letter-spacing: 1px; }
              footer { margin-top: 40px; font-size: 13px; opacity: 0.5; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="logo">BePay Money</div>
              <div class="spinner"></div>
              <h1>Opening BePay Money...</h1>
              <p>If the app doesn’t open automatically, you can download it below.</p>
              <a href="${
                isAndroid ? PLAY_STORE_URL : APP_STORE_URL
              }" class="store-button" id="storeLink">
                Open ${isAndroid ? "Play Store" : "App Store"}
              </a>
              <footer>© 2025 BePay Money</footer>
            </div>

            <script>
              const deepLink = '${deepLinkUrl}';
              const storeUrl = '${isAndroid ? PLAY_STORE_URL : APP_STORE_URL}';
              const startTime = Date.now();

              window.location.href = deepLink;

              const timeout = setTimeout(() => {
                const elapsedTime = Date.now() - startTime;
                if (elapsedTime < 2000) window.location.href = storeUrl;
              }, 1500);

              document.addEventListener('visibilitychange', () => {
                if (document.hidden) clearTimeout(timeout);
              });
              window.addEventListener('pagehide', () => clearTimeout(timeout));
            </script>
          </body>
        </html>
      `;

      return new NextResponse(html, {
        headers: { "Content-Type": "text/html" },
      });
    }
  }

  return NextResponse.next();
}

// Configure which routes the middleware applies to
export const config = {
  matcher: [
    "/", // Root for country redirect
    "/transactions-screen/:path*",
    "/explore-screen/:path*",
    "/app/:path*",
  ],
};
