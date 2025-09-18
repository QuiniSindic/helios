import { API_LOGO_COMPETITION_URL } from '@/core/config';
import { TeamInfo } from '@/types/events/events.types';
import { getTeamLogoSrc } from '@/utils/images.utils';
import Image from 'next/image';

type TeamBadgeFormProps = {
  team: TeamInfo;
};

export const TeamBadgeForm = ({ team }: TeamBadgeFormProps) => {
  const teamLogo = getTeamLogoSrc(API_LOGO_COMPETITION_URL, team.img);

  return (
    <div className="flex flex-col items-center gap-2">
      <Image
        src={teamLogo}
        alt={team.name}
        width={72}
        height={72}
        className="size-18"
        // sombra para logos blancos
        style={{ filter: 'drop-shadow(0 0 0.5px rgba(0, 0, 0, 1))' }}
      />
      <h2 className="text-center max-w-[140px] truncate" title={team.name}>
        {team.name}
      </h2>
    </div>
  );
};
