import '@mantine/core/styles.css';
import './App.css'
import { MantineProvider } from '@mantine/core';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './home';
import Analyze from './analyze';
import SignIn from './signIn';

function App() {

    return <MantineProvider
            theme={{
            fontFamily: 'Ubuntu Mono, monospace',
            headings: { fontFamily: 'Ubuntu Mono, monospace' },
        }}
    >
        <BrowserRouter>
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/" element={<SignIn />} />
                <Route path="/analyze" element={<Analyze />} />
            </Routes>
        </BrowserRouter>
    </MantineProvider>
}

export default App
