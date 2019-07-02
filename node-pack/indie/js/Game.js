// import Action from './Action.js';
import {Player, Enemy} from './Character.js';

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
            obj.player.action.execute('charge', 1);
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