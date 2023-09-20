
# Import flask and datetime module for showing date and time
from flask import Flask,request,redirect,url_for
import webscrap 
import processor
import json
import time
j={}
session={}
search=""
# Initializing flask app
app = Flask(__name__)
@app.route("/add", methods=["POST"], strict_slashes=False)
def add_articles():
    todo_data = request.get_json()
    content=todo_data['transcript']
    search=processor.chatbot_response(content) #webscrap.web_scraping(content)
    session["form_data"]=search
    return redirect(url_for('data'))

# Route for seeing a data
@app.route('/data')

def get_time():
    time.sleep(5)
    j["data"]=session.get('form_data',None)
    print(j)
    # Returning an api for showing in  reactjs
    return app.response_class(response=json.dumps(j), status=200, mimetype='application/json')


    
      
# Running app
if __name__ == '__main__':
    
    app.run(host="0.0.0.0",port=5000)