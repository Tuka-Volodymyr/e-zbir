import React from "react";

type ButtonProps = {
    primary?: boolean,
    secondary?: boolean,
    small?: boolean,
    value: string,
    className?: string
}

const Button: React.FC<ButtonProps> = ({primary, secondary, small, value, className}) => {
    let buttonStyle = "rounded-full w-[233px] h-[56px] text-xl flex justify-center items-center";

    if (primary) {
        buttonStyle += " bg-black text-white text-[16px] hover:bg-inherit hover:text-black transition duration-300 ease-linear hover:ease-linear";
    }

    if (secondary) {
        buttonStyle += " border-2 border-gradient-to-tr from-[#C3AAB2] via-[#99EECC] to-[#80C0C8]";
    }

    if (small) {
        buttonStyle = "rounded-full w-[104px] h-[40px] text-xs flex justify-center items-center bg-black text-white"
    }

    return (
        <div className={`bg-gradient-to-tr from-[#C3AAB2] via-[#99EECC] via-[#80C0C8]to-[#4B8BFA] rounded-full w-[233px] h-[56px] ${className}`}>
            <button className={buttonStyle}>
                {value}
            </button>
        </div>

    );
};

export default Button;