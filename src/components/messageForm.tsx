
type MessageFormProps = {
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    isDisabled: boolean;
};

const MessageForm = ({ onSubmit, isDisabled }: MessageFormProps) => {
    return <>
        <div className="w-full border-l-gray-300 border-l">
            <form 
                onSubmit={onSubmit}
                className="
                    flex
                    flex-row
                    h-12
                    gap-4
                    bg-gray-100
                "
            >   
                <div 
                    className="
                        w-full
                        content-center
                    "
                >
                    <textarea   
                        id="multiline-input"
                        disabled={isDisabled}
                        placeholder="Type your message here..."
                        className="
                            m-1
                            p-2
                            w-full
                            h-[2.5rem]
                            overflow-scroll
                            resize-none
                        "
                    />
                </div>
                <div className="h-full flex items-center justify-center">
                    <button
                        disabled={isDisabled}
                        type='submit'
                        className="
                            w-fit
                            h-fit
                            px-2.5
                            py-2
                            sm:w-auto 
                            text-sm
                            text-center 
                            font-medium 
                            rounded-full
                            focus:ring-4 
                            focus:outline-none 
                            text-white 
                            bg-blue-500 
                            focus:ring-blue-300 
                            hover:bg-blue-800 
                            disabled:bg-blue-100 
                        "
                    >
                        send
                    </button>
                </div>
            </form>
        </div>
    </>
};
export default MessageForm;