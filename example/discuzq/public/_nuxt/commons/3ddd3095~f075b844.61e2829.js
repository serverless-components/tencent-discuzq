(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{816:function(e,t,n){e.exports={methods:{handleAttachmentError:function(e){if(e&&e.message){var t=e.message.errors,n=t[0].detail?t[0].detail[0]:t[0].code,r=t[0].detail?t[0].detail[0]:this.$t("core.".concat(n));this.$message.error(r)}else this.$message.error(this.$t("post.imageUploadFail"))}}}},817:function(e,t,n){var r=n(794);n(45),n(25),n(13),n(108),n(36),n(32),e.exports={watch:{fileList:{handler:function(){var e;this.fileList.length>this.previewFiles.length&&0===this.previewFiles.length&&((e=this.previewFiles).push.apply(e,r(this.fileList)),this.previewFiles.map((function(e){e.progress=100})))},deep:!0,immediate:!0}},methods:{uploaderFile:function(e){e.dispatchEvent(new MouseEvent("click"))},onInput:function(e){var t=this,n=e.target.files,r=[];if(this.onUpload)return this.$message.warning(0===this.type?"请等待上传中的文件完成上传":"请等待上传中的图片完成上传");if(this.checkSizeLimit(n)&&this.checkLengthLimit(n)){for(var i=0;i<n.length;i++){var o=this.getObjectURL(n[i]);this.previewFiles.push({name:n[i].name,url:o,progress:0,deleted:!1,size:n[i].size}),r.push(n[i])}var l=r.reduce((function(e,n,r,o){return e.push(t.uploadFile(n,r,o.length)),e}),[]);this.uploadFiles(l)}},uploadFile:function(e,t,n){var r=this,o={onUploadProgress:function(e){e.lengthComputable?r.previewFiles[r.previewFiles.length-n+t].progress=.9*parseInt(Math.round(e.loaded/e.total*100).toString()):r.previewFiles[r.previewFiles.length-n+t].progress=100}},l=new FormData;return l.append("type",this.type),l.append("file",e),this.service.post(this.action,l,o)},uploadFiles:function(e){var t=this;this.$emit("update:onUpload",!0),Promise.all(e).then((function(e){t.previewFiles.map((function(e){e.progress=100}));var n=e.map((function(e){return e.data.data})),o=r(t.fileList);n.forEach((function(e){return o.push({id:e.id,name:e.attributes.fileName,url:e.attributes.url})})),t.currentInput.value="",t.$emit("success",o),t.$emit("update:onUpload",!1)}),(function(n){t.currentInput.value="";var r=e.length;t.$emit("update:onUpload",!1),t.previewFiles.splice(t.previewFiles.length-r,r),401===n.response.status?t.$message.error("暂无权限，请联系管理员"):t.$message.error("您的腾讯云对象存储服务当前不可用，请检查相关配置")}))},removeItem:function(e){var t=this;this.$confirm(this.$t("topic.confirmDelete"),this.$t("discuzq.msgBox.title"),{confirmButtonText:this.$t("discuzq.msgBox.confirm"),cancelButtonText:this.$t("discuzq.msgBox.cancel"),type:"warning"}).then((function(){t.previewFiles[e].deleted=!0;var n=r(t.fileList);n.splice(e,1),t.$emit("remove",n,e),setTimeout((function(){t.previewFiles.splice(e,1),t.$message.success("删除成功")}),900)}),(function(){}))},checkSizeLimit:function(e){for(var t=!0,i=0;i<e.length;i++)e[i].size>this.sizeLimit&&(t=!1);return t||this.$message.error(0===this.type?"文件大小不可超过 ".concat(this.sizeLimit/1024/1024," MB"):"图片大小不可超过 ".concat(this.sizeLimit/1024/1024," MB")),t},checkLengthLimit:function(e){return!(this.previewFiles.length+e.length>this.limit)||(this.$message.warning(0===this.type?"文件最多上传".concat(this.limit,"张"):"图片最多上传".concat(this.limit,"张")),this.$emit("exceed",e),!1)},getObjectURL:function(e){var t=null;return window.createObjectURL?t=window.createObjectURL(e):window.URL?t=window.URL.createObjectURL(e):window.webkitURL&&(t=window.webkitURL.createObjectURL(e)),t}}}},818:function(e,t,n){},826:function(e,t,n){},865:function(e,t,n){"use strict";n.r(t);n(254),n(63);var r=n(714),o=n.n(r),l=n(816),c=n.n(l),d=n(732),m=n(817),v=n.n(m),h=n(33),f={name:"AttachmentUpload",mixins:[o.a,c.a,v.a],props:{action:{type:String,default:"",required:!0},fileList:{type:Array,default:function(){return[]},required:!0},accept:{type:String,default:""},limit:{type:Number,default:9999},sizeLimit:{type:Number,default:1e17},onUpload:{type:Boolean,default:!1},addTips:{type:String,default:""},type:{type:Number,default:0}},data:function(){return{previewFiles:[],currentInput:""}},computed:{input:function(){return document.getElementById("upload")},service:function(){return h.a}},methods:{onClick:function(){var e=this.$refs.uploadFile;this.currentInput=e,this.uploaderFile(e)},extensionValidate:function(e){var t=e.split(".")[e.split(".").length-1];return d.extensionList.indexOf(t.toUpperCase())>0?t.toUpperCase():"UNKNOWN"}}},w=(n(887),n(11)),component=Object(w.a)(f,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{directives:[{name:"viewer",rawName:"v-viewer"}],staticClass:"container-upload"},[n("div",{staticClass:"upload"},[n("span",{staticClass:"attachment-list"},[e._v(e._s(e.$t("post.attachmentList")))]),e._v(" "),n("span",{staticClass:"add-attachment",on:{click:e.onClick}},[e._v(e._s(e.addTips||e.$t("post.addAttachment")))]),e._v(" "),n("input",{ref:"uploadFile",attrs:{id:"upload",accept:e.accept,type:"file",multiple:""},on:{input:e.onInput}})]),e._v(" "),e._l(e.previewFiles,(function(t,r){return n("div",{key:r,class:{"preview-item":!0,deleted:t.deleted}},[n("div",{staticClass:"container-item"},[n("div",{staticClass:"info"},[n("svg-icon",{staticStyle:{"font-size":"18px","vertical-align":"middle"},attrs:{type:e.extensionValidate(t.name)}}),e._v(" "),n("span",{class:{"file-name":!0,uploading:t.progress<100}},[e._v(e._s(t.name))])],1),e._v(" "),n("span",{staticClass:"size"},[e._v(e._s(parseInt((t.size/1024).toString()).toLocaleString())+"\n        KB")]),e._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:t.progress<100,expression:"file.progress < 100"}],staticClass:"progress",style:{width:t.progress+"%"}})]),e._v(" "),n("div",{staticClass:"remove"},[n("svg-icon",{directives:[{name:"show",rawName:"v-show",value:t.progress&&100===t.progress,expression:"file.progress && file.progress === 100"}],staticClass:"remove-icon",attrs:{type:"delete"},on:{click:function(t){return e.removeItem(r)}}})],1)])}))],2)}),[],!1,null,"4e4dc3b6",null);t.default=component.exports;installComponents(component,{SvgIcon:n(62).default})},866:function(e,t,n){"use strict";n.r(t);n(254);var r=n(714),o=n.n(r),l=n(816),c=n.n(l),d=n(817),m=n.n(d),v=n(33),h={name:"ImageUpload",mixins:[o.a,c.a,m.a],props:{action:{type:String,default:"",required:!0},fileList:{type:Array,default:function(){return[]},required:!0},accept:{type:String,default:""},limit:{type:Number,default:9999},sizeLimit:{type:Number,default:1e17},onUpload:{type:Boolean,default:!1},type:{type:Number,default:0}},data:function(){return{previewFiles:[],currentInput:""}},computed:{input:function(){return document.getElementById("upload")},service:function(){return v.a}},methods:{onClick:function(){var e=this.$refs.uploadImage;this.currentInput=e,this.uploaderFile(e)}}},f=(n(888),n(11)),component=Object(f.a)(h,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{directives:[{name:"viewer",rawName:"v-viewer"}],staticClass:"container-upload"},[e._l(e.previewFiles,(function(image,t){return n("div",{key:t,class:{"preview-item":!0,deleted:image.deleted}},[n("img",{attrs:{src:image.url,alt:""}}),e._v(" "),n("el-progress",{directives:[{name:"show",rawName:"v-show",value:image.progress<100,expression:"image.progress < 100"}],staticClass:"progress",attrs:{percentage:image.progress,color:"#25A9F6","show-text":!1}}),e._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:image.progress<100,expression:"image.progress < 100"}],staticClass:"cover"},[e._v("图片上传中...")]),e._v(" "),n("div",{class:{"upload-delete":!0,"show-delete":100===image.progress},on:{click:function(n){return e.removeItem(t)}}},[n("svg-icon",{staticStyle:{"font-size":"14px",fill:"white"},attrs:{type:"delete"}})],1)],1)})),e._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:e.previewFiles.length<e.limit,expression:"previewFiles.length < limit"}],staticClass:"upload",on:{click:function(t){return e.onClick(t)}}},[n("input",{ref:"uploadImage",attrs:{id:"upload",accept:e.accept,type:"file",multiple:""},on:{input:e.onInput}}),e._v(" "),n("svg-icon",{staticClass:"upload-icon",attrs:{type:"add"}})],1)],2)}),[],!1,null,"42e9b14c",null);t.default=component.exports;installComponents(component,{SvgIcon:n(62).default})},887:function(e,t,n){"use strict";n(818)},888:function(e,t,n){"use strict";n(826)}}]);