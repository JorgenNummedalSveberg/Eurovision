import './app.css'
import App from './App.svelte'
import { initThinBackend } from 'thin-backend';

initThinBackend({
    // This url is different for each backend, this one points to 'eurovision'
    host: 'https://eurovision.thinbackend.app'
});


const app = new App({
  target: document.getElementById('app'),
})

export default app

