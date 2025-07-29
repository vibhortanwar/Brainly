import { useRef } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Signin() {
    const passwordRef = useRef<HTMLInputElement>(null);
    const usernameRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate()
    async function signin () {
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;
       try{
            const response = await axios.post(`${BACKEND_URL}/signin`, {
                username,
                password
            }, {
                withCredentials: true
            });
            const jwt = response.data.token;
            localStorage.setItem("token", jwt);
            navigate("/dashboard");
            alert("User signed in successfully");
        } catch (e) {
            if(axios.isAxiosError(e)) {
                alert(e.response?.data.message || "An error occurred");
            } else {
                alert("An unexpected error occurred");
            }
     }
    };
    return <div>
        <div className="flex flex-col h-screen w-screen bg-gray-200 justify-center items-center">
            <div className="bg-white p-4 rounded-md shadow-lg flex flex-col justify-center items-center">
                <Input placeHolder="Username" referance={usernameRef} />
                <Input placeHolder="Password" referance={passwordRef} />
                <div className="pt-2">
                    <Button onClick={signin} variant="secondary" text="Sign In" size="md"/>
                </div>
            </div>
        </div>
    </div>
}