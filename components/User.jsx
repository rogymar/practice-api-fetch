'use client'

import React, { useState } from "react";

import { getUser } from '../services/users';
import { getLongNameUsers } from "@componentes/util/userUtils";

const getLongNamesPorcentage = (users) => {
    const longNamesUsers = getLongNameUsers(users, 12)
    
    return longNamesUsers.length / users.length * 100
}

export default function User () {
    const [users, setUsers] = useState(false)

    !users && getUser()
        .then((users) => setUsers(users))
        .catch((e) => setUsers(e.error))

    return (
        <div>
            <h2>{users ? `Long name porcentage: ${getLongNamesPorcentage(users)}` : 'Waiting for users...'}</h2>
        </div>
    )
}