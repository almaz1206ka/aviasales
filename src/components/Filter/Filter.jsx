import { PropTypes } from 'prop-types';
import './filter.css';

export const Filter = ({ ...props }) => {
    const {
        allTickets,
        noTransfer,
        oneTransfer,
        twoTransfer,
        threeTransfer,
        setAllTickets,
        noTransferTickets,
        oneTransferTickets,
        twoTransferTickets,
        threeTransferTickets,
    } = props;
    return (
        <div className="filter">
            <h5>КОЛИЧЕСТВО ПЕРЕСАДОК</h5>
            <label>
                <input type="checkbox" checked={allTickets} onChange={(e) => setAllTickets(e.target.checked)} />
                Все
            </label>
            <label>
                <input type="checkbox" checked={noTransfer} onChange={(e) => noTransferTickets(e.target.checked)} />
                Без пересадок
            </label>
            <label>
                <input type="checkbox" checked={oneTransfer} onChange={(e) => oneTransferTickets(e.target.checked)} />1
                пересадка
            </label>
            <label>
                <input type="checkbox" checked={twoTransfer} onChange={(e) => twoTransferTickets(e.target.checked)} />2
                пересадки
            </label>
            <label>
                <input
                    type="checkbox"
                    checked={threeTransfer}
                    onChange={(e) => threeTransferTickets(e.target.checked)}
                />
                3 пересадки
            </label>
        </div>
    );
};

Filter.PropTypes = {
    allTickets: PropTypes.bool.isRequired,
    noTransfer: PropTypes.bool.isRequired,
    oneTransfer: PropTypes.bool.isRequired,
    twoTransfer: PropTypes.bool.isRequired,
    threeTransfer: PropTypes.bool.isRequired,
    setAllTickets: PropTypes.func.isRequired,
    noTransferTickets: PropTypes.func.isRequired,
    oneTransferTickets: PropTypes.func.isRequired,
    twoTransferTickets: PropTypes.func.isRequired,
    threeTransferTickets: PropTypes.func.isRequired,
};
