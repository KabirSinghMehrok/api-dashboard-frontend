import React, { useState } from 'react';
import { Label, TextInput, Checkbox, Button, Alert } from 'flowbite-react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo.jpeg';
import { useNavigate, Link } from "react-router-dom";

const SignupPage = () => {
  const {signup} = useAuth();
  const [success, setSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    reset,
    watch
  } = useForm();
  
  const onSubmit = async (data) => {
    try {
      const modifiedData = {...data};
      delete modifiedData['confirm_password']
      // console.log(modifiedData);
      
      setLoading(true); // to avoid multiple submission
      const response = await signup(modifiedData)
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
        setSubmitError('Unable to register, please try again');
      }
    }
  }

  const onError = async () => {
    console.log("Func: onError, FIle: SignupPage.js")
  }

  // console.log(errors);
  
  return (
    <div className="flex justify-center items-center w-screen h-screen bg-signup bg-center">
      <div className='flex justify-center items-center w-screen h-screen backdrop-blur-sm'>
        <div className='flex flex-col justify-center items-center bg-white w-96 py-8 rounded-lg shadow-lg'>
          <img src={logo} className="w-24 mb-12"></img>
          <form className="flex flex-col gap-4 w-4/5" onSubmit={handleSubmit(onSubmit, onError)}>
            
            {/* Email */}
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="email1"
                  value="Your email"
                />
              </div>
              <TextInput
                id="email1"
                type="email"
                color={(errors.email) ? "failure" : null}
                placeholder="Enter valid email address"
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
            
            {/* Password */}
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
                color={(errors.password) ? "failure" : null}
                helperText={
                  (errors.password && errors.password.type === "required") ?
                    "Password is required" :
                    (errors.password && errors.password.type === "minLength") ?
                      "Password should be at-least 8 characters" : null
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

            {/* Confirm Password */}
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="password2"
                  value="Confirm password"
                />
              </div>
              <TextInput
                id="password2"
                type="password"
                color={(errors.confirm_password) ? "failure" : null}
                helperText={
                  (errors.confirm_password && errors.confirm_password.type === "required") ?
                    "Please enter confirmation password" :
                    (errors.confirm_password && errors.confirm_password.type === "validate") ?
                      errors.confirm_password.message : null
                }
                required={true}
                {...register("confirm_password", 
                  {
                    required: true, 
                    validate: (val) => {
                      if (watch('password') !== val) {
                        return 'Passwords do not match' // this return value is the message
                      }
                    },
                    minLength: 8
                  }
                )}
              />
            </div>
            {submitError !== '' ? 
              (<Alert color="failure">
                <span>
                  <span className="font-medium">
                    Info alert!
                  </span>
                  {' ' + submitError}.
                </span>
              </Alert>) :
              null
            }

            <div className="flex items-center gap-2">
              <Checkbox id="agree" />
              <Label htmlFor="agree">
                I agree with the{' '}
                <a
                  href="/terms"
                  className="text-blue-600 hover:underline dark:text-blue-500"
                >
                  terms and conditions
                </a>
              </Label>
            </div>
            
            <Button type="submit" disabled={loading}>
              Submit
            </Button>
            
            <Label className="mt-4 text-center">
                Already have an account?
                <Link
                  to="/login"
                  className="ml-1 text-blue-600 hover:underline dark:text-blue-500"
                >
                  Log in
                </Link>
              </Label>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;