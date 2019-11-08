class Platform {
  constructor(ctx, canvasW, canvasH, posX, posY, width) {
    this.ctx = ctx;
    this.width = width;
    this.height = 45;
    this.velX = 8;
    this.posX = posX;
    this.posY = posY 
  }

  draw() {
    this.ctx.fillStyle = "grey";
    this.ctx.fillRect(this.posX, this.posY, this.width, this.height);
  }

  move() {
    this.posX -= this.velX
  }


}