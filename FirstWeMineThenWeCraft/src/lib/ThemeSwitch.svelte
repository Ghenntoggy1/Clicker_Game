<script lang="ts">
    import { Switch } from '@skeletonlabs/skeleton-svelte';

    let checked = $state(false);

    $effect(() => {
        let theme = localStorage.getItem('theme');
        if (!theme) {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            theme = prefersDark ? 'dark' : 'light';
        }
        checked = theme === 'dark';
    });

    const onCheckedChange = (event: { checked: boolean }) => {
        const theme = event.checked ? 'dark' : 'light';
        document.documentElement.setAttribute('data-mode', theme);
        localStorage.setItem('theme', theme);
        checked = event.checked;
    };
</script>
  
<svelte:head>
    <script>
        let theme = localStorage.getItem('theme');
        if (!theme) {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            theme = prefersDark ? 'dark' : 'light';
        }
        document.documentElement.setAttribute('data-mode', theme);
    </script>
</svelte:head>
 
<Switch {checked} {onCheckedChange} name="compact" controlWidth="w-10" controlRounded="rounded-none" thumbRounded="rounded-none" compact>
    {#snippet inactiveChild()}
        <img src="./sun_icon.png" alt="Dark Mode Icon" />
    {/snippet}
    {#snippet activeChild()}
        <img src="./moon_icon.png" alt="Light Mode Icon" />
    {/snippet}
</Switch>