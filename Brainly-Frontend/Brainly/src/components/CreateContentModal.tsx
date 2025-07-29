import { useState } from "react";
import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./Button";
import { Input } from "./Input";
//@ts-ignore
export function CreateContentModal({open , onClose}) {
    const [modalOpen, setModalOpen] = useState(open);

    return <div>
        {open && <div>
            <div className="w-screen h-screen bg-blue-200 fixed top-0 left-0 opacity-50"></div>
            <div className="w-[500px] bg-white opacity-100 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 fixed rounded-lg shadow-lg p-6">
                <div className="flex justify-end items-center mb-4" onClick={onClose}>
                    <CrossIcon />
                </div>
                <div>
                    <Input placeHolder={"Title"} />
                    <Input placeHolder={"Link"} />
                    <div className="flex justify-center items-center my-2">
                        <Button variant="secondary" size="md" text="Create" onClick={() => {
                            setModalOpen(false);
                            onClose();
                        }} />
                    </div>
                </div>
            </div>
            
        </div>
        }
    </div>
}