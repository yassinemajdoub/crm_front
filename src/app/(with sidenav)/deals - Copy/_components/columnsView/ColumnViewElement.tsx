import { Deal } from "@/sotres/dealsStore"
import { useDraggable } from '@dnd-kit/core';
import { useEffect, useRef, useState } from "react";

type Props = {} & Deal

export default function ColumnsViewElement(props: Props) {

    const { attributes, listeners, setNodeRef, transform, active } = useDraggable({
        id: props.id,
    });
    const [screenWidth, setScreenWidth] = useState<null | number>()
    useEffect(() => {
        if (window) {
            setScreenWidth(window.innerWidth)
        }
    }, [])

    const valRef = useRef<number | undefined>()
    const startPos = active?.rect.current.initial?.left
    const currPos = active?.rect.current.translated?.right

    let isOverflowing = false
    if (screenWidth && currPos && currPos >= screenWidth - 50) {
        isOverflowing = true
    } else {
        isOverflowing = false
        valRef.current = transform?.x
    }

    const style = transform ? {
        transform: `translate3d(${isOverflowing ? valRef.current : transform.x}px, ${transform.y}px, 1000px)`,
    } : undefined;

    return <div ref={setNodeRef} style={style} {...listeners} {...attributes} className="w-[95%]  mx-auto hover:cursor-pointer transition-colors hover:bg-neutral-200 p-[20px] shadow-md shadow-black/5 h-[100px]  bg-white rounded-[22px] ">
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