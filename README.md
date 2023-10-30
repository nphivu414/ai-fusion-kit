<a href="https://ai-fusion-kit.vercel.app/">
  <img alt="AI Fusion Kit" src="https://ai-fusion-kit.vercel.app/_next/image?url=%2Fscreenshot.png&w=1920&q=75">
  <h1 align="center">AI Fusion Kit</h1>
</a>

<p align="center">
  A feature-rich, highly customizable AI Web App Template, empowered by Next.js.
</p>

<p align="center">
  <a href="#tech-stacks"><strong>Tech stacks</strong></a> ·
  <a href="#nstallation"><strong>Installation</strong></a> ·
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
3. Setup your supabase project
   - You'll first need a Supabase project which can be made via the [Supabase dashboard](https://database.new/)
   - Run the following snippet in your project's [SQL Editor](https://supabase.com/dashboard/project/_/sql/new)
      ```sql
        create table profiles (
          id uuid default uuid_generate_v4() primary key,
          updated_at timestamp default now(),
          username text,
          full_name text,
          avatar_url text,
          website text
        );

        create table apps (
          id uuid default uuid_generate_v4() primary key,
          name text not null,
          description text,
          createdAt timestamp default now(),
          updatedAt timestamp default now(),
          slug text not null,
          logoUrl text
        );

        create table chats (
          id uuid default uuid_generate_v4() primary key,
          name text,
          createdAt timestamp default now(),
          updatedAt timestamp default now(),
          profileId uuid references profiles (id),
          appId uuid references apps (id),
          settings json
        );

        create table messages (
          id uuid default uuid_generate_v4() primary key,
          role public.message_role,
          content text,
          createdAt timestamp default now(),
          updatedAt timestamp default now(),
          profileId uuid references profiles (id),
          chatId uuid references chats (id)
        );
      ```

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