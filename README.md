
## Getting Started FrontEnd

To get started with the frontend, follow these steps:

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (LTS version recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/your-repo/gojo_Ecommerce.git
    ```
2. Navigate to the frontend directory:
    ```bash
    cd gojo_Ecommerce/Frontend
    ```
3. Install dependencies:
    ```bash
    npm install
    ```
    or
    ```bash
    yarn install
    ```

### Running the Development Server

Start the development server with the following command:
```bash
npm run dev
```
or
```bash
yarn dev
```

The application will be available at `http://localhost:3000`.

### Building for Production

To build the project for production, run:
```bash
npm run build
```
or
```bash
yarn build
```

The production-ready files will be in the `dist` folder.

### Linting and Formatting

To check for linting issues, run:
```bash
npm run lint
```
or
```bash
yarn lint
```

To format the code, run:
```bash
npm run format
```
or
```bash
yarn format
```
### Folder structure 

Frontend/
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── Navbar/
│   │   ├── Footer/
│   │   └── Cards/
│   ├── pages/            # Page components
│   │   ├── Home/
│   │   ├── Auth/
│   │   └── Products/
│   ├── context/          # React context providers
│   ├── assets/           # Static assets (images, icons)
│   ├── styles/           # CSS/SCSS files
│   ├── App.jsx          # Root component
│   └── main.jsx         # Entry point
├── public/              # Public assets
├── package.json         # Dependencies and scripts
├── vite.config.js      # Vite configuration
└── index.html          # HTML template

### Additional Resources

- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://reactjs.org/)
- [ESLint Documentation](https://eslint.org/)

#### React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh