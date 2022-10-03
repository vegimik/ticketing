import Link from 'next/link';
import useRequest from '../../hooks/use-request';

const UserIndex = ({users}) => {
     const usersList=users.map(user=>(
        <tr key={user.id}>
            <td>{user.email}</td>
            <td>
                <Link href="/users/[userId]" as={`/users/${user.id}`}>
                    <a>View</a>
                </Link>
            </td>
        </tr>
    ))


    return <div>
        <h1>Users</h1>
        <Link href="/users/new">
        Create User
        </Link>
        <table className="table">
                <thead>
                    <tr>
                        <th>Email</th>
                        <th>Link</th>
                    </tr>
                </thead>
                <tbody>
                    {usersList}
                </tbody>
            </table> 
    </div>
}

UserIndex.getInitialProps = async (context, client) => {
    const { data } = await client.get('/api/users/getall');
    return { users: data };
}

export default UserIndex;