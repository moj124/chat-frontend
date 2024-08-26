import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useAuth } from "../hooks/useAuth";
import Conversation from "../types/Conversation";
import { useQuery } from "react-query";
import fetchConversationList from "../axios/fetchConversationList";
import Message from "../types/Message";
import SideBar from "../components/sideBar";
import MessageForm from "../components/messageForm";
import MessageText from "../components/message";

const socket = io(import.meta.env.VITE_BASE_URL!, {autoConnect: false})

function Chat() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [selectedConversation, setSelectedConversations] = useState<Conversation | null>(null);
    const {user} = useAuth();

    useQuery('conversations', fetchConversationList, {
        onSuccess(data: Conversation[]) {
            setConversations(data);
        },
    });

    useEffect(() => {
        socket.connect();

        socket.on('connect', () => {
            console.log('Socket connected');
        })

        socket.on('disconnect', () => {
            console.log('Socket disconnected');
        })

        socket.on('chatCreateMessage', (messages: Message[]) => {
            console.log('New message added', messages);
            setMessages(messages);
        })

        socket.on('chatCreateConversation', (newConversation: Conversation) => {
            console.log('New conversation added', newConversation);
            const formattedConversation: Conversation = {
                ...newConversation,
                createdat: new Date(newConversation.createdat),
                updatedat: new Date(newConversation.updatedat),
                deleteAt: newConversation.deleteAt ? new Date(newConversation.deleteAt): null,
            }
            setConversations((previousConversations) => [...previousConversations, formattedConversation]);
            setSelectedConversations(formattedConversation);
        })

        socket.on('chatLoadConversation', (messages: Message[]) => {
            setMessages(messages);
        });

        socket.on('chatDeleteConversation', (deletedConversation: Conversation) => {
            setConversations((preConversations) => [...preConversations.filter((elem) => elem.id !== deletedConversation.id)]);
        });

        return () => {
            socket.off('connect');
            socket.off('disconnect');
            socket.off('chatCreateMessage');
            socket.off('chatCreateConversation');
            socket.off('chatDeleteConversation');
            socket.off('chatLoadConversation');
            socket.disconnect();
        }
    }, []);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Retrieve the textarea value
        const form = e.target as HTMLFormElement;
        const textareaValue = form.elements.namedItem('multiline-input') as HTMLTextAreaElement;

        if(!user) throw Error(`missing user: ${user}`);

        socket.emit('chatCreateMessage', { conversationId: selectedConversation?.id,userId: user.id, message: textareaValue.value.trim()});

        textareaValue.value = '';
    };

    const handleConversationClick = (elem: Conversation) => {
        if (elem.id === selectedConversation?.id) return;
        socket.emit('chatLoadConversation', {conversationId: elem.id});
        setSelectedConversations(elem);
    };

    const handleNewConversationClick = () => {
        socket.emit('chatCreateConversation', { name: conversations.length, participants: [user?.id], messages: []})
    }

    const handleDeleteConversationClick = (elem: Conversation, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        
        if(elem.id === selectedConversation?.id) {
            setSelectedConversations(null);
            setMessages([]);
        }
        socket.emit('chatDeleteConversation', {conversationId: elem.id});
    };

    return (
        <div className="grid grid-cols-3 h-screen">
            <SideBar
                conversations={conversations}
                onClick={handleConversationClick}
                onCreateClick={handleNewConversationClick}
                onDeleteClick={handleDeleteConversationClick}
            />
            <main className="col-span-2 flex flex-col">
                {selectedConversation && 
                    <div className="w-full">
                        <h1 className="text-lg p-3">
                            {selectedConversation.name}
                        </h1>
                    </div>
                }
                <div className="h-full w-full bg-gray-200 flex flex-col items-end">
                    {messages.map(({message, createdat}: Message, idx) =>
                       <MessageText key={idx} message={message} createdat={createdat}/>
                    )}
                </div>
                <MessageForm onSubmit={handleSubmit} isDisabled={selectedConversation === null}/>
            </main>
        </div>
    );
}
export default Chat;