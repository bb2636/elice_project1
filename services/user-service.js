import bcrypt from 'bcryptjs';
import passport from 'passport';

import { User } from '../db/models/users/user-model.js';

export default class UserService {

    async Signup({userName, email, password, role = "USER"}) {
        const user = {userName, email, password, role};
        try {
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
}