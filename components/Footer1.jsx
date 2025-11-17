"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Link from "next/link";
import { AnalyticsService } from "@/services/analyticsService"; // ANALYTICS: Import the service

const AppStoreButton = (
  { iconSrc, iconAlt, line1, line2, onClick } // ANALYTICS: Added onClick prop
) => (
  <motion.button
    onClick={onClick} // ANALYTICS: Added onClick handler
    className="
      flex items-center 
      w-full max-w-[280px] sm:flex-1 
      lg:max-w-[360px] 
      justify-center gap-3 
      border border-white/20 
      rounded-full 
      px-8 py-6 
      hover:bg-white/10 
      transition-colors
    "
    variants={{
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
    }}
    whileTap={{ scale: 0.95 }}
  >
    <Image
      src={iconSrc || "/placeholder.svg"}
      alt={iconAlt}
      width={24}
      height={24}
      loading="lazy"
      className="h-6 w-6"
    />
    <div className="text-left lg:whitespace-nowrap">
      <span className="text-xs block lg:inline">{line1}</span>
      <span className="text-xs block lg:inline">{line2}</span>
    </div>
  </motion.button>
);

const NewsletterModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3 }}
        className="
          bg-[rgba(27,27,27,0.4)] border border-gray-700/30
          flex flex-col items-center justify-center
          rounded-2xl backdrop-blur-md p-6
          w-[80%] max-w-[280px]
          sm:w-[90%] sm:max-w-md sm:min-h-[auto] 
          md:max-w-lg 
          min-h-[250px]
          md:min-h-[auto] 
          lg:max-w-[40vw] lg:h-[48vh]
          lg:rounded-[44px]
        "
      >
        <Image
          src="/bepay_logo.png"
          alt="BePayMoney"
          width={120}
          height={50}
          className="
            mx-auto rounded-xl p-2 
            mb-5 -mt-6
            sm:mb-13 sm:mt-0 
            sm:w-[150px] sm:h-[60px] 
            md:w-[180px] md:h-[70px]
            lg:-mt-10 
          "
        />
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="
            font-light leading-tight text-center mb-6
            text-white
            text-xs sm:text-xl md:text-2xl
          "
        >
          Thanks for signing up to our newsletter.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="
            text-[10px] sm:text-sm md:text-base 
            text-[#6A6A6A] text-center max-w-xs sm:max-w-md 
            mb-7 px-2 leading-snug
            lg:mt-4
          "
        >
          We&apos;ll send updates directly to your inbox.
        </motion.p>
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="
            absolute top-6 right-6 text-white/70 hover:text-white
            text-xs sm:text-2xl 
          "
        >
          ✕
        </button>
      </motion.div>
    </div>
  );
};

