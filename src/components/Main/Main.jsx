import React, { useContext } from 'react';
import { assets } from "../../assets/assets";
import "./Main.css";
import { Context } from '../../Context/Context';

const Main = () => {

  const { onSent, recentPrompt, input, setInput, showResult, loading, resultData, prevPrompts } = useContext(Context);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); 
      onSent(input);
    }
  };

  return (
    <div className='mainBarContainer'>
      <div className="navContainer">
        <h3>Gemini</h3>
        <img src={assets.user_icon} alt="user"/>
      </div>

      {!showResult ? (
        <>
          <div className="middleContainer">
            <h1>Hello, Dev.<br />How Can I Help You Today?</h1>
            <div className="cardsContainer">
              <div className='card'>
                <p>Suggested beautiful places to see on an upcoming road trip</p>
                <img src={assets.compass_icon} alt="compass"/>
              </div>
              <div className='card'>
                <p>Briefly Summarize this Concept: Urban Planning</p>
                <img src={assets.bulb_icon} alt="bulb"/>
              </div>
              <div className='card'>
                <p>Brainstorm team bonding activities are for our work retreat</p>
                <img src={assets.message_icon} alt="message"/>
              </div>
              <div className='card'>
                <p>Improve readability of the following code</p>
                <img src={assets.code_icon} alt="code"/>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="result">
          <div className="result-title">
            <img src={assets.user_icon} alt="user icon" />
            <p>{recentPrompt}</p>
          </div>
          <div className="resultData">
            <img src={assets.gemini_icon} alt="gemini icon" />
            {loading ? (
              <div className='loader'>
                <hr />
                <hr />
                <hr />
              </div>
            ) : (
              <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
            )}
          </div>
        </div>
      )}

      <div className="bottomContainer">
        <div className="inputContainer">
          <input 
            type='text' 
            placeholder='Enter Your Query' 
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
            onKeyDown={handleKeyPress}
          />
          <img src={assets.gallery_icon} alt="gallery"/>
          <img src={assets.mic_icon} alt="mic"/>
          {input ? <img src={assets.send_icon} alt="send" onClick={() => onSent(input)} /> : null}
        </div>
        <p>Gemini AI may produce inaccurate information. So please be aware of the information.</p>
      </div>
    </div>
  );
};

export default Main;
