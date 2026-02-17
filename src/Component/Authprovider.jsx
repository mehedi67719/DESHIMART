import React, { useEffect, useState } from 'react';
import { Authcontext } from './Authcontext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from './firebase.init';
import { userpost } from './Api';

const Authprovider = ({ children }) => {

    const provider = new GoogleAuthProvider();


    const [user, setUser] = useState(null);



    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);





    const signupwithemail = async (email, password, name) => {
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );

        const user = userCredential.user;

        await updateProfile(user, {
            displayName: name,
        });


        const userInfo = {
            name,
            email,
            displayName: user.displayName,
            role: "buyer",
            provider: "email",
            createdAt: new Date(),
        };

        await userpost(userInfo);

        return userCredential;
    };



    const loginwithemail = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }


    const Loginwithgoogle = async () => {
        const result = await signInWithPopup(auth, provider);


        if (result._tokenResponse?.isNewUser) {
            const userInfo = {
                displayName: result.user.displayName,
                photoURL: result.user.photoURL,
                email: result.user.email,
                role: "buyer",
                provider: "google",
                createdAt: new Date(),
            };

            await userpost(userInfo);
        }

        return result;
    };

    const logout = () => {
        return signOut(auth)
    }


    // console.log(user)


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