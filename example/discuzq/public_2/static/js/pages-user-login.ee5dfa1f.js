(window.webpackJsonp=window.webpackJsonp||[]).push([["pages-user-login"],{"0496":function(A,t,e){"use strict";var i=e("b8bd");e.d(t,"a",(function(){return i.a})),e.d(t,"b",(function(){return i.b})),e.d(t,"c",(function(){return i.c}))},"12d9":function(A,t,e){A.exports=e.p+"static/img/UC.d41d8cd9.svg"},"245f":function(A,t,e){"use strict";(function(t){var i=e("4ea4").default,s=i(e("6f74")),n=e("b95e"),o=i(e("4c82"));A.exports={mixins:[s.default,o.default],methods:{getForum:function(){var A=this;this.$store.dispatch("jv/get",["forum",{params:{include:"users"}}]).then((function(t){t&&(A.forum=t)}))},jump2PhoneLoginPage:function(){uni.redirectTo({url:"/pages/user/phone-login"})},jump2PhoneLoginRegisterPage:function(){uni.redirectTo({url:"/pages/user/phone-login-register"})},jump2LoginPage:function(){uni.navigateTo({url:"/pages/user/login"})},jump2RegisterPage:function(){uni.redirectTo({url:"/pages/user/register"})},jump2RegisterExtendPage:function(){uni.redirectTo({url:"/pages/user/supple-mentary"})},jump2LoginBindPage:function(){uni.redirectTo({url:"/pages/user/login-bind"})},jump2RegisterBindPage:function(){uni.redirectTo({url:"/pages/user/register-bind"})},jump2LoginBindPhonePage:function(){uni.redirectTo({url:"/pages/user/login-bind-phone"})},jump2RegisterBindPhonePage:function(){uni.redirectTo({url:"/pages/user/register-bind-phone"})},jump2findpwdPage:function(){uni.navigateTo({url:"/pages/modify/findpwd?pas=reset_pwd"})},mpLoginMode:function(){this.forums&&this.forums.set_reg&&0===this.forums.set_reg.register_type&&this.jump2LoginPage(),this.forums&&this.forums.set_reg&&1===this.forums.set_reg.register_type&&this.jump2PhoneLoginRegisterPage(),this.forums&&this.forums.set_reg&&2===this.forums.set_reg.register_type&&(uni.setStorageSync("register",1),uni.setStorageSync("isSend",!0),this.$store.getters["session/get"]("auth").open())},h5LoginMode:function(){o.default.isWeixin().isWeixin?(this.forums&&this.forums.set_reg&&0===this.forums.set_reg.register_type&&uni.navigateTo({url:"/pages/user/login"}),this.forums&&this.forums.set_reg&&1===this.forums.set_reg.register_type&&this.jump2PhoneLoginRegisterPage(),this.forums&&this.forums.set_reg&&2===this.forums.set_reg.register_type&&(uni.setStorageSync("register",1),this.$store.dispatch("session/wxh5Login"))):(this.forums&&this.forums.set_reg&&0===this.forums.set_reg.register_type&&uni.navigateTo({url:"/pages/user/login"}),this.forums&&this.forums.set_reg&&1===this.forums.set_reg.register_type&&this.jump2PhoneLoginRegisterPage(),this.forums&&this.forums.set_reg&&2===this.forums.set_reg.register_type&&uni.navigateTo({url:"/pages/user/login"}))},refreshmpParams:function(){var A=arguments.length>0&&void 0!==arguments[0]?arguments[0]:function(){};A()},mpLogin:function(){var A=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;uni.setStorageSync("register",A),uni.setStorageSync("isSend",!0),this.$store.getters["session/get"]("auth").open()},wxh5Login:function(){var A=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;uni.setStorageSync("register",A),uni.setStorageSync("rebind",t),uni.setStorageSync("h5_wechat_login",1),this.$store.dispatch("session/wxh5Login")},getLoginParams:function(A,t){var e=A;if(""===A.data.attributes.username)uni.showToast({icon:"none",title:this.i18n.t("user.usernameEmpty"),duration:2e3});else if(""===A.data.attributes.password)uni.showToast({icon:"none",title:this.i18n.t("user.passwordEmpty"),duration:2e3});else{var i=uni.getStorageSync("token");""!==i&&(e.data.attributes.token=i),this.login(e,t)}},getLoginBindParams:function(A,t){var e=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;this.refreshmpParams();var i=A;if(""===A.data.attributes.username)uni.showToast({icon:"none",title:this.i18n.t("user.usernameEmpty"),duration:2e3});else if(""===A.data.attributes.password)uni.showToast({icon:"none",title:this.i18n.t("user.passwordEmpty"),duration:2e3});else{1===e&&(i.data.attributes.rebind=1);var s=uni.getStorageSync("token");""!==s&&(i.data.attributes.token=s),this.login(i,t)}},login:function(A,e){var i=this;this.$store.dispatch("session/h5Login",A).then((function(A){if(A&&A.data&&A.data.data&&A.data.data.id&&(i.logind(),i.$store.dispatch("jv/get",["forum",{params:{include:"users"}}]).then((function(A){A&&A.set_site&&A.set_site.site_mode!==n.SITE_PAY&&uni.getStorage({key:"page",success:function(A){uni.redirectTo({url:A.data})}}),A&&A.set_site&&A.set_site.site_mode===n.SITE_PAY&&i.user&&!i.user.paid&&uni.redirectTo({url:"/pages/site/info"})})),uni.showToast({title:e,duration:2e3})),A&&A.data&&A.data.errors){if("401"===A.data.errors[0].status||"402"===A.data.errors[0].status||"500"===A.data.errors[0].status){var t=i.i18n.t("core.".concat(A.data.errors[0].code));uni.showToast({icon:"none",title:t,duration:2e3})}if("403"===A.data.errors[0].status||"422"===A.data.errors[0].status){var s=i.i18n.t("core.".concat(A.data.errors[0].code))||i.i18n.t(A.data.errors[0].detail[0]);uni.showToast({icon:"none",title:s,duration:2e3})}}})).catch((function(A){return t.log(A)}))}}}}).call(this,e("5a52").default)},"27bc":function(A,t,e){A.exports=e.p+"static/img/shouji.973736f8.svg"},"368d":function(A,t,e){A.exports=e.p+"static/img/msg-warning.f35ce51f.svg"},"389a":function(A,t,e){var i=e("24fb"),s=e("1de5"),n=e("7a2f");t=i(!1);var o=s(n);t.push([A.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */\n/* eg:\n  .container {\n    color: --color(BG-1);\n  }\n*/.login-box[data-v-cc756c80]{width:100%;padding-bottom:40px;font-size:%?30?%;background-color:var(--qui-BG-2)}.login-box[data-v-cc756c80] .qui-back{background:#ff2058;border-bottom:%?5?% solid #ff2058}.login-box-h[data-v-cc756c80]{padding:%?60?% %?0?% %?80?% %?40?%;font-size:%?36?%;font-weight:400;color:#fff;text-align:center;background:url('+o+") no-repeat;background-size:100% 100%}.login-box-con[data-v-cc756c80]{margin:%?0?% %?40?%}.login-box-con .input[data-v-cc756c80]{width:100%;height:%?100?%;padding:%?0?% %?0?% %?0?% %?20?%;font-family:PingFang SC;font-size:%?28?%;font-weight:400;line-height:24px;color:#c5c6cb;text-align:left;border-bottom:%?2?% solid var(--qui-BOR-ED)}.login-box-btn[data-v-cc756c80]{width:%?649?%;height:%?88?%;margin:%?50?% auto %?0?%;line-height:%?90?%;color:var(--qui-FC-FFF);text-align:center;background:var(--qui-THEME-RED);border-radius:44px}[data-v-cc756c80] .login-box-ft-btn{color:var(--qui-THEME-RED)}",""]),A.exports=t},"54da":function(A,t,e){"use strict";e.r(t);var i=e("d06d"),s=e.n(i);for(var n in i)["default"].indexOf(n)<0&&function(A){e.d(t,A,(function(){return i[A]}))}(n);t.default=s.a},"6f74":function(A,t,e){"use strict";var i=e("b95e");A.exports={computed:{user:function(){var A=this.$store.getters["session/get"]("userId");return A?this.$store.getters["jv/get"]("users/".concat(A)):{}}},methods:{getUserInfo:function(){var A=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=(new Date).getTime(),e=uni.getStorageSync(i.STORGE_GET_USER_TIME);if(A||(t-e)/1e3>60){var s={include:"groups,wechat"},n=this.$store.getters["session/get"]("userId");this.$store.commit("jv/deleteRecord",{_jv:{type:"users",id:n}}),this.$store.dispatch("jv/get",["users/".concat(n),{params:s}]).then((function(){return uni.$emit("updateNotiNum")})),uni.setStorageSync(i.STORGE_GET_USER_TIME,(new Date).getTime())}},logind:function(){var A=this,t=this.$store.getters["session/get"]("userId");if(t){this.$store.dispatch("jv/get",["forum",{params:{include:"users"}}]);this.$store.dispatch("jv/get",["users/".concat(t),{params:{include:"groups,wechat"}}]).then((function(t){A.$u.event.$emit("logind",t)})),this.$store.dispatch("forum/setError",{loading:!1})}}}}},"7a2f":function(A,t){A.exports="data:image/png;base64,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"},"7d26":function(A,t,e){var i=e("389a");"string"==typeof i&&(i=[[A.i,i,""]]),i.locals&&(A.exports=i.locals);(0,e("4f06").default)("15d2b956",i,!0,{sourceMap:!1,shadowMode:!1})},8946:function(A,t,e){"use strict";e.r(t);var i=e("0496"),s=e("54da");for(var n in s)["default"].indexOf(n)<0&&function(A){e.d(t,A,(function(){return s[A]}))}(n);e("8e9a");var o=e("f0c5"),r=Object(o.a)(s.default,i.b,i.c,!1,null,"cc756c80",null,!1,i.a,void 0);t.default=r.exports},"8e9a":function(A,t,e){"use strict";var i=e("7d26");e.n(i).a},b469:function(A,t){A.exports={computed:{forums:function(){return this.$store.getters["jv/get"]("forums/1")}}}},b8bd:function(A,t,e){"use strict";(function(A){var i;e.d(t,"b",(function(){return s})),e.d(t,"c",(function(){return n})),e.d(t,"a",(function(){return i}));try{i={quiPage:e("29c4").default,quiLoginMode:e("3287").default,quiRegistrationAgreement:e("aabe").default}}catch(t){if(-1===t.message.indexOf("Cannot find module")||-1===t.message.indexOf(".vue"))throw t;A.error(t.message),A.error("1. 排查组件名称拼写是否正确"),A.error("2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"),A.error("3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件")}var s=function(){var A=this,t=A.$createElement,e=A._self._c||t;return e("qui-page",{staticClass:"login-box",attrs:{"data-qui-theme":A.theme}},[e("v-uni-view",[e("v-uni-view",{staticClass:"login-box-h"},[A._v(A._s(A.i18n.t("user.login")))]),e("v-uni-view",{staticClass:"login-box-con"},[e("v-uni-input",{staticClass:"input",attrs:{maxlength:"15",placeholder:A.i18n.t("user.username"),"placeholder-style":"color: #ddd"},model:{value:A.username,callback:function(t){A.username=t},expression:"username"}}),e("v-uni-input",{staticClass:"input",attrs:{type:"password",maxlength:"50",placeholder:A.i18n.t("user.password"),"placeholder-style":"color: #ddd"},model:{value:A.password,callback:function(t){A.password=t},expression:"password"}})],1),e("v-uni-view",{staticClass:"login-box-btn",on:{click:function(t){arguments[0]=t=A.$handleEvent(t),A.handleLogin.apply(void 0,arguments)}}},[A._v(A._s(A.i18n.t("user.login")))]),e("qui-login-mode",{attrs:{"show-wx-icon":A.showH5Icon,"show-phone-icon":A.showPhoneIcon,"show-uc-icon":A.showUcIcon,"show-register-btn":A.showRegisterBtn,"is-no-sense-mode":A.isNoSenseMode,"is-weixin":A.isWeixin},on:{jump2WechatLogin:function(t){arguments[0]=t=A.$handleEvent(t),A.jump2WechatLogin.apply(void 0,arguments)},jump2PhoneLogin:function(t){arguments[0]=t=A.$handleEvent(t),A.jump2PhoneLogin.apply(void 0,arguments)},jump2UcLogin:function(t){arguments[0]=t=A.$handleEvent(t),A.jump2UcLogin.apply(void 0,arguments)},jump2Register:function(t){arguments[0]=t=A.$handleEvent(t),A.jump2Register.apply(void 0,arguments)},jump2findpwd:function(t){arguments[0]=t=A.$handleEvent(t),A.jump2findpwd.apply(void 0,arguments)}}})],1),e("qui-registration-agreement")],1)},n=[]}).call(this,e("5a52").default)},bab2:function(A,t,e){A.exports=e.p+"static/img/weixin.62460972.svg"},d06d:function(A,t,e){"use strict";var i=e("4ea4").default;Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var s=i(e("6f74")),n=i(e("245f")),o=i(e("4c82")),r={mixins:[s.default,n.default,o.default],data:function(){return{username:"",password:"",isPaid:!1,forum:{},isShow:!1,isWeixin:!1}},computed:{showMpIcon:function(){return this.forum&&this.forum.passport&&this.forum.passport.miniprogram_close},showH5Icon:function(){return this.forum&&this.forum.passport&&this.forum.passport.offiaccount_close},showPhoneIcon:function(){return this.forum&&this.forum.qcloud&&this.forum.qcloud.qcloud_sms},showUcIcon:function(){return this.forum&&this.forum.ucenter&&this.forum.ucenter.ucenter&&this.isShow},showRegisterBtn:function(){return this.forum&&this.forum.set_reg&&0===this.forum.set_reg.register_type&&this.forum.set_reg.register_close},isNoSenseMode:function(){return this.forum&&this.forum.set_reg&&2!==this.forum.set_reg.register_type}},onLoad:function(){this.$store.dispatch("forum/setError",{code:"user_login",status:200}),this.getForum();var A=o.default.isWeixin().isWeixin;this.isWeixin=A},methods:{handleLogin:function(){var A={data:{attributes:{username:this.username,password:this.password}}};this.getLoginParams(A,this.i18n.t("user.loginSuccess"))},jump2WechatLogin:function(){this.isWeixin?this.wxh5Login(0,0):uni.showToast({icon:"none",title:this.i18n.t("user.unLogin"),duration:2e3})},jump2PhoneLogin:function(){this.forum&&this.forum.set_reg&&0===this.forum.set_reg.register_type?this.jump2PhoneLoginPage():this.jump2PhoneLoginRegisterPage()},jump2Register:function(){!this.isWeixin&&this.forum&&this.forum.set_reg&&2===this.forum.set_reg.register_type?uni.showToast({icon:"none",title:this.i18n.t("user.unLogin"),duration:2e3}):this.jump2RegisterPage()},jump2findpwd:function(){this.jump2findpwdPage()},jump2UcLogin:function(){uni.navigateTo({url:"/pages/user/uc-login"})}}};t.default=r},e972:function(A,t,e){A.exports=e.p+"static/img/msg-404.3ba2611f.svg"}}]);