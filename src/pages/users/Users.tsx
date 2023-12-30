import DataTable from "../../components/dataTable/DataTable";
import "./users.scss";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { addUserAsync, deleteUser, updateUser } from "../../store/user/userThunk";
import { isSuccessful } from "../../utils/general";
import toast from "react-hot-toast";
import Modal from "../../components/modal/modal";
// import { useQuery } from "@tanstack/react-query";
const Users = () => {
  const [open, setOpen] = useState(false);
  const users = useAppSelector((state) => state.users);
  const [modalTitle, setModalTitle] = useState("Add User");
  const [values, setValues] = useState<any>({
    name: "",
    email: "",
    contact: "",
    role: "",
    password: "",
  });

  const dispatch = useAppDispatch();
  const columns = ["ID", "Username", "Email", "Phone", "Role"];
  const usersData = users.map((user: any) => {
    return {
      ID: user.id,
      id: user.id,
      Username: user.name,
      Email: user.email,
      Phone: user.contact,
      Role: user.role,
    };
  });
  const handleDelete = async (id: number) => {
    const resp = await dispatch(deleteUser(id));
    if (isSuccessful(resp.payload.status)) {
      toast.success("User Deleted");
    } else {
      toast.error(resp.payload.message || "Failed to delete user");
    }
  };
  const handleUpdate = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await dispatch(updateUser(values));
    if (isSuccessful(res.payload.status)) {
      toast.success("User Updated");
    } else {
      toast.error(res.payload.message || "Failed to update user");
    }
    
  };
  const handleAdd = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await dispatch(addUserAsync(values));
    if (isSuccessful(res.payload.status)) {
      toast.success("User Added");
    } else {
      toast.error(res.payload.message || "Failed to add user");
    }
    setOpen(false);
  };
  const addUser = () => {
    setModalTitle("Add User");
    setValues({
      name: "",
      email: "",
      contact: "",
      role: "",
      password: "",
    });
    setOpen(true);
  };
  return (
    <div className="users">
      <div className="info">
        <h1>Users</h1>
        <button onClick={addUser}>Add New User</button>
      </div>
      <DataTable
        slug="users"
        columns={columns}
        rows={usersData}
        handleEdit={(id: any) => {
          setModalTitle("Update User");
          let user = users.find((user: any) => user.id === id);
          console.log(user);
          if (user) {
            setValues({
              name: user.name,
              email: user.email,
              contact: user.contact,
              role: user.role,
              id: user.id,
            });
            setOpen(true);
          }
        }}
        handleDelete={handleDelete}
      />
      {open && (
        <Modal
          title={modalTitle}
          columns={Object.keys(values)}
          setOpen={setOpen}
          values={values}
          setValues={setValues}
          handleSubmit={modalTitle === "Add User" ? handleAdd : handleUpdate}
        />
      )}
    </div>
  );
};

export default Users;
