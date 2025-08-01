import React, { useState, useCallback, useEffect, useRef } from 'react'

const App = () => {
  let [lenth, setlenth] = useState(5);
  let [numberallow, setnumberallow] = useState('false');
  let [charallow, setcharallow] = useState('false');
  let [password, setpassword] = useState('');

  let copyref = useRef(null);

  const createpassword = useCallback(() => {
    let pass = ''
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberallow) str += "0123456789";
    if (charallow) str += " !@#$%^&*()_+-=[]{}|;:,.<>?/`~ ";

    for (let i = 1; i <= lenth; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setpassword(pass);

  }, [lenth, numberallow, charallow, setpassword]);

  let copyPasswordToClipboard = useCallback(() => {
    copyref.current?.select();
    copyref.current?.setSelectionRange(0,100);
    window.navigator.clipboard.writeText(password);

  }, [password]);

  useEffect(() => {
    createpassword()
  }, [lenth, numberallow, charallow, createpassword]);

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-green-500'>
        <h2 className='text-center font-semibold my-3'>Password Generator</h2>
        <div className='flex shadow rounded-lg overflow-hidden mb-5'>
          <input type='text' value={password} className='outline-none bg-white w-full py-1 px-3'
            placeholder='password' readOnly ref={copyref}>
          </input>
          <button className='outline-none bg-blue-500 hover:bg-blue-700 active:scale-96 transition transform duration-150 text-white px-3 py-2 shrink-0 cursor-pointer
          ripple'
            onClick={copyPasswordToClipboard}>Copy</button>
        </div>
        <div className='flex text-sm gap-x-2.5'>
          <div className='flex items-center gap-x-1'>
            <input type="range"
              min={5}
              max={100}
              value={lenth}
              onChange={(e) => { setlenth(e.target.value) }}
              className='cursor-pointer' />
            <label>length:  {lenth}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox"
              defaultChecked={numberallow}
              id='numberinput'
              onChange={() => {
                setnumberallow((prev) => !prev);
              }} />
            <label htmlFor='numberinput'>Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox"
              defaultChecked={charallow}
              id='charinput'
              onChange={() => {
                setcharallow((prev) => !prev);
              }} />
            <label htmlFor='charinput'>Characters</label>
          </div>

        </div>
      </div>

    </>
  )
}

export default App