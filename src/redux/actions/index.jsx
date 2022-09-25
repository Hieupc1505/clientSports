import {
    MATCH_TIME_ON_REQUEST,
    MATCH_TIME_ON_SUCCESS,
    MATCH_TIME_ON_FAIL,
    CHARTS_REQUEST,
    CHARTS_SUCCESS,
    CHARTS_FAIL,
    STATISTIC_REQUEST,
    STATISTIC_SUCCESS,
    STATISTIC_FAIL,
    ROUND_MATCH_REQUEST,
    ROUND_MATCH_FAIL,
    ROUND_MATCH_SUCCESS,
    CLEAR_ERROR,
    INIT_STATE,
    CHANGE_NATION,
    LISTS_VIDEO_REQUEST,
    LISTS_VIDEO_FAIL,
    LISTS_VIDEO_SUCCESS,
} from "../containts";

import axios from "axios";
const server = "https://serversport98.herokuapp.com";
// const server = "http://localhost:7500";

export const getMatchTime = (nation) => async (dispatch) => {
    try {
        dispatch({ type: MATCH_TIME_ON_REQUEST });
        const { data } = await axios.get(`${server}/api/${nation}/match`);
        dispatch({
            type: MATCH_TIME_ON_SUCCESS,
            payload: { data },
        });
    } catch (err) {
        console.log(err);
        dispatch({
            type: MATCH_TIME_ON_FAIL,
            payload: {
                err: { err: err.response.data.err },
            },
        });
    }
};
export const getRound = (nation, roundId) => async (dispatch) => {
    try {
        dispatch({ type: ROUND_MATCH_REQUEST });
        const { data } = await axios.get(
            `${server}/api/${nation}/rounds/${roundId}`
        );
        dispatch({
            type: ROUND_MATCH_SUCCESS,
        });

        return data;
    } catch (err) {
        console.log(err);
        dispatch({
            type: ROUND_MATCH_FAIL,
            payload: {
                err: { err: err.response.data.err },
            },
        });
    }
};

export const getCharts = (nation, id) => async (dispatch) => {
    try {
        dispatch({ type: CHARTS_REQUEST });
        const data = await axios.get(`${server}/api/${nation}/charts/${id}`);
        dispatch({
            type: CHARTS_SUCCESS,
            payload: {
                ...data,
            },
        });
    } catch (err) {
        dispatch({
            type: CHARTS_FAIL,
            payload: {
                err: { err: err.response.data.err },
            },
        });
    }
};

export const getTopPlayers = (nation) => async (dispatch) => {
    try {
        dispatch({ type: STATISTIC_REQUEST });
        const { data } = await axios.get(`${server}/api/${nation}/top-players`);
        dispatch({
            type: STATISTIC_SUCCESS,
            payload: { data },
        });
    } catch (err) {
        dispatch({
            type: STATISTIC_FAIL,
            payload: { err: err.response.data.err },
        });
    }
};
export const getListVideo = (nation) => async (dispatch) => {
    try {
        dispatch({ type: LISTS_VIDEO_REQUEST });
        const { data } = await axios.get(`${server}/api/${nation}/playlist`);
        // console.log(data);
        dispatch({
            type: LISTS_VIDEO_SUCCESS,
            payload: { name: nation, ...data },
        });
    } catch (err) {
        console.log(err);
        dispatch({
            type: LISTS_VIDEO_FAIL,
            payload: { err: err.response.data.err },
        });
    }
};
export const initState = () => async (dispatch) => {
    dispatch({ type: INIT_STATE });
};
export const changeNation = (nation) => async (dispatch) => {
    dispatch({
        type: CHANGE_NATION,
        payload: { nation },
    });
};
export const clearError = () => async (dispatch) => {
    console.log("clear");
    dispatch({ type: CLEAR_ERROR });
};
