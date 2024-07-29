// Create web server
// Create a web server that listens for requests on a given port and responds with the data from the comments.json file. The server should respond to the following routes:

// /comments: returns all comments in the comments.json file
// /comments/:id: returns a single comment with the given id
// If a comment with the given id does not exist, the server should respond with a 404 status code and a message saying "Comment not found".

// If the server receives a request that does not match any of the routes above, it should respond with a 404 status code and a message saying "Route not found".

// The server should respond with the appropriate data in JSON format.

const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;
  const id = url.split('/')[2];
  const comments = JSON.parse(fs.readFileSync('comments.json', 'utf-8'));

  if (url === '/comments' && method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify(comments));
    res.end();
  } else if (url === `/comments/${id}` && method === 'GET') {
    const comment = comments.find((comment) => comment.id === id);
    if (comment) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.write(JSON.stringify(comment));
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.write(JSON.stringify({ message: 'Comment not found' }));
    }
    res.end();
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify({ message: 'Route not found' }));
    res.end();
  }
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});