'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Button } from '@/components/Button'
import { navigation } from '@/components/Navigation'

function PageLink({ label, page, previous = false }) {
  return (
    <>
      <Button
        href={page.href}
        aria-label={`${label}: ${page.title}`}
        variant="secondary"
        arrow={previous ? 'left' : 'right'}
      >
        {label}
      </Button>
      <Link
        href={page.href}
        tabIndex={-1}
        aria-hidden="true"
        className="text-base font-semibold text-zinc-900 transition hover:text-zinc-600 dark:text-white dark:hover:text-zinc-300"
      >
        {page.title}
      </Link>
    </>
  )
}

function PageNavigation() {
  let pathname = usePathname()
  let allPages = navigation.flatMap((group) => group.links)
  let currentPageIndex = allPages.findIndex((page) => page.href === pathname)

  if (currentPageIndex === -1) {
    return null
  }

  let previousPage = allPages[currentPageIndex - 1]
  let nextPage = allPages[currentPageIndex + 1]

  if (!previousPage && !nextPage) {
    return null
  }

  return (
    <div className="flex">
      {previousPage && (
        <div className="flex flex-col items-start gap-3">
          <PageLink label="Previous" page={previousPage} previous />
        </div>
      )}
      {nextPage && (
        <div className="ml-auto flex flex-col items-end gap-3">
          <PageLink label="Next" page={nextPage} />
        </div>
      )}
    </div>
  )
}


function AmuzIcon(props) {
  return (
    <svg viewBox="0 0 68 68" aria-hidden="true" {...props}>
      <g transform="translate(0.000000,68.000000) scale(0.100000,-0.100000)"
         fill="#216AF8" stroke="none">
        <path d="M405 668 c-9 -29 -25 -94 -25 -104 0 -7 12 -15 28 -19 15 -3 42 -18
60 -32 l33 -25 44 37 c25 20 45 40 45 45 0 31 -176 124 -185 98z"/>
        <path d="M120 640 c-27 -27 -25 -66 5 -95 30 -31 65 -32 93 -2 44 46 14 117
-48 117 -17 0 -39 -9 -50 -20z"/>
        <path d="M10 315 c0 -99 80 -214 185 -266 61 -30 69 -31 157 -27 79 3 101 8
146 33 l52 28 23 -21 c12 -12 39 -28 60 -37 l37 -15 0 154 c0 173 -5 186 -65
186 -37 0 -58 -21 -70 -71 -10 -40 -60 -95 -108 -118 -116 -56 -255 12 -288
141 l-13 48 -58 0 -58 0 0 -35z"/>
      </g>
    </svg>
  )
}

function GitHubIcon(props) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 1.667c-4.605 0-8.334 3.823-8.334 8.544 0 3.78 2.385 6.974 5.698 8.106.417.075.573-.182.573-.406 0-.203-.011-.875-.011-1.592-2.093.397-2.635-.522-2.802-1.002-.094-.246-.5-1.005-.854-1.207-.291-.16-.708-.556-.01-.567.656-.01 1.124.62 1.281.876.75 1.292 1.948.93 2.427.705.073-.555.291-.93.531-1.143-1.854-.213-3.791-.95-3.791-4.218 0-.929.322-1.698.854-2.296-.083-.214-.375-1.09.083-2.265 0 0 .698-.224 2.292.876a7.576 7.576 0 0 1 2.083-.288c.709 0 1.417.096 2.084.288 1.593-1.11 2.291-.875 2.291-.875.459 1.174.167 2.05.084 2.263.53.599.854 1.357.854 2.297 0 3.278-1.948 4.005-3.802 4.219.302.266.563.78.563 1.58 0 1.143-.011 2.061-.011 2.35 0 .224.156.491.573.405a8.365 8.365 0 0 0 4.11-3.116 8.707 8.707 0 0 0 1.567-4.99c0-4.721-3.73-8.545-8.334-8.545Z"
      />
    </svg>
  )
}

function SocialLink({ href, icon: Icon, children }) {
  return (
    <Link href={href} className="group" target="_blank">
      <span className="sr-only">{children}</span>
      <Icon className="h-5 w-5 fill-zinc-700 transition group-hover:fill-zinc-900 dark:group-hover:fill-zinc-500" />
    </Link>
  )
}

function SmallPrint() {
  return (
    <div className="flex flex-col items-center justify-between gap-5 border-t border-zinc-900/5 pt-8 sm:flex-row dark:border-white/5">
      <p className="text-xs text-zinc-600 dark:text-zinc-400">
        &copy; Copyright {new Date().getFullYear()}. <a href="https://amuz.co.kr" target="_blank">
        Amuz Co.,LTD
      </a> All rights reserved.
      </p>
      <div className="flex gap-4">
        <SocialLink
          href="https://github.com/amuzcorp/cms-orbit"
          icon={GitHubIcon}
        >
          Follow us on GitHub
        </SocialLink>
        <SocialLink
          href="https://amuz.co.kr"
          icon={AmuzIcon}
        >
          Visit the official website of AMUZ Co.,LTD.
        </SocialLink>
      </div>
    </div>
  )
}

export function Footer() {
  return (
    <footer className="mx-auto w-full max-w-2xl space-y-10 pb-16 lg:max-w-5xl">
      <PageNavigation />
      <SmallPrint />
    </footer>
  )
}
