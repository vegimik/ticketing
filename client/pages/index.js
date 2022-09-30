import buildClient from "../api/build.client";
import axios from "axios";
import Link from "next/link";

const LoadingPage= ({ currentUser, tickets})=>{
    return (
        <div>
            <h1>Loading Page</h1>
           
        </div>
    )
}

LoadingPage.getInitialProps = async (context, client, currentUser)=>{   
    return {};
}    

export default LoadingPage;