'use client'
import React from 'react';
import { motion } from 'framer-motion';
import { AnalyticsService } from '@/services/analyticsService';

const GlobalNetworkCoverage = ({ globeImagePath }) => {
  const [isMobile, setIsMobile] = React.useState(false);
  const sectionRef = React.useRef(null);
  const [hasTrackedView, setHasTrackedView] = React.useState(false);

  // use IntersectionObserver to track when the section enters viewport (consistent with merchant-section)
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTrackedView) {
          try {
            AnalyticsService.sendEvent('Global Network IGPS viewed');
          } catch (e) {}
          setHasTrackedView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    const current = sectionRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [hasTrackedView]);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Constants for box styles based on the provided dimensions and color
  // Keeping the width, radius, and background color consistent
  const boxWidth = '567px';
  const boxBorderRadius = '44px';
  const boxBackgroundColor = '#F0F0F0';
  const globalBackgroundColor = '#F9F9F9';

  // New text styles based on your specifications
  const textStyle = {
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: '600', // SemiBold
    fontSize: '16px',
    lineHeight: '24px',
    letterSpacing: '-0.02em', // -2%
    color: '#333',
    // leading-trim: CAP_HEIGHT is a CSS feature not directly supported in standard React inline styles,
    // but the font family, size, weight, and line-height are applied.
  };

  // Mobile card text style (user requested)
  const cardMobileTextStyle = {
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: 600,
    fontStyle: 'normal',
    fontSize: '12px',
    lineHeight: '18px',
    letterSpacing: '-0.02em', // -2%
    color: '#333'
    // leading-trim: CAP_HEIGHT is not available via inline styles
  };

  // --- Styles for the main component ---

  const mainContainerStyle = {
    fontFamily: 'var(--font-montserrat)', // Use global Montserrat variable so headings inherit Montserrat
    padding: isMobile ? '0px 0px' : '60px 40px',
    backgroundColor: globalBackgroundColor,
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  const contentWrapperStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    maxWidth: '1400px',
    marginTop: '50px',
    gap: '60px',
  };

  // Mobile styles
  const mobileStyles = `
    .desktop-only { display: block; }
    .mobile-only { display: none; }

  

    @media (min-width: 768px) and (max-width: 1023px) {
      .content-wrapper {
        margin-top: 80px !important;
      }
      
      .globe-container {
        margin-top: 0 !important;
      }
      
      .bottom-text {
        margin-top: 30px !important;
        margin-bottom: 40px !important;
        font-size: 18px !important;
        line-height: 26px !important;
        width: 80% !important;
        max-width: 600px !important;
      }
    }

    @media (max-width: 1023px) {
      .content-wrapper {
        flex-direction: column !important;
        align-items: center !important;
        gap: 20px !important;
        margin-top: 30px !important;
      }
      
      .globe-container {
        margin-left: 0 !important;
        order: 1;
      }
      
      .globe-container img {
        width: 90% !important;
        height: auto !important;
        max-width: 400px !important;
      }
      
      .right-content {
        margin-left: 0 !important;
        order: 3;
        align-items: center !important;
        width: 98% !important;
        margin-top: 20px !important;
      }
      
      .bottom-text {
        margin-top: 20px !important;
        margin-left: 0 !important;
        text-align: center !important;
        align-self: center !important;
        width: 90% !important;
        order: 2;
        font-family: Montserrat, sans-serif !important;
        font-weight: 700 !important;
        font-size: 12px !important;
        line-height: 24px !important;
        letter-spacing: -0.02em !important;
      }

      .desktop-only { display: none !important; }
      .mobile-only { display: block !important; }
      
      .main-title {
        font-family: Montserrat, sans-serif !important;
        font-weight: 600 !important;
        font-size: 30px !important;
        line-height: 18px !important;
        letter-spacing: -0.06em !important;
        text-transform: capitalize !important;
        text-align: center !important;
      }
    }
  `;

  const globeContainerStyle = {
    display: 'flex',
    justifyContent: isMobile ? 'center' : 'flex-start',
    alignItems: 'center',
    position: 'relative',
    marginLeft: isMobile ? '0' : '100px',
    marginTop: isMobile ? '0' : '-40px', // nudge globe up slightly on desktop
  };

  const rightContentStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    marginLeft: '100px'
  };

  const textBoxBaseStyle = {
    backgroundColor: boxBackgroundColor,
    padding: '30px',
    borderRadius: boxBorderRadius,
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
    position: 'relative',
    // Using the specified width for consistency, adjusting only slightly for visual flow
    width: isMobile ? '98%' : '467px', 
    minHeight: isMobile ? 'auto' : '282px', // Use minHeight for flexible content, or adjust padding to hit the target height
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center', // Vertically center content if box height is enforced
  };

  // --- JSX Structure ---

  return (
    <div ref={sectionRef} style={mainContainerStyle}>
      <style>{mobileStyles}</style>
      
      {/* Title */}
      <h1 className='main-title md:-mt-10 mt-12 md:whitespace-nowrap' style={{ fontSize: '60px', fontWeight: 'bold', color: '#333', marginBottom: '2px' }}>
        Global Network <span style={{ color: '#ccc' }}>Coverage</span>
      </h1>

      {/* Main Content: Globe and Text Boxes */}
      <div className="content-wrapper" style={contentWrapperStyle}>

        {/* Left side: Globe Image */}
        <div className="globe-container mt-10" style={globeContainerStyle}>
          <img
            src="/globe.png" 
            alt="Global Network Globe with Flags"
            onClick={() => { try { AnalyticsService.sendEvent('Global Globe Clicked'); } catch (e) {} }}
            style={{
              width: isMobile ? '90%' : '480px',
              maxWidth: '100%',
              height: 'auto',
              display: 'block',
              margin: isMobile ? '0 auto' : undefined,
              cursor: 'pointer'
            }}
          />

          {/* Desktop-only caption centered below the globe image */}
          <div
            className="desktop-caption lg:whitespace-nowrap  desktop-only"
            style={{
              position: 'absolute',
              bottom: isMobile ? 'auto' : '-56px',
              left: '50%',
              transform: 'translateX(-50%)',
              fontSize: isMobile ? '12px' : '20px',
              color: '#333',
              fontWeight: 700,
              fontFamily: 'Montserrat, sans-serif',
              lineHeight: '24px',
              letterSpacing: '-0.02em',
              // whiteSpace: 'nowrap', // keep caption on one line on desktop
              textAlign: 'center',
              width: 'auto'
            }}
          >
            <p style={{ margin: 0 }}>
              <span style={{ color: '#080808' }}>+100 other countries</span>
              {' '}
              <span style={{ color: '#6A6A6A' }}>supported via global hybrid rails</span>
            </p>
          </div>
        </div>

        {/* Mobile-only bottom text: appears below the globe on small screens */}
        <div className="bottom-text mobile-only" style={{
          marginTop: '0px',
          fontSize: '16px',
          color: '#333',
          fontWeight: '700',
          fontFamily: 'Montserrat, sans-serif',
          lineHeight: '24px',
          letterSpacing: '-0.02em',
          textAlign: 'center',
          width: '100%'
        }}>
          <p>
            <span style={{ color: '#080808' }}>+100 other countries</span>
            {' '}
            <span style={{ color: '#6A6A6A' }}>supported via global hybrid rails</span>
          </p>
        </div>

        {/* Right side: Text content */}
        <div className="right-content" style={rightContentStyle}>
          {/* Top text box */}
          <motion.div 
            className='text-box mt-0 md:-mt-10' 
            style={{ ...textBoxBaseStyle,padding: '40px' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
          > 
            <p style={isMobile ? cardMobileTextStyle : textStyle}>
            Trade like a local. Get virtual account details in key economic zones to collect payments Near real time without cross-border friction.
            </p>
          </motion.div>

          {/* Bottom text box with flags and stablecoins */}
          <motion.div 
            className='text-box' 
            style={{...textBoxBaseStyle, padding: '40px'}}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
            whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
          >
            <p style={isMobile ? {...cardMobileTextStyle, marginBottom: '20px'} : {...textStyle, marginBottom: '20px'}}>
            USD, EUR, GBP, AED, CNY, INR + other major business currencies supported.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', alignItems: 'center' }}>
              {/* Replace the flag emojis and stablecoin icon with a single global image */}
              <img
                src="/global_flag.png"
                alt="Global flags"
                onClick={() => { try { AnalyticsService.sendEvent('Global Flags Clicked'); } catch (e) {} }}
                style={{
                  width: '180px',
                  maxWidth: '100%',
                  height: '30px',
                  objectFit: 'contain',
                  display: 'block',
                  cursor: 'pointer'
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* (Desktop caption moved into globe container) */}
    </div>
  );
};

export default GlobalNetworkCoverage;
