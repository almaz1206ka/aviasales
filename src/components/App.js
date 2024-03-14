import { connect } from 'react-redux';
import { useEffect } from 'react';

import {
    setID,
    getAllTickets,
    setAllTickets,
    noTransferTickets,
    oneTransferTickets,
    twoTransferTickets,
    threeTransferTickets,
    cleanTickets,
    cheapTickets,
    fastTickets,
    optimalTickets,
} from '../redux/appReducer';

import { Main } from './Main';

function App({ setID, ...props }) {
    useEffect(() => {
        setID();
    }, [setID]);

    return <Main {...props} />;
}

const mapStateToProps = (state) => {
    const { id, setID, requestTickets, tickets, allTickets, noTransfer, oneTransfer, twoTransfer, threeTransfer } =
        state.app;
    return {
        id,
        setID,
        requestTickets,
        tickets,
        allTickets,
        noTransfer,
        oneTransfer,
        twoTransfer,
        threeTransfer,
    };
};

export default connect(mapStateToProps, {
    setID,
    getAllTickets,
    setAllTickets,
    noTransferTickets,
    oneTransferTickets,
    twoTransferTickets,
    threeTransferTickets,
    cleanTickets,
    cheapTickets,
    fastTickets,
    optimalTickets,
})(App);
