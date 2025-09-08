import { Routes, Route, Navigate, useNavigate, Link } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Login from './components/Login';
import AdminPanel from './components/AdminPanel';
import { useUserRole } from './hooks/useUserRole';

import { Button } from './components/ui/button.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs.jsx'
import { Badge } from './components/ui/badge.jsx'
import {
  Heart,
  Zap,
  Sword,
  Shield,
  Users,
  Dice6,
  Settings,
  Play,
  RotateCcw
} from 'lucide-react'
import './App.css'

// Hooks
import { useGameState } from './hooks/useGameState'

// Componentes
import GameSetup from './components/GameSetup'
import HeroesPanel from './components/HeroesPanel'
import EnemiesPanel from './components/EnemiesPanel'
import CombatPanel from './components/CombatPanel'
import GameState from './components/GameState'
import { auth } from './lib/firebase';

function App() {
  const { currentUser } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={currentUser ? <Navigate to="/" /> : <Login />} />
      <Route
        path="/admin"
        element={
          <PrivateRoute>
            <AdminPanel />
          </PrivateRoute>
        }
      />
      <Route
        path="/*"
        element={
          <PrivateRoute>
            <MainApp />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

function PrivateRoute({ children }) {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/login" />;
}

function MainApp() {
  const {
    gameState,
    updateGamePhase,
    nextTurn,
    updateHeroes,
    updateHero,
    updateEnemies,
    updateEnemy,
    addEnemy,
    addSummon,
    removeEnemy,
    updateGameSettings,
    resetGame,
    saveGameState,
    processStatusEffects,
    addCombatLog,
    togglePointOfInterest,
    completeIsland,
    resetProgress
  } = useGameState()
  const navigate = useNavigate();
  const { isAdmin } = useUserRole();


  const startGame = (setupData) => {
    updateHeroes(setupData.heroes)
    updateGameSettings(setupData.settings)
    updateGamePhase('playing')
  }

  const handleNextTurn = () => {
    // Processar efeitos de status antes de mudar o turno
    processStatusEffects()

    // Se for o turno dos heróis, restaurar 1 EP para todos
    if (gameState.currentTurn === 'heroes') {
      const updatedHeroes = gameState.heroes.map(hero => ({
        ...hero,
        energia: Math.min(hero.energia + 1, hero.maxEnergia)
      }))
      updateHeroes(updatedHeroes)
    }

    nextTurn()
    saveGameState()
  }

  const handleResetGame = () => {
    if (confirm('Tem certeza que deseja reiniciar o jogo? Todo o progresso será perdido.')) {
      resetGame()
    }
  }

  const handleLogout = async () => {
    await auth.signOut();
    navigate('/login');
  };


  if (gameState.gamePhase === 'setup') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">
              Ilhas Elementais
            </h1>
            <p className="text-blue-200 text-lg">
              Companheiro Digital para o Jogo de Tabuleiro
            </p>
          </div>

          <GameSetup onStartGame={startGame} />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-white">Ilhas Elementais</h1>
              <Badge variant="secondary" className="bg-blue-600 text-white">
                {gameState.gameSettings.currentIsland}
              </Badge>
              {isAdmin && (
                <Link to="/admin" className="text-white">
                  Admin Panel
                </Link>
              )}
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-white text-sm">
                <span className="font-semibold">Turno {gameState.turnNumber}</span>
                <span className="ml-2 px-2 py-1 rounded bg-blue-600">
                  {gameState.currentTurn === 'heroes' ? 'Heróis' : 'Inimigos'}
                </span>
              </div>

              <Button
                onClick={handleNextTurn}
                className="bg-green-600 hover:bg-green-700"
              >
                <Play className="w-4 h-4 mr-2" />
                Próximo Turno
              </Button>

              <Button
                onClick={handleResetGame}
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reiniciar
              </Button>
              <Button
                onClick={handleLogout}
                variant="outline"
                className="border-red-500 text-white hover:bg-red-600"
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <Tabs defaultValue="heroes" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-black/20 backdrop-blur-sm">
            <TabsTrigger value="heroes" className="text-white data-[state=active]:bg-blue-600">
              <Users className="w-4 h-4 mr-2" />
              Heróis
            </TabsTrigger>
            <TabsTrigger value="enemies" className="text-white data-[state=active]:bg-red-600">
              <Sword className="w-4 h-4 mr-2" />
              Inimigos
            </TabsTrigger>
            <TabsTrigger value="combat" className="text-white data-[state=active]:bg-orange-600">
              <Dice6 className="w-4 h-4 mr-2" />
              Combate
            </TabsTrigger>
            <TabsTrigger value="state" className="text-white data-[state=active]:bg-purple-600">
              <Settings className="w-4 h-4 mr-2" />
              Estado
            </TabsTrigger>
          </TabsList>

          <TabsContent value="heroes" className="space-y-4">
            <HeroesPanel
              heroes={gameState.heroes}
              updateHero={updateHero}
              updateHeroes={updateHeroes}
              currentTurn={gameState.currentTurn}
            />
          </TabsContent>

          <TabsContent value="enemies" className="space-y-4">
            <EnemiesPanel
              enemies={gameState.enemies}
              updateEnemy={updateEnemy}
              addEnemy={addEnemy}
              removeEnemy={removeEnemy}
              currentTurn={gameState.currentTurn}
            />
          </TabsContent>

          <TabsContent value="combat" className="space-y-4">
            <CombatPanel
              gameState={gameState}
              updateHero={updateHero}
              updateEnemy={updateEnemy}
              addCombatLog={addCombatLog}
              addSummon={addSummon}
            />
          </TabsContent>

          <TabsContent value="state" className="space-y-4">
            <GameState
              gameState={gameState}
              updateGameSettings={updateGameSettings}
              saveGameState={saveGameState}
              togglePointOfInterest={togglePointOfInterest}
              completeIsland={completeIsland}
              resetProgress={resetProgress}
            />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

export default App

