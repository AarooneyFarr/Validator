import {
    CalendarIcon,
    ChartPieIcon,
    DocumentDuplicateIcon,
    FolderIcon,
    HomeIcon,
    UsersIcon,
} from '@heroicons/react/24/outline'
import Image from "next/image";
import { Logo } from '../../../components/Logo';
import { ReactNode } from 'react';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '../../../lib/types/supabase-generated.types';
import { cookies } from 'next/headers';
import SignOutButton from '../../../components/SignOutButton';
import NavBarIdeas from './_components/NavBarIdeas';


const navigation = [
    { name: 'Dashboard', href: '#', icon: HomeIcon, count: '5', current: true },
    { name: 'Team', href: '#', icon: UsersIcon, current: false },
    { name: 'Projects', href: '#', icon: FolderIcon, count: '12', current: false },
    { name: 'Calendar', href: '#', icon: CalendarIcon, count: '20+', current: false },
    { name: 'Documents', href: '#', icon: DocumentDuplicateIcon, current: false },
    { name: 'Reports', href: '#', icon: ChartPieIcon, current: false },
]


function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}

export const dynamic = 'force-dynamic'

export default async function DashboardLayout({ children }: { children: ReactNode }) {
    const supabase = createServerComponentClient<Database>({
        cookies,
    });

    const {
        data: { session },
    } = await supabase.auth.getSession()




    return (
        <>
            <div className="hidden xl:fixed xl:inset-y-0 xl:z-50 xl:flex xl:w-72 xl:flex-col">

                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6">
                    <div className="flex h-16 shrink-0 items-center">
                        <Logo className='h-8 w-8' />
                    </div>
                    <nav className="flex flex-1 flex-col">
                        <ul role="list" className="flex flex-1 flex-col gap-y-7">
                            <li>
                                <ul role="list" className="-mx-2 space-y-1">
                                    {navigation.map((item) => (
                                        <li key={item.name}>
                                            <a
                                                href={item.href}
                                                className={classNames(
                                                    item.current ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800',
                                                    'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                                )}
                                            >
                                                <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                                                {item.name}
                                                {item.count ? (
                                                    <span
                                                        className="ml-auto w-9 min-w-max whitespace-nowrap rounded-full bg-gray-900 px-2.5 py-0.5 text-center text-xs font-medium leading-5 text-white ring-1 ring-inset ring-gray-700"
                                                        aria-hidden="true"
                                                    >
                                                        {item.count}
                                                    </span>
                                                ) : null}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                            <NavBarIdeas />
                            <li className="-mx-6 mt-auto">
                                <a

                                    className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-white hover:bg-gray-800 group"
                                >
                                    <Image width={500} height={500}

                                        className="h-8 w-8 rounded-full bg-gray-800"
                                        src="https://gravatar.com/avatar/8206f9e6f9f3074e0ebf7939fdd45d75?s=400&d=mp&r=pg"
                                        alt=""
                                    />
                                    <span className="sr-only">Your profile</span>
                                    <span className={'group-hover:hidden'} aria-hidden="true">{session?.user.email}</span>
                                    <SignOutButton className='hidden group-hover:flex'>Sign out</SignOutButton>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
            <div className='xl:pl-72'>
                {children}
            </div>

        </>
    )
}
