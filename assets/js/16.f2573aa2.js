(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{12:function(t,e,n){var a=n(30)("wks"),i=n(31),s=n(11).Symbol,r="function"==typeof s;(t.exports=function(t){return a[t]||(a[t]=r&&s[t]||(r?s:i)("Symbol."+t))}).store=a},185:function(t,e,n){"use strict";var a=n(88);n.n(a).a},186:function(t,e,n){"use strict";var a=n(89);n.n(a).a},187:function(t,e,n){"use strict";var a=n(90);n.n(a).a},189:function(t,e,n){},216:function(t,e,n){"use strict";n(54);var a=n(79),i=n(27),s={name:"c-sub-nav",inject:["root","vertical"],directives:{ClickOutside:a.a},components:{"c-icon":i.a},props:{name:{type:String}},data:function(){return{open:!1}},computed:{active:function(){return console.log("active",this.root.selectedItemNameArr.indexOf(this.name)>-1),this.root.selectedItemNameArr.indexOf(this.name)>-1}},methods:{onClick:function(){this.open=!this.open},close:function(){this.open=!1},updateSelectedItemNameArr:function(){this.root.selectedItemNameArr.unshift(this.name),this.$parent.updateSelectedItemNameArr&&this.$parent.updateSelectedItemNameArr()},enter:function(t,e){var n=t.getBoundingClientRect().height;console.log(n),t.style.height=0,t.getBoundingClientRect(),t.style.height="".concat(n,"px"),t.addEventListener("transitionend",function(){e()})},afterEnter:function(t){t.style.height="auto"},leave:function(t,e){var n=t.getBoundingClientRect().height;t.style.height="".concat(n,"px"),t.getBoundingClientRect(),t.style.height=0,t.addEventListener("transitionend",function(){e()})},afterLeave:function(t){t.style.height="auto"}},beforeDestroy:function(){Object(a.b)()}},r=(n(187),n(1)),c=Object(r.a)(s,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{directives:[{name:"click-outside",rawName:"v-click-outside",value:t.close,expression:"close"}],staticClass:"sub-nav-wrap",class:{active:t.active,vertical:t.vertical}},[n("p",{staticClass:"sub-title",on:{click:t.onClick}},[t._t("title"),t._v(" "),n("span",{staticClass:"icon-wrap",class:{open:t.open}},[n("c-icon",{staticClass:"icon",attrs:{name:"right"}})],1)],2),t._v(" "),t.vertical?[n("transition",{on:{"after-enter":t.afterEnter,enter:t.enter,leave:t.leave,"after-leave":t.afterLeave}},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.open,expression:"open"}],staticClass:"sub-nav"},[t._t("default")],2)])]:n("div",{directives:[{name:"show",rawName:"v-show",value:t.open,expression:"open"}],staticClass:"sub-nav"},[t._t("default")],2)],2)},[],!1,null,"6303c8a2",null);e.a=c.exports},217:function(t,e,n){"use strict";n(54);var a={name:"c-nav-item",inject:["root","vertical"],props:{name:{type:String}},data:function(){return{active:!1}},methods:{onClick:function(){this.root.selectedItemNameArr=[],this.$parent.updateSelectedItemNameArr&&this.$parent.updateSelectedItemNameArr(),this.$emit("add:selected",this.name)}},created:function(){this.root.addItem(this)}},i=(n(186),n(1)),s=Object(i.a)(a,function(){var t=this.$createElement;return(this._self._c||t)("div",{staticClass:"nav-item-wrap",class:{active:this.active,vertical:this.vertical},on:{click:this.onClick}},[this._t("default")],2)},[],!1,null,"4222b499",null);e.a=s.exports},218:function(t,e,n){"use strict";n(54),n(47);var a={name:"c-nav",provide:function(){return{root:this,vertical:this.vertical}},props:{activeItems:{type:Array,default:function(){return[]}},multiple:{type:Boolean,default:!1},vertical:{type:Boolean,default:!1}},data:function(){return{navItems:[],selectedItemNameArr:[]}},mounted:function(){this.updateItemStatus(),this.addListenerToChildren()},updated:function(){this.updateItemStatus()},methods:{updateItemStatus:function(){var t=this;this.navItems.forEach(function(e){t.activeItems.indexOf(e.name)>-1?e.active=!0:e.active=!1})},addListenerToChildren:function(){var t=this;this.navItems.forEach(function(e){e.$on("add:selected",function(e){if(t.multiple){if(t.activeItems.indexOf(e)<0){console.log("");var n=JSON.parse(JSON.stringify(t.activeItems));n.push(e),t.$emit("update:activeItems",n)}}else t.$emit("update:activeItems",[e])})})},addItem:function(t){this.navItems.push(t)}}},i=(n(185),n(1)),s=Object(i.a)(a,function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("div",{staticClass:"c-nav-wrap",class:{vertical:this.vertical}},[this._t("default")],2)])},[],!1,null,"666ea1c4",null);e.a=s.exports},23:function(t,e){t.exports={}},300:function(t,e,n){"use strict";var a=n(189);n.n(a).a},351:function(t,e,n){"use strict";n.r(e);var a=n(218),i=n(217),s=n(216),r={name:"nav-demo",components:{"c-nav":a.a,"c-nav-item":i.a,"c-sub-nav":s.a},data:function(){return{activeItems:["home"],code:'<c-nav :active-items.sync="activeItems" :vertical="true" style="width: 8em;">\n    <c-nav-item name="home">\n        <a href="">首页</a>\n    </c-nav-item>\n    <c-sub-nav name="about">\n        <template slot="title">关于</template>\n        <c-nav-item name="culture">企业文化</c-nav-item>\n        <c-nav-item name="dev">开发团队</c-nav-item>\n        <c-sub-nav name="contact">\n            <template slot="title">联系方式</template>\n            <c-nav-item name="qq">QQ</c-nav-item>\n            <c-nav-item name="wechat">WeChat</c-nav-item>\n            <c-sub-nav name="phone">\n                <template slot="title">手机号</template>\n                <c-nav-item name="in">国内：111</c-nav-item>\n                <c-nav-item name="out">国外：222</c-nav-item>\n            </c-sub-nav>\n        </c-sub-nav>\n    </c-sub-nav>\n    <c-nav-item name="other">其他</c-nav-item>\n</c-nav>'}}},c=(n(300),n(1)),o=Object(c.a)(r,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"container"},[n("h2",[t._v("纵向")]),t._v(" "),t._m(0),t._v(" "),n("div",{staticClass:"wrap"},[n("c-nav",{staticStyle:{width:"8em"},attrs:{"active-items":t.activeItems,vertical:!0},on:{"update:activeItems":function(e){t.activeItems=e},"update:active-items":function(e){t.activeItems=e}}},[n("c-nav-item",{attrs:{name:"home"}},[n("a",{attrs:{href:""}},[t._v("首页")])]),t._v(" "),n("c-sub-nav",{attrs:{name:"about"}},[n("template",{slot:"title"},[t._v("关于")]),t._v(" "),n("c-nav-item",{attrs:{name:"culture"}},[t._v("企业文化")]),t._v(" "),n("c-nav-item",{attrs:{name:"dev"}},[t._v("开发团队")]),t._v(" "),n("c-sub-nav",{attrs:{name:"contact"}},[n("template",{slot:"title"},[t._v("联系方式")]),t._v(" "),n("c-nav-item",{attrs:{name:"qq"}},[t._v("QQ")]),t._v(" "),n("c-nav-item",{attrs:{name:"wechat"}},[t._v("WeChat")]),t._v(" "),n("c-sub-nav",{attrs:{name:"phone"}},[n("template",{slot:"title"},[t._v("手机号")]),t._v(" "),n("c-nav-item",{attrs:{name:"in"}},[t._v("国内：111")]),t._v(" "),n("c-nav-item",{attrs:{name:"out"}},[t._v("国外：222")])],2)],2)],2),t._v(" "),n("c-nav-item",{attrs:{name:"other"}},[t._v("其他")])],1)],1),t._v(" "),t._m(1),t._v(" "),n("pre",[n("code",[t._v(t._s(t.code))])])])},[function(){var t=this.$createElement,e=this._self._c||t;return e("p",[e("strong",[this._v("预览：")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[e("strong",[this._v("代码：")])])}],!1,null,"b9ba90fc",null);e.default=o.exports},40:function(t,e,n){var a=n(18).f,i=n(15),s=n(12)("toStringTag");t.exports=function(t,e,n){t&&!i(t=n?t:t.prototype,s)&&a(t,s,{configurable:!0,value:e})}},46:function(t,e,n){var a=n(22);t.exports=function(t){return Object(a(t))}},47:function(t,e,n){for(var a=n(56),i=n(38),s=n(20),r=n(11),c=n(14),o=n(23),u=n(12),v=u("iterator"),l=u("toStringTag"),m=o.Array,f={CSSRuleList:!0,CSSStyleDeclaration:!1,CSSValueList:!1,ClientRectList:!1,DOMRectList:!1,DOMStringList:!1,DOMTokenList:!0,DataTransferItemList:!1,FileList:!1,HTMLAllCollection:!1,HTMLCollection:!1,HTMLFormElement:!1,HTMLSelectElement:!1,MediaList:!0,MimeTypeArray:!1,NamedNodeMap:!1,NodeList:!0,PaintRequestList:!1,Plugin:!1,PluginArray:!1,SVGLengthList:!1,SVGNumberList:!1,SVGPathSegList:!1,SVGPointList:!1,SVGStringList:!1,SVGTransformList:!1,SourceBufferList:!1,StyleSheetList:!0,TextTrackCueList:!1,TextTrackList:!1,TouchList:!1},p=i(f),h=0;h<p.length;h++){var d,_=p[h],y=f[_],g=r[_],b=g&&g.prototype;if(b&&(b[v]||c(b,v,m),b[l]||c(b,l,_),o[_]=m,y))for(d in a)b[d]||s(b,d,a[d],!0)}},55:function(t,e,n){"use strict";var a=n(44),i=n(28),s=n(20),r=n(14),c=n(23),o=n(59),u=n(40),v=n(60),l=n(12)("iterator"),m=!([].keys&&"next"in[].keys()),f=function(){return this};t.exports=function(t,e,n,p,h,d,_){o(n,e,p);var y,g,b,S=function(t){if(!m&&t in x)return x[t];switch(t){case"keys":case"values":return function(){return new n(this,t)}}return function(){return new n(this,t)}},I=e+" Iterator",L="values"==h,C=!1,x=t.prototype,w=x[l]||x["@@iterator"]||h&&x[h],k=w||S(h),O=h?L?S("entries"):k:void 0,A="Array"==e&&x.entries||w;if(A&&(b=v(A.call(new t)))!==Object.prototype&&b.next&&(u(b,I,!0),a||"function"==typeof b[l]||r(b,l,f)),L&&w&&"values"!==w.name&&(C=!0,k=function(){return w.call(this)}),a&&!_||!m&&!C&&x[l]||r(x,l,k),c[e]=k,c[I]=f,h)if(y={values:L?k:S("values"),keys:d?k:S("keys"),entries:O},_)for(g in y)g in x||s(x,g,y[g]);else i(i.P+i.F*(m||C),e,y);return y}},56:function(t,e,n){"use strict";var a=n(57),i=n(58),s=n(23),r=n(21);t.exports=n(55)(Array,"Array",function(t,e){this._t=r(t),this._i=0,this._k=e},function(){var t=this._t,e=this._k,n=this._i++;return!t||n>=t.length?(this._t=void 0,i(1)):i(0,"keys"==e?n:"values"==e?t[n]:[n,t[n]])},"values"),s.Arguments=s.Array,a("keys"),a("values"),a("entries")},57:function(t,e,n){var a=n(12)("unscopables"),i=Array.prototype;null==i[a]&&n(14)(i,a,{}),t.exports=function(t){i[a][t]=!0}},58:function(t,e){t.exports=function(t,e){return{value:e,done:!!t}}},59:function(t,e,n){"use strict";var a=n(42),i=n(24),s=n(40),r={};n(14)(r,n(12)("iterator"),function(){return this}),t.exports=function(t,e,n){t.prototype=a(r,{next:i(1,n)}),s(t,e+" Iterator")}},60:function(t,e,n){var a=n(15),i=n(46),s=n(32)("IE_PROTO"),r=Object.prototype;t.exports=Object.getPrototypeOf||function(t){return t=i(t),a(t,s)?t[s]:"function"==typeof t.constructor&&t instanceof t.constructor?t.constructor.prototype:t instanceof Object?r:null}},88:function(t,e,n){},89:function(t,e,n){},90:function(t,e,n){}}]);