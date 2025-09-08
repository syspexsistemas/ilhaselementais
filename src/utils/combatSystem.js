import { statusEffects } from '../data/gameData';

// Sistema de Combate para Ilhas Elementais

// Simulador de dados
export function rollDice(sides = 6) {
  return Math.floor(Math.random() * sides) + 1;
}

// Verificar se um ataque acerta
export function checkHit(diceResult, threshold = 3) {
  return diceResult > threshold;
}

// Calcular dano de ataque
export function calculateDamage(attackerDamage, diceResult, targetDefense, damageType = 'fisico') {
  const baseDamage = attackerDamage + diceResult;
  const finalDamage = Math.max(0, baseDamage - targetDefense);
  
  return {
    baseDamage,
    finalDamage,
    damageType,
    blocked: targetDefense
  };
}

// Aplicar dano a um alvo
export function applyDamage(target, damage) {
  const newHealth = Math.max(0, target.currentVida - damage);
  return {
    ...target,
    currentVida: newHealth,
    isDead: newHealth <= 0
  };
}

// Aplicar cura a um alvo
export function applyHealing(target, healing) {
  const newHealth = Math.min(target.vida, target.currentVida + healing);
  return {
    ...target,
    currentVida: newHealth
  };
}

// Sistema de Efeitos de Status
export function applyStatusEffect(target, effect) {
  const newStatusEffects = [...(target.statusEffects || [])];
  
  // Verificar se já existe o mesmo efeito
  const existingIndex = newStatusEffects.findIndex(e => e.id === effect.id);
  
  if (existingIndex >= 0) {
    // Atualizar duração se for maior
    if (effect.duration > newStatusEffects[existingIndex].duration) {
      newStatusEffects[existingIndex] = effect;
    }
  } else {
    // Adicionar novo efeito
    newStatusEffects.push({
      ...effect,
      appliedAt: Date.now()
    });
  }
  
  return {
    ...target,
    statusEffects: newStatusEffects
  };
}

// Remover efeitos de status expirados
export function processStatusEffects(target) {
  if (!target.statusEffects) return target;
  
  let updatedTarget = { ...target };
  let damageFromEffects = 0;
  let healingFromEffects = 0;
  
  // Processar efeitos
  const activeEffects = target.statusEffects.map(effect => {
    // Aplicar efeitos por turno
    if (effect.effects.damage_per_turn) {
      damageFromEffects += effect.effects.damage_per_turn;
    }
    if (effect.effects.healing_per_turn) {
      healingFromEffects += effect.effects.healing_per_turn;
    }
    
    // Reduzir duração
    return {
      ...effect,
      duration: effect.duration - 1
    };
  }).filter(effect => effect.duration > 0);
  
  // Aplicar dano/cura dos efeitos
  if (damageFromEffects > 0) {
    updatedTarget = applyDamage(updatedTarget, damageFromEffects);
  }
  if (healingFromEffects > 0) {
    updatedTarget = applyHealing(updatedTarget, healingFromEffects);
  }
  
  return {
    ...updatedTarget,
    statusEffects: activeEffects
  };
}

// Calcular modificadores de status
export function calculateStatusModifiers(target) {
  const modifiers = {
    damage: 0,
    defense: 0,
    movement: 0,
    stunned: false,
    rooted: false
  };

  if (!target.statusEffects) return modifiers;
  
  target.statusEffects.forEach(effect => {
    if (effect.effects.damage) modifiers.damage += effect.effects.damage;
    if (effect.effects.defense) modifiers.defense += effect.effects.defense;
    if (effect.effects.movement) modifiers.movement += effect.effects.movement;
    if (effect.effects.stunned) modifiers.stunned = true;
    if (effect.effects.rooted) modifiers.rooted = true;
  });
  
  return modifiers;
}

// IA dos Inimigos
export function selectTarget(enemy, heroes) {
  if (!heroes || heroes.length === 0) return null;
  
  const aliveHeroes = heroes.filter(hero => hero.currentVida > 0);
  if (aliveHeroes.length === 0) return null;
  
  const ai = enemy.ai || { priority: 'closest' };

  // Simulação de IA baseada na vida e defesa, já que não há mapa
  const sortedHeroes = [...aliveHeroes].sort((a, b) => {
    if (a.currentVida < b.currentVida) return -1;
    if (a.currentVida > b.currentVida) return 1;
    if (a.defesa < b.defesa) return -1;
    if (a.defesa > b.defesa) return 1;
    return 0;
  });

  return sortedHeroes[0];
}

