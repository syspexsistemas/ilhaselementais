// Dados completos do jogo Ilhas Elementais

export const heroClasses = [
  {
    id: 'guerreiro',
    name: 'Guerreiro',
    element: 'Terra',
    vida: 12,
    maxVida: 12,
    energia: 4,
    maxEnergia: 4,
    dano: 4,
    defesa: 3,
    movimento: 2,
    habilidade: {
      name: 'Investida Furiosa',
      cost: 2,
      description: 'Move-se até 3 hexágonos e causa +2 de dano no próximo ataque.',
      effect: 'movement_bonus_attack'
    },
    description: 'Um guerreiro resistente especializado em combate corpo a corpo.'
  },
  {
    id: 'mago',
    name: 'Mago',
    element: 'Fogo',
    vida: 8,
    maxVida: 8,
    energia: 6,
    maxEnergia: 6,
    dano: 2,
    defesa: 1,
    movimento: 2,
    habilidade: {
      name: 'Explosão Arcana',
      cost: 3,
      description: 'Causa 4 de dano mágico a todos os inimigos em 2 hexágonos de raio.',
      effect: 'area_magic_damage'
    },
    description: 'Um conjurador poderoso que domina as artes arcanas.'
  },
  {
    id: 'arqueiro',
    name: 'Arqueiro',
    element: 'Ar',
    vida: 10,
    maxVida: 10,
    energia: 5,
    maxEnergia: 5,
    dano: 3,
    defesa: 2,
    movimento: 3,
    habilidade: {
      name: 'Tiro Certeiro',
      cost: 2,
      description: 'Ataque à distância que sempre acerta e causa +3 de dano.',
      effect: 'guaranteed_ranged_attack'
    },
    description: 'Um atirador preciso especializado em combate à distância.'
  },
  {
    id: 'bruxo',
    name: 'Bruxo',
    element: 'Água',
    vida: 9,
    maxVida: 9,
    energia: 5,
    maxEnergia: 5,
    dano: 3,
    defesa: 1,
    movimento: 2,
    habilidade: {
      name: 'Drenar Essência',
      cost: 2,
      description: 'Causa 3 de dano a um inimigo e restaura 2 de vida.',
      effect: 'damage_and_heal'
    },
    description: 'Um místico que manipula as forças da vida e da morte.'
  }
];

