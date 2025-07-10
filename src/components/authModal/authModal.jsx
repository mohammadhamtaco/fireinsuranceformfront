import React, { useState } from "react";

function AuthModal() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [show, setShow] = useState(true);

    function authenticate() {
        if (
            username === process.env.REACT_APP_USERNAME &&
            password === process.env.REACT_APP_PASSWORD
        ) {
            alert("خوش آمدید");
            setShow(false);
            setUsername("");
            setPassword("");
            return true;
        } else {
            alert("نام کاربری یا رمز عبور اشتباه است");
        }
    };

    return (
        <div className={`modal fade ${show ? "show d-block" : ""}`} tabIndex="-1" style={{ background: "rgba(0,0,0,0.5)" }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Login</h5>
                    </div>
                    <div className="modal-body">
                        <input
                            type="text"
                            className="form-control mb-2"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-primary" onClick={authenticate}>Login</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AuthModal;
