import os
import sqlite3
from flask import *

app = Flask(__name__)

# database configuration
DATABASE = 'database.db'

def get_db():
    db = sqlite3.connect(DATABASE)
    db.row_factory = sqlite3.Row
    return db

def init_db():
    db = get_db()
    db.execute('''
        CREATE TABLE IF NOT EXISTS artworks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            data TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    db.commit()
    db.close()

# Initialize the database when the app starts
init_db()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/save', methods=['POST'])
def save_art():
    data = request.get_json()
    
    db = get_db()
    # defensive coding to prevent sql injection
    db.execute('INSERT INTO artworks (title, data) VALUES (?, ?)', 
               (data['title'], data['pixels']))
    db.commit()
    db.close()
    
    return jsonify({'message': 'Artwork saved successfully!'})

@app.route('/gallery')
def gallery():
    db = get_db()
    artworks = db.execute('SELECT * FROM artworks ORDER BY created_at DESC').fetchall()
    db.close()
    return render_template('gallery.html', artworks=artworks)
    
# to prevent bugs or errors this is a good python practice
if __name__ == '__main__':
    app.run(debug=True)
