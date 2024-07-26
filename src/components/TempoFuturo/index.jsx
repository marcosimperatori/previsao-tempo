/* eslint-disable react/prop-types */
import "./tempo_futuro.css";

const TempoFuturo = ({ nextDays }) => {
  let previsaoDiaria = {};

  for (let previsao of nextDays) {
    const date = new Date(previsao.dt * 1000).toLocaleDateString();

    if (!previsaoDiaria[date]) {
      previsaoDiaria[date] = previsao;
    }
  }

  const proximosDias = Object.values(previsaoDiaria).slice(1, 6);

  function converterData(date) {
    const newDate = new Date(date.dt * 1000).toLocaleDateString("pt-BR", {
      weekday: "long",
      day: "2-digit",
    });
    return newDate;
  }

  return (
    <div className="tfut-container">
      <h3>Previsão para os próximos 5 dias</h3>
      <div className="tfut-lista">
        {proximosDias.map((previsao) => (
          <div key={previsao.dt} className="tfut-item">
            <p>{converterData(previsao)}</p>
            <img
              src={`http://openweathermap.org/img/wn/${previsao.weather[0].icon}.png`}
            />
            <p>{previsao.weather[0].description}</p>
            <p>
              {Math.round(previsao.main.temp_min)}°C min. /{" "}
              {Math.round(previsao.main.temp_min)}°C máx.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TempoFuturo;
