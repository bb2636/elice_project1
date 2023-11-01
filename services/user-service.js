
import { User } from '../db/models/users/user-model.js';

export default class UserService {

    async Signup({userName, email, password}) {
        const newUser = {userName, email, password};
        try {
            const existUser = User.findOne({email: newUser.email});
            if(existUser) {
                return null;
            }
            const user = await User.create(newUser);
            return user;
        } catch(err) {
            return err;
        }
    }
}