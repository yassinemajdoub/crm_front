type Props = {} & React.SVGAttributes<HTMLOrSVGElement>;

export default function Trash(props: Props) {
    return (
        <svg
            {...props}
            width="25"
            height="25"
            viewBox="0 0 25 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M21.5 5.97998C18.17 5.64998 14.82 5.47998 11.48 5.47998C9.5 5.47998 7.52 5.57998 5.54 5.77998L3.5 5.97998"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M9 4.97L9.22 3.66C9.38 2.71 9.5 2 11.19 2H13.81C15.5 2 15.63 2.75 15.78 3.67L16 4.97"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M19.3499 9.14014L18.6999 19.2101C18.5899 20.7801 18.4999 22.0001 15.7099 22.0001H9.2899C6.4999 22.0001 6.4099 20.7801 6.2999 19.2101L5.6499 9.14014"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M10.8301 16.5H14.1601"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M10 12.5H15"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
