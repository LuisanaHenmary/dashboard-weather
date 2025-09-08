import {
    BarChart,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    CartesianGrid,
    Bar
} from 'recharts'

import type { WeatherDataPoint } from '../interfaces/WeatherDataPoint.interface'

type PerChangeTemperatViewProps = {
    databar: WeatherDataPoint[]
}


import { useState } from 'react'

const PerChangeTemperatView = (props: PerChangeTemperatViewProps) => {
    const [clickedPoint, setCickedPoint] = useState({time:"YYYY-MM-DDT00:00", change:0})

    const tempChange = props.databar.map((point, i) => {
        if (i === 0) return { ...point, change: 0 };
        const prev = props.databar[i - 1].temperature;
        const change = ((point.temperature - prev) / prev) * 100;
        return { ...point, change };
    });

    return (
        <div className='card'>
            <h2 style={{textAlign:"center"}}>% Cambio de temperatura por Hora</h2>
            <BarChart width={730} height={250} data={tempChange}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />

                <Bar dataKey="change" fill="#d884c4ff" onClick={(data)=>{
                    const newValue = {
                        time: data.payload?.time,
                        change: data.payload?.change
                    }
                    setCickedPoint(newValue)
                }}/>
            </BarChart>

            <div>
                <span> <b>Tiempo:</b> {clickedPoint.time}</span>
                <span> <b>Cambio:</b> {clickedPoint.change}</span>
            </div>
            <div>Click en una barra</div>
        </div>
    )

}

export default PerChangeTemperatView