"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, MapPin, Car, Users, Zap, CheckCircle, Star, Shield, ChevronLeft, ChevronRight } from "lucide-react"

export default function ExperiencesPage() {
  const searchParams = useSearchParams()
  const [activeExperience, setActiveExperience] = useState(1)

  useEffect(() => {
    const experienceId = searchParams.get("experience")
    if (experienceId) {
      setActiveExperience(Number.parseInt(experienceId))
    }
  }, [searchParams])

  const experiences = [
    {
      id: 1,
      title: "Дрифт Такси",
      subtitle: "Пасажерско Изживяване",
      price: "349",
      duration: "30 мин",
      description: "Усетете трепета на пасажерското си място с професионален дрифт пилот!",
      gradient: "from-yellow-400 via-amber-500 to-orange-600",
      icon: <Users className="w-6 h-6" />,
      sessions: "2 x 10 минути сесии",
      detailedInfo: {
        overview:
          "Дрифт такси е единственият начин всеки фен на дрифта, бързите коли и адреналина, да усети тръпката от самата кухня, а именно на пасажерската седалка.",
        whatYouGet: [
          "Състезателен дрифт автомобил BMW e46 3.0 240+ к.с.",
          "Професионален дрифт пилот с богат опит",
          "Необходимата екипировка за безопасност",
          "2 комплекта гуми за максимално изживяване",
          "Гориво включено в цената",
          "Кратък инструктаж преди започване",
        ],
        process: [
          "Пристигане и запознаване с екипа",
          "Инструктаж за безопасност и обличане на екипировка",
          "Първа сесия от 10 минути дрифт возене",
          "Почивка и смяна на гуми (10 минути)",
          "Втора сесия от 10 минути дрифт возене",
          "Обратна връзка и снимки за спомен",
        ],
        locations: ['Летище „Крайници", Сапарева баня', "Картинг писта Сопот", "Автополигон Севлиево"],
        requirements: [
          "Минимална възраст: 16 години",
          "Максимално тегло: 120 кг",
          "Добро здравословно състояние",
          "Подписване на декларация за риск",
        ],
      },
    },
    {
      id: 2,
      title: "Наеми Дрифтачка",
      subtitle: "Карай Сам",
      price: "649",
      duration: "60 мин",
      description: "Хващай волана и усети дрифта от шофьорската седалка!",
      gradient: "from-cyan-400 via-blue-500 to-indigo-600",
      icon: <Car className="w-6 h-6" />,
      sessions: "2 сесии с почивка за смяна на гуми",
      detailedInfo: {
        overview:
          'Да си „наемете" дрифт автомобил е вариант за по-смелите, които предпочитат сами да подкарат такава кола и да усетят тръпката директно от шофьорската седалка!',
        whatYouGet: [
          "Състезателен дрифт автомобил BMW e46",
          "Професионален дрифт инструктор в колата",
          "Подробен инструктаж за основни техники на дрифт",
          "Инструктаж за безопасност и правилно управление",
          "Необходимата екипировка (боне и каска)",
          "2 комплекта гуми за пълното изживяване",
          "Гориво включено в цената",
        ],
        process: [
          "Пристигане и запознаване с инструктора",
          "Теоретичен инструктаж за дрифт техники",
          "Обличане на защитна екипировка",
          "Първа сесия каране до износване на гуми (до 20 мин)",
          "Почивка и смяна на гуми (10 минути)",
          "Втора сесия каране до износване на гуми (до 20 мин)",
          "Анализ на представянето и съвети",
        ],
        locations: ['Летище „Крайници", до отбивката за Сапарева баня, близо до гр. Дупница'],
        requirements: [
          "Минимална възраст: 18 години",
          "Валидна шофьорска книжка категория B",
          "Минимум 2 години шофьорски опит",
          "Добро здравословно състояние",
          "Подписване на договор за наемане",
        ],
      },
    },
    {
      id: 3,
      title: "Дрифт МИКС",
      subtitle: "Най-доброто от двата свята",
      price: "589",
      duration: "40 мин",
      description: "Усетете дрифта от двете страни - от пасажерското място и от шофьорската седалка!",
      gradient: "from-lime-400 via-green-500 to-emerald-400",
      icon: <Zap className="w-6 h-6" />,
      sessions: "10 мин возене + 20 мин каране",
      detailedInfo: {
        overview:
          "Ще се возите при професионален дрифт пилот в подготвен дрифт автомобил, а след това ще имате възможност и да се качите на шофьорската седалка и да усетите от първо лице изкуството, наречено дрифт!",
        whatYouGet: [
          "Състезателен дрифт автомобил BMW e46",
          "Професионален дрифт пилот и инструктор",
          "Комбинирано изживяване - пасажер и шофьор",
          "Инструктаж за основни техники на дрифт и безопасност",
          "Необходимата екипировка за безопасност",
          "2 комплекта гуми - по един за всяка част",
          "Гориво включено в цената",
        ],
        process: [
          "Пристигане и запознаване с екипа",
          "Инструктаж за безопасност",
          "Първа част: 10 минути возене като пасажер",
          "Кратка почивка и смяна на гуми",
          "Инструктаж за управление на автомобила",
          "Втора част: каране до износване на гуми (до 20 мин)",
          "Заключителни впечатления и снимки",
        ],
        locations: ['Летище „Крайници", до отбивката за Сапарева баня, близо до гр. Дупница'],
        requirements: [
          "Минимална възраст: 18 години за каране, 16 за возене",
          "Валидна шофьорска книжка за частта с каране",
          "Добро здравословно състояние",
          "Подписване на декларация за риск",
        ],
      },
    },
  ]

  const currentExperience = experiences.find((exp) => exp.id === activeExperience) || experiences[0]

  const nextExperience = () => {
    setActiveExperience((prev) => (prev === 3 ? 1 : prev + 1))
  }

  const prevExperience = () => {
    setActiveExperience((prev) => (prev === 1 ? 3 : prev - 1))
  }

  const getCardPosition = (cardId: number) => {
    const diff = cardId - activeExperience
    if (diff === 0) return "center"
    if (diff === 1 || diff === -2) return "right"
    if (diff === -1 || diff === 2) return "left"
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
                                <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">{experience.icon}</div>
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
              key={activeExperience}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Header */}
              <div className="text-center">
                <div
                  className={`inline-flex items-center gap-3 bg-gradient-to-r ${currentExperience.gradient} text-white px-6 py-3 rounded-full mb-4`}
                >
                  {currentExperience.icon}
                  <span className="font-bold text-lg text-outline-sm">{currentExperience.title}</span>
                </div>
                <p className="text-muted-foreground">{currentExperience.detailedInfo.overview}</p>
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
                      {currentExperience.detailedInfo.process.map((step, index) => (
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
                      {currentExperience.detailedInfo.locations.map((location, index) => (
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
                <Button
                  size="lg"
                  className={`bg-gradient-to-r ${currentExperience.gradient} text-white px-12 py-4 text-lg font-bold hover:scale-105 transition-transform`}
                >
                  Купи Сега - {currentExperience.price} лв
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
          onValueChange={(value) => setActiveExperience(Number.parseInt(value))}
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
                        <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">{experience.icon}</div>
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
