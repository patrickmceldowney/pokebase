import { DropdownOption } from '@/types';

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
}: Props) {}
