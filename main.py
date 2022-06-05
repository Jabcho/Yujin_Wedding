from flask import Flask, render_template
from flask_cors import CORS

import api
import config

app = Flask(config.APP_NAME, static_url_path="", static_folder=config.STATIC_DIR, template_folder=config.TEMPLATE_DIR)
CORS(app)

app.config["JSON_AS_ASCII"] = False

app.register_blueprint(api.module, url_prefix="/api")

@app.route("/")
def serve_htmls():
    return render_template("index.html")

if __name__ == "__main__":
    app.run(host=config.APP_IP, port=config.APP_PORT, debug=True)
