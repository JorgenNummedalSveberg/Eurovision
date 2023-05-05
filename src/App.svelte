<script lang="ts">
    import Slot from "./Slot.svelte";
    let data = [{code: "fr", artist: "", name:"france", audScore: 0, judScore: 0}, {code: "no", artist: "", name:"norway", audScore: 0, judScore: 0}, {code: "de", artist: "", name:"germany", audScore: 0, judScore: 0}, {code: "gb-eng", name: "england", artist: "", audScore: 0, judScore: 0}]
    let userName = "";


    function placeBet() {
        let list = "";
        data.forEach((x, index) => {
            list += "\n "+(index+1)+ " " +x.name;
        })

        const newBet = {
            name: userName,
            country_order: JSON.stringify(data)
        }
    }

    function sortCountry(country, index) {
        data = data.filter(x => x != country);
        if (index == 1) data = [country, ...data];
        else if (index >= data.length) data = [...data, country];
        else data = [...data.slice(0, index-1), country, ...data.slice(index-1, data.length)]
    }

</script>
<main>
    <input bind:value={userName} />
    <button on:click={placeBet}>Place bet</button>
  Eurovision
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
        {#each data as country}
            <Slot sortCountry={sortCountry} index={data.indexOf(country)+1} country={country}></Slot>
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

</style>
