"use client";
import { useState, useEffect, useRef } from "react";
import { AnalyticsService } from "@/services/analyticsService";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import GetStartedPopup from "@/components/popups/getStartedPopup";

// --- CUSTOM HOOK: useMediaQuery ---
const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [query, matches]);

  return matches;
};

// --- ANIMATION VARIANTS ---
const numberBoxHoverVariants = {
  initial: {
    scale: 1,
    opacity: 0.7,
    backgroundColor: "transparent",
    color: "#ccc",
  },
  active: {
    scale: 1,
    opacity: 1,
    backgroundColor: "#e0e0e0",
    color: "#000",
    transition: { duration: 0.3, ease: "easeOut" },
  },
  inactive: {
    scale: 1,
    opacity: 0.7,
    backgroundColor: "transparent",
    color: "#ccc",
    transition: { duration: 0.3, ease: "easeOut" },
  },
  hover: {
    scale: 1.08,
    transition: { duration: 0.3, ease: "easeOut" },
  },
  tap: {
    scale: 0.95,
  },
};

const stepContentVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.1, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.1, ease: "easeIn" },
  },
};

// --- STYLES OBJECT ---
const styles = {
  setupWrapper: {
    fontFamily:
      'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    color: "#333",
    backgroundColor: "#f9f9f9",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  pageHeader: {
    textAlign: "center",
    padding: "40px 20px 20px",
    backgroundColor: "#f9f9f9",
    width: "100%",
  },
  headerH1: {
    fontFamily: "Montserrat",
    fontWeight: "600",
    fontSize: "60px",
    lineHeight: "60px",
    letterSpacing: "-0.06em",
    textTransform: "capitalize",
    color: "#333333",
    marginBottom: "10px",
  },
  headerH1Mobile: {
    fontSize: "30px",
    lineHeight: "30px",
    letterSpacing: "-0.04em",
    textAlign: "center",
  },
  headerP: {
    fontFamily: "Montserrat",
    fontWeight: "500",
    fontSize: "18px",
    lineHeight: "24px",
    letterSpacing: "-0.02em",
    color: "#666",
    textAlign: "center",
  },
  headerPMobile: {
    fontFamily: "Montserrat",
    fontWeight: "500",
    fontSize: "12px",
    lineHeight: "20px",
    letterSpacing: "-0.02em",
    textAlign: "center",
    marginTop: "15px",
  },
  mainContent: {
    padding: "20px",
    maxWidth: "1200px",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flexGrow: 1,
  },
  numberIndicatorsContainer: {
    width: "600px",
    height: "190px",
    backgroundColor: "#EFEFEF",
    borderRadius: "25px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "5px",
    marginBottom: "40px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
  },
  numberIndicatorsContainerMobile: {
    width: "353.125px",
    height: "121.38671875px",
    borderRadius: "25px",
    marginBottom: "26px",
  },
  numberIndicators: {
    display: "flex",
    gap: "20px",
    justifyContent: "space-around",
    height: "100%",
    width: "100%",
  },
  numberBox: {
    width: "180px",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Montserrat",
    fontSize: "120px",
    fontWeight: "400",
    lineHeight: "100%",
    letterSpacing: "-0.06em",
    textTransform: "capitalize",
    margin: "0",
    borderRadius: "25px",
    backgroundColor: "transparent",
    color: "#ccc",
    cursor: "pointer",
    transition: "all 0.3s ease-in-out",
  },
  numberBoxMobile: {
    fontSize: "66px",
    lineHeight: "100%",
    letterSpacing: "-0.06em",
  },
  numberBoxCurrent: {
    backgroundColor: "#e0e0e0",
    color: "#000",
    fontWeight: "400",
    borderRadius: "25px",
  },
  stepContainer: {
    width: "100%",
    maxWidth: "1000px",
    position: "relative",
    minHeight: "350px",
  },
  stepDetails: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: "20px",
    gap: "20px",
    transition: "opacity 0.4s ease",
  },
  stepDetailsMobile: {
    flexDirection: "column",
    textAlign: "left",
    marginTop: "-30px",
    padding: "0 20px",
  },
  stepText: {
    flex: 1,
    maxWidth: "500px",
    textAlign: "left",
    padding: "0 20px",
  },
  stepTextMobile: {
    maxWidth: "100%",
    textAlign: "left",
    padding: "0",
  },
  stepTitle: {
    fontFamily: "Montserrat",
    fontWeight: "700",
    fontSize: "36px",
    lineHeight: "32px",
    letterSpacing: "-0.02em",
    textTransform: "uppercase",
    marginBottom: "15px",
    color: "#333333",
  },
  stepTitleMobile: {
    fontSize: "18px",
    lineHeight: "32px",
    letterSpacing: "-0.02em",
    marginBottom: "5px",
  },
  stepDescription: {
    fontFamily: "Montserrat",
    fontWeight: "600",
    color: "#555",
    fontSize: "16px",
    lineHeight: "22px",
    letterSpacing: "-0.02em",
    marginBottom: "30px",
  },
  stepDescriptionMobile: {
    fontSize: "14px",
    lineHeight: "20px",
    letterSpacing: "-0.02em",
    marginBottom: "15px",
  },
  imageContainer: {
    flex: 1,
    display: "flex",
    justifyContent: "flex-end",
    minWidth: "300px",
  },
  imageContainerMobile: {
    justifyContent: "center",
    minWidth: "100%",
    marginBottom: "20px",
    marginTop: "32px",
  },
  stepImage: {
    width: "300px",
    height: "300px",
    objectFit: "contain",
  },
  stepImageMobile: {
    width: "200px",
    height: "200px",
  },
};

