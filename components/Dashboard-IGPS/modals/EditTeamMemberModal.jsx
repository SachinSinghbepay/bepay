"use client";
import { useState, useEffect} from "react";
import ModalFrame from "./ModalFrame";
import CustomSelect from "../components/CustomSelect";
import { useAuth } from "../context/AuthContext";


const roleOptions = [
  { label: "Owner", value: "owner" },
  { label: "Admin", value: "admin" },
  { label: "Manager", value: "manager" },
  { label: "Bookkeeper", value: "bookkeeper" },
  { label: "Employee", value: "employee" },
];

export default function EditTeamMemberModal({ onClose, member: data, refresh }) {
  const { igpsService } = useAuth();
  const [firstName, setFirstName] = useState(data?.name?.split(" ")[0] || "");
  const [lastName, setLastName] = useState(data?.name?.split(" ")[1] || "");
  const [role, setRole] = useState("");

  const isValid = firstName && lastName && role;
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    if (!isValid) return;

    try {
      setLoading(true);

      const res = await igpsService.updateMemberRole(data.id, {
        role: role,
      });

      console.log("Update response:", res);

      if (res.success) {
        refresh?.();
        onClose();
      }
    } catch (err) {
      console.error("Failed to update member", err);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    if (data?.role) {
      setRole(data.role);
    }
  }, [data]);

  const currentRoleLabel =
    roleOptions.find(r => r.value === data?.role)?.label || data?.role;
  return (
    <ModalFrame size="sm">
      <div className="relative bg-white rounded-3xl">

        {/* HEADER */}
        <div className="flex items-center justify-between px-8 pt-8 pb-6 border-b">
          <h2 className="text-lg font-medium">
            Edit {data?.email}
          </h2>

          <button onClick={onClose} className="text-gray-500">
            ✕
          </button>
        </div>

        <div className="px-8 py-8 space-y-8">

          {/* INFO CARD */}
          <div className="bg-[#F7F7F7] rounded-3xl p-6 space-y-3">
            <p className="text-sm text-gray-500">Team member</p>
            <p className="font-semibold text-lg">{data?.name}</p>
            <p className="text-gray-600">{data?.email}</p>

            <div className="flex items-center gap-3 pt-3">
              <span className="text-gray-500">Current role:</span>
              <span className="px-4 py-2 rounded-full bg-[#ECECEC] text-sm font-medium">
                {currentRoleLabel}
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
              onClick={handleUpdate}
              disabled={!isValid || loading}
              className={`w-full h-14 rounded-2xl text-white font-medium
    ${isValid ? "bg-black hover:bg-gray-800" : "bg-gray-400"}
  `}
            >
              {loading ? "Updating..." : "Update"}
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
