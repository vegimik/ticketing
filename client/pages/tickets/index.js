import Link from 'next/link';
import useRequest from '../../hooks/use-request';

const IndexTickets = ({tickets}) => {
     const ticketsList=tickets.map(ticket=>(
        <tr key={ticket.id}>
            <td>{ticket.title}</td>
            <td>{ticket.price}</td>
            <td>
                <Link href="/tickets/[ticketId]" as={`/tickets/${ticket.id}`}>
                    <a>View</a>
                </Link>
            </td>
        </tr>
    ))
    
    const {doRequest,errors}=useRequest({
        url:'/api/tickets',
        method:'get',
        body:{},
        onSuccess:(ticket)=>console.log(ticket)
    });

    return <div>
        <h1>Tickets</h1>
        <Link href="/tickets/new">
        Create Ticket
        </Link>
        <table className="table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Link</th>
                    </tr>
                </thead>
                <tbody>
                    {ticketsList}
                </tbody>
            </table> 
    </div>
}

IndexTickets.getInitialProps = async (context, client) => {
    const { data } = await client.get('/api/tickets');
    return { tickets: data };
}

export default IndexTickets;