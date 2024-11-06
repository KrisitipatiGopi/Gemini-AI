import React, { useContext,useState } from 'react';
import { assets } from "../../assets/assets";
import "./Sidebar.css";
import { Context } from '../../Context/Context';

const Sidebar = () => {

  const [showSidebar, setShowSidebar] = useState(true);
  const { prevPrompts, setRecentPrompt, onSent,newChat } = useContext(Context);

  const loading = (prompt) => {
    setRecentPrompt(prompt);  // Set the clicked prompt as selected
    onSent(prompt);  // Trigger the send function
  };

  return (
    <div className='mainContainer'>
      <div className="topContainer">
        <img 
          src={assets.menu_icon} 
          alt='Menu icon' 
          onClick={() => setShowSidebar(prev => !prev)}
        />
        <div className='new_chatContainer' onClick={() => newChat()}>
          <img src={assets.plus_icon} alt='New chat icon'/>
          {!showSidebar ? <p>New Chat</p> : null}
        </div>
        <h3>Recent</h3>
        {!showSidebar && (
          <div className="questionsContainer">
            {prevPrompts.map((each, index) => (
              <div className="questionItem" key={index} onClick={() => loading(each)}>
                <img src={assets.message_icon} alt="Message icon" />
                <p>{each.slice(0, 18)} ...</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="bottomContainer">
        <div className="helpContainer">
          <img src={assets.question_icon} alt='Help icon' />
          {!showSidebar ? <p>Help</p> : null}
        </div>
        <div className="helpContainer">
          <img src={assets.history_icon} alt='Activity icon' />
          {!showSidebar ? <p>Activity</p> : null}
        </div>
        <div className="helpContainer">
          <img src={assets.setting_icon} alt='Settings icon' />
          {!showSidebar ? <p>Settings</p> : null}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
