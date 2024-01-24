class Bullet {

    constructor(ctx, x, y, movement) {
        this.ctx = ctx
        
        this.x = x
        this.vx = SPEED_BULLET

        this.y = y
        this.vy = SPEED_BULLET
        this.w = 8 * 1.5
        this.h = 8 * 1.5

        this.sprite = new Image()
        this.sprite.src = '/assets/img/sprites/bullet.png'

        this.sprite.onload = () => {
            this.sprite.isReady = true
        }

        this.bulletMovements = movement
    }


    move() {
        if (this.bulletMovements.right) {
            this.x += this.vx
        } else if (this.bulletMovements.left) {
            this.x -= this.vx
        } else if (this.bulletMovements.up) {
            this.y -= this.vy
        } else if (this.bulletMovements.down) {
            this.y += this.vy
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