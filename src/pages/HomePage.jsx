import PageHeader from '../components/PageHeader'
import { heroMetrics, homeCards } from '../data/siteContent'

export default function HomePage() {
  return (
    <>
      <PageHeader
        actions={[
          { label: 'About Me', href: '#/about', variant: 'secondary' },
          { label: 'Projects', href: '#/projects' },
        ]}
        aside={heroMetrics.map((metric) => (
          <article className="metric-card" key={metric.label}>
            <span className="metric-label">{metric.label}</span>
            <strong>{metric.value}</strong>
          </article>
        ))}
        description="I am a technical student who enjoys designing, programming, presenting, and building ambitious projects that turn difficult ideas into real results."
        eyebrow="Robotics. Public speaking. Problem solving."
        title="Sahil Dasari"
      />

      <section className="section-block">
        <div className="section-heading">
          <p className="eyebrow">Choose a page</p>
          <h2>Organized Cleanly and Effortlessly</h2>
        </div>

        <div className="panel-grid home-card-grid">
          {homeCards.map((card) => (
            <a className="panel home-card" href={card.href} key={card.title}>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
              <span className="home-card-link">Open page</span>
            </a>
          ))}
        </div>
      </section>
    </>
  )
}