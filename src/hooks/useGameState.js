import { useState, useEffect, useCallback } from 'react';
import { firestore } from '../lib/firebase';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';

const initialGameState = {
  gamePhase: 'setup', // setup, playing, paused
  currentTurn: 'heroes', // heroes, enemies
  turnNumber: 1,
  heroes: [],
  enemies: [],
  summons: [],
  combatLog: [],
  gameSettings: {
    playerCount: 2,
    difficulty: 'normal',
    currentIsland: 'Ilha do Fogo'
  },
  progress: {
    completedIslands: [],
    artifactFragments: 0,
    experiencePoints: 0
  },
  pointsOfInterest: [
    { name: 'Fonte de Vigor', effect: '+2 Vida máxima para um herói', used: false },
    { name: 'Forja Antiga', effect: '+1 Dano permanente para um herói', used: false },
    { name: 'Poço de Cura', effect: 'Restaura toda a vida de um herói', used: true },
    { name: 'Altar do Vento', effect: '+1 Movimento permanente para um herói', used: false }
  ],
  lastSaved: null
};

export function useGameState() {
  const { currentUser } = useAuth();
  const [gameState, setGameState] = useState(initialGameState);
  const [db, setDb] = useState(null);

  useEffect(() => {
    if (currentUser) {
      const gameDocRef = doc(firestore, 'gameStates', currentUser.uid);
      setDb(gameDocRef);

      const unsubscribe = onSnapshot(gameDocRef, (doc) => {
        if (doc.exists()) {
          setGameState(doc.data());
        } else {
          // If no game state exists for the user, create one
          setDoc(gameDocRef, initialGameState);
        }
      });

      return () => unsubscribe();
    }
  }, [currentUser]);

  const updateGameState = async (newState) => {
    if (db) {
      await setDoc(db, newState, { merge: true });
    }
  };
  
  const saveGameState = useCallback(async () => {
    const stateToSave = {
      ...gameState,
      lastSaved: new Date().toISOString()
    }
    await updateGameState(stateToSave);
  }, [gameState, updateGameState])

  // Funções para atualizar o estado
  const updateGamePhase = useCallback(async (phase) => {
    await updateGameState({ ...gameState, gamePhase: phase });
  }, [gameState, updateGameState])

  const updateTurn = useCallback(async (turn) => {
    await updateGameState({ ...gameState, currentTurn: turn });
  }, [gameState, updateGameState])

  const nextTurn = useCallback(async () => {
    let newState;
    if (gameState.currentTurn === 'heroes') {
      newState = { ...gameState, currentTurn: 'enemies' };
    } else {
      newState = {
        ...gameState,
        currentTurn: 'heroes',
        turnNumber: gameState.turnNumber + 1
      };
    }
    await updateGameState(newState);
  }, [gameState, updateGameState])

  const updateHeroes = useCallback(async (heroes) => {
    await updateGameState({ ...gameState, heroes });
  }, [gameState, updateGameState])

  const updateHero = useCallback(async (heroId, updates) => {
    const newHeroes = gameState.heroes.map(hero =>
      hero.id === heroId ? { ...hero, ...updates } : hero
    );
    await updateGameState({ ...gameState, heroes: newHeroes });
  }, [gameState, updateGameState])

  const updateEnemies = useCallback(async (enemies) => {
    await updateGameState({ ...gameState, enemies });
  }, [gameState, updateGameState])

  const updateEnemy = useCallback(async (enemyId, updates) => {
    const newEnemies = gameState.enemies.map(enemy =>
      enemy.instanceId === enemyId ? { ...enemy, ...updates } : enemy
    );
    await updateGameState({ ...gameState, enemies: newEnemies });
  }, [gameState, updateGameState])

  const addEnemy = useCallback(async (enemy) => {
    await updateGameState({ ...gameState, enemies: [...gameState.enemies, enemy] });
  }, [gameState, updateGameState])

  const addSummon = useCallback(async (summon) => {
    await updateGameState({ ...gameState, summons: [...gameState.summons, summon] });
  }, [gameState, updateGameState])

  const removeEnemy = useCallback(async (enemyId) => {
    const newEnemies = gameState.enemies.filter(enemy => enemy.instanceId !== enemyId);
    await updateGameState({ ...gameState, enemies: newEnemies });
  }, [gameState, updateGameState])

  const updateGameSettings = useCallback(async (settings) => {
    await updateGameState({ ...gameState, gameSettings: { ...gameState.gameSettings, ...settings } });
  }, [gameState, updateGameState])

  const updateProgress = useCallback(async (progress) => {
    await updateGameState({ ...gameState, progress: { ...gameState.progress, ...progress } });
  }, [gameState, updateGameState])

  const completeIsland = useCallback(async (islandName) => {
    if (!gameState.progress.completedIslands.includes(islandName)) {
      const newProgress = {
        ...gameState.progress,
        completedIslands: [...gameState.progress.completedIslands, islandName],
        artifactFragments: gameState.progress.artifactFragments + 1,
        experiencePoints: gameState.progress.experiencePoints + 100
      };
      await updateGameState({ ...gameState, progress: newProgress });
    }
  }, [gameState, updateGameState])

  const resetProgress = useCallback(async () => {
    const newProgress = {
      completedIslands: [],
      artifactFragments: 0,
      experiencePoints: 0
    };
    await updateGameState({ ...gameState, progress: newProgress });
  }, [gameState, updateGameState])

  const resetGame = useCallback(async () => {
    await updateGameState(initialGameState);
  }, [updateGameState]);

  const togglePointOfInterest = useCallback(async (index) => {
    const newPois = gameState.pointsOfInterest.map((poi, i) =>
      i === index ? { ...poi, used: !poi.used } : poi
    );
    await updateGameState({ ...gameState, pointsOfInterest: newPois });
  }, [gameState, updateGameState])

  const addCombatLog = useCallback(async (entry) => {
    const newLog = [entry, ...gameState.combatLog.slice(0, 49)];
    await updateGameState({ ...gameState, combatLog: newLog });
  }, [gameState, updateGameState])
  
  const processStatusEffects = useCallback(async () => {
    // This function now needs to be async and update the state in Firestore
    // For simplicity, we'll calculate the new state and then update it once.
    let newHeroes = [...gameState.heroes];
    let newEnemies = [...gameState.enemies];

    newHeroes = newHeroes.map(hero => {
      if (!hero.statusEffects) return hero;
      const updatedEffects = hero.statusEffects
        .map(e => ({ ...e, duration: e.duration - 1 }))
        .filter(e => e.duration > 0);
      return { ...hero, statusEffects: updatedEffects };
    });

    newEnemies = newEnemies.map(enemy => {
      if (!enemy.statusEffects) return enemy;
      const updatedEffects = enemy.statusEffects
        .map(e => ({ ...e, duration: e.duration - 1 }))
        .filter(e => e.duration > 0);
      return { ...enemy, statusEffects: updatedEffects };
    });

    await updateGameState({ ...gameState, heroes: newHeroes, enemies: newEnemies });
  }, [gameState, updateGameState]);


  return {
    gameState,
    updateGamePhase,
    updateTurn,
    nextTurn,
    updateHeroes,
    updateHero,
    updateEnemies,
    updateEnemy,
    addEnemy,
    addSummon,
    removeEnemy,
    updateGameSettings,
    updateProgress,
    completeIsland,
    resetProgress,
    resetGame,
    addCombatLog,
    togglePointOfInterest,
    saveGameState,
    processStatusEffects
  };
}

