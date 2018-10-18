export const setAuthorAction = (email) => dispatch => {
    dispatch({
        type: "SET_EMAIL",
        payload: email
    });
}