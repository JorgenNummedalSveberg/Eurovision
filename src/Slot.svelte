<script lang="ts">
    import {capitalize, flagURL} from "./HelperFunctions";
    export let index;
    export let country;
    export let sortCountry;
</script>
<main class="slot">
    <div class="flag">
        <img class="flag-item" src={flagURL(country.code)}/>
        <input on:change={sortCountry(country, index)} class="flag-item index-picker" bind:value={index}/>
    </div>
    <div>{capitalize(country.name)}:</div>
    <div>{capitalize(country.artist)}</div>
    <div class="scores">
        <div style="background-color: lightcoral" class="score">{country.judScore}</div>
        <div style="background-color: lightblue" class="score">{country.audScore}</div>
    </div>
</main>
<style>

    .slot {
        background-color: grey;
        border-radius: 8px;
        margin: 5px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        height: 50px;
        overflow: hidden;
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
