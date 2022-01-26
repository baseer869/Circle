
const express = require('express');
const morgan = require('morgan')
const app = express();
const bodyParser = require('body-parser');
app.use(express.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/oryx/api/v1/mobile', require('./app/routes/mobile/index'));

app.use((req, res) => {
    return res.status(404).send({
        code: 404,
        message: 'requested route is not available',
    });
});

const sequelize = require('./database/sequelize/sequelize');

app.listen(3000, () => {
    console.log('server is running on http://localhost:3000');
    sequelize.instance.authenticate().then(function(){
        console.log("DB Connection Successful");
    }).catch(function(error){
        console.log("Unable to connect to database", error);
    });
});
