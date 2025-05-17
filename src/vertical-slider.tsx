import { useState } from 'react';
import { Box, Group, Text } from '@mantine/core';
import { useMove } from '@mantine/hooks';

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
                {/* background */}
                <div
                    ref={ref}
                    style={{
                        width: 60,
                        height: 360,
                        backgroundColor: 'var(--mantine-color-blue-light)',
                        position: 'relative',
                        borderRadius:'4px'
                    }}
                >
                {/* Filled bar */}
                <div
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        height: `${value * 100}%`,
                        width: 60,
                        backgroundColor: 'var(--mantine-color-blue-filled)',
                        opacity: 0.7,
                        borderRadius:'4px'
                    }}
                />

                {/* Thumb */}
                <div
                    style={{
                        position: 'absolute',
                        bottom: `calc(${value * 100}%)`,
                        left: 0,
                        width: 60,
                        height: 8,
                        backgroundColor: 'var(--mantine-color-gray-7)',
                        borderRadius:'4px'
                    }}
                />
                </div>
            </Group>

            <Text ta="center" mt="sm">
                Value: {Math.round(value * 100)}
            </Text>
        </Box>
    )
}

export default VerticalSlider