<script>
  let count = $state(Number(localStorage.getItem('count')) || 0);
  let currentBlock = $state(localStorage.getItem('lastBlock') || 'grass_block');
  const images = [
    'cobblestone_block',
    'debris_block',
    'grass_block',
    'planks_block',
  ];

  const increment = () => {
    currentBlock = images[Math.floor(Math.random() * images.length)];
    count += 1;
    localStorage.setItem('count', count.toString());
    localStorage.setItem('lastBlock', currentBlock);
  };

  export function getCount() {
    return count;
  }
</script>

<button 
  onclick={increment} 
  class="w-64 h-64  flex items-center justify-center bg-cover bg-center hover:scale-105 transition-transform"
  style={`background-image: url(blocks/${currentBlock}.png)`}
>
  <span class="text-white text-2xl font-bold drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">{count}</span>
</button>
