import {useState, useEffect} from 'react';
import axios from 'axios';
import {FaUserAlt, FaEnvelopeOpen, FaCalendarTimes, FaMap, FaPhone, FaLock} from 'react-icons/fa';
import '../components/random.css'
const Randomuser = () => {
    const [data, setData]=useState(null);
    const [loading, setLoading]=useState(false);
    const [showDetails, setShowDetails]=useState(null);

    const url ='https://randomuser.me/api/';

    const handleData = async ()=>{
        setLoading(true);
        try {
           const response = await axios.get(url);
           setData(response.data.results[0]);
        } catch (error) {
            console.error('Error fetching random user',error);
        }finally{
            setLoading(false);
        }
    };

    const handleIcon=(icon)=>{
        setShowDetails(icon);
    };

    useEffect(()=>{
        handleData();
    },[])

   
  return (
    <div className='user-details' >
        {data && (
        <div className='details'>
        <div className='img-container'>
        <img src={data.picture.large} alt="User" className='img'/>
        </div>
        <div className='icon-container'>

        <div className='icon' onClick={()=>{handleIcon('name')}}>
        {showDetails === 'name' && <div className='icon-text'>
        <p className='text'>My name is</p> <p className='data'>{data.name.first} {data.name.last}</p>
        </div>}
        <FaUserAlt/> 
        </div>

        <div className='icon' onClick={()=>{handleIcon('email')}}>
        {showDetails === 'email' && <div className='icon-text'>
        <p className='text'>My email is</p> <p className='data'>{data.email}</p></div>}
        <FaEnvelopeOpen/>
        </div>

        <div className='icon' onClick={()=>{handleIcon('age')}}>
        {showDetails === 'age' && <div className='icon-text'> 
        <p className='text'>My age is</p> <p className='data'>{data.dob.age}</p></div>}
        <FaCalendarTimes/>
        </div>

        <div className='icon' onClick={()=>{handleIcon('street')}}>
        {showDetails === 'street' && <div className='icon-text'>
        <p className='text'>My street is </p> <p className='data'>{data.location.street.number}, {data.location.street.name}</p></div>}
        <FaMap/>
        </div>

        <div className='icon' onClick={()=>{handleIcon('phone')}}>
        {showDetails === 'phone' && <div className='icon-text'>
        <p className='text'>My phone is</p> <p className='data'>{data.phone}</p></div>}
        <FaPhone/>
        </div>

        <div className='icon' onClick={()=>{handleIcon('password')}}>
        {showDetails === 'password' && <div className='icon-text'>
        <p className='text'>My password is</p> <p className='data'>{data.login.password}</p></div>}
        <FaLock/>
        </div> 
        </div>

        <div className='btn-container'>
        <button onClick={handleData} className='random-btn'>
        {loading? 'LOADING...':'RANDOM USER'}
        </button>
        </div>

        </div>
        )}

    </div>
  )
}

export default Randomuser