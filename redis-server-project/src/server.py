from flask import Flask
from redis import Redis

app = Flask(__name__)

# Configuration settings
app.config['REDIS_HOST'] = 'localhost'
app.config['REDIS_PORT'] = 6379

# Initialize Redis connection
redis_client = Redis(host=app.config['REDIS_HOST'], port=app.config['REDIS_PORT'])

@app.route('/')
def index():
    return "Welcome to the Redis Server!"

@app.route('/set/<key>/<value>')
def set_value(key, value):
    redis_client.set(key, value)
    return f"Set {key} to {value}"

@app.route('/get/<key>')
def get_value(key):
    value = redis_client.get(key)
    return f"The value of {key} is {value.decode('utf-8')}" if value else f"{key} does not exist."

if __name__ == '__main__':
    app.run(debug=True)