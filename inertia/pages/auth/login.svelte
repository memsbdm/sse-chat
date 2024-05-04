<script lang="ts">
  // @ts-ignore
  import { inertia, router } from '@inertiajs/svelte'

  export let errors: Record<string, string> = {}

  let data = {
    uid: null,
    password: null
  }

  function handleSubmit(){
    router.visit('/auth/login', {method: 'post', data: data})
  }
</script>


<svelte:head>
  <title>Login</title>
</svelte:head>

<div class="container">
  <h1 class="title">Welcome back!</h1>
  <form on:submit|preventDefault={handleSubmit}>
    {#if errors.auth}
      <small>{errors.auth}</small>
    {/if}
    <input type="text" id="uid" placeholder="email or username" bind:value={data.uid} />
    <input type="password" id="password" placeholder="password" bind:value={data.password} />
    <button type="submit">Login</button>
  </form>
  <p>Not registered yet? <a href="/register" use:inertia>Register</a></p>
</div>

<style>
  form{
    display: flex;
    flex-direction: column;
    width: max(20vw, 20rem);
    margin-top: 1rem;
  }

  form input{
    padding: .5rem;
    border: none;
    outline: none;
    background-color: transparent;
    border-bottom: 1px solid black;
    margin-top: 2rem;
  }

  form button{
    margin-top: 2rem;
    padding: .5rem;
    margin-bottom: 1rem;
  }

  small{
    text-align: center;
    color: red;
  }
</style>
