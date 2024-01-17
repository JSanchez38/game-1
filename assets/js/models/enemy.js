class Enemy {
    constructor(ctx, x, y) {
        this.ctx = ctx
        
        this.x = x
        this.vx = ENEMY_SPEED_MOVE
        this.y = y
        this.w = 30 * 2
        this.h = 20 * 2

        this.sprite = new Image()
        this.sprite.src = '/assets/img/sprites/enemy.png'

        this.sprite.verticalFrames = 1
        this.sprite.horizontalFrames = 6
        this.sprite.verticalFrameIndex = 0
        this.sprite.horizontalFrameIndex = 0

        this.sprite.onload = () => {
            this.sprite.isReady = true
            this.sprite.frameWidth = Math.ceil(this.sprite.width / this.sprite.horizontalFrames)
            this.sprite.frameHeight = Math.ceil(this.sprite.height / this.sprite.verticalFrames)
        }
        
        this.animationTick = 0
        this.lives = 1
        

    }

    isDead() {
        return this.lives <= 0
    }

    draw() {

        if (this.sprite.isReady) {
            this.ctx.drawImage(
                this.sprite,
                this.sprite.horizontalFrameIndex * this.sprite.frameWidth,
                this.sprite.verticalFrameIndex * this.sprite.frameHeight,
                this.sprite.frameWidth,
                this.sprite.frameHeight,
                this.x,
                this.y,
                this.w,
                this.h
            )
        }
        this.animate()
    }

    move() {
        this.x += this.vx
    }


    animate() {
        this.animationTick++

        if (this.animationTick >= ENEMY_RUN_ANIMATION_TICK) {
            this.animationTick = 0
            this.sprite.horizontalFrameIndex++

            if(this.sprite.horizontalFrameIndex > this.sprite.horizontalFrames - 1) {
                this.sprite.horizontalFrameIndex = 0
            }
        }
    }

    collidesWith(element) {
        return (
            this.x + this.w > element.x &&
            this.x < element.x + element.w &&
            this.y + this.h > element.h &&
            this.y < element.y + element.h
        )
    }

}