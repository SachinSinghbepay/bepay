'use client'
import React, { useState } from 'react';
import WaitlistTriggerButton from "../waitlist-trigger-button";
import { AnalyticsService } from "@/services/analyticsService";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

// --- STYLES OBJECT ---

const handleButtonClick = () => {
    AnalyticsService.sendEvent("Get your global account Clicked");
};

// Styles are optimized for a clean, single-view layout.
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
    // --- HEADING STYLES (Unchanged) ---
    headerH1: {
        fontFamily: 'Montserrat',
        fontWeight: '600', // Matches 'SemiBold'
        fontSize: '60px',
        lineHeight: '60px',
        letterSpacing: '-0.06em', // Matches '-6%'
        textTransform: 'capitalize',
        color: '#333333',
        marginBottom: '10px',
    },
    headerP: {
        fontFamily: 'Montserrat',
        fontWeight: '500', // Matches 'Medium'
        fontSize: '18px',
        lineHeight: '24px',
        letterSpacing: '-0.02em', // Matches '-2%'
        color: '#666',
        textAlign: 'center',
    },
    // Main content area
    mainContent: {
        padding: '50px 20px',
        maxWidth: '1200px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flexGrow: 1,
    },
    // --- UPDATED STYLES FOR NUMBER INDICATORS CONTAINER ---
    numberIndicatorsContainer: {
        // Dimensions and color based on user request
        width: '600px', 
        height: '190px',
        backgroundColor: '#EFEFEF', // Requested Color
        borderRadius: '44px', // Requested Radius
        
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '10px', // Inner padding to space the numbers
        marginBottom: '60px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
    },
    numberIndicators: {
        display: 'flex',
        justifyContent: 'space-around', // Space out the numbers evenly
        height: '100%',
        width: '100%',
    },
    numberBox: {
        // Numbers are now large to fit the 220px height container
        width: '180px', // Sized to fit 3 boxes in 640px
        height: '100%', // Take up full height of container
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Montserrat', // Added Montserrat font
        fontSize: '120px', // Updated to match spec
        fontWeight: '400', // Regular weight for inactive
        lineHeight: '100%', // Added line-height
        letterSpacing: '-0.06em', // -6% letter spacing
        textTransform: 'capitalize', // Added text transform
        margin: '0', // No margin needed since they are spaced by `justifyContent: 'space-around'`
        borderRadius: '38px', // Slightly less than container radius
        backgroundColor: 'transparent', // Transparent background for inactive
        color: '#ccc', // Lighter color for inactive
        cursor: 'pointer',
        transition: 'all 0.3s ease-in-out',
    },
    numberBoxCurrent: {
        // Active state styles
        backgroundColor: '#e0e0e0', // Slightly darker for active background
        color: '#000', // Black color for active number
        fontWeight: '500', // Medium font weight for active
        borderRadius: '38px', // Keep rounded corners
    },
    // --- END UPDATED STYLES FOR NUMBER INDICATORS ---

    stepContainer: {
        width: '100%',
        maxWidth: '1000px',
        position: 'relative',
        minHeight: '350px',
    },
    // --- REDUCED GAP & ALIGNED ITEMS ---
    stepDetails: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center', // Aligns text block and image vertically in the center
        width: '100%',
        padding: '20px',
        gap: '20px', // Reduced gap
        transition: 'opacity 0.4s ease',
    },
    stepText: {
        flex: 1,
        maxWidth: '500px', // Increased max width for content
        textAlign: 'left', // Ensure text starts at the same point
    },
    // --- UPDATED STYLE: stepTitle ---
    stepTitle: {
        fontFamily: 'Montserrat',
        fontWeight: '700', // Bold
        fontSize: '36px',
        lineHeight: '32px',
        letterSpacing: '-0.02em', // -2%
        textTransform: 'uppercase',
        marginBottom: '15px',
        color: '#333333',
    },
    // --- UPDATED STYLE: stepDescription ---
    stepDescription: {
        fontFamily: 'Montserrat',
        fontWeight: '600', // SemiBold
        color: '#555',
        fontSize: '16px',
        lineHeight: '22px',
        letterSpacing: '-0.02em', // -2%
        marginBottom: '30px',
    },
    getAccountButton: {
        // ... (not directly used, using the button's className for styling)
    },
    imageContainer: {
        flex: 1,
        display: 'flex',
        justifyContent: 'flex-end',
        minWidth: '300px', // Minimum width for the image area
    },
    stepImage: {
        width: '300px', 
        height: '300px', 
        objectFit: 'contain',
    }
};

