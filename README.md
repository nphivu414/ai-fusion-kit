# AI Fusion Kit

A feature-rich, highly customizable AI Web App Template, empowered by Next.js.

<p align="center">
  <a href="https://ai-fusion-kit.vercel.app/">
    <img src="https://ai-fusion-kit.vercel.app/_next/image?url=%2Ffeatured-dark.jpg&w=1920&q=75"
         alt="AI Fusion Kit">
  </a>
</p>

## Authors

- [@nphivu414](https://github.com/nphivu414)

## Main stacks
 - [Typescript](https://www.typescriptlang.org/)
 - [ReactJS](https://reactjs.org/)
 - [NextJS](https://nextjs.org/)
 - [Supabase](https://supabase.com/)
 - [Open AI API](https://platform.openai.com/docs/api-reference)
 - [Vercel AI SDK](https://github.com/vercel/ai)
 - [TailwindCSS](https://tailwindcss.com/)
 - [Shadcn UI](https://ui.shadcn.com/)

  
## Installation

1. Clone the repo
   ```sh
   git clone https://github.com/nphivu414/ai-fusion-kit
   ```
2. Install dependencies
   ```sh
   yarn install
   ```
3. Setup your supabase schema
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

4. Create a new .env file based on the example defined in `.env.example`.
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