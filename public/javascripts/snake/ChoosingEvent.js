import RandomEvent from "./RandomEvent.js";
import {partSize} from "./Globals.js";
import Obstacle from "./Obstacle.js";

export default class ChoosingEvent extends RandomEvent {
    constructor(snake,canvas, interactiveObjects) {
        super(snake,canvas,interactiveObjects);
        this.finalTimeout = 6500;
        this.prizes = [3];
        this.choosingObjects = document.getElementsByClassName('choose-object');
        this.shapes = ['circle'];
        this.colors = ['red', "yellow", "blue", "purple", "pink", "green", "orange", "white"];
        this.currentObjects = [];
        this.eventSpecificData = {
            goalObject : undefined,
            allObjects: undefined,
            chosenIndex: undefined
        };

    }

    clearDisplay(description, index){
        this.choosingObjects[index].classList.remove(description.color, description.shape);
        this.choosingObjects[index].innerText = "";
        this.choosingObjects[index].style.top = '';
        this.choosingObjects[index].style.left = '';
    }

    setDisplay(description, index, text){
        this.choosingObjects[index].classList.add(description.shape, description.color);
        this.choosingObjects[index].innerText = text;
        this.choosingObjects[index].style.top = `${description.y}px`;
        this.choosingObjects[index].style.left = `${description.x}px`;
    }


    setObjectsColor(){
        let count = Math.floor((Math.random() * (6-3)) + 3);
        let indexes = Array.from(new Array(count), (x, i) => i + 1);
        let colorsTemp = [...this.colors];

        for (let i=0; i<count; i++){
            let obj = {
                index : indexes[Math.floor(Math.random() * indexes.length)],
                shape : this.shapes[Math.floor(Math.random() * this.shapes.length)],
                color : colorsTemp[Math.floor(Math.random() * colorsTemp.length)],
                x : 0,
                y : 0
            };
            colorsTemp = colorsTemp.filter((color) => color !== obj.color);
            indexes = indexes.filter((n) => n !== obj.index);
            this.currentObjects.push(obj);
        }
    }

    trigger() {
        console.log('choosing event');
        this.setObjectsColor();
        let objectWidth = this.choosingObjects[0].offsetWidth;
        let initCoord = this.getPreripheralCoord(objectWidth);
        this.currentObjects[0].x = initCoord.left;
        this.currentObjects[0].y = initCoord.top;

        this.setDisplay(this.currentObjects[0], 0, "");

        this.timers.push(setTimeout(()=>{
            this.clearDisplay(this.currentObjects[0],0);
            this.timers.push(setTimeout(()=>{

                let coordX = [];
                let coordY = [];
                let margin = objectWidth+partSize*2;
                for(let i=0; i<this.currentObjects.length; i++){
                    let x = Math.floor(Math.random() * (this.canvas.getWidth() - margin*2) +  margin);
                    while (coordX.findIndex((number) => number < x+partSize && number > x-partSize) !== -1) {
                        x = Math.floor(Math.random() * (this.canvas.getWidth() - margin*2) + margin);
                    }
                    coordX.push(x);
                    let y = Math.floor(Math.random() * (this.canvas.getHeight() - margin*2) + margin);
                    while (coordY.findIndex((number) => number < y+partSize && number > y-partSize) !== -1) {
                        y = Math.floor(Math.random() * (this.canvas.getHeight() - margin*2) + margin);
                    }
                    coordY.push(y);
                    this.currentObjects[i].x = x;
                    this.currentObjects[i].y = y;
                    this.setDisplay(this.currentObjects[i],i,`${this.currentObjects[i].index}`)
                }

            }, 1000));
        }, 500));
    }

    finish() {
        this.eventSpecificData.goalObject= this.currentObjects[0];
        this.eventSpecificData.allObjects = this.currentObjects.length;
        for (let i=0; i< this.currentObjects.length; i++){
            this.clearDisplay(this.currentObjects[i], i);
        }
        this.currentObjects = [];
        super.finish();
    }

    success() {
        console.log("success");
        this.prize = this.prizes[0];
        if(!this.isSuccess) {
            this.snake.shortenBy(this.prize);
        }
        this.isSuccess = true;

    }



}