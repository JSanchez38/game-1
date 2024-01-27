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
        this.timer = new Timer(this.ctx, Math.ceil(this.canvas.width / 2) - 50, 30)
        this.bosses = []
        this.life = new Life(this.ctx, 200, 40)
        this.drops = []
        this.finalBosses = []

        this.leaderboad = []

        this.addEnemyBackoff = 1000
        setTimeout(() => this.addRandomEnemy(), this.addEnemyBackoff)

        setInterval(() => this.spawnDrop(), 15000)

    }

    onKeyEvent(event) {
        this.character.onKeyEvent(event)
    }

    start() {
        if (!this.drawIntervalId) {
            const backgroundMusic = document.getElementById('backgroundMusic');
            backgroundMusic.play();
            backgroundMusic.volume = 0.15

            this.timer.start()

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

                if (this.character.hit()) {
                    this.life.decrement()

                    const hittedSound = document.getElementById('hittedSound')
                    hittedSound.play()
                    hittedSound.volume = 0.2

                }
                
                if (this.character.life <= 0) {
                    this.gameOver()
                }
            }
        })

        this.drops.forEach((drop) => {
            if (drop.collidesWith(this.character))
                
                if (this.character.healing()) {
                    this.life.increment()

                    const healSound = document.getElementById('healSound')
                    healSound.play()
                    healSound.volume = 0.05

                }
                
            
        })
        
        this.bosses.forEach((boss) => {
            if (boss.collidesWith(this.character)) {
                
                if (this.character.hit()) {
                    this.life.decrement()

                    const hittedSound = document.getElementById('hittedSound')
                    hittedSound.play()
                    hittedSound.volume = 0.2

                }

                if (this.character.life <= 0) {
                    this.gameOver()
                }
            }
        })

        this.finalBosses.forEach((finalBoss) => {
            if (finalBoss.collidesWith(this.character)) {
                
                if (this.character.hit()) {
                    this.life.decrement()

                    const hittedSound = document.getElementById('hittedSound')
                    hittedSound.play()
                    hittedSound.volume = 0.2

                }

                if (this.character.life <= 0) {
                    this.gameOver()
                }
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
            }
            for (let i = 0; i < this.bosses.length; i++) {
                const boss = this.bosses[i]

                if (boss.collidesWith(bullet)) {
                    boss.lives--
                    this.score.bossInc()

                    return false
                }
            }

            for (let i = 0; i < this.finalBosses.length; i++) {
                const finalBoss = this.finalBosses[i]

                if (finalBoss.collidesWith(bullet)) {
                    finalBoss.lives--
                    this.score.bossInc()

                    return false
                }
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

        const bossX = this.initialPositionX()
        const bossY = this.initialPositionY()

        const boss2X = this.initialPositionY()
        const boss2Y = this.initialPositionY()
 

        if (this.drawIntervalId) {
            this.enemies.push(new Enemy(this.ctx, enemyX, enemyY))

        }

        this.addEnemyBackoff = Math.floor(Math.random() * 3) * 1000
        setTimeout(() => this.addRandomEnemy(), this.addEnemyBackoff)


        if (this.drawIntervalId && this.timer.minutes === 1) {
            this.bosses.push(new Boss(this.ctx, bossX, bossY))
            
        }

        if (this.drawIntervalId && this.timer.minutes === 2) {
            this.finalBosses.push(new FinalBoss(this.ctx, boss2X, boss2Y))
        }
    }

    spawnDrop() {
        
        const randomX = Math.floor(Math.random() * (this.canvas.width + 50));
        const randomY = Math.floor(Math.random() * (this.canvas.height + 50));
        
        return this.drops.push(new Drop(this.ctx, randomX, randomY))

    }

    stop() {
            clearInterval(this.drawIntervalId)
            this.drawIntervalId = undefined

            this.timer.stop()

            const backgroundMusic = document.getElementById('backgroundMusic');
            backgroundMusic.pause();
}

    draw() {
        this.background.draw()
        this.timer.draw()
        this.character.draw()
        this.enemies.forEach((enemy) => enemy.draw())
        this.score.draw()
        this.bosses.forEach((boss) => boss.draw())
        this.life.draw()

        this.drops.forEach((drop) => drop.draw())
        this.finalBosses.forEach((finalBoss) => finalBoss.draw())

    }

    move() {
        this.character.move()
        this.enemies.forEach((enemy) => enemy.move(this.character.x, this.character.y))
        this.bosses.forEach((boss) => boss.move(this.character.x, this.character.y))
        this.finalBosses.forEach((finalBoss) => finalBoss.move(this.character.x, this.character.y))

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
        this.bosses = this.bosses.filter((boss) => !boss.isDead())
        this.drops = this.drops.filter((drop) => !drop.collidesWith(this.character))
        this.finalBosses = this.finalBosses.filter((finalBoss) => !finalBoss.isDead())
    }

    gameOver() {
            this.stop()

            this.leaderboad.push(`${this.timer.minutes} : ${this.timer.seconds}`)
            console.log(this.leaderboad)

            const gameOverSound = document.getElementById('gameOverSound')
            gameOverSound.play()
            gameOverSound.volume = 0.05

            const gameOver = document.getElementById('end-panel')
            gameOver.classList.remove('hidden')

            const gamePanel = document.getElementById('game-panel')
            gamePanel.classList.add('hidden')



    }
}