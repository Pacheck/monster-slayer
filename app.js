new Vue({
    el: "#game",
    data: {
        monsterHealth: 100,
        playerHealth: 100,
    },
    computed: {
        monsterBarStyles(){
            return { width: this.monsterHealth + '%' }
        },
        playerBarStyles(){
            return { width: this.playerHealth + '%' }
        }
    },
    methods: {
        attackMonster() {
            const attackValue = getRandomNumber(12, 5);
            this.monsterHealth -= attackValue;
            this.attackPlayer();
        },
        attackPlayer() {
            const attackValue = getRandomNumber(15, 8);
            this.playerHealth -= attackValue;
        }
    }
});

function getRandomNumber(max, min) {
    return Math.floor(Math.random() * (max - min)) + min
}