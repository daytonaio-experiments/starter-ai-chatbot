<script lang="ts">
  import { onMount, afterUpdate } from "svelte";
  import { useChat } from "@ai-sdk/svelte";

  const { error, input, isLoading, handleSubmit, messages, reload, stop } =
    useChat({
      keepLastMessageOnError: true,
      onFinish(message, { usage, finishReason }) {
        console.log("Usage", usage);
        console.log("FinishReason", finishReason);
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
  <title>AI Chat Demo</title>
  <meta name="description" content="Svelte demo app" />
</svelte:head>

<div class="page-container">
  <aside class="sidebar">
    <img src="/ai-chat-demo.png" alt="Logo" class="logo" />
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

    <form on:submit={handleSubmit} class="form">
      {#if $error}
        <div class="mt-4 text-gray-500">
          <div class="text-red-500">An error occurred.</div>
          <button type="button" class="stop-button" on:click={() => reload()}>
            Retry
          </button>
        </div>
      {/if}
      {#if $isLoading}
        <div class="mt-4 text-gray-500">
          <div>Loading...</div>
          <button type="button" class="stop-button" on:click={stop}>
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
      <button type="submit" class:loading={$isLoading}>
        <img src="/send.svg" alt="Send" class="svg-send" />
      </button>
    </form>
  </section>
  <footer class="footer">
    <p class="cta">
      Simplify your dev environment with <a
        href="https://github.com/daytonaio-experiments/starter-ai-chatbot"
        target="_blank">Daytona</a
      >
    </p>
  </footer>
</div>