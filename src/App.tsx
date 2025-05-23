import '@mantine/core/styles.css';
import './App.css'
import { MantineProvider } from '@mantine/core';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './home';
import Analyze from './analyze';
import SignIn from './signIn';
import ProtectedRoute from './protectedRoute';

function App() {

    return <MantineProvider
            theme={{
            fontFamily: 'Ubuntu Mono, monospace',
            headings: { fontFamily: 'Ubuntu Mono, monospace' },
        }}
    >
        <BrowserRouter>
            <Routes>
                {/* Public Routes */}
                <Route path='/' element={<SignIn />} />

                {/* Protected Routes, require authentication */}
                <Route path="/home" element={
                    <ProtectedRoute child={<Home />} />
                } />
                <Route path="/analyze" element={
                    <ProtectedRoute child={<Analyze />} />
                } />
            </Routes>
        </BrowserRouter>
    </MantineProvider>
}

export default App
