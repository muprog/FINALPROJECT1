// import axios from 'axios';
// import React, { useEffect, useState } from 'react'
// import { json } from 'react-router-dom';

// export default function ViewFeedBack() {
//     const [data,setData]=useState([]);
//     useEffect(()=>{
// axios.get('/get-feedback')
//      .then(res=>setData(res.data))
//      .catch(err=>console.log(err))
//     },[])
    
//   return (
//     <div>
//         <table>
//         <tr><td>Username</td><td>Feedback</td></tr>
//       {data && 
//       data.map(Element=>
//      <tr>
//       <td> {Element.username}</td>
//       <td> {Element.message}</td>
//     </tr>
//       )}
//       </table>
//     </div>
//   )
// }
import '../style/feedback.css'
import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function ViewFeedBack() {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('/get-feedback')
            .then(res => setData(res.data))
            .catch(err => console.log(err));
    }, []);

    return (
        <div className="feedback-container">
            <table className="feedback-table">
                <thead>
                    <tr className="feedback-header">
                        <th className="feedback-th">Username</th>
                        <th className="feedback-th">Feedback</th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.map(Element => (
                        <tr key={Element.id} className="feedback-row">
                            <td className="feedback-td">{Element.username}</td>
                            <td className="feedback-td">{Element.message}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

