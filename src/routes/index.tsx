import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  return (
    <main style={{ padding: '2rem' }}>
      <h1>Knox Fleet Paint Schedule</h1>
      <p>Your app is building correctly now.</p>
    </main>
  )
}