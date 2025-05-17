import { useState } from 'react';
import { Box, Group, Text } from '@mantine/core';
import { useMove } from '@mantine/hooks';

const SLIDER_WIDTH = 100;
const SLIDER_HEIGHT = 360;
const THUMB_HEIGHT = 8;
const SLIDER_BORDER_RADIUS = '4px';
const ICON_DISTANCE_FROM_TOP = 10;
const LABEL_DISTANCE_FROM_TOP = 36;

function VerticalSlider({ icon, label }:{ icon:string, label:string}) {
    const [value, setValue] = useState(1);
    const sliderMin = 0;
    const sliderMax = 5;
    const noramlizedValue = (value - sliderMin) / (sliderMax - sliderMin);

    const { ref } = useMove(({ y }) => {
        // normalize the value to be withing the range [1,5]
        const scaled = 1 - y; // y=0 means top, so invert
        const newValue = sliderMin + scaled * (sliderMax - sliderMin);
        setValue(Math.round(newValue));
    });

    return (
        <Box style={{
            display:'flex',
            flexDirection:'column',
            justifyContent:'center'
        }}>
            <Group justify="center">
                {/* Background */}
                <div
                    ref={ref}
                    style={{
                        width: SLIDER_WIDTH,
                        height: SLIDER_HEIGHT,
                        backgroundColor: 'var(--mantine-color-blue-light)',
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
                            backgroundColor: 'var(--mantine-color-blue-filled)',
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
                            backgroundColor: 'var(--mantine-color-gray-7)',
                            borderRadius: SLIDER_BORDER_RADIUS
                        }}
                    />
                </div>
            </Group>

            <Text ta="center" mt="sm">
                {Math.round(value)} litres
            </Text>
        </Box>
    )
}

export default VerticalSlider