// Sistema de Cartas
export const cards = {
  magia: [
    {
      id: 'seta_de_fogo',
      name: 'Seta de Fogo',
      type: 'magia',
      rarity: 'comum',
      cost: 1,
      damage: 3,
      damageType: 'magico',
      area: 'single',
      description: 'Causa 3 de dano mágico a um único alvo.',
      element: 'fogo'
    },
    {
      id: 'bola_de_fogo',
      name: 'Bola de Fogo',
      type: 'magia',
      rarity: 'rara',
      cost: 3,
      damage: 5,
      damageType: 'magico',
      area: 'area_3x3',
      description: 'Causa 5 de dano mágico em área de 3x3 hexágonos.',
      element: 'fogo'
    },
    {
      id: 'cura_leve',
      name: 'Cura Leve',
      type: 'magia',
      rarity: 'comum',
      cost: 1,
      healing: 4,
      area: 'single',
      description: 'Restaura 4 de Vida para um aliado.',
      element: 'agua'
    },
    {
      id: 'raio_congelante',
      name: 'Raio Congelante',
      type: 'magia',
      rarity: 'rara',
      cost: 2,
      damage: 3,
      damageType: 'magico',
      area: 'line',
      effects: ['lentidao'],
      description: 'Causa 3 de dano mágico em linha e aplica Lentidão.',
      element: 'agua'
    },
    {
      id: 'ventania',
      name: 'Ventania',
      type: 'magia',
      rarity: 'comum',
      cost: 2,
      damage: 2,
      damageType: 'magico',
      area: 'area_2x2',
      effects: ['empurrar'],
      description: 'Causa 2 de dano mágico em área e empurra inimigos.',
      element: 'ar'
    },
    {
      id: 'terremoto',
      name: 'Terremoto',
      type: 'magia',
      rarity: 'epica',
      cost: 4,
      damage: 4,
      damageType: 'fisico',
      area: 'all_enemies',
      effects: ['atordoamento'],
      description: 'Causa 4 de dano físico a todos os inimigos e os atordoa.',
      element: 'terra'
    }
  ],
  buff: [
    {
      id: 'vigor_do_guerreiro',
      name: 'Vigor do Guerreiro',
      type: 'buff',
      rarity: 'comum',
      cost: 1,
      duration: 2,
      effects: {
        damage: 1,
        defense: 1
      },
      description: 'Concede +1 Dano e +1 Defesa por 2 turnos.',
      target: 'ally'
    },
    {
      id: 'agilidade_arcana',
      name: 'Agilidade Arcana',
      type: 'buff',
      rarity: 'comum',
      cost: 1,
      duration: 2,
      effects: {
        movement: 1
      },
      description: 'Aumenta o movimento em 1 hexágono adicional por 2 turnos.',
      target: 'ally'
    },
    {
      id: 'pele_de_carvalho',
      name: 'Pele de Carvalho',
      type: 'buff',
      rarity: 'rara',
      cost: 2,
      duration: 1,
      effects: {
        defense: 2
      },
      description: 'Concede +2 de Defesa por 1 turno.',
      target: 'ally'
    },
    {
      id: 'furia_berserker',
      name: 'Fúria Berserker',
      type: 'buff',
      rarity: 'epica',
      cost: 3,
      duration: 3,
      effects: {
        damage: 2,
        defense: -1
      },
      description: 'Concede +2 Dano mas -1 Defesa por 3 turnos.',
      target: 'ally'
    }
  ],
  debuff: [
    {
      id: 'maldicao_da_fraqueza',
      name: 'Maldição da Fraqueza',
      type: 'debuff',
      rarity: 'comum',
      cost: 1,
      duration: 2,
      effects: {
        damage: -1,
        defense: -1
      },
      description: 'Inimigo sofre -1 Dano e -1 Defesa por 2 turnos.',
      target: 'enemy'
    },
    {
      id: 'raizes_enredantes',
      name: 'Raízes Enredantes',
      type: 'debuff',
      rarity: 'comum',
      cost: 1,
      duration: 1,
      effects: {
        movement: 0,
        rooted: true
      },
      description: 'Inimigo fica Enraizado (não pode mover-se) por 1 turno.',
      target: 'enemy'
    },
    {
      id: 'nevoa_toxica',
      name: 'Névoa Tóxica',
      type: 'debuff',
      rarity: 'rara',
      cost: 2,
      duration: 2,
      effects: {
        poison: 1
      },
      description: 'Inimigos em área ficam Envenenados (sofrem 1 de dano no início de cada turno) por 2 turnos.',
      target: 'area',
      area: 'area_2x2'
    },
    {
      id: 'sopro_congelante',
      name: 'Sopro Congelante',
      type: 'debuff',
      rarity: 'comum',
      cost: 1,
      duration: 2,
      effects: {
        movement: -1,
        slow: true
      },
      description: 'Reduz o movimento do inimigo em 1 por 2 turnos.',
      target: 'enemy'
    },
    {
      id: 'atordoamento',
      name: 'Atordoamento',
      type: 'debuff',
      rarity: 'rara',
      cost: 2,
      duration: 1,
      effects: {
        stunned: true
      },
      description: 'Inimigo perde seu próximo turno.',
      target: 'enemy'
    }
  ],
  invocacao: [
    {
      id: 'guardiao_da_floresta',
      name: 'Guardião da Floresta',
      type: 'invocacao',
      rarity: 'rara',
      cost: 3,
      summon: {
        name: 'Guardião da Floresta',
        vida: 8,
        dano: 3,
        defesa: 1,
        movimento: 2,
        duration: 3
      },
      description: 'Invoca um Guardião da Floresta com Vida 8, Dano 3, Defesa 1 por 3 turnos.',
      element: 'terra'
    },
    {
      id: 'elemental_do_fogo_menor',
      name: 'Elemental do Fogo Menor',
      type: 'invocacao',
      rarity: 'comum',
      cost: 2,
      summon: {
        name: 'Elemental do Fogo Menor',
        vida: 5,
        dano: 2,
        defesa: 0,
        movimento: 2,
        duration: 2,
        abilities: ['queimadura']
      },
      description: 'Invoca um Elemental do Fogo Menor com habilidade de Queimadura por 2 turnos.',
      element: 'fogo'
    },
    {
      id: 'espiritos_ancestrais',
      name: 'Espíritos Ancestrais',
      type: 'invocacao',
      rarity: 'epica',
      cost: 4,
      summon: {
        name: 'Espírito Ancestral',
        vida: 6,
        dano: 4,
        defesa: 2,
        movimento: 3,
        duration: 4,
        abilities: ['intangivel']
      },
      description: 'Invoca 2 Espíritos Ancestrais intangíveis por 4 turnos.',
      quantity: 2,
      element: 'agua'
    }
  ]
};

