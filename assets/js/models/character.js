class Character {
    constructor(ctx, x, y) {
        this.ctx = ctx
        
        this.x = x
        this.vx = CHARACTER_MOVE_XY

        this.y = y
        this.vy = CHARACTER_MOVE_XY

        this.w = 24 * 1.5
        this.h = 34 * 1.5

        this.sprite = new Image()

        this.sprite.src = '/assets/img/sprites/character-sprite.png'
        this.sprite.verticalFrames = 1
        this.sprite.horizontalFrames = 8
        this.sprite.verticalFrameIndex = 0
        this.sprite.horizontalFrameIndex = 0

        this.sprite.onload = () => {
            this.sprite.isReady = true
            this.sprite.frameWidth = Math.ceil(this.sprite.width / this.sprite.horizontalFrames)
            this.sprite.frameHeight = Math.ceil(this.sprite.height / this.sprite.verticalFrames)
        }

        this.movements = {
            right: false,
            left: false,
            up: false,
            down: false,
            isShutting: false
        }

        this.bullets = []
        this.life = 3
        this.animationTick = 0

        this.hitted = false

    }

    hit() {
        if (this.hitted) {
            return false
        }

        this.hitted = true

        this.life -= 1

        window.setTimeout(() => {
            this.hitted = false
        }, 2_000)

        return true
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
                    this.fire({ right: true })
                }
                break
            case KEY_FIRE_LEFT:
                if (enabled) {
                    this.fire({ left: true })
                }
                break
            case KEY_FIRE_UP:
                if (enabled) {
                    this.fire({ up: true })
                }
                break
            case KEY_FIRE_DOWN:
                if (enabled) {
                    this.fire({ down: true })
                }
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

        this.bullets.forEach((bullet) => bullet.move())

    }

    fire(movement) {
        
        if (!this.movements.isShutting) {
            this.movements.isShutting = true

            this.bullets.push(new Bullet(this.ctx, this.x + Math.ceil(this.w / 2), this.y + Math.ceil(this.h / 2), movement))
            
            setTimeout(() => this.movements.isShutting = false, CHARACTER_BULLET_BACK_OFF)
        }
    }

    clear() {
        this.bullets = this.bullets.filter((bullet) => {
            return (
                bullet.x > 0 &&
                bullet.x < this.ctx.canvas.width &&
                bullet.y > 0 &&
                bullet.y < this.ctx.canvas.height
            ) 
        })

    }

    draw() {

        if (this.sprite.isReady) {
            this.ctx.drawImage(
                this.sprite,
                this.sprite.horizontalFrameIndex * this.sprite.frameWidth,
                this.sprite.verticalFrameIndex * this.sprite.frameWidth,
                this.sprite.frameWidth,
                this.sprite.frameHeight,
                this.x,
                this.y,
                this.w,
                this.h
                )
        }

        this.bullets.forEach((bullet) => bullet.draw())
        this.animate()
    }

    animate() {
        this.animationTick++


        if (this.animationTick >= CHARACTER_RUN_ANIMATION_TICK && (this.movements.down || this.movements.right || this.movements.up)) {
            this.animationTick = 0
            this.sprite.horizontalFrameIndex++
            
            if (this.sprite.horizontalFrameIndex > this.sprite.horizontalFrames - 5) {
                this.sprite.horizontalFrameIndex = 0
            }
        /* isaac sprite
        } else if (this.animationTick >= CHARACTER_RUN_ANIMATION_TICK && (this.movements.left)) {
            this.animationTick = 0
            this.sprite.horizontalFrameIndex++

            if (this.sprite.horizontalFrameIndex > this.sprite.horizontalFrames - 1) {
                this.sprite.horizontalFrameIndex = 0
            }
        } else if (this.animationTick >= CHARACTER_RUN_ANIMATION_TICK && (this.movements.right)) {
            this.animationTick = 0
            this.sprite.horizontalFrameIndex++


            if (this.sprite.horizontalFrameIndex > this.sprite.horizontalFrameIndex - 1) {
                this.sprite.horizontalFrameIndex = 0
            }
        } else if (this.animationTick >= CHARACTER_RUN_ANIMATION_TICK && (this.movements.up)) {
            this.animationTick = 0
            this.sprite.horizontalFrameIndex++
            

            if (this.sprite.horizontalFrameIndex > this.sprite.horizontalFrameIndex -1) {
                this.sprite.horizontalFrameIndex = 0
            }*/
        } else if (this.animationTick >= CHARACTER_RUN_ANIMATION_TICK && (this.movements.left)) {
            this.animationTick = 0
            this.sprite.horizontalFrameIndex++ 

            if (this.sprite.horizontalFrameIndex > this.sprite.horizontalFrames - 1) {
                this.sprite.horizontalFrameIndex = 4

            }    
        } else if (!this.movements.down && !this.movements.left && !this.movements.right && !this.movements.up) {
            this.sprite.horizontalFrameIndex = 0
        }
    }


}
