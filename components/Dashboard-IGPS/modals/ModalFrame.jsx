export default function ModalFrame({ size = "lg", children, height }) {
  const sizes = {
    lg: "w-full w-[95%]  md:w-[842px] ",
    md: "w-full w-[95%]  md:w-[650px] ",
  };

  const heightClass = height ? height : "h-[90vh]";

  return (
    <div
      className={`
        ${sizes[size]}
           ${heightClass}
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