const Game = {
  canvas: undefined,
  ctx: undefined,
  width: undefined,
  height: undefined,
  fps: 60,
  platforms: [],
  framesCounter: 0,

  //score: 0,
  //scoreboard: undefined,

  actualPlatform: undefined,
  roofPlatform: undefined,
  frontPlatform: undefined,
  keys: {
    TOP_KEY: 38,
    SPACE: 32
  },



  init: function () {
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.width = window.innerWidth * 0.8;
    this.height = window.innerHeight * 0.95;
    this.canvas.width = this.width;
    this.canvas.height = this.height;

    this.start();
  },

  start() {
    this.reset();
    this.interval = setInterval(() => {
      this.framesCounter++;
      if (this.framesCounter > 1000) this.framesCounter = 0;

      this.generatePlatforms();
      this.clear();
      this.drawAll();
      this.moveAll();

      this.clearPlatforms();

      this.isCollision();

      //Aumentamos la puntuación cada X frames.
      if (this.framesCounter % 60 == 0) this.score++;

      if (this.player.posY >= this.height || this.player.posY + 120 <= 0 || this.player.posX + 85 <= 0) {
        this.gameOver()
        alert("Your game is over because you suck. It's no one else's fault but your mediocre skills and terrible attitude towards life. You're beyond help.")

      }
    }, 1000 / this.fps);
  },

  reset() {
    this.background = new Background(this.ctx, this.width, this.height);
    this.player = new Player(this.ctx, this.canvas.width, this.canvas.height, this.keys);
    this.platforms = [];

    this.scoreboard = ScoreBoard;
    this.scoreboard.init(this.ctx);
    this.score = 0;

    this.startingPlatform();
  },

  drawAll() {
    this.background.draw();
    this.player.draw(this.framesCounter);
    this.platforms.forEach(plat => plat.draw());

    this.drawScore();
  },

  moveAll() {
    this.background.move();
    this.player.move();
    this.platforms.forEach(plat => plat.move());


  },

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },

  //Platform part

  startingPlatform() {
    this.platforms.push(new Platform(this.ctx, this.canvas.width, this.canvas.height, 0, 500, 1500))
    //this.platforms.push(new Platform(this.ctx, this.canvas.width, this.canvas.height, 1100, 0, 200))

  },

  generatePlatforms() {
    if (this.framesCounter % 100 == 0) {
      this.platforms.push(new Platform(this.ctx, this.canvas.width, this.canvas.height, 900, Math.floor(Math.random() * 50) , 100 + Math.floor(Math.random() * 100)))
      this.platforms.push(new Platform(this.ctx, this.canvas.width, this.canvas.height, 1350, 450 + Math.floor(Math.random() * 50), 100 + Math.floor(Math.random() * 100)))
    }
    if (this.framesCounter % 50 == 0) {
      this.platforms.push(new Platform(this.ctx, this.canvas.width, this.canvas.height, 1100, 225 + Math.floor(Math.random() * 50), 50 + Math.floor(Math.random() * 100)))

    }
  },

  clearPlatforms() {
    this.platforms.forEach((plat, i) => {
      if (plat.posX <= 0 - this.width) {
        this.platforms.splice(i, 1)
      }
    })
  },

  isCollision() {
    // funcion para comprobar colisiones
    this.actualPlatform = this.platforms.find(plat => {

      return ((
        this.player.posX + this.player.width >= plat.posX + 10 &&
        this.player.posY + this.player.height >= plat.posY &&
        this.player.posX <= plat.posX + plat.width &&
        this.player.posY < plat.posY + plat.height &&
        this.player.velY > 0
      ))
    }
    );
    this.roofPlatform = this.platforms.find(plat => {

      return ((
        this.player.posX + this.player.width >= plat.posX + 10 &&
        this.player.posY + this.player.height >= plat.posY &&
        this.player.posX <= plat.posX + plat.width &&
        this.player.posY < plat.posY + plat.height &&
        this.player.velY < 0
      ))
    }
    );
    this.frontPlatform = this.platforms.find(plat => {

      return ((
        this.player.posX + this.player.width >= plat.posX - 20 &&
        this.player.posY + this.player.height >= plat.posY + 20 &&
        this.player.posX <= plat.posX + plat.width &&
        this.player.posY < plat.posY + plat.height - 20
      ))
    }
    );


    //Colisión frontal
    if (this.frontPlatform) {
      this.player.frontCrash = true
      this.player.frontPlatform = this.frontPlatform
      ////console.log(this.score)
    }

    if (this.player.gravity > 0) {
      if (this.actualPlatform) {
        this.player.flipBack()
        this.player.posY0 = this.actualPlatform.posY - this.player.height 
        this.player.posY = this.player.posY0
      } else {
        this.player.posY0 = this.height //+ //this.player.height
      }
    } else if (this.player.gravity < 0) {
      if (this.roofPlatform) {
        this.player.flipImage()
        this.player.posY0 = this.roofPlatform.posY + this.roofPlatform.height 
        this.player.posY = this.player.posY0
      } else {
        this.player.posY0 = this.height
      }
    } else { alert("algo va mal") }
  },

  drawScore() {
    //con esta funcion pintamos el marcador
    this.scoreboard.update(this.score);
  },

  gameOver() {
    clearInterval(this.interval);
  }





}