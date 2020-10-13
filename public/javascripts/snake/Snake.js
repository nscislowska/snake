import GameObject from "./GameObject.js";

export default class Snake{
    constructor(startPoint, length, partSize) {
        this.partSize = partSize;
        this.build(startPoint, length);
        this.direction = {
            x: this.partSize,
            y: 0
        }

    }
    build(startPoint, length){
        this.parts=[];
        for(let i=0; i<length;i++){
            let fillColor;
            if(i === 0){
                fillColor = 'darkgreen';
            } else{
                fillColor = 'lightgreen';
            }
            this.parts.push(new GameObject(
                startPoint.x - this.partSize*i,
                startPoint.y,
                this.partSize,
                this.partSize,
                fillColor,
                'darkgreen'
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
            "darkgreen"
        );
        this.parts[0].fillColor = "lightgreen";
        if(head.x >= canvasHeight){
            head.x = 0;
        } else if( head.x <= -this.partSize){
            head.x = canvasWidth-this.partSize;

        } else if(head.y <= -this.partSize){
            head.y = canvasHeight-this.partSize;
        } else if(head.y >= canvasWidth){
            head.y = 0;
        }
        this.parts.unshift(head);
        this.parts.pop();
    }
    isDead(){
        for(let i=1;i<this.parts.length; i++){
            if(this.parts[i].x === this.parts[0].x && this.parts[i].y === this.parts[0].y){
                return true;
            }
        }
    }
    elongateBy(count){
        for(let i=0;i<count;i++){
            let newPart = {...this.parts[this.parts.length-1]};
            newPart.x -= this.direction.x;
            newPart.y -= this.direction.y;
            this.parts.push(newPart);
        }

    }
    shortenBy(count){
        let start = this.parts.length - count;
        this.parts.splice(start,count);
    }
}



