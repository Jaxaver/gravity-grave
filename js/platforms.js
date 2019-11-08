class Platform {
  constructor(ctx, canvasW, canvasH, posX, posY, width) {
    this.ctx = ctx;
    this.width = width;
    this.height = 45;
    this.velX = 9;
    this.posX = posX;
    this.posY = posY //generar aleatoriamente a posteriori
  }

  draw() {
    this.ctx.fillStyle = "white";
    this.ctx.fillRect(this.posX, this.posY, this.width, this.height);
  }

  move() {
    this.posX -= this.velX
  }


}