import * as express from 'express';

const app = express();
app.use(express.static(__dirname + '/portal'));
app.get('*', (req, res) => res.sendFile('index.html', { root : __dirname + '/portal'}));
app.listen(8080, () => console.log('Angular server alive on 8080.'));