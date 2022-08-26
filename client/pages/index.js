import axios from 'axios';
import useRequest from '../hooks/use-request';

const LoadingPage= ({ currentUser})=>{
    console.log(currentUser);


    return <h1>Loading, HomePage ...</h1>
}

LoadingPage.getInitialProps = async (context)=>{
    if (typeof window === 'undefined') {
        //we are on the server
        const {data} = await axios.get('http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser', {
            headers:{
            Host: 'ticketing.dev'
            }
    });
        return data;
    }
    else{
        //we are on the browser
        var {data}=await axios.get('/api/users/currentuser')
        return data;
    }
    

    console.log('I am in the getInitialProps');
    return {}; //response.data
}

export default LoadingPage;