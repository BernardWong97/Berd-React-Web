from flask import Flask, json, jsonify, request, session
from flask_cors import CORS, cross_origin
from flaskext.mysql import MySQL
import hashlib
import os

app = Flask(__name__)
CORS(app)
mysql = MySQL()

app.secret_key = "Berd"
app.config['MYSQL_DATABASE_HOST'] = os.environ.get("DB_HOST")
app.config['MYSQL_DATABASE_USER'] = os.environ.get("DB_USER")
app.config['MYSQL_DATABASE_PASSWORD'] = os.environ.get("DB_PW")
app.config['MYSQL_DATABASE_DB'] = os.environ.get("DB_DB")
mysql.init_app(app)

@app.route('/login', methods=['GET', 'POST'])
@cross_origin()
def login():
    username = request.json["username"]
    password = hashlib.md5(str(request.json["password"]).encode()).hexdigest()

    try:
        con = mysql.connect()
        cur = con.cursor()
        cur.execute(f"select * from users where user_name = '{username}' and password = '{password}'")
        con.commit()

        account = cur.fetchone()

        if account:
            user = {
                'id': account[0],
                'name': account[1] + " " + account[2],
                'username': account[3],
                'online': account[7]
            }
            jsonObj = jsonify(
                status = "YES",
                user = user
            )
            session["id"] = account[0]
            session["name"] = account[1] + " " + account[2]
            session["username"] = account[3]
            session["online"] = account[7]

            return jsonObj
    except:
        return jsonify(status="NO")
    finally:
        con.close()
            
    return jsonify(status="NO")

@app.route('/logout', methods=['GET', 'POST'])
@cross_origin()
def logout():
    session.pop("id", None)
    session.pop("name", None)
    session.pop("username", None)
    session.pop("online", None)
    return jsonify(status="NO")

if __name__ == '__main__':
    app.run(debug=True)