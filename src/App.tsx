import { useState, useEffect } from "react";


function App() {

  type Apidata = {
    name: string
    id: string
    username: string
    email: string
    address: {
      city: string; 
    }
  }
  const [response, setResponse] = useState<Apidata[]>([]);
  console.log(response);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        let res = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await res.json();
        setResponse(data);
      }
      catch (error) {
        console.error("error featching data", error);
      }
    };
    fetchData();
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      
    </div>
  )
}
export default App
