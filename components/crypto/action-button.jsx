export const ActionButton = ({ icon, label }) => (
  <div className="flex flex-col items-center gap-1 text-center">
    <div className="flex h-12 w-12 items-center justify-center rounded-[10px]  bg-[#C0C0C026]">
      {icon}
    </div>
    <span className="text-xs font-medium">{label}</span>
  </div>
);
