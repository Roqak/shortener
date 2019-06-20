const express = require('express')
const Router = express.Router()
const randomString = require('random-string');
const url = require('../Model/Url');
let finalurl = "";
const checkForHTTPS = (url)=>{
    let splitted = url.split("//");
    console.log(splitted);
    if(splitted[0] == "https:" || splitted[0] == "http:"){
        finalurl = splitted[1];
        // tempurl = finalurl.split("")
        // finalurl = finalurl[0]
        console.log(true)
    }else{
        finalurl = url;
        console.log(false)
    }
    // console.log(`url: ${finalurl}`)
    return finalurl;
}
// const x = randomString({length: 5});
Router.get('/',(req,res)=>{
    res.render("home")
})
// console.log("http".equals("https"))
Router.get('/:url',(req,res)=>{
    // res.send(req.params.url)
    // console.log(`https://www.${req.params.url}`)
    let conn = "";
        url.find({shortUrl:req.params.url})
        .then(result=>{
            // res.send(result)
            if(result.length < 1){
                res.send("url not found")
            }else{
                if(result[0].url.startsWith('www.')){
                    conn = result[0].url.slice(4);
                    // console.log(`conn: ${result[0].url.startsWith('www.')}`)
                }else{
                    conn = result[0].url
                    // console.log(`conn: ${result[0].url.startsWith('www.')}`)

                }
                // res.send(conn)
                res.redirect(`http://${conn}`)
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

Router.post('/s',(req,res)=>{
    checkForHTTPS(req.body.url);
    // let splitted = req.body.url.split("//");
    // console.log(splitted);
    // if(splitted[0] == "https:" || splitted[0] == "http:"){
    //     finalurl = splitted[1];
    //     console.log(true)
    // }else{
    //     finalurl = req.body.url;
    //     console.log(false)
    // }
    // console.log(`url: ${finalurl}`)
    const newUrl = new url({
        url : checkForHTTPS(req.body.url),
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

Router.get('/delete/:id',(req,res)=>{
    url.findByIdAndDelete(req.params.id)
    .then(result=>{
        res.json(result)
    })
    .catch(error=>{
        res.json(error)
    })
})
Router.get('/find/all',(req,res)=>{
    url.find()
    .then(result=>{
        res.json(result)
    })
    .catch(error=>{
        res.json(error)
    })
})







module.exports = Router;