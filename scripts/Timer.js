export default class Timer{
    constructor(){
        this.time = 0;  //in milliseconden
        this.start = new Date();
        this.stop = new Date();

    }

    startTimer(){
        this.start = new Date();
    }

    stopTimer(){
        this.stop = new Date();
        this.time += this.stop.getTime() - this.start.getTime();
        return this.time;
    }

    getTime(){
        return this.time;
    }

    getCurrentTime(){
        let temp = new Date();
        return this.time + (temp.getTime() - this.start.getTime());
    }

    clearTimer(){
        this.time = 0;
    }
}

/*      //Gebruiken voor timer op scherm

        function printTime(){
            console.log( timer.getCurrentTime() )   //eventueel omzetten van milliseconden
        }

        let timer = new Timer();
        timer.startTimer();
        let interval = setInterval( printTime, 1000 );

        //Bij stoppen:

        timer.stopTimer()
        clearInterval(interval);

 */


