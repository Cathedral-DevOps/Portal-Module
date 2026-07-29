import os  # noqa: F401
from flask import Flask, render_template, request 
from dotenv import load_dotenv # noqa: F401
from flask_hot_reload import HotReload

load_dotenv()
app = Flask(__name__)
hot_reload = HotReload(app)


#Routing
@app.route("/")
def home():
    return render_template("index.html")

@app.route("/cdev")
def cdevportal():
    return render_template("cathedral.html")

@app.route("/texsef", methods=['GET'])
def texsefportal():
    return render_template("texsef.html")
    

@app.route("/texdash", methods=['POST'])
def texdash():
    # Grab the values sent from the HTML form
    user_input = request.form.get("username")
    pass_input = request.form.get("password")

    # Fetch secrets safely on the server side
    dev_user = os.getenv("dev_user")
    dev_pass = os.getenv("dev_pass")
    wesley_user = os.getenv("wesley_user")
    wesley_pass = os.getenv("wesley_pass")

    # Validate server-side
    is_dev = (user_input == dev_user and pass_input == dev_pass)
    is_wesley = (user_input == wesley_user and pass_input == wesley_pass)

    if is_dev or is_wesley:
        return render_template("dash-tx.html")
    else:
        return "Invalid Credentials", 401



if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)