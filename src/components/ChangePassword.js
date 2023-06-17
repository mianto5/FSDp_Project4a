import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changePassword } from "../redux/adminslice";

const initialState = {
  oldpassword: "",
  newpassword1: "",
  newpassword2: "",
};

export default function ChangePassword() {
  const [password, setPassword] = useState(initialState);
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let adminLoggedIn = useSelector((state) => state.adminreducer.adminLoggedIn);

  useEffect(() => {
    if (!adminLoggedIn) navigate("/login");
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(changePassword(password));
    setPassword(initialState);
    navigate("/admin");
  };

  return (
    <div className="container px-4 px-lg-5 mt-5">
      <div className="col-md-6">
        <p></p>
        <h5>Password Change</h5>
        <p></p>
        <form>
          <div className="mb-3">
            <label htmlFor="formGroupExampleInput2" className="form-label">
              Old Password:
            </label>{" "}
            <input
              type="password"
              className="form-control"
              name="oldpassword"
              value={password.oldpassword}
              onChange={(e) =>
                setPassword({ ...password, [e.target.name]: e.target.value })
              }
              id="formGroupExampleInput2"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="formGroupExampleInput2" className="form-label">
              New Password:
            </label>{" "}
            <input
              type="password"
              className="form-control"
              name="newpassword1"
              value={password.newpassword1}
              onChange={(e) =>
                setPassword({ ...password, [e.target.name]: e.target.value })
              }
              id="formGroupExampleInput2"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="formGroupExampleInput2" className="form-label">
              New Password Again:
            </label>{" "}
            <input
              type="password"
              className="form-control"
              name="newpassword2"
              value={password.newpassword2}
              onChange={(e) =>
                setPassword({ ...password, [e.target.name]: e.target.value })
              }
              id="formGroupExampleInput2"
            />
          </div>
          <button type="submit" className="btn btn-dark" onClick={handleSubmit}>
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
}
