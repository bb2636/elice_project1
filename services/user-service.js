import bcrypt from 'bcryptjs';
import passport from 'passport';

import { User } from '../db/models/users/user-model.js';

export default class UserService {

    async Signup({userName, email, password, role = "USER"}) {
        const user = {userName, email, password, role};

        try {
            if( !userName || !email || !password ) {
                return { message: "MISSING_FIELD"}
            }

            const existUser = await User.findOne( {email: user.email} );
            if(existUser!==null) {
                return { message : "DUPLICATED"};
            } 
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(user.password, salt);
            user.password = hash;
            const newUser = await User.create(user);
            return { message : "SUCCESS", user: newUser};
        } catch(err) {
            return err;
        }
    }

    async Signin (user) {

        try {
            if( !user.email || !user.password || !user.token ) {
                return { message: "MISSING_FIELD"}
            }
            const existUser = await User.findOne( {email: user.email} );

            if(existUser===null) {
                return { message : "NOT_EXIST_USER"};
            }

            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(user.password, salt);
            const isPasswordValid = await bcrypt.compare(user.password, existUser.password);

            if(isPasswordValid) {
                return { 
                    message : "SUCCESS", 
                    user: {
                        email: existUser.email,
                        token: "token",
                    }
                }
            } else {
                return { message : "NOT_MATCHED" };
            }
            
        } catch(err) {
            return err;
        }
    }

    async getUserInfo (email) {

        try {
            const matchedUser = await User.findOne( 
                { email: email }, 
                { userName: 1, email: 1 ,age:1, phone: 1, address:1, } );
            // return matchedUser;
            if(matchedUser) {
                return { message: "SUCCESS", user: matchedUser};
            } else {
                return { message: "NO_MATCHES", };
            }
            
        } catch(err) {
            return err;
        }
    }

    async updateUserInfo (email, data) {

        try {
            const matchedUser = await User.findOneAndUpdate( 
                { email: email }, 
                { userName: data.userName, age: data.age, phone: data.phone, address:data.address, },
                { new: true } );
            if(matchedUser) {
                return { message: "SUCCESS", user: matchedUser};
            } else {
                return { message: "NO_MATCHES", };
            }
        } catch(err) {
            return err;
        }
    }
}