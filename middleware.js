import { NextResponse } from "next/server";
import { APP_DOWNLOAD_LINKS } from "./lib/appDownloadLinks";

// Define routes that should trigger app deep linking
const APP_DEEP_LINK_ROUTES = [
  "/transactions-screen",
  "/explore-screen",
  "/app",
];

export async function middleware(request) {
  const { pathname, search } = request.nextUrl;
  const userAgent = request.headers.get("user-agent") || "";

  if (pathname === "/dapps/index" || pathname.startsWith("/dapps/index/")) {
    const directoryPath = pathname.replace(/^\/dapps\/index/, "/dapps/directory");
    const rewriteUrl = new URL(`${directoryPath}${search}`, request.url);
    return NextResponse.rewrite(rewriteUrl);
  }

  // ─────────────────────────────────────────────
  // 🔐 BLOG CMS AUTH GUARD
  // ─────────────────────────────────────────────
  if (pathname.startsWith("/blogDashboard") && !pathname.startsWith("/blogDashboard/login")) {
    const token = request.cookies.get("blog_cms_token");
    if (!token?.value) {
      const loginUrl = new URL("/blogDashboard/login", request.url);
      return NextResponse.redirect(loginUrl);
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

    if (isMobile) {
      const deepLinkUrl = `bepay://${pathname}${search}`;

     
      const html = `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="utf-8">
            <title>Opening bepay money...</title>
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
              <div class="logo">bepay money</div>
              <div class="spinner"></div>
              <h1>Opening bepay money...</h1>
              <p>If the app doesn’t open automatically, you can download it below.</p>
              <a href="${
                isAndroid ? APP_DOWNLOAD_LINKS.android : APP_DOWNLOAD_LINKS.ios
              }" class="store-button" id="storeLink">
                Open ${isAndroid ? "Play Store" : "App Store"}
              </a>
              <footer>© 2025 bepay money</footer>
            </div>

            <script>
              const deepLink = '${deepLinkUrl}';
              const storeUrl = '${isAndroid ? APP_DOWNLOAD_LINKS.android : APP_DOWNLOAD_LINKS.ios}';
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
    "/transactions-screen/:path*",
    "/explore-screen/:path*",
    "/app/:path*",
    "/dapps/index",
    "/dapps/index/:path*",
    "/blogDashboard/:path*",
    "/blogDashboard",
  ],
};
