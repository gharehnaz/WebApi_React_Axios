import React, { useState, useRef } from "react";
import SimpleReactValidator from "simple-react-validator";
import { toast } from "react-toastify";
import { registerUser } from "./../../services/userService";

const Register = () => {
  const [UserName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [policy, setPolicy] = useState();

  const [, forceUpdate] = useState();
  const validator = useRef(
    new SimpleReactValidator({
      messages: {
        required: "پر کردن این فیلد الزامی میباشد",
        min: "کمتر از 5 کاراکتر نباید باشد",
        email: "ایمیل نوشته شده صحیح نمی باشد",
      },
      element: (message) => <div style={{ color: "red" }}>{message}</div>,
    })
  );

  const reset = () => {
    setUserName("");
    setEmail("");
    setPassword("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const user = {
      UserName,
      email,
      Password,
    };

    try {
      if (validator.current.allValid()) {
        const { status } = await registerUser(user);
        if (status === 200) {
          toast.success("کاربر با موفقیت ساخته شد.", {
            position: "top-right",
            closeOnClick: true,
          });
          reset();
        }
      } else {
        validator.current.showMessages();
        forceUpdate(1);
      }
    } catch (ex) {
      toast.error("مشکلی پیش آمده.", {
        position: "top-right",
        closeOnClick: true,
      });
      console.log(ex);
    }
  };

  return (
    <main className="client-page">
      <div className="container-content">
        <header>
          <h2> عضویت در سایت </h2>
        </header>

        <div className="form-layer">
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <span className="input-group-addon" id="username">
                <i className="zmdi zmdi-account"></i>
              </span>
              <input
                type="text"
                name="UserName"
                className="form-control"
                placeholder="نام و نام خانوادگی"
                aria-describedby="username"
                value={UserName}
                onChange={(e) => {
                  setUserName(e.target.value);
                  validator.current.showMessageFor("UserName");
                }}
              />
              {validator.current.message(
                "UserName",
                UserName,
                "required|min:5"
              )}
            </div>

            <div className="input-group">
              <span className="input-group-addon" id="email-address">
                <i className="zmdi zmdi-email"></i>
              </span>
              <input
                type="text"
                name="email"
                className="form-control"
                placeholder="ایمیل"
                aria-describedby="email-address"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  validator.current.showMessageFor("email");
                }}
              />
              {validator.current.message("email", email, "required|email")}
            </div>

            <div className="input-group">
              <span className="input-group-addon" id="Password">
                <i className="zmdi zmdi-lock"></i>
              </span>
              <input
                type="Password"
                name="Password"
                className="form-control"
                placeholder="رمز عبور "
                aria-describedby="Password"
                value={Password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  validator.current.showMessageFor("Password");
                }}
              />
              {validator.current.message(
                "Password",
                Password,
                "required|min:5"
              )}
            </div>

            <div className="accept-rules">
              <label>
                <input
                  type="checkbox"
                  name="policy"
                  value={policy}
                  onChange={(e) => {
                    setPolicy(e.currentTarget.checked);
                    validator.current.showMessageFor("policy");
                  }}
                />{" "}
                قوانین و مقررات سایت را میپذیرم{" "}
              </label>
              {validator.current.message("policy", policy, "required")}
            </div>

            <div className="link">
              <a href="">
                {" "}
                <i className="zmdi zmdi-assignment"></i> قوانین و مقررات سایت !
              </a>
              <a href="">
                {" "}
                <i className="zmdi zmdi-account"></i> ورود به سایت{" "}
              </a>
            </div>

            <button className="btn btn-success"> عضویت در سایت </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Register;
