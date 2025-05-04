<script>
    import { onMount } from "svelte";
    import { upgrades } from "./Upgrades";

    export let playerUpgrades;
    export let inventoryObj;
    
    const buyUpgrade = (upgrade) => {
        const upgradeCost = checkCost(upgrade);
        console.log(upgradeCost);
        console.log(inventoryObj);
        for (const item of upgradeCost) {
            const inventoryItem = inventoryObj.find(i => i.name === item.name);
            if (inventoryItem) {
                inventoryItem.count -= item.count;
                if (inventoryItem.count <= 0) {
                    inventoryObj = inventoryObj.filter(i => i.name !== item.name);
                }
            }
        }
        console.log(inventoryObj);

        // localStorage.setItem('playerUpgrades', JSON.stringify(playerUpgrades));
        // localStorage.setItem('inventory', JSON.stringify(inventoryObj));
    }

    const checkCost = (upgrade) => {
        console.log(upgrade.name);
        console.log(playerUpgrades);
        const playerUpgrade = playerUpgrades.find(u => u.name === upgrade.name);
        console.log(playerUpgrade);
        const playerUpgradeLevel = playerUpgrade.currentLevel;
        console.log(playerUpgradeLevel);
        let upgradeCost = [];
        if (!upgrade.maxLevel) {
            upgradeCost = upgrade.levels[playerUpgradeLevel].cost;
        }
        else {
            upgradeCost = upgrade.levels[playerUpgradeLevel + 1].cost;
        }
        return upgradeCost;
    }

    const getCostByUpgrade = (upgrade) => {
        const playerUpgrade = playerUpgrades.find(u => u.name === upgrade.name);
        const playerUpgradeLevel = playerUpgrade.currentLevel;
        let upgradeCost = [];
        if (upgrade.maxLevel === null) {
            upgradeCost = upgrade.levels[0].cost;
            upgradeCost = upgradeCost.map(item => {
                return {
                    type: item.type,
                    amount: Math.floor(item.amount + 1.2 * (playerUpgradeLevel))
                };
            });
        }
        else {
            upgradeCost = upgrade.levels[playerUpgradeLevel].cost;
        }
        return upgradeCost.map(item => `${item.amount} ${item.type}`).join(", ");
    }

    const getIconByUpgrade = (upgrade) => {
        const playerUpgrade = playerUpgrades.find(u => u.name === upgrade.name);
        const playerUpgradeLevel = playerUpgrade.currentLevel;
        const icon = upgrade.type === 'tool' ? upgrade.levels[playerUpgradeLevel].icon : upgrade.icon;
        return `<img src="upgrades/${icon}" alt="${upgrade.name} icon" class="w-12 h-12 md:w-8 md:h-8 lg:w-16 lg:h-16" />`;
    }
</script>

<div>
    <div class="grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-4">
        {#each upgrades as upgrade}
            <div class="p-4 border rounded-lg shadow-md flex flex-col items-center justify-center text-center text-text-base md:text-sm gap-1 dark:bg-gray-800 dark:text-white">
                {@html getIconByUpgrade(upgrade)}
                <h3 class="h5 text-sm md:text-lg">{upgrade.name}</h3>
                <p>{upgrade.description}</p>
                <p>Cost: {getCostByUpgrade(upgrade)}</p>
                <p>Current Level: {playerUpgrades.find(u => u.name === upgrade.name).currentLevel}</p>
                <p>Max Level: {upgrade.maxLevel ? upgrade.maxLevel : "N/A"}</p>
                <button onclick={() => buyUpgrade(upgrade)} class="mt-2 px-4 py-2 bg-primary-700 rounded">Buy</button>
            </div>
        {/each}
    </div>
</div>