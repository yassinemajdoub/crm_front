export default function TrashListView({
    className,
    onClick,
}: {
    className?: string;
    onClick: any;
}) {
    return (
        <svg
            className={className}
            onClick={onClick}
            width="24"
            height="25"
            viewBox="0 0 24 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <g id="vuesax/linear/trash">
                <g id="trash">
                    <path
                        id="Vector"
                        d="M21 6.48047C17.67 6.15047 14.32 5.98047 10.98 5.98047C9 5.98047 7.02 6.08047 5.04 6.28047L3 6.48047"
                        stroke="#292D32"
                        strokeWidth="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                    <path
                        id="Vector_2"
                        d="M8.5 5.47L8.72 4.16C8.88 3.21 9 2.5 10.69 2.5H13.31C15 2.5 15.13 3.25 15.28 4.17L15.5 5.47"
                        stroke="#292D32"
                        strokeWidth="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                    <path
                        id="Vector_3"
                        d="M18.8499 9.64062L18.1999 19.7106C18.0899 21.2806 17.9999 22.5006 15.2099 22.5006H8.7899C5.9999 22.5006 5.9099 21.2806 5.7999 19.7106L5.1499 9.64062"
                        stroke="#292D32"
                        strokeWidth="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                    <path
                        id="Vector_4"
                        d="M10.3301 17H13.6601"
                        stroke="#292D32"
                        strokeWidth="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                    <path
                        id="Vector_5"
                        d="M9.5 13H14.5"
                        stroke="#292D32"
                        strokeWidth="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </g>
            </g>
        </svg>
    );
}
