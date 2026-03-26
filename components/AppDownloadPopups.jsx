"use client"
import { OSSelectionPopup } from "@/components/popups/os-selection-popup"
import { QRCodePopup } from "@/components/popups/qr-code-popup"

export function AppDownloadPopups({
  isOSPopupOpen,
  setIsOSPopupOpen,
  isQRPopupOpen,
  setIsQRPopupOpen,
  selectedOS,
  setSelectedOS,
}) {
  return (
    <>
      <OSSelectionPopup
        isVisible={isOSPopupOpen}
        onClose={() => setIsOSPopupOpen(false)}
        onOSSelected={(os) => {
          setSelectedOS(os)
          setIsOSPopupOpen(false)
          setIsQRPopupOpen(true)
        }}
      />

      <QRCodePopup
        isVisible={isQRPopupOpen}
        onClose={() => setIsQRPopupOpen(false)}
        selectedOS={selectedOS}
      />
    </>
  )
}
