(window.webpackJsonp=window.webpackJsonp||[]).push([["pages-user-phone-login"],{"12d9":function(A,t,e){A.exports=e.p+"static/img/UC.d41d8cd9.svg"},"245f":function(A,t,e){"use strict";(function(t){var i=e("4ea4").default,n=i(e("6f74")),o=e("b95e"),s=i(e("4c82"));A.exports={mixins:[n.default,s.default],methods:{getForum:function(){var A=this;this.$store.dispatch("jv/get",["forum",{params:{include:"users"}}]).then((function(t){t&&(A.forum=t)}))},jump2PhoneLoginPage:function(){uni.redirectTo({url:"/pages/user/phone-login"})},jump2PhoneLoginRegisterPage:function(){uni.redirectTo({url:"/pages/user/phone-login-register"})},jump2LoginPage:function(){uni.navigateTo({url:"/pages/user/login"})},jump2RegisterPage:function(){uni.redirectTo({url:"/pages/user/register"})},jump2RegisterExtendPage:function(){uni.redirectTo({url:"/pages/user/supple-mentary"})},jump2LoginBindPage:function(){uni.redirectTo({url:"/pages/user/login-bind"})},jump2RegisterBindPage:function(){uni.redirectTo({url:"/pages/user/register-bind"})},jump2LoginBindPhonePage:function(){uni.redirectTo({url:"/pages/user/login-bind-phone"})},jump2RegisterBindPhonePage:function(){uni.redirectTo({url:"/pages/user/register-bind-phone"})},jump2findpwdPage:function(){uni.navigateTo({url:"/pages/modify/findpwd?pas=reset_pwd"})},mpLoginMode:function(){this.forums&&this.forums.set_reg&&0===this.forums.set_reg.register_type&&this.jump2LoginPage(),this.forums&&this.forums.set_reg&&1===this.forums.set_reg.register_type&&this.jump2PhoneLoginRegisterPage(),this.forums&&this.forums.set_reg&&2===this.forums.set_reg.register_type&&(uni.setStorageSync("register",1),uni.setStorageSync("isSend",!0),this.$store.getters["session/get"]("auth").open())},h5LoginMode:function(){s.default.isWeixin().isWeixin?(this.forums&&this.forums.set_reg&&0===this.forums.set_reg.register_type&&uni.navigateTo({url:"/pages/user/login"}),this.forums&&this.forums.set_reg&&1===this.forums.set_reg.register_type&&this.jump2PhoneLoginRegisterPage(),this.forums&&this.forums.set_reg&&2===this.forums.set_reg.register_type&&(uni.setStorageSync("register",1),this.$store.dispatch("session/wxh5Login"))):(this.forums&&this.forums.set_reg&&0===this.forums.set_reg.register_type&&uni.navigateTo({url:"/pages/user/login"}),this.forums&&this.forums.set_reg&&1===this.forums.set_reg.register_type&&this.jump2PhoneLoginRegisterPage(),this.forums&&this.forums.set_reg&&2===this.forums.set_reg.register_type&&uni.navigateTo({url:"/pages/user/login"}))},refreshmpParams:function(){var A=arguments.length>0&&void 0!==arguments[0]?arguments[0]:function(){};A()},mpLogin:function(){var A=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;uni.setStorageSync("register",A),uni.setStorageSync("isSend",!0),this.$store.getters["session/get"]("auth").open()},wxh5Login:function(){var A=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;uni.setStorageSync("register",A),uni.setStorageSync("rebind",t),uni.setStorageSync("h5_wechat_login",1),this.$store.dispatch("session/wxh5Login")},getLoginParams:function(A,t){var e=A;if(""===A.data.attributes.username)uni.showToast({icon:"none",title:this.i18n.t("user.usernameEmpty"),duration:2e3});else if(""===A.data.attributes.password)uni.showToast({icon:"none",title:this.i18n.t("user.passwordEmpty"),duration:2e3});else{var i=uni.getStorageSync("token");""!==i&&(e.data.attributes.token=i),this.login(e,t)}},getLoginBindParams:function(A,t){var e=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;this.refreshmpParams();var i=A;if(""===A.data.attributes.username)uni.showToast({icon:"none",title:this.i18n.t("user.usernameEmpty"),duration:2e3});else if(""===A.data.attributes.password)uni.showToast({icon:"none",title:this.i18n.t("user.passwordEmpty"),duration:2e3});else{1===e&&(i.data.attributes.rebind=1);var n=uni.getStorageSync("token");""!==n&&(i.data.attributes.token=n),this.login(i,t)}},login:function(A,e){var i=this;this.$store.dispatch("session/h5Login",A).then((function(A){if(A&&A.data&&A.data.data&&A.data.data.id&&(i.logind(),i.$store.dispatch("jv/get",["forum",{params:{include:"users"}}]).then((function(A){A&&A.set_site&&A.set_site.site_mode!==o.SITE_PAY&&uni.getStorage({key:"page",success:function(A){uni.redirectTo({url:A.data})}}),A&&A.set_site&&A.set_site.site_mode===o.SITE_PAY&&i.user&&!i.user.paid&&uni.redirectTo({url:"/pages/site/info"})})),uni.showToast({title:e,duration:2e3})),A&&A.data&&A.data.errors){if("401"===A.data.errors[0].status||"402"===A.data.errors[0].status||"500"===A.data.errors[0].status){var t=i.i18n.t("core.".concat(A.data.errors[0].code));uni.showToast({icon:"none",title:t,duration:2e3})}if("403"===A.data.errors[0].status||"422"===A.data.errors[0].status){var n=i.i18n.t("core.".concat(A.data.errors[0].code))||i.i18n.t(A.data.errors[0].detail[0]);uni.showToast({icon:"none",title:n,duration:2e3})}}})).catch((function(A){return t.log(A)}))}}}}).call(this,e("5a52").default)},"2c0e":function(A,t,e){"use strict";(function(A){var i=e("4ea4").default;Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,e("ac1f"),e("5319"),e("99af");var n=i(e("6f74")),o=i(e("245f")),s=e("b95e"),r=i(e("4c82")),a=i(e("6354")),u={mixins:[n.default,o.default,r.default,a.default],data:function(){return{tit:!1,test:"",inshow:!1,inisIphone:!1,formeerro:"",btnContent:this.i18n.t("modify.sendverificode"),time:0,timer:"",disabled:!0,phoneNumber:"",verificationCode:"",isPaid:!1,captcha:null,captcha_ticket:"",captcha_rand_str:"",captchaResult:{},forum:{},isWeixin:!1,isShow:!1}},onLoad:function(){var A=this;this.getForum();var t=r.default.isWeixin().isWeixin;this.isWeixin=t,this.$u.event.$on("captchaResult",(function(t){A.ticket=t.ticket,A.randstr=t.randstr,A.time=60,A.countdown(),A.sendSMS()})),this.$u.event.$on("closeChaReault",(function(){uni.hideLoading()}))},onUnload:function(){this.$u.event.$off("captchaResult"),this.$u.event.$off("closeChaReault"),this.captcha&&this.captcha.destroy()},methods:{changeinput:function(){var A=this;setTimeout((function(){A.phoneNumber=A.phoneNumber.replace(/[^\d]/g,"")}),30),11===this.phoneNumber.length?this.disabled=!1:this.disabled=!0},fourse:function(){this.inshow=!0},btndata:function(A){this.verificationCode=A},sendVerificationCode:function(){if(this.forum&&this.forum.qcloud&&this.forum.qcloud.qcloud_captcha){if(!this.ticket||!this.randstr)return this.toTCaptcha(),!1}else this.time=60,this.countdown(),this.sendSMS()},toTCaptcha:function(){var A=this;this.captcha=new TencentCaptcha(this.forum.qcloud.qcloud_captcha_app_id,(function(t){0===t.ret&&(A.ticket=t.ticket,A.randstr=t.randstr,A.time=60,A.countdown(),A.sendSMS()),2===t.ret&&(A.postLoading=!1,uni.hideLoading())})),this.captcha.show()},countdown:function(){this.time>1?(this.time-=1,this.btnContent="".concat(this.time).concat(this.i18n.t("modify.retransmission")),this.disabled=!0,this.timer=setTimeout(this.countdown,1e3),this.isGray=!0):1===this.time&&(this.btnContent=this.i18n.t("modify.sendverificode"),clearTimeout(this.timer),this.disabled=!1,this.isGray=!1)},sendSMS:function(){var t=this,e={_jv:{type:"sms/send"},mobile:this.phoneNumber,type:"login",captcha_ticket:this.ticket,captcha_rand_str:this.randstr};this.$store.dispatch("jv/post",e).then((function(A){A&&(t.ticket="",t.randstr="")})).catch((function(t){A.log(t)}))},login:function(){""===this.phoneNumber?uni.showToast({icon:"none",title:this.i18n.t("user.phonenumberEmpty"),duration:2e3}):""===this.verificationCode?uni.showToast({icon:"none",title:this.i18n.t("user.verificationCodeEmpty"),duration:2e3}):(this.$store.dispatch("session/setPhone",this.phoneNumber),this.verifyPhoneNumber())},verifyPhoneNumber:function(){var t=this,e={data:{attributes:{mobile:this.phoneNumber,code:this.verificationCode,type:"login",register:0}}};this.$store.dispatch("session/verificationCodeh5Login",e).then((function(A){if(A&&A.access_token&&(t.logind(),t.forum&&t.forum.set_site&&t.forum.set_site.site_mode!==s.SITE_PAY&&uni.getStorage({key:"page",success:function(A){uni.redirectTo({url:A.data})}}),t.forum&&t.forum.set_site&&t.forum.set_site.site_mode===s.SITE_PAY&&t.user&&!t.user.paid&&uni.redirectTo({url:"/pages/site/info"}),uni.showToast({title:t.i18n.t("user.loginSuccess"),duration:2e3})),A&&A.data&&A.data.errors){if("401"===A.data.errors[0].status||"402"===A.data.errors[0].status||"500"===A.data.errors[0].status){var e=t.i18n.t("core.".concat(A.data.errors[0].code));uni.showToast({icon:"none",title:e,duration:2e3})}if("403"===A.data.errors[0].status||"422"===A.data.errors[0].status){var i=t.i18n.t(A.data.errors[0].detail[0]);uni.showToast({icon:"none",title:i,duration:2e3})}}})).catch((function(t){A.log(t)}))},toggleBox:function(){this.inshow=!1},jump2WechatLogin:function(){this.isWeixin?this.wxh5Login(0,0):uni.showToast({icon:"none",title:this.i18n.t("user.unLogin"),duration:2e3})},jump2Login:function(){this.jump2LoginPage()},jump2UcLogin:function(){uni.navigateTo({url:"/pages/user/uc-login"})},jump2findpwd:function(){this.jump2findpwdPage()}}};t.default=u}).call(this,e("5a52").default)},"368d":function(A,t,e){A.exports=e.p+"static/img/msg-warning.f35ce51f.svg"},"423f":function(A,t,e){"use strict";e.r(t);var i=e("2c0e"),n=e.n(i);for(var o in i)["default"].indexOf(o)<0&&function(A){e.d(t,A,(function(){return i[A]}))}(o);t.default=n.a},"4bfc":function(A,t,e){var i=e("24fb"),n=e("1de5"),o=e("7a2f");t=i(!1);var s=n(o);t.push([A.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */\n/* eg:\n  .container {\n    color: --color(BG-1);\n  }\n*/uni-page-body[data-v-32e38674]{overflow:scroll;overflow-x:hidden}.phone-login-box[data-v-32e38674]{background-color:var(--qui-BG-2)}.phone-login-box-h[data-v-32e38674]{padding:%?60?% %?0?% %?80?% %?40?%;font-size:%?36?%;font-weight:400;color:#fff;text-align:center;background:url('+s+") no-repeat;background-size:100% 100%}[data-v-32e38674] .qui-back{background:#ff2058;border-bottom:%?5?% solid #ff2058}.new[data-v-32e38674]{width:100vw;padding-bottom:40px;background-color:var(--qui-BG-2);box-sizing:border-box}.new-phon[data-v-32e38674]{width:%?710?%;margin-left:%?40?%;font-size:%?52?%;font-weight:700;line-height:%?100?%;border-bottom:%?2?% solid var(--qui-BOR-ED);box-sizing:border-box}.new-phon-test[data-v-32e38674]{font-size:%?30?%;font-weight:400;line-height:%?100?%;color:var(--qui-FC-777)}.new-phon-number[data-v-32e38674]{display:-webkit-box;display:-webkit-flex;display:flex}.new-phon-num[data-v-32e38674]{width:%?399?%;height:%?100?%;font-size:%?52?%;font-weight:700;line-height:%?100?%;color:var(--qui-FC-333)}.newphon-erro[data-v-32e38674]{margin:%?20?% 0 0 %?40?%;font-size:%?26?%;font-weight:400;color:var(--qui-RED)}.new-phon-send[data-v-32e38674]{display:block;height:%?70?%;min-width:%?180?%;margin:%?15?% 0 0 %?91?%;font-size:%?30?%;font-weight:400;line-height:%?70?%;text-align:center;background:#eee;border-radius:%?5?%}.new-phon-send[data-v-32e38674]:after{border:none}.new-input[data-v-32e38674]{width:%?710?%;margin:0 0 0 %?40?%}.new-input-test[data-v-32e38674]{font-size:%?30?%;font-weight:400;line-height:%?100?%;color:var(--qui-FC-777);opacity:1}.new-vftion-input[data-v-32e38674]{display:-webkit-box;display:-webkit-flex;display:flex;width:100%;height:%?100?%}.new-button[data-v-32e38674]{margin:%?52?% %?40?% 0}.phone-login-box-btn[data-v-32e38674]{width:%?670?%;height:%?90?%;margin:%?50?% auto %?0?%;line-height:%?90?%;color:var(--qui-FC-FFF);text-align:center;background-color:var(--qui-MAIN);background-color:#ea3d5a;border-radius:%?5?%;border-radius:%?44?%}.phone-login-box-pwdlogin[data-v-32e38674]{margin:%?20?% %?0?% %?0?% %?40?%;font-size:%?30?%;color:var(--qui-LINK)}.phone-login-box-ft[data-v-32e38674]{margin:%?160?% 0 %?50?%;text-align:center}.phone-login-box-ft-title[data-v-32e38674]{color:#ddd}.phone-login-box-ft-con[data-v-32e38674]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;margin:%?30?% 0 %?100?%}.phone-login-box-ft-con-image[data-v-32e38674]{display:block;width:%?100?%;height:%?100?%}.phone-login-box-ft-text[data-v-32e38674]{color:#aaa}.right[data-v-32e38674]{margin-right:%?20?%}.left[data-v-32e38674]{margin-left:%?20?%}[data-v-32e38674] .registration-agreement{margin-top:50px}",""]),A.exports=t},"51f4":function(A,t,e){var i=e("4bfc");"string"==typeof i&&(i=[[A.i,i,""]]),i.locals&&(A.exports=i.locals);(0,e("4f06").default)("7eb2e1f2",i,!0,{sourceMap:!1,shadowMode:!1})},6354:function(A,t){},"6f74":function(A,t,e){"use strict";var i=e("b95e");A.exports={computed:{user:function(){var A=this.$store.getters["session/get"]("userId");return A?this.$store.getters["jv/get"]("users/".concat(A)):{}}},methods:{getUserInfo:function(){var A=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=(new Date).getTime(),e=uni.getStorageSync(i.STORGE_GET_USER_TIME);if(A||(t-e)/1e3>60){var n={include:"groups,wechat"},o=this.$store.getters["session/get"]("userId");this.$store.commit("jv/deleteRecord",{_jv:{type:"users",id:o}}),this.$store.dispatch("jv/get",["users/".concat(o),{params:n}]).then((function(){return uni.$emit("updateNotiNum")})),uni.setStorageSync(i.STORGE_GET_USER_TIME,(new Date).getTime())}},logind:function(){var A=this,t=this.$store.getters["session/get"]("userId");if(t){this.$store.dispatch("jv/get",["forum",{params:{include:"users"}}]);this.$store.dispatch("jv/get",["users/".concat(t),{params:{include:"groups,wechat"}}]).then((function(t){A.$u.event.$emit("logind",t)})),this.$store.dispatch("forum/setError",{loading:!1})}}}}},7707:function(A,t,e){"use strict";var i=e("51f4");e.n(i).a},7951:function(A,t,e){"use strict";var i=e("a637");e.d(t,"a",(function(){return i.a})),e.d(t,"b",(function(){return i.b})),e.d(t,"c",(function(){return i.c}))},"7a2f":function(A,t){A.exports="data:image/png;base64,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"},"913c":function(A,t){A.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADIBAMAAABfdrOtAAAAFVBMVEVHcExGRkZGRkZGRkZFRUVGRkZHR0eRrgNKAAAABnRSTlMAFrndSYSvQ3G1AAACxUlEQVR42u2aQW/bMAyFbcfZ2YjRnBN09XnGNp+zS87e1uY82an+/0/YujiLBawS+QgTK8Z3K9r4K0XmiaKVZSaTyWQymUwmk8lkMplMJtN/pLv7zjP08AVgbDxX79mM0vO150JOAMQfeIw1wvBnhUC8r5bOyIs+cCBHEPLMYOQdCBkZ67XyqBj11cCQfuH6ZWb+iEN+LF2/L3JUSK0B6RQghVeAnBQgkrSTIUcFSN4pQGqvAGkUIGuvADkqQEqvAKkVIML6pUEKrwA5KUDEaadAYvU7PoT5+nyPQWJpH/usnP/60ytr6yT168ITy/CricshSJPop/ImPImcAMg62Rlu5oH8PYVOYluXpF1D2f3+8R0fUhIOHlMow+UTWz6kJvS4Uyi710N3EttqZ74zRD7hJLY1zCpwF/mEE9nW7clDrOKdyLZuj44FEoekt91pElBEA4lC8rS/DtNxsI/m0Am33T3Fg5yw2xoqQjE66W61J/xXTrq3z0IpgJ1xyx01NQCE2Df+mTcUfjnI1cEidfJGILLl2vICwRJf8ALBSrhkBgJ9GUm2MgpthWSQrdQgc3ogX2GrJxTxtZW4wvibVvrUe3t2C2+/ydTfHj1UaCORGqDOF6mFW6JEc3eeN3cV2twlrKWfL1GLtqmJb/1hvkJTKEDDHe8hqyDXLXp0iLvkIfiLSxkgkUSnqH1YtC16nIsa2DkMdYQPpmW8vPIm/G7WCwwLnr4HPz99AycS0rEdbYDTaEBWGhCVoZp4zvnvDDrFszsSpNCAZJ0GROWFQKkBUXlJIzQw6ouzRgOy0oDkGhBR6skQlRfMEgMjvyqXGBj9pb9g79rR70hsYQjjIgaees4VHLSKOZdjYANzHAhqYLy7V5vlVysLu2uyeh4kuwMYzDtk0II9V2wI94rix0eAYTKZTCaTyWQymUwmk8lkMr0l/QQpFrC5b3mvpgAAAABJRU5ErkJggg=="},a50a:function(A,t,e){A.exports=e.p+"static/img/zhanghao.1cee4ca4.svg"},a637:function(A,t,e){"use strict";(function(A){var i;e.d(t,"b",(function(){return n})),e.d(t,"c",(function(){return o})),e.d(t,"a",(function(){return i}));try{i={quiPage:e("29c4").default,quiInputCode:e("407a").default,quiRegistrationAgreement:e("aabe").default}}catch(t){if(-1===t.message.indexOf("Cannot find module")||-1===t.message.indexOf(".vue"))throw t;A.error(t.message),A.error("1. 排查组件名称拼写是否正确"),A.error("2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"),A.error("3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件")}var n=function(){var A=this,t=A.$createElement,i=A._self._c||t;return i("qui-page",{staticClass:"phone-login-box",attrs:{"data-qui-theme":A.theme}},[i("v-uni-view",{staticClass:"new",on:{click:function(t){t.stopPropagation(),arguments[0]=t=A.$handleEvent(t),A.toggleBox.apply(void 0,arguments)}}},[i("v-uni-view",{staticClass:"phone-login-box-h"},[A._v(A._s(A.i18n.t("user.phoneNumberLogin")))]),i("v-uni-view",{staticClass:"new-phon"},[i("v-uni-view",{staticClass:"new-phon-test"},[A._v(A._s(A.i18n.t("user.phoneNumber")))]),i("v-uni-view",{staticClass:"new-phon-number"},[i("v-uni-input",{staticClass:"new-phon-num",attrs:{type:"number",maxlength:"11"},on:{input:function(t){arguments[0]=t=A.$handleEvent(t),A.changeinput.apply(void 0,arguments)}},model:{value:A.phoneNumber,callback:function(t){A.phoneNumber=t},expression:"phoneNumber"}}),i("v-uni-button",{staticClass:"new-phon-send",attrs:{id:"TencentCaptcha","data-appid":A.forum&&A.forum.qcloud&&A.forum.qcloud.qcloud_captcha_app_id||"",disabled:A.disabled},on:{click:function(t){arguments[0]=t=A.$handleEvent(t),A.sendVerificationCode.apply(void 0,arguments)}}},[A._v(A._s(A.btnContent))])],1)],1),A.formeerro?i("v-uni-view",{staticClass:"newphon-erro"},[A._v(A._s(A.formeerro))]):A._e(),i("v-uni-view",{staticClass:"new-input",on:{click:function(t){t.stopPropagation(),arguments[0]=t=A.$handleEvent(t),A.fourse.apply(void 0,arguments)}}},[i("v-uni-view",{staticClass:"new-input-test"},[A._v(A._s(A.i18n.t("modify.placeentercode")))]),i("qui-input-code",{ref:"quiinput",attrs:{title:A.tit,text:A.test,show:A.inshow,isiphonex:A.inisIphone},on:{getdata:function(t){arguments[0]=t=A.$handleEvent(t),A.btndata.apply(void 0,arguments)}}})],1),i("v-uni-view",{staticClass:"phone-login-box-btn",on:{click:function(t){arguments[0]=t=A.$handleEvent(t),A.login.apply(void 0,arguments)}}},[A._v(A._s(A.i18n.t("user.login")))]),i("v-uni-view",{staticClass:"phone-login-box-ft"},[A.forum&&A.forum.passport&&A.forum.passport.offiaccount_close||A.forum&&A.forum.ucenter&&A.forum.ucenter.ucenter&&A.isShow?i("v-uni-view",{staticClass:"phone-login-box-ft-title"},[A._v(A._s(A.i18n.t("user.otherLoginMode")))]):A._e(),i("v-uni-view",{staticClass:"phone-login-box-ft-con"},[A.forum&&A.forum.passport&&A.forum.passport.offiaccount_close?i("v-uni-image",{staticClass:"phone-login-box-ft-con-image right",attrs:{"lazy-load":!0,src:e("bab2")},on:{click:function(t){arguments[0]=t=A.$handleEvent(t),A.jump2WechatLogin.apply(void 0,arguments)}}}):A._e(),i("v-uni-image",{class:[A.forum&&A.forum.passport&&A.forum.passport.offiaccount_close?"left":"",A.forum&&A.forum.ucenter&&A.forum.ucenter.ucenter&&A.isShow?"right":"","phone-login-box-ft-con-image"],attrs:{"lazy-load":!0,src:e("a50a")},on:{click:function(t){arguments[0]=t=A.$handleEvent(t),A.jump2Login.apply(void 0,arguments)}}}),A.forum&&A.forum.ucenter&&A.forum.ucenter.ucenter&&A.isShow?i("v-uni-image",{staticClass:"phone-login-box-ft-con-image left",attrs:{"lazy-load":!0,src:e("12d9")},on:{click:function(t){arguments[0]=t=A.$handleEvent(t),A.jump2UcLogin.apply(void 0,arguments)}}}):A._e()],1),A.forum&&A.forum.qcloud&&A.forum.qcloud.qcloud_sms?i("v-uni-view",{staticClass:"phone-login-box-ft-text",on:{click:function(t){arguments[0]=t=A.$handleEvent(t),A.jump2findpwd.apply(void 0,arguments)}}},[A._v(A._s(A.i18n.t("user.forgetPassword")))]):A._e()],1),i("qui-registration-agreement")],1)],1)},o=[]}).call(this,e("5a52").default)},b469:function(A,t){A.exports={computed:{forums:function(){return this.$store.getters["jv/get"]("forums/1")}}}},bab2:function(A,t,e){A.exports=e.p+"static/img/weixin.62460972.svg"},e972:function(A,t,e){A.exports=e.p+"static/img/msg-404.3ba2611f.svg"},ff03:function(A,t,e){"use strict";e.r(t);var i=e("7951"),n=e("423f");for(var o in n)["default"].indexOf(o)<0&&function(A){e.d(t,A,(function(){return n[A]}))}(o);e("7707");var s=e("f0c5"),r=Object(s.a)(n.default,i.b,i.c,!1,null,"32e38674",null,!1,i.a,void 0);t.default=r.exports}}]);