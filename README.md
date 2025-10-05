# AndroLace Insight Frontend

A modern React-based scientific knowledge platform for exploring research papers and insights.

[![GitHub](https://img.shields.io/badge/GitHub-AndroLaceWeb-blue?style=flat-square&logo=github)](https://github.com/ccm2326/AndroLaceWeb)

## Features

- **Dashboard**: Overview with statistics and charts
- **Papers**: Browse and explore scientific research papers
- **Responsive Design**: Works on desktop and mobile devices
- **Modern UI**: Built with React, Framer Motion, and Tailwind-inspired CSS

## Tech Stack

- **React 19** - UI framework
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Framer Motion** - Animations
- **Recharts** - Data visualization
- **Lucide React** - Icons
- **Axios** - HTTP client

## Getting Started

### Prerequisites

- Node.js >= 18.0.0
- npm >= 8.0.0

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/ccm2326/AndroLaceWeb.git
   cd AndroLaceWeb
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.jsx       # Main navigation header
│   └── Sidebar.jsx      # Side navigation
├── pages/               # Page components
│   ├── HomePage.jsx     # Dashboard/Home page
│   └── PapersPage.jsx   # Papers listing page
├── services/            # API services
│   └── api.js          # Mock API functions
├── data/               # Mock data
│   └── mockData.js     # Sample data
├── App.jsx             # Main app component
├── main.jsx            # App entry point
└── index.css           # Global styles
```

## Contributing

This project is designed to be extended with additional features:

- **Chat System**: Add intelligent assistant functionality
- **Visualizations**: Add advanced data visualization pages
- **Paper Details**: Add detailed paper view pages

## Repository

- **GitHub**: [https://github.com/ccm2326/AndroLaceWeb](https://github.com/ccm2326/AndroLaceWeb)
- **Issues**: Report bugs and request features
- **Pull Requests**: Contribute to the project

## License

MIT License - see LICENSE file for details
