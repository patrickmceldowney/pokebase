export function Illustration({
  icon,
  type = 'empty',
}: {
  icon: string;
  type?: 'empty' | 'info' | 'danger';
}) {
  let fill: string;
  let classes: string;
  if (type === 'empty') {
    fill = '#f4f5f6';
    classes = 'text-neutral-matterhorn';
  } else if (type === 'info') {
    fill = '#f1f1fe';
    classes = 'text-accent-info';
  } else {
    fill = '#fce9eb';
    classes = 'text-accent-danger';
  }

  return (
    <div className='w-[120px] h-[120px] flex justify-center items-end relative'>
      <svg
        className='rotate-[50deg] blur-[8px] absolute'
        xmlns='http://www.w3.org/2000/svg'
        width='147'
        height='134'
        viewBox='0 0 147 134'
        fill='none'
      >
        <g filter='url(#filter0_f_256_39029'>
          <path
            fill-rule='evenodd'
            clip-rule='evenodd'
            d='M117 .284 27.8362C125.433 35.5119 130.337 46.6926 130.537 57.8304C130.729 68.5041 125.187 78.5438 118.342 86.7888C112.432 93.9073 102.715 95.7385 94.9057 100.749C86.9659 105.842 81.316 114.461 72.0767 116.471C61.8551 118.694 50.9982 116.906 41.6007 112.344C31.4832 107.432 20.6632 100.623 17.4138 89.9353C14.1997 79.3643 22.0207 68.9968 25.2045 58.4167C27.9076 49.4338 28.302 39.4316  34.6916 32.5181C41.0357 25.6539 50.742 23.6649 59.7537 21.0351C68.8502 18.3806 77.9331 16.0384 87.3493 17.1515C98.0984 18.4223 109.439 20.4467 117.284 27.8362Z'
            fill={fill}
          />
        </g>
        <defs>
          <filter
            id='filter0_f_256_39029'
            x='0.652344'
            y='0.867676'
            width='145.891'
            height='132.555'
            filterUnits='userSpaceOnUse'
            colorInterpolationFilters='sRGB'
          >
            <feFlood floodOpacity='0' result='BackgroundImageFix' />
            <feBlend
              mode='normal'
              in='SourceGraphic'
              in2='BackgroundImageFix'
              result='shape'
            />
            <feGaussianBlur
              stdDeviation='8'
              result='effect1_foregroundBlur_256_39029'
            />
          </filter>
        </defs>
      </svg>
      <i className={`${icon} ${classes} z-10 text-[56px]`} />
    </div>
  );
}
