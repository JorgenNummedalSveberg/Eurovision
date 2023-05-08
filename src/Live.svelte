<script lang="ts">
    import Slot from "./Slot.svelte";
    let data = [];
    let userName = "";
    import {capitalize, flagURL} from "./HelperFunctions";


    function sortCountries() {
        data = data.sort((a, b) => (a.judScore + a.audScore) > (b.judScore + b.audScore) ? -1 : 1);
    }

    function loadScores() {
        fetch('api/scores').then(res => res.json().then(json => {
            console.log(json.rows)
            data = json.rows.map(x => {
                x.details.code = x.code;
                return x.details;
            });
            sortCountries();
        }))
    }

    loadScores();

    function setScore() {
        let country = {
            code: codeInput,
            details: {
                name: nameInput,
                artist: artistInput,
                judScore: judScoreInput,
                audScore: audScoreInput,
            }
        }
        fetch('api/scores', {
            method: 'POST',
            body: JSON.stringify(country),
            headers: {
                'Content-Type': 'application/json'
            }}
        ).then(res => {
            if (res.status === 200) {
                loadScores();
            }
        })
        country.details["code"] = country.code;
        data = [...data, country.details];
        sortCountries();

    }

    function deleteScore(code) {
        let country = {
            code: code,
        }
        fetch('api/scores', {
            method: 'DELETE',
            body: JSON.stringify(country),
            headers: {
                'Content-Type': 'application/json'
            }}
        ).then(res => {
            if (res.status === 200) {
                loadScores();
            }
        })
        data = data.filter(x => x.code != code);
    }

    let codeInput = "";
    let nameInput = "";
    let artistInput = "";
    let judScoreInput = 0;
    let audScoreInput = 0;

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
            <div class="slot-container">
                <Slot>
                    <div class="flag">
                        <img alt="country code" class="flag-item" src={flagURL(country.code)}/>
                    </div>
                    <div>{capitalize(country.name)}:</div>
                    <div>{capitalize(country.artist)}</div>
                    <div class="scores">
                        <input style="background-color: lightcoral" class="score" value={country.judScore}/>
                        <input style="background-color: lightblue" class="score" value={country.audScore}/>
                    </div>
                </Slot>
                <button class="slot-delete" on:click={deleteScore(country.code)}>Delete country</button>
            </div>{/each}
        <Slot>
            <div class="flag">
                <input class="flag-item" bind:value={codeInput}/>
            </div>
            <input bind:value={nameInput}/>
            <input bind:value={artistInput}/>
            <div class="scores">
                <input style="background-color: lightcoral" class="score" bind:value={judScoreInput}/>
                <input style="background-color: lightblue" class="score" bind:value={audScoreInput}/>
            </div>
        </Slot>
        <button on:click={setScore}>Add country</button>
    </div>
</main>
<style>
    .country-list {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: stretch;
        width: 620px;
    }

    .list-labels {
        margin: 5px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        overflow: hidden;
    }

    .score {
        border: none;
        width: 50%;
        text-align: center;
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

    .slot-container {
        display: grid;
        grid-template-columns: 1fr 150px;
    }

</style>
