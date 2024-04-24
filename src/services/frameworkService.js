import { api, requestConfig } from '../utils/config'

// Create a framework
const createFramework = async (data, token) => {
    const config = requestConfig("POST", data, token, false)

    try {
        const res = await fetch(api + "/frameworks", config)
            .then((res) => res.json())
            .catch((err) => err)

        return res
    } catch (error) {
        console.log(error)
    }
}

// Get frameworks
const getFrameworks = async () => {
    const config = requestConfig("GET", null)

    try {
        const res = await fetch(api + "/frameworks", config)
            .then((res) => res.json())
            .catch((err) => err)

        return res
    } catch (error) {
        console.log(error)
    }
}

const frameworkService = {
    createFramework,
    getFrameworks,
}

export default frameworkService