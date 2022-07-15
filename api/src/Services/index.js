const axios = require("axios");
const { Character, Episode } = require("../db");

const infoApi = async () => {
  try {
    const arr = [];
    for (let i = 1; i < 43; i++) {
      arr.push(i);
    }

    const promises = arr.map((i) =>
      axios.get(`https://rickandmortyapi.com/api/character?page=${i}`)
    );

    const results = await Promise.all(promises);

    const characters = results.map((e) => {
      return e.data.results.map(async (i) => {
        const all = [];

        for (const link of i.episode) {
          const episodeId = link.split("/").pop();
          const episodes = await Episode.findByPk(episodeId);
          all.push({ name: episodes.toJSON().name, id: episodes.toJSON().id });
          console.log(episodes.toJSON().name);
        }
        //   const ids = i.episode.map(async (link) => {
        //     const episodeId = link.split("/").pop();
        //     const episodes = await Episode.findByPk(episodeId);
        //     all.push(episodes.toJSON().name);
        //   });

        return {
          id: i.id,
          name: i.name,
          species: i.species,
          origin: i.origin.name,
          image: i.image,
          created: i.created,
          episodes: all,
        };
      });
    });
    const todo = await Promise.all(characters.flat());
    return todo;
  } catch (error) {
    console.log(error);
  }
};

const infoDb = async () => {
  try {
    const characterDb = await Character.findAll({
      include: {
        model: Episode,
        attributes: ["name"],
        throught: {
          attributes: [],
        },
      },
    });
    return characterDb;
  } catch (error) {
    return error;
  }
};

const allCharacters = async () => {
  try {
    const charactersApi = await infoApi();
    const charactersDb = await infoDb();

    const allInfo = [...charactersApi, ...charactersDb];

    return allInfo;
  } catch (error) {
    return error;
  }
};

const uploadEpisodes = async () => {
  try {
    if (!(await Episode.findAll()).length) {
      const arr = [];
      for (let i = 1; i < 4; i++) {
        arr.push(i);
      }
      const promises = arr.map((i) =>
        axios.get(`https://rickandmortyapi.com/api/episode?page=${i}`)
      );
      const results = await Promise.all(promises);
      const episodes = results.map((e) => e.data.results).flat();
      await Episode.bulkCreate(episodes);
      // console.log(episodes);
      return episodes;
    } else {
      return await Episode.findAll();
    }
  } catch (error) {
    return error;
  }
};

module.exports = {
  infoApi,
  infoDb,
  uploadEpisodes,
  allCharacters,
};
