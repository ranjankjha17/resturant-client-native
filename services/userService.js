import axios from "axios"
import { loginFailure } from "../reducers/login"

const BASE_URL='https://resturant-server-mssql.vercel.app'

export const createLogin = async (userData,dispatch) => {
    try {
        const response = await axios.post(`${BASE_URL}/api/login`,userData)
        return response.data
    } catch (e) {
        dispatch(loginFailure('UserID and Password did not match'))
        // throw new Error('Error getting users login')
        console.log(e.message)
    }
}
