import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent {
    secondsLeft: number = 20;
    modSecondsLeft: number=20;
    minutesLeft: number = 0;
    modMinutesLeft: number = 0;
    hoursLeft: number = 0;
    interval;
    paused: boolean = true;
    times:number[] = [60, 55, 20, 15, 10, 0];
    amount:number[] = [1,1,1,1,1,1];
    units:string[] = ["oz", "tsp", "oz", "g", "oz", "oz"];
    identity:string[]= ["hops", "gypsum", "hops", "irish moss", "hops", "hops"];
    step_idx:number=0;
    stepString:string="";
    recipe:string[]=[];


    ngOnInit() {
        this.buildRecipe();
    }


    startTimerIfPaused(){

        if (this.paused){
            this.startTimer();
        }
    }
    startTimer(){
        this.changeCurrStep();
        this.paused = false;
        this.interval = setInterval(() =>{
            if(this.secondsLeft>0){
                this.secondsLeft--;
                if(this.secondsLeft == this.times[this.step_idx+1]){
                    this.step_idx+=1;
                    this.changeCurrStep();
                }
                this.modSecondsLeft=this.secondsLeft%60;
                if (this.secondsLeft%60==59){
                    this.minutesLeft--;
                    this.modMinutesLeft=this.minutesLeft%60;
                    if(this.minutesLeft%60==59){
                        this.hoursLeft--;
                    }
                }
            } else{
                this.pauseTimer();
                this.playAlert();
                //this.changeTime(30);
            }
        },1000)
    }

    changeTime(t){
        this.secondsLeft=t;
        this.modSecondsLeft=this.secondsLeft%60;
        this.minutesLeft=Math.floor(this.secondsLeft/60);
        this.modMinutesLeft=this.minutesLeft%60;
        this.hoursLeft=Math.floor(this.secondsLeft/3600);
    }

    changeTime2(h,m,s){
        console.log(s);
        console.log(m);
        console.log(h);
        this.secondsLeft=3600*(Number(h)) + 60*(Number(m)) + Number(s);
        this.modSecondsLeft=this.secondsLeft%60;
        this.minutesLeft=Math.floor(this.secondsLeft/60);
        this.modMinutesLeft=this.minutesLeft%60;
        this.hoursLeft=Math.floor(this.secondsLeft/3600);
    }
    pauseTimer(){
        this.paused = true;
        clearInterval(this.interval);
    }

    playAlert(){
        var audio = new Audio();
        audio.src="assets/alarm.mp3"
        audio.load();
        audio.play();
    }

    buildStep(index){
        var ret=this.times[index].toString();
        ret += " minutes: ";
        ret += this.amount[index].toString() + " ";
        ret += this.units[index]+" of "+this.identity[index];
        return ret;
    }

    buildRecipe(){
        for(let i = 0; i < this.times.length; i++){
            this.recipe.push(this.buildStep(i));
        }
    }

    changeCurrStep(){
        this.stepString=this.buildStep(this.step_idx);
        console.log(this.stepString);
    }

}
