import type React from "react";
import { useEffect, useRef } from "react";
import { DeleteIcon } from "../icons/DeleteIcon"
import { ShareIcon } from "../icons/ShareIcon"

// Extend the Window interface to include the 'twitter' property
declare global {
  interface Window {
    twitter?: any;
  }
}

export interface CardProps {
  title?: string;
  heading?: string;
  description?: string;
  imageUrl?: string;
  src?: string;
  tags?: string[];
  type?: string;
  timestamp?: string;
  onDelete?: () => void;
  onShare?: () => void; 
}

// Function to convert YouTube URL to embed URL
function getYouTubeEmbedUrl(url: string): string {
  const patterns = [
    /(?:youtube\.com\/watch\?v=)([a-zA-Z0-9_-]+)/,
    /(?:youtu\.be\/)([a-zA-Z0-9_-]+)/,
    /(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]+)$/
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) {
      return `https://www.youtube.com/embed/${match[1]}`;
    }
  }
  
  return url;
}

// Function to extract tweet ID from Twitter URL
function getTweetId(url: string): string | null {
  const match = url.match(/status\/(\d+)/);
  return match ? match[1] : null;
}

export const Card = (props: CardProps) => {
  const twitterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load and render Twitter widgets when component mounts or updates
    if (props.type === "Twitter" && twitterRef.current) {
      // Check if Twitter widgets script is loaded
      if (window.twitter) {
        window.twitter.widgets.load(twitterRef.current);
      }
    }
  }, [props.type, props.src]);

  const renderContent = () => {
    if (props.type === "Youtube" && props.src) {
      const embedUrl = getYouTubeEmbedUrl(props.src);  
      return (
        <iframe
          width="100%"
          height="200"
          src={embedUrl}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      );
    } else if (props.type === "Twitter" && props.src) {
      const tweetId = getTweetId(props.src);
      if (tweetId) {
        return (
          <div ref={twitterRef}>
            <blockquote className="twitter-tweet" data-theme="light">
              <a href={props.src}></a>
            </blockquote>
          </div>
        );
      } else {
        // Fallback for invalid Twitter URLs
        return (
          <div className="p-4 bg-gray-100 rounded">
            <a 
              href={props.src} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-700 underline"
            >
              View Tweet: {props.src}
            </a>
          </div>
        );
      }
    } else {
      return (
        <div className="p-4 bg-gray-100 rounded">
          <a 
            href={props.src} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-700 underline"
          >
            {props.src}
          </a>
        </div>
      );
    }
  };

  return (
    <div className="shadow-md rounded-lg border-2 border-slate-200 w-[350px] min-h-[400px] p-4">
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
        {renderContent()}
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
        Last updated {props.timestamp}
      </div>
    </div>
  )
}