<script lang="ts">
  import Nav from '../components/Nav.svelte'
  import { themeStore } from '../modules/configure-theme'

  export let segment: string
</script>

{#if !$themeStore.isLoaded}
  <p>Loading</p>
{:else}
  <Nav {segment} />
  <main>
    <slot />
  </main>
{/if}

<style>
  main {
    position: relative;
    max-width: 56em;
    background-color: white;
    padding: 2em;
    margin: 0 auto;
    box-sizing: border-box;
  }
</style>
