class Life {
    constructor(ctx, x ,y) {
        this.ctx = ctx

        this.x = x 
        this.y = y
        this.w = 50 * 2
        this.h = 15 * 2


        this.sprite = new Image()

        this.sprite.src = '/assets/img/sprites/life1.png'
        this.sprite.verticalFrames = 3
        this.sprite.horizontalFrames = 1
        this.sprite.verticalFrameIndex = 0
        this.sprite.horizontalFrameIndex = 0
        
        this.sprite.onload = () => {
            this.sprite.isReady = true
            this.sprite.frameWidth = Math.ceil(this.sprite.width / this.sprite.horizontalFrames)
            this.sprite.frameHeight = Math.ceil(this.sprite.height / this.sprite.verticalFrames)
        
        }
    }

    decrement() {  
        this.sprite.verticalFrameIndex += 1

    }

    increment() {
        this.sprite.verticalFrameIndex -= 1

        if (this.sprite.verticalFrameIndex < 0) {
            this.sprite.verticalFrameIndex = 0
        }

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
    }
}
