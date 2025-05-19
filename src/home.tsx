import { Box, Button, Group, Space } from '@mantine/core';
import VerticalSlider from './vertical-slider';
import { getTodayDate } from './utils/getTodayDate'; 

function Home() {
    const handleAnalyze = () => {
        console.log('analyze button clicked.');
    }

    return <>
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

            <Box>
                {'* 1 cup is ≈ 0.2 litres'}
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

            <Group style={{ marginTop: 40 }}>
                <Button variant="default" size='md' onClick={handleAnalyze} >Analyze</Button>
            </Group>
        </Box>
    </>
}

export default Home