import PageHeader from '../components/PageHeader'

export default function HomePage() {
  // Home page keeps the layout simple and centered.
  return (
    <div className="home-page-shell">
      {/* Big centered intro with the primary calls to action. */}
      <PageHeader
        actions={[
          { label: 'Projects', href: '#/projects' },
          { label: 'Find me', href: '#/find-me', variant: 'secondary' },
        ]}
        description="I'm a student and developer interested in storytelling through human-centered technology."
        title="Sahil Dasari"
      />
    </div>
  )
}