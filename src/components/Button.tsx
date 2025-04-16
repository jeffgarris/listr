type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
};

export default function Button({ children, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className="py-2 px-6 rounded bg-[#F56A3E] hover:bg-[#FF7B50] text-white font-medium cursor-pointer transition duration-200 ease-in-out shadow"
    >
      {children}
    </button>
  );
}
