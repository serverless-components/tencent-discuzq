(window.webpackJsonp=window.webpackJsonp||[]).push([["pages-modify-paypwd"],{2071:function(t,e,i){"use strict";var s=i("db60");i.n(s).a},"245f":function(t,e,i){"use strict";(function(e){var s=i("4ea4").default,n=s(i("6f74")),r=i("b95e"),o=s(i("4c82"));t.exports={mixins:[n.default,o.default],methods:{getForum:function(){var t=this;this.$store.dispatch("jv/get",["forum",{params:{include:"users"}}]).then((function(e){e&&(t.forum=e)}))},jump2PhoneLoginPage:function(){uni.redirectTo({url:"/pages/user/phone-login"})},jump2PhoneLoginRegisterPage:function(){uni.redirectTo({url:"/pages/user/phone-login-register"})},jump2LoginPage:function(){uni.navigateTo({url:"/pages/user/login"})},jump2RegisterPage:function(){uni.redirectTo({url:"/pages/user/register"})},jump2RegisterExtendPage:function(){uni.redirectTo({url:"/pages/user/supple-mentary"})},jump2LoginBindPage:function(){uni.redirectTo({url:"/pages/user/login-bind"})},jump2RegisterBindPage:function(){uni.redirectTo({url:"/pages/user/register-bind"})},jump2LoginBindPhonePage:function(){uni.redirectTo({url:"/pages/user/login-bind-phone"})},jump2RegisterBindPhonePage:function(){uni.redirectTo({url:"/pages/user/register-bind-phone"})},jump2findpwdPage:function(){uni.navigateTo({url:"/pages/modify/findpwd?pas=reset_pwd"})},mpLoginMode:function(){this.forums&&this.forums.set_reg&&0===this.forums.set_reg.register_type&&this.jump2LoginPage(),this.forums&&this.forums.set_reg&&1===this.forums.set_reg.register_type&&this.jump2PhoneLoginRegisterPage(),this.forums&&this.forums.set_reg&&2===this.forums.set_reg.register_type&&(uni.setStorageSync("register",1),uni.setStorageSync("isSend",!0),this.$store.getters["session/get"]("auth").open())},h5LoginMode:function(){o.default.isWeixin().isWeixin?(this.forums&&this.forums.set_reg&&0===this.forums.set_reg.register_type&&uni.navigateTo({url:"/pages/user/login"}),this.forums&&this.forums.set_reg&&1===this.forums.set_reg.register_type&&this.jump2PhoneLoginRegisterPage(),this.forums&&this.forums.set_reg&&2===this.forums.set_reg.register_type&&(uni.setStorageSync("register",1),this.$store.dispatch("session/wxh5Login"))):(this.forums&&this.forums.set_reg&&0===this.forums.set_reg.register_type&&uni.navigateTo({url:"/pages/user/login"}),this.forums&&this.forums.set_reg&&1===this.forums.set_reg.register_type&&this.jump2PhoneLoginRegisterPage(),this.forums&&this.forums.set_reg&&2===this.forums.set_reg.register_type&&uni.navigateTo({url:"/pages/user/login"}))},refreshmpParams:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:function(){};t()},mpLogin:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;uni.setStorageSync("register",t),uni.setStorageSync("isSend",!0),this.$store.getters["session/get"]("auth").open()},wxh5Login:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;uni.setStorageSync("register",t),uni.setStorageSync("rebind",e),uni.setStorageSync("h5_wechat_login",1),this.$store.dispatch("session/wxh5Login")},getLoginParams:function(t,e){var i=t;if(""===t.data.attributes.username)uni.showToast({icon:"none",title:this.i18n.t("user.usernameEmpty"),duration:2e3});else if(""===t.data.attributes.password)uni.showToast({icon:"none",title:this.i18n.t("user.passwordEmpty"),duration:2e3});else{var s=uni.getStorageSync("token");""!==s&&(i.data.attributes.token=s),this.login(i,e)}},getLoginBindParams:function(t,e){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;this.refreshmpParams();var s=t;if(""===t.data.attributes.username)uni.showToast({icon:"none",title:this.i18n.t("user.usernameEmpty"),duration:2e3});else if(""===t.data.attributes.password)uni.showToast({icon:"none",title:this.i18n.t("user.passwordEmpty"),duration:2e3});else{1===i&&(s.data.attributes.rebind=1);var n=uni.getStorageSync("token");""!==n&&(s.data.attributes.token=n),this.login(s,e)}},login:function(t,i){var s=this;this.$store.dispatch("session/h5Login",t).then((function(t){if(t&&t.data&&t.data.data&&t.data.data.id&&(s.logind(),s.$store.dispatch("jv/get",["forum",{params:{include:"users"}}]).then((function(t){t&&t.set_site&&t.set_site.site_mode!==r.SITE_PAY&&uni.getStorage({key:"page",success:function(t){uni.redirectTo({url:t.data})}}),t&&t.set_site&&t.set_site.site_mode===r.SITE_PAY&&s.user&&!s.user.paid&&uni.redirectTo({url:"/pages/site/info"})})),uni.showToast({title:i,duration:2e3})),t&&t.data&&t.data.errors){if("401"===t.data.errors[0].status||"402"===t.data.errors[0].status||"500"===t.data.errors[0].status){var e=s.i18n.t("core.".concat(t.data.errors[0].code));uni.showToast({icon:"none",title:e,duration:2e3})}if("403"===t.data.errors[0].status||"422"===t.data.errors[0].status){var n=s.i18n.t("core.".concat(t.data.errors[0].code))||s.i18n.t(t.data.errors[0].detail[0]);uni.showToast({icon:"none",title:n,duration:2e3})}}})).catch((function(t){return e.log(t)}))}}}}).call(this,i("5a52").default)},"368d":function(t,e,i){t.exports=i.p+"static/img/msg-warning.f35ce51f.svg"},"411e":function(t,e,i){"use strict";var s=i("fd5e");i.d(e,"a",(function(){return s.a})),i.d(e,"b",(function(){return s.b})),i.d(e,"c",(function(){return s.c}))},5049:function(t,e,i){"use strict";i.r(e);var s=i("6d32"),n=i.n(s);for(var r in s)["default"].indexOf(r)<0&&function(t){i.d(e,t,(function(){return s[t]}))}(r);e.default=n.a},"54d8":function(t,e,i){(e=i("24fb")(!1)).push([t.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */\n/* eg:\n  .container {\n    color: --color(BG-1);\n  }\n*/.page-paypwd[data-v-142b53b9] {background-color:var(--qui-BG-2);box-sizing:border-box}.page-paypwd[data-v-142b53b9] .setpw{width:100vw;background-color:var(--qui-BG-2);box-sizing:border-box}.page-paypwd[data-v-142b53b9] .setpw-input{width:%?710?%;height:%?200?%;padding:%?31?% 0 0 %?40?%;background:var(--qui-BG-2);box-sizing:border-box}.page-paypwd[data-v-142b53b9] .setpw-tit{font-size:%?30?%;font-weight:400;line-height:%?100?%;color:var(--qui-FC-777);opacity:1}',""]),t.exports=e},"6d32":function(t,e,i){"use strict";var s=i("4ea4").default;Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=s(i("5530"));i("ac1f"),i("5319");var r=i("4b36"),o=i("2f62"),a={data:function(){return{userid:"",pas:!0,sun:!1,types:"password",test:"",inputpas:"",repeatpas:"",icon:"none",time:2e3,inshow:!0,inisIphone:!1,usertokenid:"",currs:"",themid:""}},onLoad:function(t){this.userid=this.usersid,t&&(this.usertokenid=t.token||""),this.setRouter&&(this.themid=this.setRouter.replace(/[^0-9]/gi,""))},computed:(0,n.default)({usersid:function(){return this.$store.getters["session/get"]("userId")}},(0,o.mapState)({setRouter:function(t){return t.pay.model}})),methods:{fourse:function(){this.inshow=!0},btndata:function(t){t.length>=6&&(this.inputpas=t,this.pas=!1,this.empty())},btndata2:function(t){t.length>=6&&this.mobelypas(t)},mobelypas:function(t){var e=this,i={_jv:{type:"users",id:this.userid},pay_password_token:this.usertokenid,payPassword:this.inputpas,pay_password_confirmation:t};r.status.run((function(){return e.$store.dispatch("jv/patch",i)})).then((function(t){var i={_jv:{type:"users",id:e.userid}};e.$store.dispatch("jv/get",i).then((function(){}));getCurrentPages();t&&(uni.showToast({title:e.i18n.t("modify.paymentsucceed"),duration:2e3}),e.usertokenid?uni.navigateBack({delta:2}):e.themid?uni.redirectTo({url:"/topic/index?id=".concat(e.themid)}):uni.navigateBack({delta:1}))})).catch((function(i){422===i.statusCode&&(e.inputpas!==t?(e.sun=!0,e.test=e.i18n.t("modify.reenter"),e.empty()):e.inputpas===t&&(uni.showToast({icon:e.icon,title:e.i18n.t("modify.modification"),duration:e.time}),e.empty()))}))},toggleBox:function(){this.inshow=!1},empty:function(){var t=this.$refs.quiinput;t.deleat()}}};e.default=a},"6f74":function(t,e,i){"use strict";var s=i("b95e");t.exports={computed:{user:function(){var t=this.$store.getters["session/get"]("userId");return t?this.$store.getters["jv/get"]("users/".concat(t)):{}}},methods:{getUserInfo:function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0],e=(new Date).getTime(),i=uni.getStorageSync(s.STORGE_GET_USER_TIME);if(t||(e-i)/1e3>60){var n={include:"groups,wechat"},r=this.$store.getters["session/get"]("userId");this.$store.commit("jv/deleteRecord",{_jv:{type:"users",id:r}}),this.$store.dispatch("jv/get",["users/".concat(r),{params:n}]).then((function(){return uni.$emit("updateNotiNum")})),uni.setStorageSync(s.STORGE_GET_USER_TIME,(new Date).getTime())}},logind:function(){var t=this,e=this.$store.getters["session/get"]("userId");if(e){this.$store.dispatch("jv/get",["forum",{params:{include:"users"}}]);this.$store.dispatch("jv/get",["users/".concat(e),{params:{include:"groups,wechat"}}]).then((function(e){t.$u.event.$emit("logind",e)})),this.$store.dispatch("forum/setError",{loading:!1})}}}}},"913c":function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADIBAMAAABfdrOtAAAAFVBMVEVHcExGRkZGRkZGRkZFRUVGRkZHR0eRrgNKAAAABnRSTlMAFrndSYSvQ3G1AAACxUlEQVR42u2aQW/bMAyFbcfZ2YjRnBN09XnGNp+zS87e1uY82an+/0/YujiLBawS+QgTK8Z3K9r4K0XmiaKVZSaTyWQymUwmk8lkMplMJtN/pLv7zjP08AVgbDxX79mM0vO150JOAMQfeIw1wvBnhUC8r5bOyIs+cCBHEPLMYOQdCBkZ67XyqBj11cCQfuH6ZWb+iEN+LF2/L3JUSK0B6RQghVeAnBQgkrSTIUcFSN4pQGqvAGkUIGuvADkqQEqvAKkVIML6pUEKrwA5KUDEaadAYvU7PoT5+nyPQWJpH/usnP/60ytr6yT168ITy/CricshSJPop/ImPImcAMg62Rlu5oH8PYVOYluXpF1D2f3+8R0fUhIOHlMow+UTWz6kJvS4Uyi710N3EttqZ74zRD7hJLY1zCpwF/mEE9nW7clDrOKdyLZuj44FEoekt91pElBEA4lC8rS/DtNxsI/m0Am33T3Fg5yw2xoqQjE66W61J/xXTrq3z0IpgJ1xyx01NQCE2Df+mTcUfjnI1cEidfJGILLl2vICwRJf8ALBSrhkBgJ9GUm2MgpthWSQrdQgc3ogX2GrJxTxtZW4wvibVvrUe3t2C2+/ydTfHj1UaCORGqDOF6mFW6JEc3eeN3cV2twlrKWfL1GLtqmJb/1hvkJTKEDDHe8hqyDXLXp0iLvkIfiLSxkgkUSnqH1YtC16nIsa2DkMdYQPpmW8vPIm/G7WCwwLnr4HPz99AycS0rEdbYDTaEBWGhCVoZp4zvnvDDrFszsSpNCAZJ0GROWFQKkBUXlJIzQw6ouzRgOy0oDkGhBR6skQlRfMEgMjvyqXGBj9pb9g79rR70hsYQjjIgaees4VHLSKOZdjYANzHAhqYLy7V5vlVysLu2uyeh4kuwMYzDtk0II9V2wI94rix0eAYTKZTCaTyWQymUwmk8lkMr0l/QQpFrC5b3mvpgAAAABJRU5ErkJggg=="},b469:function(t,e){t.exports={computed:{forums:function(){return this.$store.getters["jv/get"]("forums/1")}}}},db60:function(t,e,i){var s=i("54d8");"string"==typeof s&&(s=[[t.i,s,""]]),s.locals&&(t.exports=s.locals);(0,i("4f06").default)("c7153b1e",s,!0,{sourceMap:!1,shadowMode:!1})},df13:function(t,e,i){"use strict";i.r(e);var s=i("411e"),n=i("5049");for(var r in n)["default"].indexOf(r)<0&&function(t){i.d(e,t,(function(){return n[t]}))}(r);i("2071");var o=i("f0c5"),a=Object(o.a)(n.default,s.b,s.c,!1,null,"142b53b9",null,!1,s.a,void 0);e.default=a.exports},e972:function(t,e,i){t.exports=i.p+"static/img/msg-404.3ba2611f.svg"},fd5e:function(t,e,i){"use strict";(function(t){var s;i.d(e,"b",(function(){return n})),i.d(e,"c",(function(){return r})),i.d(e,"a",(function(){return s}));try{s={quiPage:i("29c4").default,quiInputCode:i("407a").default}}catch(e){if(-1===e.message.indexOf("Cannot find module")||-1===e.message.indexOf(".vue"))throw e;t.error(e.message),t.error("1. 排查组件名称拼写是否正确"),t.error("2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"),t.error("3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件")}var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("qui-page",{staticClass:"page-paypwd",attrs:{"data-qui-theme":t.theme}},[i("v-uni-view",{staticClass:"setpw",on:{click:function(e){e.stopPropagation(),arguments[0]=e=t.$handleEvent(e),t.toggleBox.apply(void 0,arguments)}}},[t.pas?i("v-uni-view",{staticClass:"setpw-input",on:{click:function(e){e.stopPropagation(),arguments[0]=e=t.$handleEvent(e),t.fourse.apply(void 0,arguments)}}},[i("v-uni-view",{staticClass:"setpw-tit"},[t._v(t._s(t.i18n.t("modify.enterpaymentpas")))]),i("qui-input-code",{ref:"quiinput",attrs:{title:t.sun,text:t.test,show:t.inshow,isiphonex:t.inisIphone,number:t.types},on:{getdata:function(e){arguments[0]=e=t.$handleEvent(e),t.btndata.apply(void 0,arguments)}}})],1):i("v-uni-view",{staticClass:"setpw-input",on:{click:function(e){e.stopPropagation(),arguments[0]=e=t.$handleEvent(e),t.fourse.apply(void 0,arguments)}}},[i("v-uni-view",{staticClass:"setpw-tit"},[t._v(t._s(t.i18n.t("modify.enterpaymentagin")))]),i("qui-input-code",{ref:"quiinput",attrs:{title:t.sun,text:t.test,show:t.inshow,isiphonex:t.inisIphone,number:t.types},on:{getdata:function(e){arguments[0]=e=t.$handleEvent(e),t.btndata2.apply(void 0,arguments)}}})],1)],1)],1)},r=[]}).call(this,i("5a52").default)}}]);