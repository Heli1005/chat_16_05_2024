import { authUser } from "../components/Auth/auth";

export const getUserName = (users) => {
    let loggedInUser = authUser()
    console.log("users", users);
    

    return users?.filter(user => user._id !== loggedInUser.user._id)[0].name
};
