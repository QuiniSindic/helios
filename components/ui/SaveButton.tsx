interface SaveButtonProps {
  label: string;
}

export default function SaveButton({ label }: SaveButtonProps) {
  return (
    <button className="bg-secondary text-white px-6 py-2 rounded-lg hover:bg-secondary/90 transition-colors">
      {label}
    </button>
  );
}
