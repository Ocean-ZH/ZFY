/* 
    角色类
*/

import { CharacterAction } from './Action.js';
import { PlayerView, EnemyView } from './ViewObj.js';

class Character{
    constructor(gameInstance, payload){
        this.gameInstance = gameInstance;
        this.action = new CharacterAction(this);
        this.doing = "";
        this.name = payload ? payload.name ? payload.name : "角色" : "角色";
        this.live = 3;
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
        // console.log(this)
        this.power = 0;
        this.doing = "";
    }
}

class Player extends Character {
    constructor(gameInstance, payload) {
        super(gameInstance, payload);
        this.dom = gameInstance.dom.querySelector('#player');
        this.name = payload ? payload.name ? payload.name : "玩家" : "玩家";
        this.view = new PlayerView(this);
    }

    refreshView() {
        this.view.refreshView();
    }
}

class Enemy extends Character {
    constructor(gameInstance, payload) {
        super(gameInstance, payload);
        this.dom = gameInstance.dom.querySelector('#enemy');
        this.name = payload ? payload.name ? payload.name : "敌人" : "敌人";
        this.view = new EnemyView(this);
    }

    refreshView() {
        //enemy_power
        this.view.refreshView();
    }

    reset() {
        console.log(this)
        this.power = 0;
    }
}

export {
    Character,
    Player,
    Enemy,
};