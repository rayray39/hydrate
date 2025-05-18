import '@mantine/core/styles.css';
import { Box, Button, Group, MantineProvider, Space } from '@mantine/core';
import './App.css'
import VerticalSlider from './vertical-slider';

function App() {

    const getTodayDate = () => {
        // returns today's date in dd/mm/yyyy
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        const yyyy = today.getFullYear();

        const todayDate = `${dd}/${mm}/${yyyy}`;
        return todayDate;
    }
    
    const handleRecord = () => {
        console.log('record button clicked.');
    }

    const handleAnalyze = () => {
        console.log('analyze button clicked.');
    }

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

            <Box>
                {`today: ${getTodayDate()}`}
            </Box>

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
                <Button variant="default" size='md' onClick={handleRecord} >Record</Button>
                <Button variant="default" size='md' onClick={handleAnalyze} >Analyze</Button>
            </Group>
        </Box>
    </MantineProvider>
}

export default App
