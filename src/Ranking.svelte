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
            bet.country_order.forEach((country, index) => {
                let scoreIndex = tempScores.findIndex(x => x.code === country.code);
                if (index !== scoreIndex) return;
                console.log(tempScores[scoreIndex].details.judScore)
                if (tempScores[scoreIndex].details.judScore + tempScores[scoreIndex].details.audScore === 0) return;
                bet.score++;
            })
        })
        bets = tempBets.sort(((a, b) => (a.score) > (b.score) ? -1 : 1))
    }

    loadBets()
</script>
<main>
    <div class="list-labels">
        <div>Username</div>
        <div>Score</div>
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
           <div class="score">
               {bet.score}
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
