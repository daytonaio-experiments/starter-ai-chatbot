# AI ChatBot and Daytona: Simplifying Development with Svelte and Vercel AI SDK

Ever wondered how those smart chatbots you interact with are made? AI chatbots are more than just a trend—they’re revolutionizing how we communicate with technology. Yet, for many developers, the journey to creating a functional, responsive chatbot can feel like navigating a maze of tools, APIs, and configurations.

That’s where this guide comes in. Instead of building an AI chatbot from scratch, we’ll dive into a pre-built AI Chatbot starter. You’ll learn how the core structure works and, more importantly, how to easily modify or add features to suit your needs. Also, we’re going to make the entire process as smooth as possible.

The key to this streamlined approach? Daytona.

Consider Daytona, your trusted co-pilot in the development process. It eliminates the hurdles of environment setup and dependency management, enabling you to focus on what truly matters—building and innovating. In this guide, we’ll show you how Daytona can help you get your AI chatbot up and running seamlessly without the usual complications.

## Key Technologies Powering the Chatbot

This application uses a combination of modern technologies to deliver a robust and efficient development experience. Here are the key technologies that make it stand out:

**AI-Powered Chat Interface:**
The application features a responsive chatbot interface built with Vercel AI SDK, enabling smooth and intelligent user interactions.

**Svelte Framework:**
Svelte is used to create a fast and reactive front end, ensuring a seamless and efficient user experience.

**Groq API Integration:**
The Groq API, utilizing the llama-3.1 model, provides advanced AI capabilities, allowing the chatbot to generate accurate and context-aware responses.

## Setting Up Your Development Environment

A well-set-up development environment is key to a smooth workflow. In this guide, we’ll show you how to quickly set up your environment using a pre-configured repository configured for this chatbot application. With Daytona, we’ll simplify the setup process, allowing you to focus on building your application.

