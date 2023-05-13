<script lang="ts">
    import Slot from "./Slot.svelte";
    let data = [];
    let userName = "";
    import {capitalize, flagURL} from "./HelperFunctions";


    function loadScores() {
        fetch('api/scores').then(res => res.json().then(json => {
            data = json.rows.map(x => {
                x.details.code = x.code;
                return x.details;
            });
        }))
    }

    loadScores();

    function updateScore(country, index) {
        let code = country.code;
        delete country.code;
        let jsonCountry = {
            code: code,
            details: country
        }
        fetch('api/scores', {
            method: 'PUT',
            body: JSON.stringify(jsonCountry),
            headers: {
                'Content-Type': 'application/json'
            }}
        ).then(res => {
            if (res.status === 200) {
                loadScores();
            }
        })
        country.code = code;
        data[index].judScore = country.judScore;
        data[index].audScore = country.audScore;
        sortCountries();
    }

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

    function closeBetting() {
        fetch('api/config?closed=true', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }}
        )

    }

    function uploadScores() {

    }

    function openBetting() {
        fetch('api/config?closed=false', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }}
        )
    }
    let fileInput;
    function ImportJson() {
        // const reader = new FileReader();
        // reader.onload = () => {
        //     try {
        //         let scores = JSON.parse(reader.result);
        //         console.log(scores);
        //         fetch('api/upload?json='+reader.result, {
        //             method: 'POST',
        //             headers: {
        //                 'Content-Type': 'application/json'
        //             }}
        //         )
        //     } catch (error) {
        //         console.error(error);
        //     }
        // };
        // reader.readAsText(fileInput.files[0]);
    }
</script>
<main>
    Scores
    <div>
        <button on:click={closeBetting}>Close</button>
        <button on:click={openBetting}>Open</button>
        <input bind:this={fileInput} type="file">
        <button on:click={() => ImportJson()}>Import deck from JSON</button>
    </div>
    <div class="country-list">
        <div class="list-labels">
            <div>Flag</div>
            <div>Country</div>
            <div>Song</div>
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
                        <input style="background-color: lightcoral" class="score" bind:value={country.judScore}/>
                        <input style="background-color: lightblue" class="score" bind:value={country.audScore}/>
                    </div>
                </Slot>
                <div class="country-buttons">
                    <button class="slot-delete" on:click={deleteScore(country.code)}>Delete country</button>
                    <button class="slot-delete" on:click={updateScore(country, index)}>Update country</button>
                </div>
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
