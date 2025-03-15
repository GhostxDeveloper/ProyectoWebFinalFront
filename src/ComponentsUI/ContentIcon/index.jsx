import React from "react";
import { Col, Row } from "antd";
import { Link } from "react-router-dom";
import { HomeFilled, UserOutlined, HeartFilled, BookOutlined, PhoneFilled } from "@ant-design/icons";
import "./ContentIcon.css";

const ContentIcon = () => {
    return (
        <div className="content-icon">
            <Row gutter={32}>
                <Col span={4}>
                    <Link to="/home">
                        <HomeFilled className="icon" style={{ color: '#000000' }} />
                    </Link>
                </Col>
                <Col span={4}>
                    <Link to="/Perfil">
                        <UserOutlined className="icon" style={{ color: '#0000FF' }} />
                    </Link>
                </Col>
                <Col span={4}>
                    <Link to="/favorites">
                        <HeartFilled className="icon" style={{ color: '#FF0000' }} />
                    </Link>
                </Col>
                <Col span={4}>
                    <Link to="/Recetas">
                        <BookOutlined className="icon" style={{ color: '#FFA500' }} />
                    </Link>
                </Col>
                <Col span={4}>
                    <Link to="/contact">
                        <PhoneFilled className="icon" style={{ color: '#008000' }} />
                    </Link>
                </Col>
            </Row>
        </div>
    );
}

export default ContentIcon;
