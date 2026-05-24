import PageHeader from '../components/PageHeader'

export default function ContactPage() {
  return (
    <>
      <PageHeader
        actions={[{ label: 'Back Home', href: '#/home', variant: 'secondary' }]}
        description="If you want to talk about robotics, speaking events, or project ideas, GitHub and email are the fastest ways to reach me."
        eyebrow="Contact"
        slim
        title="Reach out"
      />

      <section className="section-block">
        <article className="panel contact-panel">
          <p>
            If you want to talk about robotics, speaking events, or project
            ideas, GitHub and email are the fastest ways to reach me.
          </p>
          <div className="hero-actions">
            <a
              className="button button-primary"
              href="https://github.com/sahilchess"
              rel="noreferrer"
              target="_blank"
            >
              GitHub
            </a>
            <a
              className="button button-secondary"
              href="mailto:sahilchess09@gmail.com?subject=Website%20Email"
            >
              Email me
            </a>
          </div>
        </article>
      </section>
    </>
  )
}