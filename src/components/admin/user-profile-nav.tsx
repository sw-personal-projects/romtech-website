'use client';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export function UserProfileNav() {

    const session = useSession();
    const user = {
        fullName: session.data?.user?.name,
        emailAddress: session.data?.user?.email
    };

    const router = useRouter();

    return (
        <DropdownMenu>
            {user && user.fullName && (
                <DropdownMenuTrigger asChild>
                    <Button variant='secondary'
                        size='icon'
                        className='group/toggle size-8 border border-primary/50 mr-1'>
                        <h1>{user.fullName.split(" ").map(name => name.charAt(0)).join(" ").toLowerCase()}</h1>
                    </Button>
                </DropdownMenuTrigger>
            )}
            <DropdownMenuContent
                className='w-56'
                align='end'
                sideOffset={10}
                forceMount
            >
                <DropdownMenuLabel className='font-normal'>
                    <div className='flex flex-col space-y-1'>
                        <p className='text-sm leading-none font-medium capitalize'>
                            {user.fullName}
                        </p>
                        <p className='text-muted-foreground text-xs leading-none'>
                            {user.emailAddress}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => router.push('/dashboard/profile')}>
                        Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push('/dashboard/settings')}>Settings</DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/auth/signin" })}>
                    Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}