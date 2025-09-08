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

type DailyAverageViewProps = {
    dataLine: WeatherDataPoint[]
}

import { useState } from 'react'


const DailyAverageView = (props: DailyAverageViewProps) => {
    const [startDate, setStartDate] = useState<string>("2025-09-09");
    const [endDate, setEndDate] = useState<string>("2025-09-19");
    const [metric, setMetric] = useState<"temperature" | "humidity" | "precipitation">("temperature");

    // Sumatoria diaria de cada metricas
    const sumMetricsForDay = props.dataLine.reduce((acc, curr) => {
        const day = curr.time.split("T")[0];
        if (!acc[day]) {
            acc[day] = { sumTemperature: 0, count: 0, sumPrecipitation: 0, sumHumidity: 0 };
        }
        acc[day].sumTemperature += curr.temperature;
        acc[day].sumPrecipitation += curr.precipitation;
        acc[day].sumHumidity += curr.humidity
        acc[day].count++;
        return acc;
    }, {} as Record<string, { sumTemperature: number; count: number; sumPrecipitation: number; sumHumidity: number; }>);

    // Promedio diario de cada metrica
    const dailyAvgData = Object.entries(sumMetricsForDay).map(([day, val]) => ({
        day,
        avgTemp: val.sumTemperature / val.count,
        avgPrecip: val.sumPrecipitation / val.count,
        avgHumid: val.sumHumidity / val.count
    }));

    // Filtrado por fechas
    const filteredData = dailyAvgData.filter((d) => {
        const dateOnly = d.day
        return dateOnly >= startDate && dateOnly <= endDate;
    });

    // Filtrado por metrica
    const chartData = filteredData.map((d) => ({
        time: d.day,
        value: metric === "temperature"
            ? d.avgTemp
            : metric === "humidity"
                ? d.avgHumid
                : d.avgPrecip,
    }));

    return (
        <div className='card'>
            <h2 style={{ textAlign: "center" }}>Promedio  Diario</h2>
            <div className='filters'>
                <label>
                    Fecha inicio:
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                </label>

                <label>
                    Fecha fin:
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </label>

                <label>
                    Métrica:
                    <select value={metric} onChange={(e) => setMetric(e.target.value as any)}>
                        <option value="temperature">Temperatura</option>
                        <option value="humidity">Humedad</option>
                        <option value="precipitation">Precipitación</option>
                    </select>
                </label>
            </div>

            {chartData.length === 0 && <div className="alert alert-warning">No hay datos para este rango de fecha</div>}

            {chartData.length > 0 && <LineChart width={730} height={250} data={chartData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }} onClick={(p) => console.log(p)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="value" stroke="#089896ff" />
            </LineChart>}

        </div>
    )

}

export default DailyAverageView