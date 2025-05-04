<script>
  import ThemeSwitch from './lib/ThemeSwitch.svelte';
  import { blocks } from './lib/Blocks.js';
  import { soundEffects } from './lib/SoundEffects.js';
  import { inventory } from './lib/Inventory';
  import { upgrades } from './lib/Upgrades';
  import UpgradesPanel from './lib/UpgradesPanel.svelte';
  import { onMount } from 'svelte';

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

  const increment = () => {
    timesToHit--;
    currentTypeSounds = soundEffects.find(s => s.type === currentBlockType)?.sounds || [];
    if (currentTypeSounds.length > 0) {
      const soundUrl = currentTypeSounds[Math.floor(Math.random() * currentTypeSounds.length)];
      song = new Audio(soundUrl);
      song.volume = 0.4;
      song.play();
    }
    
    if (timesToHit <= 0) {
      count++;
      localStorage.setItem('count', count.toString());

      currentBlockInvType = blocks.find((block) => block.name === currentBlock).invType;

      let currentInventoryMineral = currentBlockInvType ? inventoryObjState.find(i => i.type === currentBlockInvType) : null;
      if (currentInventoryMineral) {
        currentInventoryMineral.amount = currentInventoryMineral.amount < currentInventoryMineral.maxAmount ? (currentInventoryMineral.amount || 0) + 1 : currentInventoryMineral.maxAmount;
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
      <div class="flex justify-between items-center">
        <h1 class="h1 text-lg md:text-2xl font-bold">First We Mine, Then We Craft</h1>
        <ThemeSwitch />
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
            style={`background-image: url(${currentBlockImg})`}
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
