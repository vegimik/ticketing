import buildClient from "../api/build.client";
import axios from "axios";

const LoadingPage= ({ currentUser})=>{
    console.log(currentUser);

    return currentUser?
    (<h1>You are signed in</h1>)
    :
    (<h1>You are NOT signed in</h1>)
}

LoadingPage.getInitialProps = async context=>{
    console.log(context);
    
    let client={};
    if (typeof window === 'undefined') {
        //we are on the server
        client= axios.create({
            baseURL: 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
        })
    }
    else{
        //we are on the browser
        client= axios.create({
            baseURL:'/'
        })
        }

        
    const { data } = await client.get('/api/users/currentuser');
  
    return data;
}    

export default LoadingPage;