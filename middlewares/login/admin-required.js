import { User } from '../../db/models/users/user-model.js';

const admin_required = async (req, res, next) => {
    const currentId = req.currentUserId;
    try {
        const currentUser = await User.findOne( 
            {_id: currentId},
            { _id: 1, userName :1, email: 1, role : 1}
        );
       
        if(currentUser.role === "ADMIN") {
            next();
            return;
        } else {
            throw { message : "권한이 없습니다.", currentUser: currentUser}
        }
    } catch (error) {
        res.status(400).json(error);
        return;
    }
}
  
  
export { admin_required };