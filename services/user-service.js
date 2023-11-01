
import { User } from '../db/models/user-model.js';

export default class UserService {
    async Signup({userName, email, password}) {
        const user = await User.create({userName, email, password});
        return user;
    }
}