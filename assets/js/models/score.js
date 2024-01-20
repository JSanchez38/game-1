class Score {
    constructor(ctx, x, y,) {
        this.ctx = ctx

        this.x = x
        this.y = y
        this.w = Math.ceil(278 / 6)
        this.h = Math.ceil(265 / 6)

        this.sprite = new Image()
        this.sprite.src ='/assets/img/sprites/calavera.png'
        this.sprite.onload = () => {
            this.sprite.isReady = true
        }

        this.points = 0
    }

    increment() {
        this.points++
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
            
            this.ctx.save()
            this.ctx.font = '30px Arial'
            this.ctx.fillText(this.points, this.x + this.w + 15, this.y + 32)
            this.ctx.restore()
        }
    }
}