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

        const canvasPanel = document.getElementById('main-canvas')
        canvasPanel.classList.remove('hidden')

        game.start()

        })

        const tryAgain = document.getElementById('btn-retry')
        tryAgain.addEventListener('click', () => {

            const gameOver = document.getElementById('end-panel')
            gameOver.classList.add('hidden')

            const startPanel = document.getElementById('start-panel')
            startPanel.classList.remove('hidden')

        })

})
