import { useState } from 'react';
import { Box, Group, Text } from '@mantine/core';
import { useMove } from '@mantine/hooks';

const SLIDER_WIDTH = 60;
const SLIDER_HEIGHT = 360;
const THUMB_HEIGHT = 8;
const SLIDER_BORDER_RADIUS = '4px';

function VerticalSlider() {
    const [value, setValue] = useState(0.2);
    const { ref } = useMove(({ y }) => setValue(1 - y));

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
                            top: 10,
                        }}
                        className='vert-slider-icon'
                    >{"💧"}</div>
                    {/* Label */}
                    <div
                        style={{
                            position:'absolute',
                            width:'100%',
                            top: 30,
                            textAlign:'center'
                        }}
                        className='vert-slider-label'
                    >{"water"}</div>

                    {/* Filled bar */}
                    <div
                        style={{
                            position: 'absolute',
                            bottom: 0,
                            height: `${value * 100}%`,
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
                            bottom: `calc(${value * 100}%)`,
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
                {Math.round(value * 100)} litres
            </Text>
        </Box>
    )
}

export default VerticalSlider