<script>
    import { Router, Route } from 'svelte-routing';
    import HomeComponent from './Home.svelte';
    import LiveComponent from './Live.svelte';
</script>

<Router>
    <Route path="/" component={HomeComponent} />
    <Route path="/live" component={LiveComponent} />
</Router>
