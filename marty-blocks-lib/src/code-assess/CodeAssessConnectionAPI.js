/**
 * This file contains the API calls to the Googleapis.
 */
const sha256 = require('js-sha256');
const randomHash = require('../util/randomHashGenerator');
const VERIFIER_KEY = "hashed_key_asdjfsdf";

class CodeAssessConnectionAPI {
    constructor(API) {
        this.verifier = null;
        this.access_token = null;
        this.expiry_date = null;
        this.refresh_token = null;
        this.API = API;
    }

    /**
     * Store verifier on the local storage temporarily so that it can be used to exchange for an access token after the user is redirected back to the app.
    */
    storeVerifier() {
        localStorage.setItem(VERIFIER_KEY, this.verifier);
    }

    /**
     * Get and remove verifier from the local storage.
     * @returns {string} verifier
     */
    getAndRemoveVerifier() {
        const verifier = localStorage.getItem(VERIFIER_KEY);
        localStorage.removeItem(VERIFIER_KEY);
        return verifier || '';
    }

    /**
     * Login the google user.
     * TODOS: add more scopes, redirect_uri must work in all environments
     */
    login() {
        const CLIENT_ID = '766117397217-omuiqp8095susapkpn5oivhe7tt245ot.apps.googleusercontent.com';
        const REDIRECT_URI = 'http://localhost:8601';
        this.verifier = randomHash(50);
        this.storeVerifier();
        const encodedHash = sha256(this.verifier)
        const hashBase64 = btoa(String.fromCharCode.apply(null, new Uint8Array(encodedHash)));
        const challenge = hashBase64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
        const SCOPES = [
            "https://www.googleapis.com/auth/classroom.courses.readonly",
        ]
        const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&response_type=code&scope=${SCOPES.join("%20")}&redirect_uri=${REDIRECT_URI}&code_challenge=${challenge}&code_challenge_method=S256&access_type=offline`;
        window.location.href = authUrl;
    }

    /**
     * 
     * @param {*} cb cb to be called when the auth code is received
     */
    async getAuthCode(cb) {
        const verifier = this.getAndRemoveVerifier();
        const urlParams = new URLSearchParams(window.location.search);
        const googleClassroomCode = urlParams.get('code');
        // remove params from url
        window.history.replaceState({}, document.title, "/");
        if (googleClassroomCode && verifier) {
            fetch("http://localhost:3000/exchange", {
                method: "POST",
                body: JSON.stringify({
                    code: googleClassroomCode,
                    verifier: verifier
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(response => {
                    console.log(`response`, response);
                    return response.json();

                })
                .then(data => {
                    if (data.success) {
                        console.log("user logged in successfully")
                        this.access_token = data.tokens.access_token;
                        this.expiry_date = data.tokens.expiry_date;
                        this.refresh_token = data.tokens.refresh_token || null;
                        cb();
                        this.API.codeAssess.setIsUserLoggedIn(true);
                    }
                }).catch(err => {
                    console.log("error trying to exchange", err);
                });
        } else {
            console.log("either googleClassroomCode or verifier is null");
        }
    }

    /**
     * Logout the google user.
     */
    async logout() {
        fetch(`https://accounts.google.com/o/oauth2/revoke?token=${this.access_token}`, {
            method: 'POST',
        })
            .then(response => {
                console.log(response);
                this.access_token = null;
                this.expiry_date = null;
                this.refresh_token = null;
                this.API.codeAssess.setIsUserLoggedIn(false);
            })
            .catch((error) => console.error('Error:', error));
    }
}

module.exports = {
    CodeAssessConnectionAPI: CodeAssessConnectionAPI
}