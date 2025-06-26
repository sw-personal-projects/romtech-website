import React from 'react';
import { SidebarTrigger } from '../ui/sidebar';
import { Separator } from '../ui/separator';

import { ThemeModeToggle } from '../theme-switch';
import { UserProfileNav } from './user-profile-nav';

export default function AdminHeader() {
    return (
        <header className='flex h-16 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 bg-sidebar shadow-sm sticky top-0 z-50'>
            <div className='flex items-center gap-2 px-4'>
                <SidebarTrigger className='-ml-1' />
                <Separator orientation='vertical' className='mr-2 h-4' />
            </div>

            <div className='flex items-center gap-2 px-4'>
                <UserProfileNav />
                <ThemeModeToggle />
            </div>
        </header>
    );
}