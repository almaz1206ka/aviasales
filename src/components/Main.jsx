import { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import { Spin } from 'antd';

import './main.css';

import logo from '../img/Logo.png';

import { Filter } from './Filter/Filter';
import { Tickets } from './Tickets/Tickets';

export const Main = ({ requestTickets, id, getAllTickets, ...props }) => {
    const [isFetcing, setIsFetching] = useState(true);

    const stopIsFetching = () => {
        setIsFetching(false);
    };

    useEffect(() => {
        if (id) {
            getAllTickets(id);
        }

        const timer = setTimeout(() => stopIsFetching(), 2000);

        return () => clearTimeout(timer);
    }, [requestTickets, getAllTickets, id]);

    return (
        <div className="main__wrapper">
            <img src={logo} alt="logo" />
            {isFetcing ? (
                <Spin size="large" fullscreen />
            ) : (
                <div className="main" style={{ display: 'flex' }}>
                    <Filter {...props} />
                    <Tickets {...props} />
                </div>
            )}
        </div>
    );
};

Main.defaultProps = {
    id: null,
};

Main.propTypes = {
    requestTickets: PropTypes.instanceOf(Array).isRequired,
    id: PropTypes.string,
    getAllTickets: PropTypes.func.isRequired,
};
