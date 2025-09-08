import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx'
import { Progress } from '@/components/ui/progress.jsx'
import { 
  Settings, 
  Trophy,
  Map,
  Star,
  Save,
  Download,
  Upload,
  RotateCcw,
  Clock,
  Target,
  Flame,
  Droplets,
  Mountain,
  Wind
} from 'lucide-react'

const islands = [
  { name: 'Ilha do Fogo', element: 'Fogo', icon: <Flame className="w-4 h-4" />, color: 'bg-red-600' },
  { name: 'Ilha da Água', element: 'Água', icon: <Droplets className="w-4 h-4" />, color: 'bg-blue-600' },
  { name: 'Ilha da Terra', element: 'Terra', icon: <Mountain className="w-4 h-4" />, color: 'bg-amber-600' },
  { name: 'Ilha do Ar', element: 'Ar', icon: <Wind className="w-4 h-4" />, color: 'bg-cyan-600' }
]

function ProgressTracker({ gameState, completeIsland, resetProgress }) {
  const { completedIslands, artifactFragments, experiencePoints } = gameState.progress

  return (
    <Card className="bg-black/20 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Trophy className="w-5 h-5 mr-2" />
          Progresso da Aventura
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Ilhas */}
        <div className="space-y-3">
          <h4 className="text-white font-semibold">Ilhas Conquistadas</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {islands.map((island) => {
              const isCompleted = completedIslands.includes(island.name)
              const isCurrent = gameState.gameSettings.currentIsland === island.name
              
              return (
                <div 
                  key={island.name}
                  className={`p-3 rounded border-2 transition-all ${
                    isCompleted 
                      ? 'border-green-400 bg-green-600/20' 
                      : isCurrent 
                        ? 'border-blue-400 bg-blue-600/20'
                        : 'border-white/20 bg-white/5'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Badge className={`${island.color} text-white`}>
                        {island.icon}
                      </Badge>
                      <span className="text-white text-sm font-medium">
                        {island.name}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {isCurrent && (
                        <Badge variant="outline" className="border-blue-400 text-blue-400">
                          Atual
                        </Badge>
                      )}
                      {isCompleted ? (
                        <Badge className="bg-green-600 text-white">
                          <Trophy className="w-3 h-3 mr-1" />
                          Completa
                        </Badge>
                      ) : (
                        <Button 
                          size="sm"
                          onClick={() => completeIsland(island.name)}
                          className="bg-green-600 hover:bg-green-700 h-6 px-2 text-xs"
                        >
                          Completar
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-3 bg-white/5 rounded">
            <div className="text-2xl font-bold text-yellow-400">{artifactFragments}/4</div>
            <div className="text-gray-400 text-sm">Fragmentos do Artefato</div>
            <Progress value={(artifactFragments / 4) * 100} className="mt-2" />
          </div>
          
          <div className="text-center p-3 bg-white/5 rounded">
            <div className="text-2xl font-bold text-blue-400">{experiencePoints}</div>
            <div className="text-gray-400 text-sm">Pontos de Experiência</div>
          </div>
          
          <div className="text-center p-3 bg-white/5 rounded">
            <div className="text-2xl font-bold text-green-400">{completedIslands.length}/4</div>
            <div className="text-gray-400 text-sm">Ilhas Conquistadas</div>
          </div>
        </div>

        <Button 
          onClick={resetProgress}
          variant="outline"
          className="w-full border-gray-400 text-gray-400 hover:bg-gray-400 hover:text-white"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Resetar Progresso
        </Button>
      </CardContent>
    </Card>
  )
}

function GameSettings({ gameState, updateGameSettings, saveGameState }) {
  const [newIsland, setNewIsland] = useState(gameState.gameSettings.currentIsland)

  const updateIsland = () => {
    updateGameSettings({ currentIsland: newIsland })
  }

  const loadGameState = () => {
    const saved = localStorage.getItem('ilhas-elementais-game-state')
    if (saved) {
      try {
        const gameStateData = JSON.parse(saved)
        // Recarregar a página para aplicar o estado carregado
        window.location.reload()
      } catch (error) {
        alert('Erro ao carregar jogo salvo!')
      }
    } else {
      alert('Nenhum jogo salvo encontrado!')
    }
  }

  const exportGameState = () => {
    const dataStr = JSON.stringify(gameState, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    
    const link = document.createElement('a')
    link.href = url
    link.download = `ilhas-elementais-save-${new Date().toISOString().split('T')[0]}.json`
    link.click()
    
    URL.revokeObjectURL(url)
  }

  return (
    <Card className="bg-black/20 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Settings className="w-5 h-5 mr-2" />
          Configurações do Jogo
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Informações da Sessão */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-3 bg-white/5 rounded">
            <div className="flex items-center justify-center text-blue-400 mb-2">
              <Clock className="w-5 h-5 mr-1" />
            </div>
            <div className="text-xl font-bold text-white">{gameState.turnNumber}</div>
            <div className="text-gray-400 text-sm">Turno Atual</div>
          </div>
          
          <div className="text-center p-3 bg-white/5 rounded">
            <div className="flex items-center justify-center text-green-400 mb-2">
              <Target className="w-5 h-5 mr-1" />
            </div>
            <div className="text-lg font-bold text-white">
              {gameState.currentTurn === 'heroes' ? 'Heróis' : 'Inimigos'}
            </div>
            <div className="text-gray-400 text-sm">Turno de</div>
          </div>
          
          <div className="text-center p-3 bg-white/5 rounded">
            <div className="flex items-center justify-center text-purple-400 mb-2">
              <Star className="w-5 h-5 mr-1" />
            </div>
            <div className="text-lg font-bold text-white">{gameState.gameSettings.difficulty}</div>
            <div className="text-gray-400 text-sm">Dificuldade</div>
          </div>
        </div>

        {/* Mudança de Ilha */}
        <div className="space-y-3">
          <h4 className="text-white font-semibold">Ilha Atual</h4>
          <div className="flex items-center space-x-2">
            <Select value={newIsland} onValueChange={setNewIsland}>
              <SelectTrigger className="bg-white/10 border-white/20 text-white flex-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {islands.map((island) => (
                  <SelectItem key={island.name} value={island.name}>
                    {island.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button 
              onClick={updateIsland}
              disabled={newIsland === gameState.gameSettings.currentIsland}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Map className="w-4 h-4 mr-2" />
              Mudar
            </Button>
          </div>
        </div>

        {/* Salvar/Carregar */}
        <div className="space-y-3">
          <h4 className="text-white font-semibold">Gerenciar Partida</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <Button 
              onClick={saveGameState}
              className="bg-green-600 hover:bg-green-700"
            >
              <Save className="w-4 h-4 mr-2" />
              Salvar
            </Button>
            
            <Button 
              onClick={loadGameState}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Upload className="w-4 h-4 mr-2" />
              Carregar
            </Button>
            
            <Button 
              onClick={exportGameState}
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10"
            >
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function PointsOfInterest({ pointsOfInterest, togglePointOfInterest }) {

  return (
    <Card className="bg-black/20 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Map className="w-5 h-5 mr-2" />
          Pontos de Interesse
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {pointsOfInterest.map((poi, index) => (
          <div 
            key={index}
            className={`p-3 rounded border-2 transition-all cursor-pointer ${
              poi.used 
                ? 'border-gray-400 bg-gray-600/20 opacity-50' 
                : 'border-blue-400 bg-blue-600/20 hover:bg-blue-600/30'
            }`}
            onClick={() => togglePointOfInterest(index)}
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-white font-medium">{poi.name}</h4>
                <p className="text-gray-300 text-sm">{poi.effect}</p>
              </div>
              <Badge className={poi.used ? 'bg-gray-600' : 'bg-green-600'}>
                {poi.used ? 'Usado' : 'Disponível'}
              </Badge>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

function GameState({ gameState, updateGameSettings, saveGameState, togglePointOfInterest, completeIsland, resetProgress }) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <h2 className="text-2xl font-bold text-white flex items-center">
        <Settings className="w-6 h-6 mr-2" />
        Estado do Jogo
      </h2>

      {/* Game State Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GameSettings 
          gameState={gameState}
          updateGameSettings={updateGameSettings}
          saveGameState={saveGameState}
        />
        <ProgressTracker 
          gameState={gameState}
          completeIsland={completeIsland}
          resetProgress={resetProgress}
        />
      </div>

      {/* Points of Interest */}
      <PointsOfInterest 
        pointsOfInterest={gameState.pointsOfInterest}
        togglePointOfInterest={togglePointOfInterest}
      />
    </div>
  )
}

export default GameState

