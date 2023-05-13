<script lang="ts">
    import Slot from "./Slot.svelte";
    let data = [];
    let userName = "";
    import {capitalize, flagURL} from "./HelperFunctions";


    async function placeBet() {
        const newBet = {
            username: userName,
            country_order: data
        }
        fetch('/api/bet', {
                method: 'POST',
                body: JSON.stringify(newBet),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        ).then(res => res.json().then(json => console.log(json)))
    }

    function sortCountry(country, prevIndex, htmlElement) {
        let index = htmlElement.value;
        data = data.filter(x => x != country);
        if (index <= 1) data = [country, ...data];
        else if (index > data.length) data = [...data, country];
        else data = [...data.slice(0, index-1), country, ...data.slice(index-1, data.length)]
        htmlElement.value = prevIndex+1;

    }
    fetch('api/scores').then(res => res.json().then(json => {
        data = json.rows.map(x => {
            x.details.code = x.code;
            return x.details;
        });
    }));
</script>
<main>
    <input bind:value={userName} />
    <button on:click={placeBet}>Place bet</button>
    <div class="country-list">
        <div class="list-labels">
            <div class="left-side">
                <div class="flag">
                    <div class="flag-item">Flag</div>
                </div>
                <div class="country-name">Country</div>
            </div>
            <div>Song</div>
            <div class="order">Order</div>
        </div>
            {#each data as country, index}
            <Slot>
                <div class="left-side">
                    <div class="flag">
                        <img alt="error" class="flag-item" src={flagURL(country.code)}/>
                    </div>
                    <div class="country-name">{capitalize(country.name)}:</div>
                </div>
                <div>{capitalize(country.artist)}</div>
                <div class="flag">
                    <input on:change={(event) => sortCountry(country, index, event.target)} class="index-picker" value={index+1}/>
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

    .order {
        margin-right: 20px;
    }

    .list-labels {
        margin: 5px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        overflow: hidden;
    }

    .country-name{
        padding: 8px;
    }
    .left-side {
        display: flex;
        flex-direction: row;
        height: 100%;
        align-items: center;
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
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .index-picker {
        background-color: rgba(0, 0, 0, 0.5);
        color: white;
        display: flex;
        text-align: center;
        border: none;
        height: 100%;
        width: 100%;
    }
    .index-picker:focus {
        outline: none;
    }

</style>
