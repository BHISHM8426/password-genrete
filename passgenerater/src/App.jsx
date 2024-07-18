import { useState , useCallback , useEffect , useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const  [number ,setNumber] = useState(false)
  const [ charrectr , setCharacter] = useState(false)
  const [ pass,setPass] = useState("")

  // useRef hook for refrence 
  const passwordref = useRef(null)

  const passwordgenerater = useCallback(()=>{
    let passwr = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(number) str +="0123456789"
    if(charrectr) str += "@#$%&*[]_`~!+=-_?/><"

    for (let i = 0; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length+1)
      passwr += str.charAt(char)
    }
   setPass(passwr)
      },[length ,number ,charrectr ,setPass])

      const copypasswordref = useCallback(()=>{
        passwordref.current?.select()
        passwordref.current?.setSelectionRange(0,99)
        window.navigator.clipboard.writeText(pass)
      },[pass])

      useEffect(()=>{passwordgenerater()},[length,number,charrectr,passwordgenerater])
  return (
    <>
    <div className='w-full max-w-md mx-auto shadow-md rounded px-4 py-3 my-8 bg-gray-800'> 
    <h1 className='text-4xl text-center my-3 text-white'>Password Generater</h1>
    <div className='w-full max-w-md shadow-md rounded-xl  my-8 text-orange-500 bg-white justify-center flex'>
     <input type="text"
      value={pass} className='outline-none w-full py-1 px-3 rounded-lg'
       placeholder='Password' readOnly
       ref={passwordref}/>
      <button className='bg-blue-800 p-3 text-white rounded-md' onClick={copypasswordref}>Copy</button>

    </div>
  <div className='flex text-sm gap-x-2'>
    <div className='flex items-center gap-x-1'>
      <input type="range" min={1} max={100} value={length} className='cursor-pointer' 
      onChange={(e)=>{setLength(e.target.value)}}/>
   <label className='text-white'> Length :{length}</label>
    </div>
    <div className='flex items-center gap-x-1'>
     <input type="checkbox"
     defaultChecked={number} 
     id='numberinput'
     onChange={()=>{
      setNumber((prev) => !prev);
     }}/>
     <label className='text-white' >Numbers</label>
    </div>
    <div className='flex items-center gap-x-1'>
       <input type="checkbox" 
       defaultChecked={charrectr}
       id='charrectrinput'
       onChange={()=>{
        setNumber((prev) => !prev);
       }}
       />
       <label className='text-white' >Characters</label>
    </div>

  </div>

    </div>
    
    </>
  )
}

export default App
