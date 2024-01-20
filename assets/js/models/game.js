class Game {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId)
        this.canvas.height = CANVAS_H
        this.canvas.width = CANVAS_W
        this.ctx = this.canvas.getContext('2d')

        this.drawIntervalId = undefined
        this.fps = FPS_GAME

        this.background = new Background(this.ctx)
        this.character = new Character(this.ctx, 500, 390)
        this.enemies = []
        this.score = new Score(this.ctx, 15, 30)
        
        this.addEnemyBackoff = 1000
        setTimeout(() => this.addRandomEnemy(), this.addEnemyBackoff)


    }

    onKeyEvent(event) {
        this.character.onKeyEvent(event)
    }

    start() {
        if (!this.drawIntervalId) {
            this.drawIntervalId = setInterval(() => {
                this.clear()
                this.move()
                this.draw()
                this.checkCollisions()
            }, this.fps)
        }
    }

    checkCollisions() {
        this.enemies.forEach((enemy) => {
            if (enemy.collidesWith(this.character)) {
                this.gameOver()
            }
        })

        this.character.bullets = this.character.bullets.filter((bullet) => {
            for (let i = 0; i < this.enemies.length; i++) {
                const enemy = this.enemies[i]

                if (enemy.collidesWith(bullet)) {
                    enemy.lives--
                    this.score.increment()
                    return false
                }
                console.log(this.score)
            }
            return true
        })
        
    }

    getRandomNumber(min, max) {
        return Math.random() * (max - min) + min;
      }
      
    initialPositionX() {
        const randomSide = Math.floor(Math.random() * 4)
        let x
        
        switch (randomSide) {
            case 0:
                x = this.getRandomNumber(0, this.canvas.width)
                break
            case 1:
                x = this.canvas.width + 50
                break
            case 2:
                x = this.getRandomNumber(0, this.canvas.width)
                break
            case 3:
                x = -50
                break    
        }
        return x
    }

    initialPositionY() {
        const randomSide = Math.floor(Math.random() * 4)
        let y

        switch (randomSide) {
            case 0:
                y = this.getRandomNumber(0, this.canvas.height)
                break
            case 1:
                y = this.canvas.width + 50
                break
            case 2:
                y = this.getRandomNumber(0, this.canvas.height)
                break
            case 3:
                y = -50
                break    
        }
        return y
    }

    addRandomEnemy() {

        const enemyX = this.initialPositionX()
        const enemyY = this.initialPositionY()

        if (this.drawIntervalId) {
            this.enemies.push(new Enemy(this.ctx, enemyX, enemyY))
            
        }

        this.addEnemyBackoff = Math.floor(Math.random() * 0.1 + 1) * 1000
        setTimeout(() => this.addRandomEnemy(), this.addEnemyBackoff)

    }


    stop() {
        clearInterval(this.drawIntervalId)
        this.drawIntervalId = undefined

        const gameOver = document.getElementById('end-panel')
        gameOver.classList.remove('hidden')

        const canvasPanel = document.getElementById('main-canvas')
        canvasPanel.classList.add('hidden')

    }

    draw() {
        this.background.draw()
        this.character.draw()
        this.enemies.forEach((enemy) => enemy.draw())
        this.score.draw()
    }

    move() {
        this.character.move()
        this.enemies.forEach((enemy) => enemy.move(this.character.x, this.character.y))

        if (this.character.x < 0) {
            this.character.x = 0
        } else if (this.character.x > this.canvas.width - this.character.w) {
            this.character.x = this.canvas.width - this.character.w
        } else if (this.character.y < 0) {
            this.character.y = 0
        } else if (this.character.y > this.canvas.height - this.character.h) {
            this.character.y = this.canvas.height - this.character.h
        }
    }

    clear() {

        this.character.clear()
        
        this.enemies = this.enemies.filter((enemy) => !enemy.isDead())

    }

    gameOver() {
        this.stop()

    }
}