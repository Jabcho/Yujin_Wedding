import os
from flask import Blueprint, request, abort

import config

module = Blueprint(name="api", import_name=__name__)

def read_csv():
    with open(config.DATAFILE, "r") as f:
        data = [x.strip().split(config.DELIM) for x in f.readlines()]
    return data

def save_csv(data):
    with open(config.DATAFILE, "w") as f:
        f.write("\n".join([config.DELIM.join(x) for x in data]))

data = read_csv()

@module.route("/create", methods=["POST"])
def create():
    passed_data = request.json

    username = passed_data["username"]
    password = passed_data["password"]
    message = passed_data["message"]
    timestamp = passed_data["timestamp"]
    id = f"{timestamp}.{username}"

    data.append([id, username, password, message, timestamp])
    save_csv(data)
    return {}, 200

@module.route("/readall", methods=["GET"])
def read_all():
    pass

@module.route("/delete", methods=["GET"])
def delete():
    data.remove()
    pass