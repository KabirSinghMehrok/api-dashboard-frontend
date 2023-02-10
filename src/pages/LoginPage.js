import React, { useState } from 'react';
import { Label, TextInput, Checkbox, Button, Alert } from 'flowbite-react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo.jpeg';
import { useNavigate, Link } from "react-router-dom";
import LoginOAuth from '../components/loginOAuth';
import { useEffect } from 'react';
import { gapi } from 'gapi-script';

// for GoogeOAuth
const clientId = "991312066352-4sh6kvg5rc91cbu54kn8hpclss7nlq39.apps.googleusercontent.com";

const LoginPage = () => {
  const {login} = useAuth();
  const [success, setSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    function start(){
      gapi.client.init({
        clientId: clientId,
        scope: ""
      })
    };

    gapi.load('client:auth2', start);
  });

  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    reset
  } = useForm();
  
  const onSubmit = async (data) => {
    try {
      // console.log(data);
      
      setLoading(true); // to avoid multiple submission
      const response = await login(data)
      setLoading(false);

      setSuccess(true);
      navigate('/');
      reset();
    }
    catch (err) {
      if (!err?.response) {
        setSubmitError('No response from server');
      }
      else if (err.response?.status == 400) {
        setSubmitError('Missing username or password');
      }
      else if (err.response?.status == 401) {
        setSubmitError('User unauthorized, please recheck credentials');
      }
      else {
        setSubmitError('Unable to login, please try again');
      }
    }
  }

  const onError = async () => {
    console.log("Func: onError, FIle: LoginPage.js")
  }

  // console.log(errors);
  
  return (
    <div className="flex justify-center items-center w-screen h-screen bg-signup bg-center">
      <div className='flex justify-center items-center w-screen h-screen backdrop-blur-sm'>
        <div className='flex flex-col justify-center items-center bg-white w-96 py-8 rounded-lg shadow-lg'>        
        <img src={logo} className="w-24 mb-12"></img>
          <form className="flex flex-col gap-4 w-4/5" onSubmit={handleSubmit(onSubmit, onError)}>
            <div>
              <LoginOAuth />
              <div className="mb-2 block">
                <Label
                  htmlFor="email1"
                  value="Your email"
                />
              </div>
              
              <TextInput
                id="email1"
                type="email"
                placeholder="Email address"
                color={(errors.email) ? "failure" : null}
                helperText={
                  (errors.email && errors.email.type === "required") ?
                  "Email is required" :
                    (errors.email && errors.email.type === "pattern") ?
                    "Enter valid email ID" : null
                }
                required={true}
                {...register("email", 
                  {
                    required: true, 
                    pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/
                  }
                )}
              />
            </div>
            
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="password1"
                  value="Your password"
                />
              </div>
              <TextInput
                id="password1"
                type="password"
                placeholder="Password"
                color={(errors.password) ? "failure" : null}
                helperText={
                  (errors.password && errors.password.type === "required") ?
                  "Password is required" :
                    (errors.password && errors.password.type === "minLength") ?
                    "Password should be at-least 8 characters." : null
                }
                required={true}
                {...register("password", 
                  {
                    required: true, 
                    minLength: 8
                  }
                )}
              />
            </div>
            {console.log(submitError)}
            {submitError &&  
              <Alert color="failure">
                <span>
                  <span className="font-medium">
                    Info alert!
                  </span>
                  {' ' + submitError}.
                </span>
              </Alert>
            }
            <div className="flex items-center gap-2">
              <Checkbox id="remember" />
              <Label htmlFor="remember">
                Remember me
              </Label>
            </div>

            <Button type="submit" disabled={loading}>
              Submit
            </Button>

            <Label className="mt-4 text-center">
                Don't have an account?
                <Link
                  to="/signup"
                  className="ml-1 text-blue-600 hover:underline dark:text-blue-500"
                >
                  Sign up
                </Link>
              </Label>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;