// Sistema de Efeitos de Status
export const statusEffects = {
  buffs: [
    {
      id: 'vigor',
      name: 'Vigor',
      type: 'buff',
      effects: { damage: 1, defense: 1 },
      description: 'Aumenta Dano e Defesa em 1.'
    },
    {
      id: 'agilidade',
      name: 'Agilidade',
      type: 'buff',
      effects: { movement: 1 },
      description: 'Aumenta Movimento em 1.'
    },
    {
      id: 'protecao',
      name: 'Proteção',
      type: 'buff',
      effects: { defense: 2 },
      description: 'Aumenta Defesa em 2.'
    },
    {
      id: 'furia',
      name: 'Fúria',
      type: 'buff',
      effects: { damage: 2, defense: -1 },
      description: 'Aumenta Dano em 2, mas reduz Defesa em 1.'
    },
    {
      id: 'regeneracao',
      name: 'Regeneração',
      type: 'buff',
      effects: { healing_per_turn: 2 },
      description: 'Restaura 2 de Vida no início de cada turno.'
    }
  ],
  debuffs: [
    {
      id: 'fraqueza',
      name: 'Fraqueza',
      type: 'debuff',
      effects: { damage: -1, defense: -1 },
      description: 'Reduz Dano e Defesa em 1.'
    },
    {
      id: 'enraizado',
      name: 'Enraizado',
      type: 'debuff',
      effects: { movement: 0, rooted: true },
      description: 'Não pode se mover.'
    },
    {
      id: 'envenenado',
      name: 'Envenenado',
      type: 'debuff',
      effects: { damage_per_turn: 1 },
      description: 'Sofre 1 de dano no início de cada turno.'
    },
    {
      id: 'lento',
      name: 'Lento',
      type: 'debuff',
      effects: { movement: -1 },
      description: 'Movimento reduzido em 1.'
    },
    {
      id: 'atordoado',
      name: 'Atordoado',
      type: 'debuff',
      effects: { stunned: true },
      description: 'Perde o próximo turno.'
    },
    {
      id: 'queimadura',
      name: 'Queimadura',
      type: 'debuff',
      duration: 2,
      effects: { damage_per_turn: 1 },
      description: 'Sofre 1 de dano de fogo no início de cada turno.'
    },
    {
      id: 'congelado',
      name: 'Congelado',
      type: 'debuff',
      effects: { movement: -2, damage: -1 },
      description: 'Movimento reduzido em 2 e Dano reduzido em 1.'
    }
  ]
};

// Sistema de Terrenos
export const terrainTypes = {
  normal: {
    id: 'normal',
    name: 'Terreno Normal',
    movementCost: 1,
    effects: [],
    description: 'Terreno padrão sem efeitos especiais.'
  },
  water: {
    id: 'water',
    name: 'Água Profunda',
    movementCost: 2,
    effects: [],
    description: 'Custa 2 pontos de movimento para atravessar.'
  },
  lava: {
    id: 'lava',
    name: 'Rio de Lava',
    movementCost: 1,
    effects: [{ type: 'damage_per_turn', value: 1, damageType: 'fogo' }],
    description: 'Causa 1 de dano de fogo por turno.'
  },
  rocky: {
    id: 'rocky',
    name: 'Terreno Rochoso',
    movementCost: 1.5,
    effects: [],
    description: 'Custa 1.5 pontos de movimento para atravessar.'
  },
  volcanic_ash: {
    id: 'volcanic_ash',
    name: 'Campos de Cinzas',
    movementCost: 1.5,
    effects: [{ type: 'visibility_reduction' }],
    description: 'Reduz visibilidade e custa 1.5 pontos de movimento.'
  },
  healing_spring: {
    id: 'healing_spring',
    name: 'Nascente Curativa',
    movementCost: 1,
    effects: [{ type: 'healing_per_turn', value: 1 }],
    description: 'Restaura 1 de Vida por turno.'
  }
};

