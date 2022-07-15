import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getCharacter } from "../../redux/actions";

function Detalle() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const characters = useSelector((state) => state.characters);
  const character = characters.find((character) => character.id == id);

  useEffect(() => {
    //  return () => {
    //    second;
    //  };
    dispatch(getCharacter(character));
  }, [dispatch]);

  return (
    <div>
      <p>{character.name}</p>
      <img src={character.image} alt="" />
      <p>{character.origin}</p>
      <p>{character.species}</p>
      {character.episodes?.map((episodes) => {
        return <p key={episodes.id}>{episodes.name}</p>;
      })}
    </div>
  );
}

export default Detalle;
