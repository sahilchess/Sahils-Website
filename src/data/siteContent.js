import React from 'react'
import hackclubLogo from '../assets/hackclub.png'

// Small shared facts used by the hero and about pages.
export const heroMetrics = [
  { label: 'Robotics', value: 'VEX IQ and FRC growth' },
  { label: 'Speaking', value: 'FBLA and Oratorical events' },
  { label: 'Projects', value: 'Python, web, and browser builds' },
]

// Language badges shown on the about page.
export const aboutLanguages = ['HTML', 'Python', 'CSS', 'C++']
export const aboutLanguageBadges = [
  { label: 'HTML', signature: '<html>' },
  { label: 'Python', signature: '>>> py' },
  { label: 'CSS', signature: '{ style }' },
  { label: 'C++', signature: 'C++' },
]

// Legacy class exercises still referenced from the old site.
export const legacyHTMLExercises = ['Intro', 'Lists', 'Form', 'HTML HW', 'HTML2 HW']

// Quick contact links shown on the older secondary pages.
export const quickLinks = [
  {
    label: 'GitHub',
    href: 'https://github.com/sahilchess',
    icon: '</>',
  },
  {
    label: 'Hack Club Slack',
    href: 'https://hackclub.enterprise.slack.com/team/U05D9BJD4UC',
    icon: React.createElement('img', { src: hackclubLogo, alt: 'Hack Club', width: 28, height: 28 }),
  },
  {
    label: 'Email',
    href: 'mailto:sahilchess09@gmail.com?subject=Website%20Email',
    icon: '✉',
  },
]

// Home cards are intentionally empty right now.
export const homeCards = [
]

// LocalStorage key used by the browser demo.
export const memerizorKey = 'sahil-memerizor-items'
// Default code sample for the browser Python editor.
export const defaultPyCode = `print("Python is running in the browser.")
for i in range(3):
    print("Iteration", i + 1)`
// Pyodide runtime base URL.
export const pyodideIndexUrl = 'https://cdn.jsdelivr.net/pyodide/v0.26.2/full/'