import { useState, useEffect } from "react";
import {Link,Route} from 'react-router-dom';


const App = () => {
  const [value, setValue] = useState(null);
  const [message, setMessage] = useState(null);
  const [previousChats, setpreviousChats] = useState([]);
  const [currentTitle, setcurrentTitle] = useState();
  const createnewchat=()=>{
    setMessage(null)
    setValue("");
    setcurrentTitle(null);
  }
  
  const handleClick=(uniqueTitle)=>{
    setcurrentTitle(uniqueTitle);
    setValue("");
    setMessage(null)

  }
  const RedirectPage = () => {
    useEffect(() => {
      window.location.replace('https://www.google.com')
    }, [])
  }

  const getMessages = async () => {
    const options = {
      method: "POST",
      body: JSON.stringify({
        message: value
      }),
      headers:
      {
        "Content-Type": "application/json"
      }
    }
    try {
      const resp = await fetch('http://localhost:8000/completions', options)
      const data = await resp.json();
      // console.log(data);
      setMessage(data.choices[0].message)
    }
    catch (error) {
      console.error(error);
    }
  }
  const currentchat=previousChats.filter(Chat=>Chat.title===currentTitle);
  console.log("current title is"+currentTitle );
  
  const uniqueTitles=Array.from(new Set(previousChats.map(previousChat=>previousChat.title)))
  console.log("unique title is"+uniqueTitles );
  // console.log(previousChats)
  // console.log(message);
  useEffect(() => {
    console.log(currentTitle, value, message);
    if (!currentTitle && value && message) {
      setcurrentTitle(value)
    }
    else if (currentTitle && value && message) {
      setpreviousChats(() => ([...previousChats,
      {
        title:currentTitle,
        role:"user",
        content:value

      },
      {
        title:currentTitle,
        role:message.role,
        content:message.content
      }]))
    }

  }, [message, currentTitle])
  console.log(previousChats);

  
  return (
    <div className="app">
      <section className="side-bar">
        <button onClick={createnewchat}>+ New Chat</button>
        <ul className="history">
          {uniqueTitles?.map((Title,index)=><li key={index} onClick={()=>handleClick(Title)}>{Title}</li>)}
        </ul>
        <nav>
        <p>Made in India 🖤 by Mahindra&Mahindra</p>
       
        </nav>
      </section>
      <section className="main">
        {!currentTitle && <h1>GTR</h1>}
        <ul className="feed">
          {currentchat?.map((chatMessage,index)=><li key={index}>
          <p className="role">{chatMessage.role}</p>
          <p>{chatMessage.content}</p></li>)}

        </ul>
        <div className="bottom-section">
          <div className="input-container">
            <input value={value} onChange={(e) => setValue(e.target.value)}></input>
            <div id="submit" onClick={getMessages}>▶</div>
          </div>
          <p className="info">Chat Gt 500 july 1 version.
            Free fck preview. Enjoy ur stay</p>
        </div>

      </section>
    </div>
  )
}
export default App;