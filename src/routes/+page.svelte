<script lang="ts">
  import { onMount, afterUpdate } from 'svelte';
  import { useChat } from '@ai-sdk/svelte';

  const {
    error,
    input,
    isLoading,
    handleSubmit,
    messages,
    reload,
    stop
  } = useChat({
    keepLastMessageOnError: true,
    onFinish(message, { usage, finishReason }) {
      console.log('Usage', usage);
      console.log('FinishReason', finishReason);
    },
  });

  let messagesContainer: HTMLElement;

  function scrollToBottom() {
    if (messagesContainer) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  }

  afterUpdate(() => {
    scrollToBottom();
  });

  onMount(() => {
    scrollToBottom();
  });

  let hasStartedTyping = false;
  function handleInputChange(event: Event) {
  const target = event.target as HTMLInputElement;
  hasStartedTyping = target.value.length > 0;
}
</script>

<svelte:head>
  <title>Home</title>
  <meta name="description" content="Svelte demo app" />
</svelte:head>

<div class="page-container">
  <aside class="sidebar">
    <img src="/logo.svg" alt="Logo" class="logo" />
    <nav class="sidebar-nav">
      <button class="new-chat-btn">+ New Chat</button>
    </nav>
  </aside>

  <section class="content">
    {#if !hasStartedTyping}
      <h1 class="heading">Hi User!!</h1>
      <div class="subheading">
        <h1>How can I help you ?</h1>
      </div>
    {/if}

    <div class="messages-container" bind:this={messagesContainer}>
      {#each $messages as message}
        <div class="message-card {message.role}">
          <p class="message-role">{message.role}:</p>
          <p class="message-content">{message.content}</p>
        </div>
      {/each}
    </div>

    {#if $error}
      <div class="mt-4">
        <div class="text-red-500">An error occurred.</div>
        <button
          type="button"
          class="px-4 py-2 mt-4 text-blue-500 border border-blue-500 rounded-md"
          on:click={() => reload()}
        >
          Retry
        </button>
      </div>
    {/if}

    <form on:submit={handleSubmit} class="form">
      <img src="/Frame 301.svg" alt="Frame" class="svg-frame" />
      {#if $isLoading}
      <div class="mt-4 text-gray-500">
        <div>Loading...</div>
        <button
          type="button"
          class="stop-button"
          on:click={stop}
        >
          Stop
        </button>
      </div>
    {/if}
      <input 
        bind:value={$input} 
        on:input={handleInputChange}
        disabled={$isLoading || $error != null} 
        class:loading={$isLoading} 
      />
      <img src="/mic.svg" alt="Mic" class="svg-mic" />
      <button 
        type="submit"
        class:loading={$isLoading}
      >
        <img src="/send1.svg" alt="Send" class="svg-send" />
      </button>
    </form>
  </section>
</div>

<style>

 .page-container {
  display: flex;
  flex-direction: row;
}

.sidebar {
  background-color: #0D0D0D;
  color: white;
  width: 250px;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  box-sizing: border-box;
  transition: width 0.3s ease;
}

.logo {
  width: 160px;
  margin-bottom: 2rem;
}

.sidebar-nav {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.new-chat-btn {
  background-color: #0D0D0D;
  border: 2px solid #2ECC71;
  color: #2ECC71;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  width: 100%;
  text-align: center;
  margin-top: 1rem;
}

.new-chat-btn:hover {
  background-color: #2ECC71;
  color: white;
}

.content {
  margin-left: 250px;
  padding: 1rem;
  width: calc(100% - 250px);
  box-sizing: border-box;
  transition: margin-left 0.3s ease, width 0.3s ease;
}

.heading {
  width: 100%;
  color: #2ECC71;
  font: Hindi;
  text-align: center;
  padding-top: 2rem;
  margin-bottom: -1rem;
}

.subheading {
  font: Hindi;
  color: #FFFFFF;
  text-align: center;
  margin-top: 0;
  margin-bottom: 1rem;
}

.cards-container {
  display: flex;
  justify-content: flex-start;
  gap: 1rem;
  flex-wrap: wrap;
  width: 100%;
  box-sizing: border-box;
}

.card {
  background-color: black;
  border: 3px solid #2ECC71;
  border-radius: 0.5rem;
  padding: 1rem;
  flex: 1;
  max-width: 100%;
  min-width: 250px;
  text-align: center;
  box-sizing: border-box;
}

.card-title {
  color: white;
  margin-bottom: 0.5rem;
}

.card-content {
  color: white;
}

.messages-container {
  height: 400px;
  overflow-y: auto;
  padding: 1rem;
  box-sizing: border-box;
  scrollbar-width: none;
}

.messages-container::-webkit-scrollbar {
  display: none;
}

.message-card {
  background-color: gray;
  border-radius: 0.5rem;
  padding: 1rem;
  max-width: 100%;
  width: fit-content;
  color: white;
  box-sizing: border-box;
  margin-bottom: 20px;
}

.message-role {
  font-weight: bold;
  color: #2ECC71; 
}

.message-content {
  margin-top: 0.5rem; 
}


.message-card.user {
  background-color: #0D0D0D;
  width: 100%;
}

.message-card.assistant {
  background-color: #0D0D0D;
  width: 100%;
}

.form {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 55%;
  position: fixed;
  bottom: 0;
  background-color: black;
  box-sizing: border-box;
  padding-bottom: 1.0rem;
}

.messages-container {
  height: calc(100vh - 120px); 
  overflow-y: auto;
  padding: 1rem;
  box-sizing: border-box;
  scrollbar-width: none;
}


input {
  border: 2px solid #2ECC71;
  background-color: transparent;
  color: white;
  padding: 0.5rem;
  border-radius: 0.3rem 0.3rem 0.3rem 0.3rem;
  flex-grow: 1;
  min-width: 200px;
  box-sizing: border-box;
}

button {
  border: 2px solid #2ECC71;
  background-color: transparent;
  color: #2ECC71;
  padding-top: 1px;
  border-radius: 0.25rem 0.25rem 0.25rem 0.25rem;
  cursor: pointer;
  box-sizing: border-box;
  margin: 0;
}

.stop-button {
    border-radius: 0.3rem 0.3rem 0.3rem 0.3rem;
    padding: 0.5rem 2rem;
    margin-bottom: 1.2rem; 
    margin-right: 0.5rem; 
    color: #2ECC71; 
    border: 1px solid #2ECC71;
    border-radius: 0.375rem; 
    background-color: transparent;
    cursor: pointer; 
}

.svg-frame {
  margin-right: 0.5rem;
  width: 37px;
  height: 37px;
}

.svg-mic {
  margin-left: 0.3rem;
  margin-right: 0.3rem;
  width: 30px;
  height: 30px;
}

.svg-send {
  width: 24px;
  height: 24px;
  background-color: transparent;
  cursor: pointer;
  margin-top: 0.3rem;
}

@media (max-width: 768px) {
  .sidebar {
    width: 100%;
    height: auto;
  }
  .input{
    margin-left: 0%;
  }
  .stop-button{
    padding: 0.5rem 0.5rem;
  }
  .form{
    width: 88%;
  }
  .content {
    margin-left: 0;
    width: 100%;
  }

  .cards-container {
    display: none;
  }

  .heading,
  .subheading {
    display: none;  
  }
}
</style>