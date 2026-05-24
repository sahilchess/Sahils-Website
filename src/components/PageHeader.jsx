export default function PageHeader({
  eyebrow,
  title,
  description,
  actions = [],
  aside = null,
  slim = false,
}) {
  return (
    <header className={`hero-panel section-panel ${slim ? 'hero-panel-slim' : ''}`}>
      <div className="hero-copy">
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h1 className={`page-title ${slim ? 'page-title-slim' : ''}`}>{title}</h1>
        {description ? <p className="hero-text">{description}</p> : null}
        {actions.length > 0 ? (
          <div className="hero-actions">
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

      {aside ? <div className="hero-rail">{aside}</div> : null}
    </header>
  )
}