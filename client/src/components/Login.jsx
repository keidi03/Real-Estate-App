import { Button, Form, Input, message } from "antd";
import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ setIsAuthenticated, isAuthenticated, setUser }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/home");
  }, []);

  const onFinish = (values) => {
    axios
      .post("http://localhost:5000/api/auth/login", values, {
        withCredentials: true,
      })
      .then((res) => {
        console.log("🚀 ~ file: Login.jsx:19 ~ .then ~ res:", res);
        setIsAuthenticated(true);
        setUser(res.data.data.user);
        message.success("Logged Successfully");
        navigate("/home");
      })
      .catch((err) => {
        console.log(err);
        message.error("Something went wrong");
      });
  };
  return (
    <div
      style={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
        background: "#F0F0F0",
      }}
    >
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        //   onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
