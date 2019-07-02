import Action from './Action.js';

class Character{
    constructor(gameInstance){
        this.gameInstance = gameInstance;
        this.action = new Action(this);
        this.doing = "";
        //power
        let powerVal = 0;
        Object.defineProperty(this, 'power', {
            configurable: true,
            enumerable: true,
            get: function () {
                return powerVal;
            },
            set: function (value) {
                if (value <= 3) {
                    powerVal = value;
                }else{
                    powerVal = 3;
                }
            },
        });
    }

    reset() {
        this.power = 0;
        this.doing = "";
    }
}

class Player extends Character {
    constructor(gameInstance) {
        super(gameInstance);
        this.dom = gameInstance.dom.querySelector('#player');
        this.view = {
            power: this.dom ? this.dom.querySelector('#player_power') : null,
        };
    }

    refreshView() {
        //player_power
        this.view.power.innerHTML = this.power;
        //player_skill_ul
        let skillList = this.dom.querySelectorAll('#player_skill_ul >li');
        skillList.forEach((el, i) => {
            if (i <= this.power) {
                el.classList.remove('hide');
                el.classList.add('show');
            } else {
                el.classList.remove('show');
                el.classList.add('hide');
            }
        })
    }
}

class Enemy extends Character {
    constructor(gameInstance) {
        super(gameInstance);
        this.dom = gameInstance.dom.querySelector('#enemy');
        this.view = {
            power: this.dom ? this.dom.querySelector('#enemy_power') : null,
        };
    }

    refreshView() {
        //enemy_power
        this.view.power.innerHTML = this.power;
    }
}

export {
    Character,
    Player,
    Enemy,
};