from flask import Flask, jsonify, json, request
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:pr151776@localhost/Prash'
app.config['SQLALCHEMY_TRACK_MODIFICATION'] = False

db = SQLAlchemy()
db.init_app(app)
ma = Marshmallow(app)
CORS(app)

class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer,primary_key=True)
    name = db.Column(db.String(50))
    email = db.Column(db.String(50))

    def __init__(self,name,email):
        self.name = name
        self.email = email

class UserSchema(ma.Schema):
    class Meta:
        fields = ("id","name","email")

user_schema = UserSchema()
users_schema = UserSchema(many=True)

@app.before_request
def table():
    db.create_all()

@app.route("/")
def home():
    return "Hello World"

@app.route("/user",methods=['GET'])
def allUser():
    users = User.query.all()
    res = users_schema.dump(users)
    return jsonify(res)

@app.route("/listuser/<id>",methods=['GET'])
def listUser(id):
    users = User.query.get(id)
    return user_schema.jsonify(users)

@app.route("/addUser",methods=['POST'])
def addUser():
    name = request.json['name']
    email = request.json['email']

    user = User(name,email)
    db.session.add(user)
    db.session.commit()

    return user_schema.jsonify(user)

@app.route("/updateuser/<id>",methods=['PUT'])
def updateUser(id):
    user = User.query.get(id)

    user.name = request.json['name']
    user.email = request.json['email']

    db.session.commit()
    return user_schema.jsonify(user)

@app.route("/deleteuser/<id>",methods=['DELETE'])
def deleteUser(id):
    user = User.query.get(id)

    db.session.delete(user)
    db.session.commit()
    return user_schema.jsonify(user)

if __name__ == "__main__":
    app.run(debug=True)