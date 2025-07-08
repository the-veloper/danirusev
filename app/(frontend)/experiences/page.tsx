import { getPayloadClient } from '@/lib/get-payload';
import { ExperiencesPageClient } from './client-page';
import { Experience } from '@/payload-types';

export default async function ExperiencesPage() {
  const payload = await getPayloadClient();

  const { docs: experiences } = await payload.find({
    collection: 'experiences',
    limit: 100,
    sort: 'sort',
  });

  // Transform the data to match the expected format in the client component
  const transformedExperiences = experiences.map((exp: Experience) => ({
    id: exp.id.toString(), // Ensure ID is always a string
    title: exp.title,
    subtitle: exp.subtitle,
    price: exp.price.toString(),
    duration: exp.duration,
    description: exp.description,
    icon: exp.icon,
    sessions: exp.sessions,
    detailedInfo: {
      overview: exp.detailedInfo.overview,
      whatYouGet: (exp.detailedInfo.whatYouGet || []).map(item => item.item),
      process: (exp.detailedInfo.process || []).map(step => step.step),
      locations: (exp.detailedInfo.locations || []).map(loc => loc.location),
      requirements: (exp.detailedInfo.requirements || []).map(req => req.requirement),
    },
  }));

  if (transformedExperiences.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl text-muted-foreground">Няма намерени преживявания.</p>
      </div>
    );
  }

  return <ExperiencesPageClient experiences={transformedExperiences} />;
}