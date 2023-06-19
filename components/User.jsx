'use client'

import React, { useState } from "react";

import { getUser } from '../services/users';
import { getLongNameUsers } from "@componentes/util/userUtils";

const getLongNamesPorcentage = (users) => {
    const longNamesUsers = getLongNameUsers(users, 5)
    const percentage = longNamesUsers.length / users.length * 100
    // To fixed sirve para transformar el decimal a (en este caso) solo dos.
    return percentage.toFixed(2)
}

export default function User () {
    const [users, setUsers] = useState(false)

    !users && getUser()
        .then((obj) => setUsers(obj.data))
        .catch((e) => console.error(`${e.name}: ${e.message}`))

    return (
        <div>
            <h2>{users ? `Long name porcentage: ${getLongNamesPorcentage(users)}%` : 'Waiting for users...'}</h2>
        </div>
    )
}