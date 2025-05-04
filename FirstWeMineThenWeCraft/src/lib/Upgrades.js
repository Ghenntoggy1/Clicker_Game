export const upgrades = [
    {
        type: 'tool',
        name: 'Pickaxe',
        description: 'Increases the speed of mining stone blocks.',
        levels: [
            { 
              level: 1, 
              cost: [
                { 
                    type: 'wood', 
                    amount: 5 
                },
              ],
              icon: '/tools/wood_pickaxe.png',
              effect: { durabilityReduction: 1 }
            },
            { 
              level: 2, 
              cost: [
                { 
                    type: 'wood', 
                    amount: 10 
                },
                {
                    type: 'stone', 
                    amount: 20
                }
              ],
              icon: '/tools/stone_pickaxe.png',
              effect: { durabilityReduction: 2 }
            },
            { 
              level: 3, 
              cost: [
                { 
                    type: 'wood', 
                    amount: 30 
                },
                {
                    type: 'ore', 
                    amount: 25
                }
              ],
              icon: '/tools/iron_pickaxe.png',
              effect: { durabilityReduction: 3 }
            },
            { 
              level: 4, 
              cost: [
                { 
                    type: 'wood', 
                    amount: 35 
                },
                {
                    type: 'ore', 
                    amount: 40
                }
              ],
              icon: '/tools/diamond_pickaxe.png',
              effect: { durabilityReduction: 4 }
            },
            { 
              level: 5, 
              cost: [
                { 
                    type: 'wood', 
                    amount: 50 
                },
                {
                    type: 'ore', 
                    amount: 64
                },
                {
                    type: 'netherite', 
                    amount: 15
                }
              ],
              icon: '/tools/netherite_pickaxe.png',
              effect: { durabilityReduction: 5 }
            }
        ],
        maxLevel: 5,
    },
    {
        type: 'tool',
        name: 'Axe',
        description: 'Increases the speed of mining wood blocks.',
        levels: [
            { 
              level: 1, 
              cost: [
                { 
                    type: 'wood', 
                    amount: 5 
                },
              ],
              icon: '/tools/wood_axe.png',
              effect: { durabilityReduction: 1 }
            },
            { 
              level: 2, 
              cost: [
                { 
                    type: 'wood', 
                    amount: 10 
                },
                {
                    type: 'stone', 
                    amount: 20
                }
              ],
              icon: '/tools/stone_axe.png',
              effect: { durabilityReduction: 2 }
            },
            { 
              level: 3, 
              cost: [
                { 
                    type: 'wood', 
                    amount: 30 
                },
                {
                    type: 'ore', 
                    amount: 25
                }
              ],
              icon: '/tools/iron_axe.png',
              effect: { durabilityReduction: 3 }
            },
            { 
              level: 4, 
              cost: [
                { 
                    type: 'wood', 
                    amount: 35 
                },
                {
                    type: 'ore', 
                    amount: 40
                }
              ],
              icon: '/tools/diamond_axe.png',
              effect: { durabilityReduction: 4 }
            },
            { 
              level: 5, 
              cost: [
                { 
                    type: 'wood', 
                    amount: 50 
                },
                {
                    type: 'ore', 
                    amount: 64
                },
                {
                    type: 'netherite', 
                    amount: 15
                }
              ],
              icon: '/tools/netherite_axe.png',
              effect: { durabilityReduction: 5 }
            }
        ],
        maxLevel: 5,
    },
    {
        type: 'tool',
        name: 'Shovel',
        description: 'Increases the speed of mining terrain blocks.',
        levels: [
            { 
              level: 1, 
              cost: [
                { 
                    type: 'wood', 
                    amount: 3
                },
              ],
              icon: '/tools/wood_shovel.png',
              effect: { durabilityReduction: 1 }
            },
            { 
              level: 2, 
              cost: [
                { 
                    type: 'wood', 
                    amount: 7 
                },
                {
                    type: 'stone', 
                    amount: 15
                }
              ],
              icon: '/tools/stone_shovel.png',
              effect: { durabilityReduction: 2 }
            },
            { 
              level: 3, 
              cost: [
                { 
                    type: 'wood', 
                    amount: 25 
                },
                {
                    type: 'ore', 
                    amount: 20
                }
              ],
              icon: '/tools/iron_shovel.png',
              effect: { durabilityReduction: 3 }
            },
            { 
              level: 4, 
              cost: [
                { 
                    type: 'wood', 
                    amount: 30 
                },
                {
                    type: 'ore', 
                    amount: 30
                }
              ],
              icon: '/tools/diamond_shovel.png',
              effect: { durabilityReduction: 4 }
            },
            { 
              level: 5, 
              cost: [
                { 
                    type: 'wood', 
                    amount: 45 
                },
                {
                    type: 'ore', 
                    amount: 50
                },
                {
                    type: 'netherite', 
                    amount: 7
                }
              ],
              icon: '/tools/netherite_shovel.png',
              effect: { durabilityReduction: 5 }
            }
        ],
        maxLevel: 5,
    },
    {
        type: 'enchantment',
        name: 'Fortune',
        description: 'Increases the chance of getting more resources from mining.',
        levels: [
            { 
              level: 1, 
              cost: { type: 'emerald', amount: 5 },
              effect: { resourceChance: 0.1 }
            },
            { 
              level: 2, 
              cost: { type: 'emerald', amount: 15 },
              effect: { resourceChance: 0.2 }
            },
            { 
              level: 3, 
              cost: { type: 'emerald', amount: 30 },
              effect: { resourceChance: 0.3 }
            },
            { 
              level: 4, 
              cost: { type: 'emerald', amount: 50 },
              effect: { resourceChance: 0.4 }
            },
            { 
              level: 5, 
              cost: { type: 'emerald', amount: 64 },
              effect: { resourceChance: 0.5 }
            }
        ],
        maxLevel: 5,
        icon: '/enchanted_book.webp',
    },
    {
        type: 'enchantment',
        name: 'AutoMine',
        description: 'Automatically mines blocks in front of you.',
        levels: [
            { 
              level: 1, 
              cost: { type: 'netherite', amount: 5 },
              effect: { autoClick: 0.1 }
            }
        ],
        maxLevel: null,
        icon: '/enchanted_book.webp',
    }
]