import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

export function useContent(){
    const [content, setContent] = useState([]);

    useEffect(() => {
        const response = axios.get(`${BACKEND_URL}/content`,{
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        }).then((response)=> {
            setContent(response.data.content)
        })
    }, [])

    return content;
}