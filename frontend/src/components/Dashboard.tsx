import type { WeatherDataPoint } from "../interfaces/WeatherDataPoint.interface";

import DailyAverageView from "./DailyAverageView";


type DashboarProps = {
    data: WeatherDataPoint[]
}

const Dashboard = (props: DashboarProps) => {


    return (
        <div>
            <h1 style={{textAlign:"center"}}>Mini-Dashboard del clima</h1>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
                <DailyAverageView dataLine={props.data} />
            </div>
        </div>
    )

}

export default Dashboard