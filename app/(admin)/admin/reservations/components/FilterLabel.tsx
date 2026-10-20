import { IoMdClose } from "react-icons/io";

interface FilterLabelProps {
    label: string;
    onDelete: () => void;
}

export default function FilterLabel({ label, onDelete } : FilterLabelProps) {
    return (
        <div className="text-gray-500 text-sm sm:text-base px-[.75rem] py-[.25rem] bg-gray-100 rounded-lg border-1 border-gray-500 flex items-center gap-3 max-w-full">
            <p>{label}</p>
            <IoMdClose className="w-4 h-4 cursor-pointer" onClick={onDelete}/>
        </div>
    )
}