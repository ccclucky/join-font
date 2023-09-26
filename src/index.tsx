/*
 * @Author: linjingcheng 1152691418@qq.com
 * @Date: 2022-09-27 13:39:10
 * @LastEditors: linjingcheng 1152691418@qq.com
 * @LastEditTime: 2022-10-02 18:59:46
 * @FilePath: \metabubble-join\src\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// @ts-ignore
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from './views/login-form-10/index.jsx';
// @ts-ignore
import Profile from './views/profile/profile';
import Status from './views/profile/status';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <Routes>
      <Route>
        <Route path="/"  element={<Profile />} ></Route>
        <Route path="login" element={
          <App></App>}></Route>
        <Route path="profile" element={<Profile />} />
        <Route path="Status" element={<Status />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
