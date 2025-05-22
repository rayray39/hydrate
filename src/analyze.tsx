import { Box, Button, Text } from "@mantine/core"
import { useEffect, useState } from "react"
import HydrationBarChart from "./hydrationBarChart";

// Initialize the  Supabase JS client
import { createClient } from '@supabase/supabase-js'
import { useNavigate } from "react-router-dom";
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

function Analyze() {
    const navigate = useNavigate();

    const [allHydrationData, setAllHydrationData] = useState<{ date: string; water: number; coffee: number; tea: number }[]>([]);

    const fetchAllHydrationData = async () => {
        const { data, error } = await supabase.from('hydration_logs').select('*')   // fetch all table data from supabase

        if (error || !data) {
            console.error('Supabase fetch error:', error);
            return;
        } else {
            console.log('Supabase fetch successful.');
        }
        setAllHydrationData(data.slice(-7));   // display only the past 7 days of data 
        console.log('Successfully displayed hydration data in analyze page.');
    }

    useEffect(() => {
        fetchAllHydrationData();
    }, [])

    const handleBack = () => {
        // navigates back to home page
        console.log('going back to home page...');
        navigate('/home');
    }

    return <>
        <Box style={{
            display:'flex',
            flexDirection:'column',
            justifyContent:'center',
            alignItems:'center',
            height:'100vh',
        }}>
            <Text>{'Analytics Page'}</Text>

            <Box mt={40} mb={40} style={{
                width:'60%',
            }}>
                <HydrationBarChart hydrationData={allHydrationData} />
            </Box>

            <Button variant="default" size="md" onClick={handleBack}>Back</Button>
        </Box>
    </>
}

export default Analyze