import '@mantine/core/styles.css';
import { Box, MantineProvider } from '@mantine/core';
import './App.css'
import VerticalSlider from './vertical-slider';

function App() {
    return <MantineProvider>
        <Box style={{
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            height:'100vh',
        }}>
            <VerticalSlider />
        </Box>
    </MantineProvider>;
}

export default App
