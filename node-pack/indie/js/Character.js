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
        //power
        let powerVal = 0;
        Object.defineProperty(this, 'power', {
            configurable: true,
            enumerable: true,
            get: function () {
                return powerVal;
            },
            set: function (value) {
                if (value <= 3 && value >= 0) {
                    powerVal = value;
                } else if (value < 0) {
                    powerVal = 0;
                } else if(value > 3) {
                    powerVal = 3;
                }
            },
        });
        // health
        let healthVal = 3;
        let healthMax = 3;
        Object.defineProperty(this, 'health', {
            configurable: true,
            enumerable: true,
            get: function () {
                return healthVal;
            },
            set: function (value) {
                if (value >= 0 && value <= healthMax) {
                    healthVal = value;
                } else if (value < 0) {
                    healthVal = 0;
                } else if (value > healthMax) {
                    healthVal = healthMax;
                }
            },
        });
        this.result = '';
        this.status = '';
    }

    reset() {
        // console.log(this)
        this.power = 0;
        this.health = 3;
        this.doing = "";
        this.result = '';
    }
}

class Player extends Character {
    constructor(gameInstance, payload) {
        super(gameInstance, payload);
        this.dom = gameInstance.dom.querySelector('#player');
        this.name = payload ? payload.name ? payload.name : "玩家" : "玩家";
        this.playerType = 'Player';
        this.view = new PlayerView(this);
        
        // health
        let healthVal = 3;
        let healthMax = 3;
        Object.defineProperty(this, 'health', {
            configurable: true,
            enumerable: true,
            get: function () {
                return healthVal;
            },
            set: function (value) {
                if (value >= 0 && value <= healthMax) {
                    healthVal = value;
                } else if (value < 0) {
                    healthVal = 0;
                } else if (value > healthMax) {
                    healthVal = healthMax;
                }
            },
        });
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
        this.playerType = 'AI';
        this.view = new EnemyView(this);
        // health
        let healthVal = 5;
        let healthMax = 5;
        Object.defineProperty(this, 'health', {
            configurable: true,
            enumerable: true,
            get: function () {
                return healthVal;
            },
            set: function (value) {
                if (value >= 0 && value <= healthMax) {
                    healthVal = value;
                } else if (value < 0) {
                    healthVal = 0;
                } else if (value > healthMax) {
                    healthVal = healthMax;
                }
            },
        });
        this.speak = {
            knife: [
                '身材挺結實的，啊？',
            ],
            pistol: [
                '我看你，完全是不懂喔？',
            ],
            critical_attack: [
                '聽話，讓我康康！（震聲）',
            ],
            injured: [
                '這麼說，你很勇喔？',
                '都可以拿！都拿！',
            ],
            win: [
                ' 唉唷，你臉紅啦？',
                ' 什麼新遊戲？比遊戲還刺激！',
            ],
            lose: [
                '所以，不要停下来啊！！(希望之花)',
                '你最好给我好好记住，懂吗！（大声）',
            ],
            draw: [
                '那个彬彬就是逊啦！',
                '这件事是我们两个人之间的秘密，你最好不要给我告诉任何人',
            ],
        };
        this.murmur = [
            '我房间里有一些好康的...',
            '我经常帮助一些翘家的人...',
            '我一個人住，我的房子蠻大的，歡迎你們來我家玩！',
            '玩累的話，直接睡覺，沒問題的！（迫真）',
        ];
    }

    refreshView() {
        //enemy_power
        this.view.refreshView();
    }

    reset() {
        this.power = 0;
        this.health = 5;
        this.doing = "";
        this.result = '';
        this.status = '';
    }
}

export {
    Character,
    Player,
    Enemy,
};