/* 
    游戏进程处理
*/

class Processor {
    constructor(gameInstance){
        this.gameInstance = gameInstance;
        this.taskQueue = []; // 储存一轮内的待结算内容
        this.end = false; // 游戏是否已经结束
    }

    execute( data ){
        // console.log(this);
        // console.log(data);
        
        if ( data === 'reset') {
            this.end = false;
        }
        if(typeof data === 'object'){
            // 如果是角色动作，加入待结算进程
            if (data.type === 'character_action') {
                if(this.end) { // 已经结束了就不执行动作了
                    return;
                }
                this.taskQueue.push(data);
                if (data.context.character.playerType === 'Player') {
                    // 如果是玩家行为,调用AI
                    this.gameInstance.enemyAI.execute(data);
                } else {
                    // AI行为之后，进行结算
                    console.log(this.taskQueue);

                    this.gameInstance.addQueue(this.gameInstance.round);
                    this.effectsCounting();
                    // ---
                    this.taskQueue = [];

                    // 结束判断
                    this.endJudge();
                    this.gameInstance.round++;
                }
            }
        }

        // 增加队列信息
        this.gameInstance.addQueue(data);
        this.refreshView();
    }
    // 效果结算
    effectsCounting() {
        // 临时变量
        let playerChange = {
            health: 0,
            power: 0,
            damage: 0,
            defence: 0,
            counter: '',
            doing: '',
        };
        // 临时变量
        let enemyChange = {
            health: 0,
            power: 0,
            damage: 0,
            defence: 0,
            counter: '',
            doing: '',
        };

        this.taskQueue.forEach(el => {
            if( el.context.character.playerType === 'Player') {
                playerChange.doing = el.effects.doing;
                playerChange.power += el.effects.self.power;
                playerChange.defence += el.effects.self.defence;
                if(el.effects.self.counter){
                    playerChange.counter = el.effects.self.counter;
                }
                enemyChange.damage += el.effects.foe.damage;
            }
            if( el.context.character.playerType === 'AI') {
                enemyChange.doing = el.effects.doing;
                enemyChange.power += el.effects.self.power;
                enemyChange.defence += el.effects.self.defence;
                if(el.effects.self.counter){
                    enemyChange.counter = el.effects.self.counter;
                }
                playerChange.damage += el.effects.foe.damage;
            }
        });

        // 临时变量结算 ----------
        // 反击计算
        if(playerChange.counter === enemyChange.doing) { // 是否反击
            enemyChange.damage = playerChange.damage;
            enemyChange.defence = 0;
            playerChange.damage = 0;
        } else if (enemyChange.counter === playerChange.doing) { // 是否反击
            playerChange.damage = enemyChange.damage;
            playerChange.defence = 0;
            enemyChange.damage = 0;
        }

        // health变化结算
        if(playerChange.damage > playerChange.defence) {
            playerChange.health = playerChange.defence - playerChange.damage;
        }
        if(enemyChange.damage > enemyChange.defence) {
            enemyChange.health = enemyChange.defence - enemyChange.damage;
        }
        
        // 状态变化写入实例
        this.effectsApply(this.gameInstance.characters.player, playerChange);
        this.effectsApply(this.gameInstance.characters.enemy, enemyChange);
    }

    // 效果应用
    effectsApply(target, changeContent) {
        if(changeContent.health) {
            this.gameInstance.addQueue(`${target.name} 命： ${changeContent.health}`);
        }
        target.power += changeContent.power;
        target.health += changeContent.health;

        // 更改 status
        if (changeContent.health < 0) {
            target.status = 'injured';
        } else {
            target.status = '';
        }
    }

    // 游戏结束判断 
    endJudge() {
        // 以血量变化作为依据
        let cKeys = Object.keys(this.gameInstance.characters);
        let playerHealth = this.gameInstance.characters.player.health;
        let enemyHealth = this.gameInstance.characters.enemy.health;
        let resultStr = '';

        if (playerHealth <= 0 && enemyHealth <= 0) {
            resultStr = 'Draw';
            this.gameInstance.characters.player.result = 'draw';
            this.gameInstance.characters.enemy.result = 'draw';
        } else {
            if (playerHealth <= 0) {
                resultStr = 'Lose';
                this.gameInstance.characters.player.result = 'lose';
                this.gameInstance.characters.enemy.result = 'win';
            }
            if (enemyHealth <= 0) {
                resultStr = 'Win';
                this.gameInstance.characters.player.result = 'win';
                this.gameInstance.characters.enemy.result = 'lose';
            }
        }
        

        cKeys.forEach( k => {
            if (this.gameInstance.characters[k].health === 0) {
                this.end = true;
            }
        })

        
        if (this.end) {
            window.setTimeout(() => {
                this.gameInstance.addQueue(`
                <p 
                    class="result-info"
                    style="text-align:center;">
                    ----------! <span style="color:red;">${resultStr}</span> !----------
                    <br />
                    ----------! Game Over !----------
                </p>`);
                this.refreshView();
            }, 0);
        }
    }

    refreshView(){
        this.gameInstance.characters.player.refreshView();
        this.gameInstance.characters.enemy.refreshView();
        this.gameInstance.refreshView();
    }
}



export { Processor };