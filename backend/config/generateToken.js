import jsonwebtoken from "jsonwebtoken";

export const generateWebToken = async (id) => {
    let expiresIn = 30 * 24 * 60 * 60 //expire in 30 days
    return jsonwebtoken.sign({ id }, process.env.JSONTOKEN_SECRET, {
        expiresIn
    })
}