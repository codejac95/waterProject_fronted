import { useEffect, useState } from 'react';
import './app.css'
import moistureGif from './img/moisture.gif';
import tempatureGif from './img/tempature.gif';
import humidityGif from './img/humidity.gif';
import tomato from './img/tomato.png';

const TemperatureHumidityMoistureFetcher = () => {
  const [temperature, setTemperature] = useState<number | null>(null);
  const [humidity, setHumidity] = useState<number | null>(null);
  const [moisture, setMoisture] = useState<number | null>(null);
  const [avgTemperature, setAvgTemperature] = useState<number | null>(null);
  const [avgHumidity, setAvgHumidity] = useState<number | null>(null);
  const [avgMoisture, setAvgMoisture] = useState<number | null>(null);

  const fetchTemperature = async () => {
      const response = await fetch("https://seashell-app-7hlnd.ondigitalocean.app/getTemperature");
      if (!response.ok) {
        throw new Error('Failed to fetch temperature');
      }
      const temperature: number = await response.json();
      setTemperature(temperature);
  };

  const fetchHumidity = async () => {
      const response = await fetch("https://seashell-app-7hlnd.ondigitalocean.app/getHumidity");
      if (!response.ok) {
        throw new Error("Failed to fetch humidity");
      }
      const humidity: number = await response.json();
      setHumidity(humidity);
  };

  const fetchMoisture = async () => {
    const response = await fetch("https://seashell-app-7hlnd.ondigitalocean.app/getMoisture");
    if (!response.ok) {
      throw new Error("Failed to fetch moisture");
    }
    const moisture: number = await response.json();
    setMoisture(moisture);
};

const fetchAverageData  =async () => {
  const response = await fetch("https://seashell-app-7hlnd.ondigitalocean.app/getAverageData")
  if(!response.ok) {
    throw new Error("Failed to fetch averageData")
  }
  const avgData: {temperature: number, humidity: number, moisture: number}
  = await response.json();
  setAvgTemperature(avgData.temperature);
  setAvgHumidity(avgData.humidity);
  setAvgMoisture(avgData.moisture);
}

  useEffect(() => {
    const fetchData = async () => {
      await fetchTemperature();
      await fetchHumidity();
      await fetchMoisture();
      await fetchAverageData();
    };
    fetchData();
    const intervalid = setInterval(fetchData,30000);
    return () => clearInterval(intervalid);
    },[]);

    const displayValue = (value: number | null) => {
      return value !== null ? value : 'N/A';
    };

    return (
      <div className="container">
        <div className="data-section">
          <div className='data-box'>
            <h2 className='title'>Tomato greenhouse data:</h2>
            <h4 className='title'>optimal tempature = 16-27°C <br /><br />
              optimal humidity = 65-85% <br /><br />  
              optimal soil moisture = 40-80%
            </h4>
            <p>(if anything blinks, it means trouble.)</p>
         </div>
          <div id="temperature">
            <p style = {{color:'orange'}}>
              Temperature: {displayValue(temperature)} °C
              <img
                src={tempatureGif}
                alt="temperature"
                className={temperature && (temperature < 16 || temperature > 27) ? 'blink' : ''}
                style={{width: '50px', height: '50px' }}
              />
            </p>
          </div>
          <div id="humidity">
            <p style = {{color:'blue'}}>
              Humidity: {displayValue(humidity)} %
              <img
                src={humidityGif}
                alt="humidity"
                className={humidity && (humidity < 65 || humidity > 85) ? 'blink' : ''}
                style={{width: '70px', height: '70px' }}
              />
            </p>
          </div>
          <div id="moisture">
            <p style = {{color:'green'}}>
              Soil moisture: {displayValue(moisture)} %
              <img
                src={moistureGif}
                alt="moisture"
                className={moisture && (moisture < 40) ? 'blink' : ''}
                style={{width: '60px', height: '60px' }}
              />
            </p>
          </div>
          <div id = "averageData">
            <h2>7 days average:</h2>            
              <p style = {{color:'orange'}}> Temperature: {displayValue(avgTemperature)} °C </p>  
              <p style = {{color:'blue'}}>  Humidity: {displayValue(avgHumidity)} % </p> 
              <p style = {{color:'green'}}>  Soil moistue: {displayValue(avgMoisture)} %</p>      
          </div>
        </div>
        <img id="tomato" src={tomato} alt="tomato" />
      </div>
    );
  };

export default TemperatureHumidityMoistureFetcher;
