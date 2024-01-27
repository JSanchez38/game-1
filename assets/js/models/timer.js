class Timer {
    constructor(ctx, x, y) {
        this.ctx = ctx

        this.x = x
        this.y = y
        this.w = Math.ceil(650 / 15)
        this.h = Math.ceil(650 / 15)

        this.seconds = 0
        this.minutes = 0

        this.timerIntervalId = undefined
    }

    start() {
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

    stop() {
        clearInterval(this.timerIntervalId)
        this.timerIntervalId = undefined
    }
    
    draw() {

        this.ctx.save()
        this.ctx.fillStyle = 'white'
        this.ctx.font = '30px Arial'
        this.ctx.fillText(`${this.minutes.toString().padStart(2, '0')} : ${this.seconds.toString().padStart(2, '0')}`, this.x + this.w + 15, this.y + 32)
        this.ctx.restore()

    }
}