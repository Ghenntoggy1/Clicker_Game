# Laboratory Work 6 - Client-Side Application
### **Topic**: Clicker Game
### **Title**: First - We Mine, Then - We Craft

## Description:
Client-Sided Application that is using LocalStorage and Reactivity of SvelteJS to maintain all the functionalities working on the Client Side, without Server.

It is a clicker game inspired by Minecraft and A Minecraft Movie, hence the name of the app. It is made to be more of a time killer when people are waiting for something and are willing to spend their time on something chill and relaxing.

## Technological Stack:
1. ViteJS,
2. SvelteJS,
3. JavaScript,
4. TailwindCSS,
5. SkeletonUI.

## Functional Requirements:
### Clicker Element:
There is a block that should be mined (clicked). Different materials have different durabilities, therefore some block may require multiple taps so that they be collected.

### Inventory:
After the collection of block, most of them will grant some resources that are automatically placed in your Inventory. The limit for each material is 64, which is the classical stack in Minecraft game.

### Upgrades:
In order to make gameplay more involving, there is Upgrade Shop, that has 2 types of upgrades:
#### Tools:
1. Pickaxe - grants durability reduction boost on Stone type of blocks,
2. Axe - grants durability reduction boost on Wood type of blocks,
3. Shovel - grants durability reduction boost on Terrain type of blocks.
#### Enchantments:
1. Fortune - grants a chance to obtain more resources from a single block being collected,
2. AutoMiner - NOT IMPLEMENTED - grants auto clicks on blocks.

### Light/Dark Theme Switcher:
In order to make app prettier and more universal, there is a Switch that will change the theme from Dark to Light and vice-versa. SkeletonUI provided several templates with color palettes that may be implemented in the app to offer a better visual style.

## Non-Functional Requirements:
### Reactivity:
Due to SvelteJS features such as `$state()`, `$props()` and `$derived()`,  it is possible to implement reactivity in application, which will make page re-render when user interacts with app and app registers some changes.

### LocalStorage:
Implementation of LocalStorage offers possibility to store in browser storage information of current progress in the game or last registered changes in the application. For example, Count of blocks that were mined, Purchased Upgrades and Last Block to be mined are stored there and will be restored on next entry in the app.

### Entity Management:
As entities there are Blocks and Upgrades, that are available to interaction. Specifically, Upgrades may be filtered and purchased. Thus, users may find easier and choose what upgrades should be bought.

### Add to Homescreen Feature:
Due to usage of `manifest.json` it is easier to implement the possibility to add to the homescreen of various devices (teste on Androi Chrome and Desktop Chrome) a link to the application.

### Responsiveness:
Due to usage of SkeletonUI and TailwindCSS frameworks and their classes styling implementations, application became responsive on different devices, such as: Desktop or Mobile Devices.

## Link to Deployed Application:
[First - We Mine, Then - We Craft!](https://ghenntoggy1.github.io/Clicker_Game/)