export default function PageHeader({
  title,
  description,
  actions = [],
  aside = null,
  slim = false,
}) {
  return (
    // Reusable page hero used by the main routes.
    <header className={`hero-panel ${slim ? 'hero-panel-slim' : ''}`}>
      <div className="hero-copy">
        {/* Main page title. */}
        <h1 className={`page-title ${slim ? 'page-title-slim' : ''}`}>{title}</h1>
        {/* Optional supporting description under the title. */}
        {description ? <p className="hero-text">{description}</p> : null}
        {/* Optional action buttons below the hero text. */}
        {actions.length > 0 ? (
          <div className="hero-actions hero-actions-centered">
            {actions.map((action) => (
              <a
                className={`button ${action.variant === 'secondary' ? 'button-secondary' : 'button-primary'}`}
                href={action.href}
                key={action.label}
              >
                {action.label}
              </a>
            ))}
          </div>
        ) : null}
      </div>

      {/* Optional right-side content for pages that need it. */}
      {aside ? <div className="hero-rail">{aside}</div> : null}
    </header>
  )
}