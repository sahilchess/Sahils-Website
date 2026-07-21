import { useEffect, useState } from 'react'
import SiteNav from './components/SiteNav'
import {
  AboutPage,
  HomePage,
  NotFoundPage,
  ProjectsPage,
  FindMePage,
} from './pages'

// Keep the about route available even though it is hidden from the sidebar.
const pageMap = {
  home: HomePage,
  about: AboutPage,
  projects: ProjectsPage,
  'find-me': FindMePage,
}

const pageTitles = {
  home: 'Home | Sahil Dasari',
  about: 'About | Sahil Dasari',
  projects: 'Projects | Sahil Dasari',
  'find-me': 'Find Me | Sahil Dasari',
}

function getPageFromHash() {
  const hash = window.location.hash.replace(/^#\/?/, '')
  return hash || 'home'
}

export default function App() {
  const [currentPage, setCurrentPage] = useState(() => getPageFromHash())

  useEffect(() => {
    // Update the rendered page whenever the URL hash changes.
    function handleHashChange() {
      setCurrentPage(getPageFromHash())
    }

    window.addEventListener('hashchange', handleHashChange)

    // Default to the home page if the app loads without a route.
    if (!window.location.hash) {
      window.location.hash = '#/home'
    }

    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  useEffect(() => {
    document.title = pageTitles[currentPage] ?? 'Home | Sahil Dasari'
  }, [currentPage])

  const Page = pageMap[currentPage] ?? NotFoundPage
  const isHomePage = currentPage === 'home'

  return (
    <main className={isHomePage ? 'app-shell app-shell-home' : 'app-shell'}>
      {/* Shared sidebar and brand mark stay mounted across all routes. */}
      <SiteNav currentPage={currentPage} />
      {/* The centered content area changes per page but shares the same shell. */}
      <div className="site-frame">
        <Page />
      </div>
      {/* The Latin footer is pinned only on the home page to keep it visible. */}
      <footer className={isHomePage ? 'site-footer site-footer-home' : 'site-footer'}>
        <p className="site-footer-quote">Aut viam inveniam aut faciam</p>
      </footer>
    </main>
  )
}