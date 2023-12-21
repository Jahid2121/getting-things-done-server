const express = require('express');
const app = express()
const cors = require('cors');
const port = process.env.PORT || 5000

// middlewares
app.use(cors())
app.use(express.json())

app.get('/',  (req, res) => {
    res.send('Getting Things Done is running')
})

app.listen(port, () => {
    console.log(`Getting Things Done server is running on ${port}`);
})