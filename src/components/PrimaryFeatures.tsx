'use client'

import { ChangeEvent, useEffect, useState } from 'react'
import Image from 'next/image'
import { Tab } from '@headlessui/react'
import clsx from 'clsx'

import { Container } from '@/components/Container'
import backgroundImage from '@/images/background-features.jpg'
import screenshotExpenses from '@/images/screenshots/expenses.png'
import screenshotPayroll from '@/images/screenshots/payroll.png'
import screenshotReporting from '@/images/screenshots/reporting.png'
import screenshotVatReturns from '@/images/screenshots/vat-returns.png'
import { PageData } from '../app/app/(dashboard)/site/[id]/settings/appearance/_components/PageEditor'

// const features = [
//   {
//     title: 'Payroll',
//     summary:
//       "Keep track of everyone's salaries and whether or not they've been paid. Direct deposit not supported.",
//     image: screenshotPayroll,
//   },
//   {
//     title: 'Claim expenses',
//     summary:
//       "All of your receipts organized into one place, as long as you don't mind typing in the data by hand.",
//     image: screenshotExpenses,
//   },
//   {
//     title: 'VAT handling',
//     summary:
//       "We only sell our software to companies who don't deal with VAT at all, so technically we do all the VAT stuff they need.",
//     image: screenshotVatReturns,
//   },
//   {
//     title: 'Reporting',
//     summary:
//       'Easily export your data into an Excel spreadsheet where you can do whatever the hell you want with it.',
//     image: screenshotReporting,
//   },
// ]

type Features = {
  summary: string | null;
  feature_type: "primary" | "secondary";
  id: string;
  idea: string | null;
  description: string | null;
  title: string;
  image: string | null;
}[] | undefined

