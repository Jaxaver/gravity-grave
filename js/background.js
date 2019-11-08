class Background {
    constructor(ctx, w, h) {
        this.ctx = ctx
        this.width = w
        this.height = h

        this.image = new Image()
        this.image.src = "img/bg_1_1.png"

        this.posX = 0
        this.posY = 0

        this.bgSpeed = 2
    }

   // gameOverImage() {
   //     this.image.src =
   // }

    draw() {

        this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height)
        this.ctx.drawImage(this.image, this.posX + this.width, this.posY, this.width, this.height)

    }

    move() {

        this.posX -= this.bgSpeed

        if (this.posX <= -this.width) 
            { this.posX = 0}
    }
}