import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  adminstatus: "",
  adminname: sessionStorage.getItem("adminname") || "",
  adminLoggedIn: !!sessionStorage.getItem("adminname"),
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

const adminslice = createSlice({
  name: "admins",
  initialState,
  reducers: {
    logoutAdmin: (state, action) => {
      sessionStorage.removeItem("adminname");
      state.adminstatus = "failure";
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
        state.loginstatus = "failure";
        state.adminname = "";
        state.adminLoggedIn = false;
      });
  },
});

export let { adminLoggedIn } = (state) => state.adminreducer.adminLoggedIn;
export let { logoutAdmin } = adminslice.actions;

export default adminslice.reducer;
