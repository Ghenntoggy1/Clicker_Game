<script>
  let count = $state(0)
  const increment = () => {
    count += 1
  }
</script>

<button onclick={increment} class="px-4 py-2 rounded ">
  {count}
</button>
