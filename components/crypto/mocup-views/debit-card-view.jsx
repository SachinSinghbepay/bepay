"use client";

import {
  Eye,
  Snowflake,
  Settings,
  MoreVertical,
  Clock,
  GripVertical,
} from "lucide-react";
import { ActionButton } from "../action-button";
import { motion, useTransform } from "framer-motion";
import Image from "next/image";
import WaitlistTriggerButton from "@/components/waitlist-trigger-button";
import { AnalyticsService } from "@/services/analyticsService"; // ANALYTICS: Import the service
import { IconClockHour12 } from "@tabler/icons-react";

export function DebitCardView({ setActiveView, scrollYProgress }) {
  const innerCardScale = useTransform(
    scrollYProgress,
    [0.38, 0.42],
    [0.5, 1.7]
  );
  const innerCardOpacity = useTransform(scrollYProgress, [0.38, 0.42], [0, 1]);
  const handleButtonClick = () => {
        AnalyticsService.sendEvent("Get your virtual crypto debit card Clicked");
      }

  return (
    <div className="flex h-full flex-col bg-white p-4">
      <div className="flex items-center justify-between">
        <div className="flex p-[1px] items-center gap-2 rounded-full border-[1px] border-[#C0C0C04D]   text-sm font-medium">
          <button
            onClick={() => setActiveView("debit-card")}
            className="rounded-full bg-black px-4 py-2  text-white"
          >
            Card
          </button>
          <button
            onClick={() => setActiveView("bank-account")}
            className="px-4 py-2 text-gray-500"
          >
            Bank account
          </button>
        </div>
        <GripVertical className="h-6 w-6 text-[#6A6A6A]" />
      </div>
      <div className="my-6 flex-shrink-0">
        <motion.div
          style={{
            scale: innerCardScale,
            opacity: innerCardOpacity,
          }}
          className="relative mx-auto -rotate-90 aspect-[1.5/1] rounded-xl"
        >
          <Image
            src="/cryptocard.png"
            alt="Crypto Card in Mockup"
            fill
            className="object-contain"
          />
        </motion.div>
      </div>
      <div className="grid grid-cols-4 gap-2 text-center text-xs text-gray-600">
        <ActionButton
          icon={<Eye strokeWidth={1} className="h-5 w-5" />}
          label="View"
        />
        <ActionButton
          icon={<Snowflake strokeWidth={1} className="h-5 w-5" />}
          label="Freeze"
        />
        <ActionButton
          icon={<IconClockHour12 strokeWidth={1} className="h-5 w-5" />}
          label="Limit"
        />
        <ActionButton
          icon={<Settings strokeWidth={1} className="h-5 w-5" />}
          label="Settings"
        />
      </div>
      <div className="mt-6 flex gap-2 items-center">
        <p className="text-[10px] whitespace-nowrap font-medium text-gray-800">
          Recent transactions
        </p>
        <div className="h-[1px] w-[158.565673828125px] bg-gradient-to-l from-[#E1E1E11F] to-[#E1E1E1]" />
      </div>
      <div className="mt-6 flex-grow text-center items-center">
        <p className="mt-2 text-[10px] text-gray-400">No transactions to see</p>
      </div>

      <WaitlistTriggerButton triggerSource="'Get your virtual crypto debit card' button">
        <button onClick={handleButtonClick} className="mt-auto mx-auto items-center flex justify-center whitespace-nowrap rounded-full bg-black px-6 py-3 text-[8px] md:text-[12px] font-medium text-white">
          Get your virtual crypto debit card
        </button>
      </WaitlistTriggerButton>
    </div>
  );
}
