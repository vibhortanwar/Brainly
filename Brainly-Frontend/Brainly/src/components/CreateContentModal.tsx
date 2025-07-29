import { useRef, useState } from "react";
import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./Button";
import { Input } from "./Input";
import axios from "axios";
import { BACKEND_URL } from "../config";

//@ts-ignore
enum ContentType {
    Youtube = "Youtube",
    Twitter = "Twitter",
}


//@ts-ignore
export function CreateContentModal({open , onClose}) {
    const [modalOpen, setModalOpen] = useState(open);
    const titleRef = useRef<HTMLInputElement>(null);
    const linkRef = useRef<HTMLInputElement>(null);
    const [type, setType] = useState(ContentType.Youtube);
    async function addContent() {
        const title = titleRef.current?.value;
        const link = linkRef.current?.value;

        await axios.post(`${BACKEND_URL}/content`, {
            title: title,
            link: link,
            type: type        
        },{
            headers: {
                "Authorization": localStorage.getItem("token")
            },
        });
        onClose();
    }
    return <div>
        {open && <div>
            <div className="w-screen h-screen bg-blue-200 fixed top-0 left-0 opacity-50"></div>
            <div className="w-[500px] bg-white opacity-100 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 fixed rounded-lg shadow-lg p-6">
                <div className="flex justify-end items-center mb-4" onClick={onClose}>
                    <CrossIcon />
                </div>
                <div>
                    <Input placeHolder={"Title"} referance={titleRef} />
                    <Input placeHolder={"Link"} referance={linkRef} />
                    <h1 className="text-lg font-semibold my-2">Select Content Type</h1>
                    <div className="flex items-center space-x-4 my-4">
                        
                        <Button text="Youtube" variant={type === ContentType.Youtube ? "secondary" : "primary"} size="sm" onClick={() => setType(ContentType.Youtube)} />
                        <Button text="Twitter" variant={type === ContentType.Twitter ? "secondary" : "primary"} size="sm" onClick={() => setType(ContentType.Twitter)} />

                    </div>    
                    <div className="flex justify-center items-center my-2">
                        <Button variant="secondary" size="md" text="Create" onClick={addContent} />
                    </div>
                </div>
            </div>
        </div>
        }
    </div>
}