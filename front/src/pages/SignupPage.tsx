import { useState } from "react"
import api from "../../api/axios.ts"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"


interface FormData  {
    username:string,
    email:string,
    password:string,
}

const SignupPage = () => {
    const [form,setForm] = useState<FormData>({username:"",email:"",password:""})
    const navigate = useNavigate()
    const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setForm({...form,[e.target.name]:e.target.value})
    }
    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        try {
            if (!form.username || !form.email || !form.password){
                return toast.error("Please fill all fields")
            } 
            const response = await api.post('/api/auth/signup',form)
            localStorage.setItem("user",response.data.user)
            localStorage.setItem("token", response.data.token) 

            toast.success("Signed up!")
            navigate('/')
        } catch (error) {
            console.log((error as Error).message)
        }
        
    }
  return (
    <div className="flex flex-col w-full h-screen justify-center items-center">
        <h1 className="flex text-4xl font-serif font-semibold mb-3">Sign up</h1>
        <div className="border rounded-lg p-15 text-2xl">
            <form onSubmit={handleSubmit}>
        <div className="flex flex-col  p-4">
            <div className="py-1">
                <label className="mr-2">username: </label>
                <input type="text" name="username" onChange={handleChange} className="h-9 bg-white pl-2 rounded-2xl text-black text-lg" />
            </div>
            <div className="py-1">
                <label className="mr-16">email: </label>
                <input type="text" name="email" onChange={handleChange} className="h-9 bg-white pl-2 rounded-2xl text-black text-lg" />
            </div>
            <div className="py-1">
                <label className="mr-4">password: </label>
                <input type="text" name="password" onChange={handleChange} className="h-9 bg-white pl-2 rounded-2xl text-black text-lg" />
        </div>
        </div>
        <button type="submit" className="flex mx-auto px-4 py-2 bg-zinc-400 rounded-3xl hover:scale-105 transition-all ease-out duration-1000 " >Submit</button>
      </form>
      <div className="flex mt-4">
        <p className="font-serif text-lg mx-auto">Already Have an account? <span className="font-bold cursor-pointer" onClick={()=>{navigate('/login')}}>Log in!</span></p>
      </div>
        </div>
    </div>
  )
}

export default SignupPage
