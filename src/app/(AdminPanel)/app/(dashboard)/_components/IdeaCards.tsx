'use client'
import { Menu, Transition } from '@headlessui/react'
import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline'
import React, { Fragment } from 'react'
import Image from "next/image";
import { capitalize, classNames } from '../../../../../lib/utils';
import { format } from 'date-fns'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '../../../../../lib/types/supabase-generated.types';
import { cookies } from 'next/headers';
import { IdeasQuery } from '../page';


const clients = [
    {
        id: 1,
        name: 'Clamshell',
        imageUrl: 'https://sb03.app/favicon.ico',
        lastInvoice: { date: 'September 11, 2023', dateTime: '2022-12-13', amount: '200', status: 'Overdue' },
    },
    {
        id: 2,
        name: 'SavvyCal',
        imageUrl: 'https://tailwindui.com/img/logos/48x48/savvycal.svg',
        lastInvoice: { date: 'January 22, 2023', dateTime: '2023-01-22', amount: '14,000', status: 'Paid' },
    },
    {
        id: 3,
        name: 'Reform',
        imageUrl: 'https://tailwindui.com/img/logos/48x48/reform.svg',
        lastInvoice: { date: 'January 23, 2023', dateTime: '2023-01-23', amount: '7,600', status: 'Paid' },
    },
]



const IdeaCards = ({ ideasData }: { ideasData: IdeasQuery }) => {



    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
                <div className="flex items-center justify-between">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">Recent ideas</h2>
                    <a href="#" className="text-sm font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                        View all<span className="sr-only">, clients</span>
                    </a>
                </div>
                <ul role="list" className="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8">
                    {ideasData?.map((idea) => (
                        <li key={idea.name} className="overflow-hidden rounded-xl border border-gray-200">
                            <div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
                                <Image width={500} height={500}

                                    src={'https://' + idea.name + ".sb03.app/favicon.ico"}
                                    alt={idea.name}
                                    className="h-12 w-12 flex-none rounded-lg bg-white object-cover ring-1 ring-gray-900/10"
                                />
                                <div className="text-sm font-medium leading-6 text-gray-900">{capitalize(idea.name)}</div>
                                <Menu as="div" className="relative ml-auto">
                                    <Menu.Button className="-m-2.5 block p-2.5 text-gray-400 hover:text-gray-500">
                                        <span className="sr-only">Open options</span>
                                        <EllipsisHorizontalIcon className="h-5 w-5" aria-hidden="true" />
                                    </Menu.Button>
                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items className="absolute right-0 z-10 mt-0.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <a
                                                        href={'/site/' + idea.name}
                                                        className={classNames(
                                                            active ? 'bg-gray-50' : '',
                                                            'block px-3 py-1 text-sm leading-6 text-gray-900'
                                                        )}
                                                    >
                                                        View<span className="sr-only">, {idea.name}</span>
                                                    </a>
                                                )}
                                            </Menu.Item>
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <a
                                                        href={"/site/" + idea.name + '/settings/appearance'}
                                                        className={classNames(
                                                            active ? 'bg-gray-50' : '',
                                                            'block px-3 py-1 text-sm leading-6 text-gray-900'
                                                        )}
                                                    >
                                                        Edit<span className="sr-only">, {idea.name}</span>
                                                    </a>
                                                )}
                                            </Menu.Item>
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                            </div>
                            <dl className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
                                <div className="flex justify-between gap-x-4 py-3">
                                    <dt className="text-gray-500">Created</dt>
                                    <dd className="text-gray-700">
                                        <time dateTime={idea.created_at ?? 'April 1'}>{format(new Date(idea.created_at ?? 'April 1'), 'MMM dd yyyy')}</time>
                                    </dd>
                                </div>
                                <div className="flex justify-between gap-x-4 py-3">
                                    <dt className="text-gray-500">Signups</dt>
                                    <dd className="flex items-start gap-x-2">
                                        <div className="font-medium text-gray-900">{idea.contacts.length}</div>
                                        {/* <div
                                                        className={classNames(
                                                            // statuses[client.lastInvoice.status],
                                                            'rounded-md py-1 px-2 text-xs font-medium ring-1 ring-inset'
                                                        )}
                                                    >
                                                        {client.lastInvoice.status}
                                                    </div> */}
                                    </dd>
                                </div>
                            </dl>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default IdeaCards