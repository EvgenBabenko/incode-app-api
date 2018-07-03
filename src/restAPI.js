const restAPI = (app) => {
  return {
    get: function (url) {
      app.get(url, (request, response) => response.send(request.url))
    }
  }
}

// app.get('/', (req, res) => res.send({
//     message: 'Hello World!'
// }));

module.exports = {
  restAPI
}