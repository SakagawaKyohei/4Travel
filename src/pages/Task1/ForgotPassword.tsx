import { Button, Form, Input, message } from "antd";
import FormItem from "antd/es/form/FormItem";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import useSendmail from "../../hooks/accountsystem/useSendMail";

function ForgotPassword() {
  const [mail, setMail] = useState("");
  const sendmail = useSendmail(mail);
  if (sendmail.isSuccess) {
    message.success(
      "Hướng dẫn khôi phục tài khoản đã được gửi đến mail của bạn"
    );
  }
  let message1 = "";
  if (sendmail.isError) {
    message1 = (sendmail.error as any).message;
  }
  return (
    <div>
      <h1 style={{ color: "#4B268F", marginTop: 30 }}>4TRAVEL</h1>
      <div
        style={{
          marginLeft: 300,
          marginRight: 300,
          fontSize: 20,
          fontWeight: 600,
        }}
      >
        <Form layout="vertical">
          <FormItem label="Nhập email của bạn" style={{ fontSize: 20 }}>
            <Input
              onChange={(e) => {
                setMail(e.target.value);
              }}
            ></Input>
          </FormItem>
          {message1}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginBottom: 80,
            }}
          >
            <Button
              style={{
                marginTop: 20,
                fontSize: 18,
                height: 40,
                backgroundColor: "#7200E4",
                color: "white",
                fontWeight: "bold",
              }}
              onClick={() => {
                sendmail.mutate();
              }}
            >
              Xác nhận
            </Button>
            <Link to="/dang-nhap" style={{ color: "#4B268F", marginTop: 30 }}>
              Quay lại đăng nhập
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default ForgotPassword;
