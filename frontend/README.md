# NSS IITD Webapp: Style and Development Guide

This guide outlines the development and styling standards for the "Digitalisation of Educational Projects in NSS IITD" webapp. It ensures a consistent, modern, and accessible UI with a greenish-tinted theme, reflecting NSS IIT Delhi's educational mission. The frontend uses  **React** ,  **Vite** ,  **JSX + SWC** , and **CSS modules** for styling, with an **Express.js** backend. All team members must follow these guidelines to maintain consistency.

## Table of Contents

* [Project Overview](https://www.perplexity.ai/search/my-readme-md-update-it-for-rea-lxQ0ETKtS2uz3VDyK3hYwA#project-overview)
* [Tech Stack](https://www.perplexity.ai/search/my-readme-md-update-it-for-rea-lxQ0ETKtS2uz3VDyK3hYwA#tech-stack)
* [Project Setup](https://www.perplexity.ai/search/my-readme-md-update-it-for-rea-lxQ0ETKtS2uz3VDyK3hYwA#project-setup)
* [Folder Structure](https://www.perplexity.ai/search/my-readme-md-update-it-for-rea-lxQ0ETKtS2uz3VDyK3hYwA#folder-structure)
* [Theme Overview](https://www.perplexity.ai/search/my-readme-md-update-it-for-rea-lxQ0ETKtS2uz3VDyK3hYwA#theme-overview)
* [Color Palette](https://www.perplexity.ai/search/my-readme-md-update-it-for-rea-lxQ0ETKtS2uz3VDyK3hYwA#color-palette)
* [Typography](https://www.perplexity.ai/search/my-readme-md-update-it-for-rea-lxQ0ETKtS2uz3VDyK3hYwA#typography)
* [Spacing](https://www.perplexity.ai/search/my-readme-md-update-it-for-rea-lxQ0ETKtS2uz3VDyK3hYwA#spacing)
* [Components](https://www.perplexity.ai/search/my-readme-md-update-it-for-rea-lxQ0ETKtS2uz3VDyK3hYwA#components)
* [Development Instructions](https://www.perplexity.ai/search/my-readme-md-update-it-for-rea-lxQ0ETKtS2uz3VDyK3hYwA#development-instructions)
* [CSS Modules Usage](https://www.perplexity.ai/search/my-readme-md-update-it-for-rea-lxQ0ETKtS2uz3VDyK3hYwA#css-modules-usage)
* [Backend Integration](https://www.perplexity.ai/search/my-readme-md-update-it-for-rea-lxQ0ETKtS2uz3VDyK3hYwA#backend-integration)
* [Editor and Linter Setup](https://www.perplexity.ai/search/my-readme-md-update-it-for-rea-lxQ0ETKtS2uz3VDyK3hYwA#editor-and-linter-setup)
* [Team Workflow](https://www.perplexity.ai/search/my-readme-md-update-it-for-rea-lxQ0ETKtS2uz3VDyK3hYwA#team-workflow)
* [Testing and Validation](https://www.perplexity.ai/search/my-readme-md-update-it-for-rea-lxQ0ETKtS2uz3VDyK3hYwA#testing-and-validation)

## Project Overview

The NSS IITD webapp digitizes educational projects, enabling students, coordinators, and admins to manage and showcase initiatives. Key features include:

* **Project Management** : Create, view, and edit projects
* **User Authentication** : Login for different user roles
* **Dashboard** : Filterable project overview with status indicators
* **Responsive Design** : Supports mobile, tablet, and desktop

## Tech Stack

## Frontend

* **React 18+** - Component-based UI library
* **Vite** - Fast build tool and dev server
* **JSX + SWC** - Speedy Web Compiler for ultra-fast compilation
* **CSS Modules** - Scoped styling system
* **React Router** - Client-side routing

## Backend

* **Express.js** - Web framework for Node.js
* **Node.js** - JavaScript runtime environment
* **RESTful APIs** - Standard HTTP methods for data operations

## Project Setup

## Prerequisites

* Node.js 18+ installed
* npm or yarn package manager

## Initial Setup

<pre class="not-prose w-full rounded font-mono text-sm font-extralight"><div class="codeWrapper text-light selection:text-super selection:bg-super/10 my-md relative flex flex-col rounded font-mono text-sm font-normal bg-subtler"><div class="translate-y-xs -translate-x-xs bottom-xl mb-xl sticky top-0 flex h-0 items-start justify-end"></div><div class="-mt-xl"><div><div data-testid="code-language-indicator" class="text-quiet bg-offsetPlus py-xs px-sm inline-block rounded-br rounded-tl-[3px] font-thin">bash</div></div><div class="pr-lg"><span><code><span class="token token"># Clone repository</span><span>
</span><span></span><span class="token token">git</span><span> clone </span><span class="token token operator"><</span><span>repo-url</span><span class="token token operator">></span><span>
</span><span></span><span class="token token">cd</span><span> nss-webapp
</span>
<span></span><span class="token token"># Setup frontend</span><span>
</span><span></span><span class="token token">cd</span><span> frontend
</span><span></span><span class="token token">npm</span><span></span><span class="token token">install</span><span>
</span><span></span><span class="token token">npm</span><span> run dev
</span>
<span></span><span class="token token"># Setup backend (separate terminal)</span><span>
</span><span></span><span class="token token">cd</span><span></span><span class="token token punctuation">..</span><span>/backend
</span><span></span><span class="token token">npm</span><span></span><span class="token token">install</span><span>
</span><span></span><span class="token token">npm</span><span> run dev
</span></code></span></div></div></div></pre>

## Create New Project (Optional)

<pre class="not-prose w-full rounded font-mono text-sm font-extralight"><div class="codeWrapper text-light selection:text-super selection:bg-super/10 my-md relative flex flex-col rounded font-mono text-sm font-normal bg-subtler"><div class="translate-y-xs -translate-x-xs bottom-xl mb-xl sticky top-0 flex h-0 items-start justify-end"></div><div class="-mt-xl"><div><div data-testid="code-language-indicator" class="text-quiet bg-offsetPlus py-xs px-sm inline-block rounded-br rounded-tl-[3px] font-thin">bash</div></div><div class="pr-lg"><span><code><span class="token token"># Create frontend with Vite + React + SWC</span><span>
</span><span></span><span class="token token">npm</span><span> create vite@latest frontend -- --template react-swc
</span>
<span></span><span class="token token"># Or interactive setup</span><span>
</span><span></span><span class="token token">npm</span><span> create vite@latest frontend
</span><span></span><span class="token token"># Select: React → JavaScript + SWC</span><span>
</span></code></span></div></div></div></pre>

## Folder Structure

<pre class="not-prose w-full rounded font-mono text-sm font-extralight"><div class="codeWrapper text-light selection:text-super selection:bg-super/10 my-md relative flex flex-col rounded font-mono text-sm font-normal bg-subtler"><div class="translate-y-xs -translate-x-xs bottom-xl mb-xl sticky top-0 flex h-0 items-start justify-end"></div><div class="-mt-xl"><div><div data-testid="code-language-indicator" class="text-quiet bg-offsetPlus py-xs px-sm inline-block rounded-br rounded-tl-[3px] font-thin">text</div></div><div class="pr-lg"><span><code><span>nss-webapp/
</span>├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── Button.jsx
│   │   │   ├── Button.module.css
│   │   │   ├── ProjectCard.jsx
│   │   │   ├── ProjectCard.module.css
│   │   │   ├── Header.jsx
│   │   │   └── Header.module.css
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Home.module.css
│   │   │   ├── Login.jsx
│   │   │   ├── Login.module.css
│   │   │   ├── Projects.jsx
│   │   │   └── Projects.module.css
│   │   ├── api/
│   │   │   ├── client.js
│   │   │   ├── projects.js
│   │   │   └── auth.js
│   │   ├── types/
│   │   │   ├── Project.js
│   │   │   └── User.js
│   │   ├── styles/
│   │   │   └── styles.css
│   │   ├── context/
│   │   ├── routes/
│   │   │   └── index.jsx
│   │   ├── App.jsx
│   │   ├── App.module.css
│   │   ├── main.jsx
│   │   └── index.css
│   ├── public/
│   ├── vite.config.js
│   ├── package.json
│   └── .stylelintrc.json
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   └── config/
│   ├── server.js
│   └── package.json
└── README.md
</code></span></div></div></div></pre>

## Theme Overview

The theme uses a greenish palette, defined in `src/styles/styles.css`. Key features:

* **Primary Color** : `#059669` (emerald green) for buttons, links, and accents
* **Accessibility** : Colors meet WCAG 2.1 AA contrast ratios
* **Typography** : `Inter` font for readability
* **CSS Modules** : Scoped styles ensure consistency

## Color Palette

Use these colors from `src/styles/styles.css`:

| Name             | Hex     | Usage                     |
| ---------------- | ------- | ------------------------- |
| Primary          | #059669 | Buttons, links, accents   |
| Primary Dark     | #065F46 | Hover states              |
| Success          | #10B981 | Success messages, badges  |
| Warning          | #F59E0B | Warning messages, badges  |
| Text Primary     | #1A202C | Headings, primary text    |
| Text Secondary   | #4A5568 | Secondary text            |
| Text Tertiary    | #718096 | Muted text, placeholders  |
| Background       | #F7FAFC | Main background           |
| Background Alt   | #EDF2F7 | Secondary sections        |
| Surface          | #FFFFFF | Cards, modals, forms      |
| Surface Elevated | #F7FAFC | Hover states for surfaces |
| Border           | #E2E8F0 | Default borders           |
| Border Light     | #EDF2F7 | Subtle borders            |

 **Gradients** :

* Primary: `linear-gradient(135deg, #059669, #10B981)`
* Surface: `linear-gradient(135deg, #FFFFFF, #F7FAFC)`
* Hero: `linear-gradient(135deg, #D6FFE6, #E6FFFA)`

## Typography

* **Font** : `Inter` (via Google Fonts) with fallbacks: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`
* **Sizes** :
* `h1`: 2.5rem (2rem mobile)
* `h2`: 2rem (1.75rem mobile)
* `h3`: 1.5rem (1.375rem mobile)
* `h4`: 1.25rem
* Paragraph: 1rem, line-height 1.7
* Small text: 0.875rem
* **Weights** : 700 (headings), 600 (emphasis), 400 (body)
* **Colors** : `var(--text-primary)`, `var(--text-secondary)`, `var(--text-tertiary)`

## Spacing

Use this scale:

* `--space-1`: 4px
* `--space-2`: 8px
* `--space-3`: 12px
* `--space-4`: 16px
* `--space-6`: 24px
* `--space-8`: 32px
* `--space-16`: 64px
* `--space-20`: 80px

## Components

## Component Structure Template

Every component should follow this exact structure :[](https://www.freecodecamp.org/news/best-practices-for-react/)

<pre class="not-prose w-full rounded font-mono text-sm font-extralight"><div class="codeWrapper text-light selection:text-super selection:bg-super/10 my-md relative flex flex-col rounded font-mono text-sm font-normal bg-subtler"><div class="translate-y-xs -translate-x-xs bottom-xl mb-xl sticky top-0 flex h-0 items-start justify-end"></div><div class="-mt-xl"><div><div data-testid="code-language-indicator" class="text-quiet bg-offsetPlus py-xs px-sm inline-block rounded-br rounded-tl-[3px] font-thin">jsx</div></div><div class="pr-lg"><span><code><span class="token token">// src/components/ComponentName.jsx</span><span>
</span><span></span><span class="token token">import</span><span> React </span><span class="token token">from</span><span></span><span class="token token">'react'</span><span class="token token punctuation">;</span><span>
</span><span></span><span class="token token">import</span><span> styles </span><span class="token token">from</span><span></span><span class="token token">'./ComponentName.module.css'</span><span class="token token punctuation">;</span><span>
</span>
<span></span><span class="token token">const</span><span></span><span class="token token function-variable">ComponentName</span><span></span><span class="token token operator">=</span><span></span><span class="token token punctuation">(</span><span class="token token parameter punctuation">{</span><span class="token token parameter"> prop1</span><span class="token token parameter punctuation">,</span><span class="token token parameter"> prop2 </span><span class="token token parameter punctuation">}</span><span class="token token punctuation">)</span><span></span><span class="token token operator">=></span><span></span><span class="token token punctuation">{</span><span>
</span><span></span><span class="token token">// 1. State declarations (if any)</span><span>
</span><span></span><span class="token token">// 2. Event handlers</span><span>
</span><span></span><span class="token token">// 3. Other functions</span><span>
</span>  
<span></span><span class="token token">return</span><span></span><span class="token token punctuation">(</span><span>
</span><span></span><span class="token token punctuation"><</span><span class="token token">div</span><span class="token token"></span><span class="token token">className</span><span class="token token script language-javascript script-punctuation punctuation">=</span><span class="token token script language-javascript punctuation">{</span><span class="token token script language-javascript">styles</span><span class="token token script language-javascript punctuation">.</span><span class="token token script language-javascript">container</span><span class="token token script language-javascript punctuation">}</span><span class="token token punctuation">></span><span class="token token plain-text">
</span><span class="token token plain-text"></span><span class="token token punctuation">{</span><span class="token token">/* Your JSX here */</span><span class="token token punctuation">}</span><span class="token token plain-text">
</span><span class="token token plain-text"></span><span class="token token punctuation"></</span><span class="token token">div</span><span class="token token punctuation">></span><span>
</span><span></span><span class="token token punctuation">)</span><span class="token token punctuation">;</span><span>
</span><span></span><span class="token token punctuation">}</span><span class="token token punctuation">;</span><span>
</span>
<span></span><span class="token token">export</span><span></span><span class="token token">default</span><span> ComponentName</span><span class="token token punctuation">;</span></code></span></div></div></div></pre>

## Button

* **Classes** : `btn btn-primary` or `btn btn-secondary`
* **Use** : Primary for main actions, secondary for auxiliary

 **Example** :

<pre class="not-prose w-full rounded font-mono text-sm font-extralight"><div class="codeWrapper text-light selection:text-super selection:bg-super/10 my-md relative flex flex-col rounded font-mono text-sm font-normal bg-subtler"><div class="translate-y-xs -translate-x-xs bottom-xl mb-xl sticky top-0 flex h-0 items-start justify-end"></div><div class="-mt-xl"><div><div data-testid="code-language-indicator" class="text-quiet bg-offsetPlus py-xs px-sm inline-block rounded-br rounded-tl-[3px] font-thin">jsx</div></div><div class="pr-lg"><span><code><span class="token token">// src/components/Button.jsx</span><span>
</span><span></span><span class="token token">import</span><span> styles </span><span class="token token">from</span><span></span><span class="token token">'./Button.module.css'</span><span class="token token punctuation">;</span><span>
</span>
<span></span><span class="token token">const</span><span> Button </span><span class="token token operator">=</span><span></span><span class="token token punctuation">(</span><span class="token token punctuation">{</span><span> variant </span><span class="token token operator">=</span><span></span><span class="token token">'primary'</span><span class="token token punctuation">,</span><span> children</span><span class="token token punctuation">,</span><span> onClick</span><span class="token token punctuation">,</span><span></span><span class="token token operator">...</span><span>props </span><span class="token token punctuation">}</span><span class="token token punctuation">)</span><span></span><span class="token token operator">=></span><span></span><span class="token token punctuation">(</span><span>
</span><span></span><span class="token token punctuation"><</span><span class="token token">button</span><span class="token token"> 
</span><span class="token token"></span><span class="token token">className</span><span class="token token script language-javascript script-punctuation punctuation">=</span><span class="token token script language-javascript punctuation">{</span><span class="token token script language-javascript template-string template-punctuation">`</span><span class="token token script language-javascript template-string interpolation interpolation-punctuation punctuation">${</span><span class="token token script language-javascript template-string interpolation">styles</span><span class="token token script language-javascript template-string interpolation punctuation">.</span><span class="token token script language-javascript template-string interpolation">button</span><span class="token token script language-javascript template-string interpolation interpolation-punctuation punctuation">}</span><span class="token token script language-javascript template-string"> btn btn-</span><span class="token token script language-javascript template-string interpolation interpolation-punctuation punctuation">${</span><span class="token token script language-javascript template-string interpolation">variant</span><span class="token token script language-javascript template-string interpolation interpolation-punctuation punctuation">}</span><span class="token token script language-javascript template-string template-punctuation">`</span><span class="token token script language-javascript punctuation">}</span><span class="token token">
</span><span class="token token"></span><span class="token token">onClick</span><span class="token token script language-javascript script-punctuation punctuation">=</span><span class="token token script language-javascript punctuation">{</span><span class="token token script language-javascript">onClick</span><span class="token token script language-javascript punctuation">}</span><span class="token token">
</span><span class="token token"></span><span class="token token spread punctuation">{</span><span class="token token spread operator">...</span><span class="token token spread">props</span><span class="token token spread punctuation">}</span><span class="token token">
</span><span class="token token"></span><span class="token token punctuation">></span><span class="token token plain-text">
</span><span class="token token plain-text"></span><span class="token token punctuation">{</span><span>children</span><span class="token token punctuation">}</span><span class="token token plain-text">
</span><span class="token token plain-text"></span><span class="token token punctuation"></</span><span class="token token">button</span><span class="token token punctuation">></span><span>
</span><span></span><span class="token token punctuation">)</span><span class="token token punctuation">;</span><span>
</span>
<span></span><span class="token token">export</span><span></span><span class="token token">default</span><span> Button</span><span class="token token punctuation">;</span><span>
</span></code></span></div></div></div></pre>

## Project Card

* **Class** : `card`
* **Use** : Display project details

## Import Organization Rules

Always organize imports in this order :[](https://www.freecodecamp.org/news/best-practices-for-react/)

<pre class="not-prose w-full rounded font-mono text-sm font-extralight"><div class="codeWrapper text-light selection:text-super selection:bg-super/10 my-md relative flex flex-col rounded font-mono text-sm font-normal bg-subtler"><div class="translate-y-xs -translate-x-xs bottom-xl mb-xl sticky top-0 flex h-0 items-start justify-end"></div><div class="-mt-xl"><div><div data-testid="code-language-indicator" class="text-quiet bg-offsetPlus py-xs px-sm inline-block rounded-br rounded-tl-[3px] font-thin">jsx</div></div><div class="pr-lg"><span><code><span class="token token">// 1. React and React-related imports</span><span>
</span><span></span><span class="token token">import</span><span> React</span><span class="token token punctuation">,</span><span></span><span class="token token punctuation">{</span><span> useState</span><span class="token token punctuation">,</span><span> useEffect </span><span class="token token punctuation">}</span><span></span><span class="token token">from</span><span></span><span class="token token">'react'</span><span class="token token punctuation">;</span><span>
</span><span></span><span class="token token">import</span><span></span><span class="token token punctuation">{</span><span> BrowserRouter</span><span class="token token punctuation">,</span><span> Route </span><span class="token token punctuation">}</span><span></span><span class="token token">from</span><span></span><span class="token token">'react-router-dom'</span><span class="token token punctuation">;</span><span>
</span>
<span></span><span class="token token">// 2. Third-party libraries</span><span>
</span><span></span><span class="token token">import</span><span> axios </span><span class="token token">from</span><span></span><span class="token token">'axios'</span><span class="token token punctuation">;</span><span>
</span>
<span></span><span class="token token">// 3. Internal components</span><span>
</span><span></span><span class="token token">import</span><span> Button </span><span class="token token">from</span><span></span><span class="token token">'../components/Button'</span><span class="token token punctuation">;</span><span>
</span><span></span><span class="token token">import</span><span> Header </span><span class="token token">from</span><span></span><span class="token token">'../components/Header'</span><span class="token token punctuation">;</span><span>
</span>
<span></span><span class="token token">// 4. CSS modules (always last)</span><span>
</span><span></span><span class="token token">import</span><span> styles </span><span class="token token">from</span><span></span><span class="token token">'./ComponentName.module.css'</span><span class="token token punctuation">;</span><span>
</span></code></span></div></div></div></pre>

## Beginner-Friendly Code Review Checklist

## Before Submitting PR

* [ ] **Does it compile?** Run `npm run dev` and check for errors
* [ ] **Does it match the design?** Compare with mockups/requirements
* [ ] **Are CSS modules used?** No inline styles or global CSS classes
* [ ] **Are console.log statements removed?** Clean up debugging code
* [ ] **Are variable names descriptive?** `user` instead of `u`, `isLoading` instead of `loading`
* [ ] **Is the component responsive?** Test on mobile view in browser

## For Code Reviewers[](https://axify.io/blog/code-review-checklist)

<pre class="not-prose w-full rounded font-mono text-sm font-extralight"><div class="codeWrapper text-light selection:text-super selection:bg-super/10 my-md relative flex flex-col rounded font-mono text-sm font-normal bg-subtler"><div class="translate-y-xs -translate-x-xs bottom-xl mb-xl sticky top-0 flex h-0 items-start justify-end"></div><div class="-mt-xl"><div><div data-testid="code-language-indicator" class="text-quiet bg-offsetPlus py-xs px-sm inline-block rounded-br rounded-tl-[3px] font-thin">text</div></div><div class="pr-lg"><span><code><span>## Review Checklist Template
</span>- [ ] **Functionality**: Does the code do what it's supposed to do?
- [ ] **Readability**: Can I understand what this code does easily?
- [ ] **Styling**: Follows our CSS modules and theme guidelines?
- [ ] **Error Handling**: What happens if something goes wrong?
- [ ] **Performance**: Any unnecessary re-renders or heavy operations?
- [ ] **Naming**: Are functions and variables named clearly?
</code></span></div></div></div></pre>

## Common Beginner Mistakes to Avoid

## React-Specific Don'ts

<pre class="not-prose w-full rounded font-mono text-sm font-extralight"><div class="codeWrapper text-light selection:text-super selection:bg-super/10 my-md relative flex flex-col rounded font-mono text-sm font-normal bg-subtler"><div class="translate-y-xs -translate-x-xs bottom-xl mb-xl sticky top-0 flex h-0 items-start justify-end"></div><div class="-mt-xl"><div><div data-testid="code-language-indicator" class="text-quiet bg-offsetPlus py-xs px-sm inline-block rounded-br rounded-tl-[3px] font-thin">jsx</div></div><div class="pr-lg"><span><code><span>❌ </span><span class="token token constant">DON</span><span>'</span><span class="token token constant">T</span><span></span><span class="token token constant">DO</span><span></span><span class="token token constant">THIS</span><span class="token token operator">:</span><span>
</span><span></span><span class="token token">// Directly mutating state</span><span>
</span><span></span><span class="token token">const</span><span></span><span class="token token punctuation">[</span><span>users</span><span class="token token punctuation">,</span><span> setUsers</span><span class="token token punctuation">]</span><span></span><span class="token token operator">=</span><span></span><span class="token token">useState</span><span class="token token punctuation">(</span><span class="token token punctuation">[</span><span class="token token punctuation">]</span><span class="token token punctuation">)</span><span class="token token punctuation">;</span><span>
</span><span>users</span><span class="token token punctuation">.</span><span class="token token">push</span><span class="token token punctuation">(</span><span>newUser</span><span class="token token punctuation">)</span><span class="token token punctuation">;</span><span></span><span class="token token">// Wrong!</span><span>
</span>
<span></span><span class="token token">// Using index as key in lists</span><span>
</span><span></span><span class="token token punctuation">{</span><span>items</span><span class="token token punctuation">.</span><span class="token token">map</span><span class="token token punctuation">(</span><span class="token token punctuation">(</span><span class="token token parameter">item</span><span class="token token parameter punctuation">,</span><span class="token token parameter"> index</span><span class="token token punctuation">)</span><span></span><span class="token token operator">=></span><span> 
</span><span></span><span class="token token punctuation"><</span><span class="token token">div</span><span class="token token"></span><span class="token token">key</span><span class="token token script language-javascript script-punctuation punctuation">=</span><span class="token token script language-javascript punctuation">{</span><span class="token token script language-javascript">index</span><span class="token token script language-javascript punctuation">}</span><span class="token token punctuation">></span><span class="token token punctuation">{</span><span>item</span><span class="token token punctuation">.</span><span>name</span><span class="token token punctuation">}</span><span class="token token punctuation"></</span><span class="token token">div</span><span class="token token punctuation">></span><span>
</span><span></span><span class="token token punctuation">)</span><span class="token token punctuation">}</span><span>
</span>
<span></span><span class="token token">// Inline styles</span><span>
</span><span></span><span class="token token punctuation"><</span><span class="token token">div</span><span class="token token"></span><span class="token token">style</span><span class="token token script language-javascript script-punctuation punctuation">=</span><span class="token token script language-javascript punctuation">{</span><span class="token token script language-javascript punctuation">{</span><span class="token token script language-javascript literal-property property">color</span><span class="token token script language-javascript operator">:</span><span class="token token script language-javascript"></span><span class="token token script language-javascript">'red'</span><span class="token token script language-javascript punctuation">,</span><span class="token token script language-javascript"></span><span class="token token script language-javascript literal-property property">fontSize</span><span class="token token script language-javascript operator">:</span><span class="token token script language-javascript"></span><span class="token token script language-javascript">'16px'</span><span class="token token script language-javascript punctuation">}</span><span class="token token script language-javascript punctuation">}</span><span class="token token punctuation">></span><span class="token token plain-text">
</span><span class="token token plain-text">
</span><span class="token token plain-text">✅ DO THIS INSTEAD:
</span><span class="token token plain-text">// Proper state updates  
</span><span class="token token plain-text">setUsers([...users, newUser]);
</span><span class="token token plain-text">
</span><span class="token token plain-text">// Unique keys
</span><span class="token token plain-text"></span><span class="token token punctuation">{</span><span>items</span><span class="token token punctuation">.</span><span class="token token">map</span><span class="token token punctuation">(</span><span class="token token punctuation">(</span><span class="token token parameter">item</span><span class="token token punctuation">)</span><span></span><span class="token token operator">=></span><span> 
</span><span></span><span class="token token punctuation"><</span><span class="token token">div</span><span class="token token"></span><span class="token token">key</span><span class="token token script language-javascript script-punctuation punctuation">=</span><span class="token token script language-javascript punctuation">{</span><span class="token token script language-javascript">item</span><span class="token token script language-javascript punctuation">.</span><span class="token token script language-javascript">id</span><span class="token token script language-javascript punctuation">}</span><span class="token token punctuation">></span><span class="token token punctuation">{</span><span>item</span><span class="token token punctuation">.</span><span>name</span><span class="token token punctuation">}</span><span class="token token punctuation"></</span><span class="token token">div</span><span class="token token punctuation">></span><span>
</span><span></span><span class="token token punctuation">)</span><span class="token token punctuation">}</span><span class="token token plain-text">
</span><span class="token token plain-text">
</span><span class="token token plain-text">// CSS modules
</span><span class="token token plain-text"></span><span class="token token punctuation"><</span><span class="token token">div</span><span class="token token"></span><span class="token token">className</span><span class="token token script language-javascript script-punctuation punctuation">=</span><span class="token token script language-javascript punctuation">{</span><span class="token token script language-javascript">styles</span><span class="token token script language-javascript punctuation">.</span><span class="token token script language-javascript">redText</span><span class="token token script language-javascript punctuation">}</span><span class="token token punctuation">></span></code></span></div></div></div></pre>

## Development Instructions

## Vite Configuration

Your `vite.config.js` should use SWC for optimal performance:

<pre class="not-prose w-full rounded font-mono text-sm font-extralight"><div class="codeWrapper text-light selection:text-super selection:bg-super/10 my-md relative flex flex-col rounded font-mono text-sm font-normal bg-subtler"><div class="translate-y-xs -translate-x-xs bottom-xl mb-xl sticky top-0 flex h-0 items-start justify-end"></div><div class="-mt-xl"><div><div data-testid="code-language-indicator" class="text-quiet bg-offsetPlus py-xs px-sm inline-block rounded-br rounded-tl-[3px] font-thin">js</div></div><div class="pr-lg"><span><code><span class="token token">import</span><span></span><span class="token token punctuation">{</span><span> defineConfig </span><span class="token token punctuation">}</span><span></span><span class="token token">from</span><span></span><span class="token token">'vite'</span><span>
</span><span></span><span class="token token">import</span><span> react </span><span class="token token">from</span><span></span><span class="token token">'@vitejs/plugin-react-swc'</span><span>
</span>
<span></span><span class="token token">export</span><span></span><span class="token token">default</span><span></span><span class="token token">defineConfig</span><span class="token token punctuation">(</span><span class="token token punctuation">{</span><span>
</span><span></span><span class="token token literal-property property">plugins</span><span class="token token operator">:</span><span></span><span class="token token punctuation">[</span><span class="token token">react</span><span class="token token punctuation">(</span><span class="token token punctuation">)</span><span class="token token punctuation">]</span><span class="token token punctuation">,</span><span>
</span><span></span><span class="token token literal-property property">server</span><span class="token token operator">:</span><span></span><span class="token token punctuation">{</span><span>
</span><span></span><span class="token token literal-property property">port</span><span class="token token operator">:</span><span></span><span class="token token">5173</span><span class="token token punctuation">,</span><span>
</span><span></span><span class="token token literal-property property">proxy</span><span class="token token operator">:</span><span></span><span class="token token punctuation">{</span><span>
</span><span></span><span class="token token string-property property">'/api'</span><span class="token token operator">:</span><span></span><span class="token token punctuation">{</span><span>
</span><span></span><span class="token token literal-property property">target</span><span class="token token operator">:</span><span></span><span class="token token">'http://localhost:5000'</span><span class="token token punctuation">,</span><span>
</span><span></span><span class="token token literal-property property">changeOrigin</span><span class="token token operator">:</span><span></span><span class="token token boolean">true</span><span class="token token punctuation">,</span><span>
</span><span></span><span class="token token literal-property property">secure</span><span class="token token operator">:</span><span></span><span class="token token boolean">false</span><span class="token token punctuation">,</span><span>
</span><span></span><span class="token token punctuation">}</span><span class="token token punctuation">,</span><span>
</span><span></span><span class="token token punctuation">}</span><span class="token token punctuation">,</span><span>
</span><span></span><span class="token token punctuation">}</span><span class="token token punctuation">,</span><span>
</span><span></span><span class="token token literal-property property">build</span><span class="token token operator">:</span><span></span><span class="token token punctuation">{</span><span>
</span><span></span><span class="token token literal-property property">outDir</span><span class="token token operator">:</span><span></span><span class="token token">'dist'</span><span class="token token punctuation">,</span><span>
</span><span></span><span class="token token literal-property property">sourcemap</span><span class="token token operator">:</span><span></span><span class="token token boolean">true</span><span class="token token punctuation">,</span><span>
</span><span></span><span class="token token punctuation">}</span><span class="token token punctuation">,</span><span>
</span><span></span><span class="token token punctuation">}</span><span class="token token punctuation">)</span><span>
</span></code></span></div></div></div></pre>

## Development Scripts

Add these scripts to your `frontend/package.json`:

<pre class="not-prose w-full rounded font-mono text-sm font-extralight"><div class="codeWrapper text-light selection:text-super selection:bg-super/10 my-md relative flex flex-col rounded font-mono text-sm font-normal bg-subtler"><div class="translate-y-xs -translate-x-xs bottom-xl mb-xl sticky top-0 flex h-0 items-start justify-end"></div><div class="-mt-xl"><div><div data-testid="code-language-indicator" class="text-quiet bg-offsetPlus py-xs px-sm inline-block rounded-br rounded-tl-[3px] font-thin">json</div></div><div class="pr-lg"><span><code><span class="token token punctuation">{</span><span>
</span><span></span><span class="token token property">"scripts"</span><span class="token token operator">:</span><span></span><span class="token token punctuation">{</span><span>
</span><span></span><span class="token token property">"dev"</span><span class="token token operator">:</span><span></span><span class="token token">"vite"</span><span class="token token punctuation">,</span><span>
</span><span></span><span class="token token property">"build"</span><span class="token token operator">:</span><span></span><span class="token token">"vite build"</span><span class="token token punctuation">,</span><span>
</span><span></span><span class="token token property">"preview"</span><span class="token token operator">:</span><span></span><span class="token token">"vite preview"</span><span class="token token punctuation">,</span><span>
</span><span></span><span class="token token property">"lint"</span><span class="token token operator">:</span><span></span><span class="token token">"eslint . --ext js,jsx --report-unused-disable-directives --max-warnings 0"</span><span class="token token punctuation">,</span><span>
</span><span></span><span class="token token property">"lint:css"</span><span class="token token operator">:</span><span></span><span class="token token">"stylelint 'src/**/*.css'"</span><span>
</span><span></span><span class="token token punctuation">}</span><span>
</span><span></span><span class="token token punctuation">}</span><span>
</span></code></span></div></div></div></pre>

## Running the Application

<pre class="not-prose w-full rounded font-mono text-sm font-extralight"><div class="codeWrapper text-light selection:text-super selection:bg-super/10 my-md relative flex flex-col rounded font-mono text-sm font-normal bg-subtler"><div class="translate-y-xs -translate-x-xs bottom-xl mb-xl sticky top-0 flex h-0 items-start justify-end"></div><div class="-mt-xl"><div><div data-testid="code-language-indicator" class="text-quiet bg-offsetPlus py-xs px-sm inline-block rounded-br rounded-tl-[3px] font-thin">bash</div></div><div class="pr-lg"><span><code><span class="token token"># Terminal 1: Backend</span><span>
</span><span></span><span class="token token">cd</span><span> backend
</span><span></span><span class="token token">npm</span><span> run dev
</span>
<span></span><span class="token token"># Terminal 2: Frontend  </span><span>
</span><span></span><span class="token token">cd</span><span> frontend
</span><span></span><span class="token token">npm</span><span> run dev
</span></code></span></div></div></div></pre>

## CSS Modules Usage

* **Global Theme** : Use `src/styles/styles.css`
* **CSS Modules** : Create `.module.css` files with `composes`

 **Example** :

<pre class="not-prose w-full rounded font-mono text-sm font-extralight"><div class="codeWrapper text-light selection:text-super selection:bg-super/10 my-md relative flex flex-col rounded font-mono text-sm font-normal bg-subtler"><div class="translate-y-xs -translate-x-xs bottom-xl mb-xl sticky top-0 flex h-0 items-start justify-end"></div><div class="-mt-xl"><div><div data-testid="code-language-indicator" class="text-quiet bg-offsetPlus py-xs px-sm inline-block rounded-br rounded-tl-[3px] font-thin">css</div></div><div class="pr-lg"><span><code><span class="token token">/* src/components/Home.module.css */</span><span>
</span><span></span><span class="token token">.hero</span><span></span><span class="token token punctuation">{</span><span>
</span><span></span><span class="token token property">composes</span><span class="token token punctuation">:</span><span> hero-section from </span><span class="token token">'../styles/styles.css'</span><span class="token token punctuation">;</span><span>
</span><span></span><span class="token token property">padding</span><span class="token token punctuation">:</span><span></span><span class="token token">var</span><span class="token token punctuation">(</span><span>--space-16</span><span class="token token punctuation">)</span><span class="token token punctuation">;</span><span>
</span><span></span><span class="token token punctuation">}</span><span>
</span>
<span></span><span class="token token">.container</span><span></span><span class="token token punctuation">{</span><span>
</span><span></span><span class="token token property">composes</span><span class="token token punctuation">:</span><span> container from </span><span class="token token">'../styles/styles.css'</span><span class="token token punctuation">;</span><span>
</span><span></span><span class="token token property">max-width</span><span class="token token punctuation">:</span><span> 1200px</span><span class="token token punctuation">;</span><span>
</span><span></span><span class="token token punctuation">}</span><span>
</span></code></span></div></div></div></pre>

<pre class="not-prose w-full rounded font-mono text-sm font-extralight"><div class="codeWrapper text-light selection:text-super selection:bg-super/10 my-md relative flex flex-col rounded font-mono text-sm font-normal bg-subtler"><div class="translate-y-xs -translate-x-xs bottom-xl mb-xl sticky top-0 flex h-0 items-start justify-end"></div><div class="-mt-xl"><div><div data-testid="code-language-indicator" class="text-quiet bg-offsetPlus py-xs px-sm inline-block rounded-br rounded-tl-[3px] font-thin">jsx</div></div><div class="pr-lg"><span><code><span class="token token">// src/pages/Home.jsx</span><span>
</span><span></span><span class="token token">import</span><span> styles </span><span class="token token">from</span><span></span><span class="token token">'./Home.module.css'</span><span class="token token punctuation">;</span><span>
</span>
<span></span><span class="token token">const</span><span></span><span class="token token function-variable">Home</span><span></span><span class="token token operator">=</span><span></span><span class="token token punctuation">(</span><span class="token token punctuation">)</span><span></span><span class="token token operator">=></span><span></span><span class="token token punctuation">(</span><span>
</span><span></span><span class="token token punctuation"><</span><span class="token token">div</span><span class="token token"></span><span class="token token">className</span><span class="token token script language-javascript script-punctuation punctuation">=</span><span class="token token script language-javascript punctuation">{</span><span class="token token script language-javascript">styles</span><span class="token token script language-javascript punctuation">.</span><span class="token token script language-javascript">hero</span><span class="token token script language-javascript punctuation">}</span><span class="token token punctuation">></span><span class="token token plain-text">
</span><span class="token token plain-text"></span><span class="token token punctuation"><</span><span class="token token">div</span><span class="token token"></span><span class="token token">className</span><span class="token token script language-javascript script-punctuation punctuation">=</span><span class="token token script language-javascript punctuation">{</span><span class="token token script language-javascript">styles</span><span class="token token script language-javascript punctuation">.</span><span class="token token script language-javascript">container</span><span class="token token script language-javascript punctuation">}</span><span class="token token punctuation">></span><span class="token token plain-text">
</span><span class="token token plain-text"></span><span class="token token punctuation"><</span><span class="token token">h1</span><span class="token token punctuation">></span><span class="token token plain-text">Welcome to NSS IITD</span><span class="token token punctuation"></</span><span class="token token">h1</span><span class="token token punctuation">></span><span class="token token plain-text">
</span><span class="token token plain-text"></span><span class="token token punctuation"></</span><span class="token token">div</span><span class="token token punctuation">></span><span class="token token plain-text">
</span><span class="token token plain-text"></span><span class="token token punctuation"></</span><span class="token token">div</span><span class="token token punctuation">></span><span>
</span><span></span><span class="token token punctuation">)</span><span class="token token punctuation">;</span><span>
</span>
<span></span><span class="token token">export</span><span></span><span class="token token">default</span><span> Home</span><span class="token token punctuation">;</span><span>
</span></code></span></div></div></div></pre>

## Backend Integration

## API Client Setup

Create `src/api/client.js`:

<pre class="not-prose w-full rounded font-mono text-sm font-extralight"><div class="codeWrapper text-light selection:text-super selection:bg-super/10 my-md relative flex flex-col rounded font-mono text-sm font-normal bg-subtler"><div class="translate-y-xs -translate-x-xs bottom-xl mb-xl sticky top-0 flex h-0 items-start justify-end"></div><div class="-mt-xl"><div><div data-testid="code-language-indicator" class="text-quiet bg-offsetPlus py-xs px-sm inline-block rounded-br rounded-tl-[3px] font-thin">js</div></div><div class="pr-lg"><span><code><span class="token token">const</span><span></span><span class="token token constant">API_BASE_URL</span><span></span><span class="token token operator">=</span><span></span><span class="token token">import</span><span class="token token punctuation">.</span><span>meta</span><span class="token token punctuation">.</span><span>env</span><span class="token token punctuation">.</span><span class="token token constant">VITE_API_URL</span><span></span><span class="token token operator">||</span><span></span><span class="token token">'http://localhost:5000/api'</span><span class="token token punctuation">;</span><span>
</span>
<span></span><span class="token token">class</span><span></span><span class="token token">ApiClient</span><span></span><span class="token token punctuation">{</span><span>
</span><span></span><span class="token token">async</span><span></span><span class="token token">request</span><span class="token token punctuation">(</span><span class="token token parameter">endpoint</span><span class="token token parameter punctuation">,</span><span class="token token parameter"> options </span><span class="token token parameter operator">=</span><span class="token token parameter"></span><span class="token token parameter punctuation">{</span><span class="token token parameter punctuation">}</span><span class="token token punctuation">)</span><span></span><span class="token token punctuation">{</span><span>
</span><span></span><span class="token token">const</span><span> url </span><span class="token token operator">=</span><span></span><span class="token token template-string template-punctuation">`</span><span class="token token template-string interpolation interpolation-punctuation punctuation">${</span><span class="token token template-string interpolation constant">API_BASE_URL</span><span class="token token template-string interpolation interpolation-punctuation punctuation">}</span><span class="token token template-string interpolation interpolation-punctuation punctuation">${</span><span class="token token template-string interpolation">endpoint</span><span class="token token template-string interpolation interpolation-punctuation punctuation">}</span><span class="token token template-string template-punctuation">`</span><span class="token token punctuation">;</span><span>
</span><span></span><span class="token token">const</span><span> config </span><span class="token token operator">=</span><span></span><span class="token token punctuation">{</span><span>
</span><span></span><span class="token token literal-property property">headers</span><span class="token token operator">:</span><span></span><span class="token token punctuation">{</span><span>
</span><span></span><span class="token token string-property property">'Content-Type'</span><span class="token token operator">:</span><span></span><span class="token token">'application/json'</span><span class="token token punctuation">,</span><span>
</span><span></span><span class="token token punctuation">}</span><span class="token token punctuation">,</span><span>
</span><span></span><span class="token token operator">...</span><span>options</span><span class="token token punctuation">,</span><span>
</span><span></span><span class="token token punctuation">}</span><span class="token token punctuation">;</span><span>
</span>
<span></span><span class="token token">try</span><span></span><span class="token token punctuation">{</span><span>
</span><span></span><span class="token token">const</span><span> response </span><span class="token token operator">=</span><span></span><span class="token token">await</span><span></span><span class="token token">fetch</span><span class="token token punctuation">(</span><span>url</span><span class="token token punctuation">,</span><span> config</span><span class="token token punctuation">)</span><span class="token token punctuation">;</span><span>
</span><span></span><span class="token token">if</span><span></span><span class="token token punctuation">(</span><span class="token token operator">!</span><span>response</span><span class="token token punctuation">.</span><span>ok</span><span class="token token punctuation">)</span><span></span><span class="token token punctuation">{</span><span>
</span><span></span><span class="token token">throw</span><span></span><span class="token token">new</span><span></span><span class="token token">Error</span><span class="token token punctuation">(</span><span class="token token template-string template-punctuation">`</span><span class="token token template-string">HTTP error! status: </span><span class="token token template-string interpolation interpolation-punctuation punctuation">${</span><span class="token token template-string interpolation">response</span><span class="token token template-string interpolation punctuation">.</span><span class="token token template-string interpolation">status</span><span class="token token template-string interpolation interpolation-punctuation punctuation">}</span><span class="token token template-string template-punctuation">`</span><span class="token token punctuation">)</span><span class="token token punctuation">;</span><span>
</span><span></span><span class="token token punctuation">}</span><span>
</span><span></span><span class="token token">return</span><span></span><span class="token token">await</span><span> response</span><span class="token token punctuation">.</span><span class="token token">json</span><span class="token token punctuation">(</span><span class="token token punctuation">)</span><span class="token token punctuation">;</span><span>
</span><span></span><span class="token token punctuation">}</span><span></span><span class="token token">catch</span><span></span><span class="token token punctuation">(</span><span>error</span><span class="token token punctuation">)</span><span></span><span class="token token punctuation">{</span><span>
</span><span>      console</span><span class="token token punctuation">.</span><span class="token token">error</span><span class="token token punctuation">(</span><span class="token token">'API request failed:'</span><span class="token token punctuation">,</span><span> error</span><span class="token token punctuation">)</span><span class="token token punctuation">;</span><span>
</span><span></span><span class="token token">throw</span><span> error</span><span class="token token punctuation">;</span><span>
</span><span></span><span class="token token punctuation">}</span><span>
</span><span></span><span class="token token punctuation">}</span><span>
</span>
<span></span><span class="token token">get</span><span class="token token punctuation">(</span><span>endpoint</span><span class="token token punctuation">)</span><span></span><span class="token token punctuation">{</span><span>
</span><span></span><span class="token token">return</span><span></span><span class="token token">this</span><span class="token token punctuation">.</span><span class="token token">request</span><span class="token token punctuation">(</span><span>endpoint</span><span class="token token punctuation">)</span><span class="token token punctuation">;</span><span>
</span><span></span><span class="token token punctuation">}</span><span>
</span>
<span></span><span class="token token">post</span><span class="token token punctuation">(</span><span class="token token parameter">endpoint</span><span class="token token parameter punctuation">,</span><span class="token token parameter"> data</span><span class="token token punctuation">)</span><span></span><span class="token token punctuation">{</span><span>
</span><span></span><span class="token token">return</span><span></span><span class="token token">this</span><span class="token token punctuation">.</span><span class="token token">request</span><span class="token token punctuation">(</span><span>endpoint</span><span class="token token punctuation">,</span><span></span><span class="token token punctuation">{</span><span>
</span><span></span><span class="token token literal-property property">method</span><span class="token token operator">:</span><span></span><span class="token token">'POST'</span><span class="token token punctuation">,</span><span>
</span><span></span><span class="token token literal-property property">body</span><span class="token token operator">:</span><span></span><span class="token token constant">JSON</span><span class="token token punctuation">.</span><span class="token token">stringify</span><span class="token token punctuation">(</span><span>data</span><span class="token token punctuation">)</span><span class="token token punctuation">,</span><span>
</span><span></span><span class="token token punctuation">}</span><span class="token token punctuation">)</span><span class="token token punctuation">;</span><span>
</span><span></span><span class="token token punctuation">}</span><span>
</span>
<span></span><span class="token token">put</span><span class="token token punctuation">(</span><span class="token token parameter">endpoint</span><span class="token token parameter punctuation">,</span><span class="token token parameter"> data</span><span class="token token punctuation">)</span><span></span><span class="token token punctuation">{</span><span>
</span><span></span><span class="token token">return</span><span></span><span class="token token">this</span><span class="token token punctuation">.</span><span class="token token">request</span><span class="token token punctuation">(</span><span>endpoint</span><span class="token token punctuation">,</span><span></span><span class="token token punctuation">{</span><span>
</span><span></span><span class="token token literal-property property">method</span><span class="token token operator">:</span><span></span><span class="token token">'PUT'</span><span class="token token punctuation">,</span><span>
</span><span></span><span class="token token literal-property property">body</span><span class="token token operator">:</span><span></span><span class="token token constant">JSON</span><span class="token token punctuation">.</span><span class="token token">stringify</span><span class="token token punctuation">(</span><span>data</span><span class="token token punctuation">)</span><span class="token token punctuation">,</span><span>
</span><span></span><span class="token token punctuation">}</span><span class="token token punctuation">)</span><span class="token token punctuation">;</span><span>
</span><span></span><span class="token token punctuation">}</span><span>
</span>
<span></span><span class="token token">delete</span><span class="token token punctuation">(</span><span>endpoint</span><span class="token token punctuation">)</span><span></span><span class="token token punctuation">{</span><span>
</span><span></span><span class="token token">return</span><span></span><span class="token token">this</span><span class="token token punctuation">.</span><span class="token token">request</span><span class="token token punctuation">(</span><span>endpoint</span><span class="token token punctuation">,</span><span></span><span class="token token punctuation">{</span><span>
</span><span></span><span class="token token literal-property property">method</span><span class="token token operator">:</span><span></span><span class="token token">'DELETE'</span><span class="token token punctuation">,</span><span>
</span><span></span><span class="token token punctuation">}</span><span class="token token punctuation">)</span><span class="token token punctuation">;</span><span>
</span><span></span><span class="token token punctuation">}</span><span>
</span><span></span><span class="token token punctuation">}</span><span>
</span>
<span></span><span class="token token">export</span><span></span><span class="token token">const</span><span> apiClient </span><span class="token token operator">=</span><span></span><span class="token token">new</span><span></span><span class="token token">ApiClient</span><span class="token token punctuation">(</span><span class="token token punctuation">)</span><span class="token token punctuation">;</span><span>
</span></code></span></div></div></div></pre>

## Environment Variables

Create `frontend/.env`:

<pre class="not-prose w-full rounded font-mono text-sm font-extralight"><div class="codeWrapper text-light selection:text-super selection:bg-super/10 my-md relative flex flex-col rounded font-mono text-sm font-normal bg-subtler"><div class="translate-y-xs -translate-x-xs bottom-xl mb-xl sticky top-0 flex h-0 items-start justify-end"></div><div class="-mt-xl"><div><div data-testid="code-language-indicator" class="text-quiet bg-offsetPlus py-xs px-sm inline-block rounded-br rounded-tl-[3px] font-thin">text</div></div><div class="pr-lg"><span><code><span>VITE_API_URL=http://localhost:5000/api
</span></code></span></div></div></div></pre>

For production:

<pre class="not-prose w-full rounded font-mono text-sm font-extralight"><div class="codeWrapper text-light selection:text-super selection:bg-super/10 my-md relative flex flex-col rounded font-mono text-sm font-normal bg-subtler"><div class="translate-y-xs -translate-x-xs bottom-xl mb-xl sticky top-0 flex h-0 items-start justify-end"></div><div class="-mt-xl"><div><div data-testid="code-language-indicator" class="text-quiet bg-offsetPlus py-xs px-sm inline-block rounded-br rounded-tl-[3px] font-thin">text</div></div><div class="pr-lg"><span><code><span>VITE_API_URL=https://your-backend-domain.com/api
</span></code></span></div></div></div></pre>

## Editor and Linter Setup

## VS Code Configuration

Create `frontend/.vscode/settings.json`:

<pre class="not-prose w-full rounded font-mono text-sm font-extralight"><div class="codeWrapper text-light selection:text-super selection:bg-super/10 my-md relative flex flex-col rounded font-mono text-sm font-normal bg-subtler"><div class="translate-y-xs -translate-x-xs bottom-xl mb-xl sticky top-0 flex h-0 items-start justify-end"></div><div class="-mt-xl"><div><div data-testid="code-language-indicator" class="text-quiet bg-offsetPlus py-xs px-sm inline-block rounded-br rounded-tl-[3px] font-thin">json</div></div><div class="pr-lg"><span><code><span class="token token punctuation">{</span><span>
</span><span></span><span class="token token property">"css.lint.unknownProperties"</span><span class="token token operator">:</span><span></span><span class="token token">"ignore"</span><span class="token token punctuation">,</span><span>
</span><span></span><span class="token token property">"css.customData"</span><span class="token token operator">:</span><span></span><span class="token token punctuation">[</span><span class="token token">".vscode/css_custom_data.json"</span><span class="token token punctuation">]</span><span class="token token punctuation">,</span><span>
</span><span></span><span class="token token property">"emmet.includeLanguages"</span><span class="token token operator">:</span><span></span><span class="token token punctuation">{</span><span>
</span><span></span><span class="token token property">"javascript"</span><span class="token token operator">:</span><span></span><span class="token token">"javascriptreact"</span><span>
</span><span></span><span class="token token punctuation">}</span><span>
</span><span></span><span class="token token punctuation">}</span><span>
</span></code></span></div></div></div></pre>

Create `frontend/.vscode/css_custom_data.json`:

<pre class="not-prose w-full rounded font-mono text-sm font-extralight"><div class="codeWrapper text-light selection:text-super selection:bg-super/10 my-md relative flex flex-col rounded font-mono text-sm font-normal bg-subtler"><div class="translate-y-xs -translate-x-xs bottom-xl mb-xl sticky top-0 flex h-0 items-start justify-end"></div><div class="-mt-xl"><div><div data-testid="code-language-indicator" class="text-quiet bg-offsetPlus py-xs px-sm inline-block rounded-br rounded-tl-[3px] font-thin">json</div></div><div class="pr-lg"><span><code><span class="token token punctuation">{</span><span>
</span><span></span><span class="token token property">"version"</span><span class="token token operator">:</span><span></span><span class="token token">1.1</span><span class="token token punctuation">,</span><span>
</span><span></span><span class="token token property">"properties"</span><span class="token token operator">:</span><span></span><span class="token token punctuation">[</span><span>
</span><span></span><span class="token token punctuation">{</span><span>
</span><span></span><span class="token token property">"name"</span><span class="token token operator">:</span><span></span><span class="token token">"composes"</span><span class="token token punctuation">,</span><span>
</span><span></span><span class="token token property">"description"</span><span class="token token operator">:</span><span></span><span class="token token">"CSS Modules composes property"</span><span>
</span><span></span><span class="token token punctuation">}</span><span>
</span><span></span><span class="token token punctuation">]</span><span>
</span><span></span><span class="token token punctuation">}</span><span>
</span></code></span></div></div></div></pre>

## Stylelint Configuration

Create `frontend/.stylelintrc.json`:

<pre class="not-prose w-full rounded font-mono text-sm font-extralight"><div class="codeWrapper text-light selection:text-super selection:bg-super/10 my-md relative flex flex-col rounded font-mono text-sm font-normal bg-subtler"><div class="translate-y-xs -translate-x-xs bottom-xl mb-xl sticky top-0 flex h-0 items-start justify-end"></div><div class="-mt-xl"><div><div data-testid="code-language-indicator" class="text-quiet bg-offsetPlus py-xs px-sm inline-block rounded-br rounded-tl-[3px] font-thin">json</div></div><div class="pr-lg"><span><code><span class="token token punctuation">{</span><span>
</span><span></span><span class="token token property">"extends"</span><span class="token token operator">:</span><span></span><span class="token token">"stylelint-config-standard"</span><span class="token token punctuation">,</span><span>
</span><span></span><span class="token token property">"rules"</span><span class="token token operator">:</span><span></span><span class="token token punctuation">{</span><span>
</span><span></span><span class="token token property">"property-no-unknown"</span><span class="token token operator">:</span><span></span><span class="token token punctuation">[</span><span class="token token boolean">true</span><span class="token token punctuation">,</span><span></span><span class="token token punctuation">{</span><span></span><span class="token token property">"ignoreProperties"</span><span class="token token operator">:</span><span></span><span class="token token punctuation">[</span><span class="token token">"composes"</span><span class="token token punctuation">]</span><span></span><span class="token token punctuation">}</span><span class="token token punctuation">]</span><span class="token token punctuation">,</span><span>
</span><span></span><span class="token token property">"color-hex-length"</span><span class="token token operator">:</span><span></span><span class="token token">"short"</span><span class="token token punctuation">,</span><span>
</span><span></span><span class="token token property">"selector-class-pattern"</span><span class="token token operator">:</span><span></span><span class="token token">"^[a-z][a-zA-Z0-9]+$"</span><span>
</span><span></span><span class="token token punctuation">}</span><span>
</span><span></span><span class="token token punctuation">}</span><span>
</span></code></span></div></div></div></pre>

## Team Workflow

## Git Branch Strategy

<pre class="not-prose w-full rounded font-mono text-sm font-extralight"><div class="codeWrapper text-light selection:text-super selection:bg-super/10 my-md relative flex flex-col rounded font-mono text-sm font-normal bg-subtler"><div class="translate-y-xs -translate-x-xs bottom-xl mb-xl sticky top-0 flex h-0 items-start justify-end"></div><div class="-mt-xl"><div><div data-testid="code-language-indicator" class="text-quiet bg-offsetPlus py-xs px-sm inline-block rounded-br rounded-tl-[3px] font-thin">bash</div></div><div class="pr-lg"><span><code><span class="token token"># Create feature branch</span><span>
</span><span></span><span class="token token">git</span><span> checkout -b feature/component-name
</span>
<span></span><span class="token token"># Make changes and commit</span><span>
</span><span></span><span class="token token">git</span><span></span><span class="token token">add</span><span></span><span class="token token">.</span><span>
</span><span></span><span class="token token">git</span><span> commit -m </span><span class="token token">"feat: add ComponentName with theme styles"</span><span>
</span>
<span></span><span class="token token"># Push and create PR</span><span>
</span><span></span><span class="token token">git</span><span> push origin feature/component-name
</span></code></span></div></div></div></pre>

## Code Review Checklist

* [ ] Uses CSS modules with `composes`
* [ ] Follows established color palette
* [ ] Responsive design implemented
* [ ] Proper JSX structure
* [ ] API integration follows patterns
* [ ] No console errors or warnings

## Development Standards

* Use functional components with hooks
* Implement proper error boundaries
* Follow consistent naming conventions
* Write meaningful commit messages
* Test components across devices

## Testing and Validation

## Development Testing

<pre class="not-prose w-full rounded font-mono text-sm font-extralight"><div class="codeWrapper text-light selection:text-super selection:bg-super/10 my-md relative flex flex-col rounded font-mono text-sm font-normal bg-subtler"><div class="translate-y-xs -translate-x-xs bottom-xl mb-xl sticky top-0 flex h-0 items-start justify-end"></div><div class="-mt-xl"><div><div data-testid="code-language-indicator" class="text-quiet bg-offsetPlus py-xs px-sm inline-block rounded-br rounded-tl-[3px] font-thin">bash</div></div><div class="pr-lg"><span><code><span class="token token"># Start development servers</span><span>
</span><span></span><span class="token token">npm</span><span> run dev
</span>
<span></span><span class="token token"># Build for production</span><span>
</span><span></span><span class="token token">npm</span><span> run build
</span>
<span></span><span class="token token"># Preview production build</span><span>
</span><span></span><span class="token token">npm</span><span> run preview
</span></code></span></div></div></div></pre>

## Performance Monitoring

* Use Vite's built-in performance metrics[](https://codeparrot.ai/blogs/advanced-guide-to-using-vite-with-react-in-2025)
* Monitor SWC compilation speed benefits[](https://dev.to/sudhil/speed-up-react-projects-with-vite-swc-4a59)
* Test with React DevTools
* Verify CSS module scoping
