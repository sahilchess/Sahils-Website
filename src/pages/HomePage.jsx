import PageHeader from '../components/PageHeader'

export default function HomePage() {
  // Home page keeps the layout simple and centered.
  return (
    <div className="home-page-shell">
      {/* Big centered intro with the primary calls to action. */}
      <PageHeader
      /* 
      i dont want these there arlready is the nav bar with the same links 
        actions={[
          { label: 'Projects', href: '/projects' },
          { label: 'Find me', href: '/find-me', variant: 'secondary' },
        ]}
        */
        description="I'm a student and maker that will take over the world with hardware."
        title="sahil dasari"
      />
    </div>
  )
}