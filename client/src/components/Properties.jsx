import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Property.css";
import {
  Breadcrumb,
  Button,
  Card,
  Form,
  Image,
  Input,
  Layout,
  Modal,
  message,
} from "antd";
import { useNavigate } from "react-router-dom";
import {
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Content, Footer } from "antd/es/layout/layout";

const Properties = ({ setIsAuthenticated, isAuthenticated, user, setUser }) => {
  const [properties, setProperties] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState({});

  const deleteProperty = (id) => {
    axios
      .delete(`http://localhost:5000/api/property/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        message.success("Prona u fshi me sukses");
        setProperties(properties.filter((property) => property._id !== id));
      })
      .catch((err) => {
        console.log(err);
        message.error("Dicka ndodhi");
      });
  };

  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/property/")
      .then((res) => setProperties(res.data));
  }, []);

  const onFinish = (values) => {
    if (!Object.keys(selectedRow).length) {
      axios
        .post("http://localhost:5000/api/property/", values, {
          withCredentials: true,
        })
        .then((res) => {
          message.success("Prona u krijua me sukses");
          setProperties((prev) => [...prev, res.data]);
          setOpenModal(false);
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .patch(
          `http://localhost:5000/api/property/${selectedRow._id}`,
          values,
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          console.log("🚀 ~ file: Properties.jsx:41 ~ .then ~ res:", res);
          message.success("Prona u krijua me sukses");

          setProperties((prev) =>
            prev.map((el) => {
              if (el._id === selectedRow._id) return res.data;
              return el;
            })
          );
          setSelectedRow({});
          setOpenModal(false);
        })
        .catch((err) => console.log(err));
    }
  };

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
          <Breadcrumb.Item onClick={() => navigate("/home")}>
            Home
          </Breadcrumb.Item>
          <Breadcrumb.Item onClick={() => navigate("/properties")}>
            Properties
          </Breadcrumb.Item>
          <Breadcrumb.Item>About us</Breadcrumb.Item>
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
        <div className="propertyButtons">
          <Button type="primary" onClick={() => navigate("/home")}>
            Kthehu Pas
          </Button>
          {!!isAuthenticated && (
            <Button type="primary" onClick={() => setOpenModal(true)}>
              Krijo nje prone
            </Button>
          )}
        </div>
        <div
          style={{
            // width: "100vw",
            // height: "100vh",
            padding: 20,
            display: "flex",
            gap: 10,
          }}
        >
          {properties.map((property) => {
            return (
              <Card
                hoverable
                style={{
                  width: 240,
                  height: 400,
                }}
                actions={
                  user._id === property.userId && [
                    <DeleteOutlined
                      onClick={() => {
                        deleteProperty(property._id);
                      }}
                      style={{
                        color: "red",
                      }}
                    />,
                    <EditOutlined
                      key="edit"
                      onClick={() => {
                        setSelectedRow(property);
                        setOpenModal(true);
                      }}
                      style={{
                        color: "blue",
                      }}
                    />,
                  ]
                }
                cover={
                  <Image
                    src={property.imageUrl}
                    height={160}
                    width={240}
                    style={{
                      objectFit: "cover",
                    }}
                  />
                }
              >
                <div key={property._id} className="allProperties">
                  {/* <span>
                <Image src={property.imageUrl} height={200} width={200} />
              </span> */}
                  <div className="propertiesInfo">
                    <span>
                      <b>Adresa: </b>
                      {property.addresa}
                    </span>
                    <span>
                      <b>Cmimi: </b>
                      {property.cmimi}€
                    </span>
                    <span>
                      <b>Dhomat: </b>
                      {property.dhomat}
                    </span>
                    <span>
                      <b>Kati: </b>
                      {property.kati}
                    </span>
                    <span>
                      <b>Siperfaqja: </b>
                      {property.siperfaqja} m<sup>2</sup>
                    </span>
                    <span>
                      <b>Agjenti: </b>
                      {property.name}&nbsp;{property.surname}
                    </span>
                  </div>
                </div>
              </Card>
            );
          })}

          <Modal
            open={openModal}
            onCancel={() => {
              setSelectedRow({});
              setOpenModal(false);
            }}
            title="Krijo nje prone"
            footer={null}
            destroyOnClose={true}
          >
            <Form
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              style={{ maxWidth: 600 }}
              onFinish={onFinish}
              //   onFinishFailed={onFinishFailed}
              autoComplete="off"
              initialValues={selectedRow}
            >
              <Form.Item
                label="Address"
                name="addresa"
                rules={[
                  { required: true, message: "Please input your email!" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Fotua"
                name="imageUrl"
                rules={[
                  { required: true, message: "Please input your email!" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Cmimi"
                name="cmimi"
                rules={[
                  { required: true, message: "Please input your email!" },
                ]}
              >
                <Input type="number" />
              </Form.Item>
              <Form.Item
                label="Dhomat"
                name="dhomat"
                rules={[
                  { required: true, message: "Please input your email!" },
                ]}
              >
                <Input type="number" />
              </Form.Item>
              <Form.Item
                label="Kati"
                name="kati"
                rules={[
                  { required: true, message: "Please input your email!" },
                ]}
              >
                <Input type="number" />
              </Form.Item>
              <Form.Item
                label="Siperfaqja"
                name="siperfaqja"
                rules={[
                  { required: true, message: "Please input your email!" },
                ]}
              >
                <Input type="number" />
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Modal>
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©2023 Created by Keidi Sheremeti dora vet
      </Footer>
    </Layout>
  );
};

export default Properties;
