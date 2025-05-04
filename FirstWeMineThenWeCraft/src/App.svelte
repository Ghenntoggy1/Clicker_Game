<script>
  import ThemeSwitch from './lib/ThemeSwitch.svelte';
  import { blocks } from './lib/Blocks.js';
  import { soundEffects } from './lib/SoundEffects.js';
  import { inventory } from './lib/Inventory';

  let count = $state(Number(localStorage.getItem('count')) || 0);
  let currentBlock = $state(localStorage.getItem('lastBlock') || 'grass_block');
  let currentBlockType = $state(blocks.find((block) => block.name === currentBlock).type);
  let currentBlockImg = $state(blocks.find((block) => block.name === currentBlock).blockImg);
  let currentBlockInvType = $state(blocks.find((block) => block.name === currentBlock).invType);
  let currentTypeSounds = soundEffects.find(s => s.type === currentBlockType)?.sounds || [];
  let inventoryObj = $state(JSON.parse(localStorage.getItem('inventory')) || inventory);

  let song = null;
  let timesToHit = $state(1);

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

      let currentInventoryMineral = currentBlockInvType ? inventoryObj.find(i => i.type === currentBlockInvType) : null;
      if (currentInventoryMineral) {
        currentInventoryMineral.amount = currentInventoryMineral.amount < currentInventoryMineral.maxAmount ? (currentInventoryMineral.amount || 0) + 1 : currentInventoryMineral.maxAmount;
      }
      
      localStorage.setItem('inventory', JSON.stringify(inventoryObj));

      currentBlock = blocks[Math.floor(Math.random() * blocks.length)].name;
      localStorage.setItem('lastBlock', currentBlock);

      currentBlockImg = blocks.find((block) => block.name === currentBlock).blockImg;
      
      currentBlockType = blocks.find((block) => block.name === currentBlock).type;
      currentTypeSounds = soundEffects.find(s => s.type === currentBlockType)?.sounds || [];

      timesToHit = blocks.find((block) => block.name === currentBlock).durability;
    }
  };
</script>

<main class="h-screen md:overflow-hidden">
  <div class="grid grid-rows-[auto_1fr_auto]">
    <header class="sticky top-0 z-10 p-4 shadow-md backdrop-blur-sm">
      <div class="flex justify-between items-center">
        <h1 class="h1 text-lg md:text-2xl font-bold">First We Mine, Then We Craft</h1>
        <ThemeSwitch />
      </div>
    </header>
    <hr class="hr border-t-2" />
    <div class="flex flex-col md:flex-row min-h-screen px-4 pt-4 pb-4 md:pt-0 md:pb-0">
      <div class="flex flex-col items-center justify-center w-full md:w-1/3 p-4 flex-grow">
        <h1 class="h1 text-lg font-bold mb-4">Blocks Mined: {count}</h1>
        <button 
          onclick={increment}
          class="w-64 h-64 flex items-center justify-center bg-cover bg-center hover:scale-105 active:scale-95 !transition-transform !duration-100"
          style={`background-image: url(${currentBlockImg})`}
          aria-label="Mine a block"
        >
        </button>
      </div>
      <span class="vr hidden md:block border-l-2"></span>
      <hr class="hr block: md:hidden border-t-2" />
      <!-- TODO: Add Upgrades alongside with Filters and Favorites/Bought -->
      <div class="flex flex-col items-center w-full md:w-2/3 p-4 flex-grow">
        <h1 class="h1 text-lg font-bold mb-4">Upgrades</h1>
      </div>
    </div>
  </div>
</main>