// 🛑 MODIFICATION HERE: Added isUpiPage prop
const Footer = ({
  heading,
  headingSize = "text-[24px]",
  isUpiPage = false,
}) => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [subscribedEmail, setSubscribedEmail] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [hasTrackedView, setHasTrackedView] = useState(false); // Track if we've already sent the view event
  const footerRef = useRef(null); // For intersection observer

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 767);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // ANALYTICS: Track when footer is actually viewed
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTrackedView) {
          AnalyticsService.sendEvent("Footer section viewed");
          setHasTrackedView(true);
          observer.unobserve(entry.target); // Stop observing after first view
        }
      },
      { threshold: 0.3 } // Trigger when 30% of the component is visible
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, [hasTrackedView]);

  // --- ANALYTICS: Handlers for all footer events ---
  const handleAppStoreClick = () =>
    AnalyticsService.sendEvent("Download on the App Store button clicked");
  const handleGooglePlayClick = () =>
    AnalyticsService.sendEvent("Get the App on Google Play! button clicked");
  const handleAppGalleryClick = () =>
    AnalyticsService.sendEvent("Get it on the AppGallery! button clicked");
  const handleEmailFocus = () =>
    AnalyticsService.sendEvent("email input field for the newsletter focused");
  const handleSocialLinkClick = (platform) =>
    AnalyticsService.sendEvent("social media link in the footer clicked", {
      platform,
    });
  const handleLinkClick = (linkName) =>
    AnalyticsService.sendEvent(`${linkName} link clicked`);
  // --- END ANALYTICS HANDLERS ---

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !validateEmail(email)) {
      setError(
        !email.trim()
          ? "Email is required"
          : "Please enter a valid email address"
      );
      // ANALYTICS: Track submission failure
      AnalyticsService.sendEvent("Newsletter submission failed", {
        reason: !email.trim() ? "Empty email" : "Invalid email format",
        email_attempted: email,
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, "newsletter_subscribers"), {
        email: email.trim(),
        subscribedAt: new Date(),
        timestamp: Date.now(),
      });

      // --- FIX APPLIED HERE ---
      // 1. Event now triggers only on success.
      // 2. Event now includes the email address.
      AnalyticsService.sendEvent("Newsletter submission successful", {
        email: email.trim(),
      });
      // --- END FIX ---

      setSubscribedEmail(email.trim());
      setShowModal(true);
      setEmail("");
      setTimeout(() => {
        setIsSubscribed(true);
      }, 100);
    } catch (error) {
      console.error("Error adding email to newsletter:", error);
      setError("Something went wrong. Please try again.");
      // ANALYTICS: Track submission failure due to server/network error
      AnalyticsService.sendEvent("Newsletter submission failed", {
        reason: "Server error",
        error_message: error.message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };
  const fadeInScale = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const DesktopLogo = () => (
    <svg
      width="1402"
      height="452"
      viewBox="0 0 1402 452"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="hover-logo transition-all duration-500 cursor-pointer max-w-full h-auto"
      style={{ maxWidth: "1400px", height: "auto" }}
    >
      <style jsx>{`
        .hover-logo:hover #paint0_linear_2175_15792 stop:first-child,
        .hover-logo:hover #paint1_linear_2175_15792 stop:first-child,
        .hover-logo:hover #paint2_linear_2175_15792 stop:first-child,
        .hover-logo:hover #paint3_linear_2175_15792 stop:first-child,
        .hover-logo:hover #paint4_linear_2175_15792 stop:first-child {
          /* Changed to a brighter gray for the hover effect */
          stop-color: #acacac;
        }
        .hover-logo:hover #paint0_linear_2175_15792 stop:last-child,
        .hover-logo:hover #paint1_linear_2175_15792 stop:last-child,
        .hover-logo:hover #paint2_linear_2175_15792 stop:last-child,
        .hover-logo:hover #paint3_linear_2175_15792 stop:last-child,
        .hover-logo:hover #paint4_linear_2175_15792 stop:last-child {
          /* Changed to a brighter gray for the hover effect */
          stop-color: #acacac;
          stop-opacity: 0;
        }
      `}</style>
      <g opacity="0.3">
        <path
          d="M152.735 418.863C129.162 418.863 107.584 413.604 87.9988 403.089C68.7796 392.57 53.9104 377.701 43.3954 358.482L50.4657 349.777V412.337H0.964844V0.546875H51.5563V182.233L43.9385 169.722C54.8197 152.317 69.689 138.534 88.5461 128.381C107.403 117.862 128.981 112.607 153.278 112.607C180.84 112.607 205.499 119.315 227.258 132.732C249.379 146.152 266.787 164.466 279.479 187.673C292.171 210.522 298.517 236.631 298.517 266.007C298.517 294.655 292.171 320.586 279.479 343.793C266.787 367.005 249.379 385.318 227.258 398.735C205.499 412.155 180.658 418.863 152.735 418.863ZM148.924 369.906C167.419 369.906 183.922 365.371 198.429 356.304C212.932 347.242 224.176 334.908 232.155 319.315C240.493 303.359 244.666 285.589 244.666 266.007C244.666 245.697 240.493 227.926 232.155 212.695C224.176 197.102 212.932 184.772 198.429 175.705C183.922 166.277 167.419 161.565 148.924 161.565C130.429 161.565 113.749 166.096 98.8801 175.162C84.3731 184.228 72.7714 196.739 64.0672 212.695C55.7252 228.293 51.5563 246.059 51.5563 266.007C51.5563 285.589 55.7252 303.359 64.0672 319.315C72.7714 334.908 84.3731 347.242 98.8801 356.304C113.749 365.371 130.429 369.906 148.924 369.906Z"
          fill="url(#paint0_linear_2175_15792)"
        />
        <path
          d="M451.439 418.869C423.15 418.869 397.946 412.161 375.826 398.74C353.705 385.324 336.297 367.01 323.605 343.799C310.912 320.229 304.566 293.936 304.566 264.926C304.566 235.55 310.731 209.437 323.061 186.592C335.753 163.743 352.796 145.795 374.192 132.737C395.954 119.321 420.252 112.612 447.085 112.612C468.844 112.612 488.067 116.6 504.747 124.58C521.793 132.194 536.115 142.713 547.721 156.129C559.688 169.184 568.755 184.234 574.92 201.28C581.447 217.96 584.71 235.369 584.71 253.501C584.71 257.489 584.348 262.024 583.624 267.099C583.262 271.815 582.719 276.346 581.99 280.7H341.556V237.179H552.618L528.682 256.765C531.946 237.908 530.135 221.043 523.242 206.174C516.353 191.304 506.2 179.522 492.779 170.817C479.363 162.113 464.131 157.759 447.085 157.759C430.043 157.759 414.449 162.113 400.305 170.817C386.16 179.522 375.101 192.033 367.122 208.351C359.508 224.306 356.425 243.345 357.874 265.469C356.425 286.865 359.689 305.723 367.665 322.04C376.007 337.996 387.612 350.511 402.482 359.577C417.713 368.278 434.212 372.632 451.982 372.632C471.564 372.632 488.067 368.097 501.483 359.03C514.904 349.964 525.781 338.362 534.123 324.217L576.553 345.976C570.751 359.392 561.684 371.726 549.354 382.966C537.387 393.847 523.061 402.551 506.381 409.078C490.059 415.605 471.745 418.869 451.439 418.869Z"
          fill="url(#paint1_linear_2175_15792)"
        />
        <path
          d="M592.434 521.134V119.139H641.934V182.238L635.407 169.727C646.285 152.323 661.154 138.54 680.011 128.387C698.868 117.868 720.445 112.612 744.743 112.612C772.304 112.612 796.968 119.321 818.727 132.737C840.847 146.158 858.256 164.471 870.948 187.679C883.64 210.528 889.986 236.636 889.986 266.012C889.986 294.66 883.64 320.592 870.948 343.799C858.256 367.01 840.847 385.324 818.727 398.740C796.968 412.161 772.123 418.869 744.2 418.869C720.63 418.869 699.049 413.61 679.468 403.094C660.248 392.575 645.379 377.706 634.86 358.487L643.021 349.783V521.134H592.434ZM740.393 369.911C758.888 369.911 775.387 365.376 789.894 356.31C804.401 347.247 815.644 334.914 823.62 319.32C831.962 303.364 836.131 285.594 836.131 266.012C836.131 245.703 831.962 227.932 823.62 212.701C815.644 197.107 804.401 184.777 789.894 175.711C775.387 166.282 758.888 161.57 740.393 161.57C721.898 161.57 705.214 166.101 690.349 175.167C675.842 184.234 664.236 196.745 655.532 212.701C647.19 228.298 643.021 246.065 643.021 266.012C643.021 285.594 647.19 303.364 655.532 319.32C664.236 334.914 675.842 347.247 690.349 356.31C705.214 365.376 721.898 369.911 740.393 369.911Z"
          fill="url(#paint2_linear_2175_15792)"
        />
        <path
          d="M986.376 418.869C967.157 418.869 950.111 415.424 935.246 408.535C920.739 401.279 909.314 391.489 900.972 379.159C892.634 366.467 888.461 351.96 888.461 335.642C888.461 320.048 891.725 306.085 898.252 293.755C905.145 281.063 915.66 270.363 929.805 261.658C944.312 252.958 962.441 246.793 984.203 243.163L1093 225.216V267.642L995.624 283.964C976.767 287.228 962.988 293.212 954.284 301.916C945.942 310.62 941.773 321.316 941.773 334.008C941.773 345.976 946.485 355.948 955.914 363.927C965.708 371.907 977.857 375.895 992.36 375.895C1010.86 375.895 1026.81 372.088 1040.23 364.471C1054.01 356.495 1064.71 345.795 1072.32 332.378C1080.3 318.958 1084.29 304.089 1084.29 287.771V213.248C1084.29 197.288 1078.31 184.415 1066.34 174.624C1054.74 164.471 1039.33 159.393 1020.1 159.393C1003.42 159.393 988.553 163.743 975.499 172.447C962.807 180.789 953.374 192.033 947.209 206.174L903.149 183.328C908.59 169.908 917.294 157.944 929.262 147.425C941.229 136.548 955.189 128.025 971.145 121.86C987.104 115.695 1003.78 112.612 1021.19 112.612C1043.68 112.612 1063.44 116.963 1080.48 125.667C1097.53 134.009 1110.77 145.795 1120.19 161.027C1129.99 175.892 1134.88 193.3 1134.88 213.248V412.342H1085.38V356.857L1094.63 360.121C1088.46 371.726 1080.12 381.879 1069.61 390.583C1059.09 399.287 1046.76 406.177 1032.61 411.251C1018.47 416.33 1003.06 418.869 986.376 418.869Z"
          fill="url(#paint3_linear_2175_15792)"
        />
        <path
          d="M1161.19 532.003C1154.66 532.003 1148.13 531.46 1141.6 530.369C1135.08 529.283 1128.91 527.472 1123.11 524.932V479.782C1127.1 480.506 1131.99 481.231 1137.8 481.959C1143.96 483.045 1149.94 483.589 1155.75 483.589C1172.79 483.589 1185.67 479.782 1194.37 472.164C1203.44 464.913 1211.96 452.22 1219.94 434.088L1238.43 390.027L1237.34 434.088L1112.23 119.127H1167.17L1264.54 369.355H1248.22L1345.05 119.127H1401.08L1268.89 447.142C1262.73 462.735 1254.75 476.88 1244.96 489.572C1235.53 502.627 1223.92 512.965 1210.15 520.579C1196.36 528.196 1180.05 532.003 1161.19 532.003Z"
          fill="url(#paint4_linear_2175_15792)"
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_2175_15792"
          x1="143.577"
          y1="82.7393"
          x2="151.544"
          y2="380.006"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#474747" />
          <stop offset="1" stopColor="#5F5F5F" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_2175_15792"
          x1="438.835"
          y1="172.787"
          x2="443.372"
          y2="390.483"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#474747" />
          <stop offset="1" stopColor="#5F5F5F" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_2175_15792"
          x1="735.046"
          y1="192.88"
          x2="742.644"
          y2="483.197"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#474747" />
          <stop offset="1" stopColor="#5F5F5F" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="paint3_linear_2175_15792"
          x1="1006.57"
          y1="172.787"
          x2="1011.72"
          y2="390.455"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#474747" />
          <stop offset="1" stopColor="#5F5F5F" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="paint4_linear_2175_15792"
          x1="1250.67"
          y1="200.25"
          x2="1258.67"
          y2="493.644"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#474747" />
          <stop offset="1" stopColor="#5F5F5F" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
  const MobileLogo = () => (
    <svg
      width="1402"
      height="452"
      viewBox="0 0 1402 452"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="max-w-full h-auto"
      style={{ maxWidth: "1400px", height: "auto" }}
    >
      {" "}
      <g opacity="0.3">
        {" "}
        <path
          d="M152.735 418.863C129.162 418.863 107.584 413.604 87.9988 403.089C68.7796 392.57 53.9104 377.701 43.3954 358.482L50.4657 349.777V412.337H0.964844V0.546875H51.5563V182.233L43.9385 169.722C54.8197 152.317 69.689 138.534 88.5461 128.381C107.403 117.862 128.981 112.607 153.278 112.607C180.84 112.607 205.499 119.315 227.258 132.732C249.379 146.152 266.787 164.466 279.479 187.673C292.171 210.522 298.517 236.631 298.517 266.007C298.517 294.655 292.171 320.586 279.479 343.793C266.787 367.005 249.379 385.318 227.258 398.735C205.499 412.155 180.658 418.863 152.735 418.863ZM148.924 369.906C167.419 369.906 183.922 365.371 198.429 356.304C212.932 347.242 224.176 334.908 232.155 319.315C240.493 303.364 244.666 285.589 244.666 266.007C244.666 245.697 240.493 227.926 232.155 212.695C224.176 197.102 212.932 184.772 198.429 175.705C183.922 166.277 167.419 161.565 148.924 161.565C130.429 161.565 113.749 166.096 98.8801 175.162C84.3731 184.228 72.7714 196.739 64.0672 212.695C55.7252 228.293 51.5563 246.059 51.5563 266.007C51.5563 285.589 55.7252 303.364 64.0672 319.315C72.7714 334.908 84.3731 347.242 98.8801 356.304C113.749 365.371 130.429 369.906 148.924 369.906Z"
          fill="url(#paint0_linear_2175_15792_mobile)"
        />{" "}
        <path
          d="M451.439 418.869C423.15 418.869 397.946 412.161 375.826 398.74C353.705 385.324 336.297 367.01 323.605 343.799C310.912 320.229 304.566 293.936 304.566 264.926C304.566 235.55 310.731 209.437 323.061 186.592C335.753 163.743 352.796 145.795 374.192 132.737C395.954 119.321 420.252 112.612 447.085 112.612C468.844 112.612 488.067 116.6 504.747 124.58C521.793 132.194 536.115 142.713 547.721 156.129C559.688 169.184 568.755 184.234 574.92 201.28C581.447 217.96 584.71 235.369 584.71 253.501C584.71 257.489 584.348 262.024 583.624 267.099C583.262 271.815 582.719 276.346 581.99 280.7H341.556V237.179H552.618L528.682 256.765C531.946 237.908 530.135 221.043 523.242 206.174C516.353 191.304 506.2 179.522 492.779 170.817C479.363 162.113 464.131 157.759 447.085 157.759C430.043 157.759 414.449 162.113 400.305 170.817C386.16 179.522 375.101 192.033 367.122 208.351C359.508 224.306 356.425 243.345 357.874 265.469C356.425 286.865 359.689 305.723 367.665 322.04C376.007 337.996 387.612 350.511 402.482 359.577C417.713 368.278 434.212 372.632 451.982 372.632C471.564 372.632 488.067 368.097 501.483 359.03C514.904 349.964 525.781 338.362 534.123 324.217L576.553 345.976C570.751 359.392 561.684 371.726 549.354 382.966C537.387 393.847 523.061 402.551 506.381 409.078C490.059 415.605 471.745 418.869 451.439 418.869Z"
          fill="url(#paint1_linear_2175_15792_mobile)"
        />{" "}
        <path
          d="M592.434 521.134V119.139H641.934V182.238L635.407 169.727C646.285 152.323 661.154 138.54 680.011 128.387C698.868 117.868 720.445 112.612 744.743 112.612C772.304 112.612 796.968 119.321 818.727 132.737C840.847 146.158 858.256 164.471 870.948 187.679C883.64 210.528 889.986 236.636 889.986 266.012C889.986 294.66 883.64 320.592 870.948 343.799C858.256 367.01 840.847 385.324 818.727 398.740C796.968 412.161 772.123 418.869 744.2 418.869C720.63 418.869 699.049 413.61 679.468 403.094C660.248 392.575 645.379 377.706 634.86 358.487L643.021 349.783V521.134H592.434ZM740.393 369.911C758.888 369.911 775.387 365.376 789.894 356.31C804.401 347.247 815.644 334.914 823.62 319.32C831.962 303.364 836.131 285.594 836.131 266.012C836.131 245.703 831.962 227.932 823.62 212.701C815.644 197.107 804.401 184.777 789.894 175.711C775.387 166.282 758.888 161.57 740.393 161.57C721.898 161.57 705.214 166.101 690.349 175.167C675.842 184.234 664.236 196.745 655.532 212.701C647.19 228.298 643.021 246.065 643.021 266.012C643.021 285.594 647.19 303.364 655.532 319.32C664.236 334.914 675.842 347.247 690.349 356.31C705.214 365.376 721.898 369.911 740.393 369.911Z"
          fill="url(#paint2_linear_2175_15792_mobile)"
        />{" "}
        <path
          d="M986.376 418.869C967.157 418.869 950.111 415.424 935.246 408.535C920.739 401.279 909.314 391.489 900.972 379.159C892.634 366.467 888.461 351.96 888.461 335.642C888.461 320.048 891.725 306.085 898.252 293.755C905.145 281.063 915.66 270.363 929.805 261.658C944.312 252.958 962.441 246.793 984.203 243.163L1093 225.216V267.642L995.624 283.964C976.767 287.228 962.988 293.212 954.284 301.916C945.942 310.62 941.773 321.316 941.773 334.008C941.773 345.976 946.485 355.948 955.914 363.927C965.708 371.907 977.857 375.895 992.36 375.895C1010.86 375.895 1026.81 372.088 1040.23 364.471C1054.01 356.495 1064.71 345.795 1072.32 332.378C1080.3 318.958 1084.29 304.089 1084.29 287.771V213.248C1084.29 197.288 1078.31 184.415 1066.34 174.624C1054.74 164.471 1039.33 159.393 1020.1 159.393C1003.42 159.393 988.553 163.743 975.499 172.447C962.807 180.789 953.374 192.033 947.209 206.174L903.149 183.328C908.59 169.908 917.294 157.944 929.262 147.425C941.229 136.548 955.189 128.025 971.145 121.86C987.104 115.695 1003.78 112.612 1021.19 112.612C1043.68 112.612 1063.44 116.963 1080.48 125.667C1097.53 134.009 1110.77 145.795 1120.19 161.027C1129.99 175.892 1134.88 193.3 1134.88 213.248V412.342H1085.38V356.857L1094.63 360.121C1088.46 371.726 1080.12 381.879 1069.61 390.583C1059.09 399.287 1046.76 406.177 1032.61 411.251C1018.47 416.33 1003.06 418.869 986.376 418.869Z"
          fill="url(#paint3_linear_2175_15792_mobile)"
        />{" "}
        <path
          d="M1161.19 532.003C1154.66 532.003 1148.13 531.46 1141.6 530.369C1135.08 529.283 1128.91 527.472 1123.11 524.932V479.782C1127.1 480.506 1131.99 481.231 1137.8 481.959C1143.96 483.045 1149.94 483.589 1155.75 483.589C1172.79 483.589 1185.67 479.782 1194.37 472.164C1203.44 464.913 1211.96 452.22 1219.94 434.088L1238.43 390.027L1237.34 434.088L1112.23 119.127H1167.17L1264.54 369.355H1248.22L1345.05 119.127H1401.08L1268.89 447.142C1262.73 462.735 1254.75 476.88 1244.96 489.572C1235.53 502.627 1223.92 512.965 1210.15 520.579C1196.36 528.196 1180.05 532.003 1161.19 532.003Z"
          fill="url(#paint4_linear_2175_15792_mobile)"
        />{" "}
      </g>{" "}
      <defs>
        <linearGradient
          id="paint0_linear_2175_15792_mobile"
          x1="143.577"
          y1="82.7393"
          x2="151.544"
          y2="380.006"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#A0A0A0" />
          <stop offset="1" stopColor="black" />
        </linearGradient>{" "}
        <linearGradient
          id="paint1_linear_2175_15792_mobile"
          x1="438.835"
          y1="172.787"
          x2="443.372"
          y2="390.483"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#A0A0A0" />
          <stop offset="1" stopColor="black" />
        </linearGradient>{" "}
        <linearGradient
          id="paint2_linear_2175_15792_mobile"
          x1="735.046"
          y1="192.88"
          x2="742.644"
          y2="483.197"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#A0A0A0" />
          <stop offset="1" stopColor="black" />
        </linearGradient>{" "}
        <linearGradient
          id="paint3_linear_2175_15792_mobile"
          x1="1006.57"
          y1="172.787"
          x2="1011.72"
          y2="390.455"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#A0A0A0" />
          <stop offset="1" stopColor="black" />
        </linearGradient>{" "}
        <linearGradient
          id="paint4_linear_2175_15792_mobile"
          x1="1250.67"
          y1="200.25"
          x2="1258.67"
          y2="493.644"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#A0A0A0" />
          <stop offset="1" stopColor="black" />
        </linearGradient>
      </defs>{" "}
    </svg>
  );

  return (
    <>
      <footer
        ref={footerRef}
        className="w-full bg-black text-white relative overflow-hidden pt-20 px-4 sm:px-6 lg:px-8"
      >
        <motion.div
          className="max-w-7xl mx-auto flex flex-col items-center gap-16 relative z-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
        >
          <motion.div className="text-center max-w-4xl" variants={itemVariants}>
            <h2
              className={`${headingSize} text-transparent bg-clip-text [background-image:linear-gradient(90deg,#F9F9F9_0%,rgba(249,249,249,0.5)_31.33%,#F9F9F9_64.79%,rgba(249,249,249,0.5)_98.29%)] font-medium mb-6 leading-tight`}
            >
              {heading || "Ready to transform your financial future?"}
            </h2>
            <p className="text-[#6A6A6A] text-[13px] font-medium leading-relaxed">
                           {" "}
              {isUpiPage ? (
                "It’s time your wallet started working for you. With bepay, every swipe, scan, and spend puts money back where it belongs — in your hands."
              ) : (
                <>
                                        Join millions of users who trust bepay
                  for their crypto financial                       needs. Start
                  earning, spending, and growing your wealth today with        
                                the most comprehensive crypto financial
                  platform.                    {" "}
                </>
              )}
                         {" "}
            </p>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
            variants={containerVariants}
          >
            <AppStoreButton
              onClick={handleAppStoreClick}
              iconSrc="/apple.png"
              iconAlt="Apple Store"
              line1="Download on the "
              line2=" App Store!"
            />
            <AppStoreButton
              onClick={handleGooglePlayClick}
              iconSrc="/playstore.png"
              iconAlt="Google Play"
              line1="Get the App on "
              line2="Google Play!"
            />
            <AppStoreButton
              onClick={handleAppGalleryClick}
              iconSrc="/huawei.png"
              iconAlt="Huawei App Gallery"
              line1="Get it on the App "
              line2=" Gallery!"
            />
          </motion.div>

          <motion.div
            className="w-full flex flex-col items-center gap-6"
            variants={itemVariants}
          >
            <>
              <div className="flex flex-col md:flex-row items-center gap-6">
                {!isSubscribed ? (
                  <form
                    onSubmit={handleSubmit}
                    className="flex flex-col items-center lg:items-start gap-3 w-full max-w-md px-2 sm:px-0"
                  >
                    <p className="text-[#6A6A6A] text-[11px] text-center lg:text-left">
                      Sign-up to our newsletter for exclusive updates!
                    </p>
                    <div className="flex flex-col gap-2 w-full sm:hidden">
                      <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onFocus={handleEmailFocus}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-transparent px-4 py-3 text-#6A6A6A placeholder:[#888888] focus:outline-none border border-[#C6C6C626] rounded-full w-full text-sm"
                        aria-label="Email for newsletter"
                        disabled={isSubmitting}
                      />
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-[#3333334D] text-white cursor-pointer px-6 py-3 rounded-full font-medium transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed w-full text-center"
                      >
                        {isSubmitting ? "Submitting..." : "Submit"}
                      </button>
                    </div>
                    <div className="hidden sm:flex items-center border border-[#C6C6C626] rounded-full p-1 pr-2 w-full">
                      <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onFocus={handleEmailFocus}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-transparent px-4 py-2 text-white placeholder:[#888888] focus:outline-none w-full text-sm"
                        aria-label="Email for newsletter"
                        disabled={isSubmitting}
                      />
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-[#3333334D] text-white cursor-pointer px-6 py-2 rounded-full font-medium transition-colors text-sm shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? "Submitting..." : "Submit"}
                      </button>
                    </div>
                    {error && (
                      <p className="text-red-400 text-sm mt-1 text-center lg:text-left">
                        {error}
                      </p>
                    )}
                  </form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-row items-center gap-2 text-center"
                  >
                    <div className="w-8 h-8  bg-green-500/20 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-green-400" />
                    </div>
                    <div>
                      <h3 className="text-md font-semibold text-white ">
                        Thank you for subscribing to our newsletter
                      </h3>
                    </div>
                  </motion.div>
                )}
                <div className="flex gap-3 lg:mt-7">
                  {/* ANALYTICS: Added onClick handlers for social media links */}
                  <Link
                    href="https://www.linkedin.com/company/bepaymoney/"
                    onClick={() =>
                      AnalyticsService.sendEvent(
                        "Social media link clicked: LinkedIn"
                      )
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="w-10 h-10 border p-[10px] border-[#191919] rounded-[10px] flex items-center justify-center hover:bg-white/10 transition-colors hover:border-white/40"
                  >
                    {" "}
                    <svg
                      width="21"
                      height="20"
                      viewBox="0 0 21 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {" "}
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M7.93279 7.197H11.5081V8.97791C12.0231 7.95365 13.3439 7.03335 15.3279 7.03335C19.1313 7.03335 20.0343 9.07225 20.0343 12.8131V19.7413H16.1837V13.6651C16.1837 11.5347 15.6687 10.3333 14.3575 10.3333C12.5391 10.3333 11.7834 11.6281 11.7834 13.6641V19.7413H7.93279V7.197ZM1.32996 19.5777H5.18057V7.03335H1.32996V19.5777ZM5.73217 2.94304C5.73231 3.2658 5.6683 3.58536 5.54386 3.88316C5.41942 4.18096 5.23703 4.45105 5.00729 4.67774C4.77687 4.90697 4.50354 5.08854 4.20292 5.21209C3.9023 5.33564 3.58028 5.39875 3.25526 5.39781C2.60028 5.39633 1.97197 5.13816 1.50516 4.6787C1.27634 4.45118 1.09462 4.18077 0.970407 3.88295C0.846191 3.58512 0.781913 3.26573 0.78125 2.94304C0.78125 2.29133 1.04117 1.66753 1.50613 1.20738C1.97176 0.746159 2.60083 0.48768 3.25623 0.488282C3.91276 0.488282 4.54233 0.747236 5.00729 1.20738C5.47225 1.66753 5.73217 2.29133 5.73217 2.94304Z"
                        fill="#C0C0C0"
                      />{" "}
                    </svg>{" "}
                  </Link>
                  <Link
                    href="https://x.com/bepaymoney"
                    onClick={() =>
                      AnalyticsService.sendEvent(
                        "Social media link clicked: Twitter"
                      )
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Twitter"
                    className="w-10 h-10 border p-[10px] border-[#191919] rounded-[10px] flex items-center justify-center hover:bg-white/10 transition-colors hover:border-white/40"
                  >
                    {" "}
                    <svg
                      width="21"
                      height="19"
                      viewBox="0 0 21 19"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {" "}
                      <path
                        d="M16.1562 0.0546875H19.2234L12.5234 7.73183L20.4062 18.1804H14.2348L9.39768 11.8447L3.86911 18.1804H0.799107L7.96482 9.96611L0.40625 0.0561161H6.73482L11.1005 5.84612L16.1562 0.0546875ZM15.0777 16.3404H16.7777L5.80625 1.79897H3.98339L15.0777 16.3404Z"
                        fill="#C0C0C0"
                      />{" "}
                    </svg>{" "}
                  </Link>
                  <Link
                    href="https://www.facebook.com/bepaymoney/"
                    onClick={() =>
                      AnalyticsService.sendEvent(
                        "Social media link clicked: Facebook"
                      )
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="w-10 h-10 border p-[10px] border-[#191919] rounded-[10px] flex items-center justify-center hover:bg-white/10 transition-colors hover:border-white/40"
                  >
                    {" "}
                    <svg
                      width="11"
                      height="20"
                      viewBox="0 0 11 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {" "}
                      <path
                        d="M7.11656 11.586H9.56054L10.5381 7.67567H7.11656V5.72049C7.11656 4.71357 7.11656 3.76531 9.07174 3.76531H10.5381V0.480613C10.2194 0.438576 9.01602 0.34375 7.74515 0.34375C5.091 0.34375 3.20621 1.96362 3.20621 4.93842V7.67567H0.273438V11.586H3.20621V19.8955H7.11656V11.586Z"
                        fill="#C0C0C0"
                      />{" "}
                    </svg>{" "}
                  </Link>
                  <Link
                    href="https://t.me/officialbepay"
                    onClick={() =>
                      AnalyticsService.sendEvent(
                        "Social media link clicked: telegram"
                      )
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Telegram"
                    className="w-10 h-10 p-[10px] border border-[#191919] rounded-[10px] flex items-center justify-center hover:bg-white/10 transition-colors hover:border-white/40"
                  >
                    {" "}
                    <svg
                      width="21"
                      height="18"
                      viewBox="0 0 21 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {" "}
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M18.0371 1.00318C18.2739 0.903518 18.533 0.869146 18.7876 0.903639C19.0422 0.938133 19.2829 1.04023 19.4846 1.19931C19.6864 1.35838 19.8418 1.56862 19.9347 1.80814C20.0276 2.04766 20.0546 2.3077 20.0129 2.5612L17.8397 15.7431C17.6289 17.0146 16.2338 17.7438 15.0676 17.1104C14.0922 16.5805 12.6434 15.7641 11.3403 14.9123C10.6887 14.4859 8.69279 13.1205 8.93809 12.1489C9.14889 11.3181 12.5026 8.19633 14.419 6.34031C15.1711 5.61113 14.8281 5.19048 13.9399 5.86122C11.7341 7.52656 8.19262 10.0591 7.02171 10.772C5.98877 11.4005 5.45027 11.5078 4.80636 11.4005C3.63162 11.2051 2.54215 10.9023 1.65295 10.5334C0.451377 10.0351 0.509827 8.38318 1.65199 7.90217L18.0371 1.00318Z"
                        fill="#C0C0C0"
                      />{" "}
                    </svg>{" "}
                  </Link>
                </div>
              </div>
            </>
          </motion.div>

          {/* === MODIFICATION START: Conditional link rendering for mobile UPI view === */}
          {/* === MODIFICATION START: Conditional link rendering for mobile UPI view === */}
          <motion.div
            // Default to flex-col (vertical list) on mobile. Use md:flex (row) on desktop.
            className={`w-full mt-8 text-[14px] ${
              isUpiPage
                ? "grid grid-cols-2 gap-8 md:grid-cols-4"
                : "grid grid-cols-2 gap-8 md:flex md:justify-between"
            }`}
            variants={itemVariants}
          >
            {isUpiPage ? (
              <>
                {/* UPI Page - Column 1 */}
                <div className="space-y-4 flex flex-col">
                  <Link
                    href="/about-us"
                    onClick={() => handleLinkClick("About Us")}
                    className="block text-[#7A7A7A] hover:text-gray-400 transition-colors"
                  >
                    ABOUT US
                  </Link>
                  <Link
                    href="/bepay-foundations"
                    onClick={() => handleLinkClick("Bepay Foundation")}
                    className="block text-[#7A7A7A] hover:text-gray-400 transition-colors"
                  >
                    BEPAY FOUNDATION
                  </Link>
                </div>

                {/* UPI Page - Column 2 */}
                <div className="space-y-4 flex flex-col md:col-start-2">
                  <Link
                    href="/contact-us"
                    onClick={() => handleLinkClick("Contact Us")}
                    className="block text-[#7A7A7A] hover:text-gray-400 transition-colors"
                  >
                    CONTACT US
                  </Link>
                  <Link
                    href="/privacy-policy"
                    onClick={() => handleLinkClick("Privacy Policy")}
                    className="block text-[#7A7A7A] hover:text-gray-400 transition-colors"
                  >
                    PRIVACY POLICY
                  </Link>
                </div>

                {/* UPI Page - Column 3 (starts new row on mobile) */}
                <div className="space-y-4 flex flex-col md:col-start-3">
                  <Link
                    href="/terms-and-conditions"
                    onClick={() => handleLinkClick("Terms & Conditions")}
                    className="block text-[#7A7A7A] hover:text-gray-400 transition-colors"
                  >
                    TERMS & CONDITIONS
                  </Link>
                  <Link
                    href="/legal-disclamer"
                    onClick={() => handleLinkClick("Legal Disclaimer")}
                    className="block uppercase text-[#7A7A7A] hover:text-gray-400 transition-colors"
                  >
                    LEGAL DISCLAIMER
                  </Link>
                </div>

                {/* UPI Page - Column 4 */}
                <div className="space-y-4 flex flex-col md:col-start-4">
                  <Link
                    href="/"
                    onClick={() => handleLinkClick("Switch to Global")}
                    className="block uppercase text-[#7A7A7A] hover:text-gray-400 transition-colors"
                  >
                    SWITCH TO GLOBAL
                  </Link>
                </div>
              </>
            ) : (
              // Default Footer links for all other pages
              <>
                <div className="space-y-4">
                  <div className="space-y-4 lg:space-y-6">
                    <Link
                      href="/"
                      onClick={() => handleLinkClick("Personal")}
                      className="block text-[#7A7A7A] hover:text-gray-400 transition-colors"
                    >
                      PERSONAL
                    </Link>
                    <Link
                      href="/business"
                      onClick={() => handleLinkClick("Business")}
                      className="block text-[#7A7A7A] hover:text-gray-400 transition-colors"
                    >
                      BUSINESS
                    </Link>
                    <Link
                      href="/bepay-foundations"
                      onClick={() => handleLinkClick("Bepay Foundations")}
                      className="block text-[#7A7A7A] hover:text-gray-400 transition-colors"
                    >
                      BEPAY FOUNDATIONS
                    </Link>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="space-y-4 lg:space-y-6">
                    <Link
                      href="/about-us"
                      onClick={() => handleLinkClick("About Us")}
                      className="block text-[#7A7A7A] hover:text-gray-400 transition-colors"
                    >
                      ABOUT US
                    </Link>
                    <Link
                      href="/contact-us"
                      onClick={() => handleLinkClick("Contact Us")}
                      className="block text-[#7A7A7A] hover:text-gray-400 transition-colors"
                    >
                      CONTACT US
                    </Link>
                    <Link
                      href="/privacy-policy"
                      onClick={() => handleLinkClick("Privacy Policy")}
                      className="block text-[#7A7A7A] hover:text-gray-400 transition-colors"
                    >
                      PRIVACY POLICY
                    </Link>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="space-y-6 lg:space-y-6">
                    <Link
                      href="/delete-account"
                      onClick={() => handleLinkClick("Account Deletion Form")}
                      className="block text-[#7A7A7A] hover:text-gray-400 transition-colors"
                    >
                      ACCOUNT DELETION FORM
                    </Link>
                    <Link
                      href="/privacy-policy-for-deleting-user-account"
                      onClick={() =>
                        handleLinkClick("For Deleting User Account")
                      }
                      className="block uppercase text-[#7A7A7A] hover:text-gray-400 transition-colors"
                    >
                      for deleting user account
                    </Link>
                    <Link
                      href="/privacy-policy-for-deleting-merchant-account"
                      onClick={() =>
                        handleLinkClick("For Deleting Merchant Account")
                      }
                      className="block uppercase text-[#7A7A7A] hover:text-gray-400 transition-colors "
                    >
                      for deleting merchant account
                    </Link>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="space-y-5 lg:space-y-6">
                    <Link
                      href="/terms-and-conditions"
                      onClick={() => handleLinkClick("Terms & Conditions")}
                      className="block text-[#7A7A7A] hover:text-gray-400 transition-colors"
                    >
                      TERMS & CONDITIONS
                    </Link>
                    <Link
                      href="/legal-disclamer"
                      onClick={() => handleLinkClick("Legal Disclaimer")}
                      className="block uppercase text-[#7A7A7A] hover:text-gray-400 transition-colors"
                    >
                      Legal disclaimer
                    </Link>
                    <Link
                      href="/cookie-policy"
                      onClick={() => handleLinkClick("Cookie Policy")}
                      className="block uppercase text-[#7A7A7A] hover:text-gray-400 transition-colors"
                    >
                      Cookie Policy
                    </Link>
                  </div>
                </div>
              </>
            )}
          </motion.div>
          {/* === MODIFICATION END: Conditional link rendering for mobile UPI view === */}
        </motion.div>

        <motion.div
          className="relative w-full flex justify-center mt-16 mb-8"
          variants={fadeInScale}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
        >
          <motion.div
            className="card relative w-full h-full z-50"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: false, amount: 0.5 }}
          >
            <div className="flex items-center justify-center">
              {isMobile ? <MobileLogo /> : <DesktopLogo />}
            </div>
          </motion.div>
        </motion.div>

        <p className="text-[8px] font-[400] lg:tracking-[2%] lg:leading-[20px] max-w-[1359px] mx-auto lg:text-[10px] text-[#6A6A6A]">
          {isUpiPage ? (
            <>
              bepay operates under the brand name “bepay money”, with its
              registered legal entity Bepay Technologies Private Limited.
              Payment services on this platform are provided in partnership with
              authorized banking and payment partners, in compliance with
              guidelines issued by the Reserve Bank of India (RBI) and the
              National Payments Corporation of India (NPCI).The information and
              services presented on this website are intended for general
              informational purposes only and do not constitute financial,
              investment, or legal advice. bepay money does not operate as a
              bank, financial institution, or digital asset exchange.
              Availability of services is subject to regulatory approvals and
              partner bank policies.
            </>
          ) : (
            <>
              bepay operates under the brand name bepay through its legal
              entities registered across multiple jurisdictions worldwide: Bepay
              Fintech Products Holding LTD, British Virgin Islands (Registration
              No: 2185015); Bepay Money Europe S.R.L, Romania (Registration No:
              52474864); Bepay Money Fintech UAB, Lithuania, European Union
              (Registration No: 306999867); and Bepay Fintech Inc, United States
              (Registration No: 31000294520372). The information and services
              presented on this website are provided for informational purposes
              only and do not constitute financial, investment, or legal advice.
              bepay does not operate as a bank, financial institution, or
              digital asset exchange. All wallet and payment-related services
              are provided in a non-custodial capacity, leveraging public
              distributed ledger technologies and open-source data from
              integrated platforms and partners. Cryptocurrency trading is
              highly volatile, and users may lose their entire investment; all
              activities are undertaken at your own risk. bepay holds ISO 9001,
              ISO 20022, and ISO 27001 certifications, and is
              licensed/registered under applicable frameworks including MSB,
              DORA, MiCA, VASP, and DPDP
            </>
          )}
        </p>
      </footer>

      <NewsletterModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  );
};

export default Footer;

//comment
