import app from './app';

/* This is the code that starts the server. */
app.set('port', process.env.PORT || 3000);

app.listen(app.set('port'), () => {

  console.log(`Server running on ${app.set('port')}`);

})