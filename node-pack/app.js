const express = require('express');
const app = express();
const port = 8880;

app.use('/indie', express.static('./indie'));

app.get('/',(req,res)=>{
    res.redirect('/indie')
    // res.send('Hello World!');
});

app.listen(port,()=>{
    console.log(`Server is running at port ${port}!`);
})
