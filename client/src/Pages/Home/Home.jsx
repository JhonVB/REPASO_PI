import React from "react";
import Cards from "../../components/Cards/Cards";
import Nav from "../../components/Nav/Nav";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCharacters } from "../../redux/actions";
import { Link } from "react-router-dom";

function Home() {
  const dispatch = useDispatch();

  const allCharacters = useSelector((state) => state.characters);

  useEffect(() => {
    dispatch(getCharacters());
  }, [dispatch]);

  return (
    <div>
      <Link to="/formulario">
        <button>Crear Personaje</button>
      </Link>
      <Cards characters={allCharacters} />
    </div>
  );
}

export default Home;
