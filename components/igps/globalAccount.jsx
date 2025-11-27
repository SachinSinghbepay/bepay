'use client'
import React, { useState, useEffect } from 'react';
import WaitlistTriggerButton from "../waitlist-trigger-button";
import { AnalyticsService } from "@/services/analyticsService";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

// --- CUSTOM HOOK: useMediaQuery ---
const useMediaQuery = (query) => {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        const media = window.matchMedia(query);
        // Initial check
        if (media.matches !== matches) {
            setMatches(media.matches);
        }
        // Listener function
        const listener = () => setMatches(media.matches);
        // Set up the listener
        media.addEventListener('change', listener);
        
        // Clean up the listener when the component unmounts
        return () => media.removeEventListener('change', listener);
    }, [query, matches]);

    return matches;
};

// --- STYLES OBJECT (Updated numberIndicatorsContainerMobile) ---

const handleButtonClick = () => {
    AnalyticsService.sendEvent("Get your global account Clicked");
};

const styles = {
    setupWrapper: {
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
        color: '#333',
        backgroundColor: '#f9f9f9',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    pageHeader: {
        textAlign: 'center',
        padding: '40px 20px 20px',
        backgroundColor: '#f9f9f9',
        width: '100%',
    },
    // --- HEADING STYLES ---
    headerH1: {
        fontFamily: 'Montserrat',
        fontWeight: '600', // SemiBold
        fontSize: '60px',
        lineHeight: '60px',
        letterSpacing: '-0.06em', // -6%
        textTransform: 'capitalize',
        color: '#333333',
        marginBottom: '10px',
    },
    headerH1Mobile: {
        fontSize: '30px', // Mobile font size
        lineHeight: '30px', // Mobile line height
        letterSpacing: '-0.04em', // Mobile letter spacing (-4%)
        textAlign: 'center', 
    },
    // Desktop headerP (Subheading)
    headerP: {
        fontFamily: 'Montserrat',
        fontWeight: '500', // Medium
        fontSize: '18px',
        lineHeight: '24px',
        letterSpacing: '-0.02em', // -2%
        color: '#666',
        textAlign: 'center',
    },
    // Mobile headerP (Subheading) styles (PUSH DOWN implemented here)
    headerPMobile: {
        fontFamily: 'Montserrat',
        fontWeight: '500',
        fontSize: '12px', // Mobile font size
        lineHeight: '20px', // Mobile line height
        letterSpacing: '-0.02em', // Mobile letter spacing (-2%)
        textAlign: 'center',
        marginTop: '15px', // Pushes subheading 2-3 spaces down
    },
    // Main content area
    mainContent: {
        padding: '20px',
        maxWidth: '1200px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flexGrow: 1,
    },
    // --- NUMBER INDICATORS CONTAINER STYLES (Adjusted marginBottom) ---
    numberIndicatorsContainer: {
        // Desktop styles (No change)
        width: '600px', 
        height: '190px',
        backgroundColor: '#EFEFEF', 
        borderRadius: '25px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '5px',
        marginBottom: '40px', 
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
    },
    // Mobile numberIndicatorsContainer styles (PUSH UP implemented here)
    numberIndicatorsContainerMobile: {
        width: '353.125px', 
        height: '121.38671875px',
        borderRadius: '25px',
        marginBottom: '26px', // Push number bar up (was 20px)
    },
    numberIndicators: {
        display: 'flex',
        gap: '20px',
        justifyContent: 'space-around',
        height: '100%',
        width: '100%',
    },
    // --- NUMBER BOX STYLES (No change) ---
    numberBox: {
        width: '180px', 
        height: '100%', 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Montserrat', 
        fontSize: '120px', 
        fontWeight: '400', 
        lineHeight: '100%', 
        letterSpacing: '-0.06em', 
        textTransform: 'capitalize', 
        margin: '0', 
        borderRadius: '25px', 
        backgroundColor: 'transparent', 
        color: '#ccc', 
        cursor: 'pointer',
        transition: 'all 0.3s ease-in-out',
    },
    numberBoxMobile: {
        fontSize: '66px', 
        lineHeight: '100%', 
        letterSpacing: '-0.06em', 
    },
    numberBoxCurrent: {
        backgroundColor: '#e0e0e0', 
        color: '#000', 
        fontWeight: '400', 
        borderRadius: '25px', 
    },
    // --- STEP DETAILS (No change) ---
    stepContainer: {
        width: '100%',
        maxWidth: '1000px',
        position: 'relative',
        minHeight: '350px',
    },
    stepDetails: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center', 
        width: '100%',
        padding: '20px',
        gap: '20px', 
        transition: 'opacity 0.4s ease',
    },
    stepDetailsMobile: {
        flexDirection: 'column', 
        textAlign: 'left', 
        marginTop: '-30px', 
        padding: '0 20px', 
    },
    stepText: {
        flex: 1,
        maxWidth: '500px', 
        textAlign: 'left', 
        padding: '0 20px',
    },
    stepTextMobile: {
        maxWidth: '100%',
        textAlign: 'left', 
        padding: '0', 
    },
    // --- STEP TITLE STYLES (No change) ---
    stepTitle: {
        fontFamily: 'Montserrat',
        fontWeight: '700', // Bold
        fontSize: '36px',
        lineHeight: '32px',
        letterSpacing: '-0.02em', // -2%
        textTransform: 'uppercase',
        marginBottom: '15px', // Desktop spacing
        color: '#333333',
    },
    stepTitleMobile: {
        fontSize: '18px', 
        lineHeight: '32px', 
        letterSpacing: '-0.02em', 
        marginBottom: '5px', 
    },
    // --- STEP DESCRIPTION STYLES (No change) ---
    stepDescription: {
        fontFamily: 'Montserrat',
        fontWeight: '600', // SemiBold
        color: '#555',
        fontSize: '16px',
        lineHeight: '22px',
        letterSpacing: '-0.02em', // -2%
        marginBottom: '30px', // Desktop spacing
    },
    stepDescriptionMobile: {
        fontSize: '14px', 
        lineHeight: '20px', 
        letterSpacing: '-0.02em', 
        marginBottom: '15px', 
    },
    
    // --- IMAGE STYLES (No change) ---
    imageContainer: {
        flex: 1,
        display: 'flex',
        justifyContent: 'flex-end',
        minWidth: '300px', 
    },
    imageContainerMobile: {
        justifyContent: 'center', 
        minWidth: '100%',
        marginBottom: '20px', 
        marginTop: '32px', // PUSH IMAGE DOWN 2-3 SPACES (was 0)
    },
    stepImage: {
        width: '300px', // Desktop width
        height: '300px', // Desktop height
        objectFit: 'contain',
    },
    stepImageMobile: {
        width: '200px', // Decreased size for mobile
        height: '200px', // Decreased size for mobile
    }
};

