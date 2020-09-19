const express = require('express');
const {seller, ratings, goods} = require('./data.json');

let app = express();

const router = express.Router();

router.get('/seller', (req, res)=> {
    res.json({
        errno: 0,
        data: seller
    })
})

router.get('/ratings', (req, res)=> {
    res.json({
        errno: 0,
        data: ratings
    })
})

router.get('/goods', (req, res)=> {
    res.json({
        errno: 0,
        data: goods
    })
})

app.use('/api', router)
app.use(express.static('./dist'))

app.listen(2889, (err)=> {
    if(err) {
        console.log(err);
        return;
    }
    console.log('listening at http://localhost:2889' + '\n');
})
