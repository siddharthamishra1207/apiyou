
import { useEffect, useState } from 'react';
import './App.css';

function App() {

 const [endpoint, setEndpoint ] = useState('')
 const [container, setContainer] = useState([])


 useEffect(() =>{
  fetchMe()
}, [endpoint])


const url= `https://imdb8.p.rapidapi.com/auto-complete?q=+${endpoint}` ;
const fetchMe = async () =>{

    const options = {
        method: 'GET',
        url: 'https://imdb8.p.rapidapi.com/auto-complete',
        params: {q: 'game of thr'},
        headers: {
          'X-RapidAPI-Key': '4c8de3d60emsh10eb997cb43ce17p119a59jsn5f9a14a86e3c',
          'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
        }
      };
      const response = await axios.request(options);
      return response.json();
  

}

  const onChangeHandler = (e) => {
    setEndpoint(e.target.value)
  }

  const submitHandler = e => {
    e.preventDefault()
  }

  return (
    <div className="App">

      <form onSubmit={submitHandler} >

        <input type='text'  onChange={onChangeHandler} />
        <button type='submit ' >
          submit
        </button>

      </form>

      {container.map((item) =>{
         return(
          <p>
              {item.l}
          </p>
         )
      } )}
      
    </div>
  );
}

export default App;
