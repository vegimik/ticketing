import axios from 'axios';
import {useState} from 'react';

export default ({url, method, body, onSuccess})=>{
    const [errors, setErrors] = useState([]);

    const doRequest= async (props={})=>{
        try {
            setErrors(null)
            const response=await axios[method](url,{...body, ...props});
            if (onSuccess) {
                onSuccess(response.data);
            }
            return response.data;
        } catch (error) {
            if (!error.response.data.errors) {
                setErrors(<div className="alert alert-danger">{error.message}</div>);                
            } else {
            setErrors(<div className="alert alert-danger">
            <h4>Ooops...</h4>
            <ul className='my-0'>
            {error.response.data.errors.map((error, index)=>(
                <li key={index}>{error.message}</li>
            ))}
            </ul>
        </div>);
        }
           
        throw error
        }
    }

    return {doRequest, errors}
}