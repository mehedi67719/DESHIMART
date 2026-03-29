import React, { useEffect, useState } from 'react';
import { Authcontext } from './Authcontext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from './firebase.init';
import { userpost } from './Api';
import useaxios from './Useaxios';

const Authprovider = ({ children }) => {

    const provider = new GoogleAuthProvider();


    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); 



    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

//     useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
//         setUser(currentUser);
//         setLoading(false);

//         // যখন ইউজার লগইন করে, তখনই টোকেন পাঠাও
//         if (currentUser) {
//             try {
//                 const token = await currentUser.getIdToken();
                
//                 // টোকেন লোকালস্টোরেজে রাখো
//                 localStorage.setItem('authToken', token);
                
//                 // এক্সিস করো
//                 const res = await useaxios.get("/users/profile", {
//                     headers: {
//                         Authorization: `Bearer ${token}` 
//                     }
//                 });

//                 console.log("User profile:", res.data);
//             } catch (error) {
//                 console.error("Error fetching profile:", error);
//             }
//         } else {
//             // লগআউট হলে টোকেন রিমুভ করো
//             localStorage.removeItem('authToken');
//         }
//     });

//     return () => unsubscribe();
// }, []); 





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



    // useEffect(() => {
    //     const fetchUserProfile = async () => {
    //         if (!auth.currentUser) return;

    //         try {
               
    //             const token = await auth.currentUser.getIdToken();

    //             // console.log(token)
    //             const res = await useaxios.get("/users/profile", {
    //                 headers: {
    //                     Authorization: `Bearer ${token}` 
    //                 }
    //             });

    //             console.log("User profile:", res.data);
    //         } catch (error) {
    //             console.error("Error fetching profile:", error);
    //         }
    //     };

    //     fetchUserProfile();
    // }, [auth.currentUser]);




    const authinfo = {
        signupwithemail,
        loginwithemail,
        Loginwithgoogle,
        user,
        logout,
        loading
    }


    return (
        <Authcontext value={authinfo}>
            {children}
        </Authcontext>
    );
};

export default Authprovider;