import React from "react";
import Cards from "../../components/Cards/Cards";
import Nav from "../../components/Nav/Nav";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCharacters, getEpisodes } from "../../redux/actions";
import { Link } from "react-router-dom";
function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCharacters());
    dispatch(getEpisodes());
  }, [dispatch]);
  //   console.log(allCharacters);

  const allCharacters = useSelector((state) => state.characters);
  const [currentPage, setCurrentPage] = useState(1); // tenemos

  //   const [characterPage, setCharacterPage] = useState(25);
  const cantidadPorPagina = 25;
  const indiceUno = currentPage * cantidadPorPagina;
  const ultimoIndice = indiceUno - cantidadPorPagina;
  const totalCharacterPage = allCharacters.slice(ultimoIndice, indiceUno);

  let numeroDePaginas = [];
  for (
    let i = 1;
    i <= Math.ceil(allCharacters.length / cantidadPorPagina);
    i++
  ) {
    numeroDePaginas.push(i);
  }

  const paginas = (number) => {
    setCurrentPage(number);
  };

  return (
    <div>
      <Link to="/formulario">
        <button>Crear Personaje</button>
      </Link>
      {numeroDePaginas &&
        numeroDePaginas.map((num, i) => {
          return num !== currentPage ? (
            <button key={i} onClick={() => paginas(num)}>
              {num}
            </button>
          ) : (
            <button key={i} onClick={() => paginas(num)}>
              {num}
            </button>
          );
        })}
      <Cards characters={totalCharacterPage} />
    </div>
  );
}

export default Home;
