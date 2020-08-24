var petName;
var gold = 100;
var reactions = {};
var upcomingEvent;
var timePassed;
var pushHunger = 0;
var mainImageVisibility = true;
var listOfFoods = false;
var menuBackground = false;

function startCanvas() {
  fillerImage = new component(0.4*screen.width, 0.5*screen.height, "sloth.png", 0.13*screen.width, 0.105*screen.height, "image", 0, "mainImageVisibility");

  shopCanvas = new component(0.55*screen.width, 0.55*screen.height, "#FBFCFC", 0.065*screen.width, 0.08*screen.height, "backgroundColor", 0, "menuBackground");
  shopClose = new createButton(0.07*screen.width, 0.09*screen.height, 0.13*screen.width, 0.15*screen.height, "closeAll();", "shopClose");

  petFoodOne = new component(0.08*screen.width, 0.11*screen.height, "orange.png", 0.15*screen.width, 0.14*screen.height, "image", 0, "listOfFoods");
  petFoodTwo = new component(0.08*screen.width, 0.11*screen.height, "cat_food.jpg", 0.30*screen.width, 0.14*screen.height, "image", 0, "listOfFoods");
  petFoodThree = new component(0.08*screen.width, 0.13*screen.height, "meat.png", 0.45*screen.width, 0.12*screen.height, "image", 0, "listOfFoods");
  petFoodFour = new component(0.08*screen.width, 0.14*screen.height, "fish_food.jpg", 0.155*screen.width, 0.36*screen.height, "image", 0, "listOfFoods");
  petFoodFive = new component(0.08*screen.width, 0.13*screen.height, "premium_food.jpg", 0.30*screen.width, 0.37*screen.height, "image", 0, "listOfFoods");
  petFoodSix = new component(0.08*screen.width, 0.12*screen.height, "catnip.png", 0.45*screen.width, 0.38*screen.height, "image", 0, "listOfFoods");

  foodOneBuy = new createButton(0.08*screen.width, 0.035*screen.height, 0.204*screen.width, 0.31*screen.height, "purchaseFood(1);", "buyButton", "buyButton");
  foodTwoBuy = new createButton(0.08*screen.width, 0.035*screen.height, 0.35*screen.width, 0.31*screen.height, "purchaseFood(2);", "buyButton", "buyButton");
  foodThreeBuy = new createButton(0.08*screen.width, 0.035*screen.height, 0.5*screen.width, 0.31*screen.height, "purchaseFood(3);", "buyButton", "buyButton");
  foodFourBuy = new createButton(0.08*screen.width, 0.035*screen.height, 0.204*screen.width, 0.56*screen.height, "purchaseFood(4);", "buyButton", "buyButton");
  foodFiveBuy = new createButton(0.08*screen.width, 0.035*screen.height, 0.35*screen.width, 0.56*screen.height, "purchaseFood(5);", "buyButton", "buyButton");
  foodFiveBuy = new createButton(0.08*screen.width, 0.035*screen.height, 0.5*screen.width, 0.56*screen.height, "purchaseFood(6);", "buyButton", "buyButton");

  foodOneFeed = new createButton(0.08*screen.width, 0.035*screen.height, 0.204*screen.width, 0.31*screen.height, "", "petFoodOne", "useButton");
  foodTwoFeed = new createButton(0.08*screen.width, 0.035*screen.height, 0.35*screen.width, 0.31*screen.height, "", "petFoodTwo", "useButton");
  foodThreeFeed = new createButton(0.08*screen.width, 0.035*screen.height, 0.5*screen.width, 0.31*screen.height, "", "petFoodThree", "useButton");
  foodFourFeed = new createButton(0.08*screen.width, 0.035*screen.height, 0.204*screen.width, 0.56*screen.height, "", "petFoodFour", "useButton");
  foodFiveFeed = new createButton(0.08*screen.width, 0.035*screen.height, 0.35*screen.width, 0.56*screen.height, "", "petFoodFive", "useButton");
  foodFiveFeed = new createButton(0.08*screen.width, 0.035*screen.height, 0.5*screen.width, 0.56*screen.height, "", "petFoodSix", "useButton");

  shopNextPage = new createButton(0.07*screen.width, 0.09*screen.height, 0.615*screen.width, 0.64*screen.height, "nextShop();", "nextShop", "shopPage");
  shopBackPage = new createButton(0.07*screen.width, 0.09*screen.height, 0.13*screen.width, 0.64*screen.height, "backShop();", "backShop", "shopPage");

  rightSideCanvas = new component(0.22*screen.width, 0.8*screen.height, "#20B2AA", 0.68*screen.width, 0, "color");
  botSideCanvas = new component(0.68*screen.width, 0.1*screen.height, "#FFDAB9", 0, 0.7*screen.height, "color");

  buttonOne = new createButton(0.17*screen.width, 0.06*screen.height, 0.755*screen.width, 0.1*screen.height, "createInventoryComponents();", "buttonOne", "menuButton");
  buttonTwo = new createButton(0.17*screen.width, 0.06*screen.height, 0.755*screen.width, 0.2*screen.height, "pushHunger = 10;", "buttonTwo", "menuButton");
  buttonThree = new createButton(0.17*screen.width, 0.06*screen.height, 0.755*screen.width, 0.3*screen.height, "openShop();", "buttonThree", "menuButton");
  buttonFour = new createButton(0.17*screen.width, 0.06*screen.height, 0.755*screen.width, 0.4*screen.height, "openInventory();", "buttonFour", "menuButton");
  // Currently, the hungerBar reduces to zero in a minute.
  hungerBar = new component(0.177*screen.width, 0.04*screen.height, "#F7B267", 0.7*screen.width, 0.5*screen.height, "scoreBar", (20 / (60 * 60 * 1000)) * 0.177*screen.width);
  // Credits to Benjamin "Sean's Schlong's Long" Avery and Sean "Stopwatch" Hou
  myCanvasArea.start();
}

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