// Dados dos inimigos (mantendo os existentes)
export const enemies = {
  common: [
    {
      name: "Elemental do Fogo",
      type: "Inimigo Comum",
      element: "Fogo",
      vida: 8,
      dano: 3,
      defesa: 0,
      movimento: 2,
      habilidade: "Queimadura - Ataques causam 1 de dano adicional por 2 turnos.",
      description: "Uma criatura de pura energia flamejante.",
      ai: {
        priority: 'closest',
        behavior: 'aggressive',
        specialAbilities: ['queimadura_aura']
      }
    },
    {
      name: "Gárgula de Pedra",
      type: "Inimigo Comum",
      element: "Terra",
      vida: 12,
      dano: 2,
      defesa: 3,
      movimento: 1,
      habilidade: "Pele de Rocha - Recebe 1 a menos de dano de ataques físicos.",
      description: "Uma estátua viva, lenta, mas incrivelmente resistente.",
      ai: {
        priority: 'closest',
        behavior: 'defensive',
        specialAbilities: ['pele_de_rocha']
      }
    },
    {
      name: "Salamandra",
      type: "Inimigo Comum",
      element: "Fogo",
      vida: 10,
      dano: 4,
      defesa: 1,
      movimento: 2,
      habilidade: "Fogo Rápido - Tem 50% de chance de atacar duas vezes por turno.",
      description: "Um réptil ágil com a capacidade de cuspir chamas.",
      ai: {
        priority: 'lowest_health',
        behavior: 'aggressive',
        specialAbilities: ['fogo_rapido']
      }
    },
    {
      name: "Dríade",
      type: "Inimigo Comum",
      element: "Terra",
      vida: 8,
      dano: 2,
      defesa: 1,
      movimento: 2,
      habilidade: "Sementes Espinhosas - Causa 1 de dano a todos os heróis adjacentes no final de seu turno.",
      description: "Um espírito da floresta que protege a natureza de intrusos.",
      ai: {
        priority: 'closest',
        behavior: 'support',
        specialAbilities: ['sementes_espinhosas']
      }
    },
    {
      name: "Nixie",
      type: "Inimigo Comum",
      element: "Água",
      vida: 9,
      dano: 3,
      defesa: 0,
      movimento: 3,
      habilidade: "Enraizar - Ataques têm 30% de chance de enraizar o alvo por 1 turno.",
      description: "Uma criatura aquática que se move rapidamente e enraíza seus oponentes.",
      ai: {
        priority: 'lowest_defense',
        behavior: 'hit_and_run',
        specialAbilities: ['enraizar']
      }
    },
    {
      name: "Grifo",
      type: "Inimigo Comum",
      element: "Ar",
      vida: 10,
      dano: 4,
      defesa: 1,
      movimento: 3,
      habilidade: "Voo - Pode atravessar obstáculos.",
      description: "Uma criatura alada que ataca do céu.",
      ai: {
        priority: 'highest_damage',
        behavior: 'flanking',
        specialAbilities: ['voo']
      }
    }
  ],
  miniBoss: [
    {
      name: "Manticora",
      type: "Mini-Chefe",
      element: "Fogo",
      vida: 15,
      dano: 5,
      defesa: 2,
      movimento: 2,
      habilidades: [
        "Espinhos Venenosos - Ataques à distância (3 hexágonos) causam 2 de dano adicional de veneno por 2 turnos.",
        "Rugido de Fogo - Uma vez a cada 3 turnos, causa 4 de dano a todos os heróis em uma linha reta de 5 hexágonos."
      ],
      description: "Uma fera temível com corpo de leão, asas de morcego e cauda de escorpião.",
      ai: {
        priority: 'lowest_health',
        behavior: 'ranged_aggressive',
        specialAbilities: ['espinhos_venenosos', 'rugido_de_fogo'],
        abilityTriggers: { rugido_de_fogo: { type: 'turn_interval', value: 3 } }
      }
    },
    {
      name: "Gigante de Terra",
      type: "Mini-Chefe",
      element: "Terra",
      vida: 20,
      dano: 4,
      defesa: 4,
      movimento: 1,
      habilidades: [
        "Esmagar - Ataque corpo a corpo causa dano extra baseado na sua Defesa (Dano + Defesa).",
        "Tremores - Uma vez a cada 3 turnos, causa 3 de dano a todos os heróis no mapa e os Empurra 1 hexágono para longe."
      ],
      description: "Uma criatura de pedra colossal, lenta mas com uma força inimaginável.",
      ai: {
        priority: 'closest',
        behavior: 'tank',
        specialAbilities: ['esmagar', 'tremores'],
        abilityTriggers: { tremores: { type: 'turn_interval', value: 3 } }
      }
    },
    {
      name: "Hidra",
      type: "Mini-Chefe",
      element: "Água",
      vida: 18,
      dano: 5,
      defesa: 1,
      movimento: 2,
      habilidades: [
        "Cabeças Múltiplas - Pode atacar até 2 alvos adjacentes por turno.",
        "Jato de Ácido - Uma vez a cada 3 turnos, causa 5 de dano mágico a 2 heróis aleatórios no mapa."
      ],
      description: "Uma serpente lendária com múltiplas cabeças que cospe veneno e se regenera.",
      ai: {
        priority: 'multiple_targets',
        behavior: 'multi_attack',
        specialAbilities: ['cabecas_multiplas', 'jato_de_acido'],
        abilityTriggers: { jato_de_acido: { type: 'turn_interval', value: 3 } }
      }
    },
    {
      name: "Harpia",
      type: "Mini-Chefe",
      element: "Ar",
      vida: 16,
      dano: 4,
      defesa: 0,
      movimento: 4,
      habilidades: [
        "Grito Estridente - Uma vez a cada 2 turnos, pode Atordoar 1 herói adjacente por 1 turno.",
        "Voo - Pode atravessar obstáculos e ignorar terreno."
      ],
      description: "Uma criatura mitológica com corpo de pássaro e rosto de mulher, que ataca com agilidade e um grito ensurdecedor.",
      ai: {
        priority: 'lowest_defense',
        behavior: 'hit_and_run',
        specialAbilities: ['grito_estridente', 'voo'],
        abilityTriggers: { grito_estridente: { type: 'turn_interval', value: 2 } }
      }
    }
  ],
  boss: [
    {
      name: "Rei da Rocha",
      type: "Chefe",
      element: "Terra",
      vida: 25,
      dano: 5,
      defesa: 5,
      movimento: 1,
      habilidades: [
        "Chuva de Pedras - Uma vez a cada 3 turnos, causa 4 de dano a todos os heróis em uma área de 3 hexágonos de raio.",
        "Armadura de Rocha - Recebe 2 a menos de dano de ataques físicos."
      ],
      description: "O monarca das montanhas, uma criatura de pedra com uma defesa impenetrável.",
      ai: {
        priority: 'highest_damage',
        behavior: 'area_control',
        specialAbilities: ['chuva_de_pedras', 'armadura_de_rocha'],
        abilityTriggers: { chuva_de_pedras: { type: 'turn_interval', value: 3 } }
      }
    },
    {
      name: "Soberano do Mar",
      type: "Chefe",
      element: "Água",
      vida: 23,
      dano: 6,
      defesa: 3,
      movimento: 2,
      habilidades: [
        "Controle da Maré - Uma vez a cada 2 turnos, pode mover todos os heróis em hexágonos de água 2 hexágonos em uma direção escolhida.",
        "Tentáculos Gigantes - Pode atacar até 3 heróis adjacentes."
      ],
      description: "A soberana dos oceanos, uma criatura mística que controla as marés e as criaturas marinhas.",
      ai: {
        priority: 'multiple_targets',
        behavior: 'control',
        specialAbilities: ['controle_da_mare', 'tentaculos_gigantes'],
        abilityTriggers: { controle_da_mare: { type: 'turn_interval', value: 2 } }
      }
    },
    {
      name: "Imperador do Céu",
      type: "Chefe",
      element: "Ar",
      vida: 20,
      dano: 6,
      defesa: 1,
      movimento: 4,
      habilidades: [
        "Tempestade de Raios - Uma vez a cada 2 turnos, causa 5 de dano elétrico a 2 heróis aleatórios no mapa e os Atordoa por 1 turno.",
        "Voo Supremo - Ignora todos os obstáculos de terreno."
      ],
      description: "O senhor dos céus, um ser alado que comanda os ventos e as tempestades, inatingível e poderoso.",
      ai: {
        priority: 'random_targets',
        behavior: 'aerial_assault',
        specialAbilities: ['tempestade_de_raios', 'voo_supremo'],
        abilityTriggers: { tempestade_de_raios: { type: 'turn_interval', value: 2 } }
      }
    }
  ],
  finalBoss: [
    {
      name: "O Corruptor",
      type: "Chefe Final",
      element: "Sombrio",
      vida: 40,
      dano: 8,
      defesa: 5,
      movimento: 2,
      habilidades: [
        {
          name: "Aura de Corrupção",
          effect: "No início de cada turno, todos os heróis recebem 2 de dano mágico."
        },
        {
          name: "Drenagem de Essência",
          effect: "No início de cada turno, causa 2 de dano mágico a todos os heróis no mapa e restaura 1 de Vida para cada herói afetado."
        },
        {
          name: "Invocar Sombras",
          effect: "Uma vez a cada 2 turnos, invoca 2 Espectros (Vida: 5, Dano: 2, Defesa: 0, Habilidade: Intangível - 50% de chance de desviar de ataques físicos) em hexágonos vazios adjacentes."
        },
        {
          name: "Ataque do Vazio",
          effect: "Causa 8 de dano mágico a um único alvo. Este ataque ignora toda a Defesa."
        },
        {
          name: "Pele Demoníaca",
          effect: "Reduz todo o dano recebido em 3."
        }
      ],
      fases: [
        {
          fase: 2,
          condicao: "Ao atingir 30% de Vida",
          alteracoes: {
            dano_bonus: 2,
            movimento_bonus: 1,
            habilidade_Drenagem_de_Essencia_dano: "passa a causar 3 de dano"
          }
        },
        {
          fase: 3,
          condicao: "Ao atingir 10% de Vida",
          alteracoes: {
            dano_bonus: 3,
            habilidade_Invocar_Sombras: "passa a invocar 3 Espectros por turno",
            habilidade_Aura_de_Corrupcao: "passa a causar 3 de dano"
          }
        }
      ],
      description: "A fonte de toda a corrupção no mundo, um ser de pura escuridão e poder.",
      ai: {
        priority: 'strategic',
        behavior: 'boss_complex',
        specialAbilities: ['aura_de_corrupcao', 'drenagem_de_essencia', 'invocar_sombras', 'ataque_do_vazio'],
        abilityTriggers: { 
          invocar_sombras: { type: 'turn_interval', value: 2 },
          aura_de_corrupcao: { type: 'turn_start' },
          drenagem_de_essencia: { type: 'turn_start' }
        }
      }
    }
  ]
};

