import { DropdownOption } from '@/types';
import { useState } from 'react';

type Props = {
  buttonType: 'default' | 'simple' | 'avatar' | 'icon' | 'rounded';
  buttonText: string;
  size: 'large' | 'small';
  align: 'left' | 'right';
  activeValueText: string | number;
  icon: string;
  dropdownType: 'actions' | 'selector' | 'flexible' | 'options';
  primaryList: DropdownOption[];
};

export default function DropdownButton({
  buttonType = 'default',
  buttonText = '',
  size = 'large',
  align = 'left',
  activeValueText = 'Select',
  icon = '',
  dropdownType = 'options',
  primaryList = [],
}: Props) {
  const [active, setActive] = useState(false);
  return (
    <div className='relative'>
      {(() => {
        if (buttonType === 'simple') {
          return (
            <button
              className={`flex py-1 px-2 justify-center items-center gap-1 rounded-sm border border-neutral-whisper ${
                active ? 'bg-neutral-azure' : 'bg-white'
              } outline-none`}
              type='button'
              onClick={() => setActive((prev) => !prev)}
            >
              <span className='text-sm font-medium leading-[17px] capitalize text-neutral-matterhorn'>
                {activeValueText}
              </span>
              <div className='flex items-center justify-center w-4 h-4'>
                <i
                  className={`fa-solid fa-caret-down text-[13px] text-neutral-dark transition-all duration-200 ${
                    active ? 'fa-rotate-180' : ''
                  }`}
                ></i>
              </div>
            </button>
          );
        } else if (buttonType === 'icon') {
          return (
            <button
              onClick={() => setActive((prev) => !prev)}
              className='btn-icon-simple'
              type='button'
            >
              <i className={icon}></i>
            </button>
          );
        } else if (buttonType === 'rounded') {
          return (
            <button
              className='btn-small btn-tertiary'
              type='button'
              onClick={() => setActive((prev) => !prev)}
            >
              {buttonText && buttonText}
              <i className={icon}></i>
            </button>
          );
        } else {
          return (
            <div
              className={`${
                size === 'large' ? 'py-[7px] pr-[7px] pl-3' : 'py-1 pr-1 pl-2.5'
              } flex items-center gap-2 rounded-sm border border-neutral-whisper transition-colors ${
                active ? 'bg-neutral-azure' : 'bg-white'
              }`}
            >
              <div className='flex items-center gap-1.5 pr-3'>
                {/* Icon */}
                {icon && (
                  <div className='flex items-center justify-center w-6 h-6'>
                    <i className={`${icon} text-neutral-dark text-[17px]`}></i>
                  </div>
                )}
                <span
                  className={`${
                    size === 'large' ? 'text-base' : 'text-sm'
                  } text-neutral-dark leading=[19.6px] capitalize`}
                >
                  {activeValueText}
                </span>
              </div>
              <button
                className='btn-icon'
                type='button'
                onClick={() => setActive((prev) => !prev)}
              >
                <i
                  className={`fa-solid fa-caret-down ${
                    active ? 'fa-rotate-180' : ''
                  }`}
                ></i>
              </button>
            </div>
          );
        }
      })()}
    </div>
  );
}
