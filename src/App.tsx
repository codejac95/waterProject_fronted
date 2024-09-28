import { useEffect, useState } from 'react';
import './app.css'
import moistureGif from './img/moisture.gif';
import tempatureGif from './img/tempature.gif';
import humidityGif from './img/humidity.gif';
import greenhouse from './img/greenhouse.png';

const TemperatureHumidityMoistureFetcher = () => {
  const [temperature, setTemperature] = useState<number | null>(null);
  const [humidity, setHumidity] = useState<number | null>(null);
  const [moisture, setMoisture] = useState<number | null>(null);

  const fetchTemperature = async () => {
      const response = await fetch('http://localhost:8080/getTemperature');
      if (!response.ok) {
        throw new Error('Failed to fetch temperature');
      }
      const temperature: number = await response.json();
      setTemperature(temperature);
  };

  const fetchHumidity = async () => {
      const response = await fetch('http://localhost:8080/getHumidity');
      if (!response.ok) {
        throw new Error('Failed to fetch humidity');
      }
      const humidity: number = await response.json();
      setHumidity(humidity);
  };

  const fetchMoisture = async () => {
    const response = await fetch('http://localhost:8080/getMoisture');
    if (!response.ok) {
      throw new Error('Failed to fetch moisture');
    }
    const moisture: number = await response.json();
    setMoisture(moisture);
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
      <div className="container">
        <div className="data-section">
        <h2>Greenhouse data:</h2>
        <p>(if anything blinks, it means trouble)</p>
          <div id="temperature">
            <p>
              Temperature: {temperature} °C
              <img
                src={tempatureGif}
                alt="temperature"
                className={temperature && (temperature < 15 || temperature > 30) ? 'blink' : ''}
                style={{width: '50px', height: '50px' }}
              />
            </p>
          </div>
          <div id="humidity">
            <p>
              Humidity: {humidity} %
              <img
                src={humidityGif}
                alt="humidity"
                className={humidity && (humidity < 60 || humidity > 80) ? 'blink' : ''}
                style={{width: '60px', height: '60px' }}
              />
            </p>
          </div>
          <div id="moisture">
            <p>
              Soil moisture: {moisture} %
              <img
                src={moistureGif}
                alt="moisture"
                className={moisture && (moisture < 20 || moisture > 50) ? 'blink' : ''}
                style={{width: '60px', height: '60px' }}
              />
            </p>
          </div>
        </div>
        <img id="greenhouse" src={greenhouse} alt="greenhouse" />
      </div>
    );
  };

export default TemperatureHumidityMoistureFetcher;
