import PageHeader from '../components/PageHeader'
import { legacyHTMLExercises, quickLinks } from '../data/siteContent'

const pythonPrograms = ['Memerizor', 'Image Editor', 'Pong', 'RAINBOW', 'Snake Game']

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        actions={[{ label: 'Back Home', href: '#/home', variant: 'secondary' }]}
        description="The old class exercises are now folded into the React rebuild so the website stays in one place."
        eyebrow="Projects"
        slim
        title="Programs and practice"
      />

      <section className="section-block">
        <div className="panel-grid project-grid">
          <article className="panel">
            <h3>Python Programs</h3>
            <ol className="feature-list ordered-list">
              {pythonPrograms.map((project) => (
                <li key={project}>{project}</li>
              ))}
            </ol>
          </article>

          <article className="panel">
            <h3>Legacy HTML Exercises</h3>
            <p>
              The old class exercises are now folded into the React rebuild so
              the website stays in one place.
            </p>
            <ul className="feature-list">
              {legacyHTMLExercises.map((exercise) => (
                <li key={exercise}>{exercise}</li>
              ))}
            </ul>
          </article>

          <article className="panel">
            <h3>Quick Links</h3>
            <div className="quick-links">
              {quickLinks.map((link) => (
                <a
                  className="quick-link-card"
                  href={link.href}
                  key={link.label}
                  rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                >
                  <span className="quick-link-icon" aria-hidden="true">
                    {link.icon}
                  </span>
                  <span className="quick-link-label">{link.label}</span>
                </a>
              ))}
            </div>
          </article>
        </div>
      </section>
    </>
  )
}