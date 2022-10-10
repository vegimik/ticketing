import {useState, useEffect } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import Router from 'next/router';
import useRequest from '../../hooks/use-request';

const OrderShow = ({ order, currentUser }) => {
    const [timeLeft, setTimeLeft] = useState();
    const { doRequest, errors } = useRequest({
        url: '/api/payments',
        method: 'post',
        body: {
            orderId: order.id
        },
        onSuccess: (payment) => Router.push('/orders')
    });

    const isTimesUp=(timesUp)=>{
        if(timesUp<=0) return 'Times up'
        else return 'Time left to pay: '+timesUp+' seconds'
    }
        

    useEffect(() => {
        console.log('I was called');
        const findTimeLeft = ()=> {
            const msLeft=new Date(order.expiresAt) - new Date()-700000
            setTimeLeft(Math.round(msLeft/1000));
        }
        findTimeLeft();

        if (timeLeft>0) {
            const timeId=setInterval(findTimeLeft, 1000);

            return () => {
                console.log('I was called again');
                clearInterval(timeId);
            };
        }

    }, [timeLeft]);

    return (
        <div class="card">
        <div class="card-header">
        {isTimesUp(timeLeft)}
        </div>
        <div class="card-body">
        <h5 class="card-title">Price: {ticket.price}</h5>
        <p class="card-text"></p>
        <a  class="btn btn-primary" ><StripeCheckout
            token={(token)=>doRequest({token: token.id})}
            stripeKey="pk_test_51LmEuaCyEPeS0MkWmHywlxKKi6YWrRFxjfgsB5j3ieQqloy8V0RVhhYZvzK05L3gpnGFmPQE5n1JR20Men6ltTLC00T7qwtoS3"
            amount={order.ticket.price*100}
            email={currentUser.email}/> </a>
        </div>
    </div>
    );
};

OrderShow.getInitialProps = async (context, client) => {
    const { orderId } = context.query;
    const {data}= await client.get(`/api/orders/${orderId}`);
    return { order: data };
};

export default OrderShow;