type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  buttonType?: "primary" | "secondary";
};

export default function Button({ children, buttonType, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`min-w-[120px] py-2 px-6 border border-[#F56A3E] rounded ${
        buttonType === "secondary"
          ? "bg-white text-[#F56A3E] hover:bg-[#F56A3E] hover:text-white"
          : "bg-[#F56A3E] text-white hover:bg-white hover:text-[#F56A3E]"
      }  font-medium cursor-pointer transition duration-200 ease-in-out`}
    >
      {children}
    </button>
  );
}
