import PageHeader from '../components/PageHeader'

export default function FindMePage() {
  return (
    <>
      {/* Find-me page replaces the older contact page name. */}
      <PageHeader
        description="Find me through the places below if you want to talk about projects, ideas, or collaborations."
        eyebrow="find me"
        slim
        title="find me"
      />

      <section className="section-block">
        {/* The contact panel keeps the action buttons in one place. */}
        <article className="panel contact-panel">
          <p>
            If you want to talk about anything, you can talk to me here:
          </p>
          {/* Direct contact buttons. */}
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
              className="button button-primary"
              href="https://hackclub.enterprise.slack.com/team/U05D9BJD4UC"
              rel="noreferrer"
              target="_blank"
            >
              Hack Club Slack
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
