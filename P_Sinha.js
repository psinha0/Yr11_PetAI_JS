/*

Welcome to Prathmesh Sinha's Beautiful Pet Simulator! (Some people call it NeoPets v2 but NO, this is the OG pet simulator)
the code is ugly, i don't like, it works, i don't know how, please leave me be

The next few lines are very ugly. They are hard-defined global variables that are used throughout the code.
The components and buttons are hard-defined coordinates of images and buttons on the screen. Fun.

*/
var petName;
var gold = 100;
var reactions = {};
var upcomingEvent;
var timePassed;
var playValues = readCookie("playPoints");
var scorePercent;
var currentShop = "";
var currentBag = "";
var loadHunger = false;
var pushHunger = 0;
var mainImageVisibility = true;
var listOfFoods = false;
var listOfToys = false;
var menuBackground = false;
var goldPoints = 0;
var currentReaction = reactions.indifferent;
var currentMenu = "home";
TimeMe.initialize({ currentPageName: "main_page", idleTimeoutInSeconds: 300 });

// The following code are hard defined. They have a definite (x, y) coordinate, as well as a (width, height).

function startCanvas() {
  fillerImage = new component(0.4*screen.width, 0.5*screen.height, "duck.jpeg", 0.13*screen.width, 0.105*screen.height, "image", 0, "mainImageVisibility");

  shopCanvas = new component(0.55*screen.width, 0.55*screen.height, "#FBFCFC", 0.065*screen.width, 0.08*screen.height, "backgroundColor", 0, "menuBackground");
  shopClose = new createButton(0.07*screen.width, 0.09*screen.height, 0.13*screen.width, 0.15*screen.height, "closeAll();", "shopClose");

  petFoodOne = new component(0.08*screen.width, 0.11*screen.height, "orange.png", 0.15*screen.width, 0.14*screen.height, "image", 0, "listOfFoods");
  petFoodTwo = new component(0.08*screen.width, 0.11*screen.height, "cat_food.jpg", 0.30*screen.width, 0.14*screen.height, "image", 0, "listOfFoods");
  petFoodThree = new component(0.08*screen.width, 0.13*screen.height, "meat.png", 0.45*screen.width, 0.12*screen.height, "image", 0, "listOfFoods");
  petFoodFour = new component(0.08*screen.width, 0.14*screen.height, "fish_food.jpg", 0.155*screen.width, 0.36*screen.height, "image", 0, "listOfFoods");
  petFoodFive = new component(0.08*screen.width, 0.13*screen.height, "premium_food.jpg", 0.30*screen.width, 0.37*screen.height, "image", 0, "listOfFoods");
  petFoodSix = new component(0.08*screen.width, 0.12*screen.height, "catnip.png", 0.45*screen.width, 0.38*screen.height, "image", 0, "listOfFoods");

  petToyOne = new component(0.08*screen.width, 0.11*screen.height, "train.png", 0.15*screen.width, 0.14*screen.height, "image", 0, "listOfToys");
  petToyTwo = new component(0.08*screen.width, 0.11*screen.height, "train.png", 0.30*screen.width, 0.14*screen.height, "image", 0, "listOfToys");
  petToyThree = new component(0.08*screen.width, 0.13*screen.height, "train.png", 0.45*screen.width, 0.12*screen.height, "image", 0, "listOfToys");
  petToyFour = new component(0.08*screen.width, 0.14*screen.height, "train.png", 0.155*screen.width, 0.36*screen.height, "image", 0, "listOfToys");
  petToyFive = new component(0.08*screen.width, 0.13*screen.height, "train.png", 0.30*screen.width, 0.37*screen.height, "image", 0, "listOfToys");
  petToySix = new component(0.08*screen.width, 0.12*screen.height, "train.png", 0.45*screen.width, 0.38*screen.height, "image", 0, "listOfToys");

  foodOneBuy = new createButton(0.08*screen.width, 0.035*screen.height, 0.204*screen.width, 0.31*screen.height, "purchaseItem(1);", "buyButton", "buyButton", "Cost: 5 Gold", "15px Optima", "#708090");
  foodTwoBuy = new createButton(0.08*screen.width, 0.035*screen.height, 0.35*screen.width, 0.31*screen.height, "purchaseItem(2);", "buyButton", "buyButton", "Cost: 10 Gold", "15px Optima", "#708090");
  foodThreeBuy = new createButton(0.08*screen.width, 0.035*screen.height, 0.5*screen.width, 0.31*screen.height, "purchaseItem(3);", "buyButton", "buyButton", "Cost: 15 Gold", "15px Optima", "#708090");
  foodFourBuy = new createButton(0.08*screen.width, 0.035*screen.height, 0.204*screen.width, 0.56*screen.height, "purchaseItem(4);", "buyButton", "buyButton", "Cost: 25 Gold", "15px Optima", "#708090");
  foodFiveBuy = new createButton(0.08*screen.width, 0.035*screen.height, 0.35*screen.width, 0.56*screen.height, "purchaseItem(5);", "buyButton", "buyButton", "Cost: 50 Gold", "15px Optima", "#708090");
  foodSixBuy = new createButton(0.08*screen.width, 0.035*screen.height, 0.5*screen.width, 0.56*screen.height, "purchaseItem(6);", "buyButton", "buyButton", "Cost: 100 Gold", "15px Optima", "#708090");

  foodOneFeed = new createButton(0.08*screen.width, 0.035*screen.height, 0.204*screen.width, 0.31*screen.height, "useItem(1);", "petItemOne", "useButton", "", "15px Optima", "#D3D3D3");
  foodTwoFeed = new createButton(0.08*screen.width, 0.035*screen.height, 0.35*screen.width, 0.31*screen.height, "useItem(2);", "petItemTwo", "useButton", "", "15px Optima", "#D3D3D3");
  foodThreeFeed = new createButton(0.08*screen.width, 0.035*screen.height, 0.5*screen.width, 0.31*screen.height, "useItem(3);", "petItemThree", "useButton", "", "15px Optima", "#D3D3D3");
  foodFourFeed = new createButton(0.08*screen.width, 0.035*screen.height, 0.204*screen.width, 0.56*screen.height, "useItem(4);", "petItemFour", "useButton", "", "15px Optima", "#D3D3D3");
  foodFiveFeed = new createButton(0.08*screen.width, 0.035*screen.height, 0.35*screen.width, 0.56*screen.height, "useItem(5);", "petItemFive", "useButton", "", "15px Optima", "#D3D3D3");
  foodSixFeed = new createButton(0.08*screen.width, 0.035*screen.height, 0.5*screen.width, 0.56*screen.height, "useItem(6);", "petItemSix", "useButton", "", "15px Optima", "#D3D3D3");

  shopNextPage = new createButton(0.07*screen.width, 0.09*screen.height, 0.615*screen.width, 0.64*screen.height, "nextShop();", "nextShop", "shopPage");
  shopBackPage = new createButton(0.07*screen.width, 0.09*screen.height, 0.13*screen.width, 0.64*screen.height, "backShop();", "backShop", "shopPage");

  rightSideCanvas = new component(0.22*screen.width, 0.8*screen.height, "#20B2AA", 0.68*screen.width, 0, "color");
  botSideCanvas = new component(0.68*screen.width, 0.1*screen.height, "#FFDAB9", 0, 0.7*screen.height, "color");

  buttonOne = new createButton(0.17*screen.width, 0.06*screen.height, 0.755*screen.width, 0.1*screen.height, "createEmotion();", "buttonOne", "menuButton", "");
  buttonTwo = new createButton(0.17*screen.width, 0.06*screen.height, 0.755*screen.width, 0.2*screen.height, "openCookie();", "buttonTwo", "menuButton", "Gold Cookie");
  buttonThree = new createButton(0.17*screen.width, 0.06*screen.height, 0.755*screen.width, 0.3*screen.height, "openShop();", "buttonThree", "menuButton", "Shop");
  buttonFour = new createButton(0.17*screen.width, 0.06*screen.height, 0.755*screen.width, 0.4*screen.height, "openInventory();", "buttonFour", "menuButton", "Inventory");

  infoButton = new createButton(0.07*screen.width, 0.09*screen.height, 0.689*screen.width, 0.7*screen.height, "openInfo();", "infoButton", "infoButton");

  cookieClicker = new createButton(0.3*screen.width, 0.3*screen.height, 0.24*screen.width, 0.25*screen.height, "addGold();", "cookieClicker", "cookieClicker");

  // Currently, the hungerBar reduces to zero in a minute.
  hungerBar = new component(0.177*screen.width, 0.04*screen.height, "#F7B267", 0.7*screen.width, 0.5*screen.height, "scoreBar", (20 / (2 * 60 * 60 * 1000)) * 0.177*screen.width);
  // Credits to Benjamin "Sean's Schlong's Long" Avery and Sean "Stopwatch" Hou
  myCanvasArea.start();
}

