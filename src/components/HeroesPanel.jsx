import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Input } from '@/components/ui/input.jsx'
import { 
  Heart, 
  Zap, 
  Sword, 
  Shield, 
  Users,
  Plus,
  Minus,
  Flame,
  Droplets,
  Mountain,
  Wind,
  Sparkles
} from 'lucide-react'

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

const statusEffectColors = {
  'buff': 'bg-green-600',
  'debuff': 'bg-red-600'
}

function HeroCard({ hero, onUpdateHero, isActive }) {
  const [tempVida, setTempVida] = useState(hero.vida)
  const [tempEnergia, setTempEnergia] = useState(hero.energia)

  const updateStat = (stat, value) => {
    const newValue = Math.max(0, Math.min(value, stat === 'vida' ? hero.maxVida : hero.maxEnergia))
    
    if (stat === 'vida') {
      setTempVida(newValue)
      onUpdateHero(hero.id, { vida: newValue })
    } else if (stat === 'energia') {
      setTempEnergia(newValue)
      onUpdateHero(hero.id, { energia: newValue })
    }
  }

  const addStatusEffect = (effect) => {
    const newEffects = [...hero.statusEffects, { ...effect, id: Date.now() }]
    onUpdateHero(hero.id, { statusEffects: newEffects })
  }

  const removeStatusEffect = (effectId) => {
    const newEffects = hero.statusEffects.filter(effect => effect.id !== effectId)
    onUpdateHero(hero.id, { statusEffects: newEffects })
  }

  const useSpecialAbility = () => {
    if (hero.energia >= hero.specialAbility.cost) {
      updateStat('energia', hero.energia - hero.specialAbility.cost)
      // Aqui você pode adicionar lógica específica da habilidade
    }
  }

  return (
    <Card className={`${isActive ? 'ring-2 ring-blue-400' : ''} bg-black/20 backdrop-blur-sm border-white/20`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-white flex items-center">
            <Users className="w-5 h-5 mr-2" />
            {hero.name}
          </CardTitle>
          <Badge className={`${elementColors[hero.element]} text-white`}>
            {elementIcons[hero.element]}
            <span className="ml-1">{hero.element}</span>
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Atributos Principais */}
        <div className="grid grid-cols-2 gap-4">
          {/* Vida */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-red-400 flex items-center text-sm">
                <Heart className="w-4 h-4 mr-1" />
                Vida
              </span>
              <span className="text-white text-sm">{tempVida}/{hero.maxVida}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Button 
                size="sm" 
                variant="outline"
                className="h-8 w-8 p-0 border-red-400 text-red-400 hover:bg-red-400 hover:text-white"
                onClick={() => updateStat('vida', tempVida - 1)}
              >
                <Minus className="w-3 h-3" />
              </Button>
              <Input 
                type="number" 
                value={tempVida}
                onChange={(e) => updateStat('vida', parseInt(e.target.value) || 0)}
                className="text-center bg-white/10 border-white/20 text-white h-8"
                min="0"
                max={hero.maxVida}
              />
              <Button 
                size="sm" 
                variant="outline"
                className="h-8 w-8 p-0 border-red-400 text-red-400 hover:bg-red-400 hover:text-white"
                onClick={() => updateStat('vida', tempVida + 1)}
              >
                <Plus className="w-3 h-3" />
              </Button>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className="bg-red-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(tempVida / hero.maxVida) * 100}%` }}
              />
            </div>
          </div>

          {/* Energia */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-blue-400 flex items-center text-sm">
                <Zap className="w-4 h-4 mr-1" />
                Energia
              </span>
              <span className="text-white text-sm">{tempEnergia}/{hero.maxEnergia}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Button 
                size="sm" 
                variant="outline"
                className="h-8 w-8 p-0 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white"
                onClick={() => updateStat('energia', tempEnergia - 1)}
              >
                <Minus className="w-3 h-3" />
              </Button>
              <Input 
                type="number" 
                value={tempEnergia}
                onChange={(e) => updateStat('energia', parseInt(e.target.value) || 0)}
                className="text-center bg-white/10 border-white/20 text-white h-8"
                min="0"
                max={hero.maxEnergia}
              />
              <Button 
                size="sm" 
                variant="outline"
                className="h-8 w-8 p-0 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white"
                onClick={() => updateStat('energia', tempEnergia + 1)}
              >
                <Plus className="w-3 h-3" />
              </Button>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(tempEnergia / hero.maxEnergia) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Atributos Secundários */}
        <div className="grid grid-cols-3 gap-3 text-sm">
          <div className="text-center p-2 bg-white/5 rounded">
            <div className="flex items-center justify-center text-orange-400 mb-1">
              <Sword className="w-4 h-4 mr-1" />
            </div>
            <div className="text-white font-semibold">{hero.dano}</div>
            <div className="text-gray-400 text-xs">Dano</div>
          </div>
          <div className="text-center p-2 bg-white/5 rounded">
            <div className="flex items-center justify-center text-gray-400 mb-1">
              <Shield className="w-4 h-4 mr-1" />
            </div>
            <div className="text-white font-semibold">{hero.defesa}</div>
            <div className="text-gray-400 text-xs">Defesa</div>
          </div>
          <div className="text-center p-2 bg-white/5 rounded">
            <div className="flex items-center justify-center text-green-400 mb-1">
              <Users className="w-4 h-4 mr-1" />
            </div>
            <div className="text-white font-semibold">{hero.movimento}</div>
            <div className="text-gray-400 text-xs">Movimento</div>
          </div>
        </div>

        {/* Habilidade Especial */}
        <div className="space-y-2">
          <h4 className="text-white text-sm font-semibold flex items-center">
            <Sparkles className="w-4 h-4 mr-1" />
            Habilidade Especial
          </h4>
          <div className="bg-white/5 p-3 rounded">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white font-medium">{hero.specialAbility.name}</span>
              <Badge variant="outline" className="border-blue-400 text-blue-400">
                {hero.specialAbility.cost} EP
              </Badge>
            </div>
            <p className="text-gray-300 text-xs mb-3">{hero.specialAbility.description}</p>
            <Button 
              size="sm" 
              onClick={useSpecialAbility}
              disabled={hero.energia < hero.specialAbility.cost}
              className="w-full bg-purple-600 hover:bg-purple-700"
            >
              Usar Habilidade
            </Button>
          </div>
        </div>

        {/* Efeitos de Status */}
        {hero.statusEffects && hero.statusEffects.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-white text-sm font-semibold">Efeitos Ativos</h4>
            <div className="flex flex-wrap gap-2">
              {hero.statusEffects.map((effect) => (
                <Badge 
                  key={effect.id}
                  className={`${statusEffectColors[effect.type]} text-white cursor-pointer`}
                  onClick={() => removeStatusEffect(effect.id)}
                >
                  {effect.name} {effect.duration && `(${effect.duration})`}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function HeroesPanel({ heroes, updateHero, updateHeroes, currentTurn }) {
  const restoreEnergyToAll = () => {
    const updatedHeroes = heroes.map(hero => ({
      ...hero,
      energia: Math.min(hero.energia + 1, hero.maxEnergia)
    }))
    updateHeroes(updatedHeroes)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white flex items-center">
          <Users className="w-6 h-6 mr-2" />
          Heróis da Aventura
        </h2>
        <div className="flex items-center space-x-2">
          <Button 
            onClick={restoreEnergyToAll}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Zap className="w-4 h-4 mr-2" />
            +1 Energia para Todos
          </Button>
          {currentTurn === 'heroes' && (
            <Badge className="bg-green-600 text-white">
              Turno dos Heróis
            </Badge>
          )}
        </div>
      </div>

      {/* Heroes Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {heroes.map((hero) => (
          <HeroCard 
            key={hero.id}
            hero={hero}
            onUpdateHero={updateHero}
            isActive={currentTurn === 'heroes'}
          />
        ))}
      </div>

      {heroes.length === 0 && (
        <Card className="bg-black/20 backdrop-blur-sm border-white/20">
          <CardContent className="text-center py-12">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-400">Nenhum herói configurado ainda.</p>
            <p className="text-gray-500 text-sm">Configure o jogo para adicionar heróis.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default HeroesPanel

