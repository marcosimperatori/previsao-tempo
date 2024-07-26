import { useRef, useState } from "react";
import "./App.css";
import axios from "axios";
import TempoReal from "./components/TempoReal";
import TempoFuturo from "./components/TempoFuturo";

function App() {
  const [tempo, setTempo] = useState();
  const [proximos, setProximos] = useState();
  const [erro, setErro] = useState(null);
  const nomeCidade = useRef(null);

  async function buscarCidade() {
    const qCidade = nomeCidade.current.value;
    const key = "ae593ae8de1041da33887e261615a302";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${qCidade}&appid=${key}&lang=pt_br&units=metric`;
    const urlProximos = `https://api.openweathermap.org/data/2.5/forecast?q=${qCidade}&appid=${key}&lang=pt_br&units=metric`;

    setErro("");
    setTempo(null);
    setProximos(null);

    try {
      const { data } = await axios.get(url);
      const result = await axios.get(urlProximos);

      if (data.cod === 200) {
        setTempo(data);
        setProximos(result.data.list);
      } else {
        setErro("Não foi possível encontrar os dados da cidade informada.");
      }
    } catch (error) {
      setErro("Não foi possível encontrar os dados da cidade informada.");
    }
  }

  return (
    <div className="container">
      <h1>Previsão do tempo</h1>
      <input ref={nomeCidade} type="text" name="cidade" id="cidade" />
      <button onClick={buscarCidade}>Buscar</button>
      {erro && (
        <div
          style={{
            backgroundColor: "#e68181",
            color: "white",
            padding: "10px",
            marginTop: "20px",
            borderRadius: "20px",
          }}
        >
          {erro}
        </div>
      )}
      {tempo && <TempoReal tempo={tempo} />}
      {proximos && <TempoFuturo nextDays={proximos} />}
    </div>
  );
}

export default App;
