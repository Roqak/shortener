const express = require('express')
const Router = express.Router()
const randomString = require('random-string');
const url = require('../Model/Url');
// const x = randomString({length: 5});
Router.get('/',(req,res)=>{
    res.render("home")
})

Router.get('/:url',(req,res)=>{
    // res.send(req.params.url)
    // console.log(`https://www.${req.params.url}`)
        url.find({shortUrl:req.params.url})
        .then(result=>{
            // res.send(result)
            if(result.length < 1){
                res.send("url not found")
            }else{
                res.redirect(`http://www.${result[0].url}`)
            }
        })
        .catch(err=>{
            console.log(err)
        })          
       
    // res.redirect(`http://www.${req.params.url}`)
})
Router.get('/s/:url',(req,res)=>{
    const newUrl = new url({
        url : req.params.url,
        shortUrl: randomString({length: 6}).toLowerCase()
    })
    // res.send(randomString({length: 6}).toLowerCase())
    newUrl.save()
    .then(result=>{
        res.send(result)
    })
    .catch(err=>{
        res.send(err)
    })
})
Router.get('/s/:userString/:url',(req,res)=>{
    const newUrl = new url({
        url : req.params.url,
        shortUrl: req.params.userString
    })
    // res.send(randomString({length: 6}).toLowerCase())
    newUrl.save()
    .then(result=>{
        res.send(result)
    })
    .catch(err=>{
        res.send(err)
    })
    // res.send(`${req.params.userString} ${req.params.url}`)
})








module.exports = Router;