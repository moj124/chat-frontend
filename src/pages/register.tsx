import { useCallback, useState } from "react";
import FormInput from "../components/formInput";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import formConfig from "../types/formConfig";
import register from "../axios/register";
import User, { FormRegister } from "../types/User";
import { useAuth } from "../hooks/useAuth";

const formInputs: formConfig<FormRegister>[] = [
    {
        id: 1,
        name: "username",
        displayName: "Username",
        type: "text",
        pattern: false,
        regex: /^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
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
        pattern: false,
        regex: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        error: "Must contain atleast 8 characters of letters and numbers.",
        required: true,
        showLabel: true,
        marginBottom: true,
    },
    {
        id: 3,
        name: "firstName",
        displayName: "First Name",
        type: "text",
        pattern: false,
        regex: /^[A-Za-z]+$/,
        error: "Must contain characters of letters.",
        required: true,
        showLabel: true,
        marginBottom: true,
    },
    {
        id: 4,
        name: "lastName",
        displayName: "Last Name",
        pattern: false,
        type: "text",
        regex: /^[A-Za-z]+$/,
        error: "Must contain characters of letters.",
        required: true,
        showLabel: true,
        marginBottom: true,
    },
];

const initialValues: FormRegister = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
};

function Register() {
    const [inputData, setValues] = useState<FormRegister>(initialValues);
    const { login } = useAuth();
    const navigate = useNavigate();

    const queryClient = useQueryClient();
    const { mutate, isLoading, isError, error} = useMutation<User, {message: string}, FormRegister>(register, {
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

    const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        mutate(inputData);
    },[inputData, mutate]);

    // Extract the error message from the error object if available
    const errorMessage = isError ? `${error?.message || 'An error occurred'}` : '';

    return (
        <div className="w-full p-4">
            <div className="w-full flex flex-col h-screen content-center justify-center">
                <div className="w-full sm:w-1/2 lg:w-1/3 bg-gray-50 rounded-xl m-auto">
                    <div className="bg-white rounded shadow px-4 pt-5 pb-4 sm:p-6">
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
                        {!isLoading && <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
                            {formInputs.map((element) => 
                                <FormInput 
                                    key={element.id}
                                    {...element}
                                    value={inputData[element.name]}
                                    onChange={handleInput}
    
                                />
                            )}
                            <div
                                className="flex flex-col sm:flex-row gap-5 mt-5 justify-between content-center"
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
                                    to='/'
                                    className="
                                        content-center
                                        text-md
                                        font-medium
                                        text-blue-400
                                        hover:text-blue-600
                                    "
                                    >
                                    Login
                                </Link>
                            </div>
                        </form>}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Register;
