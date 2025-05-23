import { Box, Button, Group, Space } from '@mantine/core';
import VerticalSlider from './vertical-slider';
import { getTodayDate } from './utils/getTodayDate'; 
import { useNavigate } from 'react-router-dom';

// Initialize the  Supabase JS client
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey, 
    {
        global: {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }
    }
);


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
        const { data, error } = await supabase.from('hydration_logs').select('*')   // fetch all table data from supabase

        if (error || !data) {
            console.error('Supabase fetch error:', error);
            return;
        } else {
            console.log('Supabase fetch successful.');
        }

        // write to .txt file and formats it for download
        try {
            // Step 1: Build the text content
            const headers = ['date', 'water (L)', 'coffee (L)', 'tea (L)'];
            const rowData = data.map((entry: { date: string; water: number; coffee: number; tea: number; }) => {
                return `${entry.date} | ${entry.water ?? 0} | ${entry.coffee ?? 0} | ${entry.tea ?? 0}`;
            });

            const fileContent = [
                headers.join(' | '),     // header row
                ...rowData               // data rows
            ].join('\n');

            // Step 2: Create blob and trigger download
            const blob = new Blob([fileContent], { type: 'text/plain' });   // generates a in-memory file-like object
            const url = URL.createObjectURL(blob);  // generates a temp URL

            const a = document.createElement('a');  // creates a hidden anchor element to download from URL
            a.href = url;
            a.download = 'hydrate-log.txt';
            document.body.appendChild(a);   // add to page's DOM temporarily
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);   // removes the file-like object from memory
        } catch (error) {
            console.log('Error saving data to .txt file, error: ', error);
        }

        console.log('Successfully exported all hydration data.');
    }

    const handleLogout = () => {
        console.log('logging user out...');
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
                <Button variant="default" size='md' onClick={handleLogout} >Log Out</Button>
            </Group>
        </Box>
    </>
}

export default Home