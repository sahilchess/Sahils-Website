// Sidebar links only show the pages meant for primary navigation.
const navItems = [
  { label: 'home', href: '#/home' },
  { label: 'projects', href: '#/projects' },
  { label: 'find me', href: '#/find-me' },
]

export default function SiteNav({ currentPage }) {
  return (
    <>
      {/* Brand mark stays fixed in the top-left corner. */}
      <a className="site-mark" href="#/home" aria-label="Home">
        ♢
      </a>
      {/* Primary navigation uses the sudo-style labels. */}
      <nav className="topnav" aria-label="Primary navigation">
        {navItems.map((item) => {
          // Highlight the link for the current hash route.
          const pageKey = item.href.replace('#/', '')
          const isActive = currentPage === pageKey

          return (
            <a className={isActive ? 'active' : ''} href={item.href} key={item.label}>
              <span className="nav-prefix">sudo</span>
              <span className="nav-label">{item.label}</span>
            </a>
          )
        })}
      </nav>
    </>
  )
}