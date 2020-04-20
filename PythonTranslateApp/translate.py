from googletrans import Translator, LANGUAGES

class translate:

    def __init__(self, textToTranslate, destinationLanguage):
        self.textToTranslate = textToTranslate
        self.destinationLanguage = destinationLanguage
        self.destinationLanguageCode = self.findKeyFromValue()


    def findKeyFromValue(self):
        for code in LANGUAGES:
            if self.destinationLanguage in LANGUAGES[code]:
                return code
        print('no such value found')


    def translateWords(self):
        translator = Translator()
        translation = translator.translate(self.textToTranslate, dest = self.destinationLanguageCode, src = 'auto')
        print(translation.text)
        return translation.text


