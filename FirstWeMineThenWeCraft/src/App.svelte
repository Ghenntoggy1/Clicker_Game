<script>
  import ThemeSwitch from './lib/ThemeSwitch.svelte';
  import { blocks } from './lib/Blocks.js';
  import { soundEffects } from './lib/SoundEffects.js';
  import { inventory } from './lib/Inventory';
  import UpgradesPanel from './lib/UpgradesPanel.svelte';
  import { onMount } from 'svelte';
  import { upgrades } from './lib/Upgrades';

  let count = $state(Number(localStorage.getItem('count')) || 0);
  let currentBlock = $state(localStorage.getItem('lastBlock') || 'grass_block');
  let currentBlockType = $state(blocks.find((block) => block.name === currentBlock).type);
  let currentBlockImg = $state(blocks.find((block) => block.name === currentBlock).blockImg);
  let currentBlockInvType = $state(blocks.find((block) => block.name === currentBlock).invType);
  let currentTypeSounds = soundEffects.find(s => s.type === currentBlockType)?.sounds || [];
  let playerUpgradesState = $state(JSON.parse(localStorage.getItem('playerUpgrades')) || [
        {
            name: 'Pickaxe',
            currentLevel: 0,
        },
        {
            name: 'Axe',
            currentLevel: 0,
        },
        {
            name: 'Shovel',
            currentLevel: 0,
        },
        {
            name: 'Fortune',
            currentLevel: 0,
        },
        {
            name: 'AutoMine',
            currentLevel: 0,
        }
    ]);
  let inventoryObjState = $state(JSON.parse(localStorage.getItem('inventory')) || inventory);
  let song = null;
  let timesToHit = $state(1);

  onMount(() => {
    if (localStorage.getItem('count') === null) {
      localStorage.setItem('count', '0');
    }
    if (localStorage.getItem('lastBlock') === null) {
      localStorage.setItem('lastBlock', 'grass_block');
    }
    if (localStorage.getItem('playerUpgrades') === null) {
      localStorage.setItem('playerUpgrades', JSON.stringify(playerUpgradesState));
    }
    if (localStorage.getItem('inventory') === null) {
      localStorage.setItem('inventory', JSON.stringify(inventoryObjState));
    }
  })

  const reset = () => {
    count = 0;
    currentBlock = 'grass_block';
    currentBlockType = blocks.find((block) => block.name === currentBlock).type;
    currentBlockImg = blocks.find((block) => block.name === currentBlock).blockImg;
    currentBlockInvType = blocks.find((block) => block.name === currentBlock).invType;
    currentTypeSounds = soundEffects.find(s => s.type === currentBlockType)?.sounds || [];
    timesToHit = 1;
    localStorage.setItem('count', count.toString());
    localStorage.setItem('lastBlock', currentBlock);
    localStorage.setItem('inventory', JSON.stringify(inventory));
    localStorage.setItem('playerUpgrades', JSON.stringify([
      {
        name: 'Pickaxe',
        currentLevel: 0,
      },
      {
        name: 'Axe',
        currentLevel: 0,
      },
      {
        name: 'Shovel',
        currentLevel: 0,
      },
      {
        name: 'Fortune',
        currentLevel: 0,
      },
      {
        name: 'AutoMine',
        currentLevel: 0,
      }
    ]));
    localStorage.setItem('theme', window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    location.reload();
  };

  const getClickBoost = (currentBlockType) => {
    let playerUpgradeLevel = 0;
    let currentTypeTool = null;
    switch (currentBlockType) {
      case 'sand':
      case 'gravel':
      case 'dirt':
        playerUpgradeLevel =  playerUpgradesState.find(upgrade => upgrade.name === 'Shovel').currentLevel;
        currentTypeTool = 'Shovel';
        break;
      case 'stone':
      case 'debris':
      case 'glass':
      case 'deepslate':
        playerUpgradeLevel = playerUpgradesState.find(upgrade => upgrade.name === 'Pickaxe').currentLevel;
        currentTypeTool = 'Pickaxe';
        break;
      case 'wood':
        playerUpgradeLevel = playerUpgradesState.find(upgrade => upgrade.name === 'Axe').currentLevel;
        currentTypeTool = 'Axe';
        break;
      default:
        playerUpgradeLevel = 0;
        currentTypeTool = null;
        break;
    }
    if (playerUpgradeLevel === 0) {
      return 0;
    }
    return upgrades.find(upgrade => upgrade.name === currentTypeTool).levels.find(level => level.level === playerUpgradeLevel).effect.durabilityReduction;
  };

  const getFortuneBoost = () => {
    let playerUpgradeLevel = playerUpgradesState.find(upgrade => upgrade.name === 'Fortune').currentLevel;
    if (playerUpgradeLevel === 0) {
      return 0;
    }
    let fortuneChance = upgrades.find(upgrade => upgrade.name === 'Fortune').levels.find(level => level.level === playerUpgradeLevel).effect.resourceChance;
    let fortuneBoost = 0;
    if (Math.random() < fortuneChance) {
      let baseValue = Math.floor(Math.random() * 3);
      let fortuneChanceAdd = fortuneChance === 0.1 ? (fortuneChance * 10) + 1 : (fortuneChance * 10);
      let addValue = Math.floor(Math.random() * fortuneChanceAdd);
      fortuneBoost = baseValue + addValue;
    }
    return fortuneBoost;
  };

  const getCurrentTool = () => {
    let currentTypeTool = null;
    switch (currentBlockType) {
      case 'sand':
      case 'gravel':
      case 'dirt':
        currentTypeTool = 'Shovel';
        break;
      case 'stone':
      case 'debris':
      case 'glass':
      case 'deepslate':
        currentTypeTool = 'Pickaxe';
        break;
      case 'wood':
        currentTypeTool = 'Axe';
        break;
      default:
        currentTypeTool = null;
        break;
    }
    const currentPlayerLevel = playerUpgradesState.find(upgrade => upgrade.name === currentTypeTool).currentLevel;
    const currentPlayerToolObj = upgrades.find(upgrade => upgrade.name === currentTypeTool);
    
    const currentTypeToolIcon = currentPlayerToolObj?.levels.find(level => level.level === currentPlayerLevel)?.icon || '/hand.webp';
    return ('cursors' + currentTypeToolIcon.split('.')[0] + '.png');
  }

  const increment = () => {
    const clickBoost = 1 + getClickBoost(currentBlockType);
    timesToHit -= clickBoost;
    const fortuneBoost = getFortuneBoost();


    currentTypeSounds = soundEffects.find(s => s.type === currentBlockType)?.sounds || [];
    if (currentTypeSounds.length > 0) {
      const soundUrl = currentTypeSounds[Math.floor(Math.random() * currentTypeSounds.length)];
      song = new Audio(soundUrl);
      song.volume = 0.4;
      song.play();
    }
    console.log(getCurrentTool());
    if (timesToHit <= 0) {
      count++;
      localStorage.setItem('count', count.toString());

      currentBlockInvType = blocks.find((block) => block.name === currentBlock).invType;

      let currentInventoryMineral = currentBlockInvType ? inventoryObjState.find(i => i.type === currentBlockInvType) : null;
      if (currentInventoryMineral) {
        currentInventoryMineral.amount = currentInventoryMineral.amount < currentInventoryMineral.maxAmount ? (currentInventoryMineral.amount || 0) + 1 + fortuneBoost : currentInventoryMineral.maxAmount;
      }
      
      localStorage.setItem('inventory', JSON.stringify(inventoryObjState));
      inventoryObjState = JSON.parse(localStorage.getItem('inventory')) || inventory;
      playerUpgradesState = JSON.parse(localStorage.getItem('playerUpgrades')) || playerUpgradesState;

      currentBlock = blocks[Math.floor(Math.random() * blocks.length)].name;
      localStorage.setItem('lastBlock', currentBlock);

      currentBlockImg = blocks.find((block) => block.name === currentBlock).blockImg;
      
      currentBlockType = blocks.find((block) => block.name === currentBlock).type;
      currentTypeSounds = soundEffects.find(s => s.type === currentBlockType)?.sounds || [];

      timesToHit = blocks.find((block) => block.name === currentBlock).durability;
    }
  };
</script>

<main class="h-screen">
  <div class="grid grid-rows-[auto_1fr_auto]">
    <header class="sticky top-0 z-10 p-4 shadow-md backdrop-blur-sm">
      <div class="grid grid-cols-3 items-center">
        <div class="text-left">
          <h1 class="h1 text-lg md:text-2xl font-bold">First We Mine, Then We Craft</h1>
        </div>
        <div class="flex justify-center">
          <ThemeSwitch />
        </div>
        <div class="flex justify-end">
          <button class="btn btn-primary" onclick={reset} aria-label="Reset Game">Reset</button>
        </div>
      </div>
    </header>
    <hr class="hr border-t-2" />
    <div class="flex flex-col md:flex-row min-h-screen px-4 pt-4 pb-4 md:pt-0 md:pb-0">
      <div class='flex flex-col items-center justify-center w-full md:w-1/3 px-4 pt-4 flex-grow'>
        <h1 class="h1 text-lg font-bold mb-4">Inventory</h1>
        <div class="grid grid-cols-4 xl:grid-cols-8 gap-4 w-full justify-items-center">
          {#each inventoryObjState as item}
            <div class="flex flex-col items-center">
              <img src={blocks.find((block) => block.invType === item.type).mineralImg} alt={item.type} class="w-10 h-10 mb-2" />
              <span class="text-sm">{item.type}</span>
              <span class="text-xs">{item.amount}/{item.maxAmount}</span>
            </div>
          {/each}
        </div>
        <div class="flex flex-col items-center justify-center w-full md:w-1/3 flex-grow">
          <h1 class="h1 text-lg font-bold mb-4 whitespace-nowrap">Blocks Mined: {count}</h1>
          <button 
            onclick={increment}
            class="w-64 h-64 flex items-center justify-center bg-cover bg-center hover:scale-105 active:scale-95 !transition-transform !duration-100"
            style={`background-image: url(${currentBlockImg}); cursor: url(${getCurrentTool()}), pointer;`}
            aria-label="Mine a block"
          >
          </button>
        </div>
      </div>
      <span class="vr hidden md:block border-l-2"></span>
      <hr class="hr block: md:hidden border-t-2" />
      <div class="flex flex-col items-center w-full md:w-2/3 p-4 flex-grow">
        <h1 class="h1 text-lg font-bold mb-4">Upgrades</h1>
        <UpgradesPanel stateObj={{playerUpgradesState, inventoryObjState}} />
      </div>
    </div>
  </div>
</main>
