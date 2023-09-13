'use client'
import React, { useState } from 'react'
import { Header } from '@/components/Header'
import { data } from 'autoprefixer'
import { CallToAction } from '@/components/CallToAction'
import { Faqs } from '@/components/Faqs'
import { Footer } from '@/components/Footer'
import { Hero } from '@/components/Hero'
import { PrimaryFeatures } from '@/components/PrimaryFeatures'
import { SecondaryFeatures } from '@/components/SecondaryFeatures'
import { Tables } from '../../../../../../../../../lib/types/supabase.types'
import { capitalize } from '../../../../../../../../../lib/utils'

export type PageData =
    Tables<'ideas'> &
    {
        features: Tables<'features'>[]
        faqs: Tables<'faqs'>[]
    }

const defaultPage: PageData = {
    created_at: 'null',
    cta_button_text: 'strin',
    cta_name: 'string',
    cta_text: 'string',
    faq_title: 'string',
    faqs_description: 'string',
    hero_secondary: 'string',
    name: 'string',
    primary_feature_description: 'string',
    primary_feature_title: 'string',
    secondary_feature_description: 'string',
    secondary_feature_title: 'string',
    slogans: ['default slogan', 'this', 'is a', 'filler slogan'],
    features: [
        {
            description: 'string',
            feature_type: "primary",
            id: 'string',
            idea: 'string',
            image: 'string',
            summary: 'string',
            title: 'string',
        }
    ],
    faqs: [
        {
            question: 'q',
            answer: 'a',
            column: 1,
            id: 'sss',
            idea: 'string'
        }
    ]
}




const PageEditor = ({ pageData }: { pageData?: PageData }) => {
    const [pageInfo, setPageInfo] = useState<PageData>(pageData ?? defaultPage)
    const [isEditing, setIsEditing] = useState(true)

    return (
        <>
            <Header title={capitalize(pageInfo.name)} isEditing={isEditing} updateTitleFn={setPageInfo} />
            <main>
                <Hero heroSlogan={pageInfo?.slogans} heroSecondary={pageInfo?.hero_secondary} isEditing={isEditing} updateHeroFn={setPageInfo} />
                <PrimaryFeatures title={pageInfo?.primary_feature_title} description={pageInfo?.primary_feature_description} features={pageInfo?.features} isEditing={isEditing} updatePrimaryFeaturesFn={setPageInfo} />
                <SecondaryFeatures title={pageInfo?.secondary_feature_title} description={pageInfo?.secondary_feature_description} features={pageInfo?.features} />
                <CallToAction name={pageInfo?.cta_name} text={pageInfo?.cta_text} buttonText={pageInfo?.cta_button_text} />
                {/* <Testimonials /> */}
                {/* <Pricing /> */}
                <Faqs title={pageInfo?.faq_title} description={pageInfo?.faqs_description} faqs={pageInfo?.faqs} />
            </main>
            <Footer />
        </>
    )
}

export default PageEditor