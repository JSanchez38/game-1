class Timer {
    constructor(ctx, x, y) {
        this.ctx = ctx

        this.x = x
        this.y = y
        this.w = Math.ceil(650 / 15)
        this.h = Math.ceil(650 / 15) 

        this.sprite = new Image()
        this.sprite.src ='/assets/img/sprites/timer.png'
        this.sprite.onload = () => {
            this.sprite.isReady = true
        }

        this.seconds = 0
        this.minutes = 0
    }

    start() {
        setInterval(() => {
            this.seconds++
            
            if (this.seconds === 60) {
                this.seconds = 0
                this.minutes++

                if (this.minutes === 60) {
                    this.minutes = 0
                }
            } 
        }, 1000) 

    }
    draw() {
        if(this.sprite.isReady) {
            this.ctx.drawImage(
                this.sprite,
                this.x,
                this.y,
                this.w,
                this.h
            )

            this.ctx.save()
            this.ctx.font = '30px Arial'
            this.ctx.fillText(`${this.minutes} : ${this.seconds}`, this.x + this.w + 15, this.y + 32)
            this.ctx.restore()
        }
    }
}