function createButton(width, height, x, y, output, id, buttonClass) {
  this.buttonCanvas = document.createElement("canvas");
  this.buttonCanvas.width = width;
  this.buttonCanvas.height = height;
  this.buttonCanvas.id = id;
  this.buttonCanvas.classList.add(buttonClass);
  // The code above assigns the width, height, id and class
  this.context = this.buttonCanvas.getContext("2d");
  document.body.insertBefore(this.buttonCanvas, document.body.childNodes[0]);
  // ^ Appends the <canvas> tag below the <body> tag in html ^
  var buttonStyling = document.getElementById(id);
  buttonStyling.style.left = x + "px";
  buttonStyling.style.top = y + "px";
  // The code below adds an event which runs upon clicking the canvas
  this.buttonCanvas.addEventListener('click', function(event) {
    eval(output); // Runs the output code
  }, false);
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
      ctx.fillStyle = "#3B444B";
      ctx.fillRect(this.x, this.y, this.width + 5, this.height);
      ctx.fillStyle = color;
      ctx.fillRect(this.x, this.y, scoreWidth, this.height);
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
    canvasFont(ctx, "30px Palatine Linotype", "red");
    ctx.fillText(reactions.love, 0.34*screen.width, 0.77*screen.height);
    canvasFont(ctx, "25px Palatine Linotype", "gold");
    ctx.fillText("Your Gold: " + gold, 0.79*screen.width, 0.48*screen.height);
  }
}

function canvasFont(ctx, style, color) {
  ctx.font = style;
  ctx.fillStyle = color;
  ctx.textAlign = "center";
}

function askPetName() {
  alertify.prompt( "What's your pet's name?", 'Enter Pet Name:', 'Pet'
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

function updateEmotion(personality) {
  if (emotions.affection > 80 && emotions.loneliness < 30) {
    // Derive an algorithm to accurately update emotion.
    return reactions.love;
  }
}

var petFoods = {
  petFoodOne: 0,
  petFoodTwo: 0,
  petFoodThree: 0,
  petFoodFour: 0,
  petFoodFive: 0,
  petFoodSix: 0
}

function purchaseFood(foodNumber) {
  // TODO: Functionality to purchase multiple.
  switch(foodNumber) {
    case 1:
      if (gold >= 5) {
        alertify.confirm('Buying Confimation', 'Are you sure you wanna buy this product?'
                , function(){ gold -= 5; petFoods.petFoodOne += 1; }
                , function(){});
      }
      break;
    case 2:
      if (gold >= 10) {
        gold -= 10;
        petFoods.petFoodTwo += 1;
      }
      break;
    case 3:
      if (gold >= 15) {
        gold -= 15;
        petFoods.petFoodThree += 1;
      }
      break;
    case 4:
      if (gold >= 25) {
        gold -= 25;
        petFoods.petFoodFour += 1;
      }
      break;
    case 5:
      if (gold >= 50) {
        gold -= 50;
        petFoods.petFoodFive += 1;
      }
      break;
    case 6:
      if (gold >= 100) {
        gold -= 100;
        petFoods.petFoodSix += 1;
      }
      break;
  }
}

function openShop() {
  mainImageVisibility = false;
  listOfFoods = true;
  menuBackground = true;
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

function updateInventoryComponents() {
  var availableFoods = [];
  var petFoodTypes = Object.keys(petFoods);
  for (var i = 0; i < petFoodTypes.length; i++) {
    console.log(petFoods[petFoodTypes[i]]);
    if (petFoods[petFoodTypes[i]] >= 1) {
      availableFoods.push(petFoodTypes[i]);
    }
  }
  for (var i = 0; i < availableFoods.length; i++) {
    var usableButton = document.getElementById(availableFoods[i]);
    usableButton.style.backgroundColor = "#228B22";
  }
}

function openInventory() {
  mainImageVisibility = false;
  menuBackground = true;
  listOfFoods = true;
  updateInventoryComponents();
  var useButton = document.getElementsByClassName('useButton');
  for (var i = 0; i < useButton.length; i++) {
    useButton[i].style.visibility = 'visible';
  }
  document.getElementById('shopClose').style.visibility = 'visible';
}

function closeAll() {
  mainImageVisibility = true;
  listOfFoods = false;
  menuBackground = false;
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

$( document ).ready(function(event) {
  var currentDate = new Date().getTime();
  var previousDate = readCookie("lastSeen");
  timePassed = ((currentDate-previousDate) / (1000 * 60 * 60)).toFixed(1);
  // eraseCookie('petName');
  if (readCookie("petName") == null) { askPetName(); }
  petName = readCookie("petName");
  refreshReactions();
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
  console.log(currentDate);
  createCookie("lastSeen", currentDate, 365);
});

function updateGameArea() {
  myCanvasArea.clear();
  var myComponents = [fillerImage, shopCanvas, rightSideCanvas, botSideCanvas, hungerBar, petFoodOne, petFoodTwo, petFoodThree, petFoodFour, petFoodFive, petFoodSix];
  for (const item of myComponents) {
    item.update();
  }
}
