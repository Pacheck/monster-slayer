new Vue({
    el: "#game",
    data: {
        monsterHealth: 100,
        playerHealth: 100,
        currentRound: 0,
    },
    computed: {
        monsterBarStyles(){
            return { width: this.monsterHealth + '%' }
        },
        playerBarStyles(){
            return { width: this.playerHealth + '%' }
        },
        myUseSpecialAttack(){
            return this.currentRound % 3 !== 0;
        }
    },
    methods: {
        attackMonster() {
            this.currentRound++;
            const attackValue = getRandomNumber(12, 5);
            this.monsterHealth -= attackValue;
            this.attackPlayer();
        },
        attackPlayer() {
            const attackValue = getRandomNumber(15, 8);
            this.playerHealth -= attackValue;
        },
        specialAttackMonster() {
            this.currentRound++;
            const attackValue = getRandomNumber(20, 25);
            this.monsterHealth -= attackValue;
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
        }
    }
});

function getRandomNumber(max, min) {
    return Math.floor(Math.random() * (max - min)) + min
}