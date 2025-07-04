"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, MapPin, Car, Users, Zap, CheckCircle, Star, Shield, ChevronLeft, ChevronRight } from "lucide-react"
import * as LucideIcons from 'lucide-react';

interface Experience {
  id: string;
  title: string;
  subtitle: string;
  price: string;
  duration: string;
  description: string;
  gradient: string;
  color: string;
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

export function ExperiencesPageClient({ experiences }: ExperiencesPageClientProps) {
  const searchParams = useSearchParams()
  const [activeExperience, setActiveExperience] = useState(experiences[0]?.id || '')

  useEffect(() => {
    const experienceId = searchParams.get("experience")
    if (experienceId) {
      setActiveExperience(experienceId)
    }
  }, [searchParams, experiences])

  const getLucideIcon = (iconName: string) => {
    const IconComponent = (LucideIcons as any)[iconName];
    return IconComponent ? <IconComponent className="w-6 h-6" /> : null;
  };

  const currentExperience = experiences.find((exp) => exp.id === activeExperience) || experiences[0]

  const nextExperience = () => {
    const currentIndex = experiences.findIndex(exp => exp.id === activeExperience);
    const nextIndex = (currentIndex + 1) % experiences.length;
    setActiveExperience(experiences[nextIndex].id);
  }

  const prevExperience = () => {
    const currentIndex = experiences.findIndex(exp => exp.id === activeExperience);
    const prevIndex = (currentIndex - 1 + experiences.length) % experiences.length;
    setActiveExperience(experiences[prevIndex].id);
  }

  const getCardPosition = (cardId: string) => {
    const activeIndex = experiences.findIndex(exp => exp.id === activeExperience);
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

              {/* Card Carousel */}
              <div className="relative h-[580px] flex items-center justify-center">
                <AnimatePresence mode="wait">
                  {experiences.map((experience) => {
                    const position = getCardPosition(experience.id)
                    if (position === "hidden") return null

                    return (
                      <motion.div
                        key={experience.id}
                        className={`absolute w-80 cursor-pointer ${position === "center" ? "z-30" : "z-10"}`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{
                          opacity: position === "center" ? 1 : 0.4,
                          scale: position === "center" ? 1 : 0.85,
                          x: position === "center" ? 0 : position === "left" ? -120 : 120,
                          filter: position === "center" ? "blur(0px)" : "blur(2px)",
                        }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        onClick={() => setActiveExperience(experience.id)}
                      >
                        <Card className="overflow-hidden border border-gray-200 shadow-xl h-[550px] flex flex-col">
                          <div className={`h-32 -mt-8 bg-gradient-to-br ${experience.gradient} relative flex-shrink-0`}>
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

                              {/* Price and Duration */}
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

                              {/* What You Get - Moved from bento grid */}
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

                              {/* Session Info */}
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

                {/* Navigation Arrows */}
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute left-4 z-40 bg-white/90 backdrop-blur-sm hover:bg-white"
                  onClick={prevExperience}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute right-4 z-40 bg-white/90 backdrop-blur-sm hover:bg-white"
                  onClick={nextExperience}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Right Side - Detailed Information */}
          <div className="col-span-7">
            <motion.div
              key={currentExperience?.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Header */}
              <div className="text-center">
                <div
                  className={`inline-flex items-center gap-3 bg-gradient-to-r ${currentExperience?.gradient} text-white px-6 py-3 rounded-full mb-4`}
                >
                  {getLucideIcon(currentExperience?.icon || '')}
                  <span className="font-bold text-lg text-outline-sm">{currentExperience?.title}</span>
                </div>
                <p className="text-muted-foreground">{currentExperience?.detailedInfo.overview}</p>
              </div>

              {/* Streamlined Bento Grid Layout */}
              <div className="grid grid-cols-2 gap-4 h-[500px]">
                {/* Process */}
                <Card className="row-span-2">
                  <CardContent className="p-5 h-full">
                    <div className="flex items-center gap-2 mb-4">
                      <Star className="w-5 h-5 text-main" />
                      <h3 className="text-xl font-bold">Как Протича</h3>
                    </div>
                    <div className="space-y-3 overflow-y-auto max-h-[500px]">
                      {currentExperience?.detailedInfo.process.map((step, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="bg-main text-alt rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">
                            {index + 1}
                          </div>
                          <span className="text-sm leading-relaxed">{step}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Location */}
                <Card>
                  <CardContent className="p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <MapPin className="w-5 h-5 text-main" />
                      <h3 className="text-lg font-bold">Локации</h3>
                    </div>
                    <div className="space-y-2">
                      {currentExperience?.detailedInfo.locations.map((location, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-main rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-sm">{location}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Requirements */}
                <Card>
                  <CardContent className="p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <Shield className="w-5 h-5 text-main" />
                      <h3 className="text-lg font-bold">Изисквания</h3>
                    </div>
                    <div className="space-y-2">
                      {currentExperience?.detailedInfo.requirements.map((req, index) => (
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
                <Button
                  size="lg"
                  className={`bg-gradient-to-r ${currentExperience?.gradient} text-white px-12 py-4 text-lg font-bold hover:scale-105 transition-transform`}
                >
                  Купи Сега - {currentExperience?.price} лв
                </Button>
              </div>

              {/* Buy Button */}

            </motion.div>
          </div>
          
        </div>

      </div>

      {/* Mobile Layout - Tabs (unchanged) */}
      <div className="xl:hidden container mx-auto px-4 py-4">
        <Tabs
          value={activeExperience.toString()}
          onValueChange={(value) => setActiveExperience(value)}
        >
          <TabsList className="grid w-full grid-cols-3 mb-3">
            {experiences.map((experience) => (
              <TabsTrigger key={experience.id} value={experience.id.toString()} className="text-xs">
                {experience.title}
              </TabsTrigger>
            ))}
          </TabsList>

          {experiences.map((experience) => (
            <TabsContent key={experience.id} value={experience.id.toString()}>
              <div className="space-y-6">
                {/* Mobile Card Header */}
                <Card className={` bg-gradient-to-br ${experience.gradient} relative`}>
                  <div className={`h-24  relative`}>
                    
                    <div className="relative z-10 p-6 text-white -mt-7">
                      <div className="flex items-center justify-between mb-2">
                        <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">{getLucideIcon(experience.icon)}</div>
                        <Badge variant="secondary" className="bg-white/90 text-gray-800 font-bold">
                          {experience.price} лв
                        </Badge>
                      </div>
                      <h3 className="text-xl font-bold text-outline-sm">{experience.title}</h3>
                      <p className="text-sm opacity-90 text-outline-sm">{experience.subtitle}</p>
                    </div>
                  </div>
                </Card>

                {/* Mobile Content */}
                <div className="space-y-4">
                  <p className="text-muted-foreground">{experience.detailedInfo.overview}</p>

                  <Card>
                    <CardContent className="px-4">
                      <h4 className="font-bold mb-2">Какво Получавате:</h4>
                      <div className="space-y-1">
                        {experience.detailedInfo.whatYouGet.map((item, index) => (
                          <div key={index} className="flex items-start gap-2 text-sm">
                            <div className="w-1.5 h-1.5 bg-main rounded-full mt-2 flex-shrink-0"></div>
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <div className="grid grid-cols-2 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-bold mb-2">Времетраене:</h4>
                        <p className="text-lg font-bold text-main">{experience.duration}</p>
                        <p className="text-xs text-muted-foreground">{experience.sessions}</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-bold mb-2">Цена:</h4>
                        <p className="text-lg font-bold">{experience.price} лв</p>
                        <p className="text-xs text-muted-foreground">с включен ДДС</p>
                      </CardContent>
                    </Card>
                  </div>

                  <Button size="lg" className={`w-full bg-gradient-to-r ${experience.gradient} text-white font-bold`}>
                    Купи Сега - {experience.price} лв
                  </Button>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  )
}