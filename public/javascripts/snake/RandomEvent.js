import Obstacle from "./Obstacle.js";
import Message from "./Message.js";
import {DIRECTION, partSize, ALPHABET} from "./Globals.js";

export default class RandomEvent {
    constructor(snake, canvas, interactiveObjects){
        this.finalTimeout = 5000;
        this.prize = 0;
        this.prizes=[0];
        this.timers = [];
        this.snake = snake;
        this.canvas = canvas;
        this.interactiveObjects = interactiveObjects;
        this.eventFinished = new Event('eventFinished');
        this.isSuccess = false;
    }

    getPrize(){
        return this.prize;
    }

    getMaxPrize(){
        return Math.max(...this.prizes);
    }

    getPreripheralCoord(elementWidth){
        let radiusW = 30*partSize;
        let radiusH = 30*partSize;
        let margin = elementWidth+partSize;
        let sides = []; // right, top, bottom
        let template={
            "maxW" : (this.canvas.getWidth() - margin),
            "maxH" : (this.canvas.getHeight() - margin),
            "minW" : partSize,
            "minH" : partSize
        };
        let space = this.snake.getHead().x - radiusW;
        if(space > margin){ //left
            sides.push({...template});
            sides[sides.length-1].maxW = space;
        }
        space = this.snake.getHead().x + radiusW;
        if(space < this.canvas.getWidth()-margin){ //right
            sides.push({...template});
            sides[sides.length-1].minW = space;
        }
        space = this.snake.getHead().y - radiusH;
        if(space > margin){ //top
            sides.push({...template});
            sides[sides.length-1].maxH = space;
        }
        space = this.snake.getHead().y + radiusH;
        if(space < this.canvas.getHeight()-margin){ //bottom
            sides.push({...template});
            sides[sides.length-1].minH = space;
        }
        let rand = Math.floor(Math.random() * (sides.length-1));
        return {
            "top" : Math.floor((Math.random() * (sides[rand].maxH-sides[rand].minH)) + sides[rand].minH),
            "left": Math.floor((Math.random() * (sides[rand].maxW-sides[rand].minW)) + sides[rand].minW)
        }

    }

    trigger(){}
    finish(){
        this.prize=0;
        for (let timer of this.timers){
            clearTimeout(timer);
        }
        this.timers=[];
    }

}