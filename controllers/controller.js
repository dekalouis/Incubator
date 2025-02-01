const { Incubator } = require("../models");

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
      res.send(`This is the incubator form`);
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }
  static async addIncubator(req, res) {
    try {
      res.send(`This is formnya`);
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }
  static async incubatorDetails(req, res) {
    try {
      res.send(`Incubator detailsnya`);
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }
  static async addStartUpForm(req, res) {
    try {
      res.send(`form add startup`);
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }
  static async addStartUp(req, res) {
    try {
      res.send(`add startup`);
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }
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
