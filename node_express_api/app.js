var express = require("express");
require('dotenv').config();

const { Configuration, OpenAIApi } = require("openai");    
const myApiKey = process.env.OPENAI_API_KEY
const configuration = new Configuration({
    apiKey: myApiKey,
});
const openai = new OpenAIApi(configuration);

const prompt_prefix = "Given the following columns in a pandas dataframe \'IMO Number\' \'Name\' \Ship type\' \'Total fuel consumption [m tonnes]\' \'year\' "

var app = express();

nunjucks = require('nunjucks')
nunjucks.configure('views', {
    autoescape: true,
    express: app
});
app.set('view engine', 'html');

var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 




app.listen(3000, () => {
 console.log("Server running on port 3000");
});

app.get("/", (req, res, next) => {
    res.render("index")
   });

app.post("/prompt", async (req, res) => {;
    var prompt_text = req.body.text;

    const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt_prefix + prompt_text,
    });

    openai_response = completion.data.choices[0].text
    console.log(openai_response);

    res.render('index', {'response' : openai_response});
   });

app.get("/prompt", async (req, res) => {;
    console.log(req.query);
    var prompt_text = req.query.text;

    const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt_text,
    });

    openai_response = completion.data.choices[0].text
    console.log(openai_response);

    res.json({
        "prompt" : prompt_text,
        "response" : openai_response
    });
   });