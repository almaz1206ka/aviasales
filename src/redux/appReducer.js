import api from '../api/request';

const SET_ID = 'SET_ID';
const GET_TICKETS = 'GET_TICKETS';
const SHOW_ALL_TICKETS = 'SHOW_ALL_TICKETS';
const NO_TRANSFER_TICKETS = 'NO_TRANSFER_TICKETS';
const ONE_TRANSFER_TICKETS = 'ONE_TRANFER_TICKETS';
const TWO_TRANSFER_TICKETS = 'TWO_TRANFER_TICKETS';
const THREE_TRANSFER_TICKETS = 'THREE_TRANFER_TICKETS';
const CHEAP_TICKETS = 'CHEAP_TICKETS';
const FAST_TICKETS = 'FAST_TICKETS';
const OPTIMAL_TICKETS = 'OPTIMAL_TICKETS';
const CLEAN_TICKETS = 'CLEAN_TICKETS';

const initialState = {
    id: null,
    requestTickets: [],
    tickets: [],
    allTickets: false,
    noTransfer: false,
    oneTransfer: false,
    twoTransfer: false,
    threeTransfer: false,
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ID:
            return { ...state, id: action.id };
        case GET_TICKETS:
            return {
                ...state,
                requestTickets:
                    state.requestTickets.length < 9000
                        ? [...state.requestTickets, ...action.data]
                        : [...state.requestTickets],
            };
        case SHOW_ALL_TICKETS:
            return {
                ...state,
                tickets: action.visible ? state.requestTickets : [],
                allTickets: action.visible,
                noTransfer: action.visible,
                oneTransfer: action.visible,
                twoTransfer: action.visible,
                threeTransfer: action.visible,
            };
        case NO_TRANSFER_TICKETS:
            return {
                ...state,
                tickets: [
                    ...state.tickets,
                    action.visible
                        ? state.requestTickets.filter((ticket) => {
                              const [there, back] = ticket.segments;
                              return there.stops.length === 0 && back.stops.length === 0;
                          })
                        : [],
                ].flat(),
                noTransfer: action.visible,
            };
        case ONE_TRANSFER_TICKETS:
            return {
                ...state,
                tickets: [
                    ...state.tickets,
                    action.visible
                        ? state.requestTickets.filter((ticket) => {
                              const [there, back] = ticket.segments;
                              return there.stops.length === 1 && back.stops.length === 1;
                          })
                        : [],
                ].flat(),
                oneTransfer: action.visible,
            };
        case TWO_TRANSFER_TICKETS:
            return {
                ...state,
                tickets: [
                    ...state.tickets,
                    action.visible
                        ? state.requestTickets.filter((ticket) => {
                              const [there, back] = ticket.segments;
                              return there.stops.length === 2 && back.stops.length === 2;
                          })
                        : [],
                ].flat(),
                twoTransfer: action.visible,
            };
        case THREE_TRANSFER_TICKETS:
            return {
                ...state,
                tickets: [
                    ...state.tickets,
                    action.visible
                        ? state.requestTickets.filter((ticket) => {
                              const [there, back] = ticket.segments;
                              return there.stops.length === 3 && back.stops.length === 3;
                          })
                        : [],
                ].flat(),
                threeTransfer: action.visible,
            };
        case CLEAN_TICKETS:
            return { ...state, tickets: [], allTickets: false };
        case CHEAP_TICKETS:
            return {
                ...state,
                tickets: [
                    ...state.tickets.sort((prev, val) => {
                        return prev.price - val.price;
                    }),
                ],
            };
        case FAST_TICKETS:
            return {
                ...state,
                tickets: [
                    ...state.tickets.sort((prev, val) => {
                        const [prevThere, prevBack] = prev.segments;
                        const [valThere, valBack] = val.segments;
                        const prevDuration = prevThere.duration + prevBack.duration;
                        const valDuration = valThere.duration + valBack.duration;
                        return prevDuration - valDuration;
                    }),
                ],
            };
        case OPTIMAL_TICKETS:
            return {
                ...state,
                tickets: [
                    ...state.tickets.sort((prev, val) => {
                        const [prevThere, prevBack] = prev.segments;
                        const [valThere, valBack] = val.segments;
                        const prevOptimal = prevThere.duration + prevBack.duration + prev.price;
                        const valOptimal = valThere.duration + valBack.duration + val.price;
                        return prevOptimal - valOptimal;
                    }),
                ],
            };
        default:
            return state;
    }
};

export const setID = () => (dispatch) => {
    const { getSearchId } = api;
    getSearchId().then((res) => {
        dispatch(setUserId(res.data.searchId));
    });
};

export const getAllTickets = (id) => (dispatch) => {
    const { getTickets } = api;
    getTickets(id)
        .then((response) => {
            const { stop, tickets } = response.data;
            if (stop === false) {
                dispatch(setTickets(tickets));
            }
        })
        .catch((error) => {
            if (error.response.status === 500) {
                dispatch(setTickets([]));
            }
        });
};

const setUserId = (id) => ({
    type: SET_ID,
    id,
});

const setTickets = (data) => ({
    type: GET_TICKETS,
    data,
});

export const setAllTickets = (visible) => ({
    type: SHOW_ALL_TICKETS,
    visible,
});

export const noTransferTickets = (visible) => ({
    type: NO_TRANSFER_TICKETS,
    visible,
});

export const oneTransferTickets = (visible) => ({
    type: ONE_TRANSFER_TICKETS,
    visible,
});

export const twoTransferTickets = (visible) => ({
    type: TWO_TRANSFER_TICKETS,
    visible,
});

export const threeTransferTickets = (visible) => ({
    type: THREE_TRANSFER_TICKETS,
    visible,
});

export const cleanTickets = () => ({
    type: CLEAN_TICKETS,
});

export const cheapTickets = () => ({
    type: CHEAP_TICKETS,
});

export const fastTickets = () => ({
    type: FAST_TICKETS,
});

export const optimalTickets = () => ({
    type: OPTIMAL_TICKETS,
});

export default appReducer;
