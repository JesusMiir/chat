import { useEffect, useState } from "react"

function UsersList() {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    async function getAllUsers() {
        const res = await fetch("http://localhost:8800/api/user");
        if (!res.ok) {
            setError("Something went wrong")
            setIsLoading(false)
            return
        }
        const userList = await res.json();
        setUsers(userList);
        setIsLoading(false)
    }

    useEffect(() => {
        getAllUsers();
    }, []);

    if (isLoading) return <p>Loading...</p>

    if (error) return <p>Error: {error}</p>

    return (
        <div>
            <ul>
                {users.map((u) => {
                    return <li key={u.username}>{u.username}</li>
                })}
            </ul>
        </div>
    )
}

export default UsersList
