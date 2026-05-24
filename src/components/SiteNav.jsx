const navItems = [
  { label: 'Home', href: '#/home' },
  { label: 'About', href: '#/about' },
  { label: 'Projects', href: '#/projects' },
  { label: 'Browser', href: '#/browser-projects' },
  { label: 'Contact', href: '#/contact' },
]

export default function SiteNav({ currentPage }) {
  return (
    <nav className="topnav section-panel" aria-label="Primary navigation">
      {navItems.map((item) => {
        const pageKey = item.href.replace('#/', '')
        const isActive = currentPage === pageKey

        return (
          <a className={isActive ? 'active' : ''} href={item.href} key={item.label}>
            <span className="tag-angle">&lt;</span>
            <span>{item.label}</span>
            <span className="tag-angle">/&gt;</span>
          </a>
        )
      })}
    </nav>
  )
}