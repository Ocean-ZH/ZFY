;(function(){

    jQuery(document).ready(function ($) {
        realTime();
        window.realTimeTimer = setInterval(realTime, 500);
    });

    function realTime(){
        let d = new Date();
        let timeDom = document.querySelector('#realTime');
        timeDom.innerHTML = d.toLocaleString();
    }

}());

;(function(){

    function createGame(){
        
        var game = new gameInit();
        return game;
    }

    function gameInit(){
        this.user={
            power:0,
            status:'alive',
        }
    }
    gameInit.prototype = {
        constructor: gameInit,
        userFunc: {
            addPower(num = 1) {
                this.user.power += num;
                return this;
            },
        },
        getStatus(){
            return this.user.status;
        },
        refreshView(){
            
        }
    }

    window.createGame = createGame;

}());