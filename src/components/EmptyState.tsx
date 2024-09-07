import { Illustration } from './Illustration';

export default function EmptyState({
  title,
  icon,
  subtitle,
}: {
  title: string;
  icon: string;
  subtitle?: string;
}) {
  return (
    <div className='flex flex-col items-center justify-center gap-6 roudned-lg py-20 px-[78px]'>
      <Illustration icon={icon} />
      <div className='flex flex-col gap-4 max-w-[680px]'>
        <p className='text-neutral-dark text-[17px] text-center font-semibold'>
          {title}
        </p>
        <p className='text-neutral-grey text-base text-center'>{subtitle}</p>
      </div>
    </div>
  );
}
