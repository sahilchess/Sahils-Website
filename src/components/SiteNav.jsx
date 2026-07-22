// Sidebar links only show the pages meant for primary navigation.
const navItems = [
  { label: 'home', href: '/home' },
  { label: 'projects', href: '/projects' },
  { label: 'find me', href: '/find-me' },
]

export default function SiteNav({ currentPage }) {
  function handleNavigate(event, href) {
    event.preventDefault()
    window.history.pushState({}, '', href)
    window.dispatchEvent(new PopStateEvent('popstate'))
  }

  return (
    <>
      {/* Brand mark stays fixed in the top-right corner. */}
      <a className="site-mark" href="/home" aria-label="Home" onClick={(event) => handleNavigate(event, '/home')}>
        ♢
      </a>
      {/* Primary navigation uses the sudo-style labels. */}
      <nav className="topnav" aria-label="Primary navigation">
        {navItems.map((item, index) => {
          // Highlight the link for the current path route.
          const pageKey = item.href.replace(/^\//, '')
          const isActive = currentPage === pageKey

          return (
            <a
              className={isActive ? 'active' : ''}
              href={item.href}
              key={item.label}
              style={{ '--nav-chars': item.label.length, '--nav-index': index }}
              onClick={(event) => handleNavigate(event, item.href)}
            >
              <span className="nav-prefix">ssh</span>
              <span className="nav-label">{item.label}</span>
            </a>
          )
        })}
      </nav>
    </>
  )
}