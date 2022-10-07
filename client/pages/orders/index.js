
import { CCard, CCardHeader, CCardBody, CCardTitle, CCardText, CButton  } from '@coreui/react'

const OrderIndex=({orders})=>{
    return <CCard className='mt-6'>
            <CCardHeader component="h1">Orders</CCardHeader>
            <CCardBody>
                <CCardTitle></CCardTitle>
                <CCardText> 
                    <ul>
                        {orders.map(order=>{
                        return <li key={order.id}>{order.ticket.title} - {order.status}</li>
                        })}
                    </ul>
                </CCardText>
                {/* <CButton href="#">Go somewhere</CButton> */}
            </CCardBody>
        </CCard>
    
}

OrderIndex.getInitialProps=async (context, client)=>{
    const {data}=await client.get('/api/orders');
    return {orders:data};
}

export default OrderIndex;
