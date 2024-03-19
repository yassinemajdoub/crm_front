import { Deal } from "@/sotres/dealsStroe"
import { useDraggable } from '@dnd-kit/core';

type Props = {} & Deal

export default function ColumnsViewElement(props: Props) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: props.id,
    });

    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    } : undefined;


    return <div ref={setNodeRef} style={style} {...listeners} {...attributes} className="w-[95%] mx-auto hover:cursor-pointer transition-colors hover:bg-neutral-200 p-[20px] shadow-md shadow-black/5 h-[100px]  bg-white rounded-[22px] ">
        <div className="flex items-center  mt-[4px]">
            <span className="w-[40px] h-[40px] rounded-full bg-[#1D1DCE]"></span>
            <div className="ml-[8px]">
                <p className="text-[18px] font-semibold">
                    {props.name}
                </p>
                <p className="font-medium text-black/40">${props.price} - {props.date.toDateString()}</p>
            </div>
        </div>
    </div>
}