// --- STEP DATA (UPDATED imageSrc to g1, g2, g3) ---
const steps = [
    {
        number: 1,
        title: "SIGN UP & VERIFY YOUR BUSINESS",
        description: "Create your bepay account and complete a quick KYB.",
        imageSrc: "/g1.png", // Updated image path
        altText: "Illustration of a person signing up on a document with a large checkmark"
    },
    {
        number: 2,
        title: "ADD YOUR BUSINESS DETAILS",
        description: "Configure settlement accounts, currencies, invoices, and payees.",
        imageSrc: "/g2.png", // Updated image path
        altText: "Illustration of a computer screen connected to a user profile and financial documents"
    },
    {
        number: 3,
        title: "START SENDING & RECEIVING PAYMENTS",
        description: "Manage everything from collections, payouts, FX, and compliance from a single dashboard.",
        imageSrc: "/g3.png", // Updated image path
        altText: "Illustration of a laptop displaying a financial growth graph with currency symbol"
    },
];


// --- STEP CONTENT HELPER ---
const StepContent = ({ step }) => {
    if (!step) return null;

    // Framer motion variants for smooth transition (optional)
    const variants = {
        enter: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -10 },
    };

    return (
        <motion.div 
            key={step.number} 
            initial="exit" 
            animate="enter" 
            variants={variants}
            transition={{ duration: 0.3 }}
            style={styles.stepContainer}
        >
            <div style={styles.stepDetails}>
                <div style={styles.stepText}>
                    <h2 style={styles.stepTitle}>{step.title}</h2>
                    <p style={styles.stepDescription}>{step.description}</p>
                    {/* Waitlist button section */}
                    <WaitlistTriggerButton triggerSource="become a merchant on bepay button" buttonLocation="merchant_section_business">
                        <motion.div
                            className="flex flex-col sm:flex-row lg:flex-col max-w-[300px] sm:max-w-none lg:max-w-[300px] gap-4"
                        >
                            <button
                                onClick={handleButtonClick}
                                className="bg-black w-[250px] h-[56px] text-white text-[14px] font-medium rounded-full flex items-center justify-center gap-2 py-4 px-6 cursor-pointer whitespace-nowrap hover:bg-gray-800 transition-colors"
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
                <div style={styles.imageContainer}>
                    <img 
                        src={step.imageSrc} 
                        alt={step.altText}
                        style={styles.stepImage}
                    />
                </div>
            </div>
        </motion.div>
    );
};


// --- MAIN COMPONENT ---
const SetupGlobalAccount = () => {
    // activeStep tracks the number being hovered over (or 1 by default)
    const [activeStep, setActiveStep] = useState(1);
    
    // Find the content for the currently active step
    const currentStepData = steps.find(s => s.number === activeStep);

    // Dynamic number styling
    const getNumberStyle = (num) => {
        // Note: Using an object spread operator on numberBox to ensure the base styles are included
        const baseStyle = styles.numberBox;

        return num === activeStep 
            ? { ...baseStyle, ...styles.numberBoxCurrent } 
            : baseStyle;
    };
    
    // Handlers
    const handleMouseEnter = (stepNumber) => {
        setActiveStep(stepNumber);
    };

    return (
        <div style={styles.setupWrapper}>
            {/* Header Section */}
            <header style={styles.pageHeader}>
                <h1 style={styles.headerH1}>Set Up Your Global Account Quickly</h1>
                <p className='whitespace-nowrap' style={styles.headerP}>
                    bepay iGPS is built for fast onboarding, allowing your business to <span className='text-[#080808] font-semibold'>start collecting and paying internationally without delays.</span>
                </p>
            </header>
            
            {/* Main Content Area */}
            <div style={styles.mainContent}>
                
                {/* Number Indicators (1, 2, 3) - NOW W/ REQUESTED DIMENSIONS */}
                <div style={styles.numberIndicatorsContainer}>
                    <div style={styles.numberIndicators}>
                        {steps.map((step) => (
                            <div 
                                key={step.number}
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
                <StepContent step={currentStepData} />
                
            </div>
            
        </div>
    );
};

export default SetupGlobalAccount;