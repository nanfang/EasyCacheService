const http = require('http');

const server = http.createServer((req, res) => {
    console.log(req);
    res.write('Hello World!');
    return res.end();
});

server.listen(3030);