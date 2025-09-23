# NSS IITD Webapp: Style and Development Guide

This guide outlines the development and styling standards for the "Digitalisation of Educational Projects in NSS IITD" webapp. It ensures a consistent, modern, and accessible UI with a greenish-tinted theme, reflecting NSS IIT Delhi's educational mission. The frontend uses **React**, **Vite**, **JSX + SWC**, and **Tailwind CSS** for utility-first styling, with an **Express.js** backend. All team members must follow these guidelines to maintain consistency.

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
* **Tailwind CSS** - Utility-first CSS framework
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

The theme uses a greenish palette, leveraging Tailwind's customizable color system. Key features:

* **Primary Color** : Emerald green (`emerald-600`: #059669) for buttons, links, and accents
* **Accessibility** : Colors meet WCAG 2.1 AA contrast ratios
* **Typography** : `Inter` font for readability (via Tailwind typography plugin)
* **Utility Classes** : Consistent styling through Tailwind's utility classes

## Color Palette

Use these Tailwind color classes:

| Purpose          | Tailwind Class    | Hex     | Usage                     |
| ---------------- | ----------------- | ------- | ------------------------- |
| Primary          | emerald-600       | #059669 | Buttons, links, accents   |
| Primary Dark     | emerald-700       | #065F46 | Hover states             |
| Success          | emerald-500       | #10B981 | Success messages, badges  |
| Warning          | amber-500         | #F59E0B | Warning messages, badges  |
| Text Primary     | gray-900         | #1A202C | Headings, primary text    |
| Text Secondary   | gray-700         | #4A5568 | Secondary text           |
| Text Tertiary    | gray-500         | #718096 | Muted text, placeholders |
| Background       | gray-50          | #F7FAFC | Main background          |
| Background Alt   | gray-100         | #EDF2F7 | Secondary sections       |
| Surface          | white            | #FFFFFF | Cards, modals, forms     |
| Surface Elevated | gray-50          | #F7FAFC | Hover states for surfaces|
| Border           | gray-200         | #E2E8F0 | Default borders          |
| Border Light     | gray-100         | #EDF2F7 | Subtle borders           |

**Gradients** (using Tailwind classes):

* Primary: `bg-gradient-to-tr from-emerald-600 to-emerald-500`
* Surface: `bg-gradient-to-tr from-white to-gray-50`
* Hero: `bg-gradient-to-tr from-emerald-50 to-emerald-100`

## Typography

Using Tailwind's typography system:

* **Font** : `Inter` (configured in `tailwind.config.js`) with system fallbacks
* **Sizes** :
  * `text-4xl`: 2.5rem (h1)
  * `text-3xl`: 2rem (h2)
  * `text-2xl`: 1.5rem (h3)
  * `text-xl`: 1.25rem (h4)
  * `text-base`: 1rem (paragraph)
  * `text-sm`: 0.875rem (small text)
* **Weights** :
  * `font-bold`: 700 (headings)
  * `font-semibold`: 600 (emphasis)
  * `font-normal`: 400 (body)
* **Colors** :
  * `text-gray-900`: Primary text
  * `text-gray-700`: Secondary text
  * `text-gray-500`: Tertiary text

## Spacing

Use Tailwind's spacing scale:

* `p-1` or `m-1`: 0.25rem (4px)
* `p-2` or `m-2`: 0.5rem (8px)
* `p-3` or `m-3`: 0.75rem (12px)
* `p-4` or `m-4`: 1rem (16px)
* `p-6` or `m-6`: 1.5rem (24px)
* `p-8` or `m-8`: 2rem (32px)
* `p-16` or `m-16`: 4rem (64px)
* `p-20` or `m-20`: 5rem (80px)

## Components

## Component Structure Template

Every component should follow this exact structure:

```jsx
// src/components/ComponentName.jsx
import React from 'react';

const ComponentName = (props) => {
  // 1. State declarations (if any)
  // 2. Event handlers
  // 3. Other functions
  
  return (
    <div className="container mx-auto px-4">
      {/* Your JSX here */}
    </div>
  );
};

export default ComponentName;
```

## Button

* **Classes**: Use Tailwind's utility classes
* **Use**: Primary for main actions, secondary for auxiliary

**Example**:

```jsx
// src/components/Button.jsx
const Button = ({ variant = 'primary', children, onClick, ...props }) => {
  const baseClasses = "px-4 py-2 rounded-lg font-semibold transition-colors duration-200";
  const variantClasses = {
    primary: "bg-emerald-600 text-white hover:bg-emerald-700",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300"
  };

  return (
    <button 
      className={`${baseClasses} ${variantClasses[variant]}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
```

## Project Card

* **Classes**: Use Tailwind's utility classes for consistent styling
* **Use**: Display project details

**Example**:

```jsx
// src/components/ProjectCard.jsx
const ProjectCard = ({ project }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{project.title}</h3>
      <p className="text-gray-700 mb-4">{project.description}</p>
      <div className="flex gap-2">
        <span className="px-2 py-1 bg-emerald-100 text-emerald-800 text-sm rounded">
          {project.status}
        </span>
      </div>
    </div>
  );
};

