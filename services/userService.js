import axios from "axios"

const BASE_URL='https://resturant-server-mssql.vercel.app'

export const createLogin = async (userData) => {
    try {
        const response = await axios.post(`${BASE_URL}/api/login`,userData)
        return response.data
    } catch (error) {
        throw new Error('Error getting users login')
    }
}
