type DeleteButtonProps = {
  id: string;
  onClick: (id: string) => void;
};

export default function DeleteButton({ id, onClick }: DeleteButtonProps) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick(id);
      }}
      className="text-[12px] cursor-pointer"
    >
      ❌
    </button>
  );
}
