import { useState, } from "react";
import { DropdownButton, Dropdown } from "react-bootstrap";
import { userSignin, userSignup } from "../api/auth";
function Signin() {
  const [showSignup, setShowSignup] = useState(false);
  const [userType, setUserType] = useState("Customer");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  function updateSignupData(e) {
    if (e.target.id === "userid") {
      setUserId(e.target.value);
    } else if (e.target.id === "password") {
      setPassword(e.target.value);
    }
  }
  const signupFn = (e) => {
    e.preventDefault();
  };

  const loginFn = (e) => {
    e.preventDefault();
    const data = {
      userId: userId,
      password: password,
    };
    userSignin(data)
      .then((response) => {
        console.log(response);
        localStorage.setItem("name", response.data.name);
        localStorage.setItem("userId", response.data.userId);
        localStorage.setItem("email", response.data.email);
        localStorage.setItem("userTypes", response.data.userTypes);
        localStorage.setItem("userStatus", response.data.userStatus);
        localStorage.setItem("token", response.data.accessToken);
        console.log("SignIn");
        if (response.data.userTypes === "CUSTOMER")
          window.location.href = "/customer";
        else if (response.data.userTypes === "ENGINEER")
          window.location.href = "/engineer";
        else if (response.data.userTypes === "ADMIN")
          window.location.href = "/admin";
        else window.location.href = "/";
      })
      .catch((error) => {
        console.log(error);
      });
  };
  function handleSelect(e) {
    setUserType(e);
  }
  function changeSignup() {
    setShowSignup(!showSignup);
  }
  return (
    <div className="vh-100 bg-info d-flex justify-content-center align-items-center ">
      <div className="card m-4 p-4 rounded-4 shadow-lg">
        <h4 className="text-center text-info">
          {showSignup ? "Sign up" : "Sign in"}
        </h4>
        <form onSubmit={showSignup ? signupFn : loginFn}>
          <div className="input-group">
            <input
              type="text"
              className="form-control m-2"
              placeholder="User Id"
              value={userId}
              id="userid"
              onChange={updateSignupData}
              onKeyUp={(e)=>e.key === 'Enter' && loginFn(e)}
            />
          </div>
          {showSignup ? (
            <>
              <div className="input-group">
                <input
                  type="email"
                  className="form-control m-2"
                  placeholder="Email"
                  onKeyUp={(e)=>e.key === 'Enter' && loginFn(e)}
                />
              </div>
              <div className="input-group d-flex justify-content-around align-items-center">
                <span>User Type </span>
                <DropdownButton
                  align="end"
                  title={userType}
                  id="userType"
                  variant="light"
                  onSelect={handleSelect}
                >
                  <Dropdown.Item eventKey="CUSTOMER">Customer</Dropdown.Item>
                  <Dropdown.Item eventKey="ENGINEER">Engineer</Dropdown.Item>
                </DropdownButton>
              </div>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control m-2"
                  placeholder="Username"
                  onKeyUp={(e)=>e.key === 'Enter' && loginFn(e)}
                />
              </div>
            </>
          ):(null)}
          <div className="input-group">
            <input
              type="password"
              className="form-control m-2"
              placeholder="Password"
              value={password}
              id="password"
              onChange={updateSignupData}
              onKeyUp={(e)=>e.key === 'Enter' && loginFn(e)}
            />
          </div>
          <input
            type="submit"
            className="btn  btn-info fw-bolder form-control text-white"
            value={showSignup ? "Sign up" : "Sign in"}
          />
          <div className="m-1 text-primary text-center" onClick={changeSignup}>
            {showSignup ? "Already have an Account? Sign in" : "New here? Sign up"}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signin;
