type DeleteButtonProps = {
  id?: string;
  onClick: (id: string) => void;
};

export default function DeleteButton({ id, onClick }: DeleteButtonProps) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick(id ? id : "");
      }}
      className="text-[24px]/[16px] font-bold text-[#F56A3E] cursor-pointer"
    >
      ×
    </button>
  );
}
