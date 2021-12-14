import { Request, Response, Router } from "express";
import { db } from "../database";

const router = Router();

// CREATE NEW ORDER
router.post('/submit', (req:Request, res:Response) => {
	let {priority,name,deadline,comment} = req.body

    let error;

    if (!priority) error = "Priority is not Selected"
    else if (!deadline) error = "Deadline is empty!"
    else if (!name) error = "Name is empty!"
    else if (!comment) comment = "No comment.."

    if(error){
        return res.json({
            status: "error",
            message: error
        })
    }

	var sql ='INSERT INTO orders (name, priority, deadline, comment) VALUES (?,?,?,?)'
	var params =[name, priority.value, deadline, comment]

	db.run(sql, params, function (err, result) {
        if (err){
			console.log(err);
            res.status(400).json({
                status: "error",
                "error": err.message
            })
            return;
        }
        res.json({
            status: "ok",
            "message": "success",
            "data": {
				name: name
			},
            "id" : this.lastID
        })
    });
})

// DELETE ORDER
router.post("/delete", (req:Request, res:Response) => {
    const id = req.body.id

    if(!id){
        return res.json({
            status: "error",
            message: "Id is missing"
        })
    }

	var sql = "delete from orders where id="+id;
	var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({status: "ok", "error":err.message});
          return;
        }
        res.json({
            status: "ok",
            "message":"success",
            "data":rows
        })
      });
})

// EDIT ORDER
router.post("/edit", (req:Request, res:Response) => {
    let {priority,name,deadline,comment} = req.body[0]
    const id = req.body[1].id;

    let error;

    if (!priority) error = "Priority is not Selected"
    else if (!deadline) error = "Deadline is empty!"
    else if (!name) error = "Name is empty!"
    else if (!id) error = "Id is missing"
    else if (!comment) comment = "No comment.."

    if(error){
        return res.json({
            status: "error",
            message: error
        })
    }

	var sql = "update orders set name=?, priority=?, deadline=?, comment=? where id="+id;
	var params = [name, priority.value, deadline, comment]

    db.all(sql, params, (err, rows) => {   
        console.log(sql);
             
        if (err) {
            console.log(err);
            
          res.status(400).json({status: "error", "error":err.message});
          return;
        }
        res.json({
            status: "ok",
            "message":"success",
            "data":rows
        })
      });
})

// SELECT ALL ORDER
router.all("/orders", (req:Request, res:Response) => {
    var sql = "select * from orders"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
      });
});

export default router