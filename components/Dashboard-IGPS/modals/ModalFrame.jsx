export default function ModalFrame({ size = "lg", children }) {
  const sizes = {
    lg: "w-[842px] h-[850px]",
    md: "w-[650px] h-[850px]",
  };

  return (
    <div
      className={`${sizes[size]} bg-white rounded-[32px] flex flex-col overflow-hidden p-4`}
    >
      {children}
    </div>
  );
}
