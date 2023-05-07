<script lang="ts">
    import Live from "./Live.svelte";
    import Bet from "./Bet.svelte";

    let selectedTab = "live";
</script>
<main>
    <div class="buttons">
        <button on:click={() => selectedTab = 'live'}>Live scores</button>
        <button on:click={() => selectedTab = 'bet'}>Place bet</button>
    </div>
    <div>
        {#if selectedTab === 'live'}
            <Live></Live>
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
