import type React from "react";
import { DeleteIcon } from "../icons/DeleteIcon"
import { ShareIcon } from "../icons/ShareIcon"

export interface CardProps {
  title?: string;
  heading?: string;
  description?: string;
  imageUrl?: string;
  src?: React.ReactNode;
  tags?: string[];
  timestamp?: string;
  onDelete?: () => void;
  onShare?: () => void; 
  
}
export const Card = (props: CardProps) => {
  return (
    <div className="shadow-md rounded-lg border-2 border-slate-200 max-w-[350px] min-h-[400px] p-4">
      <div className="flex pb-8">
        <div className="text-lg font-semibold text-slate-800 flex-1">
          {props.title}
        </div>
        <div className="flex gap-3 py-1 text-slate-500">
          <div onClick={props.onShare}><ShareIcon size="md"/></div>
          <div onClick={props.onDelete}><DeleteIcon /></div>
        </div>
      </div>
      <div className="text-slate-600 text-2xl mt-2">
        {props.heading}
      </div>
      <div className="text-slate-500 mt-2">
        {props.description}
      </div>
      <div className="mt-4">
        {props.src}
      </div>
      <div>
        {props.tags && props.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {props.tags.map((tag, index) => (
              <span key={index} className="bg-slate-200 text-slate-800 rounded-full px-2 py-1 text-sm">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
      <div className="text-slate-400 text-xs mt-2">
        Last updated {props.timestamp}</div>
    </div>
  )
}