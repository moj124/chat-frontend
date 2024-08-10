import { useCallback, useState } from "react";
import FormInput from "../components/FormInput";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import formUser from "../types/formUser";
import formConfig from "../types/formConfig";
import { useAuth } from "../hooks/useAuth";
import User from "../types/User";
import loginUser from "../axios/loginUser";

const formInputs: formConfig<formUser>[] = [
    {
        id: 1,
        name: "username",
        displayName: "Username",
        type: "text",
        regex: /^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
        pattern: false,
        error: "Must be an email address.",
        required: true,
        showLabel: true,
        marginBottom: true,
    },
    {
        id: 2,
        name: "password",
        displayName: "Password",
        type: "text",
        regex: /^.+$/,
        pattern: false,
        error: "Must be a string.",
        required: true,
        showLabel: true,
        marginBottom: true,
    },
];

const initialValues: formUser = {
    username: '',
    password: '',
};

function Login() {
    const [inputData, setValues] = useState<formUser>(initialValues);
    const { login } = useAuth();
    const navigate = useNavigate();

    const queryClient = useQueryClient();
    const { mutate, isLoading, isError, error} = useMutation(loginUser, {
        onSuccess: (data: User) => {
            login(data);
            navigate('/chat');
        },
        onSettled: () => {
            queryClient.invalidateQueries('login');
        }
    });

    const isDisabled = Object.values(inputData).some((elem) => elem === '');

    const handleInput = useCallback((name: string, value: string) => {
        setValues((inputData) => ({...inputData, [name]: value}));
    }, []);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        mutate(inputData);
    };

     // Extract the error message from the error object if available
     const errorMessage = isError ? `${(error as {message: string}).message || 'An error occurred'}` : '';

    return (
        <div className="w-full p-4">
            <div className="w-full flex flex-col h-screen content-center justify-center">
                <div className="w-full sm:w-1/2 lg:w-1/3 bg-gray-50 rounded-xl m-auto">
                    <div className="bg-white rounded shadow px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        { isError && 
                            <div
                                className="
                                    border
                                  border-red-300
                                  bg-red-100
                                    text-red-500
                                    rounded
                                    py-3
                                    px-2
                                    mb-4
                                "
                            >
                                {errorMessage}
                            </div>
                        }
                        { isLoading && 
                            <p>Logging in...</p>
                        }
                        { !isLoading &&
                            <form 
                                className="max-w-sm mx-auto"
                                onSubmit={(e) => handleSubmit(e)}
                            >
                                {formInputs.map((element) => 
                                    <FormInput 
                                        key={element.id}
                                        {...element}
                                        value={inputData[element.name]}
                                        onChange={handleInput}
        
                                    />
                                )}
                                <div
                                    className="
                                        flex
                                        flex-col
                                        sm:flex-row
                                        gap-5
                                        mt-5
                                        justify-between
                                        content-center
                                    "
                                >
                                    <button 
                                        type="submit"
                                        disabled={isDisabled}
                                        className="
                                            w-full 
                                            sm:w-auto 
                                            text-sm 
                                            px-5 
                                            py-2.5 
                                            text-center 
                                            font-medium rounded-lg 
                                            focus:ring-4 
                                            focus:outline-none 
                                            text-white 
                                            bg-blue-500 
                                            focus:ring-blue-300 
                                            hover:bg-blue-800 
                                            disabled:bg-blue-100 
                                        "
                                    >
                                        Submit
                                    </button>
                                    <Link 
                                        to='register'
                                        className="
                                            content-center
                                            text-md
                                            font-medium
                                            text-blue-400
                                            hover:text-blue-600
                                        "
                                    >
                                        Register
                                    </Link>
                                </div>
                            </form>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Login;