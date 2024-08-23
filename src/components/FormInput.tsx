import { useState } from "react";

type formConfigProp = {
    displayName?: string,
    pattern?: boolean,
    type: string,
    regex?: RegExp | null,
    error?: string,
    required: boolean,
    value: string,
    name: string,
    showLabel: boolean,
    onChange: (name: string, value: string) => void,
    marginBottom: boolean,
}

function FormInput({showLabel, marginBottom, name, type, required, error, onChange, value, regex, pattern, displayName}: formConfigProp) {
    const [errorState, setErrorState] = useState(false);
    const [focused, setFocused] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange!(e.target.name, e.target.value);
        if (regex?.test(e.target.value)) return setErrorState(false);
    };

    const handleBlur = () => {
        setFocused(false);

        if (!regex?.test(value!)) return setErrorState(true);
        return setErrorState(false);
    }

    const handleFocus = () => {
        setFocused(true);
    }

    return (
        <div 
            className= {`
                ${marginBottom ? 'mb-5' : ''} 
                ${focused ? `focused` : ''}
            `}
        >
            { showLabel && 
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
                {displayName}
                </label>
            }
            <input
                name={name}
                id={name}
                type={type}
                required={required}
                placeholder={displayName}
                value={value}
                pattern={pattern ? regex?.toString() : undefined}
                onChange={handleChange}
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
                    ${(errorState && error) ? 'border-red-500': ''}
                `}
            />
            {error &&
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
            }

        </div>
    );
}
export default FormInput;