import '@mantine/core/styles.css';
import './App.css'
import { MantineProvider } from '@mantine/core';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './home';

function App() {

    return <MantineProvider
            theme={{
            fontFamily: 'Ubuntu Mono, monospace',
            headings: { fontFamily: 'Ubuntu Mono, monospace' },
        }}
    >
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </BrowserRouter>
    </MantineProvider>
}

export default App
