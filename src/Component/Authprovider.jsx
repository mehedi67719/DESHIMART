import React, { useEffect, useState } from 'react';
import { Authcontext } from './Authcontext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from './firebase.init';

const Authprovider = ({ children }) => {

    const provider = new GoogleAuthProvider();


    const [user, setUser] = useState(null);



    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);




    const signupwithemail = (email, password, name) => {
        return createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                return updateProfile(user, {
                    displayName: name
                });
            });
    }

    const loginwithemail = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }


    const Loginwithgoogle = () => {
        return signInWithPopup(auth, provider)
    }

    const logout=()=>{
        return signOut(auth)
    }





    const authinfo = {
        signupwithemail,
        loginwithemail,
        Loginwithgoogle,
        user,
        logout
    }


    return (
        <Authcontext value={authinfo}>
            {children}
        </Authcontext>
    );
};

export default Authprovider;