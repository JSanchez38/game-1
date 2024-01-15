class Bullet {

    constructor(ctx, x, y) {
        this.ctx = ctx
        
        this.x = x
        this.vx = SPEED_BULLET

        this.y = y
        this.vy = SPEED_BULLET
        this.w = 10
        this.h = 10

        this.movements = {
            right: false,
            left: false,
            up: false,
            down: false
        }
    }

    onKeyEvent(event) {
        const enabled = event.type === 'keydown'

        switch(event.keyCode) {
            case KEY_FIRE_RIGHT:
                this.movements.right = enabled
                break
            case KEY_FIRE_LEFT:
                this.movements.left = enabled
                break
            case KEY_FIRE_UP:
                this.movements.up = enabled
                break
            case KEY_FIRE_DOWN:
                this.movements.down = enabled
                break       
        }
            
    }


    move() {
        if (this.movements.right) {
            this.x += this.vx
        } else if (this.movements.left) {
            this.x -= this.vx
        } else if (this.movements.up) {
            this.y -= this.vy
        } else if (this.movements.down) {
            this.y += this.vy
        }
    }

    draw() {
        this.ctx.fillRect(this.x, this.y, this.w, this.h)
    }
}