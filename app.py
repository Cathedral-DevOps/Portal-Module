import os  # noqa: F401
from flask import Flask, render_template, request  # noqa: F401

app = Flask(__name__)
#Routing
@app.route("/")
def home():
    return render_template("index.html")

@app.route("/cdev")
def cdevportal():
    return render_template("cathedral.html")

@app.route("/texsef")
def texsefportal():
    return render_template("texsef.html")



if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)