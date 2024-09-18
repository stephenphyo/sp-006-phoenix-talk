import moment from 'moment';

const groupMessagesByDate = (messages) => {
    if (messages) {
        return messages.reduce((accumulator, currentMessage) => {
            const currentDate = moment(currentMessage.createdAt).format('DD MMM YYYY');

            if (!accumulator[currentDate]) accumulator[currentDate] = [];
            accumulator[currentDate].push(currentMessage);

            return accumulator;
        }, {});
    }
    else {
        return {};
    }
}

export default groupMessagesByDate;