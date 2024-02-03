"use client"
import { UserButton } from '@clerk/clerk-react'
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button'
import { LogOut } from 'lucide-react';
import  Link  from 'next/link'


const NavbarRoutes = () => {
    const pathname = usePathname();

    // verification for teacher / player (course) mode
    const isTeacherPage = pathname?.startsWith('/teacher')
    const isPlayerPage = pathname?.includes('/chapter');

    return (
        <div className='flex gap-2 ml-auto'>
            {
                isTeacherPage || isPlayerPage ?
                (
                    <Link href="/">
                        <Button size='sm' variant='outline'>
                            <LogOut className='h-4 w-4 mr-2' />
                            Exit
                        </Button>
                    </Link>
                )
                :
                (
                    <Link href="/teacher/courses">
                        <Button size='sm' variant='outline'>
                            Teacher Mode
                        </Button>
                    </Link>
                )
            }
            <UserButton afterSignOutUrl='/'/>
        </div>
    )
}

export default NavbarRoutes