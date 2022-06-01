from flask import Blueprint, request, abort

import config

module = Blueprint(name="api", import_name=__name__)

def list_to_dict(list_data):
    return {row[0]: {
        "username": row[1],
        "password": row[2],
        "message": row[3],
        "timestamp": row[4]
    } for row in list_data}

def dict_to_list(dict_data):
    return [
        [key, dict_data[key]["username"], dict_data[key]["password"], dict_data[key]["message"], dict_data[key]["timestamp"]]
        for key in dict_data
    ]

def read_csv():
    with open(config.DATAFILE, "r") as f:
        list_data = [x.strip().split(config.DELIM) for x in f.readlines()]
    return list_to_dict(list_data)

def save_csv(data):
    with open(config.DATAFILE, "w") as f:
        f.write("\n".join([config.DELIM.join(x) for x in dict_to_list(data)]))

data = read_csv()

@module.route("/create", methods=["POST"])
def create():
    passed_data = request.json

    username = passed_data["username"]
    password = passed_data["password"]
    message = passed_data["message"]
    timestamp = passed_data["timestamp"]
    id = f"{timestamp}.{username}"

    if id in data.keys():
        abort(400, "id already exists")
    else:
        data[id] = {
            "username": username,
            "password": password,
            "message": message,
            "timestamp": timestamp
        }
        save_csv(data)
        return {}, 200

@module.route("/readall", methods=["GET"])
def read_all():
    return data, 200

@module.route("/delete", methods=["POST"])
def delete():
    passed_data = request.json
    
    id = passed_data["id"]
    password = passed_data["password"]

    if id not in data.keys() or data[id]["password"] != password:
        abort(404, "id not found")
    else:
        del data[id]
        save_csv(data)
        return {}, 200