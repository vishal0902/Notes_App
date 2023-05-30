const app = require('express')()
const fs= require('fs')
const cors = require('cors')
const bodyParser = require('body-parser')



app.use(cors())
app.use(bodyParser.json())
function readData() {
    try {
        let data = fs.readFileSync('./Data/data.json').toString()
        let dataJson = JSON.parse(data)
        return dataJson
        
    } catch (error) {
        return []
    }
}

app.post('/note',(req,res)=>{
    console.log(req.body)
    const data = readData()
    data.push(req.body)
    fs.writeFileSync('./Data/data.json',JSON.stringify(data))
    res.end()
})


app.delete('/note/:title',(req,res)=>{
    const {title} = req.params
    const data = readData()
    const dataAfterDel = data.filter((d)=>d.title!==title)
    fs.writeFileSync('./Data/data.json',JSON.stringify(dataAfterDel))
   
    res.end()
})


app.get('/note',(req,res)=>{
    res.json(readData())
})




app.listen(5000,()=> console.log("Server listening on port 5000"))