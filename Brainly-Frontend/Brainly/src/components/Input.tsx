export function Input({referance, placeHolder}: {placeHolder: string, referance?: any}) {
    return <div>
        <input type={"text"} className="px-4 w-full py-2 my-2 border-2 border-gray-900" ref={referance} placeholder={placeHolder} />
    </div>
};