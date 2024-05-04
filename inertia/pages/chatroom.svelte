<script lang="ts">
  // @ts-ignore
  import { inertia, router } from '@inertiajs/svelte'
  import { onMount } from "svelte";
  import type Chat from "#chat/models/chat";
  import { MERCURE_URL } from "#core/constants/constants";

  let chatbox: HTMLElement
  let oldChats: HTMLDivElement
  let newChats: HTMLDivElement
  let page = 1
  let ignoredMessages: string[] = []
  let lastPage: null | number = null
  let isFetching = false
  let message = ''

  onMount(() => {
    const url = new URL(MERCURE_URL)
    url.searchParams.append('topic', '/chat')
    const eventSource = new EventSource(url, { withCredentials: true })
    ;(async () => {
      await handleScrollFetch()
      chatbox.scrollTop = chatbox.scrollHeight
    })()

    eventSource.onmessage = (e) => {
      const data = JSON.parse(e.data)

      if(data.eventType === 'message'){
        addMessage(data)
      }

      else if (data.eventType === 'info'){
        addInfo(data)
      }
      chatbox.scrollTop = chatbox.scrollHeight
    }

    eventSource.onopen = () => {
      router.get('/join')
    }


    window.addEventListener('beforeunload', async () => {
      router.get('/leave')
      eventSource.close()
    })

    return () => {
      router.get('/leave')
      eventSource.close()
    }
  })

  function addMessage(data: Record<string, string>){
    const small = document.createElement('small')
    const createdAt = new Date(data.createdAt.toString())
    small.textContent = createdAt.toLocaleString()
    const p = document.createElement('p')
    const span = document.createElement('span')
    const b = document.createElement('b')
    b.textContent = data.username
    span.textContent = data.message
    p.appendChild(small)
    p.appendChild(b)
    p.appendChild(span)
    newChats.appendChild(p)
  }
  function addInfo(data: Record<string, string>){
    const em = document.createElement('em')
    if(data.eventDetail === 'join')
      em.textContent = data.username + ' has joined the chat'
    else if (data.eventDetail === 'leave')
      em.textContent = data.username + ' has left the chat'

    newChats.appendChild(em)
  }

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
      oldChats.appendChild(p)
    })
  }

  async function handleScrollFetch(){
    if(isFetching || (lastPage && page > lastPage) || oldChats.getBoundingClientRect().top <= -100) return
    isFetching = true
    const data = await fetchMessages()
    displayFetchedMessages(data)
    isFetching = false
  }

  async function handleSubmit(){
    if (message.trim() === '') return
    await router.post('/chat', { message })
    message = ''
  }


</script>
<svelte:head>
  <title>Chatroom</title>
</svelte:head>
<div class="container">
  <h1 class="title">Chatroom</h1>
  <div class="chats" bind:this={chatbox} on:scroll={handleScrollFetch}>
    {#if lastPage && page > lastPage}
      <em>No more messages!</em>
    {/if}
    <div class="old" bind:this={oldChats}></div>
    <div class="newChat" bind:this={newChats}></div>
  </div>
  <form on:submit|preventDefault={handleSubmit}>
    <input type="text" bind:value={message} placeholder="Enter your message" />
  </form>
  <a href="/" use:inertia>Go back to homepage</a>
</div>

<style>
  .chats{
    display: flex;
    flex-direction: column;
    height: 40vh;
    width: min(80vw, 600px);
    border: 1px solid black;
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
    word-break: break-word;
  }

  :global(.chats small){
    white-space: nowrap;
    margin-top: .2rem;
  }

  :global(em){
    text-align: center;
    display: block;
  }

  input{
    width: min(80vw, 600px);
    padding: 0.5rem 1rem;
    margin: 1rem;
  }
</style>
