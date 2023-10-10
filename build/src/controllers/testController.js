"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestController = void 0;
// const Test = mongoose.model('Test', TestSchema);
class TestController {
    addNewTest(req, res) {
        // let newTest = new Test(req.body);
        // newTest.save((err, test) => {
        //     if(err){
        //         res.send(err);
        //     }
        //     res.json(test);
        // });
        res.json({ message: "Successfully added test!" });
    }
    getTests(req, res) {
        // Test.find({}, (err, test) => {
        //     if(err){
        //         res.send(err);
        //     }
        //     res.json(test);
        // });
        res.json({ message: "Successfully got tests!" });
    }
    getTestWithID(req, res) {
        // Test.findById(req.params.testId, (err, test) => {
        //     if(err){
        //         res.send(err);
        //     }
        //     res.json(test);
        // });
        res.json({ message: `Successfully got test with ID ${req}!` });
    }
    updateTest(req, res) {
        // Test.findOneAndUpdate({ _id: req.params.testId }, req.body, { new: true }, (err, test) => {
        //     if(err){
        //         res.send(err);
        //     }
        //     res.json(test);
        // });
        res.json({ message: "Successfully updated test!" });
    }
    deleteTest(req, res) {
        // Test.remove({ _id: req.params.testId }, (err, test) => {
        //     if(err){
        //         res.send(err);
        //     }
        //     res.json({ message: 'Successfully deleted test!'});
        // });
        res.json({ message: "Successfully deleted test!" });
    }
    test(req, res) {
        res.send({
            success: true,
            result: {},
            message: "資料讀取成功",
            req,
        });
        // app.get('/aowaow', (req, res) => {
        // const myNameRef = db.ref('/aowaow')
        // 快照
        // myNameRef.once('value', (snapshot) => {
        //   res.send({
        //     success: true,
        //     result: snapshot.val(),
        //     message: '資料讀取成功'
        //   })
        // })
        // })
        // app.get('/documents', (req, res) => {
        //   async function main() {
        //     // Use connect method to connect to the server
        //     await client.connect()
        //     console.log('Connected successfully to server')
        //     const db = client.db(dbName)
        //     const collection = db.collection('documents')
        //     const all = await collection.find({ a: 1 }).toArray()
        //     // console.log(await collection.createIndex())
        //     const ex = await collection.find({ a: 1 }).explain('executionStats')
        //     console.log(ex)
        //     res.send({
        //       success: true,
        //       result: all,
        //       message: '資料讀取成功'
        //     })
        //     return 'done.'
        //   }
        //   main()
        //     .then(console.log)
        //     .catch(console.error)
        //     .finally(() => client.close())
        // })
        // 新增邏輯
    }
}
exports.TestController = TestController;
