(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{1061:function(t,e,o){"use strict";o.r(e);o(25);var n=o(33),r=o(715),l={name:"ShowAvatar",mixins:[o.n(r).a],props:{userId:{type:String,default:""}},data:function(){return{host:"",header:"",dialogVisible:!0,cropImageFormVisible:!1,previews:{},previewCycle:{},option:{img:"",size:1,full:!1,outputType:"png",canMove:!0,fixedBox:!0,original:!0,canMoveBox:!0,autoCrop:!0,autoCropWidth:150,autoCropHeight:150,centerBox:!1,high:!0,max:99999},show:!0,fixed:!0,fixedNumber:[1,1],downImg:"",loading:!1}},mounted:function(){this.header={authorization:"Bearer ".concat(localStorage.getItem("access_token"))}},methods:{handleClose:function(t){var e=this;this.$confirm("确认关闭？").then((function(){t(),e.$emit("change",e.dialogVisible)})).catch((function(){}))},handleClose2:function(){this.dialogVisible=!1,this.$emit("change",this.dialogVisible)},uploadPhoto:function(){this.$refs.photoFile.click()},selectChange:function(t){var e=t.raw;this.fileChange(e)},fileChange:function(t){var e=t;if(/.(png|jpg|jpeg|JPG|JPEG)$/.test(e.name)){var o=new FileReader;o.readAsDataURL(e);var n=this;o.onload=function(){var t=this.result;n.$nextTick((function(){n.pageImage=t,n.option.img=t,n.cropImageFormVisible=!0}))}}else this.$message({message:"请选择符合格式要求的图片",type:"warning"}),this.$refs.photoFile.value=""},realTime:function(data){this.previews=data,this.previewCycle={width:"".concat(this.previews.w,"px"),height:"".concat(this.previews.h,"px"),overflow:"hidden",margin:"0",zoom:.66666666666}},down:function(){var t=this;this.$refs.cropper.getCropBlob((function(data){t.downImg=data,t.$refs.photoFile.submit(),t.loading=!0}))},httpRequest:function(t){var e=this,o=t.action,data=t.data,r=t.filename,l=new FormData;for(var c in data)l.append(c,data[c]);l.append(r,this.downImg,data.fileName),Object(n.a)({url:o,method:"post",data:l,timeout:2e8}).then((function(t){t&&(e.loading=!1,e.$message.success("图片上传成功"),e.dialogVisible=!1,e.$emit("change",e.dialogVisible))}),(function(t){e.loading=!1,e.handleError(t)}))}}},c=(o(1128),o(11)),component=Object(c.a)(l,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"showAvatar"},[o("el-dialog",{attrs:{title:"头像",visible:t.dialogVisible,width:"620px","before-close":t.handleClose},on:{"update:visible":function(e){t.dialogVisible=e}}},[o("div",{staticClass:"container"},[o("div",{directives:[{name:"show",rawName:"v-show",value:!t.cropImageFormVisible,expression:"!cropImageFormVisible"}],staticStyle:{top:"40%",display:"inline-block",position:"relative","z-index":"999"}},[o("el-upload",{ref:"photoFile",attrs:{action:t.host+"/users/"+t.userId+"/avatar",headers:t.header,accept:"image/*",data:{type:1,order:1},name:"avatar","show-file-list":!1,"auto-upload":!1,"on-change":t.selectChange,"http-request":t.httpRequest}},[o("el-button",{staticStyle:{height:"35px"},attrs:{size:"small"}},[t._v(t._s(t.$t("profile.showavatar")))])],1),t._v(" "),o("p",{staticClass:"uptext"},[t._v("\n          "+t._s(t.$t("profile.supportupload"))+"\n          "),o("span",[t._v(t._s(t.$t("profile.jpgorpng"))+" ")]),t._v(" "+t._s(t.$t("profile.filemost"))+" "),o("span",[t._v("500kb")])])],1),t._v(" "),o("div",{directives:[{name:"show",rawName:"v-show",value:t.cropImageFormVisible,expression:"cropImageFormVisible"}],staticClass:"imgCrop-content"},[o("div",{staticClass:"cropper-content"},[o("VueCropper",{ref:"cropper",attrs:{img:t.option.img,"output-size":t.option.size,"output-type":t.option.outputType,info:!0,full:t.option.full,fixed:t.fixed,"fixed-number":t.fixedNumber,"can-move":t.option.canMove,"can-move-box":t.option.canMoveBox,"fixed-box":t.option.fixedBox,original:t.option.original,"auto-crop":t.option.autoCrop,"auto-crop-width":t.option.autoCropWidth,"auto-crop-height":t.option.autoCropHeight,"center-box":t.option.centerBox,high:t.option.high,mode:"cover","max-img-size":t.option.max},on:{"real-time":t.realTime}})],1)])]),t._v(" "),o("div",{staticClass:"show-preview",style:{width:t.previews.w+"px",height:t.previews.h+"px",overflow:"hidden",display:"inline-block",position:"absolute","margin-left":"17px","margin-top":"4px"}},[o("div",{staticClass:"preview",style:t.previews.div},[o("img",{style:t.previews.img,attrs:{src:t.previews.url}})])]),t._v(" "),o("div",{staticClass:"show-preview",style:{width:"100px",height:"100px",overflow:"hidden",display:"inline-block",position:"absolute","margin-left":"17px","border-radius":"50%",top:"50%"}},[o("div",{staticClass:"preview",style:t.previewCycle},[o("img",{style:t.previews.img,attrs:{src:t.previews.url}})])]),t._v(" "),o("div",{staticClass:"preview2"},[o("div",{staticClass:"square"},[o("span",{staticClass:"squarep"},[t._v(t._s(t.$t("profile.px1")))])]),t._v(" "),o("div",{staticClass:"circle"},[o("span",{staticClass:"squarep"},[t._v(t._s(t.$t("profile.px2")))])]),t._v(" "),o("div",{staticClass:"pre-button"},[o("el-button",{staticClass:"btnw btn_pay1",attrs:{type:"primary",size:"small"},on:{click:t.down}},[t._v(t._s(t.$t("profile.avataruse")))]),t._v(" "),o("el-button",{staticClass:"btnw btn_pay2 btn2",attrs:{size:"small"},on:{click:t.handleClose2}},[t._v(t._s(t.$t("profile.avatarcancel")))])],1)])])],1)}),[],!1,null,"492fafac",null);e.default=component.exports},1062:function(t,e,o){"use strict";o.r(e);var n={name:"VerifyPhone",props:{error:{type:Boolean,default:!1},passwordErrorTip:{type:String,default:""},mobile:{type:String,default:""}},data:function(){return{}},computed:{forums:function(){return this.$store.state.site.info.attributes||{}}},mounted:function(){this.$emit("sendsms")},methods:{empty:function(){this.$refs.walletinput.deleat()},findpaypwd:function(){this.$emit("close"),this.$emit("findpaypwd")}}},r=(o(1129),o(11)),component=Object(r.a)(n,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("message",{attrs:{title:t.$t("modify.authontitle")},on:{close:function(e){return t.$emit("close")}}},[o("div",{staticClass:"container"},[o("div",{staticClass:"block show-amount"},[o("div",{staticClass:"title"},[t._v(t._s("请输入手机 "+t.mobile+" 的验证码"))]),t._v(" "),o("div",{staticClass:"amount"},[o("span",[t._v(t._s(t.$t("modify.editphonewordtip")))])])]),t._v(" "),o("div",{staticClass:"block input-password"},[o("wallet-password-input",{ref:"walletinput",attrs:{error:t.error},on:{password:function(e){return t.$emit("password",e)}}}),t._v(" "),t.error?o("div",{staticClass:"amount"},[t._v(t._s(t.passwordErrorTip?t.passwordErrorTip:t.$t("core.sms_verify_error")))]):t._e()],1)])])}),[],!1,null,"f2c71ed4",null);e.default=component.exports;installComponents(component,{WalletPasswordInput:o(909).default,Message:o(789).default})},1128:function(t,e,o){"use strict";o(998)},1129:function(t,e,o){"use strict";o(999)},789:function(t,e,o){"use strict";o.r(e);var n={name:"Message",props:{title:{type:String,default:""}}},r=(o(887),o(11)),component=Object(r.a)(n,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",[o("Cover"),t._v(" "),o("div",{staticClass:"checkout-counter"},[o("div",{staticClass:"container-title"},[o("div",{staticClass:"title"},[t._v(t._s(t.title))]),t._v(" "),o("svg-icon",{staticStyle:{"font-size":"14px",cursor:"pointer",fill:"#6d6d6d"},attrs:{type:"close"},on:{click:function(e){return t.$emit("close")}}})],1),t._v(" "),t._t("default")],2)],1)}),[],!1,null,"2f83799e",null);e.default=component.exports;installComponents(component,{Cover:o(760).default,SvgIcon:o(62).default})},810:function(t,e,o){},887:function(t,e,o){"use strict";o(810)},996:function(t,e){t.exports={data:function(){return{wehcatTimer:null,wechatBind:{}}},destroyed:function(){window.clearInterval(this.wehcatTimer)},methods:{createQRcode:function(){var t=this;this.$store.dispatch("jv/get","/oauth/wechat/pc/qrcode?type=pc_relation").then((function(e){if(e){t.wechatBind=e;var o=t;t.wehcatTimer=setInterval(o.getWechatStatus,3e3)}}),(function(e){return t.handleError(e)}))},getWechatStatus:function(){var t=this;this.wechatBind&&!this.wechatBind.session_token||this.$store.dispatch("jv/get","/oauth/wechat/pc/bind/".concat(this.wechatBind.session_token)).then((function(e){e._jv.json.bind&&(clearInterval(t.wehcatTimer),t.userinfo(),t.isWechatModify=!1,t.$message.success(t.$t("user.BindSuccess")))}),(function(e){var o=e.response.data.errors;if(Array.isArray(o)&&o.length>0){var n=o[0].detail&&o[0].detail.length>0?o[0].detail[0]:o[0].code,r=o[0].detail&&o[0].detail.length>0?o[0].detail[0]:t.$t("core.".concat(n));if("pc_qrcode_scanning_code"===n)return;clearInterval(t.wehcatTimer),t.$message.error(r),t.createQRcode()}}))}}}},998:function(t,e,o){},999:function(t,e,o){}}]);