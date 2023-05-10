import React from "react";
import {
    Navigate
} from "react-router-dom";
import { connect } from "react-redux";

import * as action from "../../redux/actions";

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(action.logout()),
    };
};

const Logout = (props) => {
    const { logout } = props;
    React.useEffect(() => {
        logout();
    }, [logout])
    return (
        <Navigate to="/" />
    )
}

export default connect(null, mapDispatchToProps)(Logout);