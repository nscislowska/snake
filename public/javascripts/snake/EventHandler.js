import ObstacleEvent from "./ObstacleEvent.js";
import LetterEvent from "./LetterEvent.js";
import TurningEvent from "./TurningEvent.js";
import ChoosingEvent from "./ChoosingEvent.js";
import {ALPHABET} from "./Globals.js";

export default class EventHandler {
    constructor(canvas,snake, interactiveObjects) {
        this.code = 0;
        this.triggered = false;
        this.canvas = canvas;
        this.event = undefined;
        this.timeout = null;
        this.makeEventFlag = true;
        this.snake = snake;
        this.interactiveObjects = interactiveObjects;
        document.addEventListener('eventFinished', ()=>{
            console.log('emit eventFinished');
            this.finish();
        });
        this.eventCodes={
            "obstacle" : 1,
            "letter" : 2,
            "turning" : 3,
            "choosing" : 4
        }

        this.eventData={
            code: 0,
            start:0,
            end:0,
            success:false,
            snakeCoord: undefined,
            eventSpecific : undefined
        };

    }
    init(gameStart){
        this.probableCodes = [
            ...Object.values(this.eventCodes),
            ...Object.values(this.eventCodes),
            ...Object.values(this.eventCodes)];
        this.eventsData=[];
        this.gameStart=gameStart;

    }

    eventSuccess(){
        this.event.success();
        this.finish();
    }

    isTriggered(){
        return this.triggered;
    }

    trigger(){
        let codes ;
        if(this.probableCodes.length>0){
            codes = [...this.probableCodes];
        } else{
            codes = Object.values(this.eventCodes);
        }

        if(this.snake.parts.length<=4){
            codes = codes.filter((code)=> code !== this.eventCodes.letter && code !== this.eventCodes.choosing);
        }

        if(this.snake.parts.length<=6){
            codes = codes.filter((code)=> code !== this.eventCodes.turning);
        }

        this.code = codes[Math.floor(Math.random() * codes.length)];

        if(this.probableCodes.length>0){
            this.probableCodes.splice(this.probableCodes.findIndex(a => a === this.code), 1);
            console.log(this.probableCodes);
        }

        //this.code = this.eventCodes.letter;

        switch(this.code){
            case(this.eventCodes.obstacle):
                this.event = new ObstacleEvent(this.snake,this.canvas, this.interactiveObjects);
                break;
            case(this.eventCodes.letter):
                this.event = new LetterEvent(this.snake, this.canvas, this.interactiveObjects);
                letterEvent = this.event;
                document.addEventListener('keypress', letterKeypressHandler);
                break;
            case(this.eventCodes.turning):
                this.event = new TurningEvent(this.snake,this.canvas, this.interactiveObjects);
                turningEvent = this.event;
                document.addEventListener('turningEventSuccess', turningEventSuccessHandler);
                break;
            case(this.eventCodes.choosing):
                this.event = new ChoosingEvent(this.snake,this.canvas, this.interactiveObjects);
                choosingEvent = this.event;
                document.addEventListener("keydown", keydownHandler);
                break;
        }
        this.triggered = true;
        this.event.trigger();

        if(this.isTriggered()){
            this.timeout = setTimeout(() => {
                    this.finish();
                }, this.event.finalTimeout);
        }
        this.saveEventOnStart();
    }

    finish(){
        this.saveEventOnFinish();
        console.log(this.eventsData[this.eventsData.length-1]);
        console.log('finish event: ', Object.keys(this.eventCodes)[this.code-1]);
        this.removeListeners();
        clearTimeout(this.timeout);
        if (this.event !== undefined){
            console.log("prize: "+this.event.getPrize());
            this.event.finish();
        }
        this.triggered = false;
        this.code=0;
        this.event=undefined;

    }

    saveEventOnStart(){
        this.eventData.start = this.saveTime();
        this.eventData.code = this.code;
        this.eventData.snakeCoord = {
            x: this.snake.getHead().x,
            y: this.snake.getHead().y
        };
    }

    saveEventOnFinish(){
        this.eventData.end = this.saveTime();
        this.eventData.success = this.event.isSuccess;
        this.eventData.eventSpecific = this.event.eventSpecificData;
        this.eventsData.push(this.eventData);
        this.eventData={};
    }

    removeListeners(){
        document.removeEventListener("keydown", keydownHandler);
        document.removeEventListener('turningEventSuccess', turningEventSuccessHandler);
        document.removeEventListener('keydown', letterKeypressHandler);

    }


    saveTime(){
        return Date.now() - this.gameStart;
    }


}

let choosingEvent = {};
let turningEvent = {};
let letterEvent = {};

function keydownHandler(event){
    let choice = parseInt(event.key);
    if(Number.isInteger(choice)){
        choosingEvent.eventSpecificData.chosenIndex = choice;
       if ( choice === choosingEvent.currentObjects[0].index) {
            choosingEvent.success();
        }
        document.dispatchEvent(choosingEvent.eventFinished);
        document.removeEventListener("keydown", keydownHandler);
    }

}

function turningEventSuccessHandler(event){
            if(!turningEvent.finished) {
                console.log('event: turningEventSuccess');
                if(turningEvent.secondsLeft >= 10){
                    turningEvent.prize = turningEvent.prizes[0];
                } else if (turningEvent.secondsLeft >= 5){
                    turningEvent.prize = turningEvent.prizes[1];
                } else{
                    turningEvent.prize = turningEvent.prizes[2];
                }

                turningEvent.snake.shortenBy(turningEvent.prize);
                turningEvent.isSuccess = true;

                document.removeEventListener('turningEventSuccess', turningEventSuccessHandler);
                document.dispatchEvent(turningEvent.eventFinished);
            }
}

function letterKeypressHandler(event){
    let choice = event.key;

    if(choice === letterEvent.getLetter()){
        letterEvent.success();
        document.removeEventListener('keydown', letterKeypressHandler);
        document.dispatchEvent(letterEvent.eventFinished);
    }
}