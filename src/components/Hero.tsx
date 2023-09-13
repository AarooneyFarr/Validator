import Image from 'next/image'

import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import logoLaravel from '@/images/logos/laravel.svg'
import logoMirage from '@/images/logos/mirage.svg'
import logoStatamic from '@/images/logos/statamic.svg'
import logoStaticKit from '@/images/logos/statickit.svg'
import logoTransistor from '@/images/logos/transistor.svg'
import logoTuple from '@/images/logos/tuple.svg'
import { PageData } from '../app/(AdminPanel)/app/(dashboard)/site/[id]/settings/appearance/_components/PageEditor'
import { ChangeEvent } from 'react'

export function Hero({ heroSlogan, heroSecondary, isEditing, updateHeroFn }: { heroSlogan?: string[], heroSecondary?: string, isEditing?: boolean, updateHeroFn?: React.Dispatch<React.SetStateAction<PageData>> }) {

  const handleUpdate = (e: ChangeEvent<HTMLInputElement>, index?: number) => {
    try {
      if (!updateHeroFn) throw new Error('updateTitleFn not defined, cannot edit')
      if (!isEditing) throw new Error('Cannot edit this component')

      // ? If index is defined, update the corresponding slogan, otherwise update the secondary hero text
      if (typeof index == 'number') {
        updateHeroFn((prev) => {
          prev.slogans[index] = e.target.value.toLowerCase()
          prev.slogans[0] = prev.slogans[1] + " " + prev.slogans[2] + " " + prev.slogans[3]
          return ({ ...prev, slogans: prev.slogans })
        })
      }
      else {
        updateHeroFn((prev) => ({ ...prev, hero_secondary: e.target.value }))
      }
    } catch (error) {
      throw error
    }

  }

  return (
    <Container className="pb-16 pt-20 text-center lg:pt-32">
      <h1 className="mx-auto max-w-4xl font-display text-5xl font-medium tracking-tight text-slate-900 sm:text-7xl">
        {!isEditing && ((heroSlogan) ? heroSlogan[1] : 'Accounting')}{' '}
        {isEditing &&
          <input
            type="text"
            name="length"
          id="hero-slogan-1"
            value={heroSlogan?.at(1)}
            onChange={(e) => handleUpdate(e, 1)}
            className='  rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
          />
        }

        <span className="relative whitespace-nowrap text-blue-600">
          <svg
            aria-hidden="true"
            viewBox="0 0 418 42"
            className="absolute left-0 top-2/3 h-[0.58em] w-full fill-blue-300/70"
            preserveAspectRatio="none"
          >
            <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z" />
          </svg>
          {!isEditing && <span className="relative">{heroSlogan?.at(2) ?? 'made simple'}</span>}
          {isEditing &&
            <input
              type="text"
              name="length"
            id="hero-slogan-2"
              value={heroSlogan?.at(2)}
              onChange={(e) => handleUpdate(e, 2)}
              className=' relative rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
            />}
        </span>{' '}
        {!isEditing && (heroSlogan?.at(3) ?? 'for small businesses.')}
        {isEditing &&
          <input
            type="text"
            name="length"
          id="hero-slogan-3"
            value={heroSlogan?.at(3)}
            onChange={(e) => handleUpdate(e, 3)}
            className=' rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
          />}
      </h1>
      {!isEditing && 
      <p className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-slate-700">
        {heroSecondary ?? 'Most bookkeeping software is accurate, but hard to use. We make the opposite trade-off, and hope you don\'t get audited.'}
      </p>
      }
      {isEditing &&
        <input
          type="text"
          name="length"
        id="hero-secondary"
          value={heroSecondary}
          onChange={(e) => handleUpdate(e)}
          className=' mx-auto mt-6 max-w-2xl text-lg tracking-tight text-slate-700 rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
        />}
      <div className="mt-10 flex justify-center gap-x-6">
        <Button href="/register">Sign up for beta</Button>
        {/* <Button
          href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
          variant="outline"
        >
          <svg
            aria-hidden="true"
            className="h-3 w-3 flex-none fill-blue-600 group-active:fill-current"
          >
            <path d="m9.997 6.91-7.583 3.447A1 1 0 0 1 1 9.447V2.553a1 1 0 0 1 1.414-.91L9.997 5.09c.782.355.782 1.465 0 1.82Z" />
          </svg>
          <span className="ml-3">Watch video</span>
        </Button> */}
      </div>
      <div className="mt-36 lg:mt-44">
        {/* <p className="font-display text-base text-slate-900">
          Trusted by these six companies so far
        </p>
        <ul
          role="list"
          className="mt-8 flex items-center justify-center gap-x-8 sm:flex-col sm:gap-x-0 sm:gap-y-10 xl:flex-row xl:gap-x-12 xl:gap-y-0"
        >
          {[
            [
              { name: 'Transistor', logo: logoTransistor },
              { name: 'Tuple', logo: logoTuple },
              { name: 'StaticKit', logo: logoStaticKit },
            ],
            [
              { name: 'Mirage', logo: logoMirage },
              { name: 'Laravel', logo: logoLaravel },
              { name: 'Statamic', logo: logoStatamic },
            ],
          ].map((group, groupIndex) => (
            <li key={groupIndex}>
              <ul
                role="list"
                className="flex flex-col items-center gap-y-8 sm:flex-row sm:gap-x-12 sm:gap-y-0"
              >
                {group.map((company) => (
                  <li key={company.name} className="flex">
                    <Image src={company.logo} alt={company.name} unoptimized />
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul> */}
      </div>
    </Container>
  )
}
