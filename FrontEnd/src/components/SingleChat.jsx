import React from 'react'
import userLogo from '../assets/userLogo.svg';
import botLogo from '../assets/botLogo.svg';
const SingleChat = ({question, answer}) => {
  return (
    <div className='SingleChatComponent' >
                 <div className="UserQuestion">
                       <img src={userLogo} alt="" className='customLogos' /> {question}
               
                  </div>
                     <div className="botResponse">
                        <img src={botLogo} alt="" className='customLogos' /> <p dangerouslySetInnerHTML={{__html: answer}}></p>
                </div>
      
    </div>
  )
}

export default SingleChat
