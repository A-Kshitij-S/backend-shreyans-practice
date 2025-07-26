const express = require("express")
const app= express()
const path= require("path")
const fs= require("fs")
const { log } = require("console")

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, "public")))
app.set("view engine", "ejs")

app.get("/", (req, res)=>{
    fs.readdir("./files", (err, files)=>{
        res.render("index", {files: files})  
    })
})

app.post("/create", function(req, res){
    fs.writeFile(`./files/${req.body.title.split(" ").join("")}.txt`, req.body.content, function(err){
        // console.log("error on file creation: ", err)
        res.redirect("/")
    })
})

app.get("/files/:title", (req, res)=>{
    fs.readFile(`./files/${req.params.title}`, "utf-8", function(err, fileData){
        res.render("show", {title: req.params.title, data: fileData})
    })
})

app.get("/edit/:title", (req, res)=>{
    res.render("edit",{prevTitle: req.params.title} )
})

app.post("/edit", function(req, res){
    fs.rename(`./files/${req.body.previousName}`, `./files/${req.body.newName}`, function(err){
        res.redirect("/")
    })
})

app.listen(3000, ()=>{
    console.log("app is working"); 
    
})