const TIMEOUT = 1,
      INTERVAL = 0;

export default class Timer{
    constructor(type){
        this.type = type;
        this.clock = undefined;
        this.startTime = undefined;
    }

    static get TIMEOUT() {
        return TIMEOUT;
    }

    static get INTERVAL() {
        return INTERVAL;
    }

    isTimeout(){
        return this.type===TIMEOUT;
    }

    isInterval(){
        return this.type===INTERVAL;
    }

    start(func, time){
        this.func = func;
        this.startTime = Date.now();
        this.time = time;
        if(this.isTimeout()){
            this.clock = setTimeout(this.func, time);
        } else if (this.isInterval()){
            this.clock = setInterval(this.func, time);
        }

    }

    pause(){
        if(this.isTimeout()){
            this.time -= Date.now() - this.startTime;
        }
        this.clear();
    }

    resume(){
        if(this.time > 0){
            this.start(this.func, this.time);
        }
    }

    clear(){
        if(this.isTimeout()){
            clearTimeout(this.clock);
        } else if(this.isInterval()){
            clearInterval(this.clock);
        }

    }
}