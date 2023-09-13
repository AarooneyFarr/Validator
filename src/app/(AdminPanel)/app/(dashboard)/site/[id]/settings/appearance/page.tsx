import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import React, { Suspense } from 'react'
import { Database } from '../../../../../../../../lib/types/supabase-generated.types';
import LoadingDots from '../../../../../../../../components/icons/loading-dots';
import { notFound } from 'next/navigation';
import PageEditor from './_components/PageEditor';

export const dynamic = 'force-dynamic'

const SiteSettingsAppearance = async ({ params }: { params: { id: string }; }) => {
    const supabase = createServerComponentClient<Database>({
        cookies,
    });

    const { data, error } = await supabase
        .from('ideas')
        .select("*, features(*), faqs(*)")
        .eq('name', params.id)
        .limit(1)
        .single()



    if (error) throw error

    if (!data) return notFound()

    return (
        <Suspense fallback={<LoadingDots />}>
            <PageEditor pageData={data} />
        </Suspense>
    )
}

export default SiteSettingsAppearance