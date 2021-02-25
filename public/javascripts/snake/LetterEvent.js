import RandomEvent from "./RandomEvent.js";
import {ALPHABET, partSize} from "./Globals.js";
import Timer from "./Timer.js";

export default class LetterEvent extends RandomEvent{
    constructor(snake,canvas,interactiveObjects) {
        super(snake, canvas, interactiveObjects);
        this.finalTimeout = 7900;
        this.letterElement = document.getElementsByClassName("letter")[0];
        this.elapsedSeconds = 0;
        this.prize = 0;
        this.prizes = [3, 1];
        this.clocks = [new Timer(Timer.TIMEOUT)];
    }

    setLetter(letter){
        this.letterElement.innerText = letter;
    };

    getLetter(){
        return this.letterElement.innerText;
    }

    success(){
        this.elapsedSeconds = (this.start - Date.now())/1000;
        if(this.elapsedSeconds < 3){
            this.prize = this.prizes[0];
        } else {
            this.prize = this.prizes[1];
        }
        this.snake.shortenBy(this.prize);
        this.isSuccess = true;
    }


    trigger(){
        console.log('letter event');
        let coord = this.getPreripheralCoord(parseInt(this.letterElement.offsetWidth));
        this.letterElement.style.top = `${coord.top}px`;
        this.letterElement.style.left = `${coord.left}px`;

        let isSquare = Math.floor(Math.random() * 2);

        if(isSquare){
            this.finalTimeout += 300;
            this.displaySquare();
            this.clocks[0].start(()=>{
                this.hideSquare();
                this.displayLetterDrill(coord);
            }, 300);

        } else{
            this.displayLetterDrill(coord);
        }

    }

    displayLetterDrill(){
        this.clocks[0].start(()=>{
                this.displayLetter();
                this.start = Date.now();
        }, 3000);
    }

    finish(){
        this.setLetter("");
        document.getElementsByClassName("message__content")[0].innerText = ""
        this.elapsedSeconds = 0;
        this.prize = 0;
        super.finish();
    }

    displaySquare(){
        this.letterElement.style.opacity = "0.9";
        console.log('square ', );
        this.setLetter(" ");
        let blue = "#02fcfc";
        this.letterElement.style.color = blue;
        this.letterElement.style.backgroundColor = blue;
    }

    hideSquare(){
        console.log('no square');
        this.setLetter("");
        this.letterElement.style.background = "";
        this.letterElement.style.color ="white";
    }

    displayLetter(){
        let letter = ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
        this.setLetter(letter);
        this.letterElement.style.opacity = "0.2";
        this.clocks[0].start( ()=>{
            this.letterElement.style.opacity ="1";
        }, 4000);
    }
}