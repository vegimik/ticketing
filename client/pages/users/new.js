import { useState } from "react";
import Router from 'next/router';
import useRequest from "../../hooks/use-request";

const UserNew=()=>{
    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('');
    const {doRequest,errors}=useRequest({
        url:'/api/users',
        method:'post',
        body:{
            email,
            password
        },
        onSuccess:()=>Router.push('/users')
    });


    const onBlur=()=>{
      
        
    }

    const onSubmit=async (event)=>{
        event.preventDefault();
        const data=await doRequest();
    }        

    return <div>
        <h1>Create a User</h1>
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label>User</label>
                <input className="form-control" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
            </div>
            <div className="form-group">
                <label>Password</label>
                <input type={'password'} className="form-control" 
                value={password} 
                onChange={(e)=>{setPassword(e.target.value)}} 
                onBlur={onBlur}/>
            </div>
            <button type="submit" 
            className="btn btn-primary float-end mt-3"
            >Submit</button>
            <div className="row">
                <div className="col-12">
                    {errors}
                </div>
            </div>
            
        </form>
    </div>

}

export default UserNew;