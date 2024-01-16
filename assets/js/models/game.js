class Game {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId)
        this.canvas.height = CANVAS_H
        this.canvas.width = CANVAS_W
        this.ctx = this.canvas.getContext('2d')

        this.drawIntervalId = undefined
        this.fps = FPS_GAME

        this.background = new Background(this.ctx)
        this.character = new Character(this.ctx, 800, 390)
        this.enemies = [
            new Enemy(this.ctx, this.canvas.width - 1300, this.canvas.height - ENEMY_GROUND_PADDING)
        ] 

        this.addEnemyBackoff = 2000
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
                    return false
                }
            }
            return true
        })
    }

    addRandomEnemy() {
        if(this.drawIntervalId) {
            this.enemies.push(new Enemy(this.ctx, this.canvas.width - 1300, this.canvas.height - ENEMY_GROUND_PADDING))
        }

        this.addEnemyBackoff = Math.floor(Math.random() * 4 + 1) * 1000
        setTimeout(() => this.addRandomEnemy(), this.addEnemyBackoff)

    }

    stop() {
        clearInterval(this.drawIntervalId)
        this.drawIntervalId = undefined
    }

    draw() {
        this.background.draw()
        this.character.draw()
        this.enemies.forEach((enemy) => enemy.draw()) 
    }

    move() {
        this.character.move()
        this.enemies.forEach((enemy) => enemy.move())

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
        this.enemies = this.enemies.filter((enemy) => (enemy.x - enemy.w) < this.canvas.width && !enemy.isDead())
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }

    gameOver() {
        this.stop()

    }
}