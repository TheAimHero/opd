'use client';

import ThemeToggleButton from '@/components/buttons/ThemeToggleButton';
import { SidebarTrigger } from '@/components/ui/sidebar';
import UserAvatar from './Avatar';

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-20 flex h-[60px] w-full items-center justify-between border-[hsla(42,15%,65%,0.3)] border-b bg-white/20 p-2 backdrop-blur-md sm:p-4">
      <SidebarTrigger />
      <div className="flex items-center justify-start gap-2 sm:gap-4">
        <UserAvatar />
        <ThemeToggleButton />
      </div>
    </nav>
  );
};

export default Navbar;
