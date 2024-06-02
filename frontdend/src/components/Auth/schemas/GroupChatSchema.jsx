import * as Yup from "yup";

export const GroupChatSchema = Yup.object(
    {
        chatName: Yup.string().required('Required'),
        users: Yup.string().required('Required'),
    }
)