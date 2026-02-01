# Terminal Portfolio

A retro-styled terminal portfolio website built with Next.js, React, and TypeScript. Features multiple themes, keyboard shortcuts, and a fully functional command-line interface.

```
  ██████╗██╗  ██╗██████╗ ██╗███████╗    ███╗   ███╗ █████╗ ███████╗██╗  ██╗███████╗██╗   ██╗
 ██╔════╝██║  ██║██╔══██╗██║██╔════╝    ████╗ ████║██╔══██╗██╔════╝██║ ██╔╝██╔════╝╚██╗ ██╔╝
 ██║     ███████║██████╔╝██║███████╗    ██╔████╔██║███████║███████╗█████╔╝ █████╗   ╚████╔╝
 ██║     ██╔══██║██╔══██╗██║╚════██║    ██║╚██╔╝██║██╔══██║╚════██║██╔═██╗ ██╔══╝    ╚██╔╝
 ╚██████╗██║  ██║██║  ██║██║███████║    ██║ ╚═╝ ██║██║  ██║███████║██║  ██╗███████╗   ██║
  ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝╚══════╝    ╚═╝     ╚═╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚══════╝   ╚═╝

```

## 🚀 Live Demo

[View Live Portfolio](https://your-portfolio-url.com)

## ✨ Features

- **🖥️ Terminal Interface** - Full command-line experience with retro CRT aesthetics
- **🎨 7 Themes** - Multiple retro terminal themes (Amber, Green, White, IBM, Paper, Solarized, Monochrome)
- **⌨️ Keyboard Shortcuts**
  - `Tab` / `Ctrl+i` - Auto-complete commands
  - `↑` / `↓` - Navigate command history
  - `Ctrl+L` - Clear terminal
  - `Esc` - Clear input
- **📱 Responsive Design** - Works on all screen sizes
- **⚡ Fast Performance** - Built with Next.js and optimized for speed
- **🔧 Customizable** - Easy to update with your own information

## 🛠️ Tech Stack

- **Framework:** Next.js 16
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 4
- **UI:** React 19
- **Fonts:** IBM Plex Mono, VT323

## 📋 Available Commands

| Command      | Description                       |
| ------------ | --------------------------------- |
| `help`       | Show all available commands       |
| `about`      | Display information about me      |
| `projects`   | List projects with links          |
| `skills`     | Show technical skills by category |
| `experience` | Display work experience           |
| `education`  | Display education background      |
| `social`     | Show social media links           |
| `contact`    | Display contact information       |
| `themes`     | List and switch between themes    |
| `gui`        | Open GUI portfolio                |
| `pwd`        | Print working directory           |
| `whoami`     | Display current user              |
| `echo <msg>` | Print a message                   |
| `history`    | Show command history              |
| `clear`      | Clear terminal screen             |
| `banner`     | Show ASCII art                    |
| `repo`       | Open GitHub profile               |

### Pro Tips

- Use `themes set <name>` to switch themes
- Use `projects go <number>` to open a specific project
- Use `social go <number>` to open a social link

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- bun or npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/terminal-portfolio.git
cd terminal-portfolio
```

1. Install dependencies:

```bash
bun install
```

1. Run the development server:

```bash
bun dev
```

1. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
```

## 🎨 Customization

### Update Your Information

Edit `app/config.ts` to customize:

- **Personal Info:** Name, email, social links
- **Experience:** Work history
- **Education:** Academic background
- **Projects:** Your portfolio projects
- **Skills:** Technical skills with proficiency levels
- **About:** Bio and quick facts

### Customize Themes

Edit `app/themes.ts` to:

- Modify existing theme colors
- Add new custom themes
- Change the default theme

### ASCII Art

Update the ASCII art in `app/config.ts` to display your name:

```typescript
ascii: ["Your ASCII Art Here", "Line by Line"];
```

Use a tool like [TAAG](http://patorjk.com/software/taag/) to generate ASCII art.

## 📁 Project Structure

```
├── app/
│   ├── components/
│   │   └── Terminal.tsx      # Main terminal component
│   ├── config.ts              # Portfolio configuration
│   ├── themes.ts              # Theme definitions
│   ├── globals.css            # Global styles
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Main page
├── public/                    # Static assets
├── package.json
├── next.config.ts
├── tsconfig.json
└── README.md
```

## 🌐 Deployment

### Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/terminal-portfolio)

### Other Platforms

This is a static Next.js site that can be deployed to:

- Vercel
- Netlify
- GitHub Pages
- Any static hosting provider

## 📝 License

MIT License - feel free to use this template for your own portfolio!

## 🙏 Credits

- ASCII Art generated with [TAAG](http://patorjk.com/software/taag/)
- Inspired by [satnaing/terminal-portfolio](https://github.com/satnaing/terminal-portfolio)
- Fonts: IBM Plex Mono, VT323

---

Built with ❤️ by [Chris Maskey](https://github.com/chrismaskey)
