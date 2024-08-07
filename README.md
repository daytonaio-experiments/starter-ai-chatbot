# AI ChatBot Starter with Vercel AI SDK, Svelte, and Groq

This project is a simple AI chatbot built using Vercel AI SDK, Svelte, and GROQ API. The chatbot provides an interactive interface where users can engage with AI-driven responses. The project is set up with a devcontainer configuration for easy development setup using Daytona.

![ai-chatbot-v2](https://github.com/user-attachments/assets/ed0cf635-7fe6-4e9c-8136-59906ad28148)

## Features

- **AI Chatbot**: A simple interface to interact with an AI chatbot.
- **Vercel AI SDK**: Integrated Vercel's AI SDK for handling chat interactions.
- **GROQ API**: Utilizes Groq API for llama-3.1 Model.
- **Svelte**: Built with Svelte for a fast and reactive frontend.
- **DevContainer Support**: Ready to use with Daytona workspace with a pre-configured devcontainer.

## Technologies Used

### Frontend:
- **Svelte** - A modern JavaScript framework for building fast and reactive user interfaces.
### AI SDK:
- **Vercel AI SDK** - Tools and services to power AI-driven interactions.
### API:
- **Groq API** - Required to access Groq AI services for llama-3.1 Model.

## Setting Up Workspace for the Project

**Requirements**

- Preinstalled Daytona and Docker.
- Running Daytona server using `daytona serve` command.

**Steps to Set Up Daytona Workspace**

1. Create Daytona Workspace:

```
daytona create https://github.com/daytonaio-experiments/starter-ai-chatbot.git
```

2. Select Preferred IDE:

```
daytona ide
```

3. Open the Workspace:

```
daytona code
```

4. Create a .env file in the root directory and add the following line:
```
GROQ_API_KEY="<YOUR_GROQ_API_KEY>"
```
5. Run the application using:
```
npm run dev
```
## DevContainer Configuration

The project includes a devcontainer configuration for seamless development in a containerized environment.

### `devcontainer.json`

```json
{
  "name": "starter ai chatbot devcontainer",
  "image": "mcr.microsoft.com/devcontainers/typescript-node",
  "features": {
    "ghcr.io/devcontainers/features/node:1": {
      "version": "latest"
    },
    "ghcr.io/devcontainers/features/git:1": {},
    "ghcr.io/devcontainers/features/common-utils:2.4.4": {
      "username": "daytona",
      "configureZshAsDefaultShell": true
    }
  },
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
  "onCreateCommand": "npm install",
  "remoteUser": "daytona"
}
```
This configuration includes:

- **name**: Specifies the name of the development environment.
- **image**: Uses the Microsoft container registry image for typescript and Node.js development.
- **features**: Adds Node.js, Git, and Zsh with common utilities for the user "daytona".
- **portsAttributes**: Sets up port forwarding for the Vite development server on port 5173.
- **customizations**: Installs essential VSCode extensions for Svelte, Prettier, ESLint, and TypeScript.
- **onCreateCommand**: Installs npm dependencies with npm install upon container creation.
- **remoteUser**: Sets the remote user to "daytona".

## Why Daytona?

Daytona is a radically simple open source development environment manager.

Setting up development environments has become increasingly challenging over time, especially when aiming to set up remotely, where the complexity increases by an order of magnitude. The process is so complex that we've compiled a comprehensive guide detailing all the necessary steps to set one up—spanning 5,000 words, 7 steps, and requiring anywhere from 15 to 45 minutes.

This complexity is unnecessary.

With Daytona, you need only to execute a single command: daytona create --code.

Daytona automates the entire process; provisioning the instance, interpreting and applying the configuration, setting up prebuilds, establishing a secure VPN connection, securely connecting your local or a Web IDE, and assigning a fully qualified domain name to the development environment for easy sharing and collaboration.

As a developer, you can immediately start focusing on what matters most—your code.

## Quick Start
### Mac / Linux
```bash
(curl -sf -L https://download.daytona.io/daytona/install.sh | sudo bash) && daytona server -y && daytona
```
### Windows
<details>
<summary>Windows PowerShell</summary>
This command downloads and installs Daytona and runs the Daytona Server:

```pwsh
$architecture = if ($env:PROCESSOR_ARCHITECTURE -eq "AMD64") { "amd64" } else { "arm64" }
md -Force "$Env:APPDATA\bin\daytona"; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.SecurityProtocolType]'Tls,Tls11,Tls12';
Invoke-WebRequest -URI "https://download.daytona.io/daytona/latest/daytona-windows-$architecture.exe" -OutFile "$Env:APPDATA\bin\daytona\daytona.exe";
$env:Path += ";" + $Env:APPDATA + "\bin\daytona"; [Environment]::SetEnvironmentVariable("Path", $env:Path, [System.EnvironmentVariableTarget]::User);
daytona serve;
```

</details>

### Create your first dev environment by opening a new terminal, and running:

```bash
daytona create --code
```
## Getting Started
### Requirements
Before starting the installation script, please go over all the necessary requirements:
- __Hardware Resources__: Depending on the project requirements, ensure your machine has sufficient resources. Minimum hardware specification is 1cpu, 2GB of RAM and 10GB of disk space.
- __Docker__: Ensure [Docker](https://www.docker.com/products/docker-desktop/) is installed and running.

### Initializing Daytona
To initialize Daytona, follow these steps:

__1. Start the Daytona Server:__
This initiates the Daytona Server in daemon mode. Use the command:
```bash
daytona server
```
__2. Add Your Git Provider of Choice:__
Daytona supports GitHub, GitLab, Bitbucket, Bitbucket Server, Gitea, Gitness and Azure DevOps. To add them to your profile, use the command:
```bash
daytona git-providers add

```
Follow the steps provided.

__3. Add Your Provider Target:__
This step is for choosing where to deploy Development Environments. By default, Daytona includes a Docker provider to spin up environments on your local machine. For remote development environments, use the command:
```bash
daytona target set
```
Following the steps this command adds SSH machines to your targets.

__4. Choose Your Default IDE:__
The default setting for Daytona is VS Code locally. If you prefer, you can switch to VS Code - Browser or any IDE from the JetBrains portfolio using the command:
```bash
daytona ide
```
Now that you have installed and initialized Daytona, you can proceed to setting up your development environments and start coding instantly.


### Creating Dev Environments
Creating development environments with Daytona is a straightforward process, accomplished with just one command:
```bash
daytona create --code
```

You can skip the `--code` flag if you don't wish to open the IDE immediately after creating the environment.

Upon executing this command, you will be prompted with two questions:
1. Choose the provider to decide where to create a dev environment.
2. Select or type the Git repository you wish to use to create a dev environment.

After making your selections, press enter, and Daytona will handle the rest. All that remains for you to do is to execute the following command to open your default IDE:
```bash
daytona code
```

This command opens your development environment in your preferred IDE, allowing you to start coding instantly.

### Stopping the Daytona Server:
```bash
daytona server stop
```

### Restarting the Daytona Server:
```bash
daytona server restart
```


## License

This repository contains Daytona, covered under the [Apache License 2.0](https://github.com/daytonaio/daytona/blob/main/LICENSE), except where noted (any Daytona logos or trademarks are not covered under the Apache License, and should be explicitly noted by a LICENSE file.)

Daytona is a product produced from this open source software, exclusively by Daytona Platforms, Inc. It is distributed under our commercial terms.

Others are allowed to make their own distribution of the software, but they cannot use any of the Daytona trademarks, cloud services, etc.

We explicitly grant permission for you to make a build that includes our trademarks while developing Daytona itself. You may not publish or share the build, and you may not use that build to run Daytona for any other purpose.
## Code of Conduct

This project has adapted the Code of Conduct from the [Contributor Covenant](https://www.contributor-covenant.org/). For more information see the [Code of Conduct](https://github.com/daytonaio/daytona/blob/main/CODE_OF_CONDUCT.md) or contact codeofconduct@daytona.io. with any additional questions or comments.
## Questions

For more information on how to use and develop Daytona, talk to us on [Slack](https://go.daytona.io/slack).

