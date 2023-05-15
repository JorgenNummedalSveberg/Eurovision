<script>
    import Slot from "./Slot.svelte";
    let bets = [];
    let scores = [];

    function loadBets() {
        fetch('api/bets').then(res => res.json().then(json => {
            let tempBets = json.rows;
            fetch('api/scores').then(res => res.json().then(json => {
                let tempScores = json.rows;
                sortRanking(tempBets, tempScores);
            }))
        }))
    }

    function sortRanking(tempBets, tempScores) {
        tempBets.forEach(bet => {
            bet["score"] = 0;
            bet["perfect"] = 0;
            bet["medium"] = 0;
            bet["low"] = 0;
            bet.country_order.forEach((country, index) => {
                let scoreIndex = tempScores.findIndex(x => x.code === country.code);

                if (parseInt(tempScores[scoreIndex].details.judScore) + parseInt(tempScores[scoreIndex].details.audScore) === 0) return;
                let tempScore = 3;
                tempScore -= Math.abs(index-scoreIndex)
                switch (Math.max(tempScore, 0)) {
                    case 3:
                        bet.perfect += 1;
                        break;
                    case 2:
                        bet.medium += 1;
                        break;
                    case 1:
                        bet.low += 1;
                }
                bet.score+=Math.max(tempScore, 0);
            })
        })
        bets = tempBets.sort(((a, b) => (a.score) > (b.score) ? -1 : 1))
    }

    loadBets()
</script>
<main>
    <div class="list-labels">
        <div>Username</div>
        <div class="score-right">
            <div>1pts</div>
            <div>2pts</div>
            <div>3pts</div>
            <div>Score</div>
        </div>
    </div>
    {#if bets.length === 0}Loading...{/if}
    {#each bets as bet, index}
        <Slot>
            <div class="leftside">
                <div class="score">
                    {index + 1}
                </div>
                <div class="username">
                    {bet.username}
                </div>
            </div>
           <div class="score-right">
               <div>{bet.low}</div>
               <div>{bet.medium}</div>
               <div>{bet.perfect}</div>
               <div>{bet.score}</div>
           </div>
        </Slot>
    {/each}
</main>
<style>

    main {
        min-width: 500px;

    }
    .leftside {
        display: flex;
        flex-direction: row;
        height: 100%;
    }

    .username {
        display: flex;
        align-items: center;
        padding: 8px;
    }

    .score-right {
        width: 200px;
        height: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        align-items: center;
        background-color: rgba(1, 1, 1, 0.5);
    }

    .score {
        width: 50px;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(1, 1, 1, 0.5);
    }

    .list-labels {
        margin: 5px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        overflow: hidden;
    }

</style>
