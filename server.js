const express = require('express');
const hbs = require('hbs');
var app = express();
const fs = require('fs');

const port = process.env.PORT || 3000;
// Define partials directory
hbs.registerPartials(__dirname + '/views/partials');
// Register Partial segments with arguments
hbs.registerPartial('footer', '{{getCurrentYear}}');
hbs.registerPartial('header', '{{title}}');

// Define template engine
app.set('view engine', 'hbs');

// Middleware
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = now;
    console.log(now);
    fs.appendFile('server.log',log+' '+req.method+' '+req.url+'\n', (err) => {
        if(err){
            console.log('Unable to write file');
        }
    });
    next();
});
// app.use((req, res, next) => {
//     res.render('maintenance.hbs',{
//     });
// //    next();
// });


// Define path
app.use(express.static(__dirname+'/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt',(text) => {
    return text.toUpperCase();
});
app.get('/', (req, res) => {
//  //   res.send('<h1>Hello Express!</h1>');
//  res.send({
//      name: 'Mark',
//      likes: [
//          'Cars',
//          'Bikes'
//      ]
//  })
    res.render('home.hbs',{
        title: 'Home Page',
        welcome: 'Hi And Welcome'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs',{
        title: 'About Page'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Bad Request'
    })
});

app.listen(port, () => {
    console.log(`Server is on port ${port}`);
});