// Sistema de Combate
export const combatSystem = {
  diceTypes: {
    D6: { sides: 6, hitThreshold: 3 },
    D12: { sides: 12, hitThreshold: 3 }
  },
  damageTypes: {
    fisico: 'Físico',
    magico: 'Mágico',
    fogo: 'Fogo',
    agua: 'Água',
    terra: 'Terra',
    ar: 'Ar',
    veneno: 'Veneno',
    eletrico: 'Elétrico'
  },
  areaTypes: {
    single: 'Alvo Único',
    area_2x2: 'Área 2x2',
    area_3x3: 'Área 3x3',
    line: 'Linha',
    all_enemies: 'Todos os Inimigos',
    all_allies: 'Todos os Aliados'
  }
};

// Configurações das Ilhas
export const islands = [
  { 
    name: 'Ilha do Fogo', 
    element: 'Fogo', 
    difficulty: 1,
    enemies: ['elemental_do_fogo', 'salamandra'],
    terrain: ['normal', 'lava', 'volcanic_ash'],
    boss: 'rei_da_rocha'
  },
  { 
    name: 'Ilha da Água', 
    element: 'Água', 
    difficulty: 2,
    enemies: ['nixie', 'hidra'],
    terrain: ['normal', 'water', 'healing_spring'],
    boss: 'soberano_do_mar'
  },
  { 
    name: 'Ilha da Terra', 
    element: 'Terra', 
    difficulty: 3,
    enemies: ['gargula_de_pedra', 'driade', 'gigante_de_terra'],
    terrain: ['normal', 'rocky', 'healing_spring'],
    boss: 'rei_da_rocha'
  },
  { 
    name: 'Ilha do Ar', 
    element: 'Ar', 
    difficulty: 4,
    enemies: ['grifo', 'harpia'],
    terrain: ['normal', 'rocky'],
    boss: 'imperador_do_ceu'
  }
];

