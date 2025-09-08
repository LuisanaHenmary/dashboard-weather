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

type TopRainViewsProps = {
    databar: WeatherDataPoint[]
}

const TopRainView = (props: TopRainViewsProps) => {

    const topRain = [...props.databar]
        .sort((a, b) => b.precipitation - a.precipitation)
        .slice(0, 5);

    return (
        <div className='card'>
            <h2 style={{ textAlign: "center" }}>Top 5 Horas con Más Lluvia</h2>
            <BarChart width={730} height={250} data={topRain}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="precipitation" fill="#10089aff" />
            </BarChart>
        </div>
    )
}

export default TopRainView