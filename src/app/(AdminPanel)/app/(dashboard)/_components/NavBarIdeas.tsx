import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import React, { Suspense } from 'react'
import { Database } from '../../../../../lib/types/supabase-generated.types';
import LoadingDots from '../../../../../components/icons/loading-dots';
import { capitalize } from '../../../../../lib/utils';


function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}

const NavBarIdeas = async () => {
    const supabase = createServerComponentClient<Database>({
        cookies,
    });

    const { data: ideas, error } = await supabase
        .from('ideas')
        .select('*')

    if (error || !ideas) return

    return (
        <li>
            <Suspense fallback={<LoadingDots />}>
                <div className="text-xs font-semibold leading-6 text-gray-400">Your ideas</div>
                <ul role="list" className="-mx-2 mt-2 space-y-1">
                    {ideas.map((idea) => (
                        <li key={idea.name}>
                            <a
                                href={'/site/' + idea.name + '/settings/appearance'}
                                // TODO update styling to reflect if one of the ideas is currently selected
                                className={classNames(
                                    false ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800',
                                    'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                )}
                            >
                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white">
                                    {idea.name.charAt(0).toUpperCase()}
                                </span>
                                <span className="truncate">{capitalize(idea.name)}</span>
                            </a>
                        </li>
                    ))}
                </ul>
            </Suspense>
        </li>
    )
}

export default NavBarIdeas