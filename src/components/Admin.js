import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../redux/adminslice";

const initialState = {
  adminname: "",
  password: "",
};

export default function Admin({ setStatus, setAdminname }) {
  const [admin, setAdmin] = useState(initialState);

  let navigate = useNavigate();
  let dispatch = useDispatch();
  let adminLoggedIn = useSelector((state) => state.adminreducer.adminLoggedIn);
  
  useEffect(() => {
    if (adminLoggedIn) navigate("/admin");
  }, [adminLoggedIn]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginAdmin(admin));
    setAdmin(initialState);
  };

  return (
    <div className="container px-4 px-lg-5 mt-5">
      <div className="col-md-6">
        <p></p>
        <h5>Please log in to administrate the website</h5>
        <p></p>
        <form>
          <div className="mb-3">
            <label htmlFor="formGroupExampleInput2" className="form-label">
              Admin's Name:
            </label>{" "}
            <input
              type="text"
              className="form-control"
              name="adminname"
              value={admin.adminname}
              onChange={(e) =>
                setAdmin({ ...admin, [e.target.name]: e.target.value })
              }
              id="formGroupExampleInput2"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="formGroupExampleInput2" className="form-label">
              Password:
            </label>{" "}
            <input
              type="password"
              className="form-control"
              name="password"
              value={admin.password}
              onChange={(e) =>
                setAdmin({ ...admin, [e.target.name]: e.target.value })
              }
              id="formGroupExampleInput2"
            />
          </div>
          <button type="submit" className="btn btn-dark" onClick={handleSubmit}>
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}
