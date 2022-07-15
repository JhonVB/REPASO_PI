const { Router } = require("express");
const {
  getInfo,
  newCharacter,
  getEpisodes,
  getById,
} = require("../Controller/routeCh");

const router = Router();

// Configurar los routers

router.get("/characters", getInfo);
router.post("/character", newCharacter);
router.get("/episodes", getEpisodes);
router.get("/character/:id", getById);
module.exports = router;
