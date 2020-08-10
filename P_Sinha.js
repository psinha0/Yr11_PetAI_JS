var myGamePiece;
var healthBar;
var fillerImage;
var mainGems = 1000;
var petName = 0;
var upcomingEvent = 0;
var rightSideCanvas;
var botSideCanvas;

function startCanvas() {
  fillerImage = new component(0.4*screen.width, 0.5*screen.height, "sloth.png", 0.13*screen.width, 0.105*screen.height, "image");
  rightSideCanvas = new component(0.22*screen.width, 0.8*screen.height, "#20B2AA", 0.68*screen.width, 0, "color");
  botSideCanvas = new component(0.68*screen.width, 0.1*screen.height, "#FFDAB9", 0, 0.7*screen.height, "color");
  buttonOne = new createButton(0.755*screen.width, 0.1*screen.height, "alert('hi')");
  buttonTwo = new createButton(0.755*screen.width, 0.2*screen.height, "alert('byebye')");
  buttonThree = new createButton(0.755*screen.width, 0.3*screen.height, "alert('no i do not')");
  healthBar = new component(400, 30, "#F7B267", 500, 500, "scoreBar", 1);
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

function createButton(x, y, output) {
  this.buttonCanvas = document.createElement("canvas");
  this.buttonCanvas.width = 0.17*screen.width;
  this.buttonCanvas.height = 0.06*screen.height;
  this.buttonCanvas.id = "buttonCanvas";
  this.context = this.buttonCanvas.getContext("2d");
  document.body.insertBefore(this.buttonCanvas, document.body.childNodes[0]);
  var buttonStyling = document.getElementById("buttonCanvas");
  buttonStyling.style.left = x + "px";
  buttonStyling.style.top = y + "px";
  this.buttonCanvas.addEventListener('click', function(event) {
    eval(output);
  }, false);
}

function component(width, height, color, x, y, type, rate=0) {
  this.type = type;
  if (type == "image" || type == "background") {
    this.image = new Image();
    this.image.src = color;
  }
  this.width = width;
  var scoreWidth = width;
  this.height = height;
  this.x = x;
  this.y = y;
  this.rate = rate;
  this.update = function() {
    ctx = myCanvasArea.context;
    // ctx.fillText(updateEmotion(personality), x, y);
    if (type == "image" || type == "background") {
        ctx.drawImage(this.image,
        this.x,
        this.y,
        this.width, this.height);
    if (type == "background") {
      ctx.drawImage(this.image,
        this.x + this.width,
        this.y,
        this.width, this.height);
      }
    }
    else if (type == "scoreBar") {
      ctx.fillStyle = color;
      if (scoreWidth > 0) {
        scoreWidth = scoreWidth - this.rate;
      }
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

function updateGameArea() {
  myCanvasArea.clear();
  var myComponents = [healthBar, fillerImage, rightSideCanvas, botSideCanvas];
  for (const item of myComponents) {
    item.update();
  }
}
