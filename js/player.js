class Player {
  constructor(ctx, w, h, keys) {
    this.ctx = ctx;
    this.gameWidth = w;
    this.gameHeight = h;

    this.frontPlatform = undefined
    this.image = new Image();
    this.image.src = "img/player.png";

    this.width = 90;
    this.height = 100;

    this.posX = 300; // la puedo cagar aquí
    this.posY0 = 400; // aquí también
    this.posY = this.posY0;
    this.directions = {
      top: false,
      top_arrow: false
    }
    this.canJump = true
    this.canReverse = true

    this.velY = 100;
    this.velX = 0;
    this.gravity = 0.32;

    this.image.frames = 4
    this.image.framesIndex = 0

    this.keys = keys;


    this.frontCrash = false;
    this.setListeners();
  }

  draw(framesCounter) {
    this.ctx.drawImage(
      this.image,
      this.image.framesIndex * Math.floor(this.image.width / this.image.frames),
      0,
      Math.floor(this.image.width / this.image.frames),
      this.image.height,
      this.posX,
      this.posY,
      this.width,
      this.height
    );
    this.animate(framesCounter);
  }

  flipImage() {
    this.image.src = "img/player-rev.png"           // inversión sprite
  }

  flipBack() {
    this.image.src = "img/player.png"
  }

  move() {

    if (this.frontCrash) {

      this.posX -= this.frontPlatform.velX
      this.frontCrash = false
    }


    if (this.posY >= this.posY0) {

      this.velY = 1;
      this.posY = this.posY0;
      this.canJump = true
      this.canReverse = true
    }
    else {
      this.velY += this.gravity;
      this.posY += this.velY;
    }

  }

  animate(framesCounter) {
    if (framesCounter % 6 == 0) {
      this.image.framesIndex++;
      if (this.image.framesIndex > 3) {
        this.image.framesIndex = 0;
      }
    }
  }

  setListeners() {
    document.onkeydown = e => {
      switch (e.keyCode) {
        case this.keys.TOP_KEY:

          this.directions.top_arrow = true
          if (this.directions.top_arrow && this.canJump) {
            this.canJump = false
            
            if (this.gravity>0) {
              this.posY -= 8
              this.velY -= 8  
            } else {
              this.posY += 8
              this.velY += 8
            }
          }



          break;

        case this.keys.SPACE:
          this.directions.top = true

          if (this.directions.top && this.canReverse) {
            this.canReverse = false
            this.gravity *= -1;
            this.velY = 0;

            if (this.gravity < 0) {
              this.posY -= 15
            }
            else {
              this.posY += 15
            }
          }

          break;
      }
    };
    document.onkeyup = e => {
      switch (e.keyCode) {
        case this.keys.SPACE:

          this.directions.top = false
          break;

        case this.keys.TOP_KEY:

          this.directions.top_arrow = false
          break;

      }
    };
  }




}