import express from 'express'
import mysql from 'mysql'
import cors from 'cors'


const app =express()

const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    database:"myscheme"
})

// to send from html body
app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
    res.json("Hello World")
})

app.get("/note",(req,res)=>{
    const q="SELECT * FROM myexpense"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.post("/note",(req,res)=>{
    const q ="INSERT INTO myexpense (`date`,`category`,`payee`,`desc`,`amount`,`total`,`note`) VALUES (?)";
    // const values=["title from backend","desc from backend","cover pic from backend"];
    const values=[
        req.body.date,
        req.body.category,
        req.body.payee,
        req.body.desc,
        req.body.amount,
        req.body.total,
        req.body.note
    ]
    db.query(q,[values],(err,data)=>{
        if(err) return res.json(err)
        return res.json("Expense has been added.")
    })

})

app.delete("/note/:id", (req,res)=>{
    const bookId=req.params.id;
    const q="DELETE FROM myexpense WHERE id=?"

    db.query(q,[bookId],(err,data)=>{
        if(err) return res.json(err)
        return res.json("Expense has been deleted.")
    })
})

app.put("/note/:sno", (req,res)=>{
    const bookId=req.params.sno;
    const q="UPDATE myexpense SET `date`=?,`category`=?,`payee`=?,`desc`=?,`amount`=?,`total`=?,`note`=? WHERE sno=?"
    const values=[
       req.body.date,
        req.body.category,
        req.body.payee,
        req.body.desc,
        req.body.amount,
        req.body.total,
        req.body.note
    ]
    db.query(q,[...values, bookId],(err,data)=>{
        if(err) return res.json(err)
        return res.json("note has been updated.")
    })
})

app.listen(8800,()=>{
    console.log("Connect to backend.")
})