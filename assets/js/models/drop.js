class Drop {

    constructor (ctx, x, y) {
        this.ctx = ctx

        this.x = x
        this.y = y
        this.w = 40
        this.h = 40

        this.sprite = new Image()
        this.sprite.src = '/assets/img/sprites/tear.png'

        this.sprite.onload = () => {
            this.sprite.isReady = true
        }
    }

    draw() {
        if (this.sprite.isReady) {
            this.ctx.drawImage(
                this.sprite,
                this.x,
                this.y,
                this.w,
                this.h
            )
        }
    }
}