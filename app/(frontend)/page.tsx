import { Suspense } from 'react'
import Hero from '@/components/hero/hero'
import DriftExperienceCards from '@/components/experiences/drift-experience-cards'
import { getPayloadClient } from '@/lib/get-payload'
import { Experience } from '@/payload-types'
import { DriftExperienceCardSkeleton } from '@/components/experiences/drift-experience-card-skeleton'

async function getExperiences(): Promise<Experience[]> {
  const payload = await getPayloadClient()
  try {
    const { docs: experiences } = await payload.find({
      collection: 'experiences',
      limit: 3, // Fetch only 3 for the homepage
      sort: 'sort',
      depth: 1,
    })
    // Ensure IDs are strings for consistency
    return experiences.map(exp => ({ ...exp, id: exp.id.toString() }))
  } catch (error) {
    console.error('Error fetching experiences:', error)
    return []
  }
}

// This is an async component that will be streamed
async function ExperienceCardsLoader() {
  const experiences = await getExperiences()
  return <DriftExperienceCards experiences={experiences} />
}

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Suspense fallback={<DriftExperienceCardSkeleton />}>
        <ExperienceCardsLoader />
      </Suspense>
    </main>
  )
}
