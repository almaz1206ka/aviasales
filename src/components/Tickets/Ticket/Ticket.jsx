import '../tickets.css';

export const Ticket = ({ tickets }) => {
    const { price, carrier, segments } = tickets;
    const [there, back] = segments;

    let {
        origin: originThere,
        destination: destinationThere,
        date: dateThere,
        duration: durationThere,
        stops: stopsThere,
    } = there;
    let {
        origin: originBack,
        destination: destinationBack,
        date: dateBack,
        duration: durationBack,
        stops: stopsBack,
    } = back;

    dateThere = dateThere.split('').splice(11, 5).join('');
    dateBack = dateBack.split('').splice(11, 5).join('');

    const getDurationTime = (duration) => {
        const hour = Math.floor(duration / 60);
        const minutes = duration - hour * 60;
        return `${hour}ч ${minutes}м`;
    };

    const endTime = (startDate, endDate) => {
        const [startDateHour, startDateMinutes] = startDate.split(':');
        const endDateHour = Math.floor(endDate / 60);
        const endDateMinutes = endDate - endDateHour * 60;
        let hour = +startDateHour + endDateHour > 24 ? +startDateHour + endDateHour - 24 : +startDateHour + endDateHour;
        let minutes = +startDateMinutes + endDateMinutes;
        hour = minutes > 60 ? hour++ : hour;
        minutes = minutes > 60 ? minutes - 60 : minutes;
        const [hours, minute] = new Date(0, 0, 0, hour, minutes).toString().split(' ').splice(4, 1).join('').split(':');
        return `${hours}:${minute}`;
    };

    const endTimeThere = endTime(dateThere, durationThere);
    const endTimeBack = endTime(dateBack, durationBack);

    const timeThere = getDurationTime(durationThere);
    const timeBack = getDurationTime(durationBack);

    return (
        <li className="ticket__card">
            <div className="flycard__header">
                <h5>{price.toLocaleString()} Р</h5>
                <img src={`https://pics.avs.io/99/36/${carrier}.png`} alt="avia-logo" />
            </div>
            <div className="flycard">
                <p className="flycard__info">
                    {originThere} - {destinationThere}
                    <span>В пути</span>
                    <span>
                        {stopsThere.length}{' '}
                        {stopsThere.length > 1 ? 'пересадки' : stopsThere.length > 0 ? 'пересадка' : 'пересадок'}
                    </span>
                </p>
                <p className="flycard__info">
                    <span>
                        {dateThere} - {endTimeThere}
                    </span>{' '}
                    <span>{timeThere}</span> <span>{stopsThere.join(', ')}</span>
                </p>
            </div>
            <div className="flycard">
                <p className="flycard__info">
                    <span>
                        {originBack} - {destinationBack}
                    </span>
                    <span>В пути</span>
                    <span>
                        {stopsBack.length}{' '}
                        {stopsBack.length > 1 ? 'пересадки' : stopsBack.length > 0 ? 'пересадка' : 'пересадок'}
                    </span>
                </p>
                <p className="flycard__info">
                    <span>
                        {dateBack} - {endTimeBack}
                    </span>{' '}
                    <span>{timeBack}</span> <span>{stopsBack.join(', ')}</span>
                </p>
            </div>
        </li>
    );
};
