import {
    LineChart,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    CartesianGrid,
    Line
} from 'recharts'


import type { WeatherDataPoint } from '../interfaces/WeatherDataPoint.interface'

type MovingAverageViewProps = {
    dataLine: WeatherDataPoint[]
}

import { useState } from 'react'

interface MovingAvgPoint {
    time: string;
    temperature: number | null;
    humidity: number | null;
}

const MovingAverageView = (props: MovingAverageViewProps) => {
    const [metric, setMetric] = useState<"temperature" | "humidity">("temperature");

    // Para calcular la media movil
    function movingAverage(data: WeatherDataPoint[], windowSize: number): MovingAvgPoint[] {
        return data.map((_, i) => {
            if (i < windowSize - 1) {
                return { time: data[i].time, temperature: null, humidity: null };
            }
            const window = data.slice(i - windowSize + 1, i + 1);
            const avgTemperature =
                window.reduce((sum, p) => sum + p.temperature, 0) / window.length;

            const avgHumidity =
                window.reduce((sum, p) => sum + p.humidity, 0) / window.length;

            return {
                time: data[i].time,
                temperature: avgTemperature,
                humidity: avgHumidity
            };
        });
    }

    // calculando con una ventana de 3 horas
    const ma3 = movingAverage(props.dataLine, 3);

    const chartData = ma3.map((d) => ({
        time: d.time,
        value: metric === "temperature"
            ? d.temperature
            : d.humidity
    }));

    return (
        <div className='card'>
            <h2 style={{ textAlign: "center" }}>Media Movil 3h</h2>
            <div className='filters'>
                <label>
                    Métrica:
                    <select value={metric} onChange={(e) => setMetric(e.target.value as any)}>
                        <option value="temperature">Temperatura</option>
                        <option value="humidity">Humedad</option>
                    </select>
                </label>
            </div>
            <LineChart width={730} height={250} data={chartData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="value" stroke="#1417d0ff" />
            </LineChart>
        </div>

    )
}

export default MovingAverageView