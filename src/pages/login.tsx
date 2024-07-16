import { useState } from "react";
import FormInput from "../components/FormInput";

interface formConfig {
    id: number,
    name: string,
    type: string,
    regex: RegExp,
    error?: string,
    required: boolean,
}

const formInputs: formConfig[] = [
    {
        id: 1,
        name: "Username",
        type: "text",
        regex: /^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
        error: "Must be an email address.",
        required: true,
    },
    {
        id: 2,
        name: "Password",
        type: "text",
        regex: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        error: "Must contain atleast 8 characters of letters and numbers.",
        required: true,
    },
];

const initialValues = formInputs.reduce(
    (
        acc: Record<string, string>,
        current :formConfig
    ) => {
            acc[current.name] = "";
            return acc;
        }, 
    {}
);

function Login() {
    const [inputData, setValues] = useState(initialValues);

    const isDisabled = Object.values(inputData).some((elem) => elem === '');

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValues((inputData) => ({...inputData, [e.target.name]: e.target.value}));

    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(inputData);
    };

    return (
        <div className="w-full p-4">
            <div className="w-full flex flex-col h-screen content-center justify-center">
                <div className="w-full sm:w-1/2 lg:w-1/3 bg-gray-50 rounded-xl m-auto">
                    <div className="bg-white rounded shadow px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
                            {formInputs.map((element) => 
                                <FormInput 
                                    key={element.id}
                                    {...element}
                                    value={inputData[element.name]}
                                    onChange={handleInput}
    
                                />
                            )}
                            <button 
                                type="submit"
                                disabled={isDisabled}
                                className="
                                    w-full 
                                    sm:w-auto 
                                    text-sm 
                                    mt-5
                                    px-5 
                                    py-2.5 
                                    text-center 
                                    font-medium rounded-lg 
                                    focus:ring-4 
                                    focus:outline-none 
                                    text-white 
                                    bg-gray-700 
                                    focus:ring-gray-300 
                                    hover:bg-gray-800 
                                    disabled:bg-gray-100 
                                "
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Login;