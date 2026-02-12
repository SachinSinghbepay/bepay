"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import TopHeader from "./TopHeader";

import Dashboard from "../pages/Dashboard";
import Banking from "../pages/Banking";
import Beneficiary from "../pages/Beneficiary";
import Team from "../pages/Team";
import Invite from "../pages/Invite";
import Profile from "../pages/Profile";

import ModalRoot from "../layout/ModalRoot";
import TransactionDetails from "../modals/TransactionDetails";
import DepositSelectModal from "../modals/DepositSelectModal";
import DepositAddressModal from "../modals/DepositAddressModal";
import NewTransferModal from "../modals/NewTransferModal";
import GlobalPayoutModal from "../modals/GlobalPayout";
import AddBeneficiaryModal from "../modals/AddBeneficiaryModal";
import BeneficiarySuccessModal from "../modals/BeneficiarySuccessModal";
import SendGlobalPayoutModal from "../modals/SendGlobalPayoutModal";
import ConfirmGlobalPayoutModal from "../modals/ConfirmGlobalPayoutModal";
import TransferRequestSubmittedModal from "../modals/TransferRequestSubmittedModal";
import GetPaidModal from "../modals/GetPaidModal";
import PayToEmailModal from "../modals/PayToEmailModal";
import AddNewEmail from "../modals/AddNewEmail";
import PaymentSent from "../modals/PaymentSent";
import PayToWalletModal from "../modals/PayToWalletModal";
import AddNewWalletBeneficiary from "../modals/AddNewWalletBeneficiary";
import AddSwiftBeneficiaryModal from "../modals/AddSwiftBeneficiaryModal";
import PayToSwiftModal from "../modals/PayToSwiftModal";


