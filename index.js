const express = require('express')
const app = express();

const brain = require('brain.js');
const network = new brain.recurrent.LSTM();
const tdata = require('./src/data.json');
network.fromJSON(tdata);

app.use(express.json());

app.get('/evaluar/:texto', (req, res) => {

    const result = network.run(req.params.texto);

    res.json({
        input: req.params.texto,
        output: result
    });
});

app.use(express.static('public'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('server on por' + PORT);
});