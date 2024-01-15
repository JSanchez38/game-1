class Character {
    constructor(ctx, x, y) {
        this.ctx = ctx
        
        this.x = x
        this.vx = CHARACTER_MOVE_XY

        this.y = y
        this.vy = CHARACTER_MOVE_XY

        this.w = CHARACTER_W
        this.h = CHARACTER_H

        this.movements = {
            right: false,
            left: false,
            up: false,
            down: false,
            isShutting: false
        }

        this.bullets = []

    }

    onKeyEvent(event) {
        const enabled = event.type === 'keydown'

        switch(event.keyCode) {
            case KEY_RIGHT:
                this.movements.right = enabled
                break
            case KEY_LEFT:
                this.movements.left = enabled
                break
            case KEY_UP:
                this.movements.up = enabled
                break
            case KEY_DOWN:
                this.movements.down = enabled
                break
            case KEY_FIRE_RIGHT:
                if (enabled) {
                    this.fire()
                }
                break
            case KEY_FIRE_LEFT:
                if (enabled) {
                    this.fire()
                }
                break
            case KEY_FIRE_UP:
                if (enabled) {
                    this.fire()
                }
                break
            case KEY_FIRE_DOWN:
                if (enabled) {
                    this.fire()
                }
                break
        }
    }


    move() {

        this.bullets.forEach((bullet) => bullet.move())

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

    fire() {
        if (!this.movements.isShutting) {
            this.movements.isShutting = true

            this.bullets.push(new Bullet(this.ctx, this.x + this.w, this.y + Math.ceil(this.h / 2)))
            
            setTimeout(() => this.movements.isShutting = false, CHARACTER_BULLET_BACK_OFF)
        }
    }

    clear() {
        this.bullets = this.bullets.filter((bullet) => bullet.x < this.ctx.canvas.width)
    }

    draw() {
        this.ctx.fillRect(this.x, this.y, this.w, this.h)

        this.bullets.forEach((bullet) => bullet.draw())
    }
}