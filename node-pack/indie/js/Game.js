import Action from './Action.js'

/* -- 创建游戏 -- */
function createGame(id = 'app') {

    var game = new GameInit(id);
    return game;
}

/* -- 游戏主体构造函数 -- */
function GameInit(id) {
    this.id = id;
    this.dom = document.querySelector('#' + id);
    this.player = new Player(this);
    this.enemy = new Enemy(this);
    this.domEventList = [];
    this.queue = [];

    bindEvents(this);
}
GameInit.prototype = {
    constructor: GameInit,
    //重置状态
    reset() {
        this.player.reset();
        this.enemy.reset();
        this.executeQueue('reset');
    },
    //销毁游戏实例
    destroy() {
        this.reset();
        this.executeQueue('destroy');
        //解绑所有事件
        this.domEventList.forEach((el) => {
            // console.log(this)
            el.eventList.forEach((eventObj) => {
                removeEvent(el)
            });
        });
        //销毁游戏实例对象属性
        for (let key in this) {
            delete this[key];
        }
        return null;
    },
    //刷新视图
    refreshView() {
        this.player.refreshView();
    },
    //执行队列
    executeQueue(props) {
        if (props) {
            console.log(props);
            if (typeof props === 'function') {
                props();
            }
            this.refreshView();
            this.queue.push(props);
        } else {
            console.log('Must execute a queue with props!')
            console.log(this);
            return false;
        }
    },
}

/* -- 角色类 -- */
function Character(gameInstance) {
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
            }
        },
    });

};
Character.prototype = Object.assign(Character.prototype, {
    constructor: Character,
    setPower(num = 1) {
        this.power += num;
        return this;
    },

    reset() {
        this.power = 0;
        this.doing = "";
    },
    refreshView() {
        //player_power
        this.view.power.innerHTML = this.power;
        //player_skill_ul
        let skillList = this.gameInstance.dom.querySelectorAll('#player_skill_ul >li');
        skillList.forEach((el, i) => {
            if (i <= this.power) {
                el.classList.remove('hide');
                el.classList.add('show');
            } else {
                el.classList.remove('show');
                el.classList.add('hide');
            }
        })
    },
});
//玩家子类
function Player(gameInstance) {
    Character.call(this, gameInstance);
    this.dom = gameInstance.dom.querySelector('#player');
    this.view = {
        power: this.dom ? this.dom.querySelector('#player_power') : null,
    };
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
                if (value == 3) {
                    this.dom.querySelector('#player_charge').setAttribute('disabled', 'true');
                } else {
                    this.dom.querySelector('#player_charge').removeAttribute('disabled');
                }
            } else {
                this.dom.querySelector('#player_charge').setAttribute('disabled', 'true');
            }
        },
    });
};
inherits(Player, Character);
//敌人子类
function Enemy(props) {
    Character.call(this, props);
};
inherits(Enemy, Character);


/* -- 动作类 -- */
/* function Action(character){
    this.character = character;

    this.execute = function(type){
        if(actions[type]){
            actions[type]();
        } else if (this.actions[type]){
            this.actions[type]();
        }
        this.character.gameInstance.executeQueue(type);
    };

    let actions = {
        charge: (num = 1) => {
            this.character.doing = "charge";
            this.character.power += num;
            return this;
        },
        block: () => {
            this.character.doing = "block";
            return this;
        },
        knife: () => {
            this.character.doing = "knife";
            this.character.power -= 1;
            return this;
        },
        parry: () => {
            this.character.doing = "parry";
            this.character.power -= 1;
            return this;
        },
        pistol: () => {
            this.character.doing = "pistol";
            this.character.power -= 2;
            return this;
        },
        critical_attack:()=>{
            this.character.doing = "critical_attack";
            this.character.power -= 3;
            return this;
        }
    };

    this.actions = {
    }

} */
/* Action.prototype={
    constructor:Action,
} */

/* -- 信息类 -- */
function Info() {

}
Info.prototype = {
    constructor: Info,

}
//主屏信息
function mainInfo(target) {
    Info.call(this, target);

};
inherits(mainInfo, Info);


/* -- 构建功能函数 -- */
//事件绑定
function bindEvents(obj) {
    //事件DOM存入游戏实例的domEventList中
    function domEventList(dom) {
        let flag = obj.domEventList.some(el => {
            return el === dom;
        })
        if (!flag) {
            obj.domEventList.push(dom);
        }
    }

    //重置数据 button #resetBtn
    let resetBtn = obj.dom.querySelector('#resetBtn');
    if (resetBtn) {
        let handler = function (event) {
            obj.reset();
        }
        let type = 'click';
        addEvent(resetBtn, type, handler);
        domEventList(resetBtn);
    }

    // 玩家蓄气 button #player_charge
    let player_charge = obj.dom.querySelector('#player_charge');
    if (player_charge) {
        let handler = function (event) {
            obj.player.action.execute('charge');
        }
        addEvent(player_charge, 'click', handler);
        domEventList(player_charge);
    }

    // 玩家格挡 button #player_block
    let player_block = obj.dom.querySelector('#player_block');
    if (player_block) {
        let handler = function (event) {
            obj.player.action.execute('block');
        }
        addEvent(player_block, 'click', handler);
        domEventList(player_block);
    }

    // 玩家小刀 button #player_knife
    let player_knife = obj.dom.querySelector('#player_knife');
    if (player_knife) {
        let handler = function (event) {
            obj.player.action.execute('knife');
        }
        addEvent(player_knife, 'click', handler);
        domEventList(player_knife);
    }

    // 玩家弹反 button #player_parry
    let player_parry = obj.dom.querySelector('#player_parry');
    if (player_parry) {
        let handler = function (event) {
            obj.player.action.execute('parry');
        }
        addEvent(player_parry, 'click', handler);
        domEventList(player_parry);
    }

    // 玩家手枪 button #player_pistol
    let player_pistol = obj.dom.querySelector('#player_pistol');
    if (player_pistol) {
        let handler = function (event) {
            obj.player.action.execute('pistol');
        }
        addEvent(player_pistol, 'click', handler);
        domEventList(player_pistol);
    }

    // 玩家绝技 button #player_critical
    let player_critical = obj.dom.querySelector('#player_critical');
    if (player_critical) {
        let handler = function (event) {
            obj.player.action.execute('critical_attack');
        }
        addEvent(player_critical, 'click', handler);
        domEventList(player_critical);
    }
}

/* -- 构建工具函数 -- */
//原型继承
function inherits(Child, Parent) {
    var F = function () { };
    F.prototype = Parent.prototype;
    Child.prototype = new F();
    Child.prototype.constructor = Child;
}

//增加事件
function addEvent(dom, type, handler) {
    dom.addEventListener(type, handler);
    if (!dom.eventList) {
        dom.eventList = [];
    };
    dom.eventList.push({
        type,
        handler,
    });
    return true;
}
//删除事件
function removeEvent(dom) {
    if (dom.eventList) {
        dom.removeEventListener(dom.eventList.type, dom.eventList.handler);
        delete dom.eventList;
    } else {
        return false;
    }
}

window.createGame = createGame;




export default createGame;