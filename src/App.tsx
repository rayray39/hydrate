import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { Slider } from '@mantine/core';
import './App.css'

function App() {
    return <MantineProvider>
        {'Hello World'}

        <Slider 
            color="blue"
            defaultValue={40}
            marks={[
                { value: 20, label: '20%' },
                { value: 50, label: '50%' },
                { value: 80, label: '80%' },
            ]}
        />
    </MantineProvider>;
}

export default App
