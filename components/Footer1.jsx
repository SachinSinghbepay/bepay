"use client";
import { motion } from "framer-motion";
import React from "react";

import { Linkedin, Twitter, Facebook, Send, Check } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { IconBrandX } from "@tabler/icons-react";

const AppStoreButton = ({ iconSrc, iconAlt, line1, line2 }) => (
  <motion.button
    className="flex items-center w-full sm:w-auto justify-center gap-3 border border-white/20 rounded-full px-6 py-3 hover:bg-white/10 transition-colors"
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
      className="h-6 w-6"
    />
    <div className="text-left">
      <span className="text-xs block">{line1}</span>
      <span className="font-semibold">{line2}</span>
    </div>
  </motion.button>
);

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState("");

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);

    try {
      await addDoc(collection(db, "newsletter_subscribers"), {
        email: email.trim(),
        subscribedAt: new Date(),
        timestamp: Date.now(),
      });

      setIsSubscribed(true);
      setEmail("");
    } catch (error) {
      console.error("Error adding email to newsletter:", error);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const fadeInScale = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <footer className="w-full bg-black text-white relative overflow-hidden pt-20 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="max-w-7xl mx-auto flex flex-col items-center gap-16 relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.1 }}
        variants={containerVariants}
      >
        {/* CTA Section */}
        <motion.div className="text-center max-w-4xl" variants={itemVariants}>
          <h2 className="text-4xl md:text-5xl font-light mb-6 leading-tight">
            Ready to make every transaction an opportunity?
          </h2>
          <p className="text-[#6A6A6A] text-lg leading-relaxed">
            Join the financial revolution where spending no longer means losing
            money
          </p>
        </motion.div>

        {/* App Store Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          variants={containerVariants}
        >
          <AppStoreButton
            iconSrc="/apple.png"
            iconAlt="Apple Store"
            line1="Download on the"
            line2="App Store!"
          />
          <AppStoreButton
            iconSrc="/playstore.png"
            iconAlt="Google Play"
            line1="Get the App on"
            line2="Google Play!"
          />
          <AppStoreButton
            iconSrc="/huawei.png"
            iconAlt="Huawei App Gallery"
            line1="Get it on the App"
            line2="Gallery!"
          />
        </motion.div>

        {/* Newsletter and Socials */}
        <motion.div
          className="w-full flex flex-col items-center gap-6"
          variants={itemVariants}
        >
          <>
            <p className="text-[#6A6A6A] text-sm">
              Sign-up to our newsletter for exclusive updates!
            </p>
            <div className="flex flex-col md:flex-row items-center gap-6">
              {!isSubscribed ? (
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col items-center gap-2"
                >
                  <div className="flex items-center gap-2 border border-[#C6C6C626] rounded-full p-1 pr-2">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-transparent px-4 py-2 text-white placeholder-gray-500 focus:outline-none w-64"
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
                    <p className="text-red-400 text-sm mt-1">{error}</p>
                  )}
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center gap-4 text-center"
                >
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
                    <Check className="w-8 h-8 text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      Thanks for subscribing to our newsletter!
                    </h3>
                    <p className="text-[#6A6A6A] text-sm">
                      You'll receive exclusive updates and offers directly in
                      your inbox.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsSubscribed(false)}
                    className="text-[#6A6A6A] text-sm hover:text-white transition-colors underline"
                  >
                    Subscribe another email
                  </button>
                </motion.div>
              )}
              <div className="flex gap-3">
                <a
                  href="https://www.linkedin.com/company/bepaymoney/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="w-10 h-10 border border-gray-600 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors hover:border-white/40"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="https://x.com/bepaymoney"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                  className="w-10 h-10 border border-gray-600 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors hover:border-white/40"
                >
                  <IconBrandX className="w-5 h-5" />
                </a>
                <a
                  href="https://www.facebook.com/bepaymoney/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-10 h-10 border border-gray-600 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors hover:border-white/40"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="https://t.me/officialbepaymoney"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Telegram"
                  className="w-10 h-10 border border-gray-600 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors hover:border-white/40"
                >
                  <Send className="w-5 h-5" />
                </a>
              </div>
            </div>
          </>
        </motion.div>

        {/* Footer Links Grid */}
        <motion.div
          className="w-full grid grid-cols-2 md:grid-cols-4 gap-8 mt-8 text-sm"
          variants={itemVariants}
        >
          <div className="space-y-4">
            <div className="space-y-3 lg:space-y-6">
              <a
                href="/"
                className="block text-[#6A6A6A] hover:text-gray-400 transition-colors"
              >
                PERSONAL
              </a>
              <a
                href="/business"
                className="block text-[#6A6A6A] hover:text-gray-400 transition-colors"
              >
                BUSINESS
              </a>
            </div>
          </div>
          <div className="space-y-4">
            <div className="space-y-3 lg:space-y-6">
              <a
                href="/about-us"
                className="block text-[#6A6A6A] hover:text-gray-400 transition-colors"
              >
                ABOUT US
              </a>
              <a
                href="/contact-us"
                className="block text-[#6A6A6A] hover:text-gray-400 transition-colors"
              >
                CONTACT US
              </a>
            </div>
          </div>
          <div className="space-y-4">
            <div className="space-y-3 lg:space-y-6">
              <a
                href="/privacy-policy"
                className="block text-[#6A6A6A] hover:text-gray-400 transition-colors"
              >
                PRIVACY POLICY
              </a>
              <a
                href="/privacy-policy-for-deleting-user-account"
                className="block uppercase text-[#6A6A6A] hover:text-gray-400 transition-colors"
              >
                for deleting user account 
              </a>
              <a
                href="/privacy-policy-for-deleting-merchant-account"
                className="block uppercase text-[#6A6A6A] hover:text-gray-400 transition-colors"
              >
                for deleting merchant account
              </a>
            </div>
          </div>
          <div className="space-y-4">
            <div className="space-y-3 lg:space-y-6">
              <a
                href="/terms-and-conditions"
                className="block text-[#6A6A6A] hover:text-gray-400 transition-colors"
              >
                TERMS & CONDITIONS
              </a>
              <a
                href="/legal-disclamer"
                className="block uppercase text-[#6A6A6A] hover:text-gray-400 transition-colors"
              >
                Legal disclaimer
              </a>
            </div>
          </div>
        </motion.div>

        {/* Large Logo */}
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
                .hover-logo:hover #paint0_linear_2175_15792 stop:first-child {
                  stop-color: #ffffff;
                }
                .hover-logo:hover #paint1_linear_2175_15792 stop:first-child {
                  stop-color: #ffffff;
                }
                .hover-logo:hover #paint2_linear_2175_15792 stop:first-child {
                  stop-color: #ffffff;
                }
                .hover-logo:hover #paint3_linear_2175_15792 stop:first-child {
                  stop-color: #ffffff;
                }
                .hover-logo:hover #paint4_linear_2175_15792 stop:first-child {
                  stop-color: #ffffff;
                }
                .hover-logo:hover g {
                  opacity: 1;
                }
                .hover-logo g {
                  transition: opacity 0.5s ease;
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
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;
