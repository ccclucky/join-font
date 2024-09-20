/*
 * @Author: linjingcheng 1152691418@qq.com
 * @Date: 2022-10-01 13:24:01
 * @LastEditors: linjingcheng 1152691418@qq.com
 * @LastEditTime: 2022-10-05 17:45:01
 * @FilePath: \metabubble-join\src\views\profile\me.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from "react";
import { useEffect, useState } from "react";
import * as api from "../../api/api";
import service from "../../api/request";
import {
  Cell,
  Button,
  Input,
  Form,
  Picker,
  Field,
  Uploader,
  Selector,
  Notify,
} from "react-vant";
import cover from "./cover.jpg";
import "./style.css";
import error1 from "./Vector.svg";
import { useNavigate } from "react-router-dom";

function Profile() {
  const DEMO_UPLOAD_API = "/api/users/upload";
  const history = useNavigate();
  //   const upload = async (file: File) => {
  //     try {
  //       console.log("reader.result", file);

  //       let prefix = "data:image/";
  //       if (file.type.startsWith("image/")) {
  //         prefix += file.type.split("/")[1];
  //       } else {
  //         prefix += "jpeg";
  //       }
  //       prefix += ";base64,";
  //       const body = new FormData();
  //       body.append("file", file);

  //       const resp: any = await fetch(DEMO_UPLOAD_API, {
  //         method: "POST",
  //         body,
  //         headers: {
  //           Authorization: `bearer ${window.localStorage.getItem("token")}`,
  //         },
  //       });

  //       const json = await resp.json();

  //       // return包含 url 的一个对象 例如: {url:'https://img.yzcdn.cn/vant/sand.jpg'}
  //       if (json.appendix) {
  //         form.setFieldValue("appendix", prefix + json.appendix);
  //         return { url: prefix + json.appendix };
  //       } else {
  //         return { url: error1 };
  //       }
  //     } catch (error) {
  //       console.log(file.name, error);
  //       return { url: error1 };
  //     }
  //   };
  const upload = async (file: File) => {
    try {
      // 将文件写入指定位置
      const body = new FormData();
      body.append("file", file);

      const resp: any = await fetch(DEMO_UPLOAD_API, {
        method: "POST",
        body,
        headers: {
          Authorization: `bearer ${window.localStorage.getItem("token")}`,
        },
      });

      const json = await resp.json();
      console.log("json", json);

      // return包含 url 的一个对象 例如: {url:'https://img.yzcdn.cn/vant/sand.jpg'}
      if (json.appendix) {
        form.setFieldValue("appendix", json.appendix);
        return { url: json.appendix };
      } else {
        return { url: error1 };
      }
    } catch (error) {
      console.log(file.name, error);
      return { url: error1 };
    }
  };
  const [form] = Form.useForm();
  const columns = [
    { text: "南京", value: 0 },
    { text: "苏州", value: 1 },
    { text: "常州", value: 2 },
    { text: "淮安", value: 3 },
    { text: "扬州", value: 4 },
    { text: "南通", value: 5 },
    { text: "宿迁", value: 6 },
    { text: "泰州", value: 7 },
    { text: "无锡", value: 8 },
  ];
  const [skill, setSkill] = useState("");
  const opt = ["技术组", "设计组", "运营组"];
  const [value, setValue] = useState("宿迁");

  const [profile, setProfile] = useState({
    email: "",
    schoolId: "",
  });

  const onFinish = (values: any) => {
    console.log(values);
  };

  useEffect(() => {
    getProfile();
  }, []);
  const getProfile = async () => {
    const token = window.localStorage.getItem("token");
    service.defaults.headers.common = { Authorization: `bearer ${token}` };
    try {
      const res: any = await api.profile();
      setProfile(res);
      if (res.schoolId == "") {
        history("/login");
      }
      if (res.status != -1) {
        history("/status");
      }
    } catch (error) {
      history("/login");
      console.log(error, "error");
    }
  };
  const submit = async (values: any) => {
    if (values.appendix === undefined) {
      values.appendix = [];
    }
    try {
      let res: any;
      console.log(values);
      values.skill = skill;
      values.opt1 = opt[values.opt1];
      if (values.opt2) {
        values.opt2 = values.opt2 === -1 ? "" : opt[values.opt2];
      }

      console.log(values);
      if (values.appendix.length > 0) {
        res = await api.submit({
          ...values,
          schoolId: profile.schoolId,
          gender: 1,
          appendix: JSON.stringify(values.appendix[0].url),
        });
      } else {
        res = await api.submit({
          ...values,
          schoolId: profile.schoolId,
          gender: 1,
          appendix: "",
        });
      }
      if (res.name) {
        window.location.href = "./status";
      }
    } catch (error) {
      Notify.show("提交失败，请检查填写的数据格式是否正确");
      console.log(error, "submit error");
    }
  };
  return (
    <div className="me-container">
      <div>
        <img className="cover" src={cover} alt="" />
      </div>
      <Cell.Group>
        <Cell title="学号" value={profile.schoolId} />
      </Cell.Group>
      <Form
        form={form}
        onFinish={submit}
        footer={
          <div style={{ margin: "16px 16px 0" }}>
            <Button round nativeType="submit" type="primary" block>
              提交
            </Button>
          </div>
        }
      >
        <Form.Item
          rules={[{ required: true, message: "请填写姓名" }]}
          name="name"
          label="姓名"
        >
          <Input placeholder="请填写姓名" />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              validator: (_, value) => {
                if (/1\d{10}/.test(value)) {
                  return Promise.resolve(true);
                }
                return Promise.reject(new Error("请输入正确的手机号码"));
              },
            },
          ]}
          name="phone"
          label="手机号"
        >
          <Input placeholder="请填写手机号" />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              validator: (_, value) => {
                if (
                  /^[A-Za-z0-9]+([_\.][A-Za-z0-9]+)*@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$/.test(
                    value
                  )
                ) {
                  return Promise.resolve(true);
                }
                return Promise.reject(new Error("请输入正确的邮箱格式"));
              },
            },
          ]}
          name="email"
          label="邮箱账号"
        >
          <Input placeholder="请填写邮箱账号" />
        </Form.Item>
        <Form.Item
          isLink
          rules={[{ required: true, message: "请填写优势项目" }]}
          name="skill"
          label="优势项目"
          trigger="onConfirm"
          onClick={(_, action: any) => {
            action.current?.open();
          }}
        >
          <Picker
            popup
            columns={[
              "具备编程基础",
              "有开源项目经验",
              "学习能力较强",
              "有其他优势",
            ]}
          >
            {(val) => {
              if (typeof val === "string") {
                setSkill(val);
                return val || "请填写优势项目";
              }
            }}
          </Picker>
        </Form.Item>
        <Form.Item
          rules={[{ required: true, message: "补充编程基础" }]}
          name="skillAddition"
          label="优势项目补充"
        >
          <Input.TextArea
            placeholder="请简要概述您的优势，可以是展示项目地址或描述能力等..."
            autoSize={{ minHeight: 80, maxHeight: 120 }}
          />
        </Form.Item>

        <Form.Item
          rules={[{ required: true, message: "第一志愿" }]}
          name="opt1"
          label="第一志愿"
        >
          <Selector
            options={[
              {
                label: "技术组",
                description: "产品研发/技术支持",
                value: "1",
              },
              {
                label: "设计组",
                description: "UI/UX设计/宣传设计",
                value: "2",
              },
              {
                label: "运营组",
                description: "管理运营/产品经理",
                value: "3",
              },
            ]}
          />
        </Form.Item>
        <Form.Item
          rules={[{ required: false, message: "第二志愿" }]}
          name="opt2"
          label="第二志愿"
        >
          <Selector
            options={[
              {
                label: "技术组",
                description: "产品研发/技术支持",
                value: "1",
              },
              {
                label: "设计组",
                description: "UI/UX设计/宣传设计",
                value: "2",
              },
              {
                label: "运营组",
                description: "管理运营/产品经理",
                value: "3",
              },
            ]}
          />
        </Form.Item>
        <Form.Item
          rules={[{ required: true, message: "自我介绍" }]}
          name="introduce"
          label="自我介绍"
        >
          <Input.TextArea
            placeholder="自我介绍"
            autoSize={{ minHeight: 80, maxHeight: 120 }}
          />
        </Form.Item>
        <Form.Item
          rules={[{ required: true, message: "加入原因" }]}
          name="joinReason"
          label="加入原因"
        >
          <Input.TextArea
            placeholder="加入原因"
            autoSize={{ minHeight: 80, maxHeight: 120 }}
          />
        </Form.Item>
        <Form.Item
          name="appendix"
          label="附件简历"
          intro="任何方便我们对您有更深入的了解的附件，包括但不限于作品集，详细简历，证件照等（该项会极大增加您在团队中的竞争力哦）"
          rules={[{ required: false, message: "请选择文件" }]}
        >
          <Uploader
            maxCount={1}
            upload={upload}
            defaultValue={[]}
            previewCoverRender={(item) => {
              return (
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    background: `url(${item.url}) no-repeat center center`,
                    backgroundSize: "cover",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      color: "#fff",
                      fontSize: 14,
                      textAlign: "center",
                      lineHeight: "100%",
                      background: "rgba(0, 0, 0, 0.5)",
                    }}
                  >
                    上传成功
                  </div>
                </div>
              );
            }}
          />
        </Form.Item>
      </Form>
    </div>
  );
}

export default Profile;
