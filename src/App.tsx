import { useEffect, useState } from 'react';
import './app.css'
import wateringGif from './img/watering.gif';
import tempatureGif from './img/tempature.gif';
import humidityGif from './img/humidity.gif';

const TemperatureHumidityFetcher = () => {
  const [temperature, setTemperature] = useState<number | null>(null);
  const [humidity, setHumidity] = useState<number | null>(null);
  const [moisture, setMoisture] = useState<number | null>(null);

  const fetchTemperature = async () => {
      const response = await fetch('http://localhost:8080/getTemperature');
      if (!response.ok) {
        throw new Error('Failed to fetch temperature');
      }
      const temp: number = await response.json();
      setTemperature(temp);
  };

  const fetchHumidity = async () => {
      const response = await fetch('http://localhost:8080/getHumidity');
      if (!response.ok) {
        throw new Error('Failed to fetch humidity');
      }
      const hum: number = await response.json();
      setHumidity(hum);
  };

  const fetchMoisture = async () => {
    const response = await fetch('http://localhost:8080/getMoisture');
    if (!response.ok) {
      throw new Error('Failed to fetch humidity');
    }
    const moi: number = await response.json();
    setMoisture(moi);
};

  useEffect(() => {
    const fetchData = async () => {
      await fetchTemperature();
      await fetchHumidity();
      await fetchMoisture();
    };

    fetchData();
    const intervalid = setInterval(fetchData,30000);
    return () => clearInterval(intervalid);
    },[]);

  return (
    <div>
      <h1>Temperature, Humidity & Soil moisture Data</h1>
      <div id = "temperature">
       <p>Temperature: {temperature} °C
       <img src={tempatureGif} alt="temperature"
        style={{ marginLeft: '10px', width: '50px', height: '50px' }} /></p>
      </div>
      <div id = "humidity">
        <p>Humidity: {humidity} %
        <img src={humidityGif} alt="humidity"
        style={{ marginLeft: '10px', width: '50px', height: '50px' }} /></p>
      </div>
      <div id = "moisture">
        <p>Soil moisture: {moisture} % 
        <img src={wateringGif} alt="watering"
        style={{ marginLeft: '10px', width: '50px', height: '50px' }} /></p>
      </div>
     
    </div>
  );
};

export default TemperatureHumidityFetcher;