export default ProjectCard;
```

## Import Organization Rules

Always organize imports in this order:

```jsx
// 1. React and React-related imports
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

// 2. Third-party libraries
import axios from 'axios';

// 3. Internal components
import Button from '../components/Button';
import Header from '../components/Header';

// Note: No CSS imports needed with Tailwind
```

## Beginner-Friendly Code Review Checklist

## Before Submitting PR

* [ ] **Does it compile?** Run `npm run dev` and check for errors
* [ ] **Does it match the design?** Compare with mockups/requirements
* [ ] **Are Tailwind classes used correctly?** Follow utility-first approach
* [ ] **Are console.log statements removed?** Clean up debugging code
* [ ] **Are variable names descriptive?** `user` instead of `u`, `isLoading` instead of `loading`
* [ ] **Is the component responsive?** Use Tailwind's responsive classes (sm:, md:, lg:)

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

```jsx
❌ DON'T DO THIS:
// Directly mutating state
const [users, setUsers] = useState([]);
users.push(newUser); // Wrong!

// Using index as key in lists
{items.map((item, index) => 
  <div key={index}>{item.name}</div>
)}

// Inline styles or unnecessary custom classes
<div style={{ color: 'red', fontSize: '16px' }}>
<div className="custom-red-text">

✅ DO THIS INSTEAD:
// Proper state updates  
setUsers([...users, newUser]);

// Unique keys
{items.map((item) => 
  <div key={item.id}>{item.name}</div>
)}

// Tailwind utility classes
<div className="text-red-600 text-base">
```

## Development Instructions

## Vite & Tailwind Configuration

Your `vite.config.js` should use SWC for optimal performance:

```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
});
```

Create `tailwind.config.js`:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#059669',
          dark: '#065F46',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

## Development Scripts

Add these scripts to your `frontend/package.json`:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext js,jsx --report-unused-disable-directives --max-warnings 0"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.21.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react-swc": "^3.5.0",
    "autoprefixer": "^10.4.16",
    "eslint": "^8.55.0",
    "postcss": "^8.4.32",
    "tailwindcss": "^3.3.6",
    "vite": "^5.0.8"
  }
}

## Running the Application

<pre class="not-prose w-full rounded font-mono text-sm font-extralight"><div class="codeWrapper text-light selection:text-super selection:bg-super/10 my-md relative flex flex-col rounded font-mono text-sm font-normal bg-subtler"><div class="translate-y-xs -translate-x-xs bottom-xl mb-xl sticky top-0 flex h-0 items-start justify-end"></div><div class="-mt-xl"><div><div data-testid="code-language-indicator" class="text-quiet bg-offsetPlus py-xs px-sm inline-block rounded-br rounded-tl-[3px] font-thin">bash</div></div><div class="pr-lg"><span><code><span class="token token"># Terminal 1: Backend</span><span>
</span><span></span><span class="token token">cd</span><span> backend
</span><span></span><span class="token token">npm</span><span> run dev
</span>
<span></span><span class="token token"># Terminal 2: Frontend  </span><span>
</span><span></span><span class="token token">cd</span><span> frontend
</span><span></span><span class="token token">npm</span><span> run dev
</span></code></span></div></div></div></pre>

## Tailwind CSS Usage

* **Global Theme**: Configure in `tailwind.config.js`
* **Utility Classes**: Use Tailwind's utility classes for all styling

**Example**:

```jsx
// src/pages/Home.jsx
const Home = () => {
  return (
    <div className="bg-gradient-to-tr from-emerald-50 to-emerald-100 py-16">
      <div className="container mx-auto px-4 max-w-7xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          Welcome to NSS IITD
        </h1>
        <p className="text-gray-700 max-w-2xl">
          Making a difference in our community through educational initiatives.
        </p>
      </div>
    </div>
  );
};

export default Home;
```

**Common Patterns**:

```jsx
// Layouts
<div className="container mx-auto px-4"> {/* Container */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> {/* Grid */}
<div className="flex items-center justify-between"> {/* Flexbox */}

// Typography
<h1 className="text-4xl font-bold text-gray-900"> {/* Heading */}
<p className="text-base text-gray-700"> {/* Body text */}
<span className="text-sm text-gray-500"> {/* Small text */}

// Components
<button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg">
<div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow">
```

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
