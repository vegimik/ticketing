import Link from 'next/link';
import useRequest from '../../hooks/use-request';
import { CCard, CCardHeader, CCardBody, CCardTitle, CCardText, CButton  } from '@coreui/react'

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

    return <CCard className='mt-6'>
                <CCardHeader component="h1">
                <Link href="/tickets/new">
                Create Ticket
                </Link></CCardHeader>
                <CCardBody>
                    <CCardTitle>Tickets</CCardTitle>
                    <CCardText>       
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
                    </CCardText>
                    {/* <CButton href=\"#">Go somewhere</CButton> */}
                </CCardBody>
            </CCard>
           
}

IndexTickets.getInitialProps = async (context, client) => {
    const { data } = await client.get('/api/tickets');
    return { tickets: data };
}

export default IndexTickets;