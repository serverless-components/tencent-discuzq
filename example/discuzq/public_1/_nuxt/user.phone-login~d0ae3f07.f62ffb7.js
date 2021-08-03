(window.webpackJsonp=window.webpackJsonp||[]).push([[55],{1026:function(e,t,r){},1159:function(e,t,r){"use strict";r(1026)},1251:function(e,t,r){"use strict";r.r(t);var o=r(9),n=(r(31),r(52),r(5)),head=r(715),c=r.n(head),d=r(714),l=r.n(d),h=r(793),f=r.n(h),m=r(889),v=r.n(m),_=r(158),C=r.n(_),k={name:"PhoneLogin",mixins:[c.a,l.a,f.a,v.a,C.a],data:function(){return{title:"手机号登录",phoneNumber:"",content:this.$t("modify.sendVerifyCode"),activeName:"0",verifyCode:"",code:"",site_mode:"",isPaid:!1,canClick:!0,ischeck:!0,loading:!1,preurl:"/"}},computed:{forums:function(){return this.$store.state.site.info.attributes||{}}},mounted:function(){var e=this.$route.query,code=e.code,t=e.preurl;t&&(this.preurl=t),"undefined"!==code&&(this.code=code),this.forums&&this.forums.set_site&&this.forums.set_site.site_mode&&(this.site_mode=this.forums.set_site.site_mode)},methods:{check:function(e){this.ischeck=e},changeinput:function(){var e=this;setTimeout((function(){e.phoneNumber=e.phoneNumber.replace(/[^\d]/g,"")}),30),11===this.phoneNumber.length?this.canClick=!0:this.canClick=!1},sendVerifyCode:function(){var e=this;return Object(o.a)(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r={_jv:{type:"sms/send"},mobile:e.phoneNumber,type:"login"},t.next=3,e.checkCaptcha(r);case 3:r=t.sent,n.status.run((function(){return e.$store.dispatch("jv/post",r)})).then((function(t){t.interval&&e.countDown(t.interval)}),(function(t){return e.handleError(t)}));case 5:case"end":return t.stop()}}),t)})))()},PhoneLogin:function(){var e=this;if(this.loading=!0,""===this.phoneNumber)this.$message.error("手机号不能为空"),this.loading=!1;else if(""===this.verifyCode)this.$message.error("验证码不能为空"),this.loading=!1;else if(this.ischeck){var t={data:{attributes:{mobile:this.phoneNumber,code:this.verifyCode,type:"login"}}};this.code&&"undefined"!==this.code&&(t.data.attributes.inviteCode=this.code),this.$store.dispatch("session/verificationCodeh5Login",t).then((function(t){if(e.loading=!1,t&&t.data&&t.data.data&&t.data.data.id&&e.logind(t),t&&t.data&&t.data.errors&&"no_bind_user"===t.data.errors[0].code){var r=t.data.errors[0].token;return localStorage.setItem("mobileToken",r),void e.$router.push("/user/register-bind-phone?phoneNumber=".concat(e.phoneNumber))}if(t&&t.data&&t.data.errors&&"register_validate"===t.data.errors[0].code)return e.$store.commit("session/SET_AUDIT_INFO",{errorCode:"register_validate",username:e.phoneNumber}),void e.$router.push("/user/warning");if(t&&t.data&&t.data.errors&&t.data.errors[0]){var o=t.data.errors[0].detail?t.data.errors[0].detail[0]:t.data.errors[0].code,n=t.data.errors[0].detail?t.data.errors[0].detail[0]:e.$t("core.".concat(o));e.$message.error(n)}})).catch((function(t){e.loading=!1,e.handleError(t)}))}else this.$message.error("请同意协议"),this.loading=!1},toWechat:function(){this.$router.push("/user/wechat?code=".concat(this.code,"&preurl=").concat(this.preurl))},toUserlogin:function(){this.$router.push("/user/login?code=".concat(this.code,"&preurl=").concat(this.preurl))}}},y=(r(1159),r(11)),component=Object(y.a)(k,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return e.forums?r("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticClass:"register"},[r("el-tabs",{staticClass:"register-select",attrs:{type:"border-card"},model:{value:e.activeName,callback:function(t){e.activeName=t},expression:"activeName"}},[e.forums&&e.forums.qcloud&&e.forums.qcloud.qcloud_sms?r("el-tab-pane",{attrs:{label:e.$t("user.phonelogin"),name:"0"}},[r("span",{staticClass:"title2"},[e._v(e._s(e.$t("profile.mobile")))]),e._v(" "),r("el-input",{staticClass:"phone-input",attrs:{placeholder:e.$t("user.phoneNumber"),maxlength:"11"},model:{value:e.phoneNumber,callback:function(t){e.phoneNumber=t},expression:"phoneNumber"}}),e._v(" "),r("el-button",{staticClass:"count-b",class:{disabled:!e.canClick},attrs:{size:"middle"},on:{click:e.sendVerifyCode}},[e._v(e._s(e.content))]),e._v(" "),r("span",{staticClass:"title3"},[e._v(e._s(e.$t("user.verification")))]),e._v(" "),r("el-input",{staticClass:"reg-input",attrs:{placeholder:e.$t("user.verificationCode")},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.PhoneLogin.apply(null,arguments)}},model:{value:e.verifyCode,callback:function(t){e.verifyCode=t},expression:"verifyCode"}}),e._v(" "),r("div",{staticClass:"agreement"},[r("reg-agreement",{on:{check:e.check}})],1),e._v(" "),r("el-button",{staticClass:"r-button",attrs:{type:"primary"},on:{click:e.PhoneLogin}},[e._v(e._s(e.$t("user.login")))]),e._v(" "),r("div",{staticClass:"otherlogin"},[e.forums&&e.forums.passport&&e.forums.passport.oplatform_close&&e.forums.passport.offiaccount_close?r("svg-icon",{staticClass:"wechat-icon",attrs:{type:"wechatlogin"},on:{click:e.toWechat}}):e._e(),e._v(" "),r("svg-icon",{staticClass:"phone-icon",attrs:{type:"userlogin"},on:{click:e.toUserlogin}})],1)],1):e._e()],1)],1):e._e()}),[],!1,null,"7de2fa46",null);t.default=component.exports;installComponents(component,{RegAgreement:r(898).default,SvgIcon:r(62).default})},793:function(e,t,r){r(13),e.exports={computed:{forums:function(){return this.$store.state.site.info.attributes||{}}},methods:{checkCaptcha:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return new Promise((function(r,o){if(e.forums&&e.forums.qcloud&&e.forums.qcloud.qcloud_captcha)return new TencentCaptcha(e.forums.qcloud.qcloud_captcha_app_id,(function(e){0===e.ret&&(t.captcha_rand_str=e.randstr,t.captcha_ticket=e.ticket,r(t))})).show();r(t)}))}}}},889:function(e,t){e.exports={methods:{countDown:function(e){var t=this;if(this.canClick){var r=e;this.canClick=!1,this.content=r+this.$t("modify.retransmission");var o=setInterval((function(){r-=1,t.content=r+t.$t("modify.retransmission"),r<0&&(clearInterval(o),t.content=t.$t("modify.sendVerifyCode"),t.canClick=!0)}),1e3)}}}}}}]);