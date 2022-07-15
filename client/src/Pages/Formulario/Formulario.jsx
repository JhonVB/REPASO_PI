import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getEpisodes } from "../../redux/actions";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Formulario() {
  const dispatch = useDispatch();
  const episodes = useSelector((state) => state.episodes);
  const errors = useState({});

  useEffect(() => {
    dispatch(getEpisodes());
  }, [dispatch]);

  const [character, setCharacter] = useState({
    name: "",
    image: "",
    origin: "",
    species: "",
    episodes: [],
  });

  const handelChange = (e) => {
    setCharacter({ ...character, [e.target.name]: e.target.value });
  };

  const handelCheked = (e) => {
    const id = e.target.id;
    const nombre = e.target.value;

    if (e.target.checked) {
      const obj = { name: nombre, id };
      setCharacter({
        ...character,
        [e.target.name]: [...character.episodes, obj],
      });
    } else {
      const nuevo = character.episodes.filter((e) => e.id !== id);
      setCharacter({
        ...character,
        [e.target.name]: nuevo,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <form>
        <Link to="/home">
          <button>AL HOME</button>
        </Link>
        <p>NAME:</p>
        <input type="text" name="name" onChange={(e) => handelChange(e)} />

        <p>IMAGE:</p>
        <input type="text" name="image" onChange={(e) => handelChange(e)} />

        <p>ORIGIN:</p>
        <input type="text" name="origin" onChange={(e) => handelChange(e)} />
        <p>SPECIES:</p>
        <input type="text" name="species" onChange={(e) => handelChange(e)} />

        {episodes.map((e) => {
          return (
            <p key={e.id}>
              <input
                type="checkbox"
                value={e.name}
                name="episodes"
                id={e.id}
                onChange={(e) => handelCheked(e)}
              />
              {e.name}
            </p>
          );
        })}

        <input type="submit" value="Submit" onClick={(e) => handleSubmit(e)} />
      </form>
    </div>
  );
}

export default Formulario;
