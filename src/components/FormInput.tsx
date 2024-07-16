import { useState } from "react";


interface formConfig {
    key: number,
    name: string,
    value: string,
    type: string,
    error?: string,
    regex: RegExp,
    required: boolean,
    onChange: (e: React.FocusEvent<HTMLInputElement>) => void;
}

function FormInput({name, type, required, error, onChange, value, regex}: formConfig) {
    const [errorState, setErrorState] = useState(false);
    const [focused, setFocused] = useState(false);
    
    const pattern = regex.toString();

    const handleBlur = () => {
        setFocused(false);
        if (!regex.test(value)) return setErrorState(true);
        return setErrorState(false);
    }

    const handleFocus = () => {
        setFocused(true);
    }



    return (
        <div className= {`mb-5 ${focused ? `focused` : ''}`}>
            <label 
                htmlFor={name}
                className="
                    block
                    mb-2
                    text-md
                    font-medium
                    text-gray-900
                    dark:text-white
                "
            >
                {name}
            </label>
            <input
                name={name}
                type={type}
                required={required}
                placeholder={name}
                value={value}
                pattern={pattern}
                onChange={onChange}
                onBlur={handleBlur}
                onFocus={handleFocus}
                className={`
                    w-full 
                    block 
                    text-md 
                    p-4 
                    border 
                    rounded-lg 
                    bg-white
                    text-gray-900 
                    border-gray-300 
                    dark:bg-gray-700 
                    dark:border-gray-600 
                    dark:placeholder-gray-400 
                    dark:text-white 
                    focus:ring-blue-500 
                    focus:border-blue-500 
                    dark:focus:ring-blue-500 
                    dark:focus:border-blue-500
                    ${errorState ? 'border-red-500': ''}
                `}
            />
            <span 
                className={`
                    error-message
                    mt-2
                    text-red-500
                    ${errorState ? 'block' : 'hidden'} 
                `}
            >
                {error}
            </span>

        </div>
    );
}
export default FormInput;