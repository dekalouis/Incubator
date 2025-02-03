const router = require("express").Router();
const Controller = require("../controllers/controller");

router.get("/", Controller.incubatorList);
router.get("/incubators", Controller.incubatorList);

router.get("/incubators/add", Controller.addIncubatorForm);
router.post("/incubators/add", Controller.addIncubator);

router.get("/incubators/:incubatorid", Controller.incubatorDetails);

router.get("/incubators/:incubatorid/startUp/add", Controller.addStartUpForm);
router.post("/incubators/:incubatorid/startUp/add", Controller.addStartUp);

//! kerjain
router.get(
  "/incubators/:incubatorid/startUp/:startUp/edit",
  Controller.editStartUpForm
);
router.post(
  "/incubators/:incubatorid/startUp/:startUp/edit",
  Controller.editStartUp
);

router.get(
  "/incubators/:incubatorid/startUp/:startUp/delete",
  Controller.deleteStartUp
);

router.get("/startUp", Controller.startUpList);

module.exports = router;
