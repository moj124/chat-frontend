import Message from "../types/Message";

type MessageTextProps = Pick<Message, 'message' | 'createdat'>;

const MessageText = ({message, createdat}: MessageTextProps) => {
    return ( 
        <div 
            className="
                my-4
                mr-4
                p-1
                rounded-2xl
                border 
                w-fit
                h-fit
                bg-blue-400
                align-bottom
            "     
        >
            <p className="p-1 ">
                {message}
            </p>
            <p className="p-1 float-right text-xs">
                {createdat.toLocaleString()}
            </p>
        </div>
    );
};
export default MessageText;