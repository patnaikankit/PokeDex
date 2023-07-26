import { useEffect, useState } from 'react'
import { getData, getPokemon } from './services/data.jsx'
import './App.css'
import Card from './components/Card/index.jsx'
import Navbar from './components/Navbar/index.jsx';


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
      console.log(response);
      // loading is set as false bcoz we have retrieved the data
      await loadingData(response.results);
      setLoading(false);
    }
    fetchData();
  }, [])

  const next = async () => {
    setLoading(true);
    let data = await getData(nextUrl);
    await loadingData(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  }

  const prev = async () => {
    if(!prevUrl){
      return ;
    }
    setLoading(true);
    let data = await getData(prevUrl);
    await loadingData(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  }

  // iterating over all qualities and storing the data
  const loadingData = async (data) => {
    let value = await Promise.all(data.map(async value => {
      let record = await getPokemon(value.url);
      return record;
    }))
    setpokeData(value)
  }

  return (
    <>
      <Navbar />
      <div>
        {loading ? <h1 style={{ textAlign: 'center' }}>Loading...</h1> : (
          <>
            <div className="grid-container">
              {pokeData.map((pokemon, i) => {
                return <Card key={i} pokemon={pokemon} />
              })}
            </div>
            <div className="btn">
              <button onClick={prev}>Prev</button>
              <button onClick={next}>Next</button>
            </div>
          </>
        )}
      </div>
    </>
  );
  
}

export default App
