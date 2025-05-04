<script>
    import { onMount } from "svelte";
    import { upgrades } from "./Upgrades";

    let {stateObj} = $props();

    let playerUpgrades = $derived(stateObj.playerUpgradesState);
    let inventoryObj = $derived(stateObj.inventoryObjState);

    let filterType = $state("all");
    let searchQuery = $state("");
    let upgradeTypes = ["all", ...new Set(upgrades.map(upgrade => upgrade.type))];

    let filteredUpgrades = $derived(upgrades.filter(upgrade => {
        const typeMatch = filterType === "all" || upgrade.type === filterType;
        
        const nameMatch = searchQuery === "" || 
                          upgrade.name.toLowerCase().includes(searchQuery.toLowerCase());
        
        return typeMatch && nameMatch;
    }));

    const buyUpgrade = (upgrade) => {
        const upgradeCost = checkCost(upgrade);
        
        let canAfford = true;
        const updatedInventory = [...inventoryObj];
        
        for (const costItem of upgradeCost) {
            const inventoryItem = updatedInventory.find(item => item.type === costItem.type);
            if (!inventoryItem || inventoryItem.amount < costItem.amount) {
                canAfford = false;
                break;
            }
        }
        
        if (canAfford) {
            for (const costItem of upgradeCost) {
                const inventoryItemIndex = updatedInventory.findIndex(item => item.type === costItem.type);
                if (inventoryItemIndex !== -1) {
                    updatedInventory[inventoryItemIndex].amount -= costItem.amount;
                }
            }
            
            const updatedUpgrades = [...playerUpgrades];
            const upgradeIndex = updatedUpgrades.findIndex(u => u.name === upgrade.name);
            if (upgradeIndex !== -1) {
                updatedUpgrades[upgradeIndex].currentLevel += 1;
            }
            
            stateObj.inventoryObjState = updatedInventory;
            stateObj.playerUpgradesState = updatedUpgrades;
            
            localStorage.setItem('playerUpgrades', JSON.stringify(updatedUpgrades));
            localStorage.setItem('inventory', JSON.stringify(updatedInventory));
        } else {
            console.log("Not enough resources to buy this upgrade");
        }
    }

    const checkCost = (upgrade) => {
        const playerUpgrade = playerUpgrades.find(u => u.name === upgrade.name);
        const playerUpgradeLevel = playerUpgrade.currentLevel;
        let upgradeCost = [];
        if (!upgrade.maxLevel) {
            upgradeCost = upgrade.levels[playerUpgradeLevel].cost;
        }
        else {
            upgradeCost = upgrade.levels[playerUpgradeLevel].cost;
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
            upgradeCost = upgrade.levels[playerUpgradeLevel === 0 ? 0 : playerUpgradeLevel].cost;
        }
        return upgradeCost.map(item => `${item.amount} ${item.type}`).join(", ");
    }

    const getIconByUpgrade = (upgrade) => {
        const playerUpgrade = playerUpgrades.find(u => u.name === upgrade.name);
        const playerUpgradeLevel = playerUpgrade.currentLevel;
        const icon = upgrade.type === 'tool' ? upgrade.levels[playerUpgradeLevel === 0 ? 0 : playerUpgradeLevel - 1].icon : upgrade.icon;
        if (playerUpgradeLevel === 0) {
            switch (upgrade.name) {
                case 'Pickaxe':
                    return `<img src="upgrades/pickaxe_empty.webp" alt="${upgrade.name} icon" class="w-12 h-12 md:w-8 md:h-8 lg:w-16 lg:h-16" />`;
                case 'Shovel':
                    return `<img src="upgrades/shovel_empty.webp" alt="${upgrade.name} icon" class="w-12 h-12 md:w-8 md:h-8 lg:w-16 lg:h-16" />`;
                case 'Axe':
                    return `<img src="upgrades/axe_empty.webp" alt="${upgrade.name} icon" class="w-12 h-12 md:w-8 md:h-8 lg:w-16 lg:h-16" />`;
                case 'Fortune':
                    return `<img src="upgrades/enchantment_book_empty.png" alt="${upgrade.name} icon" class="w-12 h-12 md:w-8 md:h-8 lg:w-16 lg:h-16" />`;
                case 'AutoMine':
                    return `<img src="upgrades/enchantment_book_empty.png" alt="${upgrade.name} icon" class="w-12 h-12 md:w-8 md:h-8 lg:w-16 lg:h-16" />`;
                default:
                    break;
            }
        }
        return `<img src="upgrades/${icon}" alt="${upgrade.name} icon" class="w-12 h-12 md:w-8 md:h-8 lg:w-16 lg:h-16" />`;
    }

    const isBuyEnabled = (upgrade) => {
        const playerUpgrade = playerUpgrades.find(u => u.name === upgrade.name);
        const playerUpgradeLevel = playerUpgrade.currentLevel;

        const isMaxed = upgrade.maxLevel !== null
            ? playerUpgradeLevel >= upgrade.maxLevel
            : false;

        if (isMaxed) return false;

        const upgradeCost = checkCost(upgrade);
        for (const costItem of upgradeCost) {
            const inventoryItem = inventoryObj.find(item => item.type === costItem.type);
            if (!inventoryItem || inventoryItem.amount < costItem.amount) {
                return false;
            }
        }

        return true;
    };
