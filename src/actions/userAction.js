import axios from "axios";
export const addUserDataAction = formData => dispatch => {
    axios
        .post("http://localhost:7000/user", {
            data: formData
        })
        .then(function (response) {
            dispatch({
                type: "ADD_USER",
                payload: response.data
            });
        })
        .catch(function (error) {
            console.log(error);
        });
};

export const getUsersAction = formData => dispatch => {
    console.log(formData);
    
    axios
        .get("http://localhost:7000/user", {
            params: {data:formData}
        })
        .then(function (response) {
            dispatch({
                type: "ADD_USER",
                payload: response.data
            });
        })
        .catch(function (error) {
            console.log(error);
        });
};

export const deleteUserAction = _id => dispatch => {
    axios
        .delete("http://localhost:7000/user/" + _id, {})
        .then(function (response) {
            if (response.data) {
                dispatch({
                    type: "DELETE_USER",
                    payload: _id
                });
            }
        })
        .catch(function (error) {
            console.log(error);
        });
};

export const editUserAction = (
    _id,
    name,
    age,
    weight,
    email,
    author
) => dispatch => {
    axios
        .put("http://localhost:7000/user/" + _id, {
            name,
            age,
            weight,
            email
        })
        .then(function (response) {
            if (response.data) {
                dispatch({
                    type: "EDIT_USER",
                    payload: _id,
                    data: { name, age, weight, email, author }
                });
            }
        })
        .catch(function (error) {
            console.log(error);
        });
};
