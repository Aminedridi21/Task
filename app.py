from flask import Flask,jsonify,request,make_response
import mysql.connector
import jwt
import datetime
from flask_cors import CORS,cross_origin

app = Flask(__name__)

CORS(app)
# Database configuration
db_config = {
    'host': 'localhost',
    'user': 'root',
    'password': 'admin',
    'database': 'mydb',
}

# Create a MySQL database connection
db = mysql.connector.connect(**db_config)
@app.route('/',methods = ['GET', 'POST'])
def index():
    # Use the 'db' connection to interact with your database
    cursor = db.cursor()
    cursor.execute("SELECT * FROM mydb.users")
    d= cursor.fetchall()
    cursor.close()
    users=[]
    content={}
    for user in d:
        content={'id':user[0],
               'name':user[1],
               'surname':user[2],
               'email':user[3],
               'password':user[4]
               }
        users.append(content)
        content={}
    if(request.method == 'GET'):
        return jsonify({'data': users})
    if request.method == 'POST':
        name = request.form['name']
        passw = request.form['password']
        cursor.execute(''' INSERT INTO mydb.users VALUES(%s,%s)''',(name,passw))
@app.route('/unprotected')
def unprotected():
    return'' 
@app.route('/protected')
def protected():
    return''
@app.route('/login')
def login ():
    auth = request.authorization
    if auth and auth.password == 'password':
        token = jwt.encode({'user': auth.username , 'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes:30)})
        return 'hello '
    return make_response('could not verify!',401,{'WWW-Authenticate' : 'Basic realm = "login required"'}) 
if __name__ == '__main__':
    app.run(debug=True)
