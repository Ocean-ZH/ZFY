const express = require('express');
const app = express();
let port = 8080;

app.use('/indie', express.static('./indie'));

app.get('/',(req,res)=>{
    res.redirect('/indie')
    // res.send('Hello World!');
});

app.listen(port,()=>{
    console.log(`Server is running at port ${port}!`);
})
