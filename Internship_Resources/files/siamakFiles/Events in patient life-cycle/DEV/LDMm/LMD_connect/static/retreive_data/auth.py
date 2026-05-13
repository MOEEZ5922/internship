import json
import configparser
import requests

config = configparser.ConfigParser()
config.read('auth_config.ini')

http_proxy = "http:\e7bm36:password@10.132.5.7:8080"
https_proxy = "http:\e7bm36:password@@10.132.5.7:8080"

proxyDict = {
    "http": http_proxy,
    "https": https_proxy
}


def get_token():
    payload = {
        "applicationUser": {
            "Domain": config['DEFAULT']['Domain'],
            "Username": config['DEFAULT']['Username'],
            "Password": config['DEFAULT']['Password']
        },
        "logInfo": {
            "Application": {
                "Name": "LMDm"
            }
        }
    }

    r = requests.post(url=config['DEFAULT']['Base_url'] + "LoginRest/Login",
                      data=json.dumps(payload), proxies=proxyDict)

    return r.json()['Value']['ApplicationToken']['Token']