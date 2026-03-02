"use client";

import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import TopHeader from "./TopHeader";
import { useAuth } from "../context/AuthContext";

import Dashboard from "../pages/Dashboard";
import Banking from "../pages/Banking";
import Beneficiary from "../pages/Beneficiary";
import Team from "../pages/Team";
import Invite from "../pages/Invite";
import Profile from "../pages/Profile";
import LegalPolicy from "../pages/Legal";



import ModalRoot from "../layout/ModalRoot";
import ModalFrame from "../modals/ModalFrame";
import KycRequiredModal from "../modals/KycRequiredModal";
import KycVerificationForm from "../pages/KycVerificationFormNew";
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
import LearnAboutRolesModal from "../modals/LearnAboutRolesModal";
import AddTeamMemberModal from "../modals/AddTeamMemberModal";
import InviteSuccessModal from "../modals/InviteSuccessModal";
import EditTeamMemberModal from "../modals/EditTeamMemberModal";
import RemoveMemberModal from "../modals/RemoveMemberModal";
import ChangePasswordModal from "../modals/ChangePasswordModal";
import EnableTwoFactorModal from "../modals/EnableTwoFactorModal";
import BackupCodesModal from "../modals/BackupCodesModal";
import DisableTwoFactorModal from "../modals/DisableTwoFactorModal";
import ShareInviteModal from "../modals/ShareInviteModal";
import Payments from "../pages/Payments";



export default function InnerLayout() {

  const { kycStatus } = useAuth();

  const KYC_REQUIRED_MODALS = [
    "deposit-select",
    "new-transfer",
    "global-payout",
    "add-beneficiary",
    "pay-to-wallet",
    "pay-to-email",
    "pay-to-swift"
  ];

  const [activePage, setActivePage] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // 🔴 MODAL STATE (ONLY HERE)
  const [modal, setModal] = useState(null);
  const [modalProps, setModalProps] = useState({});

  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [sidebarOpen]);


  const openModal = (type, props = {}) => {

    const requiresKyc = KYC_REQUIRED_MODALS.includes(type);

    // If KYC still loading → show loading state
    if (requiresKyc && kycStatus === "loading") {
      setModal("kyc-loading");
      return;
    }

    // If KYC incomplete → block
    if (requiresKyc && kycStatus === "incomplete") {
      setModal("kyc-required");
      return;
    }

    // Otherwise allow
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
      case "kyc":
        return <KycVerificationForm onOpenModal={openModal}
          setActivePage={setActivePage}
        />;
      case "profile":
        return (
          <Profile
            onOpenModal={openModal}
            setActivePage={setActivePage}
          />
        );
      case "privacy-policies":
        return <LegalPolicy onOpenModal={openModal} />;
      case "payment":
        return <Payments onOpenModal={openModal} />;
      default:
        return (<Dashboard
          onOpenModal={openModal}
          setActivePage={setActivePage}
        />
        )
    }
  };

  return (
    <>
      {/* ===== MAIN LAYOUT ===== */}
      <div className="min-h-screen bg-[#F9F9F9] p-2 sm:p-4 lg:p-6">
        <div className="relative mx-auto max-w-full bg-[#fafafa] rounded-2xl lg:rounded-3xl flex overflow-hidden">

          {/* Mobile Overlay */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 bg-black/40 z-40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          <Sidebar
            active={activePage}
            onChange={(page) => {
              setActivePage(page);
              setSidebarOpen(false);
            }}
            isOpen={sidebarOpen}
          />

          <div className="flex-1 flex flex-col min-w-0">
            <TopHeader
              title={activePage}
              onProfileClick={() => setActivePage("profile")}
              onMenuClick={() => setSidebarOpen(true)}
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

          {modal === "kyc-required" && (

            <KycRequiredModal
              onClose={closeModal}
              onGoToKyc={() => {
                closeModal();
                setActivePage("kyc");
              }}
            />
          )}

          {modal === "kyc-loading" && (
            <ModalFrame size="sm">
              <div className="p-8 text-center">
                <p className="text-sm text-gray-600">
                  Checking verification status...
                </p>
              </div>
            </ModalFrame>
          )}

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
                  address: selection.address
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
              onOpenModal={openModal}
            />
          )}

          {modal === "beneficiary-success" && (
            <BeneficiarySuccessModal
              onClose={closeModal}
              onAddAnother={() => openModal("add-beneficiary")}
            />
          )}


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
              {...modalProps}
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
              onShowBank={() => {
                closeModal();
                setActivePage("banking");
              }}
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
            <AddSwiftBeneficiaryModal
              onClose={closeModal}
              onBack={() => openModal("pay-to-swift")}
            />
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
                openModal("send-globalpayout", {
                  beneficiary,
                  onBack: () => openModal("pay-to-swift")
                })
              }
            />
          )}

          {modal === "learn-about-roles" && (
            <LearnAboutRolesModal
              onClose={closeModal}
            />
          )}
          {modal === "add-new-member" && (
            <AddTeamMemberModal
              onClose={closeModal}
              onSubmit={(data) =>
                openModal("invite-success", {
                  type: "success",
                  ...data,
                })
              }
            />
          )}


          {modal === "invite-success" && (
            <InviteSuccessModal
              onClose={closeModal}
              {...modalProps}
            />
          )}

          {modal === "edit-member" && (
            <EditTeamMemberModal
              onClose={closeModal}
              member={modalProps?.member}
              refresh={modalProps?.refresh}
            />
          )}

          {modal === "remove-member" && (
            <RemoveMemberModal
              onClose={closeModal}
              member={modalProps?.member}
              refresh={modalProps?.refresh}
            />
          )}

          {modal === "change-password" && (
            <ChangePasswordModal
              onClose={closeModal}
            />
          )}

          {modal === "enable-two-factor" && (
            <EnableTwoFactorModal
              onClose={closeModal}
              qrCode={modalProps?.qrCode}
              secret={modalProps?.secret}
              backupCodes={modalProps?.backupCodes}
              onConfirm={(codes) =>
                openModal("backup-codes", { codes })
              }
            />
          )}

          {modal === "backup-codes" && (
            <BackupCodesModal
              onClose={closeModal}
              codes={modalProps?.codes}
              onContinue={closeModal}
            />
          )}

          {modal === "disable-two-factor" && (
            <DisableTwoFactorModal onClose={closeModal} />
          )}

          {modal === "invite-friends" && (
            <ShareInviteModal onClose={closeModal} />
          )}




          {/* ends here */}
        </ModalRoot>
      )}

    </>
  );
}
