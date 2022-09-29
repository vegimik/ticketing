import buildClient from "../api/build.client";
import axios from "axios";
import Link from "next/link";

const LoadingPage= ({ currentUser, tickets})=>{
    const ticketsList=tickets.map(ticket=>(
        <tr key={ticket.id}>
            <td>{ticket.title}</td>
            <td>{ticket.price}</td>
            <td>
                <Link href="/tickets/[id]" as={`/tickets/${ticket.id}`}>
                    <a>View</a>
                </Link>
            </td>
        </tr>
    ))
    return (
        <div>
            {/* <h1>Tickets</h1>
            { <table className="table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Price</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {ticketsList}
                </tbody>
            </table> } */}
        </div>
    )
}

LoadingPage.getInitialProps = async (context, client, currentUser)=>{   
    const {data}=await client.get('/api/tickets');
    return {tickets:data};
}    

export default LoadingPage;