import React from 'react';
import { ClipLoader } from 'react-spinners';

const Spinners = ({loading}) =>{
    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
            <ClipLoader color='#36d7b7' loading={loading} size={50} />
        </div>
    )
}
export default Spinners;
