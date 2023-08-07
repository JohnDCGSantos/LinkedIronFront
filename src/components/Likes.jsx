import { useState } from "react";

const Counter = () => {
        const [likes, setLikes] = useState(0);


        const handleClick = () => {
            if(likes%2===0){
                setLikes(previousCount => previousCount+1)
            } else {
                setLikes(previousCount => previousCount-1)
            }
        }

        

    return <button onClick={() => handleClick()}>
        {likes}</button>;
}
 
export default Counter;