import Background from '@/assets/login2.png'
import Victory from "@/assets/victory.svg";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { apiClient } from '@/lib/api-client';
import { useAppStore } from '@/store';
import { LOGIN_ROUTE, SIGNUP_ROUTE } from '@/utils/constants';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const Auth = () => {
  const navigate = useNavigate()
  const {setUserInfo} = useAppStore()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const validateLogin = () => {
    if(!email || !password){
      toast.error("All fields are required")
      return false
    } else if(password.length<6) {
      toast.error("Password must be at least 6 characters")
      return false
    } else {
      return true
    }
  }
  
  const validateSignup = () => {
    if(!email || !password || !confirmPassword){
      toast.error("All fields are required")
      return false
    } else if(password !== confirmPassword){
      toast.error("Passwords do not match")
      return false
    } else if(password.length<6) {
      toast.error("Password must be at least 6 characters")
      return false
    } else {
      return true
    }
  }

  const handleLogin = async() => {
    if(validateLogin()){
      try {
        const responce = await apiClient.post(LOGIN_ROUTE, { email, password }, {withCredentials: true})
        if(responce.data.user._id){
          setUserInfo(responce.data.user)
          if(responce.data.user.profileSetup){
            navigate('/chat')
          } else {
            navigate('/profile')
          }
        }
        console.log(responce)
      } catch (error) {
        if(error.message === "Request failed with status code 400") {
          toast.error("Please provide valid credentials")
        }
      }
    }
  }
  const handleSignup = async() => {
    if(validateSignup()) {
      try {
        const responce = await apiClient.post(SIGNUP_ROUTE, { email, password }, {withCredentials: true})
        if(responce.status === 201){
          setUserInfo(responce.data.user)
          navigate('/profile')
        }
        console.log(responce)
      } catch (error) {
        if(error.message === "Request failed with status code 400") {
          toast.error("Email already exists")
        }
      }
    }
  }
  
  return (
    <div className="h-[100vh] w-[100vw] flex justify-center items-center">
      <div className="h-[80vh] bg-white border-white text-opacity-90 shadow-2xl w-[80vw] md:w-[90vw] lg:w-[70vw] xl:w-[60vw] rounded-3xl grid xl:grid-cols-2">
        <div className="flex flex-col gap-10 justify-center items-center">
          <div className="flex items-center justify-center flex-col">
            <div className="flex justify-center items-center">
              <h1 className="text-5xl font-bold md:text-6xl">Welcome</h1>
              <img src={Victory} alt="Victory Emoji" className="h-[100px]" />
            </div>
            <p className="font-medium text-center">
              Fill the details to get started
            </p>
          </div>
          <div className="flex items-center justify-center w-full">
            <Tabs defaultValue='login' className="w-3/4">
              <TabsList className="bg-transparent rounded-none w-full">
                <TabsTrigger
                  value="login"
                  className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300"
                >
                  Login
                </TabsTrigger>
                <TabsTrigger
                  value="signup"
                  className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300"
                >
                  Signup
                </TabsTrigger>
              </TabsList>
              <TabsContent className="flex flex-col gap-5 mt-10" value="login">
                <input
                  type="email"
                  placeholder="Email"
                  className="rounded-full p-6"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="rounded-full p-6"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button className="rounded-full p-6" onClick={handleLogin}>Login</Button>
              </TabsContent>
              <TabsContent className="flex flex-col gap-5" value="signup">
              <input
                  type="email"
                  placeholder="Email"
                  className="rounded-full p-6"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="rounded-full p-6"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="ConfirmPassword"
                  className="rounded-full p-6"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <Button className="rounded-full p-6" onClick={handleSignup}>Signup</Button>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        <div className="hidden xl:flex justify-center items-center">
            <img src={Background} alt="login background" className='h-[600px]' />
        </div>
      </div>
    </div>
  );
};
export default Auth;
