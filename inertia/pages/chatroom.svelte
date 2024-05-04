<script lang="ts">
  // @ts-ignore
  import { inertia, router } from '@inertiajs/svelte'
  import { onMount } from "svelte";
  import type Chat from "#chat/models/chat";

  let chatbox: HTMLElement
  let old: HTMLDivElement
  let page = 1
  let ignoredMessages: string[] = []
  let lastPage: null | number = null
  let isFetching = false

  onMount(async () => {
    await handleScrollFetch()
    chatbox.scrollTop = chatbox.scrollHeight
  })

  async function fetchMessages (){
    const response = await fetch('/fetch', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ignoredMessages, page })
    })
    const { data, meta } = await response.json()
    lastPage = meta.lastPage
    page++
    return data
  }


  function displayFetchedMessages(data: Chat[]){
    data.forEach(chat => {
      const small = document.createElement('small')
      const createdAt = new Date(chat.createdAt.toString())
      small.textContent = createdAt.toLocaleString()
      const p = document.createElement('p')
      const span = document.createElement('span')
      const b = document.createElement('b')
      b.textContent = chat.user.username
      span.textContent = chat.message
      p.appendChild(small)
      p.appendChild(b)
      p.appendChild(span)
      old.appendChild(p)
    })
  }

  async function handleScrollFetch(){
    if(isFetching || (lastPage && page > lastPage) || old.getBoundingClientRect().top <= -100) return
    isFetching = true
    const data = await fetchMessages()
    displayFetchedMessages(data)
    isFetching = false
  }


</script>
<svelte:head>
  <title>Chatroom</title>
</svelte:head>
<div class="container">
  <h1 class="title">Chatroom</h1>
  <div class="chats" bind:this={chatbox} on:scroll={handleScrollFetch}>
    <div class="old" bind:this={old}></div>
    <div class="new"></div>
  </div>

  <a href="/" use:inertia>Go back to homepage</a>
</div>

<style>
  .chats{
    height: 40vh;
    width: min(80vw, 600px);
    border: 1px solid red;
    overflow: scroll;
    padding: 1rem;
  }

  .old{
    display: flex;
    flex-direction: column-reverse;
  }

  :global(.chats p) {
    display: flex;
    gap: .5rem;
    padding: .5rem 0;
    align-items: flex-start;
  }

  :global(.chats small){
    white-space: nowrap;
    margin-top: .2rem;
  }
</style>
