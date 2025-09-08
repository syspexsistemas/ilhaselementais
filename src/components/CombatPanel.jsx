import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Separator } from './ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  Sword, 
  Zap, 
  Shield, 
  Heart, 
  Dice6, 
  Target,
  Sparkles,
  Flame,
  Droplets,
  Mountain,
  Wind,
  Calculator
} from 'lucide-react';
import { cards } from '../data/gameData';
import { 
  rollDice, 
  executeHeroAttack, 
  useMagicCard, 
  calculateStatusModifiers,
  processStatusEffects,
  applyDamage,
  applyStatusEffect
} from '../utils/combatSystem';

const elementIcons = {
  fogo: <Flame className="w-4 h-4" />,
  agua: <Droplets className="w-4 h-4" />,
  terra: <Mountain className="w-4 h-4" />,
  ar: <Wind className="w-4 h-4" />
};

const rarityColors = {
  comum: 'bg-gray-500',
  rara: 'bg-blue-500',
  epica: 'bg-purple-500'
};

function DiceRoller() {
  const [diceType, setDiceType] = useState('D6')
  const [diceCount, setDiceCount] = useState(1)
  const [results, setResults] = useState([])
  const [isRolling, setIsRolling] = useState(false)

  const rollDiceAction = () => {
    setIsRolling(true)
    
    setTimeout(() => {
      const newResults = []
      const maxValue = diceType === 'D6' ? 6 : 12
      
      for (let i = 0; i < diceCount; i++) {
        newResults.push(Math.floor(Math.random() * maxValue) + 1)
      }
      
      setResults(newResults)
      setIsRolling(false)
    }, 1000)
  }

  const total = results.reduce((sum, result) => sum + result, 0)

  return (
    <Card className="bg-black/20 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Dice6 className="w-5 h-5 mr-2" />
          Simulador de Dados
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-white text-sm font-medium mb-2 block">
              Tipo de Dado
            </label>
            <Select value={diceType} onValueChange={setDiceType}>
              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="D6">D6 (1-6)</SelectItem>
                <SelectItem value="D12">D12 (1-12)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-white text-sm font-medium mb-2 block">
              Quantidade
            </label>
            <Input 
              type="number" 
              value={diceCount}
              onChange={(e) => setDiceCount(Math.max(1, Math.min(10, parseInt(e.target.value) || 1)))}
              className="bg-white/10 border-white/20 text-white"
              min="1"
              max="10"
            />
          </div>
        </div>

        <Button 
          onClick={rollDiceAction}
          disabled={isRolling}
          className="w-full bg-blue-600 hover:bg-blue-700"
        >
          {isRolling ? 'Rolando...' : `Rolar ${diceCount}${diceType}`}
        </Button>

        {results.length > 0 && (
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              {results.map((result, index) => (
                <div 
                  key={index}
                  className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center text-white font-bold text-lg border-2 border-blue-400"
                >
                  {result}
                </div>
              ))}
            </div>
            
            {results.length > 1 && (
              <div className="text-center">
                <span className="text-white text-lg font-semibold">
                  Total: {total}
                </span>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default function CombatPanel({ 
  gameState, 
  updateHero, 
  updateEnemy, 
  addCombatLog 
}) {
  const [selectedHero, setSelectedHero] = useState(null);
  const [selectedTarget, setSelectedTarget] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [diceResult, setDiceResult] = useState(null);

  const { heroes = [], enemies = [], combatLog = [] } = gameState;
  const aliveHeroes = heroes.filter(hero => hero.currentVida > 0);
  const aliveEnemies = enemies.filter(enemy => enemy.currentVida > 0);

  // Adicionar entrada ao log de combate
  const addLogEntry = (message, type = 'info') => {
    if (addCombatLog) {
      addCombatLog({
        id: Date.now(),
        message,
        type,
        timestamp: new Date().toLocaleTimeString()
      });
    }
  };

  // Executar ataque básico
  const executeBasicAttack = () => {
    if (!selectedHero || !selectedTarget) {
      addLogEntry('Selecione um herói e um alvo para atacar.', 'warning');
      return;
    }

    const hero = heroes.find(h => h.id === selectedHero);
    const target = enemies.find(e => e.instanceId === selectedTarget);

    if (!hero || !target) {
      addLogEntry('Herói ou alvo inválido.', 'error');
      return;
    }

    const modifiers = calculateStatusModifiers(hero);
    if (modifiers.stunned) {
      addLogEntry(`${hero.name} está atordoado e não pode atacar.`, 'warning');
      return;
    }

    const attackResult = executeHeroAttack(hero, target);
    const diceRoll = rollDice(6);
    setDiceResult(diceRoll);

    addLogEntry(attackResult.message, attackResult.success ? 'success' : 'info');

    if (attackResult.success) {
      let updatedTarget = { ...target };
      updatedTarget = applyDamage(updatedTarget, attackResult.damage);

      if (attackResult.statusEffectsToApply) {
        attackResult.statusEffectsToApply.forEach(effect => {
          updatedTarget = applyStatusEffect(updatedTarget, effect);
        });
      }

      updateEnemy(updatedTarget.instanceId, updatedTarget);

      if (updatedTarget.currentVida <= 0) {
        addLogEntry(`${updatedTarget.name} foi derrotado!`, 'success');
      }
    }
  };

  // Usar carta de magia
  const useMagic = () => {
    if (!selectedHero || !selectedCard) {
      addLogEntry('Selecione um herói e uma carta para usar.', 'warning');
      return;
    }

    const hero = heroes.find(h => h.id === selectedHero);
    const card = getAllCards().find(c => c.id === selectedCard);

    if (!hero || !card) {
      addLogEntry('Herói ou carta inválida.', 'error');
      return;
    }

    if (hero.energia < card.cost) {
      addLogEntry(`${hero.name} não tem energia suficiente para usar ${card.name}.`, 'warning');
      return;
    }

    let targets = [];
    if (card.target === 'ally') {
      targets = card.area === 'all_allies' ? aliveHeroes : [hero];
    } else if (card.target === 'enemy') {
      if (card.area === 'all_enemies') {
        targets = aliveEnemies;
      } else if (selectedTarget) {
        targets = [enemies.find(e => e.instanceId === selectedTarget)];
      }
    }

    if (targets.length === 0) {
      addLogEntry('Nenhum alvo válido selecionado.', 'warning');
      return;
    }

    const magicResult = useMagicCard(hero, card, targets);
    addLogEntry(magicResult.message, magicResult.success ? 'success' : 'warning');

    if (magicResult.success) {
      const updatedHero = {
        ...hero,
        energia: hero.energia - card.cost
      };
      updateHero(hero.id, updatedHero);

      magicResult.results.forEach(result => {
        addLogEntry(result.message, 'info');
        
        if (result.type === 'damage') {
          const target = enemies.find(e => e.name === result.target);
          if (target) {
            const updatedTarget = {
              ...target,
              currentVida: Math.max(0, target.currentVida - result.value)
            };
            updateEnemy(target.instanceId, updatedTarget);
          }
        } else if (result.type === 'healing') {
          const target = heroes.find(h => h.name === result.target);
          if (target) {
            const updatedTarget = {
              ...target,
              currentVida: Math.min(target.vida, target.currentVida + result.value)
            };
            updateHero(target.id, updatedTarget);
          }
        }
      });
    }
  };

  // Usar habilidade especial do herói
  const useSpecialAbility = () => {
    if (!selectedHero) {
      addLogEntry('Selecione um herói para usar a habilidade especial.', 'warning');
      return;
    }

    const hero = heroes.find(h => h.id === selectedHero);
    if (!hero || !hero.habilidade) {
      addLogEntry('Herói inválido ou sem habilidade especial.', 'error');
      return;
    }

    if (hero.energia < hero.habilidade.cost) {
      addLogEntry(`${hero.name} não tem energia suficiente para usar ${hero.habilidade.name}.`, 'warning');
      return;
    }

    const updatedHero = {
      ...hero,
      energia: hero.energia - hero.habilidade.cost
    };
    updateHero(hero.id, updatedHero);

    addLogEntry(`${hero.name} usou ${hero.habilidade.name}!`, 'success');
    addLogEntry(hero.habilidade.description, 'info');
  };

  // Obter todas as cartas disponíveis
  const getAllCards = () => {
    return [
      ...cards.magia,
      ...cards.buff,
      ...cards.debuff,
      ...cards.invocacao
    ];
  };

  // Processar efeitos de status no início do turno
  const processStatusEffectsForAll = () => {
    heroes.forEach(hero => {
      if (hero.statusEffects && hero.statusEffects.length > 0) {
        const processedHero = processStatusEffects(hero);
        updateHero(hero.id, processedHero);
        addLogEntry(`Efeitos de status processados para ${hero.name}.`, 'info');
      }
    });

    enemies.forEach(enemy => {
      if (enemy.statusEffects && enemy.statusEffects.length > 0) {
        const processedEnemy = processStatusEffects(enemy);
        updateEnemy(enemy.id, processedEnemy);
        addLogEntry(`Efeitos de status processados para ${enemy.name}.`, 'info');
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <h2 className="text-2xl font-bold text-white flex items-center">
        <Sword className="w-6 h-6 mr-2" />
        Sistema de Combate
      </h2>

      {/* Dice Roller */}
      <DiceRoller />

      {/* Controles de Combate */}
      <Card className="bg-black/20 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Sword className="w-5 h-5" />
            Controles de Combate
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Seleção de Herói */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-white text-sm font-medium mb-2 block">Herói Ativo</label>
              <Select value={selectedHero || ''} onValueChange={setSelectedHero}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Selecione um herói" />
                </SelectTrigger>
                <SelectContent>
                  {aliveHeroes.map(hero => (
                    <SelectItem key={hero.id} value={hero.id}>
                      {hero.name} - Vida: {hero.currentVida}/{hero.vida} | Energia: {hero.energia}/{hero.maxEnergia}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-white text-sm font-medium mb-2 block">Alvo</label>
              <Select value={selectedTarget || ''} onValueChange={setSelectedTarget}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Selecione um alvo" />
                </SelectTrigger>
                <SelectContent>
                  {aliveEnemies.map(enemy => (
                    <SelectItem key={enemy.instanceId} value={enemy.instanceId}>
                      {enemy.name} - Vida: {enemy.currentVida}/{enemy.vida}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Ações de Combate */}
          <div className="flex flex-wrap gap-2">
            <Button onClick={executeBasicAttack} className="flex items-center gap-2 bg-red-600 hover:bg-red-700">
              <Sword className="w-4 h-4" />
              Ataque Básico
            </Button>
            
            <Button onClick={useSpecialAbility} variant="outline" className="flex items-center gap-2 border-white/20 text-white hover:bg-white/10">
              <Sparkles className="w-4 h-4" />
              Habilidade Especial
            </Button>
            
            <Button onClick={processStatusEffectsForAll} variant="outline" className="flex items-center gap-2 border-white/20 text-white hover:bg-white/10">
              <Zap className="w-4 h-4" />
              Processar Efeitos
            </Button>
          </div>

          {/* Resultado do Dado */}
          {diceResult && (
            <div className="flex items-center gap-2 p-2 bg-blue-50/10 rounded-lg">
              <Dice6 className="w-5 h-5 text-blue-400" />
              <span className="text-sm font-medium text-white">Último resultado do dado: {diceResult}</span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Sistema de Cartas */}
      <Card className="bg-black/20 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            Sistema de Cartas
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-white text-sm font-medium mb-2 block">Carta</label>
              <Select value={selectedCard || ''} onValueChange={setSelectedCard}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Selecione uma carta" />
                </SelectTrigger>
                <SelectContent>
                  {getAllCards().map(card => (
                    <SelectItem key={card.id} value={card.id}>
                      {card.name} ({card.cost} EP) - {card.type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button onClick={useMagic} className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700">
                <Zap className="w-4 h-4" />
                Usar Carta
              </Button>
            </div>
          </div>

          {/* Detalhes da Carta Selecionada */}
          {selectedCard && (
            <div className="p-3 bg-white/5 rounded-lg">
              {(() => {
                const card = getAllCards().find(c => c.id === selectedCard);
                if (!card) return null;
                
                return (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge className={`${rarityColors[card.rarity]} text-white`}>
                        {card.rarity}
                      </Badge>
                      {card.element && (
                        <Badge variant="outline" className="flex items-center gap-1 border-white/20 text-white">
                          {elementIcons[card.element]}
                          {card.element}
                        </Badge>
                      )}
                      <Badge variant="outline" className="border-white/20 text-white">
                        {card.cost} EP
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-300">{card.description}</p>
                    {card.damage && (
                      <p className="text-sm text-white"><strong>Dano:</strong> {card.damage}</p>
                    )}
                    {card.healing && (
                      <p className="text-sm text-white"><strong>Cura:</strong> {card.healing}</p>
                    )}
                    {card.area && (
                      <p className="text-sm text-white"><strong>Área:</strong> {card.area}</p>
                    )}
                  </div>
                );
              })()}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Log de Combate */}
      <Card className="bg-black/20 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Target className="w-5 h-5" />
            Log de Combate
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {combatLog.length === 0 ? (
              <p className="text-gray-400 text-sm">Nenhuma ação de combate registrada.</p>
            ) : (
              combatLog.map(entry => (
                <div key={entry.id} className="flex items-start gap-2 p-2 rounded text-sm">
                  <span className="text-xs text-gray-500 min-w-[60px]">
                    {entry.timestamp}
                  </span>
                  <span className={`
                    ${entry.type === 'success' ? 'text-green-400' : ''}
                    ${entry.type === 'warning' ? 'text-yellow-400' : ''}
                    ${entry.type === 'error' ? 'text-red-400' : ''}
                    ${entry.type === 'info' ? 'text-blue-400' : ''}
                    text-white
                  `}>
                    {entry.message}
                  </span>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

