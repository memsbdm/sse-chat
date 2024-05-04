<script lang="ts">
  // @ts-ignore
  import { inertia, router } from '@inertiajs/svelte'
  export let version: number

  function handleSubmit(){
    router.visit('/auth/logout', { method: 'delete' })
  }
</script>

<svelte:head>
  <title>Homepage</title>
</svelte:head>

<div class="container">
  <div class="title">AdonisJS { version } x Inertia x Svelte</div>

  <span>
    Learn more about AdonisJS and Inertia.js by visiting the
    <a href="https://docs.adonisjs.com/guides/inertia">AdonisJS documentation</a>.
  </span>

  <a href="/chatroom" use:inertia>Join Chat Room</a>
  <form on:submit|preventDefault={handleSubmit}>
    <button type="submit">Logout</button>
  </form>
</div>

<style>
  button{
    margin-top: 1rem;
    padding: .5rem 2rem;
    background-color: #ff0000;
    color: white;
    border: none;
    outline: none;
    cursor: pointer;
  }
</style>
