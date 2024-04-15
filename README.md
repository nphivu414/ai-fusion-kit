<a href="https://ai-fusion-kit.vercel.app/">
  <img alt="AI Fusion Kit" src="https://ai-fusion-kit.vercel.app/_next/image?url=%2Fscreenshot.png&w=1920&q=75">
  <h1 align="center">AI Fusion Kit</h1>
</a>

<p align="center">
  A feature-rich, highly customizable AI Web App Template, empowered by Next.js.
</p>

<p align="center">
  <a href="#tech-stacks"><strong>Tech stacks</strong></a> ·
  <a href="#installation"><strong>Installation</strong></a> ·
  <a href="#run-locally"><strong>Run Locally</strong></a> ·
  <a href="#authors"><strong>Authors</strong></a>
</p>
<br/>

## Tech stacks
 - [Typescript](https://www.typescriptlang.org/)
 - [ReactJS](https://reactjs.org/)
 - [NextJS](https://nextjs.org/)
 - [Supabase](https://supabase.com/)
 - [Open AI API](https://platform.openai.com/docs/api-reference)
 - [Vercel AI SDK](https://github.com/vercel/ai)
 - [TailwindCSS](https://tailwindcss.com/)
 - [Shadcn UI](https://ui.shadcn.com/)
 - [Aceternity UI](https://ui.aceternity.com/)
 - [Next.js AI Chatbot](https://github.com/vercel-labs/ai-chatbot)

  
## Installation

1. Clone the repo
   ```sh
   git clone https://github.com/nphivu414/ai-fusion-kit
   ```
2. Install dependencies
   ```sh
   yarn install
   ```
3. Setup Supabase local development
   - Install [Docker](https://www.docker.com/get-started/)
   - The start command uses Docker to start the Supabase services. This command may take a while to run if this is the first time using the CLI.
      ```sh
      supabase start
      ```
    - Once all of the Supabase services are running, you'll see output containing your local Supabase credentials. It should look like this, with urls and keys that you'll use in your local project:
    ```sh
      Started supabase local development setup.

              API URL: http://localhost:54321
                DB URL: postgresql://postgres:postgres@localhost:54322/postgres
            Studio URL: http://localhost:54323
          Inbucket URL: http://localhost:54324
              anon key: eyJh......
      service_role key: eyJh......
    ```
    - The API URL will be used as the `NEXT_PUBLIC_SUPABASE_URL` in `.env.local`
    - For more information about how to use Supabase on your local development machine: https://supabase.com/docs/guides/cli/local-development

4. Get an account from OpenAI and generate your own API key

5. Rename `.env.example` to `.env.local` and populate with your values
  > Note: You should not commit your `.env` file or it will expose secrets that will allow others to control access to your various OpenAI and authentication provider accounts.
    
## Run Locally

1. Go to the project directory

```bash
  cd ai-fusion-kit
```

2. Start the web app

```bash
  yarn dev
```

## Authors
- [@nphivu414](https://github.com/nphivu414)
- [@toproad1407](https://github.com/toproad1407)