</script>

<div>
    <div class="mb-6 p-4 border rounded-lg shadow-md bg-gray-100 dark:bg-gray-700">
        <div class="flex flex-col md:flex-row gap-4 justify-between">
            <div class="flex-1">
                <label for="search" class="block text-sm font-medium mb-1 text-text-base dark:text-white">Search by name:</label>
                <input 
                    type="text" 
                    id="search" 
                    bind:value={searchQuery} 
                    placeholder="Search upgrades..."
                    class="w-full p-2 border rounded bg-white dark:bg-gray-800 dark:text-white"
                />
            </div>
            
            <div class="flex-1">
                <label for="filter-type" class="block text-sm font-medium mb-1 text-text-base dark:text-white">Filter by type:</label>
                <select 
                    id="filter-type" 
                    bind:value={filterType} 
                    class="w-full p-2 border rounded bg-white dark:bg-gray-800 dark:text-white"
                >
                    {#each upgradeTypes as type}
                        <option value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
                    {/each}
                </select>
            </div>
        </div>
    </div>

    <div class="grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-4">
        {#each filteredUpgrades as upgrade}
            <div class="p-4 border rounded-lg shadow-md flex flex-col items-center justify-center text-center text-text-base md:text-sm gap-1 dark:bg-gray-800 dark:text-white">
                {@html getIconByUpgrade(upgrade)}
                <h3 class="h5 text-sm md:text-lg">{upgrade.name}</h3>
                <p class="text-xs md:text-sm">{upgrade.description}</p>
                <p class="text-xs text-gray-500 dark:text-gray-400">Type: {upgrade.type.charAt(0).toUpperCase() + upgrade.type.slice(1)}</p>
                {#if !upgrade.maxLevel || playerUpgrades.find(u => u.name === upgrade.name).currentLevel < upgrade.maxLevel}
                    <p>Cost: {getCostByUpgrade(upgrade)}</p>
                {:else if upgrade.maxLevel}
                    <p>Cost: MAX</p>
                {/if}
                <p>Current Level: {playerUpgrades.find(u => u.name === upgrade.name).currentLevel}</p>
                <p>Max Level: {upgrade.maxLevel ? upgrade.maxLevel : "N/A"}</p>
                <button onclick={() => buyUpgrade(upgrade)} class="mt-2 px-4 py-2 bg-primary-700 text-white rounded hover:bg-primary-800 transition-colors" disabled={!isBuyEnabled(upgrade)}>Buy</button>
            </div>
        {/each}
        
        {#if filteredUpgrades.length === 0}
            <div class="col-span-full p-8 text-center text-gray-500 dark:text-gray-400">
                No upgrades match your search criteria.
            </div>
        {/if}
    </div>
</div>