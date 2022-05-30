import React,{useState,useEffect} from 'react'
import axios from 'axios';
import usePrevState from './hooks/usePrevState';


const InputSearch = () => {

  const [term,setTerm] = useState('react')
  const [result,setResult] = useState([])

  const prevTerm = usePrevState(term)

  useEffect (() => {
    const getUseer = async() => 
    {
      const respond = await axios.get('https://en.wikipedia.org/w/api.php',{
        params : {
          action:'query',
          list:'search',
          origin:'*',
          format:'json',
          srsearch:term
    }
    })
      setResult(respond.data.query.search) 
    }
  
    if(!result.length)
    {
      if(term)
      {
        getUseer()
      }
    }else if(prevTerm !== term)
    {
      const timeOut = setTimeout(() => {
        if(term)
        {
          getUseer()
        }
      },1200)
      return () => clearTimeout(timeOut)
    }
    
  },[term,result.length,prevTerm])


  const fetchResult = result.map(({title,pageid,snippet},index) => {
    return(
      <tr key={pageid}>
                <th scope='col'>{index+=1}</th>
                <th scope='col'>{title}</th>
                <th scope='col'>
                <span dangerouslySetInnerHTML={{"__html" :snippet}}/>
                </th>
      </tr>
    )
  })


  return (
    <div className='container'>
      <div className='row'>
        <div className='col'>
          <div className='my-3'>
            <label htmlFor='exampleFormControlInput1' className='form-label'>
              Search Input
            </label>
            <input
              type='text'
              className='form-control'
              id='exampleFormControlInput1'
              onChange={(e) => {setTerm(e.target.value)}}
              value={term}
            />
          </div>
        </div>
      </div>

      <div className='row'>
        <div className='col'>
          <table className='table'>
            <thead>
              <tr>
                <th scope='col'>#</th>
                <th scope='col'>Title</th>
                <th scope='col'>Desc</th>
              </tr>
            </thead>
            <tbody>
             
              {fetchResult}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default InputSearch