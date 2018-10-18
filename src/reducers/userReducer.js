export default function (state = { users: [] }, action) {
    switch (action.type) {
        case "ADD_USER":
            return { ...state, users: action.payload };

        case "DELETE_USER":
            let newUsers = [];
            state.users.forEach(user => {
                if (user._id != action.payload) {
                    newUsers.push(user)
                }
            })

            return { ...state, users: newUsers }

        case "EDIT_USER":
            let updatedUser = [];
            state.users.forEach(user => {
                if (user._id === action.payload) {
                    updatedUser.push({ _id: action.payload, ...action.data })
                } else {
                    updatedUser.push(user)
                }
            })
            return { ...state, users: updatedUser }
        default:
            return state;
    }
}