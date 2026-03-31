# App Links / Deep Links Setup Guide

## Problems Identified and Fixed

### 1. **Wrong Content-Type for apple-app-site-association**
**Problem:** The file was being served with `content-type: application/octet-stream`  
**Solution:** Added headers configuration in `next.config.mjs` to serve it as `application/json`

### 2. **No Fallback Mechanism**
**Problem:** When the app isn't installed, users just saw a 404 or the website  
**Solution:** Created middleware that detects mobile devices and redirects to Play Store/App Store if the app doesn't open

### 3. **Path Format Issues**
**Problem:** The `/*` wildcard in apple-Fapp-site-association was incorrectly formatted  
**Solution:** Cleaned up and properly formatted the paths array

## Changes Made

### 1. `next.config.mjs`
Added headers configuration to ensure proper content types:
- `/.well-known/apple-app-site-association` → `application/json`
- `/.well-known/assetlinks.json` → `application/json`

### 2. `middleware.js` (NEW)
Created middleware that:
- Detects mobile devices accessing app deep link routes
- Attempts to open the app using the deep link scheme (`bepay://`)
- Falls back to Play Store/App Store if the app doesn't open within 1.5 seconds

### 3. `apple-app-site-association`
Cleaned up formatting and path structure

## Important: Update App Store URL

In `middleware.js`, replace this line:
```javascript
const APP_STORE_URL = 'https://apps.apple.com/app/idYOUR_APP_ID';
```

With your actual App Store URL. Find your app ID from the App Store Connect.

## Mobile App Configuration Required

### For Android (React Native / Flutter)

1. **AndroidManifest.xml** - Ensure you have:
```xml
<activity android:name=".MainActivity">
  <intent-filter android:autoVerify="true">
    <action android:name="android.intent.action.VIEW" />
    <category android:name="android.intent.category.DEFAULT" />
    <category android:name="android.intent.category.BROWSABLE" />
    <data
      android:scheme="https"
      android:host="bepay.money"
      android:pathPrefix="/transactions-screen" />
    <data
      android:scheme="https"
      android:host="bepay.money"
      android:pathPrefix="/explore-screen" />
    <data
      android:scheme="https"
      android:host="bepay.money"
      android:pathPrefix="/app" />
  </intent-filter>
  
  <!-- Custom scheme for fallback -->
  <intent-filter>
    <action android:name="android.intent.action.VIEW" />
    <category android:name="android.intent.category.DEFAULT" />
    <category android:name="android.intent.category.BROWSABLE" />
    <data android:scheme="bepay" />
  </intent-filter>
</activity>
```

2. **Build Configuration**
   - Ensure the package name matches: `com.bepay.user`
   - SHA-256 certificate fingerprints in `assetlinks.json` must match your signing keys

### For iOS (React Native / Flutter)

1. **Associated Domains Capability**
   - In Xcode, add Associated Domains capability
   - Add: `applinks:bepay.money`

2. **Info.plist** - Add URL Scheme:
```xml
<key>CFBundleURLTypes</key>
<array>
  <dict>
    <key>CFBundleURLSchemes</key>
    <array>
      <string>bepay</string>
    </array>
  </dict>
</array>
```

3. **Bundle Identifier** must match: `com.bepay.money`
4. **Team ID** must match: `ZYY7TKPHNX`

## Testing Checklist

### Before Deployment
- [ ] Update `APP_STORE_URL` in `middleware.js` with actual App Store ID
- [ ] Verify mobile app has correct bundle identifier/package name
- [ ] Verify mobile app has deep link handling code
- [ ] Test locally with `npm run dev`

### After Deployment

#### Test 1: Verify File Accessibility
```bash
# Check apple-app-site-association
curl -I https://bepay.money/.well-known/apple-app-site-association

# Should return:
# Content-Type: application/json

# Check assetlinks.json
curl -I https://bepay.money/.well-known/assetlinks.json

# Should return:
# Content-Type: application/json
```

#### Test 2: iOS Universal Links
1. Send a test link via iMessage or Notes: `https://bepay.money/transactions-screen/123`
2. Long press the link - you should see "Open in BePay" option
3. Tap the link - it should open the app directly
4. If app not installed - should redirect to App Store

#### Test 3: Android App Links
1. Send a test link via WhatsApp or Email: `https://bepay.money/explore-screen/456`
2. Tap the link - should show "Open with BePay" dialog
3. If app not installed - should redirect to Play Store

#### Test 4: Web Fallback
1. Open `https://bepay.money/transactions-screen/123` in desktop browser
2. Should load the website normally (no redirection)

### Android App Links Verification
```bash
# Verify assetlinks.json is accessible
adb shell am start -a android.intent.action.VIEW -d "https://bepay.money/transactions-screen/123"

# Check verification status
adb shell pm get-app-links com.bepay.user
```

### iOS Universal Links Verification
Use Apple's App Site Association (AASA) Validator:
https://search.developer.apple.com/appsearch-validation-tool/

## Common Issues & Solutions

### Issue 1: "Content-Type is not application/json"
**Cause:** Server not applying the headers correctly  
**Solution:** 
- Clear CDN cache (Cloudflare in your case)
- Redeploy the application
- Wait 5-10 minutes for CDN propagation

### Issue 2: iOS shows "Open in Safari" instead of "Open in BePay"
**Cause:** iOS hasn't verified the association file  
**Solution:**
- Delete and reinstall the app
- iOS verifies on first install
- Check Team ID and Bundle ID match exactly

### Issue 3: Android doesn't open app automatically
**Cause:** App Links not verified  
**Solution:**
- Check `android:autoVerify="true"` in intent filter
- Verify SHA-256 fingerprints match in assetlinks.json
- Clear app data and reinstall

### Issue 4: Links work on some devices but not others
**Cause:** Different Android versions handle differently  
**Solution:**
- Ensure you're targeting Android 6.0+ (API 23+)
- Add both HTTPS and custom scheme (bepay://) handlers

## Deep Link URL Scheme

Your app should handle both:

1. **Universal/App Links (Recommended)**
   - iOS: `https://bepay.money/transactions-screen/123`
   - Android: `https://bepay.money/explore-screen/456`

2. **Custom Scheme (Fallback)**
   - `bepay://transactions-screen/123`
   - `bepay://explore-screen/456`

## Deployment Steps

1. **Deploy to production:**
   ```bash
   git add .
   git commit -m "Fix app links: Add proper headers and fallback middleware"
   git push origin your-branch
   ```

2. **Clear Cloudflare Cache:**
   - Log into Cloudflare
   - Go to Caching → Configuration
   - Click "Purge Everything"
   - Or purge specific files:
     - `https://bepay.money/.well-known/apple-app-site-association`
     - `https://bepay.money/.well-known/assetlinks.json`

3. **Verify after 5-10 minutes:**
   ```bash
   curl -I https://bepay.money/.well-known/apple-app-site-association
   ```
   
4. **Test on actual devices** (simulators may not work correctly for deep links)

## Additional Resources

- [iOS Universal Links](https://developer.apple.com/ios/universal-links/)
- [Android App Links](https://developer.android.com/training/app-links)
- [AASA Validator](https://search.developer.apple.com/appsearch-validation-tool/)
- [Google Digital Asset Links Tester](https://developers.google.com/digital-asset-links/tools/generator)
