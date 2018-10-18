export default function (state = { email: "" }, action) {
    switch (action.type) {
        case "SET_EMAIL":
            return { ...state, email: action.payload };
        default:
            return state;
    }
}