function alertUsedToy(text, play_increase) {
  alertify.alert('You played with ' + petName + "!", text, playValues += play_increase);
}

function useItem(item) {
  switch(item) {
    case 1:
      if (currentBag == "food") {
        if (petFoods.petItemOne >= 1) { pushHunger = 1; petFoods.petItemOne -= 1; updateInventoryComponents(petFoods); }
      }
      else if (currentBag == "toy") {
        if (petToys.petItemOne >= 1) { alertUsedToy("Your pet played with a toy train! " + petName + " had a little bit of fun doing so.", 5); petToys.petItemOne -= 1; updateInventoryComponents(petToys); }
      }
      break;
    case 2:
      if (currentBag == "food") {
        if (petFoods.petItemTwo >= 1) { pushHunger = 3; petFoods.petItemTwo -= 1; updateInventoryComponents(petFoods); }
      }
      else if (currentBag == "toy") {
        if (petToys.petItemTwo >= 1) { alertUsedToy("Your pet played with a toy train! " + petName + " seems to have enjoyed a little.", 10); petToys.petItemTwo -= 1; updateInventoryComponents(petToys); }
      }
      break;
    case 3:
      if (currentBag == "food") {
        if (petFoods.petItemThree >= 1) { pushHunger = 5; petFoods.petItemThree -= 1; updateInventoryComponents(petFoods); }
      }
      else if (currentBag == "toy") {
        if (petToys.petItemThree >= 1) { alertUsedToy("Your pet played with a toy train! It seems like " + petName + " had fun.", 20); petToys.petItemThree -= 1; updateInventoryComponents(petToys); }
      }
      break;
    case 4:
      if (currentBag == "food") {
        if (petFoods.petItemFour >= 1) { pushHunger = 7; petFoods.petItemFour -= 1; updateInventoryComponents(petFoods); }
      }
      else if (currentBag == "toy") {
        if (petToys.petItemFour >= 1) { alertUsedToy("Your pet played with a toy train! " + petName + " really enjoyed doing that!", 30); petToys.petItemFour -= 1; updateInventoryComponents(petToys); }
      }
      break;
    case 5:
      if (currentBag == "food") {
        if (petFoods.petItemFive >= 1) { pushHunger = 10; petFoods.petItemFive -= 1; updateInventoryComponents(petFoods); }
      }
      else if (currentBag == "toy") {
        if (petToys.petItemFive >= 1) { alertUsedToy("Your pet played with a toy train! " + petName + "had a LOT of fun!", 50); petToys.petItemFive -= 1; updateInventoryComponents(petToys); }
      }
      break;
    case 6:
      if (currentBag == "food") {
        if (petFoods.petItemSix >= 1) { pushHunger = 20; petFoods.petItemSix -= 1; updateInventoryComponents(petFoods); }
      }
      else if (currentBag == "toy") {
        if (petToys.petItemSix >= 1) { alertUsedToy("Your pet played with a toy train! It's almost as if " + petName + " had a small party with itself!", 100); petToys.petItemSix -= 1; updateInventoryComponents(petToys); }
      }
      break;
  }
}

