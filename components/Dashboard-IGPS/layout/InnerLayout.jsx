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
              {...modalProps}
              onClose={closeModal}
            />
          )}

          {modal === "deposit-select" && (
            <DepositSelectModal
              onClose={closeModal}
              onSelect={(network) =>
                openModal("deposit-address", { network })
              }
            />
          )}

          {modal === "deposit-address" && (
            <DepositAddressModal
              {...modalProps}
              onClose={closeModal}
              onBack={() => openModal("deposit-select")}
            />
          )}

          {modal === "new-transfer" && (
            <NewTransferModal
              onClose={closeModal}
              onGlobalPayout={() => openModal("global-payout")}
            />
          )}

          {modal === "global-payout" && (
            <GlobalPayoutModal
              onClose={closeModal}
              onBack={() => openModal("new-transfer")}
              onAddBeneficiary={() => openModal("add-beneficiary")}
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

          {modal === "send-globalpayout" && (
            <SendGlobalPayoutModal
              onClose={closeModal}
              onAddAnother={() => openModal("global-payout")}
            />
          )}

          {modal === "confirm-globalpayout" && (
            <ConfirmGlobalPayoutModal
              onClose={closeModal}
              onBack={() => openModal("send-globalpayout")}
              onConfirm={() => openModal("beneficiary-success")}
            />
          )}

          {modal === "transfer-request-submitted" && (
            <TransferRequestSubmittedModal
              onClose={closeModal}
              onSendAnother={() => openModal("send-globalpayout")}
            />
          )}






          {/* ends here */}
        </ModalRoot>
      )}

    </>
  );
}
