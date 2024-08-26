import Conversation from "../types/Conversation";
import dateToString from "../utils/dateToString";

type SideBarProps = {
    conversations: Conversation[];
    onClick: (elem : Conversation) => void;
    onDeleteClick: (elem: Conversation, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    onCreateClick: () => void;
};

function SideBar({ conversations, onCreateClick, onClick, onDeleteClick }: SideBarProps) {
    return (
        <aside className="flex flex-col">
            <div className="p-4">
                <button
                    onClick={onCreateClick} 
                    className="text-blue-500">
                    New Conversation +
                </button>
            </div>
            <div className="gap-4">
                {conversations.map((elem, idx) =>
                    <div
                        key={idx}
                        onClick={() => onClick(elem)}
                        className="
                            p-3
                            m-2
                            border-y
                            border-gray-300
                        "
                    >
                        <div className="flex flex-row justify-between">
                            <p>{elem.name}</p>

                            <button 
                                onClick={(e) => onDeleteClick(elem, e)}  
                                className="text-red-500"
                            >
                                X
                            </button>
                        </div>
                        <p>{dateToString(elem.updatedat)}</p>
                    </div>
                )}
            </div>
        </aside>
    );
}
export default SideBar;