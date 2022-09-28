
const OrderIndex=({orders})=>{
    return <ul>
        {orders.map(order=>{
        return <li key={order.id}>{order.ticket.title} - {order.status}</li>
        })}
    </ul>
}

export default OrderIndex;
