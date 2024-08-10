import { useEffect, useState } from "react";
import UserMessage from "../types/UserMessage";
import { io } from "socket.io-client";
import { useAuth } from "../hooks/useAuth";

// type sendUserMessage = Omit<UserMessage, 'id'>;

const socket = io(import.meta.env.VITE_BASE_URL!, {autoConnect: false})

function Chat() {
    const [messages, setMessages] = useState<UserMessage[]>([]);
    const {user} = useAuth();
    useEffect(() => {
        socket.connect();

        socket.on('connect', () => {
            console.log('Socket connected');
        })

        socket.on('disconnect', () => {
            console.log('Socket disconnected');
        })

        socket.on('chat', (newMessage) => {
            console.log('New message added', newMessage);
            setMessages((previousMessages) => [...previousMessages, newMessage]);
        })

        return () => {
            socket.off('connect');
            socket.off('disconnect');
            socket.off('chat');
            socket.disconnect();
        }
    }, []);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('userContext Chat', user);

        // Retrieve the textarea value
        const form = e.target as HTMLFormElement;
        const textareaValue = form.elements.namedItem('multiline-input') as HTMLTextAreaElement;

        if(!user) throw Error(`missing user: ${user}`);

        socket.emit('chat', { userId: user.id, body: textareaValue.value.trim() });

        textareaValue.value = '';
    };

    return (
        <div className="grid grid-cols-3 h-screen">
            <aside className="">

            </aside>
            <main className="col-span-2 flex flex-col">
                <div className="h-full bg-gray-200">
                    {messages.map((elem, idx) =>
                        <div key={idx}>
                            <p>{elem.body}</p>
                            <p>{elem.userId}</p>
                        </div>
                    )}
                </div>
                <div className="h-10 w-full border-l-gray-300 border-l">
                    <form 
                        onSubmit={handleSubmit}
                        className="
                            flex
                            flex-row
                            h-full
                            gap-1
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
                                rows={2}
                                placeholder="Type your message here..."
                                className="
                                    w-full
                                "
                            />
                        </div>
                        <div className="w-20">
                            <button
                                type='submit'
                                className="
                                    w-full 
                                    sm:w-auto 
                                    text-sm 
                                    px-5 
                                    py-2.5 
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
            </main>
        </div>
    );
}
export default Chat;