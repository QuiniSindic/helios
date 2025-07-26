interface SaveButtonProps {
  label: string;
  onClick?: () => void;
}

export default function SaveButton({ label, onClick }: SaveButtonProps) {
  return (
    <button
      onClick={onClick}
      className="bg-secondary text-white px-6 py-2 rounded-lg hover:bg-secondary/90 transition-colors"
    >
      {label}
    </button>
  );
}
