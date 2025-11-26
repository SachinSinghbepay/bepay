import React from 'react';

const GlobalNetworkCoverage = ({ globeImagePath }) => {
  // Constants for box styles based on the provided dimensions and color
  // Keeping the width, radius, and background color consistent
  const boxWidth = '567px';
  const boxBorderRadius = '44px';
  const boxBackgroundColor = '#F0F0F0';
  const globalBackgroundColor = '#F6F6F6';

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

  // --- Styles for the main component ---

  const mainContainerStyle = {
    fontFamily: 'Arial, sans-serif', // Using Arial as a general fallback for the rest of the page elements
    padding: '60px 40px',
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

  const globeContainerStyle = {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    position: 'relative',
    marginLeft: '100px',
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
    width: '467px', 
    minHeight: '282px', // Use minHeight for flexible content, or adjust padding to hit the target height
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center', // Vertically center content if box height is enforced
  };

  // --- JSX Structure ---

  return (
    <div style={mainContainerStyle}>
      {/* Title */}
      <h1 className='-mt-10' style={{ fontSize: '60px', fontWeight: 'bold', color: '#333', marginBottom: '2px' }}>
        Global Network <span style={{ color: '#ccc' }}>Coverage</span>
      </h1>

      {/* Main Content: Globe and Text Boxes */}
      <div style={contentWrapperStyle}>

        {/* Left side: Globe Image */}
        <div style={globeContainerStyle}>
          <img
            src="/globe.png" 
            alt="Global Network Globe with Flags"
            style={{ width: '679.79px', height: '669.48px' }}
          />
        </div>

        {/* Right side: Text content */}
        <div style={rightContentStyle}>
          {/* Top text box */}
          <div className='-mt-40' style={{ ...textBoxBaseStyle,padding: '40px' }}> {/* Adjusted padding to help meet the 282px height visually */}
            <p style={textStyle}>
              Trade like a local. Get virtual account details in key economic zones to collect payments instantly without cross-border friction.
            </p>
          </div>

          {/* Bottom text box with flags and stablecoins */}
          <div style={{...textBoxBaseStyle, padding: '40px'}}>{/* Adjusted padding to help meet the 282px height visually */}
            <p style={{...textStyle, marginBottom: '20px'}}>
              **USD, EUR, GBP, AED, CNY, INR** + other major business currencies & other global stablecoins supported.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', alignItems: 'center' }}>
              {/* Flag Images - Using emojis for simplicity */}
              <span style={{ fontSize: '30px' }}>🇺🇸</span>
              <span style={{ fontSize: '30px' }}>🇪🇺</span>
              <span style={{ fontSize: '30px' }}>🇬🇧</span>
              <span style={{ fontSize: '30px' }}>🇦🇪</span>
              <span style={{ fontSize: '30px' }}>🇨🇳</span>
              <span style={{ fontSize: '30px' }}>🇮🇳</span>
              {/* Stablecoin icon */}
              <div style={{
                backgroundColor: '#00B050',
                color: '#fff',
                fontSize: '18px',
                fontWeight: 'bold',
                padding: '5px 8px',
                borderRadius: '50%',
                lineHeight: '1',
                width: '30px',
                height: '30px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}>T$</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom text */}
      <div style={{ 
        marginTop: '-160px', 
      
        fontSize: '20px', 
        color: '#333', 
        fontWeight: '700',
        fontFamily: 'Montserrat, sans-serif',
        lineHeight: '24px',
        letterSpacing: '-0.02em',
        alignSelf: 'flex-start',
        marginLeft: '81.42px'
      }}>
        <p>
          +100 other countries** supported via global hybrid rails
        </p>
      </div>
    </div>
  );
};

export default GlobalNetworkCoverage;
