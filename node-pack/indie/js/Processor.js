/* 
    游戏进程处理
*/

class Processor {
    constructor(gameInstance){
        this.gameInstance = gameInstance;
        this.processing = []; // 储存一轮内的待结算内容
    }

    execute( data ){
        // console.log(this);
        // console.log(data);
        if(typeof data === 'object'){
            // 如果是角色动作，加入待结算进程
            if (data.type === 'character_action') {
                this.processing.push(data);
                if (data.context.character.playerType === 'Player') {
                    // 如果是玩家行为,调用AI
                    this.gameInstance.enemyAI.execute(data);
                } else { // AI行为，进行结算
                    console.log(this.processing);
                    
                    // ---
                    this.gameInstance.addQueue(this.gameInstance.round);
                    this.gameInstance.round++;
                    this.processing = [];
                }
            }
        }

        // 增加队列信息
        this.gameInstance.addQueue(data);

        this.refreshView();
    }

    refreshView(){
        this.gameInstance.characters.player.refreshView();
        this.gameInstance.characters.enemy.refreshView();
        this.gameInstance.refreshView();
    }
}



export { Processor };