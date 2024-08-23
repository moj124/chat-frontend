const dateToString = (date: string | Date) => {
    const messageDate = new Date(date);
    return messageDate.toLocaleTimeString();
};
export default dateToString;