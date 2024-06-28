class Game {
    constructor() {
        this.startScreen = document.querySelector('#game-intro');
        this.gameScreen = document.querySelector('#game-screen');
        this.gameEndScreen = document.querySelector('#game-end');
        this.player = new Player(
            this.gameScreen,
            200,
            500,
            100,
            150,
            "./images/car.png"
        );
        this.height = 600;
        this.width = 500;
        this.obstacles = [];
        this.score = 0;
        this.lives = 3;
        this.gameIsOver = false;
        this.gameIntervalId = null;
        this.gameLoopFrequency = Math.round(1000 / 60);
    }

    start() {
        this.gameScreen.style.width = this.width + "px";
        this.gameScreen.style.height = this.height + "px";
        this.startScreen.style.display = "none";
        this.gameScreen.style.display = "block";
        this.gameIntervalId = setInterval(() => {
            this.gameLoop();

        }, this.gameLoopFrequency);
    }

    gameLoop() {
        this.update();
        if (this.gameIsOver) {
            clearInterval(this.gameIntervalId)
        }
    }

    update() {
        this.player.move();
        const idScore = document.querySelector('#score');
        const idLives = document.querySelector('#lives');

        for (let i = 0; i < this.obstacles.length; i++) {
            const obstacle = this.obstacles[i]
            obstacle.move();

            if (this.player.didCollide(obstacle)) {
                obstacle.element.remove();
                this.obstacles.splice(i, 1);
                this.lives--;
                idLives.innerHTML = this.lives;
                i--;
            }
            else if (obstacle.top > this.height) {
                obstacle.element.remove();
                this.obstacles.splice(i, 1);
                this.score++;
                idScore.innerHTML = this.score;
                i--;
            }


        }

        if (this.lives === 0) {
            this.endGame();
        }

        if (Math.random() > 0.98 && this.obstacles.length < 1) {
            this.obstacles.push(new Obstacle(this.gameScreen));
        }
    }


    endGame() {
        this.player.element.remove();
        this.obstacles.forEach(obstacle => { obstacle.element.remove() });
        this.gameIsOver = true;
        this.gameEndScreen.style.display = "block";
        this.gameScreen.style.display = "none";
    }
}