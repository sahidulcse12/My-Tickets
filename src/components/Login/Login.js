
import './Login.css';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useContext, useState } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

function Login() {

    const provider = new firebase.auth.GoogleAuthProvider();
    const fbProvider = new firebase.auth.FacebookAuthProvider();

    const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        photo: ''
    });

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

    //google handle sign in

    const handleSignIn = () => {
        firebase.auth().signInWithPopup(provider)
            .then(res => {
                const { displayName, photoURL, email } = res.user;
                const signedInUser = {
                    isSignedIn: true,
                    name: displayName,
                    email: email,
                    photo: photoURL,
                }
                setUser(signedInUser);
            })
            .catch(err => console.log(err.message))
    }

    const handleSignOut = () => {
        firebase.auth().signOut()
            .then(res => {
                const signedOutUser = {
                    isSignedIn: false,
                    newUser: false,
                    name: '',
                    email: '',
                    password: '',
                    photo: '',
                    error: '',
                    success: false
                }
                setUser(signedOutUser);
            })
            .catch(err => console.log(err.message))
    }

    //facebook handle sign in

    const handleFbSignIn = () => {
        firebase
            .auth()
            .signInWithPopup(fbProvider)
            .then((result) => {

                const user = result.user;
                //console.log('fb user after sign in', user);
            })
            .catch((error) => {
                const errorMessage = error.message;
                console.log(errorMessage);

            });
    }




    const handleBlur = (event) => {

        let isFormed = true;
        if (event.target.name === 'email') {
            isFormed = /\S+@\S+\.\S+/.test(event.target.value);
        }

        if (event.target.name === 'password') {
            const isPasswordValid = event.target.value.length > 6;
            const isPasswordHasNumber = /|d{1}/.test(event.target.value);
            isFormed = isPasswordHasNumber && isPasswordValid;
        }

        if (isFormed) {
            const newUserInfo = { ...user };
            newUserInfo[event.target.name] = event.target.value;
            setUser(newUserInfo)
            //console.log(newUserInfo);
        }

    }

    const handleSubmit = (event) => {
        if (newUser && user.email && user.password) {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    // Signed in 
                    const newUserInfo = { ...user };
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    setUser(newUserInfo);

                    updateUserName(user.name)

                })
                .catch(error => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo)
                });

        }

        if (!newUser && user.email && user.password) {
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    // Signed in
                    const user = res.user;
                    const newUserInfo = { ...user };
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    setUser(newUserInfo);
                    setLoggedInUser(newUserInfo);
                    history.replace(from);
                    //console.log('sign in user info ', loggedInUser);
                })
                .catch(error => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo)
                });
        }


        event.preventDefault();
    }

    const updateUserName = name => {
        const user = firebase.auth().currentUser;

        user.updateProfile({
            displayName: name
        }).then(function () {
            console.log('Update user successfully')
        }).catch(function (error) {
            console.log('something went wrong! please try again')
        });
    }




    return (
        <div style={{ textAlign: 'center' }} className="registration-page">

            <h2>Registration or Login</h2>
            <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id="" />
            <label htmlFor="newUser">New User Sign up</label>

            <form onSubmit={handleSubmit} className="form-design">
                {newUser && <input onBlur={handleBlur} type="text" name="name" placeholder="Your name" />}
                <br />
                <input onBlur={handleBlur} type="text" placeholder="Your Email" name="email" required />
                <br />
                <input onBlur={handleBlur} type="password" placeholder="Password" name="password" required />
                <br />
                <input className="btn btn-info" type="submit" value={newUser ? 'Sign up' : 'Sign in'} />
            </form>
            <p style={{ color: 'red' }}>{user.error}</p>
            {
                user.success && <p style={{ color: 'green' }}>User {newUser ? 'created' : 'Logged In'} successfully</p>
            }

            {
                user.isSignedIn ? <button onClick={handleSignOut}>Sign out</button> :
                    <button className="btn btn-primary mb-2 google" onClick={handleSignIn}>Sign in with Google</button>
            }
            <br />
            <button className="btn btn-primary" onClick={handleFbSignIn}>Sign in with facebook</button>
            {
                user.isSignedIn ? <div>
                    <p>Welcome to {user.name}</p>
                    <p>Your Email : {user.email}</p>
                    <img src={user.photo} alt="" />
                </div> :
                    <div>
                        <p>you are signed out</p>
                    </div>
            }


        </div>
    );
}

export default Login;
