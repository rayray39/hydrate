import { useEffect, useState } from 'react';
import { Box, Button, Group, Text } from '@mantine/core';
import { useMove } from '@mantine/hooks';
import { sliderColors } from './slider-colors';
import type { SliderLabel } from './slider-labels';

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

    const handleRecord = () => {
        // records the amt drank and adds the amt to the running totalAmount
        console.log(`recording ${label}, amt = ${value.toFixed(1)} L ...`);
        setTotalAmount(prev => {
            const newTotal = prev + value;
            console.log(`Updated ${label}, tot amt = ${newTotal.toFixed(1)} L ...`);
            return newTotal;
        });
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
        </Box>
    )
}

export default VerticalSlider