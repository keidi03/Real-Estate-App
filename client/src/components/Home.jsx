import React from "react";
import { Breadcrumb, Image, Layout, Menu, theme } from "antd";
import { Navigate, Link, useNavigate } from "react-router-dom";
import axios from "axios";

const { Header, Content, Footer } = Layout;

const Home = ({ setIsAuthenticated, isAuthenticated, setUser }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();

  return (
    <Layout className="layout">
      <Content style={{ position: "relative" }}>
        <Breadcrumb
          style={{
            position: "sticky",
            top: 0,
            zIndex: 1,
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "end",
            fontSize: "18px",
            background: "#F2EAD3",
            height: 50,
            paddingRight: 20,
            color: "#068FFF",
          }}
        >
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item onClick={() => navigate("/properties")}>
            Properties
          </Breadcrumb.Item>
          <Breadcrumb.Item onClick={(e) => navigate("/aboutus")}>
            About us
          </Breadcrumb.Item>
          {!isAuthenticated && (
            <Breadcrumb.Item onClick={(e) => navigate("/login")}>
              Log in
            </Breadcrumb.Item>
          )}
          {!isAuthenticated && (
            <Breadcrumb.Item onClick={(e) => navigate("/register")}>
              Register
            </Breadcrumb.Item>
          )}
          {!!isAuthenticated && (
            <Breadcrumb.Item
              onClick={(e) => {
                axios.post(
                  "http://localhost:5000/api/auth/logout",
                  {},
                  {
                    withCredentials: true,
                  }
                );
                setIsAuthenticated(false);
                setUser({});
              }}
            >
              Log Out
            </Breadcrumb.Item>
          )}
        </Breadcrumb>
        <div
          className="site-layout-content"
          style={{
            width: "100%",
            display: "flex",
            backgroundSize: "100% 100%",
            backgroundPosition: "center",
            flexDirection: "column-reverse",
            flexWrap: "wrap",
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1432297984334-707d34c4163a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
            style={{
              Width: "80%",
              height: "60%",
              objectFit: "fill",
            }}
          />
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©2023 Created by Keidi Sheremeti dora vet
      </Footer>
    </Layout>
  );
};

export default Home;
