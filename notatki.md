

# Instalacje

git --version
npm --version

# NextJS
npx create-next-app@latest

```
npx create-next-app@latest 
Need to install the following packages:
create-next-app@16.4.6
Ok to proceed? (y) y
√ What is your project named? ... sages
√ Would you like to use the recommended Next.js defaults? » No, customize settings
√ Would you like to use TypeScript? ... No / Yes
√ Which linter would you like to use? » ESLint
√ Would you like to use React Compiler? ... No / Yes
√ Would you like to use Tailwind CSS? ... No / Yes
√ Would you like your code inside a `src/` directory? ... No / Yes
√ Would you like to use App Router? (recommended) ... No / Yes
√ Would you like to use Cache Components? ... No / Yes
√ Would you like to customize the import alias (`@/*` by default)? ... No / Yes
√ Would you like to include AGENTS.md to guide coding agents to write up-to-date Next.js code? ... No / Yes
√ Would you like to help improve Next.js by letting agents prepare anonymized feedback for your review as you code? (Disable anytime with `experimental.agentFeedback: false`.) ... No / Yes
Creating a new Next.js app in C:\Projects\__NEXTJS\sages-nextjs-fujitsu-1126\sages.
```

Using npm.

Initializing project with template: app-tw 


Installing dependencies:
- next
- react
- react-dom

Installing devDependencies:
- @tailwindcss/turbopack
- @types/node
- @types/react
- @types/react-dom
- babel-plugin-react-compiler
- eslint
- eslint-config-next
- tailwindcss
- typescript

# Install
npm i  // package.json + update
npm ci  // package-lock.json + strict

# Semver
http://semver.org/
https://semver.npmjs.com/

# Start
npm run dev 

> sages@0.1.0 dev
> next dev

▲ Next.js 16.4.6 (Turbopack)
- Local:         http://localhost:3000
- Network:       http://192.168.68.125:3000
✓ Ready in 1917ms
✓ Running next.config.ts took 152ms
- Cache Components enabled
- Partial Prefetching enabled



# Design Tokens

https://m3.material.io/foundations/design-tokens/overview
https://v21.primeng.org/theming/styled#architecture


# Flex
https://css-tricks.com/snippets/css/a-guide-to-flexbox/

http://www.flexboxdefense.com/
https://flexboxfroggy.com/


# CSS GRID
https://css-tricks.com/complete-guide-css-grid-layout/
https://cssgridgarden.com/


# Gestalt - CSS has meaning
https://ixdf.org/literature/topics/gestalt-principles

# CSS Specifity
https://css-tricks.com/specifics-on-css-specificity/ 

# CSS Selectors
https://flukeout.github.io/


# CSS 2022 Selectors
https://css-tricks.com/what-css-do-you-absolutely-have-to-know-in-2022/

https://caniuse.com/?search=container

https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Containment/Container_queries

https://web-platform-dx.github.io/baseline/

https://tailwindcss.com/docs/responsive-design#container-queries

https://tailwindcss.com/docs/hover-focus-and-other-states#styling-based-on-parent-state

# Tailwind + Emmet 
```
  "tailwindCSS.includeLanguages": {
    "html": "html",
    "vue": "vue",
    "javascript": "javascript",
    "typescript": "typescript",
    "css": "css",
    "scss": "scss",
    "reacttypescript": "reacttypescript"
  },
  "tailwindCSS.emmetCompletions": true,
```