export const magicCards = {
  common: [
    {
      name: "Seta de Fogo",
      type: "Magia Comum",
      cost: 1,
      effect: "Causa 3 de dano mágico a um único alvo.",
      range: "3 hexágonos",
      description: "Uma flecha flamejante que busca seu alvo com precisão ardente.",
      rarity: "Comum",
      element: "Fogo"
    },
    {
      name: "Cura Leve",
      type: "Magia Comum",
      cost: 2,
      effect: "Restaura 4 de Vida para um aliado.",
      range: "2 hexágonos",
      description: "Um toque suave de energia vital que acalma feridas leves.",
      rarity: "Comum",
      element: "Água"
    },
    {
      name: "Escudo de Pedra",
      type: "Magia Comum",
      cost: 1,
      effect: "Concede +2 de Defesa a um aliado por 1 turno.",
      range: "1 hexágono",
      description: "Uma barreira rochosa temporária que desvia ataques.",
      rarity: "Comum",
      element: "Terra"
    },
    {
      name: "Rajada de Vento",
      type: "Magia Comum",
      cost: 1,
      effect: "Empurra um inimigo adjacente 1 hexágono para longe. Não causa dano.",
      range: "Adjacente",
      description: "Uma lufada de ar concentrada capaz de desestabilizar oponentes.",
      rarity: "Comum",
      element: "Ar"
    }
  ],
  rare: [
    {
      name: "Seta de Gelo",
      type: "Magia Rara",
      cost: 2,
      effect: "Causa 4 de dano mágico a um único alvo e o Enraíza por 1 turno.",
      range: "4 hexágonos",
      description: "Uma flecha feita de puro gelo que congela o alvo no lugar.",
      rarity: "Rara",
      element: "Água"
    },
    {
      name: "Explosão de Areia",
      type: "Magia Rara",
      cost: 3,
      effect: "Causa 3 de dano mágico e Cega a todos os inimigos em 2 hexágonos de raio por 1 turno.",
      range: "3 hexágonos",
      description: "Uma nuvem de areia e pó que cega e confunde oponentes.",
      rarity: "Rara",
      element: "Terra"
    },
    {
      name: "Barreira de Vento",
      type: "Magia Rara",
      cost: 2,
      effect: "Cria uma barreira que impede projéteis por 1 turno. Ocupa 3 hexágonos.",
      range: "3 hexágonos",
      description: "Uma parede de vento que desvia qualquer coisa lançada contra ela.",
      rarity: "Rara",
      element: "Ar"
    },
    {
      name: "Cura Maior",
      type: "Magia Rara",
      cost: 5,
      effect: "Restaura 10 de Vida para um aliado.",
      range: "3 hexágonos",
      description: "Um poderoso feitiço de cura que fecha até as feridas mais profundas.",
      rarity: "Rara",
      element: "Água"
    },
    {
      name: "Cura em Massa",
      type: "Magia Rara",
      cost: 6,
      effect: "Restaura 5 de Vida para todos os aliados no mapa.",
      range: "Todo o mapa",
      description: "Uma onda de energia curativa que alcança todos os cantos do campo de batalha.",
      rarity: "Rara",
      element: "Água"
    },
    {
      name: "Armadura de Ferro",
      type: "Magia Rara",
      cost: 4,
      effect: "Concede +5 de Defesa a um aliado por 2 turnos.",
      range: "1 hexágono",
      description: "A pele do herói se transforma em metal, tornando-o quase invulnerável.",
      rarity: "Rara",
      element: "Terra"
    }
  ],
  epic: [
    {
      name: "Tempestade de Meteoros",
      type: "Magia Épica",
      cost: 5,
      effect: "Causa 6 de dano mágico a todos os inimigos em 3 hexágonos de raio.",
      range: "5 hexágonos",
      description: "Uma chuva de rochas e fogo do céu, devastando tudo em seu caminho.",
      rarity: "Épica",
      element: "Fogo"
    },
    {
      name: "Ondas de Cura",
      type: "Magia Épica",
      cost: 6,
      effect: "Restaura 8 de Vida para todos os aliados em 3 hexágonos de raio.",
      range: "4 hexágonos",
      description: "Uma maré de energia curativa que revigora todos os que a tocam.",
      rarity: "Épica",
      element: "Água"
    },
    {
      name: "Terremoto",
      type: "Magia Épica",
      cost: 5,
      effect: "Atordoa todos os inimigos no mapa por 1 turno. Causa 2 de dano físico.",
      range: "Todo o mapa",
      description: "A terra treme e se racha sob o poder de uma força primordial.",
      rarity: "Épica",
      element: "Terra"
    },
    {
      name: "Furacão",
      type: "Magia Épica",
      cost: 6,
      effect: "Empurra todos os inimigos 3 hexágonos para longe. Causa 4 de dano.",
      range: "5 hexágonos",
      description: "Um ciclone implacável que varre tudo o que encontra.",
      rarity: "Épica",
      element: "Ar"
    }
  ]
};