// --- STEP DATA (No change) ---
const steps = [
    {
        number: 1,
        title: "SIGN UP & VERIFY YOUR BUSINESS",
        description: "Create your bepay account and complete a quick KYB.",
        imageSrc: "/g1.png",
        altText: "Illustration of a person signing up on a document with a large checkmark"
    },
    {
        number: 2,
        title: "ADD YOUR BUSINESS DETAILS",
        description: "Configure settlement accounts, currencies, invoices, and payees.",
        imageSrc: "/g2.png",
        altText: "Illustration of a computer screen connected to a user profile and financial documents"
    },
    {
        number: 3,
        title: "START SENDING & RECEIVING PAYMENTS",
        description: "Manage everything from collections, payouts, FX, and compliance from a single dashboard.",
        imageSrc: "/g3.png",
        altText: "Illustration of a laptop displaying a financial growth graph with currency symbol"
    },
];


// --- STEP CONTENT HELPER (Updated to push button down on mobile) ---
const StepContent = ({ step, isMobile }) => {
    if (!step) return null;

    // Framer motion variants 
    const variants = {
        enter: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -10 },
    };

    // Conditional styling setup (using previous calculated styles)
    const stepDetailsStyle = isMobile 
        ? { ...styles.stepDetails, ...styles.stepDetailsMobile } 
        : styles.stepDetails;
        
    const stepTextStyle = isMobile
        ? { ...styles.stepText, ...styles.stepTextMobile }
        : styles.stepText;

    const imageContainerStyle = isMobile
        ? { ...styles.imageContainer, ...styles.imageContainerMobile }
        : styles.imageContainer;
        
    const stepImageStyle = isMobile
        ? { ...styles.stepImage, ...styles.stepImageMobile }
        : styles.stepImage;
        
    let stepTitleStyle = isMobile
        ? { ...styles.stepTitle, ...styles.stepTitleMobile }
        : styles.stepTitle;
        
    // Specific change for Step 1 title on mobile: nowrap
    if (isMobile && step.number === 1) {
        stepTitleStyle = { ...stepTitleStyle, whiteSpace: 'nowrap' };
    }
        
    const stepDescriptionStyle = isMobile
        ? { ...styles.stepDescription, ...styles.stepDescriptionMobile }
        : styles.stepDescription;

    // --- RENDER BLOCKS ---
    const imageBlock = (
        <div style={imageContainerStyle}>
            <img 
                src={step.imageSrc} 
                alt={step.altText}
                style={stepImageStyle}
            />
        </div>
    );
    
    const textBlock = (
        <div style={stepTextStyle}>
            {/* Use the conditional stepTitleStyle */}
            <h2 style={stepTitleStyle}>{step.title}</h2>
            <p style={stepDescriptionStyle}>{step.description}</p>
            <WaitlistTriggerButton triggerSource="become a merchant on bepay button" buttonLocation="merchant_section_business">
                <motion.div
                    // APPLY PUSH BUTTONS DOWN (2-3 spaces) using inline style
                    style={isMobile ? { marginTop: '23px' } : {}} 
                    className="flex flex-col sm:flex-row lg:flex-col max-w-[300px] sm:max-w-none lg:max-w-[300px] gap-4"
                >
                    <button
                        onClick={handleButtonClick}
                        className={`bg-black ${isMobile ? 'w-full' : 'w-[250px]'} h-[56px] text-white text-[14px] font-medium rounded-full flex items-center justify-center gap-2 py-4 px-6 cursor-pointer whitespace-nowrap hover:bg-gray-800 transition-colors`}
                    >
                        Get your global account
                        <ArrowUpRight
                        className="w-5 h-7 flex-shrink-0"
                        strokeWidth={1.5}
                        />
                    </button>
                </motion.div>
            </WaitlistTriggerButton>
        </div>
    );

    return (
        <motion.div 
            key={step.number} 
            initial="exit" 
            animate="enter" 
            variants={variants}
            transition={{ duration: 0.3 }}
            style={styles.stepContainer}
        >
            <div style={stepDetailsStyle}>
                {/* Conditional render order: Image then Text on mobile, Text then Image on desktop */}
                {isMobile ? imageBlock : textBlock}
                {isMobile ? textBlock : imageBlock}
            </div>
        </motion.div>
    );
};


