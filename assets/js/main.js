window.addEventListener('load', () => {


    const gameOver = document.getElementById('end-panel')
    gameOver.classList.add('hidden')


    const startGame = document.getElementById('btn-start-game')
    startGame.addEventListener('click', () => {

        const game = new Game('main-canvas')

        document.addEventListener('keydown', (event) => game.onKeyEvent(event))
        document.addEventListener('keyup', (event) => game.onKeyEvent(event))

        const startPanel = document.getElementById('start-panel')
        startPanel.classList.add('hidden')

        const gamePanel = document.getElementById('game-panel')
        gamePanel.classList.remove('hidden')

        game.start()

        })

        //4º 1.03.00
        
        const play = document.getElementById('play')
        play.addEventListener('click', () => game.start())
        const pause = document.getElementById('pause')
        pause.addEventListener('click', () => game.stop())

        const tryAgain = document.getElementById('btn-retry')
        tryAgain.addEventListener('click', () => {

            const gameOver = document.getElementById('end-panel')
            gameOver.classList.add('hidden')

            const startPanel = document.getElementById('start-panel')
            startPanel.classList.remove('hidden')

        })

})
