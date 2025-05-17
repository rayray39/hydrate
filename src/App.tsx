import '@mantine/core/styles.css';
import { Box, MantineProvider, Space } from '@mantine/core';
import './App.css'
import VerticalSlider from './vertical-slider';

function App() {
    return <MantineProvider
        theme={{
        fontFamily: 'Ubuntu Mono, monospace',
        headings: { fontFamily: 'Ubuntu Mono, monospace' },
        }}
    >
        <Box style={{
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            height:'100vh',
        }}>
            <VerticalSlider icon='💧' label='water' />
            <Space w="xl"/>
            <VerticalSlider icon='☕️' label='coffee' />
            <Space w="xl"/>
            <VerticalSlider icon='🍵' label='tea' />
        </Box>
    </MantineProvider>
}

export default App