export const buffCards = [
  {
    name: "Bênção de Ataque",
    type: "Bônus",
    cost: 2,
    effect: "Um aliado recebe +2 de Dano por 2 turnos.",
    range: "2 hexágonos",
    description: "A lâmina de um aliado brilha com poder.",
    rarity: "Comum",
    element: "Luz"
  },
  {
    name: "Fúria do Urso",
    type: "Bônus",
    cost: 3,
    effect: "Um aliado recebe +5 de Dano por 1 turno, mas perde 2 de Defesa.",
    range: "1 hexágono",
    description: "O herói se enfurece, atacando com força avassaladora.",
    rarity: "Rara",
    element: "Animal"
  },
  {
    name: "Velocidade do Vento",
    type: "Bônus",
    cost: 1,
    effect: "Um aliado recebe +1 de Movimento por 2 turnos.",
    range: "2 hexágonos",
    description: "O herói se move com a velocidade do vento.",
    rarity: "Comum",
    element: "Ar"
  }
];

export const debuffCards = [
  {
    name: "Maldição da Lentidão",
    type: "Maldição",
    cost: 2,
    effect: "Um inimigo recebe -1 de Movimento por 2 turnos.",
    range: "3 hexágonos",
    description: "Um feitiço que torna o inimigo lento e desajeitado.",
    rarity: "Comum",
    element: "Sombrio"
  },
  {
    name: "Drenar Vida",
    type: "Maldição",
    cost: 3,
    effect: "Um inimigo recebe 3 de dano no início de cada turno por 2 turnos. O dano é restaurado ao herói que lançou o feitiço.",
    range: "2 hexágonos",
    description: "Um feitiço sombrio que drena a força vital do inimigo.",
    rarity: "Rara",
    element: "Sombrio"
  }
];

