const formatRupiah = require("../helpers/formatRupiah");
const { Incubator, StartUp } = require("../models");

class Controller {
  static async incubatorList(req, res) {
    try {
      //   res.send(`This is the incubator list`);
      const incubators = await Incubator.findAll();
      //   res.send(incubators);
      res.render("home", { incubators });
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }
  static async addIncubatorForm(req, res) {
    try {
      //   res.send(`This is the incubator form`);
      const levels = ["International", "National", "Province"];
      res.render("addIncubator", { levels });
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }
  static async addIncubator(req, res) {
    try {
      //   res.send(`This is formnya`);
      const { name, location, level } = req.body;
      const newIncubator = await Incubator.create({
        name,
        location,
        level,
      });
      //   console.log(newIncubator);
      res.redirect("/");
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }
  static async incubatorDetails(req, res) {
    try {
      //   res.send(`Incubator detailsnya`);
      const { incubatorid } = req.params;
      const incubator = await Incubator.findByPk(incubatorid);
      const startups = await StartUp.findAll({
        where: { IncubatorId: incubatorid },
      });

      const totalValuation = startups.reduce((sum, startup) => {
        return sum + startup.valuation;
      }, 0);
      //   console.log(incubator)
      //   console.log(startups);
      //   console.log("nyoba format", formatRupiah(1000000));
      //   console.log(totalValuation, formatRupiah);
      res.render("incubatorDetails", {
        incubator,
        startups,
        totalValuation,
        formatRupiah,
      });
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  //*WORKS
  static async addStartUpForm(req, res) {
    try {
      //   res.send(`form add startup`);
      const { incubatorid } = req.params;
      const incubator = await Incubator.findByPk(incubatorid);
      const degrees = ["SMA", "S1", "S2", "S3"];
      const roles = ["Hacker", "Hipster", "Hustler"];

      res.render("addStartup", { incubator, degrees, roles });
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  static async addStartUp(req, res) {
    try {
      //   res.send(`add startup`);
      const { incubatorid } = req.params;
      const {
        startUpName,
        founderName,
        dateFound,
        educationOfFounder,
        roleOfFounder,
        valuation,
      } = req.body;
      //   console.log(req.body);
      const newStartup = await StartUp.create({
        startUpName,
        founderName,
        dateFound,
        educationOfFounder,
        roleOfFounder,
        IncubatorId: incubatorid,
        valuation,
      });
      console.log(newStartup);
      res.redirect(`/incubators/${incubatorid}`);
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  //! WORK ON THIS AFTER YA
  static async editStartUpForm(req, res) {
    try {
      res.send(`edit startup form`);
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }
  static async editStartUp(req, res) {
    try {
      res.send(`edit startup `);
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  static async deleteStartUp(req, res) {
    try {
      res.send(`delete startupnya`);
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }
  static async startUpList(req, res) {
    try {
      res.send(`list startupnya`);
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }
}
module.exports = Controller;
