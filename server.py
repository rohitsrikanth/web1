from flask import Flask, request, jsonify, render_template, send_from_directory,redirect,url_for,flash
from flask_pymongo import PyMongo
from werkzeug.utils import secure_filename
import os
import csv
import json
from bson import json_util
import pandas as pd


app = Flask(__name__)
app.secret_key = 'user1111'
app.config["MONGO_URI"] = "mongodb://localhost:27017/csv_data_management"
mongo = PyMongo(app)

# Ensure the 'uploads' directory exists
if not os.path.exists('uploads'):
    os.makedirs('uploads')

@app.route('/',methods=['GET', 'POST'])
def index():
   return render_template('index.html')
@app.route('/login.html')
def login():
    return render_template('login.html')

@app.route('/adminhome.html')
def adminhome():
    return render_template('adminhome.html')

@app.route('/newdataupload.html')
def newdataupload():
    return render_template('newdataupload.html')

@app.route('/updatedata.html')
def updatedata():
    return render_template('updatedata.html')

@app.route('/get_data', methods=['GET'])
def get_data():
    month = request.args.get('Month')
    grade = request.args.get('Grade')
    subject = request.args.get('Subject')
    
    collection_name = month +"_"+ subject +"_"+ grade
    collection = mongo.db[collection_name]
    try:
        documents = list(collection.find({}))
        json_data = json.loads(json_util.dumps(documents))
        
        return render_template('display_data.html',data1=json_data,month=month,grade=grade,subject=subject)
    except Exception as e:
        return str(e), 500


@app.route('/newdataupload.html',methods=['POST'])
def upload_file():
    try:
        month = request.form.get('month')
        subject = request.form.get('subject')
        grade = request.form.get('grade')

        if not month or not subject or not grade:
            return jsonify({'msg': 'Month, subject, and grade are required'}), 400

        existing_file = mongo.db.csvfiles.find_one({'month': month, 'subject': subject, 'grade': grade})

        if existing_file:
            return jsonify({'msg': 'A file with the same month, subject, and grade already exists'}), 400

        if 'csvfile' not in request.files:
            return jsonify({'msg': 'No file part'}), 400

        file = request.files['csvfile']
        if file.filename == '':
            return jsonify({'msg': 'No selected file'}), 400

        filename = secure_filename(file.filename)
        file_path = os.path.join('uploads', filename)
        file.save(file_path)

        file_id = f"{month}_{subject}_{grade}"
        new_file = {
            'fileId': file_id,
            'originalFilename': filename,
            'month': month,
            'subject': subject,
            'grade': grade,
            'filePath': file_path
        }

        mongo.db.csvfiles.insert_one(new_file)

       
        df = pd.read_csv(file_path, skiprows=[1])
        columns_to_remove = ['H', 'K', 'L', 'P', 'Q', 'U']

        df.drop(columns=columns_to_remove, inplace=True, errors='ignore')
        new_columns = [
    'S.No', 'Subject', 'Class', 'Chapter No', 'Chapter Name', 'Topic Name', 'Subtopic Name','',
    'Video availability in Manarkeni?', 'Link to the video in Manarkeni App','','',
    'Link to the Video 1', 'Channel Name 1', 'Time Stamp 1','','',
    'Link to the Video 2', 'Channel Name 2', 'Time Stamp 2',''
]
        df.columns = new_columns
        df=df.iloc[:,0:-1]
        records = df.to_dict('records')
        mongo.db[file_id].insert_many(records)
        flash('File uploaded and data saved successfully')
        return redirect(url_for('newdataupload'))

    except Exception as e:
        return jsonify({'msg': 'Failed to process file', 'error': str(e)}), 500


if __name__ == '__main__':
    app.run(port=7777,debug=True)
