import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getEpisodes } from "../../redux/actions";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createCharacter } from "../../redux/actions";

function validate(character) {
  let error = {};

  if (!character.name) {
    error.name = "Name is required";
  } else if (!/[a-zA-Z ]{2,254}/.test(character.name)) {
    error.name = "Name is invalid";
  }

  if (!character.image) {
    error.image = "Image is required";
  } else if (
    !/(?:(?:https?:\/\/))[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b(?:[-a-zA-Z0-9@:%_\+.~#?&\/=]*(\.jpg|\.png|\.jpeg|\.webp))/.test(
      character.image
    )
  ) {
    error.image = "Igrese una URL de imagen valida ";
  }

  if (!character.origin) {
    error.origin = "Origin is required";
  } else if (!/[a-zA-Z ]{2,254}/.test(character.origin)) {
    error.origin = "Origin is invalid";
  }

  if (!character.species) {
    error.species = "species is required";
  } else if (!/[a-zA-Z ]{2,254}/.test(character.species)) {
    error.species = "species is invalid";
  }

  if (!character.episode) {
    error.episode = "Necesitas agregas al menos un episodio";
  }

  return error;
}

function Formulario() {
  const dispatch = useDispatch();
  const navegador = useNavigate();
  const episode = useSelector((state) => state.episodes);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(getEpisodes());
  }, [dispatch]);

  const [character, setCharacter] = useState({
    name: "",
    image: "",
    origin: "",
    species: "",
    episode: [],
  });

  console.log(character);
  const handelChange = (e) => {
    setCharacter({ ...character, [e.target.name]: e.target.value });
    let objError = validate({ ...character, [e.target.name]: e.target.value });
    setErrors(objError);
  };

  const handelCheked = (e) => {
    const id = e.target.id;
    const nombre = e.target.value;

    if (e.target.checked) {
      const obj = { name: nombre, id };
      setCharacter({
        ...character,
        [e.target.name]: [...character.episode, obj],
      });
    } else {
      const nuevo = character.episode.filter((e) => e.id !== id);
      setCharacter({
        ...character,
        [e.target.name]: nuevo,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createCharacter(character));
    setCharacter({
      name: "",
      image: "",
      origin: "",
      species: "",
      episode: [],
    });
    alert("Formulario enviado");

    setTimeout(() => {
      navegador("/home");
    }, 1000);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Link to="/home">
          <button>AL HOME</button>
        </Link>
        <p>NAME:</p>
        <input type="text" name="name" onChange={handelChange} />
        {errors.name && <p>{errors.name}</p>}

        <p>IMAGE:</p>
        <input type="text" name="image" onChange={handelChange} />
        {errors.image && <p>{errors.image}</p>}

        <p>ORIGIN:</p>
        <input type="text" name="origin" onChange={handelChange} />
        {errors.origin && <p>{errors.origin}</p>}
        <p>SPECIES:</p>
        <input type="text" name="species" onChange={handelChange} />
        {errors.species && <p>{errors.species}</p>}

        <input type="submit" disabled={Object.keys(errors).length} />
        {errors.episodes && <p>{errors.episodes}</p>}
        {episode.map((e) => {
          return (
            <p key={e.id}>
              <input
                type="checkbox"
                value={e.name}
                name="episode"
                id={e.id}
                onChange={handelCheked}
              />
              {e.name}
            </p>
          );
        })}
      </form>
    </div>
  );
}

export default Formulario;
