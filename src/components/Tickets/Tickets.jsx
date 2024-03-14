import { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

import './tickets.css';
import { Ticket } from './Ticket/Ticket';

export const Tickets = ({ ...props }) => {
    const {
        tickets,
        allTickets,
        noTransfer,
        oneTransfer,
        twoTransfer,
        threeTransfer,
        cleanTickets,
        cheapTickets,
        fastTickets,
        optimalTickets,
    } = props;

    const [count, setCount] = useState(5);

    const showMore = () => {
        setCount(count + 5);
    };

    useEffect(() => {
        if (!noTransfer && !oneTransfer && !twoTransfer && !threeTransfer) cleanTickets();
    }, [noTransfer, oneTransfer, twoTransfer, threeTransfer, cleanTickets]);

    return (
        <div className="tickets">
            <div>
                <button className="button" onClick={() => cheapTickets()}>
                    САМЫЙ ДЕШЕВЫЙ
                </button>
                <button className="button" onClick={() => fastTickets()}>
                    САМЫЙ БЫСТРЫЙ
                </button>
                <button className="button" onClick={() => optimalTickets()}>
                    ОПТИМАЛЬНЫЙ
                </button>
            </div>
            {allTickets || noTransfer || oneTransfer || twoTransfer || threeTransfer ? (
                <>
                    {tickets.map((ticket, idx) => {
                        return idx < count && <Ticket key={uuidv4()} tickets={ticket} />;
                    })}
                    <button className="show-more__button" onClick={showMore}>
                        ПОКАЗАТЬ ЕЩЁ 5 БИЛЕТОВ
                    </button>
                </>
            ) : (
                <h3>Настройте фильтр поиска</h3>
            )}
        </div>
    );
};

Tickets.propTypes = {
    tickets: PropTypes.array.isRequired,
    allTickets: PropTypes.bool.isRequired,
    noTransfer: PropTypes.bool.isRequired,
    oneTransfer: PropTypes.bool.isRequired,
    twoTransfer: PropTypes.bool.isRequired,
    threeTransfer: PropTypes.bool.isRequired,
    cleanTickets: PropTypes.func.isRequired,
    cheapTickets: PropTypes.func.isRequired,
    fastTickets: PropTypes.func.isRequired,
    optimalTickets: PropTypes.func.isRequired,
};
