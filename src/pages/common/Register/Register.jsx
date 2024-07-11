import React from "react";
import { Form, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../../apicalls/users";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../../redux/loaderSlice";

function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await registerUser(values);
      dispatch(HideLoading());
      if (response.success) {
        message.success(response.message);
        navigate("/login");
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };
  return (
    <div className="flex justify-center items-center h-screen w-screen bg-primary overflow-x-hidden p-y-1">
      <div className="card w-400 p-x bg-white rounded">
        <div className="flex flex-col">
          <h1 className="text-2xl">QuizMania</h1>
          <div className="divider"></div>
          <Form layout="vertical" className="mt-2" onFinish={onFinish}>
            <Form.Item
              name="usertype"
              label="UserType"
              style={{ display: "flex", alignItems: "center" }}
            >
              <div style={{ display: "flex", gap: "10px" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <input
                    type="radio"
                    id="Admin"
                    name="radioGroup"
                    value="Admin"
                    style={{ width: "20px", height: "20px" }}
                  />
                  <label
                    htmlFor="Admin"
                    style={{ marginLeft: "5px", cursor: "pointer" }}
                  >
                    Admin
                  </label>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <input
                    type="radio"
                    id="User"
                    name="radioGroup"
                    value="User"
                    style={{ width: "20px", height: "20px" }}
                  />
                  <label
                    htmlFor="User"
                    style={{ marginLeft: "5px", cursor: "pointer" }}
                  >
                    User
                  </label>
                </div>
              </div>
            </Form.Item>
            <Form.Item name="name" label="Name">
              <input type="text" placeholder="Enter your name" required />
            </Form.Item>
            <Form.Item name="email" label="Email">
              <input type="email" placeholder="Enter your email" required />
            </Form.Item>
            <Form.Item name="password" label="Password">
              <input
                type="password"
                placeholder="Enter your password"
                required
              />
            </Form.Item>
            <Form.Item name="confirmPassword" label="Confirm Password">
              <input type="password" placeholder="Confirm password" required />
            </Form.Item>
            <div className="flex flex-col gap-2 pb-1">
              <button
                type="submit"
                className="primary-contained-btn mt-2 w-200"
              >
                Register
              </button>
              <Link to="/login">Already have an account? Login Here</Link>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
