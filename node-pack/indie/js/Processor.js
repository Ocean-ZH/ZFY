/* 
    游戏进程处理
*/

class Processor {
    constructor(gameInstance){
        this.gameInstance = gameInstance;
    }

    execute( data ){
        // console.log(this);
        console.log(data);

        if(typeof data == 'string'){

        }else{

        }

        this.gameInstance.addQueue(data);

        this.refreshView();
    }

    refreshView(){
        this.gameInstance.characters.player.refreshView();
        this.gameInstance.characters.enemy.refreshView();
    }
}



export { Processor };