"use client"
import { useState } from "react";

interface ExpandableTextProps {
    text: string;
}

export default function ExpandableText({ text } : ExpandableTextProps) {

    const [expanded, setExpanded] = useState<boolean>(false)

    return (
        <div>
            <p className={`text-gray-500 font-light break-words ${expanded ? '' : 'line-clamp-3'} md:line-clamp-none`}>
                {text}
            </p>
            <button
                type="button"
                onClick={() => setExpanded((prev) => !prev)}
                className="md:hidden mt-1 text-sm font-medium text-[#002BB3] cursor-pointer hover:underline"
            >
                {expanded ? 'Ver menos' : 'Ver mais'}
            </button>
        </div>
    )
}
