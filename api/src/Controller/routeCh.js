const { uploadEpisodes, allCharacters } = require("../Services");
const { Episode, Character } = require("../db");

const getInfo = async (req, res) => {
  try {
    const info = await allCharacters();
    res.send(info);
  } catch (error) {
    res.send(error);
  }
};

const newCharacter = async (req, res) => {
  try {
    const { name, species, origin, image, episode } = req.body;

    const newCharacter = await Character.create({
      name,
      species,
      origin,
      image,
      episode,
    });

    const ids = episode.map((e) => e.id);
    console.log(ids);

    const newEpisode = await Episode.findAll({
      where: { id: ids },
      attribute: ["name"],
    });

    await newCharacter.addEpisode(newEpisode);
    res.send(newCharacter);
  } catch (error) {
    res.status(406).send("No se pudo");
  }
};

const getEpisodes = async (req, res) => {
  try {
    //  console.log(results);
    const episodes = await uploadEpisodes();
    console.log(episodes);
    res.send(episodes);
  } catch (error) {
    return error;
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const info = await allCharacters();
    const characterId = info.find((e) => e.id == id);
    characterId ? res.send(characterId) : res.send("No existe");
  } catch (error) {
    res.send(error);
  }
};

module.exports = {
  getInfo,
  newCharacter,
  getEpisodes,
  getById,
};
