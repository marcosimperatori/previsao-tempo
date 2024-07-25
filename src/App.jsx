import { useEffect, useRef, useState } from "react";
import "./App.css";
import axios from "axios";
import TempoReal from "./components/TempoReal";

function App() {
  const [tempo, setTempo] = useState();

  const nomeCidade = useRef();

  async function buscarCidade() {
    const qCidade = nomeCidade.current.value;
    const key = "ae593ae8de1041da33887e261615a302";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${qCidade}&appid=${key}&lang=pt_br&units=metric`;

    const resultado = await axios.get(url);
    setTempo(resultado.data);
  }

  return (
    <div className="container">
      <h1>Serviço de previsão do tempo</h1>
      <input ref={nomeCidade} type="text" name="cidade" id="cidade" />
      <button onClick={buscarCidade}>Buscar</button>
      {tempo && <TempoReal tempo={tempo} />}
    </div>
  );
}

export default App;
