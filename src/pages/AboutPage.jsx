import PageHeader from '../components/PageHeader'
import { aboutLanguages } from '../data/siteContent'

export default function AboutPage() {
  return (
    <>
      <PageHeader
        actions={[{ label: 'Back Home', href: '#/home', variant: 'secondary' }]}
        description="This page explains the experiences, interests, and goals that shape how I approach robotics, speaking, and long-term technical growth."
        eyebrow="About Me"
        slim
        title="A student built around technical growth"
      />

      <section className="section-block">
        <div className="panel-grid about-grid">
          <article className="panel">
            <h3>Background</h3>
            <p>
              I am a student from Georgia with a strong interest in robotics,
              programming, and technical problem solving.
            </p>
            <p>
              My VEX IQ team has been very successful, and in my second year we
              qualified for the VEX IQ Robotics World Championship. That
              experience helped me grow by working with technical teams from
              around the world and earning the Innovative Award at the
              championship. I plan to compete in FRC to deepen my skills in
              design, programming, and engineering collaboration. I also compete
              in FBLA Speaking Events and the Optimist Oratorical, where I have
              earned Top 3 awards at the state and national level.
            </p>
            <p>
              I am part of Hack Club, where I have built many projects that
              strengthen my interest in using technology to create meaningful
              solutions.
            </p>
          </article>

          <article className="panel">
            <h3>Education and Interests</h3>
            <p>
              I am a high school student with a strong interest in engineering,
              programming, and technical communication.
            </p>

            <h4>Hobbies</h4>
            <p>
              Chess, percussion, reading, writing, sketching, photography,
              visual design, and academic olympiads.
            </p>

            <h4>Programming Languages Known</h4>
            <ul className="tag-list">
              {aboutLanguages.map((language) => (
                <li key={language}>{language}</li>
              ))}
            </ul>

            <h4>Long-Term Goals</h4>
            <ul className="feature-list">
              <li>Build a startup that solves a real technical problem</li>
              <li>Attend an Ivy League university</li>
              <li>Keep improving through robotics, coding, and olympiads</li>
            </ul>
          </article>

          <article className="panel">
            <h3>Goals</h3>
            <p>
              I want to keep growing as a technical leader by competing in FRC,
              strengthening my programming and engineering skills, building
              startup ideas, and learning from ambitious people who work on hard
              problems.
            </p>
            <ul className="feature-list">
              <li>Build a startup around a real technical problem</li>
              <li>Earn admission to an Ivy League university</li>
              <li>Keep developing advanced robotics and software skills</li>
            </ul>
          </article>

          <article className="panel">
            <h3>Olympiad Mindset</h3>
            <p>
              I like olympiads because they reward deep thinking, precision, and
              consistent effort. They match the same kind of focus I enjoy in
              robotics, coding, and speaking events.
            </p>
          </article>
        </div>
      </section>
    </>
  )
}