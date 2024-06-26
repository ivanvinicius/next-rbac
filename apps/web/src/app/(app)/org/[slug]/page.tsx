import { Header } from '@/components/header'

export default async function OrganizationProjectsPage() {
  return (
    <div className="space-y-4 py-4">
      <Header />

      <main className="mx-auto max-w-[1200px]">
        <span className="font-bold">Organization projects</span>
        <p className="text-sm text-muted-foreground">
          Here you can see all the projects of this organizations
        </p>
      </main>
    </div>
  )
}
