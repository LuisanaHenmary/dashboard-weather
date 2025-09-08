import { useState, useEffect } from 'react'
import './App.css'
import type { WeatherDataPoint } from './interfaces/WeatherDataPoint.interface'
import axios from 'axios';
import Dashboard from './components/Dashboard';


function App() {
  const [data, setData] = useState<WeatherDataPoint[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios.get<WeatherDataPoint[]>("http://localhost:4000/api/weather")
      .then(resp => setData(resp.data)).catch(err => {
        console.error(err);
        setError(true);
      }).finally(() => {
        setIsLoading(false);
      })
  }, [])

  return (
    <>
      {data.length > 0 && <Dashboard data={data} />}
      {error && <div className='alert alert-danger'> Ocurrió un error al cargar los datos </div>}
      {isLoading && <div className='spinner-border text-primary' role='status'></div>}
    </>
  )
}

export default App
