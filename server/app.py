from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable Cross Origin so requests can come from other domains
