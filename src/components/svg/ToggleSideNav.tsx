export default function ToggleSidebar({ className, onClick }: { className?: string, onClick: any }) {
    return <svg className={className} onClick={onClick} xmlns="http://www.w3.org/2000/svg" width="41" height="62" viewBox="0 0 41 62" fill="none">
        <g className="dark:opacity-45" filter="url(#filter0_d_111_3139)">
            <path fillRule="evenodd" clipRule="evenodd" d="M28 11.0001C17.3971 11.654 9 20.4603 9 31.2278C9 41.9954 17.3971 50.8017 28 51.4556L28 11.0001Z" className="fill-white dark:fill-[#1E1E1E]" />
        </g>
        <path d="M23 26.0005L17 31.5005L23 37.0005" className="stroke-black dark:stroke-white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <defs >
            <filter id="filter0_d_111_3139" x="0.9" y="0.9" width="39.2" height="60.6556" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                <feOffset dx="2" />
                <feGaussianBlur stdDeviation="5.05" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0.854902 0 0 0 0 0.803922 0 0 0 0 1 0 0 0 1 0" />
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_111_3139" />
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_111_3139" result="shape" />
            </filter>
        </defs>
    </svg>
}
