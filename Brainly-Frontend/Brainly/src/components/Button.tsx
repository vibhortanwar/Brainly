type Variants= "primary" | "secondary";
export interface ButtonProps {
    variant: Variants;
    size: "sm"|"md"|"lg";
    text: string;
    startIcon?: any;
    endIcon?: any;
    onClick?: () => void;
}
const variantStyles = {
    "primary" : "bg-[#96C9F4] text-[#0F67B1]",
    "secondary" : "bg-[#0F67B1] text-white"
}

const sizeStyles = {
    "sm": "px-2 py-1",
    "md": "px-4 py-2",
    "lg": "px-6 py-3",
}
const defaultStyles = "rounded-md flex";

export const Button = (props: ButtonProps) => {
    return <button className={`${variantStyles[props.variant]} ${defaultStyles} ${sizeStyles[props.size]}`}>
        {props.startIcon ? <div className="pr-2">{props.startIcon}</div> : null} {props.text} {props.endIcon}
    </button>
}

