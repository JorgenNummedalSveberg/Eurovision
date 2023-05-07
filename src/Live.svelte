<script lang="ts">
    import Slot from "./Slot.svelte";
    let data = [{code: "fr", artist: "", name:"france", audScore: 0, judScore: 0}, {code: "no", artist: "", name:"norway", audScore: 0, judScore: 0}, {code: "de", artist: "", name:"germany", audScore: 0, judScore: 0}, {code: "gb-eng", name: "england", artist: "", audScore: 0, judScore: 0}]
    let userName = "";
    import {capitalize, flagURL} from "./HelperFunctions";


    function placeBet() {
        const newBet = {
            username: userName,
            country_order: data
        }
        fetch('http://localhost:3000/eurovision/bet', {
            method: 'POST',
            body: JSON.stringify(newBet),
            headers: {
                'Content-Type': 'application/json'
            }}
        ).then(res => res.json().then(json => console.log(json)))
    }

    function sortCountry(country, index) {
        data = data.filter(x => x != country);
        if (index == 1) data = [country, ...data];
        else if (index >= data.length) data = [...data, country];
        else data = [...data.slice(0, index-1), country, ...data.slice(index-1, data.length)]
    }

</script>
<main>
    Scores
    <div class="country-list">
        <div class="list-labels">
            <div>Flag</div>
            <div>Country</div>
            <div>Artist</div>
            <div class="score-labels">
                <div>{"Judge\nscore"}</div>
                <div>{"Audience\nscore"}</div>
            </div>
        </div>
        {#each data as country, index}
            <Slot>
                <div class="flag">
                    <img class="flag-item" src={flagURL(country.code)}/>
                </div>
                <div>{capitalize(country.name)}:</div>
                <div>{capitalize(country.artist)}</div>
                <div class="scores">
                    <div style="background-color: lightcoral" class="score">{country.judScore}</div>
                    <div style="background-color: lightblue" class="score">{country.audScore}</div>
                </div>
            </Slot>
        {/each}
    </div>
</main>
<style>
    .country-list {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: stretch;
        width: 500px;
    }

    .list-labels {
        margin: 5px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        overflow: hidden;
    }


    .score-labels {
        display: flex;
        flex-direction: row;
        width: 120px;
    }
    .flag {
        width: 80px;
        height: 100%;
        position: relative;
    }

    .flag-item {
        position: absolute;
        left: 0;
        width: 100%;
        height: 100%;
        padding: 0;
        border: none;
    }

    .index-picker {
        background-color: transparent;
        color: transparent;
        display: flex;
        text-align: center;
    }

    .index-picker:hover {
        background-color: rgba(0, 0, 0, 0.5);
        color: white;
    }

    .scores {
        width: 120px;
        height: 100%;
        display: flex;
        flex-direction: row;
        justify-content: stretch;
        align-items: stretch;
    }

    .score {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-grow: 1;
    }

</style>