/*
Sets out the main background canvas. Then edits the HTML such that the canvas tag is under the body tag.
Also has the clear function, and stop function for debugging purposes.
*/
var myCanvasArea = {
  canvas : document.createElement("canvas"),
  start : function() {
    this.canvas.width = 0.9*screen.width;
    this.canvas.height = 0.8*screen.height;
    this.canvas.classList.add("mainCanvas");
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    this.frameNo = 0;
    this.interval = setInterval(updateGameArea, 20);
  },
  clear : function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
  stop : function() {
    clearInterval(this.interval);
  }
}

function returnOwnedItemAmount(id, givenID, text) {
  if (id == givenID) {
    if (currentBag == "food") { return "Owned: " + petFoods[givenID]; }
    else if (currentBag == "toy") { return "Owned: " + petToys[givenID]; }
  }
  else {
    return text;
  }
}

function createButton(width, height, x, y, output, id, buttonClass, text="", style="20px Comic Sans MS", textColor="#FFD1C1") {
  this.buttonCanvas = document.createElement("canvas");
  this.buttonCanvas.width = width;
  this.buttonCanvas.height = height;
  this.buttonCanvas.id = id;
  this.text = text;
  this.context = this.buttonCanvas.getContext("2d");
  this.interval = setInterval(updateButton, 100);
  this.buttonCanvas.classList.add(buttonClass);
  // The code above assigns the width, height, id and class
  document.body.insertBefore(this.buttonCanvas, document.body.childNodes[0]);
  // ^ Appends the <canvas> tag below the <body> tag in html ^
  var buttonStyling = document.getElementById(id);

  this.updateButton = function() {
    this.context.clearRect(0, 0, this.buttonCanvas.width, this.buttonCanvas.height);
    var feedButtons = ['petItemOne', 'petItemTwo', 'petItemThree', 'petItemFour', 'petItemFive', 'petItemSix'];
    for (const item of feedButtons) {
      this.text = returnOwnedItemAmount(id, item, text);
      canvasFont(this.context, style, textColor, this.text, width/2, height/2+3);
    }
    buttonStyling.style.left = x + "px";
    buttonStyling.style.top = y + "px";
  }
  // The code below adds an event which runs upon clicking the canvas
  this.buttonCanvas.addEventListener('click', function(event) {
    eval(output); // Runs the output code
  }, false);
}

