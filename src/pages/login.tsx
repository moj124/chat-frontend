import { useState } from "react";
import FormInput from "../components/FormInput";

interface formConfig {
    id: number,
    name: string,
    type: string,
    regex: string,
    error?: string,
    required: boolean,
}

const formInputs: formConfig[] = [
    {
        id: 1,
        name: "Username",
        type: "text",
        // eslint-disable-next-line no-useless-escape
        regex: '/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$',
        error: "Must be an email address.",
        required: true,
    },
    {
        id: 2,
        name: "Password",
        type: "text",
        // eslint-disable-next-line no-useless-escape
        regex: "^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$",
        error: "Must contain atleast 8 characters of letters, numbers and symbols.",
        required: true,
    },
]

function Login() {
    const initialValues = formInputs.reduce(
        (
            acc: Record<string, string>,
            current :formConfig) => {
        acc[current.name] = "";
        return acc;
    }, {});

    const [values, setValues] = useState(initialValues);

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValues((values) => ({...values, [e.target.name]: e.target.value}));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(values);
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
                                name={element.name}
                                type={element.type}
                                required={element.required}
                                error={element.error}
                                onBlur={handleInput}
                            />
                        )}
                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Login;