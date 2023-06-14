import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  adminstatus: "",
  adminname: sessionStorage.getItem("adminname") || "",
  adminLoggedIn: !!sessionStorage.getItem("adminname"),
  passwordChanged: "",
};

export const loginAdmin = createAsyncThunk("login/Admin", async (admin) => {
  console.log(admin, "admin logging in");
  let response = await fetch(
    `http://localhost:3000/admins?adminname=${admin.adminname}`
  );
  let fetchadmin = await response.json();
  // console.log(fetchadmin)
  if (fetchadmin.length > 0 && fetchadmin[0].password === admin.password)
    return Promise.resolve(fetchadmin[0].adminname);
  return Promise.reject("error");
});

export const changePassword = createAsyncThunk(
  "change/Password",
  async (pass) => {
    console.log("changing password");
    let response = await fetch(
      `http://localhost:3000/admins?adminname=${sessionStorage.getItem(
        "adminname"
      )}`
    );
    let fetchpassword = await response.json();
    console.log("fetchpassword: ", fetchpassword);
    let password = pass.newpassword1;
    if (
      fetchpassword.length > 0 &&
      fetchpassword[0].password === pass.oldpassword &&
      pass.newpassword1 === pass.newpassword2
    ) {
      console.log("correct values :)");
      await fetch(`http://localhost:3000/admins/1`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "PATCH",
        body: JSON.stringify({
          password
        }),
      });
      return Promise.resolve("success");
    }
    return Promise.reject("error");
  }
);

const adminslice = createSlice({
  name: "admins",
  initialState,
  reducers: {
    logoutAdmin: (state, action) => {
      sessionStorage.removeItem("adminname");
      state.adminstatus = "failure";
      state.adminLoggedIn = false;
      state.adminname = "";
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.adminstatus = "success";
        state.adminname = action.payload;
        state.adminLoggedIn = true;
        sessionStorage.setItem("adminname", state.adminname);
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.adminstatus = "failure";
        state.adminname = "";
        state.adminLoggedIn = false;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.passwordChanged = "success";
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.passwordChanged = "failure";
      });
  },
});

export let { adminLoggedIn } = (state) => state.adminreducer.adminLoggedIn;
export let { passwordChanged } = (state) => state.adminreducer.passwordChanged;
export let { logoutAdmin } = adminslice.actions;

export default adminslice.reducer;
