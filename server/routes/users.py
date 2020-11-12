@app.route('/users', methods=['POST', 'GET'])
def create_new_user():
    user = User(**request.get_json())
    print(user)

    result = create_user(user)
    print(result)

    return jsonify(request.get_json())
