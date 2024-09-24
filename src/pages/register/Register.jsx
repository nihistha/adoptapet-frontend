import React,{useState} from 'react'
import './register.css'
import { MdEmail } from "react-icons/md";
import { FaUser,FaPhone,FaLock } from "react-icons/fa";
import { registerUserApi } from '../../apis/Api';
import { toast } from 'react-toastify'

const Register = () => {

  const[fullname,setFullname] = useState('')
  const[phonenumber,setPhonenumber] = useState('')
  const[email,setEmail] = useState('')
  const[password,setPassword] = useState('')
  const[confirmPassword,setConfirmPassword] = useState('')

  const[fullnameerror,setFullnameError] = useState('')
  const[phonenumbererror,setPhonenumberError] = useState('')
  const[emailerror,setEmailError] = useState('')
  const[passworderror,setPasswordError] = useState('')
  const[confirmpassworderror,setConfirmPasswordError] = useState('')

  const handleFullname = (e) => {
    setFullname(e.target.value)
  }
  const handlePhonenumber = (e) => {
    setPhonenumber(e.target.value)
  }
  const handleEmail = (e) => {
    setEmail(e.target.value)
  }
  const handlePassword = (e) => {
    setPassword(e.target.value)
  }
  const handleConfPassword =(e)=>{
    setConfirmPassword(e.target.value)
  }
  var validate =() =>{
    var isValid = true;
    if(fullname.trim()===''){
      setFullnameError('Please exter firstname')
      isValid = false;
    }
    if(phonenumber.trim()===''){
      setPhonenumberError('Please exter lastname')
      isValid = false;
    }
    if(email.trim()===''){
      setEmailError('Please exter email')
      isValid = false;
    }
    if(password.trim()===''){
      setPasswordError('Please exter password')
      isValid = false;
    }
    if(confirmPassword.trim()===''){
      setConfirmPasswordError('Please Confirm password')
      isValid = false;
    }
    if(password!== confirmPassword){
      setConfirmPasswordError("Password does not match")
      isValid = false;
    }
    return isValid;
  }
  const handleButton =(e)=>{
    e.preventDefault()
    var isValid = validate()
    if(!isValid){
      return; 
    }
    //Making Api request
    //Making JSON object of register data
    const data ={
      "fullname" : fullname,
      "phonenumber" : phonenumber,
      "email" : email,
      "password" : password
    }
    registerUserApi(data).then((res) => {
        if(res.data.success === false){
          toast.error(res.data.message);
        }else{
          toast.success(res.data.message);
        }
      })
    }

  return (
    <>
    <div className='register-body'>
    <div className = 'wrapper register'>
        <div className = "form-box register">
            <form action = "">
                <h1>Sign Up</h1>
                <div className = "input-box">
                    <input onChange={handleFullname} type = "text"
                    placeholder='Full Name' required />
                    <FaUser className='icon' />
                    {
                      fullnameerror && <small>{fullnameerror}</small>
                    }
                </div>
                <div className = "input-box">
                    <input onChange={handlePhonenumber} type = "text"
                    placeholder='Phone Number' required />
                    <FaPhone className='icon' />
                    {
                      phonenumbererror && <small>{phonenumbererror}</small>
                    }
                </div>
                <div className = "input-box">
                    <input onChange={handleEmail} type = "email"
                    placeholder='Email' required />
                    <MdEmail className='icon' />
                    {
                      emailerror && <small>{emailerror}</small>
                    }
                </div>
                <div className = "input-box">
                    <input onChange={handlePassword} type = "password"
                    placeholder='Password' required />
                    <FaLock className='icon' />
                    {
                      passworderror && <small>{passworderror}</small>
                    }
                </div>
                <div className = "input-box">
                    <input onChange={handleConfPassword} type = "password"
                    placeholder='Confirm Passwprd' required />
                    <FaLock className='icon'/>
                    {
                      confirmpassworderror && <small>{confirmpassworderror}</small>
                    }
                </div>
                <button onClick ={handleButton} type = "submit">Sign Up</button>
                <div className = "register-link">
                    <p>Already have an account? 
                        <a href = "../login">
                            Login
                        </a>
                        </p>
                </div>
            </form>
        </div>
    </div>
    </div>
    </>
  );
}

export default Register
