# Pokedex in [SvelteKit](https://kit.svelte.dev/) as classic full stack application

- used for Apple Music & NY Times

## Quickstart

```
npm create skeleton-app@latest my-skeleton-app
	- Enable SvelteKit's Typescript syntax (recommended)
cd my-skeleton-app
```

## Svelte - a compiler not a framework

> a React component is typically around 40% larger

> The Svelte implementation of TodoMVC weighs 3.6kb zipped. For comparison, React plus ReactDOM without any app code
> weighs about 45kb zipped. It takes about 10x as long for the browser just to evaluate React as it does for Svelte to be
> up and running with an interactive TodoMVC.

### Memory allocation in MBs ± 95% confidence interval - ([Krausest](https://github.com/krausest/js-framework-benchmark))

| Name                                       | svelte-v3.50.1   | vue-v3.2.47      | react-v18.2.0    | angular-v15.0.1  |
|--------------------------------------------|------------------|------------------|------------------|------------------|
| Memory usage after page load.              | 0.7  <br>(1.03)  | 0.9  <br>(1.38)  | 1.1  <br>(1.73)  | 1.6  <br>(2.47)  |
| Memory usage after adding 1,000 rows.      | 2.7  <br>(1.52)  | 3.8  <br>(2.09)  | 5.0  <br>(2.76)  | 4.7  <br>(2.61)  |
| Memory usage after adding 10,000 rows.     | 20.1  <br>(1.72) | 27.7  <br>(2.38) | 36.2  <br>(3.10) | 29.8  <br>(2.56) |
| geometric mean of all factors in the table | 1.39             | 1.90             | 2.46             | 2.55             |

## The 'KIT' Part - fullstack by convention

### Project structure

```bash
my-project/
├ src/
│ ├ lib/
│ │ ├ server/
│ │ │ └ [your server-only lib files]
│ │ └ [your lib files]
│ ├ params/
│ │ └ [your param matchers]
│ ├ routes/
│ │ ├ api
│ │ │ └ [your backend for fronent api routes]
│ │ └ [your frontend routes]
│ ├ app.html
│ ├ error.html
├ static/
│ └ [your static assets]
├ tests/
│ └ [your tests]
├ package.json
├ svelte.config.js
├ tsconfig.json
└ vite.config.js
```

### File types

- `+page.svelte` Svelte Component for this route 
- `+page.ts` Client side data load
- `+page.server.ts` Server side data load

## Backend with [Vercel](https://www.vercel.com) and [Supabase](https://supabase.com/)

### [Incremental Static Regeneration](https://vercel.com/docs/concepts/incremental-static-regeneration/overview)

### [Vercel Image Optimization](https://vercel.com/docs/concepts/image-optimization)

### [Vercel Serverless Functions](https://vercel.com/docs/concepts/functions/serverless-functions)

### [Vercel Edge Network](https://vercel.com/docs/concepts/edge-network/overview)

## Frontend with dynamic server side rendering (SSR)

### State / routing with query params

?type

### [Skeleton](https://www.skeleton.dev/) for nice UI

### reactive searching / filtering for Pokemons

## [Vitest](https://vitest.dev/)

### [Vitest UI](https://vitest.dev/guide/ui.html)

### [Testing Library](https://testing-library.com/)

### [fast-check property based testing](https://github.com/dubzzz/fast-check)

## Green IT - it's all about resources

- less code
- less memory
- smaller bundle size
- smaller sites
- better caches
- less cpu
- Developers become more efficient & faster

## Alternatives

- [SolidStart](https://start.solidjs.com)
- [NextJs](https://nextjs.org)
- [NuxtJs](https://nuxtjs.org/)
- [GatsbyJs](https://www.gatsbyjs.com/)

## Credits

- [SVELTE](https://svelte.dev/)
- [SVELTEKIT](https://kit.svelte.dev/)
- [Svelte Society](https://sveltesociety.dev/)
- [Learn Svelte](https://learn.svelte.dev/)
- [Vercel](https://vercel.com)
- [supabase - open source Firebase alternative](https://supabase.com/)
- [Why Svelte is more environmentally friendly](https://sustainablewww.org/principles/svelte-vs-react-vs-angular-why-svelte-is-more-environmental-friendly)
- [Skeleton - The UI toolkit for Svelte and Tailwind.](https://www.skeleton.dev/)
- [PokeAPI](https://pokeapi.co/)
- [Youtube @Huntabyte](https://www.youtube.com/@Huntabyte)
- [Youtube @jmagrippis](https://www.youtube.com/@jmagrippis)
