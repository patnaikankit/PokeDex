import { useEffect, useState } from 'react'
import './App.css'

function App() {
  // for actual setting and storing data
  const [pokeData, setpokeData] = useState([]);
  // to store the following pages
  const [nextUrl, setNextUrl] = useState('');
  // to store previous pages
  const [prevUrl, setPrevUrl] = useState('');
  // to handle the state when data is fetched from the api
   const [loading, setLoading] = useState(true);
  // the first page
  const baseUrl = 'https://pokeapi.co/api/v2/pokemon';

  useEffect(() => {
    async function fetchData(){
      let response = await getData(baseUrl);
      // referencing the pages
      setNextUrl(response.next);
      setPrevUrl(response.previous);
      // loading is set as false bcoz we have retrieved the data
      setLoading(false);
    }
  }, [])

  return (
    <div className='App'>
          {loading ? <h1>Loading....</h1> : null}
          {loading === false && <h1>Data fetched...</h1>}
    </div>
  )
}

export default App
