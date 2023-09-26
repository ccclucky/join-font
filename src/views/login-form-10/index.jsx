/*
 * @Author: linjingcheng 1152691418@qq.com
 * @Date: 2022-09-27 19:30:06
 * @LastEditors: linjingcheng 1152691418@qq.com
 * @LastEditTime: 2022-10-03 10:20:33
 * @FilePath: \metabubble-join\src\views\login-form-10\index.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import './css/style.css'
import { useState, useRef, useEffect } from 'react';
import * as THREE from 'three'
import HALO from 'vanta/dist/vanta.halo.min'
import * as api from '../../api/api'
import service from '../../api/request'
import { Notify } from 'react-vant';
import { useNavigate } from 'react-router-dom'

const LoginForm = () => {
    const [vantaEffect, setVantaEffect] = useState(null)
    const [email, setEmail] = useState(undefined)
    const [password, setPassword] = useState(undefined)
    const history = useNavigate()
    const [way, setWay] = useState('login')
    const myRef = useRef(null)
    useEffect(() => {
        if (!vantaEffect) {
            setVantaEffect(HALO({
                el: myRef.current,
                THREE: THREE,
                mouseControls: true,
                touchControls: true,
                gyroControls: true,
                size: 1.5,
                scaleMobile: 1.00,
                color: 0x82f0ff,

            }))
        }
        return () => {
            // @ts-ignore
            if (vantaEffect) vantaEffect.destroy()
        }
    }, [vantaEffect])
    const signup = async () => {
        try {
            const res = await api.signup({
                schoolId: email,
                password: password
            });
            console.log(res)
            if (res) {
                Notify.show({ type: 'success', message: '注册成功' })
                window.localStorage.setItem("token", res.access_token);
                service.defaults.headers.common = { 'Authorization': `bearer ${res.access_token}` }
                history('/profile')
            }

        } catch (error) {
            console(error, 'singup err')
            Notify.show('注册失败，请联系管理员')
        }
    }
    const signin = async () => {
        try {
            const res = await api.signin({
                schoolId: email,
                password: password
            });
            console.log(res)
            if (res) {
                service.defaults.headers.common = { 'Authorization': `bearer ${res.access_token}` }
                window.localStorage.setItem("token", res.access_token);
                history('/profile')
            }
        } catch (error) {
            console(error, 'login err')
            Notify.show('登录失败，请联系管理员')
        }
    }
    const submit = async () => {
        if (way === 'login') {
            await signin()
        } else {
            await signup()
        }
    }
    return (
        <section className="ftco-section">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-7 col-lg-5">
                        <div className="wrap">
                            <div className="img" >
                                <div ref={myRef} className="logo">
                                    <p>MetaBubble</p>
                                    <div className='introduce'>一起完成有趣的故事吧</div>
                                </div>
                            </div>
                            <div className="login-wrap p-4 p-md-5">
                                <div className="d-flex">
                                    <div className="w-100">
                                        <h3 className="mb-4">招新系统</h3>
                                    </div>
                                    {/* <div className="w-100">
                                        <p className="social-media d-flex justify-content-end">
                                            <a href="#" className="social-icon d-flex align-items-center justify-content-center"><span className="fa fa-facebook"></span></a>
                                            <a href="#" className="social-icon d-flex align-items-center justify-content-center"><span className="fa fa-twitter"></span></a>
                                        </p>
                                    </div> */}
                                </div>
                                <form className="signin-form">
                                    <div className="form-group mt-3">
                                        <input type="text" className="form-control" value={email} onChange={(e) => {
                                            setEmail(e.target.value)
                                        }} />
                                        <label className="form-control-placeholder" htmlFor="username">学号</label>
                                    </div>
                                    <div className="form-group">
                                        <input id="password-field" type="password" className="form-control"
                                            autoComplete="on"
                                            value={password} onChange={(e) => {
                                                setPassword(e.target.value)
                                            }} />
                                        <label className="form-control-placeholder " toggle="#password-field" htmlFor="password">密码</label>
                                        {/* <span toggle="#password-field" className="fa fa-fw fa-eye field-icon toggle-password"></span> */}
                                    </div>
                                    <div className="form-group">
                                        <button onClick={submit} type="button" className="form-control btn btn-primary rounded submit px-3" >{way === 'login' ? "登录" : "注册"}</button>
                                    </div>

                                </form>
                                <p className="text-center"> <a data-toggle="tab" onClick={() => { way === 'login' ? setWay('register') : setWay('login') }}>{way === 'login' ? "立即注册" : "立即登录"}</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default LoginForm