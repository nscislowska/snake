import RandomEvent from "./RandomEvent.js";
import {DIRECTION, partSize} from "./Globals.js";
import Message from "./Message.js";
import Timer from "./Timer.js";

export default class TurningEvent extends RandomEvent {
    constructor(snake, canvas, interactiveObjects) {
        super(snake, canvas, interactiveObjects);
        this.message = new Message();
        this.turningEvent = new Event('countTurns');
        this.finalTimeout = 17000;
        this.finished = false;
        this.secondsLeft = 0;
        this.prizes = [5,3,1];
        this.clocks=[new Timer(Timer.TIMEOUT), new Timer(Timer.INTERVAL)];
    }

    trigger() {
        let turns = Math.floor(Math.random() * 4)+2;
        let rand = Math.floor(Math.random() * 4);
        let key = Object.keys(DIRECTION)[rand];
        let direction = DIRECTION[key];
        let message = `Skręć ${turns} razy w ${direction.pl}`;
        console.log(message);
        this.snake.setTurnCount(turns, direction);
        this.message.set(message);
        this.clocks[0].start( ()=> {
            this.secondsLeft = 15;
            this.clocks[1].start(()=>{
                this.message.set(`Pozostały czas: ${this.secondsLeft}s`);
                this.secondsLeft-=1;
                }, 1000);
        },1000);

    }

    finish() {
        this.finished = true;
        this.snake.nullTurnCount();
        this.message.set("");
        this.secondsLeft = 0;
        super.finish();
    }
}