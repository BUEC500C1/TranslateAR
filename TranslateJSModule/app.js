
const dotenv = require('dotenv');


const key = dotenv.config().parsed.API_KEY;;

var googleTranslate = require('google-translate')(key);

function translateText(targetLanguage, textToTranslate) {
    googleTranslate.translate(textToTranslate, targetLanguage, function(err, translation) {
        if (err){
            console.log("There's a problem with API communication")
        }
        else{
            console.log(translation.translatedText);
        }
  });
}

translateText("es", "Hi, my name is Lizzy");