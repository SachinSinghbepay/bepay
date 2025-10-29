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
      const html = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>Opening bepay money...</title>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                display: flex;
                justify-content: center;
                align-items: center;
                min-height: 100vh;
                margin: 0;
                background: linear-gradient(135deg, #dee0e9ff 0%, #5b585dff 100%);
                color: white;
                text-align: center;
                padding: 20px;
              }
              .container {
                max-width: 400px;
              }
              h1 {
                font-size: 24px;
                margin-bottom: 16px;
              }
              p {
                font-size: 16px;
                opacity: 0.9;
                margin-bottom: 24px;
              }
              .spinner {
                border: 3px solid rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                border-top: 3px solid white;
                width: 40px;
                height: 40px;
                animation: spin 1s linear infinite;
                margin: 0 auto 20px;
              }
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
              .store-button {
                display: inline-block;
                background: white;
                color: #d0d3e0ff;
                padding: 12px 32px;
                border-radius: 8px;
                text-decoration: none;
                font-weight: 600;
                margin-top: 20px;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="spinner"></div>
              <h1>Opening BePay App...</h1>
              <p>If the app doesn't open automatically, please download it from the store.</p>
              <a href="${isAndroid ? PLAY_STORE_URL : APP_STORE_URL}" class="store-button" id="storeLink">
                Open ${isAndroid ? 'Play Store' : 'App Store'}
              </a>
            </div>
            <script>
              // Attempt to open the app using the deep link
              const deepLink = '${deepLinkUrl}';
              const storeUrl = '${isAndroid ? PLAY_STORE_URL : APP_STORE_URL}';
              const startTime = Date.now();
              
              // Try to open the app
              window.location.href = deepLink;
              
              // Set a timeout to redirect to store if app doesn't open
              // If the app opens, the page will be hidden and this won't execute
              const timeout = setTimeout(() => {
                const elapsedTime = Date.now() - startTime;
                // If less than 2 seconds have passed, the app probably didn't open
                if (elapsedTime < 2000) {
                  window.location.href = storeUrl;
                }
              }, 1500);
              
              // Clean up on page hide (app opened successfully)
              document.addEventListener('visibilitychange', () => {
                if (document.hidden) {
                  clearTimeout(timeout);
                }
              });
              
              // For iOS, listen for pagehide event
              window.addEventListener('pagehide', () => {
                clearTimeout(timeout);
              });
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