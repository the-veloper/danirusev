import { getPayloadClient } from '@/lib/get-payload';
import { ExperiencesPageClient } from './client-page';
import { Experience } from '@/payload-types';

export default async function ExperiencesPage() {
  const payload = await getPayloadClient();

  const { docs: experiences } = await payload.find({
    collection: 'experiences',
    limit: 100,
  });

  // Transform the data to match the expected format in the client component
  const transformedExperiences = experiences.map((exp: Experience) => ({
    id: exp.id,
    title: exp.title,
    subtitle: exp.subtitle,
    price: exp.price.toString(), // Ensure price is a string
    duration: exp.duration,
    description: exp.description,
    gradient: exp.gradient,
    color: exp.color,
    icon: exp.icon, // This will be a string, client component needs to handle rendering Lucide icon
    sessions: exp.sessions,
    features: (exp.features || []).map(feat => feat.feature), // Ensure features is an array and extract string
    locations: (exp.locations || []).map(loc => loc.location), // Ensure locations is an array and extract string
    detailedInfo: {
      overview: exp.detailedInfo.overview,
      whatYouGet: (exp.detailedInfo.whatYouGet || []).map(item => item.item), // Ensure whatYouGet is an array and extract string
      process: (exp.detailedInfo.process || []).map(step => step.step), // Ensure process is an array and extract string
      locations: (exp.detailedInfo.locations || []).map(loc => loc.location), // Ensure locations is an array and extract string
      requirements: (exp.detailedInfo.requirements || []).map(req => req.requirement), // Ensure requirements is an array and extract string
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
