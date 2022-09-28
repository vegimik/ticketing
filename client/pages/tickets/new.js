import { useState } from "react";
import Router from 'next/router';
import useRequest from "../../hooks/use-request";

const NewTicket=()=>{
    const[title,setTitle]=useState('');
    const[price,setPrice]=useState('');
    const {doRequest,errors}=useRequest({
        url:'/api/tickets',
        method:'post',
        body:{
            title,
            price
        },
        onSuccess:()=>Router.push('/')
    });


    const onBlur=()=>{
        const value=parseFloat(price);
        if(isNaN(value)){
            return;
        }
        setPrice(value.toFixed(2));
    }

    const onSubmit=async (event)=>{
        event.preventDefault();
        const data=await doRequest();
    }        

    return <div>
        <h1>Create a Ticket</h1>
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label>Title</label>
                <input className="form-control" value={title} onChange={(e)=>{setTitle(e.target.value)}}/>
            </div>
            <div className="form-group">
                <label>Price</label>
                <input className="form-control" 
                value={price} 
                onChange={(e)=>{setPrice(e.target.value)}} 
                onBlur={onBlur}/>
            </div>
            <button type="submit" 
            className="btn btn-primary float-end mt-3"
            >Submit</button>
            <div class="row">
                <div class="col-12">
                    {errors}
                </div>
            </div>
            
        </form>
    </div>

}

export default NewTicket;