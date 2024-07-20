# Better StudRes v2

[![wakatime](https://wakatime.com/badge/user/9572a36f-d8ee-4307-9f1b-ae487130d025/project/018eb88f-13da-4546-a0fb-cc9693bcb2be.svg)](https://wakatime.com/badge/user/9572a36f-d8ee-4307-9f1b-ae487130d025/project/018eb88f-13da-4546-a0fb-cc9693bcb2be)

![Better studres](https://github.com/Herobread/better-studres-v2/assets/52717777/b352a9ed-3bac-47c0-a058-f4af46984282)

Better StudRes v2 is a chrome extension, that improves appearence of the St Andrews student resources platform, featuring a completely redesigned UI and UX, enhanced accessibility, and a range of new functionalities. This will help you understand the features and get started with running the project.

[chrome web store](https://chromewebstore.google.com/detail/better-studres/kamnhbpjhhhjlbandgpngdnplledombg)

## Key Features

### Improved UI and UX

- Completely redesigned interface for a modern look and feel.
- Added dark mode

![dark mode](https://github.com/Herobread/better-studres-v2/assets/52717777/0624c561-1491-474d-b83f-41956bde1075)

### QuickLinks V2

![quicklinks](https://github.com/Herobread/better-studres-v2/assets/52717777/a3401d2a-5109-4b53-9400-e52fcdc889e5)

- **Add Links**: Easily add links to any page, auto-filled with active page data (emoji, name, link).
- **Edit/Delete**: Right-click to edit or delete links.
- **Reorder**.

### Commands

![Commands](https://github.com/Herobread/better-studres-v2/assets/52717777/341a4186-c191-4878-a8e8-3a9decaf29e9)

- Commands work on any StudRes page, including the root directory and file views.
- Command allow you to:
  - **Open QuickLinks**: Access saved links quickly.
  - **Navigate**: Go to root, module root, or parent directory with ease.
  - **Open any visited page**: visited paths are stored and can be searched to quickly navigate to them

### Image Preview

- Hover over image files to see a preview.

### More Emojis

- Custom emojis for all modules.
- Expanded emoji support for more file extensions.

### Better Header

- **Minimal**: Displays only the module code for a cleaner look.
- **Practical**: Breadcrumbs - allow you to navigate to any part of the current path.

### Better File Cards

- **Modification Time**: Displayed relative to the current time.
- **Bigger Hitbox**: Easier to click and interact with.
- **Visible Sorting Icons**: Icons tell how the folders and files are sorted

### Pop up

- **Customize**: date display mode, icons, and UI elements visibility.

## Tech Stack

- **Vite**
- **React**
- **TypeScript**
- **Tailwind CSS**
- **shadcn UI**
- **tanstack query** and other libraries

## How to Run(outdated, use bun instead)

1. **Install Dependencies**

    ```bash
    yarn
    ```

    _Note: You might need to use `--legacy-peer-deps`._

2. **Start the Development Server**

    ```bash
    yarn dev
    ```

    This will automatically rebuild the extension to the `dist/` directory.

3. **Refresh Extensions in Chrome**
   After running the development server, refresh your Chrome extensions and the StudRes page to see the changes.

## How to build

1. **Pre checks**

    Check that the extension works in the development mode

2. **Build**

    ```bash
    yarn build
    ```

    Output will be stored in the dist/

## Original Template

This project is based on the [vite-web-extension](https://github.com/JohnBra/vite-web-extension) template.

Enjoy the improved StudRes experience!
