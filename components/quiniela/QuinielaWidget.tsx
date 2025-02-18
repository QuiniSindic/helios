import { Partido } from '@/utils/types/quiniela.types';

interface QuinielaWidgetProps {
  partido: Partido;
}

export default function QuinielaWidget({ partido }: QuinielaWidgetProps) {
  return (
    <>
      <div className="bg-gray-100 p-4 rounded-lg">
        <h3 className="text-lg font-bold mb-2">
          {partido.local} - {partido.visitante}
        </h3>
        <p className="text-sm">{partido.signo}</p>
        <p className="text-sm">{partido.marcador}</p>
      </div>
    </>
  );
}
