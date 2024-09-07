import { ReactNode } from 'react';

export default function Footer({
  children,
  shadow = false,
}: {
  children: ReactNode;
  shadow?: boolean;
}) {
  return (
    <div
      className={`page-footer flex py-4 px-[60px] items-center gap-6 bg-white fixed bottom-0 left-0 right-0 border-t border-t-[#f1f3f3] ${
        shadow ? 'shadow-[0_-5px_10px_rgba(0,0,0,0.2)]' : ''
      }`}
    >
      {children}
    </div>
  );
}
