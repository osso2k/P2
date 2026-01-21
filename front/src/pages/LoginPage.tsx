import { useState } from "react"
import api from "../../api/axios.ts"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"


interface FormData  {
    email:string,
    password:string,
}

const LoginPage = () => {
    const [form,setForm] = useState<FormData>({email:"",password:""})
    const navigate = useNavigate()
    const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setForm({...form,[e.target.name]:e.target.value})
    }
    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        try {
            if (!form.email || !form.password){
                return toast.error("Please fill all fields")
            } 
            const response = await api.post('/api/auth/login',form)
            localStorage.setItem("user",response.data.user)
            localStorage.setItem("token", response.data.token) 

            toast.success("Logged in!")
            navigate('/')
        } catch (error) {
            console.log((error as Error).message)
        }
        
    }
  return (
    <div className="flex flex-col w-full h-screen justify-center items-center">
        <h1 className="flex text-4xl font-serif font-semibold mb-3">Log In</h1>
        <div className="border rounded-lg p-15 text-2xl">
              <form onSubmit={handleSubmit}>
        <div className="flex flex-col px-6 ">
            <div className="flex flex-wrap pb-2">
                <label className="mr-14">Email: </label>
                <input type="text" name="email" onChange={handleChange} className="border bg-white pl-2 h-9 rounded-2xl text-black text-lg" />
            </div>
            <div>
                <label className="mr-2">password: </label>
                <input type="text" name="password" onChange={handleChange} className="border bg-white pl-2 h-9 rounded-2xl text-black text-lg" />
        </div>
        </div>
        <button type="submit" className="px-4 flex mx-auto py-2 bg-zinc-400 rounded-3xl hover:scale-105 mt-6 transition-all ease-out duration-1000 " >Submit</button>
      </form>
      <div className="flex w-full mt-4">
        <p className="mx-auto text-lg font-serif">Don't Have an account? <span className="font-bold cursor-pointer" onClick={()=>{navigate('/signup')}}>Sign up!</span></p>
      </div>
        </div>
    </div>
  )
}

export default LoginPage
