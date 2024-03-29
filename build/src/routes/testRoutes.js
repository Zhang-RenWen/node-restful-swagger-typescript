"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routes = void 0;
const testController_1 = require("../controllers/testController");
const mysql = require("mysql2");
//create connection to database
const db = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    port: process.env.MYSQL_PORT,
    database: process.env.MYSQL_DB,
});
class Routes {
    constructor() {
        this.testController = new testController_1.TestController();
    }
    routes(app) {
        app.route("/add").get((req, res) => {
            db.query("INSERT INTO new_table (idnew_table, new_tablecol) VALUES (111, 222)", (err, result) => {
                if (err) {
                    res.status(200).send({
                        message: `error:${err}`,
                    });
                }
                else {
                    res.status(200).send({
                        message: `got it:${result}`,
                    });
                }
            });
        });
        app.route("/new_table").get((req, res) => {
            db.query("SELECT * FROM new_table", (err, result) => {
                if (err) {
                    res.status(200).send({
                        message: `error:${err}`,
                    });
                }
                else {
                    res.status(200).send({
                        message: `got it:${result}`,
                    });
                }
            });
        });
        // Test
        app
            .route("/contact")
            //   .get((req: Request, res: Response, next: NextFunction) => {
            //     // middleware
            //     console.log(`Request from: ${req.originalUrl}`)
            //     console.log(`Request type: ${req.method}`)
            //     if (req.query.key !== '78942ef2c1c98bf10fca09c808d718fa3734703e') {
            //       res.status(401).send('You shall not pass!')
            //     } else {
            //       next()
            //     }
            //   }, this.testController.getTests)
            // POST endpoint
            .post(this.testController.addNewTest);
        // Test detail
        app
            .route("/contact/:contactId")
            // get specific contact
            .get(this.testController.getTestWithID)
            .put(this.testController.updateTest)
            .delete(this.testController.deleteTest);
        app.get("/reviews", (req, res) => {
            console.log(db);
            db.query("SELECT * FROM new_table", (err, result) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.send(result);
                }
            });
        });
    }
}
exports.Routes = Routes;
