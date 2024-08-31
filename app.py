from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient
from bson.objectid import ObjectId

app = Flask(__name__)
CORS(app,origins="https://localhost:5173")  

# Connect to MongoDB
client = MongoClient('mongodb://localhost:27017/')
db = client.user  
collection = db.user_details

# Create a new item
@app.route('/items', methods=['POST'])
def create_item():
    data = request.json
    result = collection.insert_one(data)
    return jsonify(str(result.inserted_id)), 201

# Get all items
@app.route('/items', methods=['GET'])
def get_items():
    items = []
    for item in collection.find():
        item['_id'] = str(item['_id'])
        items.append(item)
    return jsonify(items), 200

# Get a single item by ID
@app.route('/items/<id>', methods=['GET'])
def get_item(id):
    item = collection.find_one({"_id": ObjectId(id)})
    if item:
        item['_id'] = str(item['_id'])
        return jsonify(item), 200
    else:
        return jsonify({'error': 'Item not found'}), 404

# Update an item
@app.route('/items/<id>', methods=['PUT'])
def update_item(id):
    data = request.json
    result = collection.update_one({"_id": ObjectId(id)}, {"$set": data})
    if result.modified_count > 0:
        return jsonify({'success': 'Item updated'}), 200
    else:
        return jsonify({'error': 'Item not found'}), 404

# Delete an item
@app.route('/items/<id>', methods=['DELETE'])
def delete_item(id):
    result = collection.delete_one({"_id": ObjectId(id)})
    if result.deleted_count > 0:
        return jsonify({'success': 'Item deleted'}), 200
    else:
        return jsonify({'error': 'Item not found'}), 404

if __name__ == '__main__':
    app.run(debug=True)
