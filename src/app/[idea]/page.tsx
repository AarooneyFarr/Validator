import { ResolvingMetadata, Metadata } from "next"
import { CallToAction } from "../../components/CallToAction"
import { Faqs } from "../../components/Faqs"
import { Footer } from "../../components/Footer"
import { Header } from "../../components/Header"
import { Hero } from "../../components/Hero"
import { PrimaryFeatures } from "../../components/PrimaryFeatures"
import { SecondaryFeatures } from "../../components/SecondaryFeatures"
import { supabase } from "../../lib/supabase/supabase"



type Props = {
  params: { idea: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const name = params.idea

  // fetch data
  const { data } = await supabase
    .from('ideas')
    .select('slogans')
    .eq('name', name)
    .limit(1)
    .single()

  // optionally access and extend (rather than replace) parent metadata



  return {
    title: name + ' | ' + data?.slogans[0],
    // openGraph: {
    //   images: ['/some-specific-page-image.jpg', ...previousImages],
    // },
  }
}

// export async function generateStaticParams() {
//   const { data: ideas } = await supabase.from('ideas').select("*")

//   return ideas?.map((idea) => ({
//     idea: idea.name,
//   }))
// }

// const dynamic = 'force-dynamic'
export const revalidate = 0



export default async function Idea({ params }: { params: { idea: string } }) {

  const { data } = await supabase
    .from('ideas')
    .select("*, features(*), faqs(*)")
    .eq('name', params.idea)
    .limit(1)
    .single()

  console.log(data)

  return (
    <>
      <Header title={data?.name} />
      <main>
        <Hero heroSlogan={data?.slogans} heroSecondary={data?.hero_secondary} />
        <PrimaryFeatures title={data?.primary_feature_title} description={data?.primary_feature_description} features={data?.features} />
        <SecondaryFeatures title={data?.secondary_feature_title} description={data?.secondary_feature_description} features={data?.features} />
        <CallToAction name={data?.cta_name} text={data?.cta_text} buttonText={data?.cta_button_text} />
        {/* <Testimonials /> */}
        {/* <Pricing /> */}
        <Faqs title={data?.faq_title} description={data?.faqs_description} faqs={data?.faqs} />
      </main>
      <Footer />
    </>
  )
}
