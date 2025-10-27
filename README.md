# 🌳 Nested Tags Tree — React + TypeScript + TailwindCSS

A fully interactive **Nested Tags Tree UI** built with **React**, **TypeScript**, and **Tailwind CSS**.  
This project demonstrates recursive component rendering, dynamic state updates, and hierarchical data manipulation.

Deployed Live at:  
👉 [**https://souravrao-31.github.io/nested-tags/**](https://souravrao-31.github.io/nested-tags/)

---

## 🧭 Overview

This web app renders a **tree of nested tags**, where each tag can contain either:
- a **data field**, or
- a **list of child tags (children)**.

Users can:
- **Expand / collapse** any tag node  
- **Edit tag names and data values**
- **Add new child tags** dynamically  
- **Remove tags** from the hierarchy  
- **Export** the current tree as clean JSON

Every modification is reflected instantly in the UI and in the exported data.

---

## 🧩 Features

| Feature | Description |
|----------|--------------|
| 🌿 **Recursive Component Tree** | Dynamically renders nested tags using a recursive `TagView` component |
| ✏️ **Editable Fields** | Click on tag name or data to edit inline |
| ➕ **Add Child** | Converts a leaf tag (with data) into a branch with children |
| ❌ **Remove Child** | Deletes a tag node and its entire subtree |
| 📦 **Export JSON** | Outputs the current tag tree hierarchy as formatted JSON |
| 🔽 **Collapsible Nodes** | Each tag (including root) can expand or collapse |
| 🎨 **Modern UI with Tailwind CSS** | Clean, responsive design with light-blue header panels |
| ⚡ **TypeScript** | Strict type safety with reusable `Tag` interface |

---

## 🛠️ Tech Stack

- **React 18** + **TypeScript**
- **Vite** (for fast builds)
- **Tailwind CSS** (for styling)
- **GitHub Pages** (for deployment)

---

## 📂 Folder Structure

Nested-Tags/
│
├── public/ # Static assets
├── src/
│ ├── components/
│ │ └── TagView.tsx # Recursive Tag component
│ ├── types.ts # Shared type definitions
│ ├── App.tsx # Root component
│ ├── main.tsx # Entry point
│ ├── index.css # Tailwind + global styles
│ └── ...
│
├── tailwind.config.cjs # Tailwind configuration
├── postcss.config.cjs # PostCSS configuration
├── vite.config.ts # Vite config with base path
├── package.json
└── README.md

## Start Development Server
npm run dev
