from flask import jsonify, Flask

app = Flask(__name__)

if __name__ == '__main__':
    

    app.run(debug=True, host="0.0.0.0")
