import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx'
import { 
  Heart, 
  Zap, 
  Sword, 
  Shield, 
  Users,
  Flame,
  Droplets,
  Mountain,
  Wind
} from 'lucide-react'
import { heroClasses } from '../data/gameData'

const elementIcons = {
  'Fogo': <Flame className="w-4 h-4" />,
  'Água': <Droplets className="w-4 h-4" />,
  'Terra': <Mountain className="w-4 h-4" />,
  'Ar': <Wind className="w-4 h-4" />
}

const elementColors = {
  'Fogo': 'bg-red-600',
  'Água': 'bg-blue-600', 
  'Terra': 'bg-amber-600',
  'Ar': 'bg-cyan-600'
}

function GameSetup({ onStartGame }) {
  const [playerCount, setPlayerCount] = useState(2)
  const [selectedClasses, setSelectedClasses] = useState({})
  const [difficulty, setDifficulty] = useState('normal')
  const [currentIsland, setCurrentIsland] = useState('Ilha do Fogo')

  const handleClassSelect = (playerId, classKey) => {
    setSelectedClasses(prev => ({
      ...prev,
      [playerId]: classKey
    }))
  }

  const canStartGame = () => {
    return Object.keys(selectedClasses).length === playerCount &&
           Object.values(selectedClasses).every(cls => cls)
  }

  const startGame = () => {
    if (!canStartGame()) return

    const heroes = Object.entries(selectedClasses).map(([playerId, classKey], index) => {
      const heroClass = heroClasses.find(h => h.id === classKey);
      return {
        id: `hero-${playerId}`,
        playerId: parseInt(playerId),
        name: `${heroClass.name} ${index + 1}`,
        class: classKey,
        vida: heroClass.vida,
        currentVida: heroClass.vida,
        energia: heroClass.energia,
        dano: heroClass.dano,
        defesa: heroClass.defesa,
        movimento: heroClass.movimento,
        maxVida: heroClass.maxVida,
        maxEnergia: heroClass.maxEnergia,
        statusEffects: [],
        specialAbility: heroClass.habilidade,
        element: heroClass.element
      }
    })

    const settings = {
      playerCount,
      difficulty,
      currentIsland,
      heroes
    }

    onStartGame({ heroes, settings })
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Configurações Gerais */}
      <Card className="bg-black/20 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Users className="w-5 h-5 mr-2" />
            Configurações da Partida
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-white text-sm font-medium mb-2 block">
                Número de Jogadores
              </label>
              <Select value={playerCount.toString()} onValueChange={(value) => setPlayerCount(parseInt(value))}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Jogador</SelectItem>
                  <SelectItem value="2">2 Jogadores</SelectItem>
                  <SelectItem value="3">3 Jogadores</SelectItem>
                  <SelectItem value="4">4 Jogadores</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-white text-sm font-medium mb-2 block">
                Dificuldade
              </label>
              <Select value={difficulty} onValueChange={setDifficulty}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="easy">Fácil</SelectItem>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="hard">Difícil</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-white text-sm font-medium mb-2 block">
                Ilha Inicial
              </label>
              <Select value={currentIsland} onValueChange={setCurrentIsland}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Ilha do Fogo">Ilha do Fogo</SelectItem>
                  <SelectItem value="Ilha da Água">Ilha da Água</SelectItem>
                  <SelectItem value="Ilha da Terra">Ilha da Terra</SelectItem>
                  <SelectItem value="Ilha do Ar">Ilha do Ar</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Seleção de Classes */}
      <Card className="bg-black/20 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-white">
            Escolha as Classes dos Heróis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Players */}
            {Array.from({ length: playerCount }, (_, i) => (
              <div key={i} className="space-y-4">
                <h3 className="text-white font-semibold">Jogador {i + 1}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {heroClasses.map((heroClass) => (
                    <Card 
                      key={heroClass.id}
                      className={`cursor-pointer transition-all duration-200 border-2 ${
                        selectedClasses[i + 1] === heroClass.id 
                          ? 'border-blue-400 bg-blue-600/20' 
                          : 'border-white/20 bg-black/10 hover:bg-white/10'
                      }`}
                      onClick={() => handleClassSelect(i + 1, heroClass.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-white font-medium">{heroClass.name}</h4>
                          <Badge className={`${elementColors[heroClass.element]} text-white`}>
                            {elementIcons[heroClass.element]}
                            <span className="ml-1">{heroClass.element}</span>
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="flex items-center text-red-400">
                            <Heart className="w-3 h-3 mr-1" />
                            {heroClass.vida}
                          </div>
                          <div className="flex items-center text-blue-400">
                            <Zap className="w-3 h-3 mr-1" />
                            {heroClass.energia}
                          </div>
                          <div className="flex items-center text-orange-400">
                            <Sword className="w-3 h-3 mr-1" />
                            {heroClass.dano}
                          </div>
                          <div className="flex items-center text-gray-400">
                            <Shield className="w-3 h-3 mr-1" />
                            {heroClass.defesa}
                          </div>
                        </div>

                        <div className="mt-3 text-xs text-gray-300">
                          <strong>{heroClass.habilidade.name}</strong>
                          <p className="mt-1">{heroClass.habilidade.description}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Botão Iniciar */}
      <div className="text-center">
        <Button 
          onClick={startGame}
          disabled={!canStartGame()}
          size="lg"
          className="bg-green-600 hover:bg-green-700 text-white px-8 py-3"
        >
          Iniciar Aventura
        </Button>
        {!canStartGame() && (
          <p className="text-yellow-400 text-sm mt-2">
            Selecione uma classe para cada jogador antes de iniciar
          </p>
        )}
      </div>
    </div>
  )
}

export default GameSetup
