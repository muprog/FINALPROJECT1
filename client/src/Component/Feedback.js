// import axios from 'axios';
// import React, { useContext, useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom';
// import { userContext } from './UserContext';
// export default function Feedback() {
//     const [data,setData]=useState({feedback:''})
//     const navigate=useNavigate();
//     const {user}=useContext(userContext)
//     function handleInput(e){
//         const {name,value}=e.target;
// setData(prevData=>{
//     return{
//         ...prevData,
//         [name]:value
//     }
// })
//     }
//     function handleSubmit(e){
//         const {email}=user
//        const {feedback}=data   
// axios.post('/feedback',{feedback,email})
//     }

//     useEffect(()=>{
//         // console.log(user)
    
//     axios.get('/profile')
//          .then(res=>{
//           // console.log(res.data)
//         if(res.data==='null'){
//           navigate('/login')
//         }
//         })
//          .catch(err=>console.log(err));
//       },[]
//       )
//   return (
//     <div>
//         <form onSubmit={handleSubmit}>
//       <div><textarea placeholder='Write your feedback here...' name='feedback'onChange={handleInput} value={data.feedback}/></div>
//       <button type='submit'>submit</button>
//         </form>
//     </div>
//   )
// }
import '../style/sendfeedback.css'
import '../style/sendfeedback.css'
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userContext } from './UserContext';

export default function Feedback() {
    const [data, setData] = useState({ feedback: '' });
    const navigate = useNavigate();
    const { user } = useContext(userContext);

    function handleInput(e) {
        const { name, value } = e.target;
        setData(prevData => {
            return {
                ...prevData,
                [name]: value
            };
        });
    }

    function handleSubmit(e) {
        e.preventDefault(); // Prevent default form submission
        const { email } = user;
        const { feedback } = data;
        axios.post('/feedback', { feedback, email })
            .then(res => {
                // Handle successful submission
                console.log('Feedback submitted successfully');
                setData({ feedback: '' }); // Clear the textarea after submission
            })
            .catch(err => console.log(err));
    }

    useEffect(() => {
        axios.get('/profile')
            .then(res => {
                if (res.data === 'null') {
                    navigate('/login');
                }
            })
            .catch(err => console.log(err));
    }, [navigate]);

    return (
        <div className='feedback-container'>
            <div className='feedback-header-form'>
                <h1 className='feedback-heading'>Send your Feedback</h1>
                <form onSubmit={handleSubmit} className='feedback-form'>
                    <div className='feedback-textarea-container'>
                        <textarea
                            className='feedback-textarea'
                            placeholder='Write your feedback here...'
                            name='feedback'
                            onChange={handleInput}
                            value={data.feedback}
                        />
                    </div>
                    <button type='submit' className='feedback-submit-button'>Submit</button>
                </form>
            </div>
        </div>
    );
}
