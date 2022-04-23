import React, { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
axios.defaults.withCredentials = true;

function Chatbot() {
    const [dialogs, setDialogs] = useState([
        {
            who : '',
            text : ''
        }
    ]);

    useEffect(() => {
        eventQuery('welcomeTo')
    },[])

    const textQuery = async (text) => {
        //  First  Need to  take care of the message I sent     
        let conversation = {
            who: 'user',
            content: {
                text: {
                    text: text
                }
            }
        }

        // console.log('text I sent', conversation)
        console.log(conversation.who)
        console.log(conversation.content.text.text)
        
        // We need to take care of the message Chatbot sent 
        const textQueryVariables = {
            text
        }
        try {
            // I will send request to the textQuery ROUTE 
            const response = await axios.post(`http://${window.location.hostname}:8000/api/dialogflow/textQuery`, textQueryVariables)
            const content = response.data.fulfillmentMessages[0]

                conversation = {
                    who: 'bot',
                    content: content
                }
                console.log(conversation)
        } catch (error) {
            conversation = {
                who: 'bot',
                content: {
                    text: {
                        text: " Error just occured, please check the problem"
                    }
                }
            }
        }
        setDialogs([...dialogs,
            {
                who : conversation.who,
                text : conversation.content.text.text
            }])
    }

    const eventQuery = async (event) => {
        // We need to take care of the message Chatbot sent 
        const eventQueryVariables = {
            event
        }
        try {
            //I will send request to the textQuery ROUTE 
            const response = await axios.post(`http://${window.location.hostname}:8000/api/dialogflow/eventQuery`, eventQueryVariables)
            let content = response.data.fulfillmentMessages[0]
            console.log(response);
                let conversation = {
                    who: 'bot',
                    content: content
                }
             setDialogs([...dialogs,
                {
                    who : conversation.who,
                    text : conversation.content.text.text
                }])
        } catch (error) {
            // let conversation = {
            //     who: 'bot',
            //     content: {
            //         text: {
            //             text: " Error just occured, please check the problem"
            //         }
            //     }
            // }
        }
        // console.log(conversation)
    }

    const keyPressHandler = (e) => {
        if(e.key === "Enter" ) {
            if(!e.target.value) {
                return alert('you need to type something');
            }
            textQuery(e.target.value)
            e.target.value = "";
        }
    }

    const keyDownHandler = (e) => {
        if(e.key === "Enter"){
        setDialogs([...dialogs,
            {
                who : 'user',
                text : e.target.value
            }
        ])}
    }

    // const renderDialogs = (returnedMessages) => {

    //     if (returnedMessages) {
    //         return returnedMessages.map((message, i) => {
    //             return renderOneMessage(message, i);
    //         })
    //     } else {
    //         return null;
    //     }
    // }

    return (
        <div>
            <div>
                {dialogs.map((dialog,idx) => (
                    <DialogBox>
                        <div>{dialog.who}</div>
                        <div>{dialog.text}</div>
                    </DialogBox>
                ))}
            </div>

            <input
                style={{
                    margin: '0 5px', width: '480px', height: 50,
                    borderRadius: '5px', padding: '5px', fontSize: '1rem', outline: 'none', border: '1px solid rgba(0,0,0,0.15)',
                }}
                placeholder="Send a message..."
                onKeyPress={keyPressHandler}
                onKeyDown={keyDownHandler}
                type="text"
            />
            {/* <button style={{
                margin: '5px', width: '20%', height: 40,
                borderRadius: '4px', padding: '5px', fontSize: '1rem', position: "absolute",right: '10px'
            }}
            >전송</button> */}
        </div>
    )
}

export default Chatbot;

const DialogBox = styled.div`
margin: 0 5px;
border: 1px solid rgba(0,0,0,0.15);
margin-bottom: 3px;
`