interface formConfig {
    name: string,
    type: string,
    error?: string,
    regex?: string
    required: boolean,
    onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
}

function FormInput({name, type, required, error, regex, onBlur}: formConfig) {
    return (
        <div className="mb-5">
            <label 
                htmlFor={name}
                className="block mb-2 text-md font-medium text-gray-900 dark:text-white"
            >
                {name}
            </label>
            <input
                name={name}
                type={type}
                required={required}
                onBlur={onBlur}
                className="bg-gray-50 border border-gray-300 text-gray-900 p-4 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder={name}
            />
            <p
                className="mt-2 text-red-500"
            >
                {error}
            </p>
        </div>
    );
}
export default FormInput;