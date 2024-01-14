import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, deleteUser } from "../actions/userActions";
import AdminNavbar from "./AdminNavbar";
import Error from "./Error";
import Loading from "./Loading";

export default function Userslist() {
  const dispatch = useDispatch();
  const [userid, setUserid] = useState("");

  const usersState = useSelector((state) => state.getAllUsersReducers);
  const { loading, error, users } = usersState;

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <div className="p-3">
      <AdminNavbar />
      <h2>Users List</h2>
      {loading && <Loading />}
      {error && <Error error="Something Went Wrong." />}
      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th>User ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user) => {
              return (
                <tr>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <i
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      className="fa-sharp fa-solid fa-trash"
                      onClick={() => {
                        setUserid(user._id);
                      }}
                    ></i>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Deleting User
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">Do You Want To Delete This User ?</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => {
                  dispatch(deleteUser(userid));
                }}
              >
                Delete
              </button>
              <button
                type="button"
                data-bs-dismiss="modal"
                className="btn btn-dark"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
