import { authUser } from "../components/Auth/auth";

export const getUserName = (users) => {
    let loggedInUser = authUser()
    return users?.filter(user => user._id !== loggedInUser.user._id)[0].name
};

export const getUserFullDetail = (users) => {
    let loggedInUser = authUser()

    return users?.filter(user => user._id !== loggedInUser.user._id)[0]
};

export const isSameUser = (messages, message, i) => {
    let loggedInUser = authUser()
    return i < messages?.length &&
        (
            messages[i + 1]?.sender?._id !== message?.sender?._id ||
            messages[i + 1]?.sender?._id === undefined
        ) &&
        message?.sender?._id !== loggedInUser.user._id
}

export const lastMessage = (messages, message, i) => {
    let loggedInUser = authUser()

    i === messages.length - 1 &&
        messages[messages.length - 1]?.sender._id !== loggedInUser.user._id &&
        messages[messages.length - 1]?.sender._id
}
