import React, { use, useEffect, useState } from 'react';
import { getuser } from '../../Component/Api';
import Useauth from '../../Component/Useauth';

const Myprofile = () => {
    const {user}=Useauth()
    const [User, setUser] = useState(null);
    // console.log(user)

    useEffect(() => {
         if (!user?.email) return; 
        const fetchUser = async () => {
            try {
                const data = await getuser(user.email); 
                setUser(data); 
            } catch (err) {
                console.error("Error fetching user:", err);
            }
        };

        fetchUser();
    }, [user]);

    console.log(User)
    return (
        <div>
            this is my profile
        </div>
    );
};

export default Myprofile;