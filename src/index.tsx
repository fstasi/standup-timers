import { App } from './app';
import { BrowserRouter } from "react-router-dom";

import { createRoot } from 'react-dom/client';
const container = document.getElementById('app');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<BrowserRouter><App /></BrowserRouter>);