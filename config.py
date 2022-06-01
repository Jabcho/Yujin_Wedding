import os

APP_NAME = "Yujin-backend"
APP_IP = "0.0.0.0"
APP_PORT = 9876

DATAFILE = "data.csv"
DELIM = "|"

BASE_DIR = os.path.dirname(__file__)
STATIC_DIR = BASE_DIR
TEMPLATE_DIR = os.path.join(BASE_DIR, "dist")