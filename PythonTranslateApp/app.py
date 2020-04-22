# app.py
from flask import Flask, request, jsonify, render_template
from translate import *
app = Flask(__name__)


@app.route('/')
def index():
    return render_template("index.html")


@app.route('/translate', methods=["GET"])
def respond():
    textToTranslate = request.args.get("textToTranslate", None)
    destinationLanguage = request.args.get("translateTo", None)

    translationObject = translate(textToTranslate, destinationLanguage)
    translationResult = translationObject.translateWords()
    response = {}

    response["Translation"] = f"{translationResult}"

    return jsonify(response)


if __name__ == '__main__':
    app.run(debug=True, threaded=True, port=5000)