> The full codebase, along with all configuration and setup details, is available on our GitHub repository: [https://github.com/daytonaio-experiments/starter-ai-chatbot](https://github.com/daytonaio-experiments/starter-ai-chatbot)

### Prerequisites

Before we begin, make sure you have the following tools and knowledge to set up your development environment:

* Daytona installed on your system
* Docker installed and running (e.g., Docker Desktop)
* Basic understanding of Svelte and the Vercel AI SDK
* Groq API key (You can obtain it from [Groq's website](https://console.groq.com/keys))

### Setting up Daytona for Development Workspace

Configuring a development environment for your chatbot can be a complex task, with potential challenges like version conflicts and dependency management. [Daytona](https://www.daytona.io/) simplifies this process by automating the setup of your development environment. It handles everything from managing essential tools like TypeScript and Git to ensuring smooth port forwarding for your Dev Server.

With Daytona, you can focus on building your AI chatbot without the usual setup headaches. The pre-configured Dev Container ensures that your environment is consistent and ready to use right away.

For detailed instructions on installing and configuring Daytona for this project, refer to the [Daytona installation documentation](https://www.daytona.io/docs/). This guide will help you get your development environment optimized and running smoothly.

### Cloning and Setting Up Your Environment for the Chatbot

1. **Start Daytona Server**:

* Open your terminal and start the Daytona server using the following command:
```bash
daytona serve
```

2. **Create and Open in Daytona Workspace:**
```bash
daytona create https://github.com/daytonaio-experiments/starter-ai-chatbot.git --code
```

* After executing this command, the repository will open in your preferred IDE.

![](/docs/assets/ai-chatbot-image-2.png)

3. **Create a .env file in the root directory and add the following line:**
```
GROQ_API_KEY="<YOUR_GROQ_API_KEY>"
```

4. **Run the application using:**
```
npm run dev
```
Your AI Chatbot app should now be up and running.

![](/docs/assets/ai-chatbot-image-1.png)

## Daytona and Dev Container: A Perfect Match for Developers

Daytona takes care of all the heavy lifting when it comes to setting up and managing your development environment so you can focus on what really matters—building your AI chatbot. It saves you time on tedious setup tasks, letting you get straight into development and boost your productivity.

Daytona enhances the development experience by providing a standardized and scalable environment. This setup ensures that your development workspace is consistent across different machines, eliminating the need for complex local configurations.

The project uses a `devcontainer.json` configuration to provide a predefined development environment using Docker containers. Here’s the configuration used in this project:

```json
{
  "name": "starter ai chatbot devcontainer",
  "image": "ubuntu:22.04",
  "features": {
    "ghcr.io/devcontainers/features/common-utils:2.4.7": {
      "username": "daytona",
      "userUid": 1000,
      "userGid": 1000,
      "configureZshAsDefaultShell": true
    },
    "ghcr.io/devcontainers/features/node:1": {
      "nodeGypDependencies": true,
      "version": "lts",
      "nvmVersion": "0.40.0"
    },
    "ghcr.io/devcontainers-contrib/features/typescript:2": {},
    "ghcr.io/devcontainers/features/git:1": {}
  },
  "overrideFeatureInstallOrder": [
    "ghcr.io/devcontainers/features/common-utils",
    "ghcr.io/devcontainers/features/git",
    "ghcr.io/devcontainers/features/node",
    "ghcr.io/devcontainers-contrib/features/typescript"
  ],
  "customizations": {
    "vscode": {
      "extensions": [
        "svelte.svelte-vscode",
        "esbenp.prettier-vscode",
        "dbaeumer.vscode-eslint",
        "ms-vscode.vscode-typescript-next"
      ]
    }
  },
  "portsAttributes": {
    "5173": {
      "label": "Vite Dev Server",
      "onAutoForward": "notify"
    }
  },
  "workspaceFolder": "/workspaces/starter-ai-chatbot",
  "postCreateCommand": "npm install",
  "remoteUser": "daytona"
}
```
This configuration includes:

- **name**: Defines the name of the development environment as "starter ai chatbot devcontainer".
- **image**: Uses the base image "ubuntu:22.04" for the development container.
- **features**: Includes common utilities, Node.js (LTS), TypeScript, and Git for the user "daytona".
- **overrideFeatureInstallOrder**: Specifies the installation order to ensure proper setup.
- **customizations**: Installs VSCode extensions for Svelte, Prettier, ESLint, and TypeScript.
- **portsAttributes**: Sets up port forwarding for the Vite Dev Server on port 5173 with a notification.
- **workspaceFolder**: Specifies the workspace folder as "/workspaces/starter-ai-chatbot".
- **postCreateCommand**: Runs `npm install` to install dependencies upon container creation.
- **remoteUser**: Sets the remote user to "daytona" for the development environment.

## Unpacking the AI Chatbot: Key Components Explained

Now that we’ve set up and run our AI chatbot, let’s break down the structure of the application to understand how all the pieces fit together seamlessly.

The project is organized to ensure clarity, maintainability, and efficiency. Here’s a closer look at how the files and directories are structured:

- **.devcontainer**: Contains the `devcontainer.json` file, which defines the development environment, making it easy to set up and maintain a consistent workspace.
  
- **src**: The core of the Svelte application, where the main functionality is implemented.

  - **routes**: Defines the different routes in the application.
  
    - **api/chat**: 
      - This folder handles API requests related to the chatbot.
      - The `+server.ts` file manages the server-side logic and integrates with the Groq API, using the llama-3.1 model to stream AI responses.
      - A key aspect is the **system prompt**, which defines the chatbot’s persona as a "seasoned development assistant and DevOps expert."
      - System prompt ensures that responses remain focused, efficient, and professional, guiding the AI’s behavior throughout conversations.
  
    - **+layout.svelte**: 
      - The layout component that wraps around the page content, ensuring a consistent look and feel across the entire application.
  
    - **+page.svelte** and **+page.ts**: 
      - These files represent the main chat interface, where users interact with the chatbot.
      - The `+page.svelte` file uses the `useChat` hook to manage chat state, handle input, and display messages in real-time.
      - The chat interface automatically scrolls to the most recent message, providing a smooth and uninterrupted conversation flow.
      - It also includes basic error handling, letting users retry in case of failures, and a loading state to improve the overall experience.

  - **styles.css**: Contains global styles that apply across the application, ensuring a consistent visual design.
  
  - **app.html**: The HTML template that serves as the entry point for the Svelte application.

- **static**: Stores static assets like images, SVGs, and other files that are served directly without processing.

- **.env**: The environment file where sensitive information like API keys can be securely stored.

## Tailoring Your AI Chatbot: Personalization and Features

Now that you’ve set up the core AI chatbot, you might be wondering how to make it your own. Customizing your chatbot to better fit your specific use case can elevate the overall user experience and enhance its functionality. In this section, we’ll guide you on how to modify and personalize your AI chatbot.

### 1. **Modifying the Chatbot Interface**

The design and feel of the chatbot interface play a key role in how users interact with it. You can tweak the layout and styling to match your brand or desired aesthetic. Here’s a quick guide on how to do that:

- **Change the Welcome Message**: In the `+page.svelte` file, you can update the welcome message to something more personalized.
  
  Example:
  ```svelte
  {#if !hasStartedTyping}
    <h1 class="heading">Hello there! 👋</h1>
    <div class="subheading">
      <h2>I'm your virtual assistant. How can I assist you today?</h2>
    </div>
  {/if}

- **Update the Styles**: Modify the `styles.css` file to change colors, fonts, or other visual elements to reflect your brand.

  Example:
  ```css
  .heading {
    color: #2a9d8f;
    font-size: 2.5rem;
  }

  .message-card.user {
    background-color: #f4a261;
    width: 50%;
  }

  .message-card.assistant {
    background-color: #ff0000;
    width: 40%;
  }
  ```
### 2. **Customizing with Vercel AI SDK**

The Vercel AI SDK offers a robust set of features that allows you to modify the behavior and extend the functionality of your chatbot. Here’s how you can customize it using Vercel’s SDK:

- **Handle Custom Events or Actions**: Vercel AI SDK allows you to define custom actions to handle specific user inputs or events. You can customize the chatbot’s behavior for specific queries or commands. You can make the following changes in your `+page.svelte` file.

  Example:
  ```svelte
  import { useChat } from "@ai-sdk/svelte";
  
  const { handleSubmit, messages, input } = useChat({
    onFinish(message) {
      if (message.content.includes("help")) {
        console.log("User requested help");
        // Custom action or response
      }
    }
  });
  ```
- **Custom Error Handling**: You can enhance error handling to improve user experience, making the chatbot more resilient to issues like API failures or network errors. This way, you can ensure the chatbot gracefully handles any issues that arise during interactions. You can modify your `+page.svelte` with these changes.

Example:
```svelte
const { error, reload } = useChat({
  onError(err) {
    console.error("An error occurred:", err);
    // Provide a custom response or retry logic
  }
});

if (error) {
  // Display a user-friendly message
  return "Oops! Something went wrong. Please try again.";
}
```
- **Optimize AI Model Selection**: You can experiment with different model configurations provided by Vercel AI SDK to optimize the chatbot's responses. This allows you to balance performance and accuracy based on your use case. You can modify your `+server.ts` with these changes.

Example:

```ts
const groq = createOpenAI({
  baseURL: 'https://api.groq.com/openai/v1',
  apiKey: env.GROQ_API_KEY,
});

const result = await generateText({
  model: groq('llama3-8b-8192'),
  prompt: 'Generate a product description.',
  temperature: 0.7, // Adjust the temperature for more creative responses
  maxTokens: 1000, // Limit the number of tokens per response
});

```

### 3. **Personalizing the System Prompt**

The system prompt in the `+server.ts` file determines the chatbot’s persona and tone. You can adjust it based on your project’s needs to change how the chatbot responds to user queries.

You can make the chatbot more specific to your use case, for example, a financial advisor, a customer support agent, or a developer guide.

  Example:

  ```ts
    const systemPrompt = {
      role: 'system',
      content: 'You are a professional financial advisor specializing in stock market investments. Provide users with accurate, timely, and well-researched advice based on the latest market trends.'
    };
```

These examples give you a glimpse into how versatile the AI chatbot can be. Whether it’s design tweaks, API integrations, or changing the chatbot’s personality, you have full control to create an AI chatbot that perfectly aligns with your project’s goals and user needs.

## Conclusion

Awesome job! You’ve not only set up your AI chatbot using Svelte, Vercel AI SDK, and Groq API, but you’ve also taken advantage of [Daytona](https://www.daytona.io/) to make your development process smooth and hassle-free.

With everything in place, you’ve built a powerful, responsive chatbot that’s ready to be customized and scaled to meet your unique needs. Daytona has helped you skip the usual setup headaches, letting you focus on what matters—building something great.

As you continue to refine and expand your chatbot, remember you’re not alone. If you ever hit a bump along the way, the Daytona team is just a message away, and their [community](https://go.daytona.io/slack) is there to help. Now, go ahead and make your chatbot even better, and enjoy the journey ahead!
