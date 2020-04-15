
var key = "AIzaSyAwLa-BWWVMdeR29C5gEZ3iCG5T-wswd70";
var googleTranslate = require('google-translate')(key);

function translateText(targetLanguage, textToTranslate) {
    googleTranslate.translate(textToTranslate, targetLanguage, function(err, translation) {
        console.log(translation.translatedText);
  });
}

translateText("es", "Hi, my name is Lizzy");