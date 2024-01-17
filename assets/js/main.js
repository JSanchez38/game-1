window.addEventListener('load', () => {
    const game = new Game('main-canvas')


    document.addEventListener('keydown', (event) => game.onKeyEvent(event))
    document.addEventListener('keyup', (event) => game.onKeyEvent(event))

    const gameOver = document.getElementById('end-panel')
    gameOver.classList.add('hidden')


    const startGame = document.getElementById('btn-start-game')
    startGame.addEventListener('click', () => {

        const startPanel = document.getElementById('start-panel')
        startPanel.classList.add('hidden')

        const canvasPanel = document.getElementById('main-canvas')
        canvasPanel.classList.remove('hidden')

        game.start()

        })

})
