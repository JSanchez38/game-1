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
 
        const play = document.getElementById('btn-play')
        const pause = document.getElementById('btn-pause')

        play.addEventListener('click', () => game.start())
        pause.addEventListener('click', () => game.stop())

        
        const backgroundMusic = document.getElementById('backgroundMusic');
        backgroundMusic.play();
        backgroundMusic.volume = 0.2


        })

        const tryAgain = document.getElementById('btn-retry')
        tryAgain.addEventListener('click', () => {

            const gameOver = document.getElementById('end-panel')
            gameOver.classList.add('hidden')

            const startPanel = document.getElementById('start-panel')
            startPanel.classList.remove('hidden')

        })       
})
