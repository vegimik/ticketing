import useRequest from "../../hooks/use-request";
import Router from 'next/router';

const TicketShow=({ticket})=>{
    const {doRequest,errors}=useRequest({
        url:'/api/orders',
        method:'post',
        body:{
            ticketId:ticket.id
        },
        onSuccess:(order)=>{
            Router.push('/orders/[orderId]',`/orders/${order.id}`)
        }
    });

    return <div class="card">
                <div class="card-header">
                {ticket.title}
                </div>
                <div class="card-body">
                <h5 class="card-title">Price: {ticket.price}</h5>
                <p class="card-text"></p>
                <a  class="btn btn-primary" onClick={()=>doRequest()}>Purchase</a>
                </div>
            </div>
}

TicketShow.getInitialProps = async (context, client) => {
    const { ticketId } = context.query;
    const { data } = await client.get(`/api/tickets/${ticketId}`);
    return { ticket: data };
}

export default TicketShow;