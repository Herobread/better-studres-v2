# Better StudRes v2

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![wakatime](https://wakatime.com/badge/user/9572a36f-d8ee-4307-9f1b-ae487130d025/project/018eb88f-13da-4546-a0fb-cc9693bcb2be.svg)](https://wakatime.com/badge/user/9572a36f-d8ee-4307-9f1b-ae487130d025/project/018eb88f-13da-4546-a0fb-cc9693bcb2be)

![Better studres](https://github.com/Herobread/better-studres-v2/assets/52717777/b352a9ed-3bac-47c0-a058-f4af46984282)

Better StudRes v2 is a chrome extension, that improves appearance of the St Andrews student resources platform, featuring a completely redesigned UI and UX, enhanced accessibility, and a range of new functionalities.

[chrome web store](https://chromewebstore.google.com/detail/better-studres/kamnhbpjhhhjlbandgpngdnplledombg)

## Key Features

### Improved UI and UX

Completely redesigned interface for a modern look and feel.

- **Better folder view**:
  - Better Header:
    - navigate to any subdirectory
  - Better File Cards:
    - improved accessibility
    - image previews
    - download files and folders
    - add notes
    - add tags
  - Simple Animations
- **Improve HTML Button**
  - click to reduce width of page and make it easier to read
- **Syntax Highlighting**
  - code files are highlighted with `react-syntax-highlighter`

![dark mode](https://github.com/Herobread/better-studres-v2/assets/52717777/0624c561-1491-474d-b83f-41956bde1075)

### QuickLinks

![quicklinks](https://github.com/Herobread/better-studres-v2/assets/52717777/a3401d2a-5109-4b53-9400-e52fcdc889e5)

Easily add and configure links to any page.

### Commands

![Commands](https://github.com/Herobread/better-studres-v2/assets/52717777/341a4186-c191-4878-a8e8-3a9decaf29e9)

Commands work on any StudRes page, they allow you to:

- **Navigate**: Go to your links quickly, module root, or parent directory with ease.
- **Search for any visited page**: visited paths are stored and can be searched to quickly navigate to them
- **Configure**: change theme, add links, clear version data

### Customization

Use popup to change date display mode, icons, and UI elements visibility.

### Tags

Add file tags to group related files

### Download Files

Right click on any folder to archive and download it.

## Tech Stack

- **vite**
- **react**
- **TypeScript**
- **tailwind CSS**
- **shadcn UI**
- **tanstack query**
- **nice-modal-react**
- **react-syntax-highlighter**
- [vite-web-extension](https://github.com/JohnBra/vite-web-extension) template

## How to Run in dev mode

1. **Install Dependencies**

    ```bash
    bun install
    ```

2. **Start the Development Server**

    ```bash
    bun run dev
    ```

    This will automatically rebuild the extension to the `dist/` directory.

3. **Refresh Extensions in Chrome**
   After running the development server, refresh your Chrome extensions and the StudRes page to see the changes.

## How to build

1. **Pre checks**

    Check that the extension works in the development mode

2. **Build**

    ```bash
    bun run build
    ```

    Output will be stored in the dist/

## Original Template

This project is based on the [vite-web-extension](https://github.com/JohnBra/vite-web-extension) template.

Enjoy the improved StudRes experience!
