class Bullet {

    constructor(ctx, x, y) {
        this.ctx = ctx
        
        this.x = x
        this.vx = SPEED_BULLET

        this.y = y
        this.vy = SPEED_BULLET
        this.w = 10
        this.h = 10

        this.bulletMovements = {
            right: false,
            left: false,
            up: false,
            down: false
        }
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
        this.ctx.fillRect(this.x, this.y, this.w, this.h)
    }
}