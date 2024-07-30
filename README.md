<p align="center">
  <img width=100 src="https://github.com/user-attachments/assets/4be0f302-862d-4f13-87c2-0aa9c3f8275c" />
</p>
<h1 align="center">
  Better StudRes v2
</h1>
<p align="center">
An open-source browser extension, that improves appearance of the <b>St Andrews Student Resources</b>, featuring a completely redesigned UI and UX, enhanced accessibility, and a range of new functionalities.
</p>
<p align="center">
  <a target="_blank" rel="noreferrer noopener" href="https://chromewebstore.google.com/detail/better-studres/kamnhbpjhhhjlbandgpngdnplledombg">
    <img alt="chrome web store" src="https://github.com/user-attachments/assets/2ced09a3-79b0-4643-b322-baab21d23e2d" height=32/>
  </a>
  <a target="_blank" rel="noreferrer noopener" href="https://addons.mozilla.org/en-GB/firefox/addon/better-studres/">
    <img alt="mozilla addons" src="https://github.com/user-attachments/assets/5575ac46-830e-43a3-9065-7c4e29f3d779" height=32/>
  </a>
</p>

![Better studres](https://github.com/user-attachments/assets/d8294743-b748-49bc-9e0d-e124e48dcbed)

<p align="center">
  <img src="https://img.shields.io/badge/License-MIT-yellow.svg"/>
  <img src="https://www.codefactor.io/repository/github/herobread/better-studres-v2/badge"/>
  <img src="https://wakatime.com/badge/user/9572a36f-d8ee-4307-9f1b-ae487130d025/project/018eb88f-13da-4546-a0fb-cc9693bcb2be.svg"/>
</p>

## Features

### Completely overhauled UI and UX

- dark mode
- pinned links
- command panel with search for visited folders
- smooth navigation between pages
- breadcrumbs in navigation

### Files

- file and folder download
- code syntax highlighting
- basic version tracking
- file notes
- file tags
- "reading mode" for html

### Customize

Use popup to change date display mode, icons, and UI elements visibility.

## Tech Stack

- **vite**
- **react**
- **TypeScript**
- **tailwind CSS**
- **shadcn UI**
- **tanstack query**
- **nice-modal-react**
- **react-syntax-highlighter**

[vite-web-extension](https://github.com/JohnBra/vite-web-extension) template

## How to Run in dev mode

1. **Install Dependencies**

    ```bash
    bun install
    ```

2. **Start the Development Server**

    chrome:
    ```bash
    bun run dev
    ```
    firefox:
    ```bash
    bun run dev:firefox
    ```

    This will automatically rebuild the extension to the `dist/` directory.

   

4. **Refresh Extensions in browser**
   
   After running the development server, refresh your extension(s) and the Studres page to see the changes.

## How to build

    chrome:
    ```bash
    bun run build
    ```
    
    firefox:
    ```bash
    bun run build:firefox
    ```

    Output will be stored in the dist/

Enjoy the improved StudRes experience!
