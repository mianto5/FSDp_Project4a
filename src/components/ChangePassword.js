import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changePassword, loginAdmin } from "../redux/adminslice";

const initialState = {
    oldpassword: "",
    newpassword1: "",
    newpassword2: ""
  };

export default function ChangePassword() {
    const [password, setPassword] = useState(initialState);
    const [newAdmin, setNewAdmin] = useState({adminname: sessionStorage.getItem("adminname"), password: ""});
    const [error, setError] = useState();
    let dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("newAdmin: ", newAdmin);
        console.log("password: ", password);
        dispatch(changePassword(password, newAdmin));
        //  console.log('submit')
      };

  return (
    <div className="container px-4 px-lg-5 mt-5">
      <div className="col-md-6">
        <p></p>
        <h5>Password Change</h5>
        <p style={{ color: "red" }}>{error && error}</p>
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
              onChange={(e) => [
                setPassword({ ...password, [e.target.name]: e.target.value }),
                setNewAdmin({ ...newAdmin, password: e.target.value }),
            ]}
              id="formGroupExampleInput2"
            />
          </div>
          <button
            type="submit"
            className="btn btn-dark"
            onClick={handleSubmit}
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
}
