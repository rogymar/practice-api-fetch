const BASE_API = 'https://reqres.in/api/users?page=1'

export async function getUser () {
    const res = await fetch(BASE_API)

    if (!res.ok) {
        throw Error(`Fetch failed: ${res}`)
    }
    
    return res.json()
}