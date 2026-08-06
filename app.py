import os
from flask import Flask, render_template, request, jsonify, session, redirect, url_for
import firebase_admin
from firebase_admin import credentials, auth

from dotenv import load_dotenv # noqa: F401


load_dotenv()
app = Flask(__name__)
app.secret_key = "very_secret_key"  # Change this to a secure random key in production
default_app = firebase_admin.initialize_app(credentials.Certificate("txsf-flutter-firebase-adminsdk-fbsvc-db860b3730.json"))


# Helper function to check if the user is authenticated

def get_authenticated_user():
    return session.get("user")


def is_authenticated():
    return get_authenticated_user() is not None


# Auth Routes

@app.route("/api/login/txdash", methods=["POST"])
def login():
    data = request.get_json() or {}
    id_token = data.get("idToken")
    
    if not id_token:
        return jsonify({"error": "No ID token provided"}), 400

    try:
        # Verify the ID token using Firebase Admin SDK
        decoded_token = auth.verify_id_token(id_token)
        uid = decoded_token["uid"]

        # Store user information in session
        session["user"] = {"uid": uid, "email": decoded_token.get("email"), "name": decoded_token.get("name")}

        return jsonify({"status": "success", "redirect": url_for("texdash")}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 401

@app.route("/api/logout/txdash", methods=["GET"])
def logout():
    session.pop("user", None)
    return redirect(url_for("texsefportal"))  # Redirect to the login page after logout


#Routing
@app.route("/")
def home():
    return render_template("index.html")

@app.route("/cdev")
def cdevportal():
    return render_template("cathedralCo/cathedral.html")

@app.route("/orgsearch")
def orgsearch():
    return render_template("orgSearch.html")

# TexSEF Login Page

@app.route("/texsef", methods=['GET'])
def texsefportal():
    if session.get("user"):
        return redirect(url_for("texdash"))
    return render_template("texsef/texsef.html")
# TexSEF Dashboard Pages

@app.route("/texdash/account", methods=['GET'])
def txsf_account():
    user = get_authenticated_user()
    if not user:
            return redirect(url_for("texsefportal"))
    return render_template("texsef/dash_tx_account.html", user=user)

@app.route("/texdash/events", methods=['GET'])
def txsf_events():
    user = get_authenticated_user()
    if not user:
            return redirect(url_for("texsefportal"))
    return render_template("texsef/dash_tx_events.html", user=user)

@app.route("/texdash/settings", methods=['GET'])
def txsf_settings():
    user = get_authenticated_user()
    if not user:
            return redirect(url_for("texsefportal"))
    return render_template("texsef/dash_tx_settings.html", user=user)

@app.route("/texdash/active", methods=['GET'])
def txsf_active():
    user = get_authenticated_user()
    if not user:
                return redirect(url_for("texsefportal"))
    return render_template("texsef/dash_tx_active.html", user=user)

# DASH ROUTE 

@app.route("/texdash", methods=['GET'])

def texdash():
    # TEMPORARY TEST: Print the session variables directly to your terminal
    print("DEBUG SESSION CONTENT:", dict(session))

    if not session.get("user"):
        print("DEBUG: No user cookie found! Redirecting back to login...")
        return redirect(url_for("texsefportal"))
        
    return render_template("texsef/dash-tx.html", user=session["user"])
# END



if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)