var mainGems = 1000;
var petName = 0;
var upcomingEvent;
var timePassed;
var pushHunger = 0;
var mainImageVisibility = true;
var foodShopMenu = false;

function startCanvas() {
  fillerImage = new component(0.4*screen.width, 0.5*screen.height, "sloth.png", 0.13*screen.width, 0.105*screen.height, "image", 0, "mainImageVisibility");

  catFoodOne = new component(0.07*screen.width, 0.10*screen.height, "cat_food.jpg", 0.08*screen.width, 0.1*screen.height, "image", 0, "foodShopMenu");
  catFoodTwo = new component(0.07*screen.width, 0.10*screen.height, "cat_food.jpg", 0.19*screen.width, 0.1*screen.height, "image", 0, "foodShopMenu");
  catFoodThree = new component(0.07*screen.width, 0.10*screen.height, "cat_food.jpg", 0.30*screen.width, 0.1*screen.height, "image", 0, "foodShopMenu");
  catFoodFour = new component(0.07*screen.width, 0.10*screen.height, "cat_food.jpg", 0.41*screen.width, 0.1*screen.height, "image", 0, "foodShopMenu");
  catFoodFive = new component(0.07*screen.width, 0.10*screen.height, "cat_food.jpg", 0.52*screen.width, 0.1*screen.height, "image", 0, "foodShopMenu");

  foodOneBuy = new createButton(0.07*screen.width, 0.03*screen.height, 0.13*screen.width, 0.25*screen.height, "catFoods.catFoodOne += 1;", "buyButtonOne", "buyButton");

  rightSideCanvas = new component(0.22*screen.width, 0.8*screen.height, "#20B2AA", 0.68*screen.width, 0, "color");
  botSideCanvas = new component(0.68*screen.width, 0.1*screen.height, "#FFDAB9", 0, 0.7*screen.height, "color");

  buttonOne = new createButton(0.17*screen.width, 0.06*screen.height, 0.755*screen.width, 0.1*screen.height, "alertify.alert('hi')", "buttonOne", "menuButton");
  buttonTwo = new createButton(0.17*screen.width, 0.06*screen.height, 0.755*screen.width, 0.2*screen.height, "pushHunger = 10;", "buttonTwo", "menuButton");
  buttonThree = new createButton(0.17*screen.width, 0.06*screen.height, 0.755*screen.width, 0.3*screen.height, "openShop();", "buttonThree", "menuButton");
  buttonFour = new createButton(0.17*screen.width, 0.06*screen.height, 0.755*screen.width, 0.4*screen.height, "alert(catFoods.catFoodOne);", "buttonFour", "menuButton");
  // Currently, the hungerBar reduces to zero in a minute.
  hungerBar = new component(0.177*screen.width, 0.04*screen.height, "#F7B267", 0.7*screen.width, 0.5*screen.height, "scoreBar", (20 / (60 * 1000)) * 0.177*screen.width);
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
  if (type == "image" || type == "background") {
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
    if (type == "image" || type == "background") {
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
    else {
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    ctx.font = "30px Palatino Linotype";
    ctx.fillStyle = "red";
    ctx.textAlign = "center";
    ctx.fillText(reactions.love, 0.34*screen.width, 0.77*screen.height);
  }
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

var reactions = {
  hungry: petName + " is starving and needs to be fed immediately.",
  // Ben helped me with hungry reaction. Credits to Benjamin David Avery [24/07/2020].
  sad: petName + " is depressed for unknown reasons.",
  //lowhealthReaction: petName + " has very low health! Take it to a Pokecenter right now!",
  angry: petName + " is angry at you for unknown reasons.",
  dislike: petName + " doesn't seem to be fond of you.",
  indifferent: petName + " seems indifferent about you.",
  happy: petName + " feels happy!",
  excited: petName + " seems extremely excited about " + upcomingEvent,
  cheerful: petName + " assures you that they are here for you!",
  love: petName + " seems to seriously adore you!"
}

function updateEmotion(personality) {
  if (emotions.affection > 80 && emotions.loneliness < 30) {
    // Derive an algorithm to accurately update emotion.
    return reactions.love;
  }
}

var catFoods = {
  catFoodOne: 0,
  catFoodTwo: 0,
  catFoodThree: 0,
  catFoodFour: 0,
  catFoodFive: 0
}

function openShop() {
  mainImageVisibility = false;
  foodShopMenu = true;
  var buyButton = document.getElementsByClassName('buyButton');
  for (var i = 0; i < buyButton.length; i++) {
    buyButton[i].style.visibility = 'visible';
  }
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
  // timePassed = ((currentDate-previousDate) / (1000 * 60 * 60)).toFixed(1);
  timePassed = ((currentDate-previousDate) / (1000)).toFixed(1);
  // alert("You have been gone " + timePassed + " seconds!")
});

window.addEventListener('beforeunload', function (event) {
  var currentDate = new Date().getTime();
  console.log(currentDate);
  eraseCookie("lastSeen");
  createCookie("lastSeen", currentDate, 365);
});

function updateGameArea() {
  myCanvasArea.clear();
  var myComponents = [fillerImage, rightSideCanvas, botSideCanvas, hungerBar, catFoodOne, catFoodTwo, catFoodThree, catFoodFour, catFoodFive];
  for (const item of myComponents) {
    item.update();
  }
}
