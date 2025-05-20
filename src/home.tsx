import { Box, Button, Group, Space } from '@mantine/core';
import VerticalSlider from './vertical-slider';
import { getTodayDate } from './utils/getTodayDate'; 
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();

    const handleAnalyze = () => {
        // navigates to the analytics page, after analyze button is clicked on
        console.log('analyze button clicked.');
        navigate('/analyze');
    }

    const handleExport = () => {
        // exports all the hydration data from the database and downloads it
        console.log('export button clicked.');
        fetchAllDataFromDatabase();
    }

    const fetchAllDataFromDatabase = async () => {
        // fetches all data from database, writes them to a .txt file, and downloads it
        const response = await fetch('http://localhost:5000/api/hydration/all', {
            method:'GET',
            headers:{'Content-Type':'application/json'}
        })

        if (!response.ok) {
            console.log('Error in fetching all hydration data for export.');
            return;
        }

        const data = await response.json();

        try {
            // Step 1: Build the text content
            const headers = ['date', 'water', 'coffee', 'tea'];
            const rowData = data.allData.map((entry: { date: string; water: number; coffee: number; tea: number; }) => {
                return `${entry.date} | ${entry.water ?? 0} | ${entry.coffee ?? 0} | ${entry.tea ?? 0}`;
            });

            const fileContent = [
                headers.join(' | '),     // header row
                ...rowData               // data rows
            ].join('\n');

            // Step 2: Create blob and trigger download
            const blob = new Blob([fileContent], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);

            const a = document.createElement('a');
            a.href = url;
            a.download = 'hydrate-log.txt';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        } catch (error) {
            console.log('Error saving data to .txt file, error: ', error);
        }

        console.log(data.message);
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
                <Button variant="default" size='md' onClick={handleExport} >Export</Button>
            </Group>
        </Box>
    </>
}

export default Home