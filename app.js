new Vue({
    el: "#game",
    data: {
        monsterHealth: 100,
        playerHealth: 100,
        currentRound: 0,
        winner: null,
        battleLog: []
    },
    computed: {
        monsterBarStyles(){
            if(this.monsterHealth < 0){
                return { width: '0%'}
            }
            return { width: this.monsterHealth + '%' }
        },
        playerBarStyles(){
            if(this.playerHealth < 0){
                return { width: '0%'}
            }
            return { width: this.playerHealth + '%' }
        },
        mayUseSpecialAttack(){
            return this.currentRound % 3 !== 0;
        }
    },
    watch: {
        playerHealth(health){
            if(health <= 0 && this.monsterHealth <= 0){
                this.winner = 'draw'
            }else if(health <= 0){
                this.winner = 'monster'
            }
        },
        monsterHealth(health){
            if(health <= 0 && this.playerHealth <= 0){
                this.winner = 'draw'
            }else if(health <= 0){
                this.winner = 'player'
            }
        }
    },
    methods: {
        attackMonster() {
            this.currentRound++;
            const attackValue = getRandomNumber(12, 5);
            this.monsterHealth -= attackValue;
            this.attackPlayer();
            this.addLogMessage('player', 'attack', attackValue);
        },
        attackPlayer() {
            const attackValue = getRandomNumber(15, 8);
            this.playerHealth -= attackValue;
            this.addLogMessage('monster', 'attack', attackValue);
        },
        specialAttackMonster() {
            this.currentRound++;
            const attackValue = getRandomNumber(20, 25);
            this.monsterHealth -= attackValue;
            this.addLogMessage('player', 'attack', attackValue);
        },
        healPlayer() {
            this.currentRound++;
            const healValue = getRandomNumber(16, 10);
            if(this.playerHealth + healValue > 100){
                this.playerHealth = 100;
            }else{
                this.playerHealth += healValue;
            }
            this.attackPlayer();
            this.addLogMessage('player', 'heal', healValue);
        },
        startGame() {
            this.monsterHealth = 100;
            this.playerHealth = 100;
            this.currentRound = 0;
            this.winner = null;
            this.battleLog = []
        },
        surrender() {
            this.winner = 'monster';
        },
        addLogMessage(who, what, value) {
            this.battleLog.unshift({
                actionBy: who,
                actionType: what,
                actionValue: value
            })
        },
        getClass(actionBy){
            return actionBy === 'player' ? { 'log--player': true } : { 'log--monster': true }
        }
    }
});

function getRandomNumber(max, min) {
    return Math.floor(Math.random() * (max - min)) + min
}