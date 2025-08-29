export const Tab: React.FC<{
  isActive: boolean;
  onClick: () => void;
  tittle: string;
}> = ({ isActive, onClick, tittle }) => {
  return (
    <button
      onClick={onClick}
      className={`flex-1 py-2 text-center ${
        isActive ? 'border-b-2 border-secondary font-semibold' : 'text-gray-500'
      }`}
    >
      {tittle}
    </button>
  );
};
