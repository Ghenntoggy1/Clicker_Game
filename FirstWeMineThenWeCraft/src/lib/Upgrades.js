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
              icon: '/wooden_pickaxe.webp',
              effect: { durabilityReduction: 0.3 }
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
              icon: '/stone_pickaxe.webp',
              effect: { durabilityReduction: 0.8 }
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
              icon: '/iron_pickaxe.webp',
              effect: { durabilityReduction: 1.5 }
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
              icon: '/diamond_pickaxe.webp',
              effect: { durabilityReduction: 2 }
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
              icon: '/netherite_pickaxe.webp',
              effect: { durabilityReduction: 3 }
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
              icon: '/wooden_axe.webp',
              effect: { durabilityReduction: 0.3 }
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
              icon: '/stone_axe.webp',
              effect: { durabilityReduction: 0.8 }
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
              icon: '/iron_axe.webp',
              effect: { durabilityReduction: 1.5 }
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
              icon: '/diamond_axe.webp',
              effect: { durabilityReduction: 2 }
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
              icon: '/netherite_axe.webp',
              effect: { durabilityReduction: 3 }
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
              icon: '/wooden_shovel.webp',
              effect: { durabilityReduction: 0.3 }
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
              icon: '/stone_shovel.webp',
              effect: { durabilityReduction: 0.8 }
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
              icon: '/iron_shovel.webp',
              effect: { durabilityReduction: 1.5 }
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
              icon: '/diamond_shovel.webp',
              effect: { durabilityReduction: 2 }
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
              icon: '/netherite_shovel.webp',
              effect: { durabilityReduction: 3 }
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
            cost: [
              {
                  type: 'emeralds', 
                  amount: 5 
              },
              {
                  type: 'flint',
                  amount: 10
              }
          ],
            effect: { resourceChance: 0.1 }
          },
          { 
            level: 2, 
            cost: [
              {
                  type: 'emeralds', 
                  amount: 15 
              },
              {
                  type: 'flint',
                  amount: 20
              }
          ],
            effect: { resourceChance: 0.2 }
          },
          { 
            level: 3, 
            cost: [
              {
                  type: 'emeralds', 
                  amount: 20 
              },
              {
                  type: 'flint',
                  amount: 25
              }
          ],
            effect: { resourceChance: 0.3 }
          },
          { 
            level: 4, 
            cost: [
              {
                type: 'emeralds', 
                amount: 50 
              },
              {
                type: 'flint',
                amount: 35
              }
          ],
            effect: { resourceChance: 0.4 }
          },
          { 
            level: 5, 
            cost: [
              {
                type: 'emeralds', 
                amount: 64 
              },
              {
                type: 'flint',
                amount: 50
              }
          ],
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
            cost: [
              { 
                type: 'netherite', 
                amount: 5 
              },
              {
                type: 'gold', 
                amount: 10 
              }
          ],
            effect: { autoClick: 0.1 }
          }
        ],
        maxLevel: null,
        icon: '/enchanted_book.webp',
    }
]