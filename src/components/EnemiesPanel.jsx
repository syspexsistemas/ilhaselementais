import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx'
import { 
  Heart, 
  Sword, 
  Shield, 
  Users,
  Plus,
  Minus,
  Flame,
  Droplets,
  Mountain,
  Wind,
  Skull,
  Crown,
  X,
  Eye
} from 'lucide-react'
import { enemies } from '../data/gameData'

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

const typeIcons = {
  'Inimigo Comum': <Users className="w-4 h-4" />,
  'Mini-Chefe': <Skull className="w-4 h-4" />,
  'Chefe': <Crown className="w-4 h-4" />
}

const typeColors = {
  'Inimigo Comum': 'bg-gray-600',
  'Mini-Chefe': 'bg-orange-600',
  'Chefe': 'bg-purple-600'
}

function EnemyCard({ enemy, onUpdateEnemy, onRemoveEnemy, isActive }) {
  const [tempVida, setTempVida] = useState(enemy.currentVida)

  const updateVida = (value) => {
    const newValue = Math.max(0, Math.min(value, enemy.vida))
    setTempVida(newValue)
    onUpdateEnemy(enemy.instanceId, { currentVida: newValue })
  }

  const isDead = tempVida <= 0

  return (
    <Card className={`${isActive ? 'ring-2 ring-red-400' : ''} ${isDead ? 'opacity-50' : ''} bg-black/20 backdrop-blur-sm border-white/20`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-white flex items-center">
            {typeIcons[enemy.type]}
            <span className="ml-2">{enemy.name}</span>
            {isDead && <Skull className="w-4 h-4 ml-2 text-red-500" />}
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Badge className={`${elementColors[enemy.element]} text-white`}>
              {elementIcons[enemy.element]}
              <span className="ml-1">{enemy.element}</span>
            </Badge>
            <Button 
              size="sm" 
              variant="outline"
              className="h-8 w-8 p-0 border-red-400 text-red-400 hover:bg-red-400 hover:text-white"
              onClick={() => onRemoveEnemy(enemy.instanceId)}
            >
              <X className="w-3 h-3" />
            </Button>
          </div>
        </div>
        <Badge className={`${typeColors[enemy.type]} text-white w-fit`}>
          {enemy.type}
        </Badge>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Vida */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-red-400 flex items-center text-sm">
              <Heart className="w-4 h-4 mr-1" />
              Vida
            </span>
            <span className="text-white text-sm">{tempVida}/{enemy.vida}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Button 
              size="sm" 
              variant="outline"
              className="h-8 w-8 p-0 border-red-400 text-red-400 hover:bg-red-400 hover:text-white"
              onClick={() => updateVida(tempVida - 1)}
              disabled={isDead}
            >
              <Minus className="w-3 h-3" />
            </Button>
            <Input 
              type="number" 
              value={tempVida}
              onChange={(e) => updateVida(parseInt(e.target.value) || 0)}
              className="text-center bg-white/10 border-white/20 text-white h-8"
              min="0"
              max={enemy.vida}
              disabled={isDead}
            />
            <Button 
              size="sm" 
              variant="outline"
              className="h-8 w-8 p-0 border-red-400 text-red-400 hover:bg-red-400 hover:text-white"
              onClick={() => updateVida(tempVida + 1)}
              disabled={isDead}
            >
              <Plus className="w-3 h-3" />
            </Button>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-red-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(tempVida / enemy.vida) * 100}%` }}
            />
          </div>
        </div>

        {/* Atributos */}
        <div className="grid grid-cols-3 gap-3 text-sm">
          <div className="text-center p-2 bg-white/5 rounded">
            <div className="flex items-center justify-center text-orange-400 mb-1">
              <Sword className="w-4 h-4 mr-1" />
            </div>
            <div className="text-white font-semibold">{enemy.dano}</div>
            <div className="text-gray-400 text-xs">Dano</div>
          </div>
          <div className="text-center p-2 bg-white/5 rounded">
            <div className="flex items-center justify-center text-gray-400 mb-1">
              <Shield className="w-4 h-4 mr-1" />
            </div>
            <div className="text-white font-semibold">{enemy.defesa}</div>
            <div className="text-gray-400 text-xs">Defesa</div>
          </div>
          <div className="text-center p-2 bg-white/5 rounded">
            <div className="flex items-center justify-center text-green-400 mb-1">
              <Users className="w-4 h-4 mr-1" />
            </div>
            <div className="text-white font-semibold">{enemy.movimento}</div>
            <div className="text-gray-400 text-xs">Movimento</div>
          </div>
        </div>

        {/* Habilidades */}
        <div className="space-y-2">
          <h4 className="text-white text-sm font-semibold flex items-center">
            <Eye className="w-4 h-4 mr-1" />
            Habilidades
          </h4>
          <div className="bg-white/5 p-3 rounded">
            {Array.isArray(enemy.habilidades) ? (
              enemy.habilidades.map((habilidade, index) => (
                <p key={index} className="text-gray-300 text-xs mb-2 last:mb-0">
                  • {habilidade}
                </p>
              ))
            ) : (
              <p className="text-gray-300 text-xs">• {enemy.habilidade}</p>
            )}
          </div>
        </div>

        {/* Descrição */}
        <div className="bg-white/5 p-3 rounded">
          <p className="text-gray-300 text-xs italic">{enemy.description}</p>
        </div>
      </CardContent>
    </Card>
  )
}

function EnemySpawner({ onAddEnemy }) {
  const [selectedCategory, setSelectedCategory] = useState('common')
  const [selectedEnemy, setSelectedEnemy] = useState('')

  const allEnemies = {
    common: enemies.common,
    miniBoss: enemies.miniBoss,
    boss: enemies.boss
  }

  const categoryLabels = {
    common: 'Inimigos Comuns',
    miniBoss: 'Mini-Chefes',
    boss: 'Chefes'
  }

  const addEnemy = () => {
    if (!selectedEnemy) return

    const enemyTemplate = allEnemies[selectedCategory].find(e => e.name === selectedEnemy)
    if (!enemyTemplate) return

    const newEnemy = {
      ...enemyTemplate,
      instanceId: `enemy-${Date.now()}`,
      currentVida: enemyTemplate.vida
    }

    onAddEnemy(newEnemy)
    setSelectedEnemy('')
  }

  return (
    <Card className="bg-black/20 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Plus className="w-5 h-5 mr-2" />
          Adicionar Inimigo
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-white text-sm font-medium mb-2 block">
              Categoria
            </label>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(categoryLabels).map(([key, label]) => (
                  <SelectItem key={key} value={key}>{label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-white text-sm font-medium mb-2 block">
              Inimigo
            </label>
            <Select value={selectedEnemy} onValueChange={setSelectedEnemy}>
              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                <SelectValue placeholder="Selecione um inimigo" />
              </SelectTrigger>
              <SelectContent>
                {allEnemies[selectedCategory].map((enemy) => (
                  <SelectItem key={enemy.name} value={enemy.name}>
                    {enemy.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-end">
            <Button 
              onClick={addEnemy}
              disabled={!selectedEnemy}
              className="w-full bg-red-600 hover:bg-red-700"
            >
              Adicionar
            </Button>
          </div>
        </div>

        {/* Preview do inimigo selecionado */}
        {selectedEnemy && (
          <div className="bg-white/5 p-4 rounded">
            {(() => {
              const enemy = allEnemies[selectedCategory].find(e => e.name === selectedEnemy)
              if (!enemy) return null
              
              return (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-white font-medium">{enemy.name}</h4>
                    <div className="flex items-center space-x-2">
                      <Badge className={`${elementColors[enemy.element]} text-white`}>
                        {elementIcons[enemy.element]}
                        <span className="ml-1">{enemy.element}</span>
                      </Badge>
                      <Badge className={`${typeColors[enemy.type]} text-white`}>
                        {enemy.type}
                      </Badge>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-2 text-sm">
                    <div className="text-center">
                      <div className="text-red-400">❤️ {enemy.vida}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-orange-400">⚔️ {enemy.dano}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-gray-400">🛡️ {enemy.defesa}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-green-400">🏃 {enemy.movimento}</div>
                    </div>
                  </div>
                  <p className="text-gray-300 text-xs italic">{enemy.description}</p>
                </div>
              )
            })()}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function EnemiesPanel({ enemies, updateEnemy, addEnemy, removeEnemy, currentTurn }) {
  const removeAllDeadEnemies = () => {
    const deadEnemies = enemies.filter(enemy => enemy.currentVida <= 0)
    deadEnemies.forEach(enemy => removeEnemy(enemy.instanceId))
  }

  const aliveEnemies = enemies.filter(enemy => enemy.currentVida > 0)
  const deadEnemies = enemies.filter(enemy => enemy.currentVida <= 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white flex items-center">
          <Skull className="w-6 h-6 mr-2" />
          Inimigos no Campo de Batalha
        </h2>
        <div className="flex items-center space-x-2">
          {deadEnemies.length > 0 && (
            <Button 
              onClick={removeAllDeadEnemies}
              variant="outline"
              className="border-gray-400 text-gray-400 hover:bg-gray-400 hover:text-white"
            >
              <X className="w-4 h-4 mr-2" />
              Remover Mortos ({deadEnemies.length})
            </Button>
          )}
          {currentTurn === 'enemies' && (
            <Badge className="bg-red-600 text-white">
              Turno dos Inimigos
            </Badge>
          )}
        </div>
      </div>

      {/* Enemy Spawner */}
      <EnemySpawner onAddEnemy={addEnemy} />

      {/* Enemies Grid */}
      {enemies.length > 0 ? (
        <div className="space-y-4">
          {aliveEnemies.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">
                Inimigos Vivos ({aliveEnemies.length})
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {aliveEnemies.map((enemy) => (
                  <EnemyCard 
                    key={enemy.instanceId}
                    enemy={enemy}
                    onUpdateEnemy={updateEnemy}
                    onRemoveEnemy={removeEnemy}
                    isActive={currentTurn === 'enemies'}
                  />
                ))}
              </div>
            </div>
          )}

          {deadEnemies.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-400 mb-4">
                Inimigos Derrotados ({deadEnemies.length})
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {deadEnemies.map((enemy) => (
                  <EnemyCard 
                    key={enemy.instanceId}
                    enemy={enemy}
                    onUpdateEnemy={updateEnemy}
                    onRemoveEnemy={removeEnemy}
                    isActive={false}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <Card className="bg-black/20 backdrop-blur-sm border-white/20">
          <CardContent className="text-center py-12">
            <Skull className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-400">Nenhum inimigo no campo de batalha.</p>
            <p className="text-gray-500 text-sm">Use o painel acima para adicionar inimigos.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default EnemiesPanel

