'use client'; // <-- MUST be the very first line

import { useEffect, useState, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { AnalyticsService } from '../../services/analyticsService';
import { CSSProperties } from 'react'; // Assuming AnalyticsService and CSSProperties types are external

const Redirect = () => {
  const router = useRouter();
  const [isIos, setIsIos] = useState(false);
  const [email, setEmail] = useState('');
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [isClient, setIsClient] = useState(false); // State to track if we are on the client side

  // Set client-side flag to true when component is mounted
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Only use search params when on the client side
  const queryParams = useMemo(() => {
    // Check if window is defined before accessing location.search
    return isClient && typeof window !== 'undefined'
      ? Object.fromEntries(new URLSearchParams(window.location.search).entries())
      : {};
  }, [isClient]);

  // Track query params with Mixpanel if they exist
  useEffect(() => {
    if (queryParams) {
      AnalyticsService.sendEvent('bepay_register_page_view', {
        ...queryParams,
        timestamp: new Date().toISOString(),
      });
    }
  }, [queryParams]);

useEffect(() => {
  if (typeof navigator === 'undefined') return;

  const userAgent = navigator.userAgent || navigator.vendor;
  const androidUrl = 'https://play.google.com/store/apps/details?id=com.bepay.user';

  const deviceDetails = {
    userAgent,
    platform: navigator.platform,
    language: navigator.language,
  };

  const isAndroid = /android/i.test(userAgent);

  const isIOS =
    /iPad|iPhone|iPod/.test(userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

  if (isAndroid) {
    AnalyticsService.sendEvent('bepay_redirect_to_android', { ...deviceDetails, ...queryParams });
    window.location.href = androidUrl;
  } 
  else if (isIOS) {
    AnalyticsService.sendEvent('bepay_redirect_to_ios_not_available', { ...deviceDetails, ...queryParams });
    setIsIos(true);
  } 
  else {
    AnalyticsService.sendEvent('bepay_redirect_to_unsupported_device', { ...deviceDetails, ...queryParams });

    const timer = setTimeout(() => {
      router.push('/');
    }, 5000);

    return () => clearTimeout(timer);
  }
}, [router, queryParams]);


  useEffect(() => {
    if (emailSubmitted) {
      const timer = setTimeout(() => {
        router.push('/');
      }, 5000);

      // Cleanup timer on component unmount
      return () => clearTimeout(timer);
    }
  }, [emailSubmitted, router]);

  const handleEmailSubmit = () => {
    if (email) {
      AnalyticsService.sendEvent('bepay_email_submitted_for_iOS', {
        email,
        timestamp: new Date().toISOString(),
        ip: true, // Ensures Mixpanel fetches location info automatically
        ...queryParams,
      });
      setEmailSubmitted(true);
    }
  };

  return (
    <div style={styles.container}>
      {isIos ? (
        !emailSubmitted ? (
          <div style={styles.message}>
            <p>
              Our Bepay app is not live on iOS yet. Share your email, and we&apos;ll notify you when we go live!
            </p>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
            />
            <button onClick={handleEmailSubmit} style={styles.button}>
              Submit
            </button>
          </div>
        ) : (
          <p style={styles.message}>Thank you! We&apos;ll notify you when Bepay goes live on iOS.</p>
        )
      ) : (
        <p style={styles.message}>Redirecting to the Bepay app store...</p>
      )}
    </div>
  );
};

// Inline styles to center the message
const styles: { container: CSSProperties; message: CSSProperties; input: CSSProperties; button: CSSProperties } = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    height: '100vh',
    textAlign: 'center',
  },
  message: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
  },
  input: {
    padding: '0.5rem',
    fontSize: '1rem',
    marginBottom: '1rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
    width: '80%',
    maxWidth: '300px',
  },
  button: {
    padding: '0.5rem 1rem',
    fontSize: '1rem',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default Redirect; 