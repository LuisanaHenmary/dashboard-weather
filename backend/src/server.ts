import express = require("express");
import axios = require("axios");
import cors = require("cors");

const app = express();
app.use(cors());


app.get("/api/weather", async (requestAnimationFrame, resp) => {
    try{

        const url_weather = "https://api.open-meteo.com/v1/forecast?latitude=35&longitude=139&hourly=temperature_2m,relativehumidity_2m,precipitation"
        const webhook_url = "https://webhook.site/a0dd704f-7d04-4817-b7bf-6d3a300c6381"
        const response = await (axios as any).get(url_weather);

        const data = response.data.hourly.time.map((time:string, index:number) => ({
            time,
            temperature: response.data.hourly.temperature_2m[index],
            humidity: response.data.hourly.relativehumidity_2m[index],
            precipitation: response.data.hourly.precipitation[index],
        }));

        const log = {
            timestam: new Date().toISOString(),
            endpoint: "/api/weather",
            message: "Llamado exitoso"
        }

        console.log(log);

        try{
            await (axios as any).post(webhook_url, log);
        }catch(e){
            console.error("Error enviando el webhook: ", e)
        }

        resp.status(200).json(data);

    }catch(error){
        resp.status(500).json({error:"Error al obtener data del clima"})
    }
});


app.listen(4000, () => {
    console.log("Ejecutando backend en http://localhost:4000")
});