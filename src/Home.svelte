<script lang="ts">
    import Live from "./Live.svelte";
    import Bet from "./Bet.svelte";
    import Ranking from "./Ranking.svelte";

    let selectedTab = "bet";

</script>
<main>
    <div class="buttons">
        <button on:click={() => selectedTab = 'bets'}>Bet ranking</button>
        <button on:click={() => selectedTab = 'bet'}>Place bet</button>
    </div>
    <div>
        {#if selectedTab === 'bets'}
            <Ranking></Ranking>
        {:else if selectedTab === 'bet'}
            <Bet></Bet>
        {/if}
    </div>
</main>
<style>
    main {
        display: grid;
        grid-template-rows: 100px 1fr;
    }
    .buttons {
        padding: 8px;
    }
</style>
