(window.webpackJsonp=window.webpackJsonp||[]).push([["pages-user-warning"],{"001d":function(e,t,i){"use strict";i.r(t);var s=i("0c95"),n=i("d539");for(var r in n)["default"].indexOf(r)<0&&function(e){i.d(t,e,(function(){return n[e]}))}(r);i("0ec3");var a=i("f0c5"),o=Object(a.a)(n.default,s.b,s.c,!1,null,"50ba645a",null,!1,s.a,void 0);t.default=o.exports},"0c95":function(e,t,i){"use strict";var s=i("70b0");i.d(t,"a",(function(){return s.a})),i.d(t,"b",(function(){return s.b})),i.d(t,"c",(function(){return s.c}))},"0ec3":function(e,t,i){"use strict";var s=i("897a");i.n(s).a},"245f":function(e,t,i){"use strict";(function(t){var s=i("4ea4").default,n=s(i("6f74")),r=i("b95e"),a=s(i("4c82"));e.exports={mixins:[n.default,a.default],methods:{getForum:function(){var e=this;this.$store.dispatch("jv/get",["forum",{params:{include:"users"}}]).then((function(t){t&&(e.forum=t)}))},jump2PhoneLoginPage:function(){uni.redirectTo({url:"/pages/user/phone-login"})},jump2PhoneLoginRegisterPage:function(){uni.redirectTo({url:"/pages/user/phone-login-register"})},jump2LoginPage:function(){uni.navigateTo({url:"/pages/user/login"})},jump2RegisterPage:function(){uni.redirectTo({url:"/pages/user/register"})},jump2RegisterExtendPage:function(){uni.redirectTo({url:"/pages/user/supple-mentary"})},jump2LoginBindPage:function(){uni.redirectTo({url:"/pages/user/login-bind"})},jump2RegisterBindPage:function(){uni.redirectTo({url:"/pages/user/register-bind"})},jump2LoginBindPhonePage:function(){uni.redirectTo({url:"/pages/user/login-bind-phone"})},jump2RegisterBindPhonePage:function(){uni.redirectTo({url:"/pages/user/register-bind-phone"})},jump2findpwdPage:function(){uni.navigateTo({url:"/pages/modify/findpwd?pas=reset_pwd"})},mpLoginMode:function(){this.forums&&this.forums.set_reg&&0===this.forums.set_reg.register_type&&this.jump2LoginPage(),this.forums&&this.forums.set_reg&&1===this.forums.set_reg.register_type&&this.jump2PhoneLoginRegisterPage(),this.forums&&this.forums.set_reg&&2===this.forums.set_reg.register_type&&(uni.setStorageSync("register",1),uni.setStorageSync("isSend",!0),this.$store.getters["session/get"]("auth").open())},h5LoginMode:function(){a.default.isWeixin().isWeixin?(this.forums&&this.forums.set_reg&&0===this.forums.set_reg.register_type&&uni.navigateTo({url:"/pages/user/login"}),this.forums&&this.forums.set_reg&&1===this.forums.set_reg.register_type&&this.jump2PhoneLoginRegisterPage(),this.forums&&this.forums.set_reg&&2===this.forums.set_reg.register_type&&(uni.setStorageSync("register",1),this.$store.dispatch("session/wxh5Login"))):(this.forums&&this.forums.set_reg&&0===this.forums.set_reg.register_type&&uni.navigateTo({url:"/pages/user/login"}),this.forums&&this.forums.set_reg&&1===this.forums.set_reg.register_type&&this.jump2PhoneLoginRegisterPage(),this.forums&&this.forums.set_reg&&2===this.forums.set_reg.register_type&&uni.navigateTo({url:"/pages/user/login"}))},refreshmpParams:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:function(){};e()},mpLogin:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;uni.setStorageSync("register",e),uni.setStorageSync("isSend",!0),this.$store.getters["session/get"]("auth").open()},wxh5Login:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;uni.setStorageSync("register",e),uni.setStorageSync("rebind",t),uni.setStorageSync("h5_wechat_login",1),this.$store.dispatch("session/wxh5Login")},getLoginParams:function(e,t){var i=e;if(""===e.data.attributes.username)uni.showToast({icon:"none",title:this.i18n.t("user.usernameEmpty"),duration:2e3});else if(""===e.data.attributes.password)uni.showToast({icon:"none",title:this.i18n.t("user.passwordEmpty"),duration:2e3});else{var s=uni.getStorageSync("token");""!==s&&(i.data.attributes.token=s),this.login(i,t)}},getLoginBindParams:function(e,t){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;this.refreshmpParams();var s=e;if(""===e.data.attributes.username)uni.showToast({icon:"none",title:this.i18n.t("user.usernameEmpty"),duration:2e3});else if(""===e.data.attributes.password)uni.showToast({icon:"none",title:this.i18n.t("user.passwordEmpty"),duration:2e3});else{1===i&&(s.data.attributes.rebind=1);var n=uni.getStorageSync("token");""!==n&&(s.data.attributes.token=n),this.login(s,t)}},login:function(e,i){var s=this;this.$store.dispatch("session/h5Login",e).then((function(e){if(e&&e.data&&e.data.data&&e.data.data.id&&(s.logind(),s.$store.dispatch("jv/get",["forum",{params:{include:"users"}}]).then((function(e){e&&e.set_site&&e.set_site.site_mode!==r.SITE_PAY&&uni.getStorage({key:"page",success:function(e){uni.redirectTo({url:e.data})}}),e&&e.set_site&&e.set_site.site_mode===r.SITE_PAY&&s.user&&!s.user.paid&&uni.redirectTo({url:"/pages/site/info"})})),uni.showToast({title:i,duration:2e3})),e&&e.data&&e.data.errors){if("401"===e.data.errors[0].status||"402"===e.data.errors[0].status||"500"===e.data.errors[0].status){var t=s.i18n.t("core.".concat(e.data.errors[0].code));uni.showToast({icon:"none",title:t,duration:2e3})}if("403"===e.data.errors[0].status||"422"===e.data.errors[0].status){var n=s.i18n.t("core.".concat(e.data.errors[0].code))||s.i18n.t(e.data.errors[0].detail[0]);uni.showToast({icon:"none",title:n,duration:2e3})}}})).catch((function(e){return t.log(e)}))}}}}).call(this,i("5a52").default)},"6f74":function(e,t,i){"use strict";var s=i("b95e");e.exports={computed:{user:function(){var e=this.$store.getters["session/get"]("userId");return e?this.$store.getters["jv/get"]("users/".concat(e)):{}}},methods:{getUserInfo:function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=(new Date).getTime(),i=uni.getStorageSync(s.STORGE_GET_USER_TIME);if(e||(t-i)/1e3>60){var n={include:"groups,wechat"},r=this.$store.getters["session/get"]("userId");this.$store.commit("jv/deleteRecord",{_jv:{type:"users",id:r}}),this.$store.dispatch("jv/get",["users/".concat(r),{params:n}]).then((function(){return uni.$emit("updateNotiNum")})),uni.setStorageSync(s.STORGE_GET_USER_TIME,(new Date).getTime())}},logind:function(){var e=this,t=this.$store.getters["session/get"]("userId");if(t){this.$store.dispatch("jv/get",["forum",{params:{include:"users"}}]);this.$store.dispatch("jv/get",["users/".concat(t),{params:{include:"groups,wechat"}}]).then((function(t){e.$u.event.$emit("logind",t)})),this.$store.dispatch("forum/setError",{loading:!1})}}}}},"70b0":function(e,t,i){"use strict";(function(e){var s;i.d(t,"b",(function(){return n})),i.d(t,"c",(function(){return r})),i.d(t,"a",(function(){return s}));try{s={quiIcon:i("895d").default,quiButton:i("8397").default}}catch(t){if(-1===t.message.indexOf("Cannot find module")||-1===t.message.indexOf(".vue"))throw t;e.error(t.message),e.error("1. 排查组件名称拼写是否正确"),e.error("2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"),e.error("3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件")}var n=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("v-uni-view",{staticClass:"page-message"},[i("v-uni-view",{staticClass:"page-message--inner"},[i("v-uni-view",{staticClass:"page-message--icon"},["validate_reject"===e.auditInfo.errorCode?i("qui-icon",{attrs:{name:"icon-userLocking",color:"#ddd",size:"120"}}):i("qui-icon",{attrs:{name:"icon-userWait",color:"#008df0",size:"120"}})],1),i("v-uni-view",{staticClass:"page-message--title"},[e._v(e._s("validate_reject"===e.auditInfo.errorCode?e.i18n.t("user.validateReject"):e.i18n.t("user.registerValidate")))]),i("v-uni-view",{staticClass:"page-message--des"},[e._v(e._s("validate_reject"===e.auditInfo.errorCode?e.i18n.t("user.validateRejectDes",{user:e.auditInfo.username,reason:e.auditInfo.reason}):e.i18n.t("user.registerValidateDes",{user:e.auditInfo.username})))]),i("v-uni-view",[e.isShow?i("qui-button",{staticClass:"page-message--btn",attrs:{size:"medium"},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.handleLoginClick.apply(void 0,arguments)}}},[e._v(e._s(e.i18n.t("user.exitLogin")))]):e._e()],1)],1)],1)},r=[]}).call(this,i("5a52").default)},"897a":function(e,t,i){var s=i("8b74");"string"==typeof s&&(s=[[e.i,s,""]]),s.locals&&(e.exports=s.locals);(0,i("4f06").default)("0bef2a5a",s,!0,{sourceMap:!1,shadowMode:!1})},"8b74":function(e,t,i){(t=i("24fb")(!1)).push([e.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.page-message[data-v-50ba645a]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center}.page-message--inner[data-v-50ba645a]{position:relative;padding-bottom:%?20?%;margin-top:%?140?%;text-align:center}.page-message--title[data-v-50ba645a]{max-width:%?510?%;margin:%?58?% auto %?20?%;font-size:%?36?%;font-weight:700;line-height:%?45?%;color:#333}.page-message--des[data-v-50ba645a]{max-width:%?510?%;margin:0 auto %?50?%;font-size:%?28?%;line-height:%?40?%;color:#aaa}.page-message--btn[data-v-50ba645a]{color:#7d7979;border:%?2?% solid #ededed}',""]),e.exports=t},b469:function(e,t){e.exports={computed:{forums:function(){return this.$store.getters["jv/get"]("forums/1")}}}},d539:function(e,t,i){"use strict";i.r(t);var s=i("df6d"),n=i.n(s);for(var r in s)["default"].indexOf(r)<0&&function(e){i.d(t,e,(function(){return s[e]}))}(r);t.default=n.a},df6d:function(e,t,i){"use strict";var s=i("4ea4").default;Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=s(i("b469")),r=s(i("4c82")),a=s(i("245f")),o={mixins:[n.default,r.default,a.default],data:function(){return{isShow:!0,isWeixin:!1,registerType:0}},computed:{auditInfo:function(){var e=this.$store.state.session.auditInfo;return e}},onShow:function(){},mounted:function(){var e=uni.getStorageSync("register_type");this.registerType=e,"validate_reject"===this.auditInfo?uni.setNavigationBarTitle({title:"账号未通过审核"}):uni.setNavigationBarTitle({title:"账号审核中"})},created:function(){this.isWeixin=r.default.isWeixin().isWeixin,2!==this.registerType?this.isShow=!0:this.isWeixin?this.isShow=!1:this.isShow=!0},methods:{handleLoginClick:function(){var e=this;this.$store.dispatch("session/logout").then((function(){uni.clearStorage(),uni.redirectTo({url:"/pages/home/index",success:function(){e.getForum()}})}))}}};t.default=o}}]);