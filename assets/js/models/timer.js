class Timer {
    constructor(ctx, x, y) {
        this.ctx = ctx

        this.x = x
        this.y = y
        this.w = Math.ceil(650 / 15)
        this.h = Math.ceil(650 / 15) 

        this.timerIntervalId = undefined

        this.seconds = 0
        this.minutes = 0
    }

    start() {
        if (!this.timerIntervalId) {
            this.timerIntervalId = setInterval(() => {
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
}
    draw() {

        this.ctx.save()
        this.ctx.fillStyle = 'white'
        this.ctx.font = '30px Arial'
        this.ctx.fillText(`${this.minutes} : ${this.seconds}`, this.x + this.w + 15, this.y + 32)
        this.ctx.restore()

    }
}