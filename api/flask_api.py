from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
from flaskext.mysql import MySQL
import hashlib

app = Flask(__name__)
CORS(app)
mysql = MySQL()

app.secret_key = "Berd"
app.config['MYSQL_DATABASE_HOST'] = 'localhost'
app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = 'root'
app.config['MYSQL_DATABASE_DB'] = 'examples'
mysql.init_app(app)
con = mysql.connect()

@app.route('/login', methods=['GET', 'POST'])
@cross_origin()
def login():
    username = request.json["username"]
    password = hashlib.md5(str(request.json["password"]).encode()).hexdigest()
    cur = con.cursor()
    cur.execute(f"select * from users where user_name = '{username}' and password = '{password}'")
    con.commit()
    table = []
    
    for id, fname, lname, uname, pw, created_date, modified_date, is_online in cur.fetchall():
        row = dict()
        row['id'] = id
        row['first_name'] = fname
        row['last_name'] = lname
        row['user_name'] = uname
        row['password'] = pw
        row['create_date'] = created_date
        row['modified_date'] = modified_date
        row['is_online'] = is_online
        table.append(row)

    return jsonify(table)

if __name__ == '__main__':
    app.run(debug=True)