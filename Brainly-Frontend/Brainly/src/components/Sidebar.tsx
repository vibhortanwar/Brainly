import { SiderbarItem } from "./SidebarItesm"

export function Sidebar() {
    return <div className="h-screen w-76 bg-white border-r border-gray-200">
        <div className="text-xl text-gray-700 p-4">
            <div className="text-2xl my-2">Second Brain</div>
            <SiderbarItem text="Tweets" />
            <SiderbarItem text="Videos" />
            <SiderbarItem text="Documents" />
            <SiderbarItem text="Links" />
            <SiderbarItem text="Tags" />
        </div>
    </div>
}