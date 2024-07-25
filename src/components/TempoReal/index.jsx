/* eslint-disable react/prop-types */

import "./tempo_real.css";

import TempoFuturo from "../TempoFuturo";

const TempoReal = ({ tempo }) => {
  return (
    <>
      <div className="tempo-container">
        <h2>{tempo.name}</h2>
        <div className="tempo-info">
          <img
            src={`http://openweathermap.org/img/wn/${tempo.weather[0].icon}.png`}
          />
          <p className="tempo-temp">{Math.round(tempo.main.temp)}°C</p>
        </div>
        <p className="tempo-desc">{tempo.weather[0].description}</p>
        <div className="tempo-detalhes">
          <p>Sensação térmica: {Math.round(tempo.main.feels_like)}°C</p>
          <p>Umidade: {tempo.main.humidity}%</p>
          <p>Pressão: {tempo.main.pressure}</p>
        </div>
      </div>

      <TempoFuturo/>
    </>
  );
};

export default TempoReal;
