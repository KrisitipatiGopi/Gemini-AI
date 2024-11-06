import { createContext, useState } from "react";
import run from "../Config/Gemini";

export const Context = createContext();

const ContextProvider = (props) => {

    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

    const delayPara = (index, nextWord) => {
        setTimeout(function() {
            setResultData(prev => prev + nextWord);
        }, 75 * index);
    };

    const newChat = () => {
        setLoading(false);
        setShowResult(false);
    }

    const onSent = async (prompt) => {
        if (recentPrompt === prompt) {
            console.log("Prompt already sent");
            return; 
        }

        setResultData("");
        setLoading(true);
        setShowResult(true);

        if (!prevPrompts.includes(prompt)) {
            setPrevPrompts(prev => [...prev, prompt]);
        }

        setRecentPrompt(prompt);  

        const response = await run(prompt);
        const responseArray = response.split("**");
        let newResponse = "";

        for (let i = 0; i < responseArray.length; i++) {
            if (i === 0 || i % 2 !== 1) {
                newResponse += responseArray[i];
            } else {
                newResponse += "<b>" + responseArray[i] + "</b>";
            }
        }

        let newResponse2 = newResponse.split("*").join("<br />");
        let finalRes = newResponse2.split(" ");

        for (let i = 0; i < finalRes.length; i++) {
            const nextWord = finalRes[i];
            delayPara(i, nextWord + " ");
        }

        setResultData(finalRes.join(" "));
        setLoading(false);
        setInput(""); 
    };

    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        recentPrompt,
        setRecentPrompt,
        input,
        setInput,
        showResult,
        loading,
        resultData,
        newChat
    };

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;
