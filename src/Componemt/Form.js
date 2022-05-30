import React,{useState,useEffect} from 'react'

const Form = ({show}) => {
    const [name,setName] = useState('')
  const [phone,setPhone] = useState('')
  
  useEffect(() => {
    if(name)
    {
      const data = setTimeout(() => {console.log('effect')},1000)
      return () => {
        clearTimeout(data)
      }
    }
  },[name])

  return (
    show&&
    <div className='form'>
    <label>Name</label>
    <input type='text' onChange={(e) => setName(e.target.value)} />
    <label>Phone</label>
    <input type='number' onChange={(e) => setPhone(e.target.value)}/>
    <div className='data'>
       <h1>Name : {name}</h1>
       <h1> phone :{phone}</h1>
    </div>
    </div>
  )
}

export default Form