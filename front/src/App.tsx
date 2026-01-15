import { useEffect, useState } from "react"
import api from '../api/axios.ts';


const App = () => {
  const [data ,setData] = useState<string>('')
  useEffect(()=>{
    const getData = async ()=>{
      const response = await api.get("/")
      setData(response.data.message)
    }
    getData()
  },[])
  return (
    <div>
      <h1>Homepage</h1>
      <p>{data}</p>

    </div>
  )
}

export default App