// Executar ataque de inimigo
export function executeEnemyAttack(enemy, target) {
  const modifiers = calculateStatusModifiers(enemy);
  
  // Verificar se está atordoado
  if (modifiers.stunned) {
    return {
      success: false,
      message: `${enemy.name} está atordoado e perde o turno.`,
      damage: 0
    };
  }
  
  const diceResult = rollDice(6);
  const hit = checkHit(diceResult);
  
  if (!hit) {
    return {
      success: false,
      message: `${enemy.name} atacou ${target.name} mas errou!`,
      damage: 0,
      diceResult
    };
  }
  
  const enemyDamage = enemy.dano + modifiers.damage;
  const damageResult = calculateDamage(enemyDamage, diceResult, target.defesa);
  const statusEffectsToApply = [];

  let message = `${enemy.name} atacou ${target.name} causando ${damageResult.finalDamage} de dano!`;

  if (enemy.name === 'Elemental do Fogo') {
    const queimaduraEffect = statusEffects.debuffs.find(e => e.id === 'queimadura');
    if (queimaduraEffect) {
      statusEffectsToApply.push(queimaduraEffect);
      message += ` ${target.name} está em chamas!`;
    }
  }
  
  return {
    success: true,
    message,
    damage: damageResult.finalDamage,
    diceResult,
    damageResult,
    statusEffectsToApply
  };
}

// Executar ataque de herói
export function executeHeroAttack(hero, target, weaponType = 'melee') {
  const modifiers = calculateStatusModifiers(hero);
  
  // Verificar se está atordoado
  if (modifiers.stunned) {
    return {
      success: false,
      message: `${hero.name} está atordoado e não pode atacar.`,
      damage: 0
    };
  }
  
  const diceType = weaponType === 'ranged' ? 12 : 6;
  const diceResult = rollDice(diceType);
  const hit = checkHit(diceResult);
  
  if (!hit) {
    return {
      success: false,
      message: `${hero.name} atacou ${target.name} mas errou!`,
      damage: 0,
      diceResult
    };
  }
  
  const heroDamage = hero.dano + modifiers.damage;
  const targetDefense = target.defesa + calculateStatusModifiers(target).defense;
  const damageResult = calculateDamage(heroDamage, diceResult, targetDefense);
  
  return {
    success: true,
    message: `${hero.name} atacou ${target.name} causando ${damageResult.finalDamage} de dano!`,
    damage: damageResult.finalDamage,
    diceResult,
    damageResult,
    statusEffectsToApply: []
  };
}

// Usar carta de magia
export function useMagicCard(caster, card, targets) {
  if (caster.energia < card.cost) {
    return {
      success: false,
      message: `${caster.name} não tem energia suficiente para usar ${card.name}.`
    };
  }
  
  const results = [];

  if (card.type === 'invocacao' && card.summon) {
    results.push({
      type: 'summon',
      summon: card.summon,
      message: `${caster.name} invocou ${card.summon.name}!`
    });
  } else {
    // Aplicar efeitos da carta
    targets.forEach(target => {
      if (card.damage) {
        const damageResult = {
          finalDamage: card.damage,
          damageType: card.damageType || 'magico'
        };
        
        results.push({
          target: target.name,
          type: 'damage',
          value: damageResult.finalDamage,
          message: `${card.name} causou ${damageResult.finalDamage} de dano mágico a ${target.name}.`
        });
      }
      
      if (card.healing) {
        results.push({
          target: target.name,
          type: 'healing',
          value: card.healing,
          message: `${card.name} restaurou ${card.healing} de vida para ${target.name}.`
        });
      }
      
      if (card.effects) {
        card.effects.forEach(effectId => {
          results.push({
            target: target.name,
            type: 'status',
            effect: effectId,
            message: `${card.name} aplicou ${effectId} em ${target.name}.`
          });
        });
      }
    });
  }
  
  return {
    success: true,
    message: `${caster.name} usou ${card.name}!`,
    results,
    energyCost: card.cost
  };
}

// Verificar condições de vitória/derrota
export function checkBattleStatus(heroes, enemies) {
  const aliveHeroes = heroes.filter(hero => hero.currentVida > 0);
  const aliveEnemies = enemies.filter(enemy => enemy.currentVida > 0);
  
  if (aliveHeroes.length === 0) {
    return { status: 'defeat', message: 'Todos os heróis foram derrotados!' };
  }
  
  if (aliveEnemies.length === 0) {
    return { status: 'victory', message: 'Todos os inimigos foram derrotados!' };
  }
  
  return { status: 'ongoing', message: 'A batalha continua...' };
}

// Simular turno completo de inimigos
export function processEnemyTurn(enemies, heroes) {
  const results = [];
  
  enemies.forEach(enemy => {
    if (enemy.currentVida <= 0) return;
    
    // Processar efeitos de status
    const processedEnemy = processStatusEffects(enemy);
    
    // Selecionar alvo
    const target = selectTarget(processedEnemy, heroes);
    if (!target) return;
    
    // Executar ataque
    const attackResult = executeEnemyAttack(processedEnemy, target);
    results.push({
      enemy: enemy.name,
      target: target.name,
      ...attackResult
    });
  });
  
  return results;
}

