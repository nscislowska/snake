import RandomEvent from "./RandomEvent.js";
import {partSize} from "./Globals.js";
import Obstacle from "./Obstacle.js";

export default class ObstacleEvent extends RandomEvent {
    constructor(snake, canvas, interactiveObjects) {
        super(snake, canvas, interactiveObjects);
        this.finalTimeout = 3000;
        this.prizes = [5];
        this.isSuccess = true;
    }

    trigger() {
        console.log('obstacle event');
        let offset = 4;
        let x = this.snake.getHead().x + this.snake.direction.x * offset;
        let y = this.snake.getHead().y + this.snake.direction.y * offset;
        this.eventObject = new Obstacle(x, y, partSize);
        this.interactiveObjects.push(this.eventObject);
    }

    finish() {
        let index = this.interactiveObjects.findIndex(object => object === this.eventObject);
        this.interactiveObjects.splice(index, 1);
        this.eventObject=null;
        super.finish();
    }

    success() {
        this.prize = this.prizes[0];
        this.snake.elongateBy(this.prize);
        this.isSuccess = false;
    }


}