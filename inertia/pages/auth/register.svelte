<script lang="ts">
  // @ts-ignore
  import { inertia, router } from '@inertiajs/svelte'

  export let errors: Record<string, string> = {}

  let data = {
    username: null,
    email: null,
    password: null,
    passwordConfirmation: null
  }

  function handleSubmit(){
    router.visit('/auth/register', {method: 'post', data: data})
  }
</script>


<svelte:head>
  <title>Register</title>
</svelte:head>
<div class="container">
  <h1>Join Us!</h1>
  <form on:submit|preventDefault={handleSubmit}>
    <input type="text" id="username" bind:value={data.username} placeholder="username" />
    {#if errors.username}<small>{errors.username}</small>{/if}
    <input type="email" id="email" bind:value={data.email} placeholder="email" />
    {#if errors.email}<small>{errors.email}</small>{/if}
    <input type="password" id="password" bind:value={data.password} placeholder="password" />
    {#if errors.password}<small>{errors.password}</small>{/if}
    <input
      type="password"
      id="passwordConfirmation"
      bind:value={data.passwordConfirmation}
      placeholder="password confirmation"
    />
    <button type="submit">Login</button>
  </form>
  <p>Already have an account? <a href="/login" use:inertia>Login</a></p>
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
