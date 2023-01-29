import React from 'react';
import { Label, TextInput, Checkbox, Button } from 'flowbite-react';

const LoginPage = () => (
  <div className='flex justify-center items-center w-screen h-screen'>
    <div className='flex justify-center items-center bg-white w-96 py-8 rounded-lg shadow-lg'>
      <form className="flex flex-col gap-4 w-4/5">
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
            placeholder="Email address"
            required={true}
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
            required={true}
          />
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="remember" />
          <Label htmlFor="remember">
            Remember me
          </Label>
        </div>
        <Button type="submit">
          Submit
        </Button>
      </form>
    </div>
  </div>
);

export default LoginPage;