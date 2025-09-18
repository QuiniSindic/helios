'use client';

import { API_COMPETITION_LOGO_URL } from '@/core/config';
import { useCompetitionByIdQuery } from '@/hooks/useCompetitions';
import Image from 'next/image';

type Props = {
  id?: number | string | null;
  name?: string | null;
  className?: string;
};

export default function CompetitionBadge({ id, name, className = '' }: Props) {
  const parsed_id = Number(id);
  const { data: comp } = useCompetitionByIdQuery(parsed_id);

  if (!id && !name) return null;

  const logo = comp?.badge ? `${API_COMPETITION_LOGO_URL}${comp.badge}` : null;

  return (
    <div
      className={`inline-flex items-center gap-2 px-2 py-1 rounded-md text-sm font-medium
                  bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 ${className}`}
      title={name ?? 'Competición'}
    >
      {logo && (
        <Image src={logo} alt={name ?? 'Competición'} width={20} height={20} />
      )}
      <span className="truncate max-w-[12rem] sm:max-w-[16rem]">
        {name ?? '—'}
      </span>
    </div>
  );
}
