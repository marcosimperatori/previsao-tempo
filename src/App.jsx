import { useRef, useState } from "react";
import "./App.css";
import axios from "axios";
import TempoReal from "./components/TempoReal";

function App() {
  const [tempo, setTempo] = useState();
  const [erro, setErro] = useState(null);

  const nomeCidade = useRef(null);

  async function buscarCidade() {
    const qCidade = nomeCidade.current.value;
    const key = "ae593ae8de1041da33887e261615a302";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${qCidade}&appid=${key}&lang=pt_br&units=metric`;

    //resetar erro antes de cada chamada a api
    setErro("");
    setTempo(null);

    try {
      const resultado = await axios.get(url);

      if (resultado.data.cod === 200) {
        setTempo(resultado.data);
      } else {
        setErro("Erro ao buscar previsão do tempo para a cidade pesquisada!");
      }
    } catch (error) {
      setErro(`Erro ao buscar previsão do tempo para a cidade pesquisada (${qCidade})!`);
      console.log(error.response.data)
    }
  }

  return (
    <div className="container">
      <h1>Serviço de previsão do tempo</h1>
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
    </div>
  );
}

export default App;
