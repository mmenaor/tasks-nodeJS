const { app } = require('./app');

//Models

//Utils
const { db } = require('./utils/database.util');

db.authenticate()
    .then(() => console.log('Database authenticated'))
    .catch(err => console.log(err));

//Establish model's relations

db.sync()
    .then(() => console.log('Database sync'))
    .catch(err => console.log(err));

// Habilitar la aplicación
app.listen(4000, () => {
    console.log('Express app running!!!');
});