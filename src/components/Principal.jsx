import { useState } from 'react'
import { dados } from '../assets/clubes'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

function Principal() {
  const [clubeSelecionado, setClubeSelecionado] = useState(null);
  const { register, watch, reset } = useForm();
  const [resultado, setResultado] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("clube")) {
      reset({ rbClube: localStorage.getItem("clube") });
    }
  }, []);

  useEffect(() => {
    if (watch("rbClube")) {
      localStorage.setItem("clube", watch("rbClube"));
    }
  }, [watch("rbClube")]);

  const handleClick = () => {
    const palmeiras = dados.find((time) => time.id === 1);
    if (palmeiras && clubeSelecionado && clubeSelecionado.id === 1) {
      setResultado("Parabéns! Você ganhou a aposta.");
    } else {
      setResultado("Que pena! Você não ganhou a aposta.");
    }
  };

  const listaClubes = dados.map((clube) => (
    <div className="form-check" key={clube.id}>
      <input
        className="form-check-input"
        type="radio"
        name="rbClube"
        {...register("rbClube")}
        value={clube.url}
        onClick={() => setClubeSelecionado(clube)}
      />
      <label className="form-check-label">
        {clube.nome}
      </label>
    </div>
  ));

  return (
    <div className="container" style={{ height: 520 }}>
      <h2 className="mt-4">Qual clube será Campeão Brasileiro?</h2>
      <form>
        {listaClubes}
      </form>
      {clubeSelecionado &&
        <div>
          <h6 className='mt-3'>Você selecionou:</h6>
          <img src={clubeSelecionado.url} alt="Logo do Clube" width={140} />
        </div>
      }
      <button onClick={handleClick} className="btn btn-primary mt-3">Apostar</button>
      {resultado &&
        <div className="alert alert-info mt-3" role="alert">
          {resultado}
        </div>
      }
    </div>
  );
}

export default Principal;