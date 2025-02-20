import ScoreInput from './ScoreInput';

export default function Prediction() {
  return (
    <div className="flex justify-around items-center gap-12">
      <ScoreInput />
      <ScoreInput />
    </div>
  );
}
