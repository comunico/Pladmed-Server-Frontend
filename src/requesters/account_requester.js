import { requestPost, requestGetAuth, requestPostAuth } from './basic_requester'

const LOGIN_URL = "login"
const REGISTER_URL = "register"
const FORGOT_PASSWORD_URL = "forgot"
const RESET_PASSWORD_URL = "reset-password"
const USERS_URL = "users"
const USER_URL = "users/me"
const ASSIGN_CREDIT_URL = "credits"

export async function requestLogin(email, password) {
    const data = {
        email: email,
        password: password
    }

    return requestPost(LOGIN_URL, data)
}

export async function requestForgotPassword(email) {
    const data = {
        email: email    
    }

    return requestPost(FORGOT_PASSWORD_URL, data)
}

export async function requestResetPassword(token, password) {
    const data = {
        token: token, 
        password: password,
        repassword: password
    }

    return requestPost(RESET_PASSWORD_URL+ "/"+ token, data)
}

export async function requestAssignCredits(user_id, credits, token) {
    const data = {
        id: user_id, 
        credits: parseInt(credits)
    }

    return requestPostAuth(ASSIGN_CREDIT_URL, data, token)
}

export async function requestRegister(email, password) {
    const data = {
        email: email,
        password: password
    }

    return requestPost(REGISTER_URL, data)
}

export async function requestUsersData(token) {
    return requestGetAuth(USERS_URL, token)
}

export async function requestUserData(token) {
    return requestGetAuth(USER_URL, token)
}
