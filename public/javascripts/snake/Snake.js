import GameObject from "./GameObject.js";
import {DIRECTION, partSize} from "./Globals.js";

export default class Snake{
    constructor(startPoint, length, partSize) {
        this.partSize = partSize;
        this.build(startPoint, length);
        this.direction = {
            x: this.partSize,
            y: 0
        }
        this.dead = false;
        this.bodyImage = document.getElementsByClassName("snake-part-image")[0];
        this.headImage = document.getElementsByClassName("snake-head-image")[0];
        this.turnCount = {};
        this.turnCountTemp = 0;
        this.nullTurnCount();
        this.turningEventSuccess = new Event('turningEventSuccess');
    }

    build(startPoint, length){
        this.parts=[];
        for(let i=0; i<length;i++){
            let fillColor;
            let image;
            if(i === 0){
                fillColor = 'darkgreen';
                image = this.headImage;
            } else{
                fillColor = 'lightgreen';
                image = this.bodyImage;
            }
            this.parts.push(new GameObject(
                startPoint.x - this.partSize*i,
                startPoint.y,
                this.partSize,
                this.partSize,
                fillColor,
                'darkgreen',
                image
            ));
        }
    }
    move(canvasWidth, canvasHeight){
        let head = new GameObject(
            this.parts[0].x + this.direction.x,
            this.parts[0].y + this.direction.y,
            this.partSize,
            this.partSize,
            "darkgreen",
            "darkgreen",
            this.headImage
        );
        this.parts[0].fillColor = "lightgreen";
        this.parts[0].image = this.bodyImage;
        if(head.x >= canvasWidth){
            head.x = 0;
        } else if( head.x <= -this.partSize){
            head.x = canvasWidth-this.partSize;

        } else if(head.y <= -this.partSize){
            head.y = canvasHeight-this.partSize;
        } else if(head.y >= canvasHeight){
            head.y = 0;
        }
        this.parts.unshift(head);
        this.parts.pop();
    }

    isDead(){
        return this.dead;
    }

    checkCollisionWithTail(){
        for(let i=1;i<this.parts.length; i++){
            if(this.parts[i].x === this.parts[0].x && this.parts[i].y === this.parts[0].y){
                this.dead = true;
            }
        }
    }

    elongateBy(count){
        for(let i=0;i<count;i++){
            let newPart = Object.assign(new GameObject(), this.parts[this.parts.length-1]);
            newPart.x -= this.direction.x;
            newPart.y -= this.direction.y;
            this.parts.push(newPart);
        }

    }
    shortenBy(count){
        let start = this.parts.length - count;
        this.parts.splice(start,count);
    }

    getHead(){
        return this.parts[0];
    }

    setTurnCount(count, direction){
        this.turnCount.count = count;
        this.turnCount.direction = direction;
    }

    getCurrentTurns(){
        return this.turnCountTemp;
    }

    nullTurnCount(){
        this.turnCount.count = 0;
        this.turnCount.direction = undefined;
        this.turnCountTemp = 0;
    }

}





