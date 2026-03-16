"use client";

import { useEffect, useRef } from "react";
import QRCodeStyling from "qr-code-styling";
import ModalFrame from "./ModalFrame";
import Image from "next/image";


export default function DepositAddressModal({
  onClose,
  onBack,
  network,
  address: propAddress,
  currencyLogo,
  networkLogo,
}) {

  // the props should be passed when opening the modal, for example:
  // openModal("deposit-address", {
  //   network: "Polygon",
  //   address: "0x12345abcde...",
  //   currencyLogo: "/icons/usdc.svg",
  //   networkLogo: "/icons/polygon.png"
  // });


  const scrollRef = useRef(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onWheel = (e) => {
      const { scrollTop, scrollHeight, clientHeight } = el;
      const atTop = scrollTop === 0;
      const atBottom = scrollTop + clientHeight >= scrollHeight - 1;

      if ((atTop && e.deltaY < 0) || (atBottom && e.deltaY > 0)) {
        e.preventDefault();
      } else {
        e.stopPropagation();
      }
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);


  const address =
    propAddress ||
    "0xde2b741dujf4839hf4394f48735tyw98dnvcrveb75c3ee52493";

  const qrRef = useRef(null);
  const qrInstance = useRef(null);

  const mainLogo = currencyLogo || "/icons/usdc.svg";
  const chainLogo = networkLogo || "/icons/polygon.png";

  useEffect(() => {
    if (!qrRef.current) return;

    // Clear previous QR
    qrRef.current.innerHTML = "";

    qrInstance.current = new QRCodeStyling({
      width: 300,
      height: 300,
      data: address,
      dotsOptions: {
        color: "#000",
        type: "rounded",
      },
      backgroundOptions: {
        color: "#ffffff",
      },
      cornersSquareOptions: {
        type: "extra-rounded",
      },
    });

    qrInstance.current.append(qrRef.current);
  }, [address]);

  const copyAddress = async () => {
    await navigator.clipboard.writeText(address);
  };

  return (
    <ModalFrame size="md">
      {/* HEADER */}
      <div className="relative flex items-center justify-center px-8 pt-6 mb-8">
        <button
          className="absolute left-8 text-xl text-gray-500"
          onClick={onBack}
        >
          <Image
            src="/icons/back.svg"
            alt=""
            width={24}
            height={24}
          />
        </button>

        <h2 className="text-lg font-semibold text-gray-900">
          Deposit {network}
        </h2>

        <button
          className="absolute right-8 text-xl text-gray-400 hover:text-gray-600"
          onClick={onClose}
        >
          ✕
        </button>
      </div>

      {/* CONTENT */}
      <div
        ref={scrollRef}
        className="flex flex-col items-center px-8 py-8 space-y-6  max-h-[70vh] overflow-y-auto">
        {/* NETWORK PILL */}
        <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2 text-[16px] font-medium">
          <Image
            src={chainLogo}
            alt=""
            width={40}
            height={40}
            className="h-10 w-10"
          />

          {network} network
        </div>

        {/* WARNING */}
        <p className="text-center text-sm text-orange-600 max-w-lg">
          Only send USDC to this address on {network} network. Sending wrong
          token or wrong network will cause loss of funds.
        </p>

        {/* QR CARD */}
        <div className="w-full max-w-[388px] h-[388px] bg-white rounded-2xl border p-6 flex flex-col items-center gap-4">

          {/* QR CONTAINER */}
          <div className="relative">
            <div ref={qrRef} />

            {/* CENTER LOGO OVERLAY */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="relative h-18 w-18">
                <Image
                  src={mainLogo}
                  alt=""
                  width={72}
                  height={72}
                  className="rounded-full"
                />
                <div className="rounded-full absolute -bottom-1 right-1 bg-white border border-gray-300">
                  <Image
                    src={chainLogo}
                    alt=""
                    width={26}
                    height={26}
                    className=""
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ADDRESS + COPY */}
          <div className="flex items-center gap-3 w-full justify-between">
            <p className="text-[12px] text-center text-gray-500 break-all pr-2">
              {address}
            </p>

            <button
              onClick={copyAddress}
              className="h-12 w-12 flex items-center justify-center rounded-lg hover:bg-gray-50"
              title="Copy address"
            >
              <Image
                src="/icons/copy.svg"
                alt="Copy"
                width={36}
                height={36}
                className="h-9 w-9"
              />
            </button>
          </div>
        </div>
      </div>
    </ModalFrame>
  );
}