function updateButton() {
  var myComponents = [shopClose, buttonOne, buttonTwo, buttonThree, buttonFour, foodOneBuy, foodTwoBuy, foodThreeBuy, foodFourBuy, foodFiveBuy, foodSixBuy, foodOneFeed, foodTwoFeed, foodThreeFeed, foodFourFeed, foodFiveFeed, foodSixFeed, shopNextPage, shopBackPage, infoButton, cookieClicker];
  for (const item of myComponents) {
    item.updateButton();
  }
}

function component(width, height, color, x, y, type, rate=0, visibility=true) {
  this.type = type;
  if (type == "image") {
    this.image = new Image();
  }
  this.width = width;
  var scoreWidth = width;
  this.height = height;
  this.x = x;
  this.y = y;
  this.rate = rate;
  this.visibility = visibility;
  this.update = function() {
    ctx = myCanvasArea.context;
    // ctx.fillText(updateEmotion(personality), x, y);
    if (type == "image") {
        if (eval(this.visibility) == true) {
          this.image.src = "images/" + color;
        }
        else {
          this.image.src = "";
        }
        ctx.drawImage(this.image,
        this.x,
        this.y,
        this.width, this.height);
    }
    else if (type == "scoreBar") {
      // Rate decreases a given rate variable from the width every 20ms.
      // In order to decrease the entire thing in a second, let the rate be
      // 20/1000 of the total width (as 1000ms = 1 second).
      if (loadHunger == true) { scoreWidth = (scorePercent / 100) * this.width; loadHunger = false; }
      if (pushHunger > 0 && this.width > scoreWidth) {
        scoreWidth = scoreWidth + pushHunger;
        pushHunger = 0;
      }
      else {
        pushHunger = 0;
      }
      if (scoreWidth > 0) {
        scoreWidth = scoreWidth - this.rate;
      }
      scorePercent = Math.ceil((scoreWidth/this.width) * 100);
      ctx.fillStyle = "#3B444B";
      ctx.fillRect(this.x, this.y, this.width + 5, this.height);
      ctx.fillStyle = color;
      ctx.fillRect(this.x, this.y, scoreWidth, this.height);
      canvasFont(ctx, "25px Palatine Linotype", "orange", "Hunger: " + scorePercent, this.x + 0.09*screen.width, this.y + 0.09*screen.height);
    }
    else if (type == "backgroundColor") {
      if (eval(this.visibility) == true) {
        ctx.fillStyle = color;
        ctx.globalAlpha = 0.8;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.globalAlpha = 1;
      }
    }
    else {
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    canvasFont(ctx, "30px Palatine Linotype", "red", currentReaction, 0.34*screen.width, 0.77*screen.height);
    canvasFont(ctx, "25px Palatine Linotype", "gold", "Your Gold: " + gold, 0.79*screen.width, 0.48*screen.height);
  }
}

function canvasFont(ctx, style, color, text, width, height) {
  ctx.font = style;
  ctx.fillStyle = color;
  ctx.textAlign = "center";
  ctx.fillText(text, width, height)
}

function askPetName() {
  alertify.promptNoCancel( "What's your pet's name?", 'Enter Pet Name:', 'Pet'
               , function(evt, value) { createCookie("petName", value, 999); petName = readCookie("petName"); refreshReactions(); }
               , function() { alert("you will never see this, this is an easter egg !!") });
}

var emotions = {
  affection : 0,
  loneliness: 0,
  call : function(call) {
    if (call.includes("aff")) {
      return this.affection;
    }
    else if (call.includes("lone")) {
      return this.loneliness;
    }
  }
}

var petFoods = {
  petItemOne: 5,
  petItemTwo: 0,
  petItemThree: 0,
  petItemFour: 0,
  petItemFive: 0,
  petItemSix: 0
}

var petToys = {
  petItemOne: 5,
  petItemTwo: 0,
  petItemThree: 0,
  petItemFour: 0,
  petItemFive: 0,
  petItemSix: 0
}

function askPurchaseConfirmation(price, product) {
  var purchased = false;
  alertify.confirm('Buying Confimation', 'Are you sure you wanna buy this product?'
    , function(){ gold -= price; purchased = true; eval(product + "+= 1"); }
    , function(){});
    // return purchased;
}

function purchaseItem(itemNumber) {
  // TODO: Functionality to purchase multiple.
  switch (itemNumber) {
    case 1:
      if (gold >= 5) {
        switch (currentShop) {
          case "food":
            // if (askPurchaseConfirmation(5)) { petFoods.petFoodOne = 1; console.log(petFoods.petFoodOne); }
            askPurchaseConfirmation(5, "petFoods.petItemOne");
            break;
          case "toy":
            askPurchaseConfirmation(5, "petToys.petItemOne");
            break;
        }
      }
      break;
    case 2:
      if (gold >= 10) {
        switch (currentShop) {
          case "food":
            askPurchaseConfirmation(10, "petFoods.petItemTwo");
            break;
          case "toy":
            askPurchaseConfirmation(10, "petToys.petItemTwo");
            break;
        }
      }
      break;
    case 3:
      if (gold >= 15) {
        switch (currentShop) {
          case "food":
            askPurchaseConfirmation(15, "petFoods.petItemThree");
            break;
          case "toy":
            askPurchaseConfirmation(15, "petToys.petItemThree");
            break;
        }
      }
      break;
    case 4:
      if (gold >= 25) {
        switch (currentShop) {
          case "food":
            askPurchaseConfirmation(25, "petFoods.petItemFour");
            break;
          case "toy":
            askPurchaseConfirmation(25, "petToys.petItemFour");
            break;
        }
      }
      break;
    case 5:
      if (gold >= 50) {
        switch (currentShop) {
          case "food":
            askPurchaseConfirmation(50, "petFoods.petItemFive");
            break;
          case "toy":
            askPurchaseConfirmation(50, "petToys.petItemFive");
            break;
        }
      }
      break;
    case 6:
      if (gold >= 100) {
        switch (currentShop) {
          case "food":
            askPurchaseConfirmation(100, "petFoods.petItemSix");
            break;
          case "toy":
            askPurchaseConfirmation(100, "petToys.petItemSix");
            break;
        }
      }
      break;
  }
}

function getRandInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function addGold() {
  goldPoints += 0.2;
  if (goldPoints == 1) {
    gold += 1;
    goldPoints = 0;
  }
}

function nextShop() {
  switch(currentShop) {
    case "food":
      openToyShop();
  }
  switch(currentBag) {
    case "food":
      openToyInventory();
  }
}

function backShop() {
  switch(currentShop) {
    case "toy":
      openShop();
  }
  switch(currentBag) {
    case "toy":
      openInventory();
  }
}

function openToyShop() {
  closeAll();
  currentShop = "toy";
  mainImageVisibility = false;
  listOfFoods = false;
  listOfToys = true;
  menuBackground = true;
  currentMenu = "shop";
  var buyButton = document.getElementsByClassName('buyButton');
  var shopPage = document.getElementsByClassName('shopPage');
  for (var i = 0; i < buyButton.length; i++) {
    buyButton[i].style.visibility = 'visible';
  }
  for (var i = 0; i < shopPage.length; i++) {
    shopPage[i].style.visibility = 'visible';
  }
  document.getElementById('shopClose').style.visibility = 'visible';
}

function updateInventoryComponents(dict) {
  var availableItems = [];
  var unavailableItems = [];
  var petItemTypes = Object.keys(dict);
  for (var i = 0; i < petItemTypes.length; i++) {
    if (dict[petItemTypes[i]] >= 1) {
      availableItems.push(petItemTypes[i]);
    }
    else {
      unavailableItems.push(petItemTypes[i]);
    }
  }
  for (var i = 0; i < availableItems.length; i++) {
    var usableButton = document.getElementById(availableItems[i]);
    usableButton.style.backgroundColor = "#228B22";
  }
  for (var i = 0; i < unavailableItems.length; i++) {
    var unusableButton = document.getElementById(unavailableItems[i]);
    unusableButton.style.backgroundColor = "#D3D3D3";
  }
}

function openInfo() {
  switch (currentMenu) {
    case ("home"):
      alertify.alert('Home Information', 'This is your main pet menu. You can stare at your pet as they live!');
      break;
    case ("shop"):
      alertify.alert('Shop Information', 'This is the shop! You can browse the items available here. You can purchase items with gold.');
      break;
    case("bag"):
      alertify.alert('Inventory Information', 'This is your inventory. You can look at the items you have. You can also feed your pet here.');
      break;
    case("cookie"):
      alertify.alert('Getting Gold Information', 'You can click on the cookie to get gold. 5 CLICKS = 1 GOLD.');
      break;
    default:
      alertify.alert('you fucking donkey', 'you fucking retard.');
      break;
  }
}

function openCookie() {
  closeAll();
  mainImageVisibility = false;
  menuBackground = true;
  listOfFoods = false;
  listOfToys = false;
  currentMenu = "cookie";
  document.getElementById('cookieClicker').style.visibility = 'visible';
  document.getElementById('shopClose').style.visibility = 'visible';
}

function openShop() {
  closeAll();
  currentShop = "food";
  mainImageVisibility = false;
  listOfFoods = true;
  listOfToys = false;
  menuBackground = true;
  currentMenu = "shop";
  var buyButton = document.getElementsByClassName('buyButton');
  var shopPage = document.getElementsByClassName('shopPage');
  for (var i = 0; i < buyButton.length; i++) {
    buyButton[i].style.visibility = 'visible';
  }
  for (var i = 0; i < shopPage.length; i++) {
    shopPage[i].style.visibility = 'visible';
  }
  document.getElementById('shopClose').style.visibility = 'visible';
}

function openToyInventory() {
  closeAll();
  mainImageVisibility = false;
  menuBackground = true;
  listOfFoods = false;
  listOfToys = true;
  currentBag = "toy";
  currentMenu = "bag";
  updateInventoryComponents(petToys);
  var useButton = document.getElementsByClassName('useButton');
  var shopPage = document.getElementsByClassName('shopPage');
  for (var i = 0; i < buyButton.length; i++) {
    useButton[i].style.visibility = 'visible';
  }
  for (var i = 0; i < shopPage.length; i++) {
    shopPage[i].style.visibility = 'visible';
  }
  document.getElementById('shopClose').style.visibility = 'visible';
}

function openInventory() {
  closeAll();
  mainImageVisibility = false;
  menuBackground = true;
  listOfFoods = true;
  listOfToys = false;
  currentBag = "food";
  currentMenu = "bag";
  updateInventoryComponents(petFoods);
  var useButton = document.getElementsByClassName('useButton');
  var shopPage = document.getElementsByClassName('shopPage');
  for (var i = 0; i < useButton.length; i++) {
    useButton[i].style.visibility = 'visible';
  }
  for (var i = 0; i < shopPage.length; i++) {
    shopPage[i].style.visibility = 'visible';
  }
  document.getElementById('shopClose').style.visibility = 'visible';
}

function closeAll() {
  currentShop = "";
  currentBag = "";
  mainImageVisibility = true;
  listOfFoods = false;
  listOfToys = false;
  menuBackground = false;
  currentMenu = "home";
  var buyButton = document.getElementsByClassName('buyButton');
  var shopPage = document.getElementsByClassName('shopPage');
  var useButton = document.getElementsByClassName('useButton');
  for (var i = 0; i < buyButton.length; i++) {
    buyButton[i].style.visibility = 'hidden';
  }
  for (var i = 0; i < shopPage.length; i++) {
    shopPage[i].style.visibility = 'hidden';
  }
  for (var i = 0; i < useButton.length; i++) {
    useButton[i].style.visibility = 'hidden';
  }
  document.getElementById('shopClose').style.visibility = 'hidden';
  document.getElementById('cookieClicker').style.visibility = 'hidden';
}

// Credits to Mandeep Janjua for setCookie, getCookie and eraseCookie

function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function eraseCookie(name) {
	createCookie(name,"",-1);
}

// Cookie code ends here.

// The following code is the main code of the simulation, as it is the piece of code that gives the pet feelings.
// It emulates feelings.

function checkHungerDifference() {
  var currentHunger = scorePercent;
  if (typeof previousHunger === 'undefined') { createCookie("previousHunger", currentHunger, 999); return 100-currentHunger; }
  else {
    hungerDifference = readCookie("previousHunger") - currentHunger;
    createCookie("previousHunger", currentHunger, 999);
    return hungerDifference;
  }
}

Number.prototype.between = function(a, b) {
  var min = Math.min(a, b),
    max = Math.max(a, b);
  return this > min && this < max;
};

function createEmotion() {
  var timeSpentOnPage = TimeMe.getTimeOnCurrentPageInSeconds().toFixed();
  if (isNaN(checkHungerDifference())) { hungerDifference = 0; }
  else {var hungerDifference = checkHungerDifference(); } // Returns a number from -120 to 120. Negative = Increase. Positive = Decrease.}
  var randomNum = getRandInteger(-25, 25);
  if (timePassed <= 0) { var timeDifference = 1; }
  else { timeDifference = timePassed; timePassed -= 0.3; }
  var playPoints = playValues;

  /*
  The formula for the creation of emotion. Heh.
  T = Time spent on the page (in seconds). After 5 minutes of idle activity, the timer stops counting time.
  H = Hunger differece. This value represents the increase or decrease in hunger since last feed. This updates every 10 minutes.
  R = Random Integer between -50 and 50.
  K = Time passed since this simulation was last open. Basically, the difference between the last time the simulation was played
      and the time the simulation was opened.
  P = Play points. A direct constant representative of how much the pet has been played with.

  Every five minutes, the play points will reduce by 25.
  Every five minutes, K will reduce by twenty minutes (aka by 0.3) until it reaches zero.

  Since the play points are to directly linked to user's actions, the play points will have the highest influence.
  The time passed is in hours and is directly linked to how long the user has the left the pet the alone.
    Therefore, the time passed will also have a high influence.
  On average, playPoints ∈ (-25, 50)

  [2P + 1.2 * Sqrt(T) + R - (H/4)] / K

  */

  var emotionEquation = ((2 * playPoints) + (1.2 * Math.sqrt(timeSpentOnPage)) + randomNum - (hungerDifference / 3)) / timeDifference;
  // Average Value = 75. (Therefore base value = 75)
  if (emotionEquation < -20) { currentReaction = reactions.angry; }
  else if (emotionEquation.between(-20, 0)) { currentReaction = reactions.sad; }
  else if (emotionEquation.between(0, 20)) { currentReaction = reactions.dislike; }
  else if (emotionEquation.between(20, 40)) { currentReaction = reactions.indifferent; }
  else if (emotionEquation.between(40, 80)) { currentReaction = reactions.happy; }
  else if (emotionEquation.between(80, 130)) {currentReaction = reactions.cheerful; }
  else if (emotionEquation > 130) { currentReaction = reactions.love; }
  else { currentReaction = reactions.happy; }

  playValues -= 5;
  console.log(emotionEquation);
  createCookie("playPoints", playValues, 999);
}

function updateEmotion() {
  setInterval(createEmotion, 1000 * 60); // Do that every minute.
}

$( document ).ready(function(event) {
  var currentDate = new Date().getTime();
  var previousDate = readCookie("lastSeen");
  timePassed = ((currentDate-previousDate) / (1000 * 60 * 60)).toFixed(1);
  // eraseCookie('petName');
  if (readCookie("petName") == null) { askPetName(); }
  if (readCookie("playPoints") == null) { createCookie("playPoints", 25, 999); }
  petName = readCookie("petName");
  refreshReactions();
  createEmotion();
  updateEmotion();
  if (readCookie("exitHunger") !== null) {
    scorePercent = readCookie("exitHunger") - ((timePassed / 8) / (2 * 60 * 60 * 1000));
    loadHunger = true;
  }

  // timePassed = ((currentDate-previousDate) / (1000)).toFixed(1);
  // alert("You have been gone " + timePassed + " hours!")
});

function refreshReactions() {
  reactions["hungry"] = petName + " is starving and needs to be fed immediately.";
  reactions["sad"] = petName + " is depressed for unknown reasons.";
  //lowhealthReaction: petName + " has very low health! Take it to a Pokecenter right now!",
  reactions["angry"] = petName + " is angry at you for unknown reasons.";
  reactions["dislike"] = petName + " doesn't seem to be fond of you.";
  reactions["indifferent"] = petName + " seems indifferent about you.";
  reactions["happy"] = petName + " feels happy!";
  reactions["excited"] = petName + " seems extremely excited about " + upcomingEvent;
  reactions["cheerful"] = petName + " assures you that they are here for you!";
  reactions["love"] = petName + " seems to seriously adore you!";
}

window.addEventListener('beforeunload', function (event) {
  var currentDate = new Date().getTime();
  createCookie("lastSeen", currentDate, 365);
  createCookie("exitHunger", scorePercent, 365);
  createCookie("playPoints", playValues, 365);
});

function updateGameArea() {
  myCanvasArea.clear();
  var myComponents = [fillerImage, shopCanvas, rightSideCanvas, botSideCanvas, hungerBar, petFoodOne, petFoodTwo, petFoodThree, petFoodFour, petFoodFive, petFoodSix, petToyOne, petToyTwo, petToyThree, petToyFour, petToyFive, petToySix];
  for (const item of myComponents) {
    item.update();
  }
}
