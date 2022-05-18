from flask import Flask
from flask_cors import CORS

import api
import config

app = Flask(config.APP_NAME)
CORS(app)

app.config["JSON_AS_ASCII"] = False

app.register_blueprint(api.module, url_prefix="/api")

if __name__ == "__main__":
    app.run(host=config.APP_IP, port=config.APP_PORT)