import PageHeader from '../components/PageHeader'

export default function NotFoundPage() {
  return (
    <>
      <PageHeader
        actions={[{ label: 'Back Home', href: '#/home', variant: 'secondary' }]}
        description="That page does not exist, but you can jump back to the main site from here."
        eyebrow="Page not found"
        slim
        title="Lost page"
      />

      <section className="section-block">
        <article className="panel spotlight-panel text-center-panel">
          <h3>Nothing here</h3>
          <p>
            The link you opened does not match one of the site pages. Go back to
            the home page and choose a section from the navigation.
          </p>
        </article>
      </section>
    </>
  )
}