// --- MAIN COMPONENT (No change required outside of dynamic style application) ---
const SetupGlobalAccount = () => {
    const isMobile = useMediaQuery('(max-width: 640px)');
    const [activeStep, setActiveStep] = useState(1);
    const currentStepData = steps.find(s => s.number === activeStep);

    useEffect(() => {
        AnalyticsService.sendEvent('IGPS Component View', { component: 'SetupGlobalAccount', page: 'igps' });
    }, []);

    // Dynamic number styling
    const getNumberStyle = (num) => {
        // Base style is the desktop one
        const baseStyle = styles.numberBox;
        // Apply mobile styles if applicable
        const mobileStyle = isMobile ? styles.numberBoxMobile : {};

        // Combine base, mobile, and current styles
        return num === activeStep 
            ? { ...baseStyle, ...mobileStyle, ...styles.numberBoxCurrent } 
            : { ...baseStyle, ...mobileStyle };
    };
    
    // Handlers
    const handleMouseEnter = (stepNumber) => {
        setActiveStep(stepNumber);
    };

    // Conditional styles application for the header H1
    const headerH1Style = isMobile
        ? { ...styles.headerH1, ...styles.headerH1Mobile }
        : styles.headerH1;
        
    // Conditional styles application for the header P (subheading)
    const headerPStyle = isMobile 
        ? { ...styles.headerP, ...styles.headerPMobile } 
        : styles.headerP;

    // Conditional styles application for the number bar container
    const numberIndicatorsContainerStyle = isMobile
        ? { ...styles.numberIndicatorsContainer, ...styles.numberIndicatorsContainerMobile }
        : styles.numberIndicatorsContainer;

    return (
        <div style={styles.setupWrapper}>
            {/* Header Section */}
            <header style={styles.pageHeader}>
                {/* Apply dynamic style to the main heading */}
                <h1 style={headerH1Style}>Set Up Your Global Account Quickly</h1>
                {/* Apply dynamic style to the subheading */}
                <p className='md:whitespace-nowrap' style={headerPStyle}>
                    bepay iGPS is built for fast onboarding, allowing your business to <span className='text-[#080808] font-semibold'>start collecting and paying internationally without delays.</span>
                </p>
            </header>
            
            {/* Main Content Area */}
            <div style={styles.mainContent}>
                
                {/* Number Indicators (1, 2, 3) - Apply dynamic style */}
                <div style={numberIndicatorsContainerStyle}>
                    <div style={styles.numberIndicators}>
                        {steps.map((step) => (
                            <div 
                                key={step.number}
                                // Use getNumberStyle to apply mobile/active styles
                                style={getNumberStyle(step.number)} 
                                // Set activeStep when the mouse enters the box
                                onMouseEnter={() => handleMouseEnter(step.number)}
                            >
                                {step.number}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Dynamic Step Content */}
                <StepContent step={currentStepData} isMobile={isMobile} />
                
            </div>
            
        </div>
    );
};

export default SetupGlobalAccount;