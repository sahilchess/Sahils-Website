import PageHeader from '../components/PageHeader'
import { useMemo, useState } from 'react'

// The category tabs control which cards are shown below.
const projectTabs = [
  { label: 'All', key: 'all' },
  { label: 'Hardware', key: 'hardware' },
  { label: 'Game Dev', key: 'game-dev' },
  { label: 'Web Apps', key: 'web-apps' },
  { label: 'CLI Tools', key: 'cli-tools' },
  // { label: 'stmg elss', key: 'rando' },
]
/*
template card
{
    title: 'title',
// Project cards live  here so adding one only requires one new object.
    category: 'catagories up there',
    description: 'oneliner usually in readme go check it',
    repoUrl: 'https://github.com/sahilchess/woah what tis',
  },
*/
const projectCards = [
  {
    title: 'Nomad: my Custom-E-Scooter',
    category: 'hardware',
    description: 'a custom dual motor electric scooter with a motor in each wheel and tuned regenerative braking for each motor.',
    repoUrl: 'https://github.com/sahilchess/nomad',
  },
  {
    title: 'Pokemon Hackpad',
    category: 'hardware',
    description: 'Pokemon Hackpad is a 5 key macropad with a rotary switch/encoder, and 4 SK6812 MINI E RGB LEDs. It uses KMK firmware.',
    repoUrl: 'https://github.com/sahilchess/Pokemon-Hackpad',
  },
  {
    title: 'Pokemon Devboard',
    category: 'hardware',
    description: 'a pokemon themed rp2040 dev board designed in kicad, arduino lookalike',
    repoUrl: 'https://github.com/sahilchess/Pokemon-Devboard',
  },
  {
    title: 'Pokemon Web OS',
    category: 'web-apps',
    description: 'a pokémon themed web desktop OS built with vanilla html, css, and js. made for stardance',
    repoUrl: 'https://github.com/sahilchess/Pokemon-Web-OS',
  },
  {
    title: 'Story Generator',
    category: 'web-apps',
    description: 'a choose your own adventure engine where every story is generated live and your choices actually change what happens next.',
    repoUrl: 'https://github.com/sahilchess/story-generator',
  },
  {
    title: 'Neopixel Christmas Tree',
    category: 'hardware',
    description: "a christmas tree with three modes and WS2812B leds",
    repoUrl: 'https://github.com/hackclub/pixeldust/tree/master/submissions/sahils_christmas_tree',
  },
  {
    title: 'Chess in Godot',
    category: 'game-dev',
    description: 'a chess game built with Godot',
    repoUrl: 'https://github.com/sahilchess/GodotChess',
  },
  {
    title: 'USACO Preparation Tracker',
    category: 'cli-tools',
    description: 'A lightweight command-line tracker for logging USACO (and Codeforces) practice problems, then reviewing progress over time.',
    repoUrl: 'https://github.com/sahilchess/USACO-Preparation-Tracker',
  },

]

export default function ProjectsPage() {
  const [activeTab, setActiveTab] = useState('all')

  // Filter the visible cards when the selected tab changes.
  const filteredProjects = useMemo(() => {
    if (activeTab === 'all') {
      return projectCards
    }

    return projectCards.filter((project) => project.category === activeTab)
  }, [activeTab])

  return (
    <>
      {/* Projects page hero keeps the section title compact. */}
      <PageHeader
        description="A compact index of the work, experiments, and build-out around this site."
        eyebrow="projects"
        slim
        title="projects"
      />

      <section className="section-block">
        {/* Tabs switch the grid without leaving the page. */}
        <div className="project-tabs" role="tablist" aria-label="Project categories">
          {projectTabs.map((tab) => (
            <button
              aria-pressed={activeTab === tab.key}
              className={activeTab === tab.key ? 'project-tab active' : 'project-tab'}
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* The project grid renders only the cards that match the selected tab. */}
        <div className="project-matrix">
          {filteredProjects.map((project) => (
            <article className="project-cell" key={project.title}>
              {/* Title plus GitHub link live together in the card header. */}
              <div className="project-cell-head">
                <h3>{project.title}</h3>
                <a
                  className="project-repo-link"
                  href={project.repoUrl}
                  rel="noreferrer"
                  target="_blank"
                  aria-label={`Open ${project.title} on GitHub`}
                  title="Open GitHub repo"
                >
                  <GitHubMark />
                </a>
              </div>
              <p>{project.description}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}

function GitHubMark() {
  return (
    // Inline GitHub icon keeps the card self-contained.
    <svg aria-hidden="true" viewBox="0 0 24 24" focusable="false">
      <path
        fill="currentColor"
        d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.72.5.1.66-.22.66-.49v-1.8c-2.78.61-3.36-1.39-3.36-1.39-.45-1.17-1.1-1.48-1.1-1.48-.9-.63.07-.62.07-.62 1 .07 1.52 1.05 1.52 1.05.88 1.54 2.32 1.1 2.88.84.09-.65.35-1.1.64-1.35-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.38-2.03 1.01-2.75-.1-.26-.44-1.3.1-2.71 0 0 .83-.27 2.73 1.05A9.17 9.17 0 0 1 12 7.17c.84 0 1.69.12 2.48.35 1.9-1.32 2.73-1.05 2.73-1.05.54 1.41.2 2.45.1 2.71.63.72 1.01 1.63 1.01 2.75 0 3.94-2.35 4.81-4.58 5.06.36.32.68.94.68 1.9v2.82c0 .27.16.59.67.49A10.27 10.27 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z"
      />
    </svg>
  )
}