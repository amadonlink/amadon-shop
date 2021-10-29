import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './style.css';
import { register } from './../../actions/user-actions'
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';

function RegisterScreen(props) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [ confirmPassword, setConfirmPassword] = useState();
    const dispatch = useDispatch();

    const userRegister = useSelector((state) => state.userRegister);
    const { userInfo, loading, error } = userRegister;

    const redirect = props.location.search
    ? props.location.search.split('=')[1]
    : '/';

    const submitHandler = (e) => {
      e.preventDefault();
      if(password !== confirmPassword){
        alert("The password and confirm password don't match");
      }
      else{
        dispatch(
          register(name, email, password)
        );
      }
    };

    useEffect(() => {
      if(userInfo){
        props.history.push(redirect);
      }
    }, [props.history, redirect, userInfo]);


    return (
        <div>
        <form className="form" onSubmit={submitHandler}>
          <div>
            <h1>Create Account</h1>
          </div>
          {
            loading && <LoadingBox></LoadingBox>
          }
          {
            error && <MessageBox variant='danger'>{error}</MessageBox>
          }
            <div>
            <label htmlFor="text">Name</label>
            <input
              type="name"
              id="name"
              placeholder="Enter name"
              required
              onChange={(e) => setName(e.target.value)}
            ></input>
          </div>
          <div>
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              id="email"
              placeholder="Enter email"
              required
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter password"
              required
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>
          <div>
            <label htmlFor="confirmPassword">confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="confirm Password"
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></input>
          </div>
          <div>
            <label />
            <button className="primary" type="submit">
              Register
            </button>
          </div>
          <div>
            <label />
            <div>
            Alredy have an account?{' '} <Link to={`/signin?redirect=${redirect}`}>Sign-In</Link>
            </div>
          </div>
        </form>
      </div>
    )
}

export default RegisterScreen
