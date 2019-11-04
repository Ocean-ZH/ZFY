class EnemyAI {
    constructor(gameInstance) {
        this.gameInstance = gameInstance;
    }

    execute() {
        this.gameInstance.characters.enemy.action.execute('charge');
    }

}

export { EnemyAI };