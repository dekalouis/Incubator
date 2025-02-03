const { formatDate } = require("../helpers/formatDate");
const { formatRupiah } = require("../helpers/formatRupiah");
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
      const { message } = req.query;

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
        message,
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

      //! ERRORNYA
      const errors = req.query.errors ? req.query.errors.split(",") : [];

      const { incubatorid } = req.params;
      const incubator = await Incubator.findByPk(incubatorid);
      const degrees = ["SMA", "S1", "S2", "S3"];
      const roles = ["Hacker", "Hipster", "Hustler"];

      res.render("addStartup", { incubator, degrees, roles, errors });
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

      const checkValuation = valuation ? +valuation : 0;

      const newStartup = await StartUp.create({
        startUpName,
        founderName,
        dateFound,
        educationOfFounder,
        roleOfFounder,
        IncubatorId: incubatorid,
        valuation: checkValuation,
      });
      console.log(newStartup);
      res.redirect(`/incubators/${incubatorid}`);
    } catch (err) {
      //! EROR BARYU

      const { incubatorid } = req.params;
      console.log(err);
      if (err.name === "SequelizeValidationError") {
        err = err.errors.map((el) => el.message);
      }
      res.redirect(
        `/incubators/${incubatorid}/startUp/add?errors=${err.join(",")}`
      );
      //   console.error(error);
      //   res.send(error);
    }
  }

  //* UDH BISA
  static async editStartUpForm(req, res) {
    try {
      //   res.send(`edit startup form`);
      //   res.send(req.params);
      //http://localhost:3000/incubators/10/startUp/13/edit
      //?   {
      //?     "incubatorid": "10",
      //?     "startUp": "13"
      //?     }
      //! ERRORNYA
      const errors = req.query.errors ? req.query.errors.split(",") : [];

      const { incubatorid, startUp: startupid } = req.params;
      const incubator = await Incubator.findByPk(incubatorid);
      const startup = await StartUp.findByPk(startupid);

      const degrees = ["SMA", "S1", "S2", "S3"];
      const roles = ["Hacker", "Hipster", "Hustler"];

      //   console.log(startup);
      //   res.send(startup);
      res.render("editStartup", {
        startup,
        incubator,
        degrees,
        roles,
        formatDate,
        errors,
      });
    } catch (error) {
      console.error(error);
      res.send(error);
    }
  }
  static async editStartUp(req, res) {
    try {
      //   res.send(`edit startup `);
      //   console.log(req.params);
      const { incubatorid, startUp: startupid } = req.params;
      //   console.log(req.body);

      const {
        startUpName,
        founderName,
        dateFound,
        educationOfFounder,
        roleOfFounder,
        valuation,
      } = req.body;

      const checkValuation = valuation ? +valuation : 0;
      //   console.log(valuation, checkValuation);
      await StartUp.update(
        {
          startUpName,
          founderName,
          dateFound,
          educationOfFounder,
          roleOfFounder,
          valuation: checkValuation,
        },
        {
          where: {
            id: startupid,
          },
        }
      );

      res.redirect(`/incubators/${incubatorid}`);
    } catch (err) {
      //!ERROR BARU

      const { incubatorid, startUp: startupid } = req.params;

      if (err.name === "SequelizeValidationError") {
        err = err.errors.map((el) => el.message);
      }
      res.redirect(
        `/incubators/${incubatorid}/startUp/${startupid}/edit?errors=${err.join(
          ","
        )}`
      );
      //   console.error(error);
      //   res.send(error);
    }
  }

  static async deleteStartUp(req, res) {
    try {
      //   res.send(`delete startupnya`);
      const { incubatorid, startUp: startupid } = req.params;

      //   const incubator = await Incubator.findByPk(incubatorid);
      const startupToDelete = await StartUp.findByPk(startupid);

      const { startUpName, founderName } = startupToDelete;
      await startupToDelete.destroy();
      const message = `Startup ${startUpName} with ${founderName} as founder has been removed!`;

      //   res.redirect(`/incubators/${incubatorid}`);
      res.redirect(`/incubators/${incubatorid}?message=${message}`);
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  //! SISA INIIIII
  static async startUpList(req, res) {
    try {
      //   res.send(`list startupnya`);
      const incubators = await Incubator.findAll();

      const { role } = req.query;
      //   console.log(req.query);
      const startups = await StartUp.startUpFilterData(role);
      //   console.log(startups);
      const roles = ["Hustler", "Hipster", "Hacker"];
      res.render("startUp", {
        startups,
        roles,
        selectedRole: role,
        formatRupiah,
      });
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }
}
module.exports = Controller;
