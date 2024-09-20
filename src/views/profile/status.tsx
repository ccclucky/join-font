/*
 * @Author: linjingcheng 1152691418@qq.com
 * @Date: 2022-10-01 16:14:51
 * @LastEditors: linjingcheng 1152691418@qq.com
 * @LastEditTime: 2022-10-05 17:58:49
 * @FilePath: \metabubble-join\src\views\profile\status.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useState, useEffect } from "react";
import { Steps, Button } from "react-vant";
import * as api from "../../api/api";
import service from "../../api/request";
import cover from "./status.png";
import "./style.css";
import { useNavigate } from "react-router-dom";

function Status() {
  const [active, setActive] = useState(1);
  const [profile, setProfile] = useState({
    email: "",
    schoolId: "",
    status: 0,
    name: "",
  });
  const history = useNavigate();
  const nextStep = () => setActive((prev) => (prev >= 3 ? 0 : prev + 1));
  const getProfile = async () => {
    const token = window.localStorage.getItem("token");
    service.defaults.headers.common = { Authorization: `bearer ${token}` };
    try {
      const res: any = await api.profile();
      if (!res.schoolId) {
        history("/login");
      }
      setProfile(res);
      setActive(res.status);
    } catch (error) {
      history("/login");
    }
  };
  const statusTable = ["报名成功", "准备面试", "已被录取"];
  useEffect(() => {
    getProfile();
  }, []);
  const getContentByStatus = (status: number) => {
    console.log("status", status);

    switch (status) {
      case 0:
        return (
          <div className="status-message gradient-text fancy-effect">
            亲爱的{profile.name}
            同学，我们已经收到了您的报名申请，将尽快完成简历筛选。
            期望与您在MetaBubble相遇，让我们一起完成有趣的事情吧！
          </div>
        );
      case 1:
        return (
          <div className="status-message gradient-text">
            亲爱的{profile.name}
            同学，您的报名申请已经通过筛选，我们将很快将面试时间发送到您的手机和邮箱。
            请留意，及时参加面试！祝面试顺利~
          </div>
        );
      case 2:
        return (
          <div className="status-message fancy-effect">
            亲爱的{profile.name}
            同学，您的面试表现让我们印象深刻，很高兴地通知您，您已被录取为MetaBubble新成员~，请按照通知及时参加我们的迎新活动！
          </div>
        );
    }
  };
  return (
    <div>
      <div className="status-header">
        <div className="content">
          <div className="status-title-logo">MetaBubble实验室</div>
          <div className="status-title">{statusTable[profile.status]}</div>
        </div>
        <img src={cover} alt="" />
      </div>
      <Steps
        active={active}
        style={{ display: profile.status === 9 ? "none" : "block" }}
      >
        <Steps.Item>成功报名</Steps.Item>
        <Steps.Item>面试准备</Steps.Item>
        <Steps.Item>录取结果</Steps.Item>
      </Steps>
      <div style={{ display: profile.status === 9 ? "block" : "none" }}>
        很遗憾。没有通过简历筛选
      </div>
      <div>
        <div className="content1">{getContentByStatus(profile.status)}</div>
      </div>
    </div>
  );
}
export default Status;
