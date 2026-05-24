import { useEffect, useState } from 'react'
import SiteNav from './components/SiteNav'
import {
  AboutPage,
  BrowserProjectsPage,
  ContactPage,
  HomePage,
  NotFoundPage,
  ProjectsPage,
} from './pages'

const pageMap = {
  home: HomePage,
  about: AboutPage,
  projects: ProjectsPage,
  'browser-projects': BrowserProjectsPage,
  contact: ContactPage,
}

function getPageFromHash() {
  const hash = window.location.hash.replace(/^#\/?/, '')
  return hash || 'home'
}

export default function App() {
  const [currentPage, setCurrentPage] = useState(() => getPageFromHash())

  useEffect(() => {
    function handleHashChange() {
      setCurrentPage(getPageFromHash())
    }

    window.addEventListener('hashchange', handleHashChange)

    if (!window.location.hash) {
      window.location.hash = '#/home'
    }

    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const Page = pageMap[currentPage] ?? NotFoundPage

  return (
    <main className="app-shell">
      <SiteNav currentPage={currentPage} />
      <Page />
      <footer className="site-footer">
        <p className="site-footer-quote">Aut viam inveniam aut faciam</p>
      </footer>
    </main>
  )
}