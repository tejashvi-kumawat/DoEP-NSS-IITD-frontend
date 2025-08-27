
# NSS IITD Webapp Frontend: Style and Development Guide

This guide outlines the development and styling standards for the frontend of the "Digitalisation of Educational Projects in NSS IITD" webapp. It ensures a consistent, modern, and accessible UI with a greenish-tinted theme, reflecting NSS IIT Delhi’s educational mission. The frontend uses  **React** ,  **TypeScript** ,  **Vite** , and **CSS modules** for styling. All team members must follow these guidelines to maintain consistency.

## Table of Contents

* [Project Overview](https://grok.com/chat/d42a154d-dfee-4a9d-a5da-56b9cb47dc81#project-overview)
* [Folder Structure](https://grok.com/chat/d42a154d-dfee-4a9d-a5da-56b9cb47dc81#folder-structure)
* [Theme Overview](https://grok.com/chat/d42a154d-dfee-4a9d-a5da-56b9cb47dc81#theme-overview)
* [Color Palette](https://grok.com/chat/d42a154d-dfee-4a9d-a5da-56b9cb47dc81#color-palette)
* [Typography](https://grok.com/chat/d42a154d-dfee-4a9d-a5da-56b9cb47dc81#typography)
* [Spacing](https://grok.com/chat/d42a154d-dfee-4a9d-a5da-56b9cb47dc81#spacing)
* [Components](https://grok.com/chat/d42a154d-dfee-4a9d-a5da-56b9cb47dc81#components)
* [Development Instructions](https://grok.com/chat/d42a154d-dfee-4a9d-a5da-56b9cb47dc81#development-instructions)
* [CSS Modules Usage](https://grok.com/chat/d42a154d-dfee-4a9d-a5da-56b9cb47dc81#css-modules-usage)
* [Editor and Linter Setup](https://grok.com/chat/d42a154d-dfee-4a9d-a5da-56b9cb47dc81#editor-and-linter-setup)
* [Team Workflow](https://grok.com/chat/d42a154d-dfee-4a9d-a5da-56b9cb47dc81#team-workflow)
* [Testing and Validation](https://grok.com/chat/d42a154d-dfee-4a9d-a5da-56b9cb47dc81#testing-and-validation)

## Project Overview

The NSS IITD webapp digitizes educational projects, enabling students, coordinators, and admins to manage and showcase initiatives. Key features include:

* **Project Management** : Create, view, and edit projects.
* **User Authentication** : Login for different user roles.
* **Dashboard** : Filterable project overview with status indicators.
* **Responsive Design** : Supports mobile, tablet, and desktop.

The frontend is built with React, TypeScript, and Vite, using CSS modules to enforce a greenish theme defined in `src/styles/styles.css`.

## Folder Structure

Adhere to this structure for modularity and scalability:

```
frontend/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Button.jsx
│   │   ├── Button.module.css
│   │   ├── ProjectCard.jsx
│   │   ├── ProjectCard.module.css
│   │   ├── Header.jsx
│   │   ├── Header.module.css
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Home.module.css
│   │   ├── Login.jsx
│   │   ├── Login.module.css
│   │   ├── Projects.jsx
│   │   ├── Projects.module.css
│   ├── api/
│   │   ├── fetchProjects.ts
│   │   └── auth.ts
│   ├── types/
│   │   ├── Project.ts
│   │   └── User.ts
│   ├── styles/
│   │   ├── styles.css
│   ├── context/
│   ├── routes/
│   │   └── index.ts
│   ├── App.jsx
│   ├── App.module.css
│   ├── main.jsx
│   └── index.css
├── public/
├── vite.config.ts
├── tsconfig.json
├── package.json
├── .stylelintrc.json
└── docs/
    └── README.md
```

## Theme Overview

The theme uses a greenish palette, defined in `src/styles/styles.css`. It includes:

* **Primary Color** : `#059669` (emerald green) for buttons, links, and accents.
* **Accessibility** : Colors meet WCAG 2.1 AA contrast ratios.
* **Typography** : `Inter` font for readability.
* **CSS Modules** : Scoped styles ensure consistency.

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

* **Font** : `Inter` (via Google Fonts) with fallbacks: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`.
* **Sizes** :
* `h1`: 2.5rem (2rem mobile)
* `h2`: 2rem (1.75rem mobile)
* `h3`: 1.5rem (1.375rem mobile)
* `h4`: 1.25rem
* Paragraph: 1rem, line-height 1.7
* Small text: 0.875rem
* **Weights** : 700 (headings), 600 (emphasis), 400 (body).
* **Colors** : `var(--text-primary)`, `var(--text-secondary)`, `var(--text-tertiary)`.

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

### Button

* **Classes** : `btn btn-primary` or `btn btn-secondary`.
* **Use** : Primary for main actions, secondary for auxiliary.

 **Example** :

```jsx
// src/components/Button.jsx
import styles from './Button.module.css';

interface ButtonProps {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ variant = 'primary', children }) => (
  <button className={`${styles.button} btn btn-${variant}`}>{children}</button>
);

export default Button;
```

```css
/* src/components/Button.module.css */
.button {
  composes: btn from '../../styles/styles.css';
  composes: btn-primary from '../../styles/styles.css';
}
.button.btn-secondary {
  composes: btn-secondary from '../../styles/styles.css';
}
```

### Project Card

* **Class** : `card`.
* **Use** : Display project details.

 **Example** :

```jsx
// src/components/ProjectCard.jsx
import styles from './ProjectCard.module.css';
import { Project } from '../types/Project';

const ProjectCard: React.FC<Project> = ({ title, description, status }) => (
  <div className={`${styles.card} card`}>
    <h3>{title}</h3>
    <p className="text-muted">{description}</p>
    <span className={`badge badge-${status === 'completed' ? 'success' : 'primary'}`}>
      {status}
    </span>
  </div>
);

export default ProjectCard;
```

```css
/* src/components/ProjectCard.module.css */
.card {
  composes: card from '../../styles/styles.css';
  max-width: 400px;
}
```

### Form

* **Classes** : `form-group`, `form-label`, `form-input`, `form-textarea`, `form-select`.
* **Use** : Project submission, login.

 **Example** :

```jsx
// src/components/ProjectForm.jsx
import styles from './ProjectForm.module.css';

interface ProjectFormProps {
  onSubmit: () => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ onSubmit }) => (
  <form className={styles.form}>
    <div className="form-group">
      <label className="form-label" htmlFor="title">Project Title</label>
      <input className="form-input" id="title" placeholder="Enter title" />
    </div>
    <button className="btn btn-primary">Submit</button>
  </form>
);

export default ProjectForm;
```

```css
/* src/components/ProjectForm.module.css */
.form {
  composes: flex from '../../styles/styles.css';
  composes: flex-col from '../../styles/styles.css';
  composes: gap-4 from '../../styles/styles.css';
}
```

### Header

* **Class** : `header`.
* **Use** : Navigation bar.

 **Example** :

```jsx
// src/components/Header.jsx
import styles from './Header.module.css';

const Header: React.FC = () => (
  <header className={`${styles.header} header`}>
    <div className="container flex justify-between items-center">
      <h1>NSS IITD</h1>
      <nav>
        <a href="/projects" className="btn btn-primary">Projects</a>
      </nav>
    </div>
  </header>
);

export default Header;
```

```css
/* src/components/Header.module.css */
.header {
  composes: header from '../../styles/styles.css';
}
```

## Development Instructions

1. **Setup** :

* Clone: `git clone <repo-url>`
* Install: `npm install`
* Run: `npm run dev`
* Add Google Fonts to `public/index.html`:
  ```html
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap">
  ```

1. **Routing** :

* Use `src/routes/index.ts`:
  ```jsx
  import { BrowserRouter, Routes, Route } from 'react-router-dom';
  import Home from '../pages/Home';
  import Projects from '../pages/Projects';
  import Login from '../pages/Login';

  const AppRoutes: React.FC = () => (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
  export default AppRoutes;
  ```

1. **Components** :

* Create `.jsx` and `.module.css` files in `src/components/`.
* Use TypeScript interfaces.

1. **Pages** :

* Create `.jsx` and `.module.css` files in `src/pages/`.

## CSS Modules Usage

* **Global Theme** : Use `src/styles/styles.css`.
* **CSS Modules** :
* Create `.module.css` files.
* Use `composes`:
  ```css
  .hero {
    composes: hero-section from '../../styles/styles.css';
    padding: var(--space-16);
  }
  ```
* Import:
  ```jsx
  import styles from './Home.module.css';
  ```
* **No Inline Styles** : Avoid `style={{}}`.

## Editor and Linter Setup

To support CSS modules and avoid warnings for `composes`:

1. **VS Code** :

* Install the “CSS Modules” extension.
* Add to `frontend/.vscode/settings.json`:
  ```json
  {
    "css.lint.unknownProperties": "ignore",
    "css.customData": [".vscode/css_custom_data.json"]
  }
  ```
* Create `frontend/.vscode/css_custom_data.json`:
  ```json
  {
    "version": 1.1,
    "properties": [
      {
        "name": "composes",
        "description": "CSS Modules composes property"
      }
    ]
  }
  ```
* Restart VS Code.

1. **Stylelint** :

* Create `frontend/.stylelintrc.json`:
  ```json
  {
    "extends": "stylelint-config-standard",
    "rules": {
      "property-no-unknown": [true, { "ignoreProperties": ["composes"] }],
      "color-hex-length": "short",
      "declaration-property-value-disallowed-list": {
        "color": ["/^#[0-9a-fA-F]+$/"],
        "background": ["/^#[0-9a-fA-F]+$/"]
      }
    }
  }
  ```
* Install:
  ```bash
  npm install --save-dev stylelint stylelint-config-standard
  ```
* Run:
  ```bash
  npx stylelint "src/**/*.css"
  ```
* Add to `package.json` scripts:
  ```json
  {
    "scripts": {
      "lint:css": "stylelint 'src/**/*.css'"
    }
  }
  ```
* Run: `npm run lint:css`

## Team Workflow

1. **Git** :

* Branch: `git checkout -b feature/<component-name>`
* Commit: `git commit -m "Add <Component> with theme styles"`
* Push and PR: `git push origin feature/<component-name>`

1. **Tasks** :

* Assign via GitHub Projects.

1. **Reviews** :

* Ensure CSS modules and theme classes are used.

1. **Syncs** :

* Weekly meetings for progress and theme adherence.

## Testing and Validation

1. **Visual** :

* Test with `npm run dev`.
* Verify green theme (e.g., `btn-primary`).

1. **Accessibility** :

* Use Lighthouse or axe DevTools.

1. **Unit Tests** :

* Install: `npm install --save-dev @testing-library/react @testing-library/jest-dom vitest`
* Example:
  ```jsx
  import { render, screen } from '@testing-library/react';
  import Button from '../components/Button';
  test('renders primary button', () => {
    render(<Button>Click</Button>);
    expect(screen.getByText('Click')).toHaveClass('btn-primary');
  });
  ```

## Notes

* **Consistency** : Use CSS modules with `composes`.
* **Questions** : Post in GitHub Issues or team chat.
* **Deployment** : Build (`npm run build`) and deploy to Vercel (`vercel --prod`).