export default function InnerLayout() {
  const [activePage, setActivePage] = useState("dashboard");

  // 🔴 MODAL STATE (ONLY HERE)
  const [modal, setModal] = useState(null);
  const [modalProps, setModalProps] = useState({});

  const openModal = (type, props = {}) => {
    setModal(type);
    setModalProps(props);
  };

  const closeModal = () => {
    setModal(null);
    setModalProps({});
  };

  const renderPage = () => {
    switch (activePage) {
      case "banking":
        return <Banking onOpenModal={openModal} />;
      case "beneficiary":
        return <Beneficiary onOpenModal={openModal} />;
      case "team":
        return <Team onOpenModal={openModal} />;
      case "invite":
        return <Invite onOpenModal={openModal} />;
      case "profile":
        return <Profile onOpenModal={openModal} />;
      default:
        return <Dashboard onOpenModal={openModal} />;
    }
  };

  return (
    <>
      {/* ===== MAIN LAYOUT ===== */}
      <div className="min-h-screen bg-[#F9F9F9] p-6">
        <div className="mx-auto max-w-full bg-[#fafafa] rounded-3xl flex overflow-hidden">

          <Sidebar active={activePage} onChange={setActivePage} />

          <div className="flex-1 flex flex-col">
            <TopHeader
              title={activePage}
              onProfileClick={() => setActivePage("profile")}
            />

            <div className="flex-1 overflow-y-auto">
              {renderPage()}
            </div>
          </div>

        </div>
      </div>

      {/* ===== 🔥 MODALS RENDER HERE (ONCE) ===== */}
      {modal && (
        <ModalRoot onClose={closeModal}>

          {modal === "txn-details" && (
            <TransactionDetails
              transaction={modalProps?.transaction}
              onClose={closeModal}
              onBack={() => closeModal()}
            />
          )}

          {modal === "deposit-select" && (
            <DepositSelectModal
              onClose={closeModal}
              onSelect={(selection) =>
                openModal("deposit-address", {
                  ...modalProps,
                  network: selection.network,
                  currency: selection.currency,
                  currencyLogo: selection.currencyLogo,
                  networkLogo: selection.networkLogo,
                })
              }
              showOtherTokens={modalProps?.showOtherTokens}
              showBackButton={modalProps?.showBackButton}
              heading={modalProps?.heading}
              onBack={() =>
                modalProps?.previousModal
                  ? openModal(modalProps.previousModal)
                  : closeModal()
              }
            />
          )}

          {modal === "deposit-address" && (
            <DepositAddressModal
              {...modalProps}
              onClose={closeModal}
              onBack={() =>
                openModal("deposit-select", {
                  showOtherTokens: modalProps?.showOtherTokens,
                  showBackButton: modalProps?.showBackButton,
                  heading: modalProps?.heading,
                  previousModal: modalProps?.previousModal,
                })
              }
            />
          )}

          {modal === "new-transfer" && (
            <NewTransferModal
              onClose={closeModal}
              onGlobalPayout={() => openModal("global-payout")}
              onPayToEmail={() =>
                openModal("pay-to-email", {
                  previousModal: "new-transfer"
                })
              }
              onPayToWallet={() =>
                openModal("pay-to-wallet", {
                  previousModal: "new-transfer"
                })
              }
              onPayToSwift={() =>
                openModal("pay-to-swift", {
                  previousModal: "new-transfer"
                })
              }
            />
          )}

          {modal === "global-payout" && (
            <GlobalPayoutModal
              onClose={closeModal}
              onBack={() => openModal("new-transfer")}
              onAddBeneficiary={() => openModal("add-beneficiary")}
              onPay={(beneficiary) =>
                openModal("send-globalpayout", {
                  beneficiary,
                  onBack: () => openModal("global-payout")
                })
              }
            />
          )}

          {modal === "add-beneficiary" && (
            <AddBeneficiaryModal
              onClose={closeModal}
              onBack={() => openModal("global-payout")}
            />
          )}

          {modal === "beneficiary-success" && (
            <BeneficiarySuccessModal
              onClose={closeModal}
              onAddAnother={() => openModal("add-beneficiary")}
            />
          )}

          {/* {modal === "send-globalpayout" && (
            <SendGlobalPayoutModal
              onClose={closeModal}
              onAddAnother={() => openModal("global-payout")}
              beneficiary={modalProps?.beneficiary}
            />
          )} */}

          {modal === "send-globalpayout" && (
            <SendGlobalPayoutModal
              beneficiary={modalProps?.beneficiary}
              onClose={closeModal}
              onBack={modalProps?.onBack}
              onOpenModal={openModal}
            />
          )}

          {modal === "confirm-globalpayout" && (
            <ConfirmGlobalPayoutModal
              onClose={closeModal}
              onBack={modalProps?.onBack}
              onConfirm={modalProps?.onConfirm}
            />
          )}

          {modal === "transfer-request-submitted" && (
            <TransferRequestSubmittedModal
              onClose={closeModal}
              onSendAnother={() => openModal("global-payout")}
            />
          )}


          {modal === "pay-to-email" && (
            <PayToEmailModal
              onClose={closeModal}
              onBack={() =>
                modalProps?.previousModal
                  ? openModal(modalProps.previousModal)
                  : closeModal()
              }
              onOpenModal={openModal}
            />
          )}

          {modal === "add-new-email" && (
            <AddNewEmail onClose={closeModal} />
          )}

          {modal === "payment-sent" && (
            <PaymentSent
              onClose={closeModal}
              onBack={() =>
                openModal(modalProps?.previousModal || "dashboard")
              }
            />
          )}


          {modal === "get-paid" && (
            <GetPaidModal
              onClose={closeModal}
              onShowWallet={() =>
                openModal("deposit-select", {
                  showOtherTokens: false,
                  showBackButton: true,
                  heading: "Get Paid",
                  previousModal: "get-paid"
                })
              }
              onShowBank={() => openModal("bank-transfer")}
            />
          )}

          {modal === "pay-to-wallet" && (
            <PayToWalletModal
              onClose={closeModal}
              onBack={() =>
                modalProps?.previousModal
                  ? openModal(modalProps.previousModal)
                  : closeModal()
              }
              onOpenModal={openModal}
            />
          )}

          {modal === "add-new-wallet" && (
            <AddNewWalletBeneficiary
              onClose={closeModal}
              onBack={() =>
                modalProps?.previousModal
                  ? openModal(modalProps.previousModal)
                  : closeModal()
              }
            />
          )}


          {modal === "add-new-swift" && (
            <AddSwiftBeneficiaryModal onClose={closeModal} />
          )}

          {modal === "pay-to-swift" && (
            <PayToSwiftModal
              onClose={closeModal}
              onBack={() =>
                modalProps?.previousModal
                  ? openModal(modalProps.previousModal)
                  : closeModal()
              }
              onAddBeneficiary={() => openModal("add-new-swift")}
              onPay={(beneficiary) =>
                openModal("confirm-globalpayout", {
                  beneficiary,
                  onBack: () => openModal("pay-to-swift")
                })
              }
            />
          )}








          {/* ends here */}
        </ModalRoot>
      )}

    </>
  );
}
