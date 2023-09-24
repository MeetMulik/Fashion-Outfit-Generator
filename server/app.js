const express = require('express');
const cors = require("cors");
const { generateMeta } = require('./controllers/openaiController');
const { generateImage, getImage } = require("./controllers/leapApiController");

const app = express();
app.use(cors());

app.listen(8000, () => {
    console.log('Server listening on port 8000');
});

app.use(express.json());

app.post('/openai/meta', generateMeta);
app.post("/generate-image", generateImage);
app.get("/get-image/37d42ae9-5f5f-4399-b60b-014d35e762a5/:inferenceId", getImage);