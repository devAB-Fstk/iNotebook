const connectToMongo = require('./db.js')
const express = require('express')
const auth = require('./routes/auth')
const notes = require('./routes/notes')
var cors = require('cors')


connectToMongo();
const app = express();
const port = 5000

app.use(cors())
app.use(express.json());

//available routes
// app.use('/api/auth', require('./routes/auth'));
// app.use('/api/notes', require('./routes/notes'));
app.use('/api/auth', auth);
app.use('/api/notes', notes);

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.listen(port, () => {
  console.log(`iNotebook listening at http://localhost:${port}`)
})