// --- STEP DATA ---
const steps = [
  {
    number: 1,
    title: "SIGN UP & VERIFY YOUR BUSINESS",
    description: "Create your bepay account and complete a quick KYB.",
    imageSrc: "/g1.png",
    altText:
      "Illustration of a person signing up on a document with a large checkmark",
  },
  {
    number: 2,
    title: "ADD YOUR BUSINESS DETAILS",
    description:
      "Configure settlement accounts, currencies, invoices, and payees.",
    imageSrc: "/g2.png",
    altText:
      "Illustration of a computer screen connected to a user profile and financial documents",
  },
  {
    number: 3,
    title: "START SENDING & RECEIVING PAYMENTS",
    description:
      "Manage everything from collections, payouts, FX, and compliance from a single dashboard.",
    imageSrc: "/g3.png",
    altText:
      "Illustration of a laptop displaying a financial growth graph with currency symbol",
  },
];

// --- STEP CONTENT HELPER ---
const StepContent = ({ step, isMobile, onOpenPopup }) => {
  if (!step) return null;

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

  if (isMobile && step.number === 1) {
    stepTitleStyle = { ...stepTitleStyle, whiteSpace: "nowrap" };
  }

  const stepDescriptionStyle = isMobile
    ? { ...styles.stepDescription, ...styles.stepDescriptionMobile }
    : styles.stepDescription;

  const imageBlock = (
    <motion.div
      style={imageContainerStyle}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <motion.img
        src={step.imageSrc}
        alt={step.altText}
        style={stepImageStyle}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />
    </motion.div>
  );

  const textBlock = (
    <motion.div
      style={stepTextStyle}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <motion.h2
        style={stepTitleStyle}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {step.title}
      </motion.h2>
      <motion.p
        style={stepDescriptionStyle}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
      >
        {step.description}
      </motion.p>
      <motion.div
        style={isMobile ? { marginTop: "23px" } : {}}
        className="flex flex-col sm:flex-row lg:flex-col max-w-[300px] sm:max-w-none lg:max-w-[300px] gap-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <motion.button
          onClick={() => {
            try {
              AnalyticsService.sendEvent("Global Account Get Started Clicked");
            } catch (e) {}
            if (typeof onOpenPopup === "function") onOpenPopup();
          }}
          className={`bg-black ${
            isMobile ? "w-full" : "w-[250px]"
          } h-[56px] text-white text-[14px] font-medium rounded-full flex items-center justify-center gap-2 py-4 px-6 cursor-pointer whitespace-nowrap hover:bg-gray-800 transition-colors`}
          whileHover={{ scale: 1.02, boxShadow: "0 10px 20px rgba(0,0,0,0.2)" }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          Get your global account
          <ArrowUpRight className="w-5 h-7 flex-shrink-0" strokeWidth={1.5} />
        </motion.button>
      </motion.div>
    </motion.div>
  );

  return (
    <motion.div
      key={step.number}
      variants={stepContentVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      style={styles.stepContainer}
    >
      <div style={stepDetailsStyle}>
        {isMobile ? imageBlock : textBlock}
        {isMobile ? textBlock : imageBlock}
      </div>
    </motion.div>
  );
};

// --- MAIN COMPONENT ---
const SetupGlobalAccount = () => {
  const isMobile = useMediaQuery("(max-width: 640px)");
  const [activeStep, setActiveStep] = useState(1);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const viewRef = useRef(null);
  const [hasTrackedView, setHasTrackedView] = useState(false);
  const currentStepData = steps.find((s) => s.number === activeStep);

  const openPopup = () => setIsPopupOpen(true);

  useEffect(() => {
    const target = viewRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTrackedView) {
          try {
            AnalyticsService.sendEvent("IGPS Global Account viewed");
          } catch (e) {}
          setHasTrackedView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.05, rootMargin: "0px 0px -30% 0px" }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [hasTrackedView]);

  const getNumberStyle = (num) => {
    const baseStyle = styles.numberBox;
    const mobileStyle = isMobile ? styles.numberBoxMobile : {};
    return num === activeStep
      ? { ...baseStyle, ...mobileStyle, fontWeight: "400", borderRadius: "25px" }
      : { ...baseStyle, ...mobileStyle };
  };

  const handleMouseEnter = (stepNumber) => {
    setActiveStep(stepNumber);
  };

  const headerH1Style = isMobile
    ? { ...styles.headerH1, ...styles.headerH1Mobile }
    : styles.headerH1;

  const headerPStyle = isMobile
    ? { ...styles.headerP, ...styles.headerPMobile }
    : styles.headerP;

  const numberIndicatorsContainerStyle = isMobile
    ? {
        ...styles.numberIndicatorsContainer,
        ...styles.numberIndicatorsContainerMobile,
      }
    : styles.numberIndicatorsContainer;

  return (
    <motion.div
      ref={viewRef}
      style={styles.setupWrapper}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, margin: "-100px" }}
    >
      {/* Header Section */}
      <motion.header
        style={styles.pageHeader}
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <motion.h1
          style={headerH1Style}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          Set Up Your Global Account Quickly
        </motion.h1>
        <motion.p
          className="md:whitespace-nowrap"
          style={headerPStyle}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          bepay iGPS is built for fast onboarding, allowing your business to{" "}
          <span className="text-[#080808] font-semibold">
            start collecting and paying internationally without delays.
          </span>
        </motion.p>
      </motion.header>

      {/* Main Content Area */}
      <div style={styles.mainContent}>
        {/* Number Indicators with smooth hover animations */}
        <motion.div
          style={numberIndicatorsContainerStyle}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div style={styles.numberIndicators}>
            {steps.map((step) => (
              <motion.div
                key={step.number}
                style={getNumberStyle(step.number)}
                onMouseEnter={() => handleMouseEnter(step.number)}
                variants={numberBoxHoverVariants}
                initial="initial"
                animate={activeStep === step.number ? "active" : "inactive"}
                whileHover="hover"
                whileTap="tap"
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {step.number}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Dynamic Step Content */}
        <AnimatePresence mode="wait">
          <StepContent
            key={activeStep}
            step={currentStepData}
            isMobile={isMobile}
            onOpenPopup={openPopup}
          />
        </AnimatePresence>
        <GetStartedPopup
          isOpen={isPopupOpen}
          onClose={() => setIsPopupOpen(false)}
        />
      </div>
    </motion.div>
  );
};

export default SetupGlobalAccount;
