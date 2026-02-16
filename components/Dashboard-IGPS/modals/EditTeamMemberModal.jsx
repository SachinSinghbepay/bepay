import { useState } from "react";
import ModalFrame from "./ModalFrame";
import CustomSelect from "../components/CustomSelect";

const roleOptions = [
  { label: "Owner", value: "Owner" },
  { label: "Admin", value: "Admin" },
  { label: "Manager", value: "Manager" },
  { label: "Bookkeeper", value: "Bookkeeper" },
  { label: "Employee", value: "Employee" },
];

export default function EditTeamMemberModal({ onClose, member }) {
  const [firstName, setFirstName] = useState(member?.name?.split(" ")[0] || "");
  const [lastName, setLastName] = useState(member?.name?.split(" ")[1] || "");
  const [role, setRole] = useState(member?.role || "");

  const isValid = firstName && lastName && role;

  return (
    <ModalFrame size="sm">
      <div className="relative bg-white rounded-3xl">

        {/* HEADER */}
        <div className="flex items-center justify-between px-8 pt-8 pb-6 border-b">
          <h2 className="text-lg font-medium">
            Edit {member?.email}
          </h2>

          <button onClick={onClose} className="text-gray-500">
            ✕
          </button>
        </div>

        <div className="px-8 py-8 space-y-8">

          {/* INFO CARD */}
          <div className="bg-[#F7F7F7] rounded-3xl p-6 space-y-3">
            <p className="text-sm text-gray-500">Team member</p>
            <p className="font-semibold text-lg">{member?.name}</p>
            <p className="text-gray-600">{member?.email}</p>

            <div className="flex items-center gap-3 pt-3">
              <span className="text-gray-500">Current role:</span>
              <span className="px-4 py-2 rounded-full bg-[#ECECEC] text-sm font-medium">
                {member?.role}
              </span>
            </div>
          </div>

          {/* FIRST + LAST NAME */}
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="First name"
              value={firstName}
              onChange={setFirstName}
            />
            <Input
              label="Last name"
              value={lastName}
              onChange={setLastName}
            />
          </div>

          {/* ROLE */}
          <div className="space-y-2">
            <label className="text-sm text-gray-600">Role</label>

            <CustomSelect
              options={roleOptions}
              value={role}
              onChange={setRole}
              placeholder="Select role"
            />

            <p className="text-sm text-gray-500 flex items-center gap-2">
              <span>ⓘ</span>
              Select a new role for this team member
            </p>
          </div>

          {/* ACTIONS */}
          <div className="pt-4 space-y-4">
            <button
              disabled={!isValid}
              className={`w-full h-14 rounded-2xl text-white font-medium
                ${isValid ? "bg-black hover:bg-gray-800" : "bg-gray-400"}
              `}
            >
              Update
            </button>

            <button
              onClick={onClose}
              className="w-full text-center text-gray-700"
            >
              Cancel
            </button>
          </div>

        </div>
      </div>
    </ModalFrame>
  );
}

function Input({ label, value, onChange }) {
  return (
    <div className="space-y-2">
      <label className="text-sm text-gray-600">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-14 rounded-2xl border px-4 outline-none"
      />
    </div>
  );
}
