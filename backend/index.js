const express = require('express');
const app = express();
const port = 3000;



//Home Route
app.get('/',(request, response) => {
	response.send(
		'<h1>Example response </h1>')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})