export const summonCards = [
  {
    name: "Lobo Espiritual",
    type: "Invocação",
    cost: 3,
    effect: "Invoca um Lobo Espiritual (Vida: 6, Dano: 3, Movimento: 3, Habilidade: Ataque Furtivo - Causa dano adicional se atacar por trás) para lutar ao lado do herói.",
    range: "1 hexágono",
    description: "Um espírito leal da floresta, pronto para proteger seu invocador.",
    rarity: "Comum",
    element: "Terra",
    summon: {
      name: "Lobo Espiritual",
      vida: 6,
      dano: 3,
      movimento: 3,
      habilidade: "Ataque Furtivo - Causa dano adicional se atacar por trás"
    }
  },
  {
    name: "Golem de Pedra",
    type: "Invocação",
    cost: 5,
    effect: "Invoca um Golem de Pedra (Vida: 12, Dano: 4, Defesa: 2, Movimento: 1, Habilidade: Pele de Rocha - Recebe 1 a menos de dano de ataques físicos) que protege a área.",
    range: "2 hexágonos",
    description: "Uma criatura colossal de pedra que avança lentamente, mas com força avassaladora.",
    rarity: "Rara",
    element: "Terra",
    summon: {
      name: "Golem de Pedra",
      vida: 12,
      dano: 4,
      defesa: 2,
      movimento: 1,
      habilidade: "Pele de Rocha - Recebe 1 a menos de dano de ataques físicos"
    }
  },
  {
    name: "Elementar de Fogo",
    type: "Invocação",
    cost: 4,
    effect: "Invoca um Elementar de Fogo (Vida: 8, Dano: 5, Movimento: 2, Habilidade: Queimadura - Ataques causam 1 de dano adicional por 2 turnos) para queimar os inimigos.",
    range: "2 hexágonos",
    description: "Uma criatura de pura energia flamejante, pronta para consumir seus inimigos.",
    rarity: "Rara",
    element: "Fogo",
    summon: {
      name: "Elementar de Fogo",
      vida: 8,
      dano: 5,
      movimento: 2,
      habilidade: "Queimadura - Ataques causam 1 de dano adicional por 2 turnos"
    }
  },
  {
    name: "Elemental da Água",
    type: "Invocação",
    cost: 4,
    effect: "Invoca um Elemental da Água (Vida: 10, Dano: 3, Defesa: 1, Movimento: 2, Habilidade: Enraizar - Ataques têm 50% de chance de enraizar o alvo por 1 turno).",
    range: "2 hexágonos",
    description: "Uma criatura de pura energia líquida, que se move como uma onda e congela seus inimigos.",
    rarity: "Rara",
    element: "Água",
    summon: {
      name: "Elemental da Água",
      vida: 10,
      dano: 3,
      defesa: 1,
      movimento: 2,
      habilidade: "Enraizar - Ataques têm 50% de chance de enraizar o alvo por 1 turno"
    }
  },
  {
    name: "Elemental do Ar",
    type: "Invocação",
    cost: 4,
    effect: "Invoca um Elemental do Ar (Vida: 7, Dano: 4, Movimento: 4, Habilidade: Voo - Pode atravessar obstáculos) que voa em direção aos inimigos.",
    range: "2 hexágonos",
    description: "Uma criatura de pura energia eólica, que se move com agilidade e ataca com fúria.",
    rarity: "Rara",
    element: "Ar",
    summon: {
      name: "Elemental do Ar",
      vida: 7,
      dano: 4,
      movimento: 4,
      habilidade: "Voo - Pode atravessar obstáculos"
    }
  }
];



export const gameConstants = {
  maxPlayers: 4,
  energyPerTurn: 1,
  diceTypes: ["D6", "D12"],
  elements: ["Fogo", "Água", "Terra", "Ar", "Luz", "Sombrio"],
  islands: ["Ilha do Fogo", "Ilha da Água", "Ilha da Terra", "Ilha do Ar"]
};

