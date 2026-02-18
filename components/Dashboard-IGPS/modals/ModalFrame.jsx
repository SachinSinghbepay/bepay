export default function ModalFrame({ size = "lg", children }) {
  const sizes = {
    lg: "w-full max-w-[842px] h-[90vh]",
    md: "w-full max-w-[650px] h-[90vh]",
  };

  return (
    <div
      className={`
        ${sizes[size]}
        mx-4 sm:mx-6
        bg-white
        rounded-[20px] sm:rounded-[32px]
        flex
        flex-col
        overflow-hidden
        p-4
      `}
    >
      {children}
    </div>
  );
}