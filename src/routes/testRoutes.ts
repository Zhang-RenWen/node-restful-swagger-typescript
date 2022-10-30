import { Request, Response, NextFunction } from 'express'
import { TestController } from '../controllers/testController'

export class Routes {
  public testController: TestController = new TestController()

  public routes(app): void {
    app.route('/').get((req: Request, res: Response) => {
      res.status(200).send({
        message: 'GET request successfully!!!!'
      })
    })

    // Test
    app
      .route('/contact')
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
      .post(this.testController.addNewTest)

    // Test detail
    app
      .route('/contact/:contactId')
      // get specific contact
      .get(this.testController.getTestWithID)
      .put(this.testController.updateTest)
      .delete(this.testController.deleteTest)
  }
}
