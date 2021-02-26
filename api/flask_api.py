from flask import Flask, jsonify
from flaskext.mysql import MySQL

app = Flask(__name__)
mysql = MySQL()

app.config['MYSQL_DATABASE_HOST'] = 'localhost'
app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = 'root'
app.config['MYSQL_DATABASE_DB'] = 'examples'
mysql.init_app(app)
con = mysql.connect()

@app.route('/login')
def login():
    cur = con.cursor()
    cur.execute("select * from users")
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