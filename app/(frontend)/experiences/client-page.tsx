"use client"

import { useEffect, Suspense } from "react"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, MapPin, Star, Shield, ChevronLeft, ChevronRight, CheckCircle } from "lucide-react"
import * as LucideIcons from 'lucide-react'
import { useExperienceStore } from "@/lib/stores/experience-store"

interface Experience {
  id: string;
  title: string;
  subtitle: string;
  price: string;
  duration: string;
  description: string;
  icon: string;
  sessions: string;
  detailedInfo: {
    overview: string;
    whatYouGet: string[];
    process: string[];
    locations: string[];
    requirements: string[];
  };
}

interface ExperiencesPageClientProps {
  experiences: Experience[];
}

const gradients = [
  'from-yellow-400 via-amber-500 to-orange-600',
  'from-cyan-400 via-rent to-indigo-600',
  'from-lime-400 via-mix to-emerald-600',
];

function ExperiencesView({ experiences }: ExperiencesPageClientProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { activeId, setActiveId } = useExperienceStore()

  // This is now the ONLY effect syncing state. It reads from the URL.
  // This prevents the infinite loop.
  useEffect(() => {
    const idFromUrl = searchParams.get('experience')
    const defaultId = experiences[0]?.id

    const targetId = idFromUrl && experiences.some(e => e.id === idFromUrl)
      ? idFromUrl
      : defaultId

    if (targetId && targetId !== activeId) {
      setActiveId(targetId)
    }
    
    // If the URL has no valid experience, set it to the default one.
    if (!idFromUrl && targetId) {
      const params = new URLSearchParams()
      params.set('experience', targetId)
      router.replace(`${pathname}?${params.toString()}`, { scroll: false })
    }
  }, [searchParams, experiences, activeId, setActiveId, pathname, router])

  // This function now ONLY updates the URL. The effect above will handle the state change.
  const navigateToExperience = (id: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('experience', id)
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  const getLucideIcon = (iconName: string) => {
    const IconComponent = (LucideIcons as any)[iconName];
    return IconComponent ? <IconComponent className="w-6 h-6" /> : null;
  };

  const currentExperience = experiences.find((exp) => exp.id === activeId)

  if (!currentExperience) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-96px)]">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-main"></div>
      </div>
    )
  }

  const nextExperience = () => {
    const currentIndex = experiences.findIndex(exp => exp.id === activeId);
    const nextIndex = (currentIndex + 1) % experiences.length;
    navigateToExperience(experiences[nextIndex].id);
  }

  const prevExperience = () => {
    const currentIndex = experiences.findIndex(exp => exp.id === activeId);
    const prevIndex = (currentIndex - 1 + experiences.length) % experiences.length;
    navigateToExperience(experiences[prevIndex].id);
  }

  const getCardPosition = (cardId: string) => {
    const activeIndex = experiences.findIndex(exp => exp.id === activeId);
    const cardIndex = experiences.findIndex(exp => exp.id === cardId);
    const diff = cardIndex - activeIndex;

    if (diff === 0) return "center"
    if (diff === 1 || diff === - (experiences.length - 1)) return "right"
    if (diff === -1 || diff === (experiences.length - 1)) return "left"
    return "hidden"
  }

  return (
    <div className="min-h-[calc(100vh-96px)] bg-background">
      {/* Desktop Layout */}
      <div className="hidden xl:block container mx-auto px-4 py-8">
        <div className="grid grid-cols-12 gap-8 max-w-7xl mx-auto">
          {/* Left Side - Card Carousel */}
          <div className="col-span-5">
            <div className="sticky top-8">
              <h2 className="text-2xl font-gagalin mb-6 text-center text-main">Изберете Преживяване</h2>
              <div className="relative h-[580px] flex items-center justify-center">
                <AnimatePresence mode="wait">
                  {experiences.map((experience) => {
                    const position = getCardPosition(experience.id)
                    if (position === "hidden") return null
                    return (
                      <motion.div
                        key={experience.id}
                        className={`absolute w-80 ${position === "center" ? "z-30" : "z-10"}`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{
                          opacity: position === "center" ? 1 : 0.4,
                          scale: position === "center" ? 1 : 0.85,
                          x: position === "center" ? 0 : position === "left" ? -120 : 120,
                          filter: position === "center" ? "blur(0px)" : "blur(2px)",
                        }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        onClick={() => navigateToExperience(experience.id)}
                      >
                        <Card className="overflow-hidden border border-foreground/30 shadow-xl h-[550px] flex flex-col">
                          <div className={`h-32 -mt-8 bg-gradient-to-br ${gradients[experiences.findIndex(e => e.id === experience.id) % gradients.length]} relative flex-shrink-0`}>
                            <div className="absolute inset-0 bg-black/20"></div>
                            <div className="relative z-10 p-4 text-white">
                              <div className="flex items-center justify-center gap-3 mb-2 mt-8">
                                <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">{getLucideIcon(experience.icon)}</div>
                                <div>
                                  <h3 className="font-bold text-outline-sm">{experience.title}</h3>
                                  <p className="text-sm opacity-90 text-outline-sm">{experience.subtitle}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <CardContent className="p-4 flex-1 flex flex-col justify-between">
                            <div className="space-y-3">
                              <p className="text-sm text-muted-foreground leading-relaxed">{experience.description}</p>
                              <div className="flex items-center justify-between bg-background rounded-lg p-3">
                                <div className="flex items-center gap-2">
                                  <Clock className="w-4 h-4 text-main" />
                                  <span className="font-medium text-sm">{experience.duration}</span>
                                </div>
                                <div className="text-right">
                                  <p className="text-xl font-bold text-main">{experience.price} лв</p>
                                  <p className="text-xs text-muted-foreground">с включен ДДС</p>
                                </div>
                              </div>
                              <div>
                                <h4 className="text-sm font-bold mb-2 flex items-center gap-2">
                                  <CheckCircle className="w-4 h-4 text-main" />
                                  Какво Получавате
                                </h4>
                                <div className="space-y-1">
                                  {experience.detailedInfo.whatYouGet.slice(0, 4).map((item, index) => (
                                    <div key={index} className="flex items-start gap-2">
                                      <div className="w-1.5 h-1.5 bg-main rounded-full mt-2 flex-shrink-0"></div>
                                      <span className="text-xs">{item}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              <div className="border-t pt-3">
                                <p className="text-xs font-medium text-gray-600 mb-1">ИНФОРМАЦИЯ ЗА СЕСИЯТА</p>
                                <p className="text-sm">{experience.sessions}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    )
                  })}
                </AnimatePresence>
                <Button variant="outline" size="icon" className="cursor-pointer absolute left-4 z-40 bg-white/90 backdrop-blur-sm hover:bg-white" onClick={prevExperience}>
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon" className="cursor-pointer absolute right-4 z-40 bg-white/90 backdrop-blur-sm hover:bg-white" onClick={nextExperience}>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
          <div className="col-span-7">
            <motion.div key={currentExperience.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }} className="space-y-6">
              <div className="text-center">
                <div className={`inline-flex items-center gap-3 bg-gradient-to-r ${gradients[experiences.findIndex(e => e.id === currentExperience.id) % gradients.length]} text-white px-6 py-3 rounded-full mb-4`}>
                  {getLucideIcon(currentExperience.icon)}
                  <span className="font-bold text-lg text-outline-sm">{currentExperience.title}</span>
                </div>
                <p className="text-muted-foreground">{currentExperience.detailedInfo.overview}</p>
              </div>
              <div className="grid grid-cols-2 gap-4 h-[500px]">
                <Card className="row-span-2">
                  <CardContent className="p-5 h-full">
                    <div className="flex items-center gap-2 mb-4">
                      <Star className="w-5 h-5 text-main" />
                      <h3 className="text-xl font-bold">Как Протича</h3>
                    </div>
                    <div className="space-y-3 overflow-y-auto max-h-[500px]">
                      {currentExperience.detailedInfo.process.map((step, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="bg-main text-alt rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">{index + 1}</div>
                          <span className="text-sm leading-relaxed">{step}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <MapPin className="w-5 h-5 text-main" />
                      <h3 className="text-lg font-bold">Локации</h3>
                    </div>
                    <div className="space-y-2">
                      {currentExperience.detailedInfo.locations.map((location, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-main rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-sm">{location}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <Shield className="w-5 h-5 text-main" />
                      <h3 className="text-lg font-bold">Изисквания</h3>
                    </div>
                    <div className="space-y-2">
                      {currentExperience.detailedInfo.requirements.map((req, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-main rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-sm">{req}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="text-center w-full">
                <Button size="lg" className={`bg-gradient-to-r ${gradients[experiences.findIndex(e => e.id === currentExperience.id) % gradients.length]} text-white px-12 py-4 text-lg font-bold hover:scale-105 transition-transform`}>
                  Купи Сега - {currentExperience.price} лв
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="xl:hidden container mx-auto px-4 py-4">
        <Tabs value={activeId || ''} onValueChange={navigateToExperience}>
          <TabsList className="grid w-full grid-cols-3 mb-3">
            {experiences.map((experience) => (
              <TabsTrigger key={experience.id} value={experience.id} className="text-xs">
                {experience.title}
              </TabsTrigger>
            ))}
          </TabsList>
          {experiences.map((experience) => (
            <TabsContent key={experience.id} value={experience.id}>
              {/* Mobile content remains the same */}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  )
}

export function ExperiencesPageClient(props: ExperiencesPageClientProps) {
  return (
    <Suspense fallback={<div className="text-center py-10">Loading Experiences...</div>}>
      <ExperiencesView {...props} />
    </Suspense>
  );
}
