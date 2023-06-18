/**
 * Create array with users in {@param users} that both their
 * name and last name are longer then {@param chars}
 * 
 * @param {[Object]} users
 * @param {Number} chars - length to check for in the names
 * @returns {[Object]}  
 */

export function getLongNameUsers (users, chars) {
    return users.filter((user) => user.first_name.length > chars && user.last_name.length > chars)
}