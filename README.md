# Mini Dashboard Clima 🌦️

## Fuente de datos

API: [Open-Meteo](https://open-meteo.com/)  
Endpoint usado (via backend Express):
GET /api/weather.

## Cómo correr

Tanto para backend como frontend

```bash
npm install
npm run dev
```

## Transformaciones implementadas

1. **Agregación temporal**: promedio diario de temperatura, precipitación y humedad. Por ejemplo el de temperatura seria:   avg_temp_day = (sum(Temp_1, Temp_2, ..., Temp_n)) / n
2. **Media móvil (3 horas)**: moving_avg[i] = (values[i] + values[i-1] + values[i-2]) / 3
3. **Top-N**: horas con mayor precipitación topN = sort(values, desc).slice(0, N)
4. **Cambio de Temperaruta/h**: change_t = ((Temp_t - Temp_(t-1)) / Temp_(t-1)) * 100

## Decisiones de diseño y trade-offs

* Usé Express como backend para cumplir el requisito de no llamar la API directo desde React.

* Guardé trazas en logs/http_trace.jsonl para demostrar ejecución.

* Elegí Bootstrap para mensajes de estado rápido → menos tiempo invertido en CSS.

* No prioricé colores/diseño avanzado, enfoqué en funcionalidad.

## Declaración de uso de IA

Utilicé asistencia de IA para:

* Idear las transformaciones y su implementación en TypeScript.

* Generar ejemplos de integración con Recharts.

* Mejorar la redacción de este README.
