function toggleDarkMode() {
  const icon = document.getElementById('light-mode-icon');
  const leftRibbon = document.getElementById('left-ribbon');
  const rightRibbon = document.getElementById('right-ribbon');
  const musicIcon = document.getElementById('music-icon');
  
  // Toggle the 'dark-theme' class on the body element
  document.body.classList.toggle('dark-theme');

  // Check if we are entering dark mode (if the body now has the dark-theme class)
  if (document.body.classList.contains('dark-theme')) {
    // Switch to the Moon icon
    icon.src = 'https://i.imgur.com/qxfeK6k.gif'; 
    
    // Switch both ribbons to your dark mode ribbon URL
    if (leftRibbon) leftRibbon.src = 'https://graphic.neocities.org/bow_set_9.gif';
    if (rightRibbon) rightRibbon.src = 'https://graphic.neocities.org/bow_set_9.gif';

    if (musicIcon) musicIcon.src = './Images/music-icon-light.png';

  } else {
    // Otherwise, switch back to the Sun icon
    icon.src = 'https://i.imgur.com/MqiXvqh.gif'; 

    // Switch both ribbons back to your light mode local images
    if (leftRibbon) leftRibbon.src = 'https://graphic.neocities.org/tumblr_llsv6mqKJn1qg9aa7.gif';
    if (rightRibbon) rightRibbon.src = 'https://graphic.neocities.org/tumblr_llsv6mqKJn1qg9aa7.gif';

    if (musicIcon) musicIcon.src = './Images/music-icon-dark.png';
  }
}








// --- STATE TRACKING ---
let isMusicPlaying = false;
let activeMenu = null;

// Track active topping toggles (ON/OFF)
const activeToppings = {
  mushroom: false,
  parsley: false,
  pepperoni: false,
};




// --- DATA CONFIGURATION ---
const menuData = {



  plate: [
    {
      id: "plate1",
      icon: "./Images/plate1.png",
      targetSrc: "./Images/plate1.png",
    },
    {
      id: "plate2",
      icon: "./Images/plate2.png",
      targetSrc: "./Images/plate2.png",
    },
    {
      id: "plate3",
      icon: "./Images/plate3.png",
      targetSrc: "./Images/plate3.png",
    },
  ],



  sauce: [
    {
      id: "garlic",
      icon: "./Images/sauce-garlic.png",
      targetSrc: "./Images/sauce-garlic.png",
    },
    {
      id: "red",
      icon: "./Images/sauce-default.png",
      targetSrc: "./Images/sauce-default.png",
    },
    {
      id: "mozzarella",
      icon: "./Images/sauce-cheese.png",
      targetSrc: "./Images/sauce-cheese.png",
    },
  ],



  toppings: [
    { id: "mushroom", icon: "./Images/topping-mushroom.png" },
    { id: "parsley", icon: "./Images/topping-parsley.png" },
    { id: "peperoni", icon: "./Images/topping-peperoni.png" },
  ],
};







// --- MENU DRAWER TOGGLE ---
function openMenu(type) {
  const drawer = document.getElementById("menu-drawer");
  const drawerItems = document.getElementById("drawer-items");

  // If clicking the currently open menu, close it
  if (activeMenu === type && !drawer.classList.contains("drawer-hidden")) {
    drawer.classList.add("drawer-hidden");
    activeMenu = null;
    return;
  }


  activeMenu = type;
  drawerItems.innerHTML = ""; // Clear previous items

  // Render items for selected category
  menuData[type].forEach((item) => {
    const img = document.createElement("img");
    img.src = item.icon;
    img.className = "menu-item-icon";

    // Handle Item Clicks
    img.onclick = () => handleItemSelect(type, item);
    drawerItems.appendChild(img);
  });

  // Show Drawer
  drawer.classList.remove("drawer-hidden");
}





// --- ITEM SELECTION MECHANICS ---
function handleItemSelect(type, item) {
  if (type === "plate") {
    const plateLayer = document.getElementById("plate-layer");
    plateLayer.src = item.targetSrc;
    plateLayer.classList.remove("plate-hidden");
  } else if (type === "sauce") {
    const pizzaBase = document.getElementById("pizza-base");
    pizzaBase.src = item.targetSrc;
  } else if (type === "toppings") {
    // Toggle topping ON or OFF
    const toppingId = item.id;
    activeToppings[toppingId] = !activeToppings[toppingId];

    const toppingLayer = document.getElementById(`topping-${toppingId}`);
    if (activeToppings[toppingId]) {
      toppingLayer.classList.remove("topping-hidden");
    } else {
      toppingLayer.classList.add("topping-hidden");
    }
  }
}





// --- MUSIC TOGGLE ---
function toggleMusic() {
  const music = document.getElementById("doodle-music");
  if (isMusicPlaying) {
    music.pause();
    isMusicPlaying = false;
  } else {
    music
      .play()
      .catch((err) => console.log("Audio play blocked by browser:", err));
    isMusicPlaying = true;
  }
}







