import { NextResponse } from 'next/server';

// Define routes that should trigger app deep linking
const APP_DEEP_LINK_ROUTES = [
  '/transactions-screen',
  '/explore-screen',
  '/app',
];

// Play Store and App Store URLs
const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.bepay.user';
const APP_STORE_URL = 'https://apps.apple.com/app/6749352458'; // Replace with your actual App Store ID

export function middleware(request) {
  const { pathname, search } = request.nextUrl;
  const userAgent = request.headers.get('user-agent') || '';
  
  // Check if the current path matches any app deep link route
  const isAppRoute = APP_DEEP_LINK_ROUTES.some(route => pathname.startsWith(route));
  
  if (isAppRoute) {
    // Check if it's a mobile device
    const isMobile = /android|iphone|ipad|ipod/i.test(userAgent);
    const isAndroid = /android/i.test(userAgent);
    const isIOS = /iphone|ipad|ipod/i.test(userAgent);
    
    if (isMobile) {
      // For mobile devices, we'll use a custom page that attempts to open the app
      // and falls back to the store if the app is not installed
      const deepLinkUrl = `bepay://${pathname}${search}`;
      
// Create a response that includes meta tags for app linking
// --- FIX: Removed backslashes (\) from all template variables ${...} ---
const html = `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="utf-8">
      <title>Opening BePay Money...</title>
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <style>
        :root {
          color-scheme: light dark;
        }
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          margin: 0;
          background-color: #000;
          color: #fff;
          text-align: center;
          padding: 24px;
        }
        .container {
          max-width: 380px;
          width: 100%;
        }
        h1 {
          font-size: 22px;
          font-weight: 600;
          margin-bottom: 12px;
          letter-spacing: 0.5px;
        }
        p {
          font-size: 15px;
          line-height: 1.5;
          color: rgba(255,255,255,0.7);
          margin-bottom: 28px;
        }
        .spinner {
          border: 2px solid rgba(255, 255, 255, 0.1);
          border-top: 2px solid white;
          border-radius: 50%;
          width: 42px;
          height: 42px;
          animation: spin 1s linear infinite;
          margin: 0 auto 20px;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .store-button {
          display: inline-block;
          background: #fff;
          color: #000;
          padding: 12px 32px;
          border-radius: 30px;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s ease;
        }
        .store-button:hover {
          background: #000;
          color: #fff;
          border: 1px solid #fff;
        }
        .logo {
          font-size: 18px;
          font-weight: 700;
          margin-bottom: 24px;
          letter-spacing: 1px;
          color: #fff;
        }
        footer {
          margin-top: 40px;
          font-size: 13px;
          opacity: 0.5;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="logo">BePay Money</div>
        <div class="spinner"></div>
        <h1>Opening BePay Money...</h1>
        <p>If the app doesn’t open automatically, you can download it below.</p>
        <a href="${isAndroid ? PLAY_STORE_URL : APP_STORE_URL}" class="store-button" id="storeLink">
          Open ${isAndroid ? 'Play Store' : 'App Store'}
        </a>
        <footer>© 2025 BePay Money</footer>
      </div>

      <script>
        const deepLink = '${deepLinkUrl}';
        const storeUrl = '${isAndroid ? PLAY_STORE_URL : APP_STORE_URL}';
        const startTime = Date.now();

        // Try to open the app
        window.location.href = deepLink;

        // Fallback to store if app not opened
        const timeout = setTimeout(() => {
          const elapsedTime = Date.now() - startTime;
          if (elapsedTime < 2000) {
            window.location.href = storeUrl;
          }
        }, 1500);

        // Cleanup if app opens successfully
        document.addEventListener('visibilitychange', () => {
          if (document.hidden) clearTimeout(timeout);
        });
        window.addEventListener('pagehide', () => clearTimeout(timeout));
      </script>
    </body>
  </html>
`;

      
      return new NextResponse(html, {
        headers: {
          'Content-Type': 'text/html',
        },
      });
    }
  }
  
  return NextResponse.next();
}

// Configure which routes should be handled by this middleware
export const config = {
  matcher: [
    '/transactions-screen/:path*',
    '/explore-screen/:path*',
    '/app/:path*',
  ],
};