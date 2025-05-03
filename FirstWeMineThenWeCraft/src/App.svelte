<script>
  import Counter from './lib/Counter.svelte';
  import ThemeSwitch from './lib/ThemeSwitch.svelte';
</script>

<main class="h-screen md:overflow-hidden">
  <div class="grid grid-rows-[auto_1fr_auto]">
    <header class="sticky top-0 z-10 p-4 shadow-md">
      <div class="flex justify-between items-center">
        <h1 class="text-2xl font-bold">First We Mine, Then We Craft</h1>
        <ThemeSwitch />
      </div>
    </header>
    <div class="flex flex-col md:flex-row min-h-screen px-4 pt-4 pb-4 md:pt-0 md:pb-0">
      <div class="flex flex-col items-center w-full md:w-1/3 p-4 border-b md:border-b-0 md:border-r flex-grow">
        <!-- TODO: Implement LocalStorage for Blocks Counter -->
        <h1 class="text-lg font-bold mb-4">Blocks Mined: NA</h1>
        <Counter />
      </div>
      <!-- TODO: Add Upgrades alongside with Filters and Favorites/Bought -->
      <div class="flex flex-col items-center w-full md:w-2/3 p-4 flex-grow">
        <h1 class="text-lg font-bold mb-4">Upgrades</h1>
      </div>
    </div>
  </div>
</main>

<style>
</style>