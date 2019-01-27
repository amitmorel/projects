# How To Deploy Your Project To Zeit Now
## By Amit Morel
### Using this guide you can upload your file to Now Zeit Platform
## Pre-requirements:
1. A single file python flask server project
1. An Installed now client

## Instructions
1. name the server file `index.py`
2. create `requirement.txt` file:
``` C++
Flask-Cors==3.0.7
flask-mongoengine==0.9.5
Flask-PyMongo==2.2.0
flask-restplus==0.12.1
Flask-WTF==0.14.2
Jinja2==2.10
jsonschema==2.6.0
mongoengine==0.16.3
pymongo==3.7.2
Werkzeug==0.14.1
```
3. create now.json file
```json
{
    "version": 2,
    "name": "abnb-server-python",
    "builds": [
        {
            "src": "*.py",
            "use": "@liudonghua123/now-flask",
            "config": {
                "maxLambdaSize": "30mb"
            }
        }
    ],
    "routes": [
        {
            "src": "/.*",
            "dest": "/"
        }
    ]
}
```
4. on command line / console - type `now` and deploy !

## Credits / Resources
[GitHub Q&A](https://github.com/zeit/now-examples/issues/163)  
[Camillo Visini's Guide](https://camillovisini.com/barebone-serverless-flask-rest-api-on-zeit-now/)  
[Zeit now Documentation](https://zeit.co/docs/v2/deployments/official-builders/python-now-python/) 
