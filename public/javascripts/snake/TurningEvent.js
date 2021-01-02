import RandomEvent from "./RandomEvent.js";
import {DIRECTION, partSize} from "./Globals.js";
import Message from "./Message.js";

export default class TurningEvent extends RandomEvent {
    constructor(snake, canvas, interactiveObjects) {
        super(snake, canvas, interactiveObjects);
        this.message = new Message();
        this.turningEvent = new Event('countTurns');
        this.finalTimeout = 17000;
        this.finished = false;
        this.secondsLeft = 0;
        this.clock = null;
        this.prizes = [5,3,1];
        this.eventSpecificData = {
            direction: undefined,
            turns: undefined,
            executed: undefined
        };

    }

    trigger() {
        let turns = Math.floor(Math.random() * 4)+2;
        let rand = Math.floor(Math.random() * 4);
        let key = Object.keys(DIRECTION)[rand];
        let direction = DIRECTION[key];
        let message = `Skręć ${turns} razy w ${direction.pl}`;
        console.log(message);
        this.snake.setTurnCount(turns, direction);
        this.saveDataOnStart(direction,turns);
        this.message.set(message);
        this.timers.push(setTimeout(()=> {
            this.secondsLeft = 15;
            this.clock=setInterval(()=>{
                this.message.set(`Pozostały czas: ${this.secondsLeft}s`);
                this.secondsLeft-=1;
                }, 1000);
        }, 1000));

    }

    finish() {
        this.saveDataOnFinish();
        this.finished = true;
        this.snake.nullTurnCount();
        this.message.set("");
        clearInterval(this.clock);
        this.secondsLeft = 0;
        super.finish();
    }

    saveDataOnFinish(){
        this.eventSpecificData.executed = this.snake.getCurrentTurns();
    }
    saveDataOnStart(direction, turns) {
        this.eventSpecificData.direction = direction;
        this.eventSpecificData.turns = turns;
    }
}