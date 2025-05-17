import '@mantine/core/styles.css';
import { Box, Button, Group, MantineProvider, Space } from '@mantine/core';
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
            flexDirection:'column',
            justifyContent:'center',
            alignItems:'center',
            height:'100vh',
        }}>
            <Box style={{
                fontWeight:'bold',
                fontSize: 24,
                letterSpacing: 2
            }}>{"HYDRATE"}</Box>

            <Box style={{
                display:'flex',
                justifyContent:'center',
                alignItems:'center',
                marginTop: 40
            }}>
                <VerticalSlider icon='💧' label='water' />
                <Space w="xl"/>
                <VerticalSlider icon='☕️' label='coffee' />
                <Space w="xl"/>
                <VerticalSlider icon='🍵' label='tea' />
            </Box>

            <Box>
                {'* 1 cup is ≈ 0.2 litres'}
            </Box>

            <Group style={{ marginTop: 40 }}>
                <Button variant="default" size='md' >Record</Button>
                <Button variant="default" size='md' >Analyze</Button>
            </Group>
        </Box>
    </MantineProvider>
}

export default App
