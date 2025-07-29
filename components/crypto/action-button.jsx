export const ActionButton = ({ icon, label }) => (
  <div className="flex flex-col items-center gap-1 text-center">
    <div className="flex h-12 w-12 items-center justify-center rounded-full border bg-gray-100">
      {icon}
    </div>
    <span className="text-xs">{label}</span>
  </div>
);
