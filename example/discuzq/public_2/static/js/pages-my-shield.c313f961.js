(window.webpackJsonp=window.webpackJsonp||[]).push([["pages-my-shield"],{"0515":function(e,t,i){"use strict";var s=i("2541");i.d(t,"a",(function(){return s.a})),i.d(t,"b",(function(){return s.b})),i.d(t,"c",(function(){return s.c}))},"185d":function(e,t,i){e.exports=i.p+"static/img/auth.51e40f27.svg"},"245f":function(e,t,i){"use strict";(function(t){var s=i("4ea4").default,n=s(i("6f74")),a=i("b95e"),r=s(i("4c82"));e.exports={mixins:[n.default,r.default],methods:{getForum:function(){var e=this;this.$store.dispatch("jv/get",["forum",{params:{include:"users"}}]).then((function(t){t&&(e.forum=t)}))},jump2PhoneLoginPage:function(){uni.redirectTo({url:"/pages/user/phone-login"})},jump2PhoneLoginRegisterPage:function(){uni.redirectTo({url:"/pages/user/phone-login-register"})},jump2LoginPage:function(){uni.navigateTo({url:"/pages/user/login"})},jump2RegisterPage:function(){uni.redirectTo({url:"/pages/user/register"})},jump2RegisterExtendPage:function(){uni.redirectTo({url:"/pages/user/supple-mentary"})},jump2LoginBindPage:function(){uni.redirectTo({url:"/pages/user/login-bind"})},jump2RegisterBindPage:function(){uni.redirectTo({url:"/pages/user/register-bind"})},jump2LoginBindPhonePage:function(){uni.redirectTo({url:"/pages/user/login-bind-phone"})},jump2RegisterBindPhonePage:function(){uni.redirectTo({url:"/pages/user/register-bind-phone"})},jump2findpwdPage:function(){uni.navigateTo({url:"/pages/modify/findpwd?pas=reset_pwd"})},mpLoginMode:function(){this.forums&&this.forums.set_reg&&0===this.forums.set_reg.register_type&&this.jump2LoginPage(),this.forums&&this.forums.set_reg&&1===this.forums.set_reg.register_type&&this.jump2PhoneLoginRegisterPage(),this.forums&&this.forums.set_reg&&2===this.forums.set_reg.register_type&&(uni.setStorageSync("register",1),uni.setStorageSync("isSend",!0),this.$store.getters["session/get"]("auth").open())},h5LoginMode:function(){r.default.isWeixin().isWeixin?(this.forums&&this.forums.set_reg&&0===this.forums.set_reg.register_type&&uni.navigateTo({url:"/pages/user/login"}),this.forums&&this.forums.set_reg&&1===this.forums.set_reg.register_type&&this.jump2PhoneLoginRegisterPage(),this.forums&&this.forums.set_reg&&2===this.forums.set_reg.register_type&&(uni.setStorageSync("register",1),this.$store.dispatch("session/wxh5Login"))):(this.forums&&this.forums.set_reg&&0===this.forums.set_reg.register_type&&uni.navigateTo({url:"/pages/user/login"}),this.forums&&this.forums.set_reg&&1===this.forums.set_reg.register_type&&this.jump2PhoneLoginRegisterPage(),this.forums&&this.forums.set_reg&&2===this.forums.set_reg.register_type&&uni.navigateTo({url:"/pages/user/login"}))},refreshmpParams:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:function(){};e()},mpLogin:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;uni.setStorageSync("register",e),uni.setStorageSync("isSend",!0),this.$store.getters["session/get"]("auth").open()},wxh5Login:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;uni.setStorageSync("register",e),uni.setStorageSync("rebind",t),uni.setStorageSync("h5_wechat_login",1),this.$store.dispatch("session/wxh5Login")},getLoginParams:function(e,t){var i=e;if(""===e.data.attributes.username)uni.showToast({icon:"none",title:this.i18n.t("user.usernameEmpty"),duration:2e3});else if(""===e.data.attributes.password)uni.showToast({icon:"none",title:this.i18n.t("user.passwordEmpty"),duration:2e3});else{var s=uni.getStorageSync("token");""!==s&&(i.data.attributes.token=s),this.login(i,t)}},getLoginBindParams:function(e,t){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;this.refreshmpParams();var s=e;if(""===e.data.attributes.username)uni.showToast({icon:"none",title:this.i18n.t("user.usernameEmpty"),duration:2e3});else if(""===e.data.attributes.password)uni.showToast({icon:"none",title:this.i18n.t("user.passwordEmpty"),duration:2e3});else{1===i&&(s.data.attributes.rebind=1);var n=uni.getStorageSync("token");""!==n&&(s.data.attributes.token=n),this.login(s,t)}},login:function(e,i){var s=this;this.$store.dispatch("session/h5Login",e).then((function(e){if(e&&e.data&&e.data.data&&e.data.data.id&&(s.logind(),s.$store.dispatch("jv/get",["forum",{params:{include:"users"}}]).then((function(e){e&&e.set_site&&e.set_site.site_mode!==a.SITE_PAY&&uni.getStorage({key:"page",success:function(e){uni.redirectTo({url:e.data})}}),e&&e.set_site&&e.set_site.site_mode===a.SITE_PAY&&s.user&&!s.user.paid&&uni.redirectTo({url:"/pages/site/info"})})),uni.showToast({title:i,duration:2e3})),e&&e.data&&e.data.errors){if("401"===e.data.errors[0].status||"402"===e.data.errors[0].status||"500"===e.data.errors[0].status){var t=s.i18n.t("core.".concat(e.data.errors[0].code));uni.showToast({icon:"none",title:t,duration:2e3})}if("403"===e.data.errors[0].status||"422"===e.data.errors[0].status){var n=s.i18n.t("core.".concat(e.data.errors[0].code))||s.i18n.t(e.data.errors[0].detail[0]);uni.showToast({icon:"none",title:n,duration:2e3})}}})).catch((function(e){return t.log(e)}))}}}}).call(this,i("5a52").default)},2541:function(e,t,i){"use strict";(function(e){var s;i.d(t,"b",(function(){return n})),i.d(t,"c",(function(){return a})),i.d(t,"a",(function(){return s}));try{s={quiPage:i("29c4").default,quiIcon:i("895d").default,quiAvatar:i("da98").default,quiCellItem:i("e0ca").default,quiLoadMore:i("51e5").default,quiNoData:i("dd95").default,uniPopup:i("1c89").default}}catch(t){if(-1===t.message.indexOf("Cannot find module")||-1===t.message.indexOf(".vue"))throw t;e.error(t.message),e.error("1. 排查组件名称拼写是否正确"),e.error("2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"),e.error("3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件")}var n=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("qui-page",{staticClass:"shield",attrs:{"data-qui-theme":e.theme}},[i("v-uni-view",{staticClass:"search"},[i("v-uni-view",{directives:[{name:"show",rawName:"v-show",value:e.showSearchInput,expression:"showSearchInput"}],staticClass:"search-addUser",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.showSearch.apply(void 0,arguments)}}},[i("v-uni-view",{staticClass:"search-addUser__inner"},[i("qui-icon",{staticStyle:{"margin-right":"15rpx"},attrs:{name:"icon-add",size:"30",color:"#b5b5b5"}}),i("v-uni-text",[e._v(e._s(e.i18n.t("profile.addshielduser")))])],1)],1),i("v-uni-view",{staticClass:"search-box"},[i("v-uni-view",{staticClass:"search-box__content"},[i("v-uni-view",{staticClass:"icon-content-search"},[i("qui-icon",{attrs:{name:"icon-search",size:"30",color:"#bbb"}})],1),i("v-uni-input",{ref:"inputValue",staticClass:"search-box__content-input",attrs:{type:"text","placeholder-class":"input-placeholder",placeholder:e.i18n.t("search.searchusers"),value:e.searchValue,focus:e.isFocus},on:{input:function(t){arguments[0]=t=e.$handleEvent(t),e.searchInput.apply(void 0,arguments)},blur:function(t){arguments[0]=t=e.$handleEvent(t),e.searchBlur.apply(void 0,arguments)}}}),e.searchValue?i("v-uni-view",{staticClass:"search-box__content-delete",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.cancelSearch.apply(void 0,arguments)}}},[i("qui-icon",{attrs:{name:"icon-close1",size:"32",color:"#ccc"}})],1):e._e()],1),e.searchValue?i("v-uni-view",{staticClass:"search-box__cancel",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.cancelSearch.apply(void 0,arguments)}}},[i("v-uni-text",[e._v(e._s(e.i18n.t("search.cancel")))])],1):e._e()],1)],1),e.searchValue?e._e():i("v-uni-view",{staticClass:"shield-item"},[e.shieldTotal?i("v-uni-scroll-view",{staticClass:"scroll-y",attrs:{"scroll-y":"true","scroll-with-animation":"true","show-scrollbar":"false"},on:{scrolltolower:function(t){arguments[0]=t=e.$handleEvent(t),e.shieldpullDown.apply(void 0,arguments)}}},[e._l(e.shieldList,(function(t,s){return i("v-uni-view",{key:s,staticClass:"shield-item__users"},[i("qui-avatar",{staticClass:"shield-item__users__avatar",attrs:{size:"70",user:t,"is-real":t.isReal}}),i("qui-cell-item",{staticClass:"shield-item__users__content",attrs:{title:t.username,"slot-right":!0}},[i("v-uni-view",{staticClass:"round_frame"},[e.unbundlingID(t.id)?i("v-uni-view",{staticClass:"shield-item__users__operation",attrs:{plain:!0},on:{click:function(i){arguments[0]=i=e.$handleEvent(i),e.shieldUser(t.id,"sheild")}}},[i("qui-icon",{staticClass:"shield-item__users__icon",attrs:{name:"icon-shieldUser",size:"36",color:"#FC8888"}}),i("v-uni-text",{staticStyle:{"margin-left":"9rpx"}},[e._v(e._s(e.i18n.t("profile.shield")))])],1):i("v-uni-view",{staticClass:"shield-item__users__operation",attrs:{plain:!0},on:{click:function(i){arguments[0]=i=e.$handleEvent(i),e.unbundlingUser(t.id)}}},[i("qui-icon",{staticClass:"shield-item__users__icon",attrs:{name:"icon-deleteUser",size:"36",color:"#777777"}}),i("v-uni-text",{staticStyle:{"margin-left":"9rpx"}},[e._v(e._s(e.i18n.t("profile.unbundling")))])],1)],1)],1)],1)})),e.sloadingType?i("qui-load-more",{attrs:{status:e.sloadingType,"show-icon":!1}}):e._e()],2):e._e(),0==e.shieldTotal?i("qui-no-data",{staticClass:"no-data",attrs:{tips:e.i18n.t("profile.noshield")}}):e._e()],1),e.searchValue?i("v-uni-view",{staticClass:"shield-item"},[i("v-uni-scroll-view",{staticClass:"scroll-y",attrs:{"scroll-y":"true","scroll-with-animation":"true","show-scrollbar":"false"},on:{scrolltolower:function(t){arguments[0]=t=e.$handleEvent(t),e.pullDownUsers.apply(void 0,arguments)}}},[e._l(e.userList,(function(t,s){return i("v-uni-view",{key:s,staticClass:"shield-item__users"},[i("qui-avatar",{staticClass:"shield-item__users__avatar",attrs:{size:"70",user:t,"is-real":t.isReal}}),i("qui-cell-item",{staticClass:"shield-item__users__content",attrs:{title:t.username,brief:e.handleGroups(t),"slot-right":!0}},[i("v-uni-view",{staticClass:"shield-item__users__operation",attrs:{plain:!0},on:{click:function(i){arguments[0]=i=e.$handleEvent(i),e.shieldUser(t.id,"user")}}},[i("v-uni-text",[e._v(e._s(e.i18n.t("profile.shield")))]),i("qui-icon",{staticClass:"shield-item__users__icon",attrs:{name:"icon-shieldUser",size:"36",color:"#FC8888"}})],1)],1)],1)})),e.uloadingType?i("qui-load-more",{attrs:{status:e.uloadingType,"show-icon":!1}}):e._e()],2)],1):e._e(),i("uni-popup",{ref:"popShield",attrs:{type:"center"}},[i("uni-popup-dialog",{attrs:{type:"warning","before-close":!0,content:e.i18n.t("profile.shieldusersure")},on:{close:function(t){arguments[0]=t=e.$handleEvent(t),e.handleCancel.apply(void 0,arguments)},confirm:function(t){arguments[0]=t=e.$handleEvent(t),e.handleOk.apply(void 0,arguments)}}})],1)],1)},a=[]}).call(this,i("5a52").default)},"35ab":function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){for(var t=0,i=0;i<e.length;i++)t+=e.charCodeAt(i);var s=function(e,t,i){var s,n,a,r=Math.floor(6*e),o=6*e-r,u=i*(1-t),c=i*(1-o*t),l=i*(1-(1-o)*t);switch(r%6){case 0:s=i,n=l,a=u;break;case 1:s=c,n=i,a=u;break;case 2:s=u,n=i,a=l;break;case 3:s=u,n=c,a=i;break;case 4:s=l,n=u,a=i;break;case 5:s=i,n=u,a=c}return{r:Math.floor(255*s),g:Math.floor(255*n),b:Math.floor(255*a)}}(t%360/360,.3,.9);return""+s.r.toString(16)+s.g.toString(16)+s.b.toString(16)},i("d3b7"),i("25f0")},"368d":function(e,t,i){e.exports=i.p+"static/img/msg-warning.f35ce51f.svg"},"5b24":function(e,t,i){"use strict";i.r(t);var s=i("68a5"),n=i.n(s);for(var a in s)["default"].indexOf(a)<0&&function(e){i.d(t,e,(function(){return s[e]}))}(a);t.default=n.a},"68a5":function(e,t,i){"use strict";var s=i("4ea4").default;Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=s(i("2909"));i("a9e3"),i("4160"),i("159b"),i("99af"),i("4de4"),i("c975"),i("a434"),i("c740"),i("caad"),i("2532");var a={components:{uniPopupDialog:s(i("840a")).default},data:function(){return{showSearchInput:!0,searchValue:"",uloadingType:"",userList:[],uPageNum:1,uPageSize:15,uid:0,sloadingType:"",shieldList:[],sPageNum:1,sPageSize:10,shieldTotal:null,unbundlingArry:[],unbundUserData:[],shieldType:"",isFocus:!1}},onLoad:function(){this.getShieldList(),this.getShieldData()},computed:{userId:function(){return this.$store.getters["session/get"]("userId")}},methods:{showSearch:function(){this.showSearchInput=!1,this.isFocus=!0},searchBlur:function(){this.isFocus=!1},searchInput:function(e){var t=this;this.searchValue=e.target.value,this.unbundlingArry=[],this.uTimeOut&&clearTimeout(this.uTimeOut),this.uTimeOut=setTimeout((function(){t.userList=[],t.uPageNum=1,t.getUserList(e.target.value)}),250)},cancelSearch:function(){this.searchValue="",this.uPageNum=1,this.getUserList("","clear"),this.sPageNum=1,this.shieldList=[],this.getShieldList(),this.isFocus=!1,this.showSearchInput=!0},getShieldData:function(){var e=this;this.$store.dispatch("jv/get","users/".concat(this.userId,"/deny")).then((function(t){t._jv&&delete t._jv,e.unbundUserData=[],e.unbundUserData.push(Number(e.userId)),t.forEach((function(i,s){e.unbundUserData.push(t[s].id)}))}))},getShieldList:function(){var e=this;this.sloadingType="loading";var t={"page[limit]":this.sPageSize,"page[number]":this.sPageNum};this.$store.dispatch("jv/get",["users/".concat(this.userId,"/deny"),{params:t}]).then((function(t){t._jv&&delete t._jv,e.shieldList=[].concat((0,n.default)(e.shieldList),(0,n.default)(t)),e.shieldTotal=e.shieldList.length,e.sloadingType=t.length===e.sPageSize?"more":"nomore"}))},getUserList:function(e,t){var i=this;this.loadingType="loading";var s={include:"groups",sort:"createdAt","page[number]":this.uPageNum,"page[limit]":this.uPageSize,"filter[username]":"*".concat(e,"*")};this.$store.dispatch("jv/get",["users",{params:s}]).then((function(e){e._jv&&delete e._jv,e.forEach((function(t,i){e[i].groupName=t.groups[0]?t.groups[0].name:""})),i.uloadingType=e.length===i.uPageSize?"more":"nomore";var s=e.filter((function(e){return-1===i.unbundUserData.indexOf(e.id)}));i.userList=t&&"clear"===t?s:[].concat((0,n.default)(i.userList),(0,n.default)(s))}))},shieldpullDown:function(){this.sPageNum+=1,this.getShieldList()},pullDownUsers:function(){"more"===this.uloadingType&&(this.uPageNum+=1,this.getUserList(this.searchValue))},shieldUser:function(e,t){this.uid=e,this.shieldType=t,this.$refs.popShield.open()},handleGroups:function(e){var t=[];return e.groups&&e.groups.length>0&&(t=e.groups.filter((function(e){return e.isDisplay}))),t.length>0?t[0].name:""},handleCancel:function(){this.$refs.popShield.close()},handleOk:function(){var e=this;this.$refs.popShield.close();var t={_jv:{type:"users/".concat(this.uid,"/deny")}};this.$store.dispatch("jv/post",t).then((function(){e.unbundlingID(e.uid)&&e.unbundlingArry.splice(e.unbundlingArry.findIndex((function(t){return t===e.uid})),1),e.shieldType&&"user"===e.shieldType?e.cancelSearch():(e.searchValue="",e.uPageNum=1,e.getUserList("","clear")),e.getShieldData()}))},unbundlingUser:function(e){var t=this;this.$store.dispatch("jv/delete","users/".concat(e,"/deny")).then((function(){t.unbundlingArry.push(e),uni.showToast({icon:"none",title:t.i18n.t("profile.unboundsucceed")}),t.getShieldData()}))},unbundlingID:function(e){if(this.unbundlingArry&&this.unbundlingArry.includes(e))return!0}}};t.default=a},"6f74":function(e,t,i){"use strict";var s=i("b95e");e.exports={computed:{user:function(){var e=this.$store.getters["session/get"]("userId");return e?this.$store.getters["jv/get"]("users/".concat(e)):{}}},methods:{getUserInfo:function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=(new Date).getTime(),i=uni.getStorageSync(s.STORGE_GET_USER_TIME);if(e||(t-i)/1e3>60){var n={include:"groups,wechat"},a=this.$store.getters["session/get"]("userId");this.$store.commit("jv/deleteRecord",{_jv:{type:"users",id:a}}),this.$store.dispatch("jv/get",["users/".concat(a),{params:n}]).then((function(){return uni.$emit("updateNotiNum")})),uni.setStorageSync(s.STORGE_GET_USER_TIME,(new Date).getTime())}},logind:function(){var e=this,t=this.$store.getters["session/get"]("userId");if(t){this.$store.dispatch("jv/get",["forum",{params:{include:"users"}}]);this.$store.dispatch("jv/get",["users/".concat(t),{params:{include:"groups,wechat"}}]).then((function(t){e.$u.event.$emit("logind",t)})),this.$store.dispatch("forum/setError",{loading:!1})}}}}},8557:function(e,t,i){"use strict";i.r(t);var s=i("0515"),n=i("5b24");for(var a in n)["default"].indexOf(a)<0&&function(e){i.d(t,e,(function(){return n[e]}))}(a);i("f7e2");var r=i("f0c5"),o=Object(r.a)(n.default,s.b,s.c,!1,null,"ad1bcfb4",null,!1,s.a,void 0);t.default=o.exports},8733:function(e,t,i){var s=i("bcc0");"string"==typeof s&&(s=[[e.i,s,""]]),s.locals&&(e.exports=s.locals);(0,i("4f06").default)("51f94340",s,!0,{sourceMap:!1,shadowMode:!1})},b469:function(e,t){e.exports={computed:{forums:function(){return this.$store.getters["jv/get"]("forums/1")}}}},bcc0:function(e,t,i){(t=i("24fb")(!1)).push([e.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */\n/* eg:\n  .container {\n    color: --color(BG-1);\n  }\n*/.search[data-v-ad1bcfb4]{position:relative}.search .search-addUser[data-v-ad1bcfb4]{position:absolute;z-index:100;width:100%;padding:15px 20px 10px;background-color:var(--qui-BG-2);box-sizing:border-box}.search .search-addUser__inner[data-v-ad1bcfb4]{display:-webkit-box;display:-webkit-flex;display:flex;height:%?80?%;font-size:%?30?%;line-height:%?80?%;color:var(--qui-FC-7D7979);background:var(--qui-BG-IT);border:none;border-radius:%?7?%;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center}.search .search-box[data-v-ad1bcfb4]{background-color:var(--qui-BG-2)}.shield-item[data-v-ad1bcfb4]{background-color:var(--qui-BG-2);border-bottom:%?2?% solid var(--qui-BOR-ED)}.shield-item[data-v-ad1bcfb4] .no-data{padding-top:%?40?%}.shield-item__users[data-v-ad1bcfb4]{position:relative;padding:%?0?% %?20?% %?0?% %?130?%}.shield-item__users__avatar[data-v-ad1bcfb4]{position:absolute;top:%?30?%;left:%?40?%}.shield-item__users__content[data-v-ad1bcfb4]{display:block;padding:%?15?% %?0?%}.shield-item__users__content .round_frame[data-v-ad1bcfb4]{display:-webkit-box;display:-webkit-flex;display:flex;width:%?188?%;height:%?72?%;border:%?2?% solid #e5e5e5;border-radius:%?36?%;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.shield-item__users__operation[data-v-ad1bcfb4]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;margin-right:%?30?%;margin-right:%?0?%;font-size:%?30?%;color:var(--qui-FC-777)}.shield-item__users__icon[data-v-ad1bcfb4]{margin-left:%?15?%}[data-v-ad1bcfb4] .cell-item__body__content-brief{color:var(--qui-FC-DDD)}.scroll-y[data-v-ad1bcfb4]{max-height:calc(100vh - %?200?%)}',""]),e.exports=t},e972:function(e,t,i){e.exports=i.p+"static/img/msg-404.3ba2611f.svg"},f7e2:function(e,t,i){"use strict";var s=i("8733");i.n(s).a}}]);