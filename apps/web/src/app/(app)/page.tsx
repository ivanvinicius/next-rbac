import { Header } from '@/components/header'

export default async function HomePage() {
  return (
    <div className="space-y-4 py-4">
      <Header />

      <main className="mx-auto max-w-[1200px]">
        <span className="font-bold">Hello</span>
        <p className="text-sm text-muted-foreground">
          Select an organization to see the projects
        </p>
      </main>
    </div>
  )
}
