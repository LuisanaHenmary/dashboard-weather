import type { WeatherDataPoint } from "../interfaces/WeatherDataPoint.interface";

import DailyAverageView from "./DailyAverageView";
import PerChangeTemperatView from "./PerChangeTemperatView";


type DashboarProps = {
    data: WeatherDataPoint[]
}

const Dashboard = (props: DashboarProps) => {


    return (
        <div>
            <h1 style={{textAlign:"center"}}>Mini-Dashboard del clima</h1>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
                <DailyAverageView dataLine={props.data} />
                <PerChangeTemperatView databar={props.data} />
            </div>
        </div>
    )

}

export default Dashboard