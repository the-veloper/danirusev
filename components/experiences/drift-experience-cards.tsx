import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, MapPin, Car, Users, Zap, Info, ArrowRight } from "lucide-react"
import { Button } from "../ui/button"
import Link from "next/link"

export default function DriftExperienceCards() {
    const experiences = [
        {
          id: 1,
          title: "Дрифт Такси",
          subtitle: "Пасажерско Изживяване",
          price: "349",
          duration: "30 min",
          description: "Усетете трепета на пасажерското си място с професионален дрифт пилот!",
          features: ["Професионален дрифт пилот", "Безопасно оборудване", "2 гуми", "BMW e46 3.0 240+ hp"],
          locations: ["Трявна"],
          gradient: "from-yellow-400 via-amber-500 to-orange-600", // Taxi yellow theme
          color: "bg-taxi",
          icon: <Users className="w-6 h-6" />,
          sessions: "2 x 10 min sessions",
        },
        {
          id: 2,
          title: "Наеми Дрифтачка",
          subtitle: "Карай Сам",
          price: "649",
          duration: "60 min",
          description: "Хващай волана и усети дрифта от шофьорската седалка!",
          features: ["Каране с инструктор", "Трениране на дрифт техники", "Инструктаж за безопасност", "BMW e46"],
          locations: ["Трявна"],
          gradient: "from-cyan-400 via-blue-500 to-indigo-600", // Cyan blue theme
          color: "bg-rent",
          icon: <Car className="w-6 h-6" />,
          sessions: "2 sessions with tire change",
        },
        {
          id: 3,
          title: "Дрифт МИКС",
          subtitle: "Най-доброто от двата свята",
          price: "589",
          duration: "40 min",
          description: "Усетете дрифта от двете страни - от пасажерското място и от шофьорската седалка!",
          features: ["Пасажерско + шофьорско изживяване", "Професионален инструктор", "Безопасно оборудване", "BMW e46"],
          locations: ["Трявна"],
          gradient: "from-lime-400 via-mix to-emerald-400", // Toxic green theme
          color: "bg-mix",
          icon: <Zap className="w-6 h-6" />,
          sessions: "10 min возене + 20 min каране",
        },
      ]

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
        {experiences.map((experience) => (
          <Card
            key={experience.id}
            className="relative overflow-hidden border border-black/20 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 bg-background backdrop-blur-sm"
          >
            {/* Gradient Header */}
            <div className={`h-32 -mt-8  bg-gradient-to-br ${experience.gradient} relative`}>
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="relative z-10 p-6 text-white">
                <div className="flex items-center justify-between mb-2">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">{experience.icon}</div>
                  <Badge variant="secondary" className="bg-white/90 text-gray-800 font-bold">
                    {experience.price} лв
                  </Badge>
                </div>
                <h3 className="text-xl font-bold text-outline-md">{experience.title}</h3>
                <p className="text-sm opacity-90 text-outline-md">{experience.subtitle}</p>
              </div>
            </div>

            <CardContent className="p-6 space-y-4">
              <p className="text-sm text-muted-foreground leading-relaxed">{experience.description}</p>

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
                    {experience.locations.map((location, index) => (
                      <p key={index} className="text-sm">
                        {experience.sessions}
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-2">
                <p className="text-xs font-medium text-gray-600 uppercase tracking-wide">Включва</p>
                <div className="grid grid-cols-1 gap-1">
                  {experience.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 bg-main rounded-full"></div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Location */}
              <div className="border-t pt-4">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-main mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-medium text-gray-600 mb-1">ЛОКАЦИЯ</p>
                    {experience.locations.map((location, index) => (
                      <p key={index} className="text-sm">
                        {location}
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              <Button asChild className={`w-[60%] mx-auto flex bg-gradient-to-br ${experience.gradient} drop-shadow-xl/50`}>
                <Link href={`/experiences?experience=${experience.id}`} className="flex items-center gap-2 text-alt">
                  <span className="font-bold  text-white text-outline-sm">Виж повече</span>
                </Link>
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
