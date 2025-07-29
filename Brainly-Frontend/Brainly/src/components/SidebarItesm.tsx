import type { ReactElement } from "react";

export function SiderbarItem({icon, text}: {icon?: ReactElement, text: string}) {
    return <div>
        <div className="flex text-gray-600 py-2 cursor-pointer hover:bg-gray-100">
            <div>{icon}</div>
            <div>{text}</div>
        </div>
    </div>
}