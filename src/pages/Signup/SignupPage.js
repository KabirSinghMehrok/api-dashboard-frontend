import React from 'react';
import {Label, TextInput, Button} from 'flowbite-react'

const SignupPage = () => (
    <form className="flex flex-col gap-4">
        <div>
            <div className="mb-2 block">
                <Label
                    htmlFor="name"
                    value="Name"
                />
            </div>
            <TextInput
                id="name"
                type="text"
            />
        </div>
        <div>
            <div className="mb-2 block">
                <Label
                    htmlFor="phoneNumber"
                    value="Phone number"
                />
            </div>
            <TextInput
                id="phoneNumber"
                type="text"
            />
        </div>
        <div>
            <div className="mb-2 block">
            <Label
                htmlFor="username"
                value="Enter new username"
            />
            </div>
            <TextInput
            id="username"
            type="email"
            placeholder="abc@xyz.com"
            required={true}
            shadow={true}
            />
        </div>
        <div>
            <div className="mb-2 block">
                <Label
                htmlFor="password"
                value="Enter password"
                />
            </div>
            <TextInput
                id="password2"
                type="password"
                required={true}
                shadow={true}
            />
        </div>
        <div>
            <div className="mb-2 block">
                <Label
                htmlFor="repeat-password"
                value="Repeat password"
                />
            </div>
            <TextInput
                id="repeat-password"
                type="password"
                required={true}
                shadow={true}
            />
        </div>
        
        <Button type="submit">
            Register new account
        </Button>
    </form>
);

export default SignupPage;
