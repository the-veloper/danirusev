"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, MapPin, Info, Check } from "lucide-react"
import { Button } from "../ui/button"
import { useRouter } from "next/navigation"
import * as LucideIcons from 'lucide-react';
import { Experience } from "@/payload-types";
import { useExperienceStore } from "@/lib/stores/experience-store"

interface DriftExperienceCardsProps {
  experiences: Experience[];
}

const gradients = [
  'from-yellow-400 via-amber-500 to-orange-600',
  'from-cyan-400 via-rent to-indigo-600',
  'from-lime-400 via-mix to-emerald-600',
];

export default function DriftExperienceCards({ experiences = [] }: DriftExperienceCardsProps) {
  const router = useRouter()
  const { setActiveId } = useExperienceStore()

  const getLucideIcon = (iconName: string) => {
    const IconComponent = (LucideIcons as any)[iconName];
    return IconComponent ? <IconComponent className="w-6 h-6" /> : null;
  };

  const handleSeeMore = (id: string) => {
    setActiveId(id)
    router.push(`/experiences?experience=${id}`)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-gagalin mb-4  bg-clip-text text-main">
          Преживявания
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Изберете своето изживяване. От пасажерско до шофьорско, а защо не и двете?
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {experiences.map((experience, index) => (
          <Card
            key={experience.id}
            className="relative overflow-hidden border border-black/20 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 bg-background backdrop-blur-sm"
          >
            {/* Gradient Header */}
            <div className={`h-32 -mt-8  bg-gradient-to-br ${gradients[index % gradients.length]} relative`}>
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="relative z-10 p-6 text-white">
                <div className="flex items-center justify-between mb-2">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">{getLucideIcon(experience.icon)}</div>
                  <Badge variant="secondary" className="bg-white/90 text-gray-800 font-bold">
                    {experience.price} лв
                  </Badge>
                </div>
                <h3 className="text-xl font-bold text-outline-md">{experience.title}</h3>
                <p className="text-sm opacity-90 text-outline-md">{experience.subtitle}</p>
              </div>
            </div>

            <CardContent className="p-6 space-y-4">
              <p className="text-sm text-muted-foreground leading-relaxed h-20 overflow-hidden">{experience.description}</p>

              {/* Duration and Sessions */}
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-main" />
                  <span className="font-medium">{experience.duration}</span>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex items-start gap-2">
                  <Info className="w-4 h-4 text-main mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-medium text-gray-600 mb-1">ИНФОРМАЦИЯ ЗА СЕСИЯТА</p>
                      <p className="text-sm">
                        {experience.sessions}
                      </p>
                  </div>
                </div>
              </div>

              {/* What You Get */}
              {(experience.detailedInfo?.whatYouGet && experience.detailedInfo.whatYouGet.length > 0) && (
                <div className="border-t pt-4">
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-main mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs font-medium text-gray-600 mb-1">ВКЛЮЧВА</p>
                      <div className="grid grid-cols-1 gap-1">
                        {(Array.isArray(experience.detailedInfo.whatYouGet) ? experience.detailedInfo.whatYouGet : []).slice(0, 4).map((item, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm">
                            <div className="w-1.5 h-1.5 bg-main rounded-full"></div>
                            <span>{typeof item === 'object' && item !== null && 'item' in item ? item.item : String(item)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Location */}
              {(experience.detailedInfo?.locations && experience.detailedInfo.locations.length > 0) && (
                <div className="border-t pt-4">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-main mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs font-medium text-gray-600 mb-1">ЛОКАЦИЯ</p>
                      {(Array.isArray(experience.detailedInfo.locations) ? experience.detailedInfo.locations : []).map((location, index) => (
                        <p key={index} className="text-sm">
                          {typeof location === 'object' && location !== null && 'location' in location ? location.location : String(location)}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <Button onClick={() => handleSeeMore(experience.id)} className={`w-[60%] mx-auto flex bg-gradient-to-br ${gradients[index % gradients.length]} drop-shadow-xl/50`}>
                <span className="font-bold text-white text-outline-sm">Виж повече</span>
              </Button>

            </CardContent>

            {/* Decorative elements */}
            <div className="absolute top-4 right-4 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
            <div className="absolute bottom-4 left-4 w-16 h-16 bg-white/5 rounded-full blur-lg"></div>
          </Card>
        ))}
      </div>
    </div>
  )
}
