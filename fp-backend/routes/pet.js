const express = require("express");
const router = express.Router();

const upload = require("../middlewares/upload");
const middleware = require("../middlewares/auth");
const petController = require("../controllers/pet");

// middleware
router.use(middleware.autherizeAll);

router.post("", middleware.authBreeder, petController.createPet);
router.get("", petController.getAllPets);

router.get("/:id", petController.getSinglePet);
router.put("/:id", middleware.authBreeder, petController.updatePet);
router.patch(
  "/:id",
  middleware.authBreeder,
  upload.single("img"),
  petController.patchImage
);
router.delete("/:id", middleware.authBreeder, petController.deletePet);

router.post(
  "/:pet_id/adoption-request",
  middleware.authBuyer,
  petController.addRequest
);

router.delete(
  "/:pet_id/adoption-request/:request_id",
  middleware.authBuyer,
  petController.removeRequest
);
module.exports = router;
