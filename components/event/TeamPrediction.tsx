import Image from 'next/image';
import ScoreInput from './ScoreInput';

interface TeamPredictionProps {
  name: string;
  imgSrc: string;
  score: string;
  onChange: (val: string) => void;
  disableInput?: boolean;
}

export const TeamPrediction: React.FC<TeamPredictionProps> = ({
  name,
  imgSrc,
  score,
  onChange,
  disableInput = false,
}) => (
  <div className="flex flex-col items-center space-y-2">
    <Image src={imgSrc} alt={name} width={64} height={64} />
    <h2 className="text-center max-w-[100px] break-words" title={name}>
      {name}
    </h2>
    {!disableInput && onChange && (
      <ScoreInput value={score} onChange={onChange} />
    )}
  </div>
);
