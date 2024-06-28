class Player {
    constructor(gameScreen, left, top, width, height, imgSrc) {
        this.gameScreen = gameScreen;
        this.left = left;
        this.top = top;
        this.width = width;
        this.height = height;
        this.directionX = 0;
        this.directionY = 0;
        this.element = document.createElement('img');

        this.element.src = imgSrc;
        this.element.style.position = "absolute";
        this.element.style.left = `${left}px`;
        this.element.style.top = `${top}px`;
        this.element.style.width = `${width}px`;
        this.element.style.height = `${height}px`;

        this.gameScreen.appendChild(this.element);
    }

    move() {
        this.left += this.directionX;
        this.top += this.directionY;

        if (this.left < 10) {
            this.left = 10;
        }

        if (this.top < 10) {
            this.top = 10;
        }

        if (this.left > this.gameScreen.offsetWidth - this.width - 10) {
            this.left = this.gameScreen.offsetWidth - this.width - 10;
        }

        if (this.top > this.gameScreen.offSetHeight - this.height - 10) {
            this.top = this.gameScreen.offSetHeight - this.height - 10;
        }


        this.updatePosition();
    }

    updatePosition() {
        this.element.style.left = `${this.left}px`;
        this.element.style.top = `${this.top}px`;

    }

    /* 
    THIS COULD WORK IF I PASS FIXED VALUES TO THE WIDTH, HEIGHT, LEFT, TOP
    
    
    didCollide(obstacle) {
        const playerLeft = this.left;
        const playerRight = this.left + this.width;
        const playerTop = this.top;
        const playerBottom = this.top + this.height;
        const obstacleLeft = obstacle.left;
        const obstacleRight = obstacle.left + obstacle.width;
        const obstacleTop = obstacle.top;
        const obstacleBottom = obstacle.top + obstacle.height;

        return playerLeft < obstacleRight && playerRight > obstacleLeft && playerTop < obstacleBottom && playerBottom > obstacleTop;
    }
}
 */


    didCollide(obstacle) {
        const playerRect = this.element.getBoundingClientRect();
        const obstacleRect = obstacle.element.getBoundingClientRect();
        if (
            playerRect.left < obstacleRect.left + obstacleRect.width &&
            playerRect.left + this.width > obstacleRect.left &&
            playerRect.top < obstacleRect.top + obstacleRect.height &&
            playerRect.top + this.height > obstacleRect.top
        ) {
            return true;
        }
        return false;
    }
}