export function PrimaryFeatures({ title, description, features, isEditing, updatePrimaryFeaturesFn }: { title?: string, description?: string, features?: Features, isEditing?: boolean, updatePrimaryFeaturesFn?: React.Dispatch<React.SetStateAction<PageData>> }) {
  let [tabOrientation, setTabOrientation] = useState<'horizontal' | 'vertical'>(
    'horizontal',
  )

  useEffect(() => {
    let lgMediaQuery = window.matchMedia('(min-width: 1024px)')

    function onMediaQueryChange({ matches }: { matches: boolean }) {
      setTabOrientation(matches ? 'vertical' : 'horizontal')
    }

    onMediaQueryChange(lgMediaQuery)
    lgMediaQuery.addEventListener('change', onMediaQueryChange)

    return () => {
      lgMediaQuery.removeEventListener('change', onMediaQueryChange)
    }
  }, [])

  const sortedFeatures = features?.sort((a, b) => {
    let sortNumber = (a.id > b.id) ? 1 : -1

    if (a.feature_type == 'primary' && b.feature_type == 'secondary') sortNumber = 1
    if (a.feature_type == 'secondary' && b.feature_type == 'primary') sortNumber = -1



    return sortNumber
  })

  /**
   * 1 = title
   * 2 = description
   * 3 = feature title
   * 4 = feature summary
   * 5 = feature image link
   *
   * @param {(ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>)} e
   * @param {number} [index] This corresponds to which item is being updated
   * @param {string} id This is the id of the feature being edited, if it is editing a feature
   * 
   */
  const handleUpdate = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>, index: number, id?: string) => {
    try {
      if (!updatePrimaryFeaturesFn) throw new Error('updateTitleFn not defined, cannot edit')
      if (!isEditing) throw new Error('Cannot edit this component')
      if (!index) throw new Error('No index defined')

      // ? If index is defined, update the corresponding slogan, otherwise update the secondary hero text
      if (index == 1) {
        updatePrimaryFeaturesFn((prev) => ({ ...prev, secondary_feature_title: e.target.value }))
      }
      else if (index == 2) {
        updatePrimaryFeaturesFn((prev) => ({ ...prev, secondary_feature_description: e.target.value }))
      }
      else if (index == 3) {
        updatePrimaryFeaturesFn((prev) => {
          const newArray = prev.features
          const updateItem = newArray.find((feature) => feature.id === id)

          if (updateItem) updateItem.title = e.target.value;
          else throw new Error('Update item not found')

          const finalArray = prev.features.filter((feature) => feature.id != id)
          finalArray.push(updateItem)


          return ({ ...prev, features: finalArray })
        })
      }
      else if (index == 4) {
        updatePrimaryFeaturesFn((prev) => {
          const newArray = prev.features
          const updateItem = newArray.find((feature) => feature.id === id)

          if (updateItem) updateItem.summary = e.target.value;
          else throw new Error('Update item not found')

          const finalArray = prev.features.filter((feature) => feature.id != id)
          finalArray.push(updateItem)


          return ({ ...prev, features: finalArray })
        })
      }
      else if (index == 5) {
        updatePrimaryFeaturesFn((prev) => {
          const newArray = prev.features
          const updateItem = newArray.find((feature) => feature.id === id)

          if (updateItem) updateItem.image = e.target.value;
          else throw new Error('Update item not found')

          const finalArray = prev.features.filter((feature) => feature.id != id)
          finalArray.push(updateItem)


          return ({ ...prev, features: finalArray })
        })
      }
      else {
        throw new Error("Index not found")
      }

    } catch (error) {
      throw error
    }

  }

  return (
    <section
      id="features"
      aria-label="Features for running your books"
      className="relative overflow-hidden bg-blue-600 pb-28 pt-20 sm:py-32"
    >
      <Image
        className="absolute left-1/2 top-1/2 max-w-none translate-x-[-44%] translate-y-[-42%]"
        src={backgroundImage}
        alt=""
        width={2245}
        height={1636}
        unoptimized
      />
      <Container className="relative">
        <div className="max-w-2xl md:mx-auto md:text-center xl:max-w-none">
          <h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl md:text-5xl">
            {!isEditing && (title ?? 'Everything you need to run your books.')}
            {isEditing &&
              <input
                type="text"
                name="length"
              id="PrimaryFeatureTitle"
                value={title}
              onChange={(e) => handleUpdate(e, 1)}
              className=' block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
              />

            }
          </h2>
          <p className="mt-6 text-lg tracking-tight text-blue-100">
            {!isEditing && (description ?? 'Well everything you need if you aren\'t that picky about minor details like tax compliance.')}
            {isEditing &&
              <input
                type="text"
                name="length"
              id="primary-feature-description"
                value={description}
              onChange={(e) => handleUpdate(e, 2)}
                className=' block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
              />

            }
          </p>
        </div>
        <Tab.Group
          as="div"
          className="mt-16 grid grid-cols-1 items-center gap-y-2 pt-10 sm:gap-y-6 md:mt-20 lg:grid-cols-12 lg:pt-0"
          vertical={tabOrientation === 'vertical'}
        >
          {({ selectedIndex }) => (
            <>
              <div className="-mx-4 flex overflow-x-auto pb-4 sm:mx-0 sm:overflow-visible sm:pb-0 lg:col-span-5">
                <Tab.List className="relative z-10 flex gap-x-4 whitespace-nowrap px-4 sm:mx-auto sm:px-0 lg:mx-0 lg:block lg:gap-x-0 lg:gap-y-1 lg:whitespace-normal">
                  {sortedFeatures?.map((feature, featureIndex) => {
                    if (feature.feature_type == 'secondary') return

                    return (
                    <div
                        key={feature.id}
                      className={clsx(
                        'group relative rounded-full px-4 py-1 lg:rounded-l-xl lg:rounded-r-none lg:p-6',
                        selectedIndex === featureIndex
                          ? 'bg-white lg:bg-white/10 lg:ring-1 lg:ring-inset lg:ring-white/10'
                          : 'hover:bg-white/10 lg:hover:bg-white/5',
                      )}
                    >
                      <h3>
                        <Tab
                          className={clsx(
                            'font-display text-lg ui-not-focus-visible:outline-none',
                            selectedIndex === featureIndex
                              ? 'text-blue-600 lg:text-white'
                              : 'text-blue-100 hover:text-white lg:text-white',
                          )}

                        >
                          <span className="absolute inset-0 rounded-full lg:rounded-l-xl lg:rounded-r-none" />
                            {!isEditing && feature.title}
                            {isEditing &&
                              <input
                                type="text"
                                name="length"
                              id={"primary-features-title" + feature.id}
                                value={feature.title}
                              onChange={(e) => handleUpdate(e, 3, feature.id)}
                              className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                              />

                            }
                        </Tab>
                      </h3>
                        {!isEditing && 
                          <p
                        className={clsx(
                          'mt-2 hidden text-sm lg:block',
                          selectedIndex === featureIndex
                            ? 'text-white'
                            : 'text-blue-100 group-hover:text-white',
                        )}
                      >
                          {feature.summary}
                          </p>
                        }
                        {isEditing &&
                          <textarea
                            className="w-full h-16 xs:h-32 p-2 border border-gray-300 rounded-md resize-none"
                            rows={4}
                            cols={50}
                            value={feature.summary ?? ''}
                          id={'primary-features-summary' + feature.id}
                          onChange={(e) => handleUpdate(e, 4, feature.id)}
                          />
                        }
                    </div>
                    )
                  })}
                </Tab.List>
              </div>
              <Tab.Panels className="lg:col-span-7">
                {sortedFeatures?.map((feature) => {
                  if (feature.feature_type == 'secondary') return

                  return (
                  <Tab.Panel key={feature.title} unmount={false}>
                    <div className="relative sm:px-6 lg:hidden">
                      <div className="absolute -inset-x-4 bottom-[-4.25rem] top-[-6.5rem] bg-white/10 ring-1 ring-inset ring-white/10 sm:inset-x-0 sm:rounded-t-xl" />
                      <p className="relative mx-auto max-w-2xl text-base text-white sm:text-center">
                          {feature.summary}
                      </p>
                    </div>
                    <div className="mt-10 w-[45rem] overflow-hidden rounded-xl bg-slate-50 shadow-xl shadow-blue-900/20 sm:w-auto lg:mt-0 lg:w-[67.8125rem]">
                      <Image
                        className="w-full"
                          width={500}
                          height={500}
                          src={feature.image ?? 'https://images.unsplash.com/photo-1604478373812-0ef15d185d90?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGFwcHxlbnwwfDB8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60'}
                        alt=""
                        priority
                        sizes="(min-width: 1024px) 67.8125rem, (min-width: 640px) 100vw, 45rem"
                      />
                        {isEditing &&
                          <input
                            type="text"
                            name="length"
                          id={'primary-features-image' + feature.id}
                            value={feature.image ?? ''}
                          onChange={(e) => handleUpdate(e, 5, feature.id)}
                            className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                          />

                        }
                    </div>
                  </Tab.Panel>
                  )
                })}
              </Tab.Panels>
            </>
          )}
        </Tab.Group>
      </Container>
    </section>
  )
}
