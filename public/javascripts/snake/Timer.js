export default class Timer{
    constructor(func, params){
        this.func = func;
        this.params = params;
        this.timeout = undefined;
        this.startTime = undefined;
    }

    start(time){
        this.startTime = Date.now();
        this.time = time;
        this.timeout = setTimeout(this.func, time);
    }

    pause(){
        this.time -= Date.now() - this.startTime;
        this.clear();
    }

    resume(){
        if(this.time > 0){
            this.start(this.time);
        }
    }

    clear(){
        clearTimeout(this.timeout);
    }
}