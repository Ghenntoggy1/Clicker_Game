<script>
  import ThemeSwitch from './lib/ThemeSwitch.svelte';
  import { blocks } from './lib/Blocks.js';

  let count = $state(Number(localStorage.getItem('count')) || 0);
  let currentBlock = $state(localStorage.getItem('lastBlock') || 'grass_block');
  let timesToHit = $state(1);

  const increment = () => {
    timesToHit--;
    if (timesToHit <= 0) {
      count++;
      localStorage.setItem('count', count.toString());

      currentBlock = blocks[Math.floor(Math.random() * blocks.length)].name;
      localStorage.setItem('lastBlock', currentBlock);

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
          style={`background-image: url(blocks/${currentBlock}.png)`}
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