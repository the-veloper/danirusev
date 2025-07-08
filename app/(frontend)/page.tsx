import Hero from '@/components/hero/hero'
import DriftExperienceCards from '@/components/experiences/drift-experience-cards'
import { getPayloadClient } from '@/lib/get-payload'
import { Experience } from '@/payload-types'

async function getExperiences(): Promise<Experience[]> {
  const payload = await getPayloadClient()
  try {
    const { docs: experiences } = await payload.find({
      collection: 'experiences',
      limit: 3, // Fetch only 3 for the homepage
      sort: 'sort',
      depth: 1, // Add depth to fetch nested fields
    })
    return experiences
  } catch (error) {
    console.error('Error fetching experiences:', error)
    return []
  }
}

export default async function Home() {
  const experiences = await getExperiences()

  return (
    <main className="min-h-screen">
      <Hero />
      <DriftExperienceCards experiences={experiences} />
    </main>
  )
}
