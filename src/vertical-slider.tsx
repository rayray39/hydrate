import { useEffect, useState } from 'react';
import { Box, Button, Group, Modal, Text } from '@mantine/core';
import { useDisclosure, useMove } from '@mantine/hooks';
import { sliderColors } from './slider-colors';
import type { SliderLabel } from './slider-labels';
import { getTodayDate } from './utils/getTodayDate';

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


const SLIDER_WIDTH = 100;
const SLIDER_HEIGHT = 360;
const THUMB_HEIGHT = 8;
const SLIDER_BORDER_RADIUS = '4px';
const ICON_DISTANCE_FROM_TOP = 10;
const LABEL_DISTANCE_FROM_TOP = 36;

function VerticalSlider({ icon, label }:{ icon:string, label:SliderLabel}) {
    const { fill, track, thumb } = sliderColors[label] ?? sliderColors.default;

    // tracks current slider value
    const [value, setValue] = useState<number>(0);
    const sliderMin = 0;
    const sliderMax = 3;
    const sliderStep = 0.1;
    const noramlizedValue = (value - sliderMin) / (sliderMax - sliderMin);

    // tracks accumulated amount
    const [totalAmount, setTotalAmount] = useState<number>(0);

    // controls the opening and closing of the modal
    const [opened, { open, close }] = useDisclosure(false);

    const { ref } = useMove(({ y }) => {
        // normalize the value to be withing the range [0,3], with step size = 0.1
        const normalized = 1 - y; // y=0 at top, invert it
        let scaled = sliderMin + normalized * (sliderMax - sliderMin);

        // Round to nearest 0.1
        scaled = Math.round(scaled / sliderStep) * sliderStep;

        // Clamp the value to the range
        scaled = Math.max(sliderMin, Math.min(sliderMax, scaled));
        setValue(scaled);
    });

    const fetchTodaysHydrationData = async () => {
        // makes a GET request to Supabase to retrieve all hydration data, of this label, from today
        const today = getTodayDate();
        const { data, error } = await supabase
            .from('hydration_logs')
            .select('*')   // fetch only water column
            .eq('date', today)
            .maybeSingle()

        if (error) {
            console.error('Supabase fetch error:', error);
            return;
        }
        if (!data) {
            console.log('No hydration data for today retrieved.');
            return;
        }

        console.log('Supabase fetch successful.');

        const typedData = data as Record<SliderLabel, number>;
        setTotalAmount(typedData[label]);   // set label (water, coffee or tea)'s total amount
        console.log("Successfully fetched today's hydration data.");
    }

    useEffect(() => {
        fetchTodaysHydrationData();
    }, [])

    const handleRecord = () => {
        // opens the modal to ask user for amount drank confirmation
        open();
        console.log(`recording ${label}, amt = ${value.toFixed(1)} L ...`);
    }

    const confirmHydrationRecordBackend = async () => {
        // makes a POST request to Supabase, to record the hydration data to table
        const today = getTodayDate();

        const { data: existingRow, error } = await supabase
            .from('hydration_logs')
            .select('*')
            .eq('date', today)
            .maybeSingle();

        if (error) {
            console.error('Error fetching existing hydration entry:', error);
            return;
        }

        if (existingRow) {
            // existing row exists for today's date, perform an update on the hydration values
            const currentValue = existingRow[label] ?? 0;
            const updatedValue = currentValue + value;

            const { error: updateError } = await supabase
                .from('hydration_logs')
                .update({ [label]: Math.round(updatedValue * 10) / 10 })
                .eq('date', today);

            if (updateError) {
                console.error('Error updating hydration entry:', updateError);
                return;
            }
            console.log('Successfully updated hydration entry.');
        } else {
            // row does not exists yet for today's date, perform an insertion
            const newEntry = {
                date: today,
                water: label === 'water' ? value : 0,
                coffee: label === 'coffee' ? value : 0,
                tea: label === 'tea' ? value : 0,
            };

            const { error: insertError } = await supabase
                .from('hydration_logs')
                .insert([newEntry]);

            if (insertError) {
                console.error('Error inserting hydration entry:', insertError);
                return;
            }

            console.log('Successfully inserted new hydration entry.');
        }
    }

    const handleConfirm = () => {
        // records the amt drank and adds the amt to the running totalAmount, if confirm button in modal is clicked on
        setTotalAmount(prev => {
            const newTotal = prev + value;
            console.log(`Updated ${label}, tot amt = ${newTotal.toFixed(1)} L ...`);
            return newTotal;
        });
        confirmHydrationRecordBackend();
        console.log(`successfully recorded ${label}.`);
        setValue(0);
        close();
    }

    return (
        <Box style={{
            display:'flex',
            flexDirection:'column',
            justifyContent:'center'
        }}>
            <Text ta="center" mb="sm">
                {`Tot Amt: ${totalAmount.toFixed(1)} L`}
            </Text>
            <Group justify="center">
                {/* Background */}
                <div
                    ref={ref}
                    style={{
                        width: SLIDER_WIDTH,
                        height: SLIDER_HEIGHT,
                        backgroundColor: track,
                        position: 'relative',
                        borderRadius: SLIDER_BORDER_RADIUS
                    }}
                >
                    {/* Icon */}
                    <div
                        style={{
                            position:'absolute',
                            width:'100%',
                            textAlign:'center',
                            zIndex: 10,
                            top: ICON_DISTANCE_FROM_TOP,
                        }}
                        className='vert-slider-icon'
                    >{icon}</div>
                    {/* Label */}
                    <div
                        style={{
                            position:'absolute',
                            width:'100%',
                            zIndex: 10,
                            top: LABEL_DISTANCE_FROM_TOP,
                            textAlign:'center'
                        }}
                        className='vert-slider-label'
                    >{label}</div>

                    {/* Filled bar */}
                    <div
                        style={{
                            position: 'absolute',
                            bottom: 0,
                            height: `${noramlizedValue * 100}%`,
                            width: SLIDER_WIDTH,
                            backgroundColor: fill,
                            opacity: 0.7,
                            borderRadius: SLIDER_BORDER_RADIUS
                        }}
                    />

                    {/* Thumb */}
                    <div
                        style={{
                            position: 'absolute',
                            bottom: `calc(${noramlizedValue * 100}%)`,
                            // bottom: `calc(${noramlizedValue * 100}%)`,
                            left: 0,
                            width: SLIDER_WIDTH,
                            height: THUMB_HEIGHT,
                            backgroundColor: thumb,
                            borderRadius: SLIDER_BORDER_RADIUS
                        }}
                    />
                </div>
            </Group>

            <Text ta="center" mt="sm">
                {value.toFixed(1)} litres
            </Text>

            <Button variant="default" onClick={handleRecord} >Record</Button>

            <Modal opened={opened} onClose={close} title="Confirm Hydration Amount">
                <Box style={{
                    display:'flex',
                    flexDirection:'column',
                    alignItems:'center'
                }}>
                    <Text>
                    {`You have drank ${value.toFixed(1)} litres of ${label}.`}
                    </Text>
                    <Button variant='default' mt={10} onClick={handleConfirm} >Confirm</Button>
                </Box>
            </Modal>
        </Box>
    )
}

export default VerticalSlider