class Drop {
    constructor(ctx, x, y) {
        this.ctx = ctx

        this.x = x
        this.y = y
        this.w = 20
        this.h = 20

        
        this.sprite = new Image()
        this.sprite.src = '/assets/img/sprites/drop.png'
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

    collidesWith(element) {
        return (
            this.x < element.x + element.w &&
            this.x + this.w > element.x &&
            this.y < element.y + element.h &&
            this.h + this.y > element.y
        )
    }

}