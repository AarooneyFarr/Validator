
import { Fragment, useState } from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'
import {
    ArrowDownCircleIcon,
    ArrowPathIcon,
    ArrowUpCircleIcon,
    Bars3Icon,
    EllipsisHorizontalIcon,
    PlusSmallIcon,
} from '@heroicons/react/20/solid'
import { BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Image from "next/image";
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { toast } from 'react-toastify';
import { Database } from '../../../../../../lib/types/supabase-generated.types';
import IdeaCards from '../../_components/IdeaCards';
import RecentSignups from '../../_components/RecentSignups';
import Stats from '../../_components/Stats';
import { capitalize } from '../../../../../../lib/utils';
import ContactsTable from './_components/ContactsTable';
import ContactsTableCard from './_components/ContactsTableCard';
import Link from 'next/link';






// const statuses = {
//     Paid: 'text-green-700 bg-green-50 ring-green-600/20',
//     Withdraw: 'text-gray-600 bg-gray-50 ring-gray-500/10',
//     Overdue: 'text-red-700 bg-red-50 ring-red-600/10',
// }


export type IdeaQuery = {
    name: string;
    created_at: string | null;
    contacts: Contact[];
} | null

export type Contact = {
    created_at: string | null;
    email: string;
    first_name: string;
    id: string;
    idea: string;
    last_name: string;
    source: string;
};


export default async function DashboardPage({ params }: { params: { id: string }; }) {


    const supabase = createServerComponentClient<Database>({
        cookies
    })

    const { data: ideaData, error: contactsError } = await supabase
        .from('ideas')
        .select(`name, created_at, contacts(*)`)
        .eq('name', params.id)
        .limit(1)
        .single()

    if (contactsError) throw contactsError
    if (!ideaData) toast.error('Ideas not loaded properly')


    const secondaryNavigation = [
        // { name: 'Last 7 days', href: '#', current: true },
        // { name: 'Last 30 days', href: '#', current: false },
        { name: 'Contacts', href: '/site/' + params.id, current: true },
        { name: 'View site', href: '/site/' + params.id + '/settings/appearance', current: false },
    ]

    return (
        <>
            <main>
                <div className="relative isolate overflow-hidden">
                    {/* Secondary navigation */}
                    <header className="pb-4 pt-6 sm:pb-6">
                        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-6 px-4 sm:flex-nowrap sm:px-6 lg:px-8">
                            <h1 className="text-base font-semibold leading-7 text-gray-900">{capitalize(params.id)}</h1>
                            <div className="order-last flex w-full gap-x-8 text-sm font-semibold leading-6 sm:order-none sm:w-auto sm:border-l sm:border-gray-200 sm:pl-6 sm:leading-7">
                                {secondaryNavigation.map((item) => (
                                    <Link key={item.name} href={item.href} className={item.current ? 'text-indigo-600' : 'text-gray-700'}>
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                            {/* <a
                                href="#"
                                className="ml-auto flex items-center gap-x-1 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                <PlusSmallIcon className="-ml-1.5 h-5 w-5" aria-hidden="true" />
                                New invoice
                            </a> */}
                        </div>
                    </header>

                    {/* Stats */}
                    {/* <Stats ideasData={ideasData} /> */}

                    <div
                        className="absolute left-0 top-full -z-10 mt-96 origin-top-left translate-y-40 -rotate-90 transform-gpu opacity-20 blur-3xl sm:left-1/2 sm:-ml-96 sm:-mt-10 sm:translate-y-0 sm:rotate-0 sm:transform-gpu sm:opacity-50"
                        aria-hidden="true"
                    >
                        <div
                            className="aspect-[1154/678] w-[72.125rem] bg-gradient-to-br from-[#FF80B5] to-[#9089FC]"
                            style={{
                                clipPath:
                                    'polygon(100% 38.5%, 82.6% 100%, 60.2% 37.7%, 52.4% 32.1%, 47.5% 41.8%, 45.2% 65.6%, 27.5% 23.4%, 0.1% 35.3%, 17.9% 0%, 27.7% 23.4%, 76.2% 2.5%, 74.2% 56%, 100% 38.5%)',
                            }}
                        />
                        S</div>
                </div>

                <div className="space-y-16 py-16 xl:space-y-20 bg-gray-200 h-screen">
                    {/* Recent activity table */}
                    {/* <RecentSignups /> */}

                    <ContactsTableCard contacts={ideaData.contacts} />

                    {/* Recent client list*/}
                    {/* <IdeaCards ideasData={ideasData} /> */}
                </div>
            </main>
        </>
    )
}
