# Define the server
from bson.objectid import ObjectId
import pymongo
from flask import Flask, jsonify, request
from werkzeug.security import generate_password_hash, check_password_hash
from flask_cors import CORS
from json import loads
app = Flask(__name__)
CORS(app)

# Define the mongoDB database
uri = 'mongodb://amit:amit00@ds149914.mlab.com:49914/abnb'
my_database = pymongo.MongoClient(uri)['abnb']
coll = my_database['houses']


def util(collection):
    l = [x for x in collection]
    for x in l:
        x['_id'] = str(x['_id'])
    return l

# Using the server and the database
@app.route('/houses/', methods=['GET'])
def get_all():
    return jsonify(util(coll.find()))


@app.route('/houses/<string:_id>', methods=['GET'])
def get_by_id(_id):
    return jsonify(util(coll.find({'_id': ObjectId(_id)}))[0])


@app.route('/houses/<string:_id>', methods=['PUT'])
def put_by_id(_id):
    coll.update_one({'_id': ObjectId(_id)},{ "$set": loads(request.data.decode('utf-8'))})
    return jsonify(util(coll.find({'_id': ObjectId(_id)}))[0])

# bouns feature - authenticated reset bookings in all/ specific house
def auth(password):
    original_hash = generate_password_hash('secret')
    return check_password_hash(original_hash,password)
    
@app.route('/admin/reset/all/<string:admin_password>', methods=['GET'])
def reset_all_bookings(admin_password):
    if auth(admin_password):
        coll.update_many({},{ "$set": loads('{"bookings":[[]]}')})
        return jsonify(okay='ALL bookings were reseted')
    else:
        return jsonify(wrong='password is wrong')

@app.route('/admin/reset/id/<string:_id>/<string:admin_password>',methods=['GET'])
def reset_bookings_by_id(_id,admin_password):
    if auth(admin_password):
        coll.update_many({'_id': ObjectId(_id)},{ "$set": loads('{"bookings":[[]]}')})
        return jsonify(okay=f'bookings {_id} was reseted')
    else:
        return jsonify(wrong='password is wrong')

#Error handlers
@app.errorhandler(404)
def not_found(error):
    return '<h1> The page does not exists ... Please check the URL ... </h1><br><img src="https://sitechecker.pro/wp-content/uploads/2017/12/404.png">', 404


@app.errorhandler(400)
def bad_request(error):
    return '<img src="https://ih0.redbubble.net/image.4727307.7836/stf,small,600x600-c,0,0,1000,1000.u1.jpg">', 400


@app.errorhandler(405)
def not_allowed(error):
    return '<img src="http://www.neat.com/wp-content/uploads/2014/08/500.png">', 400


if __name__ == '__main__':
    app.run(debug=True)
