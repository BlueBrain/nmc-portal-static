YUI.add("anim-curve",function(e,t){e.Anim.behaviors.curve={set:function(t,n,r,i,s,o,u){r=r.slice.call(r),i=i.slice.call(i);var a=u(s,0,100,o)/100;i.unshift(r),t._node.setXY(e.Anim.getBezier(i,a))},get:function(e){return e._node.getXY()}},e.Anim.getBezier=function(e,t){var n=e.length,r=[],i,s;for(i=0;i<n;++i)r[i]=[e[i][0],e[i][1]];for(s=1;s<n;++s)for(i=0;i<n-s;++i)r[i][0]=(1-t)*r[i][0]+t*r[parseInt(i+1,10)][0],r[i][1]=(1-t)*r[i][1]+t*r[parseInt(i+1,10)][1];return[r[0][0],r[0][1]]}},"patched-v3.11.0",{requires:["anim-xy"]});YUI.add("widget-modality",function(e,t){function y(e){}var n="widget",r="renderUI",i="bindUI",s="syncUI",o="boundingBox",u="contentBox",a="visible",f="zIndex",l="Change",c=e.Lang.isBoolean,h=e.ClassNameManager.getClassName,p="maskShow",d="maskHide",v="clickoutside",m="focusoutside",g=function(){
/*! IS_POSITION_FIXED_SUPPORTED - Juriy Zaytsev (kangax) - http://yura.thinkweb2.com/cft/ */
;var t=e.config.doc,n=null,r,i;return t.createElement&&(r=t.createElement("div"),r&&r.style&&(r.style.position="fixed",r.style.top="10px",i=t.body,i&&i.appendChild&&i.removeChild&&(i.appendChild(r),n=r.offsetTop===10,i.removeChild(r)))),n}(),b="modal",w="mask",E={modal:h(n,b),mask:h(n,w)};y.ATTRS={maskNode:{getter:"_getMaskNode",readOnly:!0},modal:{value:!1,validator:c},focusOn:{valueFn:function(){return[{eventName:v},{eventName:m}]},validator:e.Lang.isArray}},y.CLASSES=E,y._GET_MASK=function(){var t=e.one("."+E.mask),n=e.one("win");return t?t:(t=e.Node.create("<div></div>").addClass(E.mask),g?t.setStyles({position:"fixed",width:"100%",height:"100%",top:"0",left:"0",display:"block"}):t.setStyles({position:"absolute",width:n.get("winWidth")+"px",height:n.get("winHeight")+"px",top:"0",left:"0",display:"block"}),t)},y.STACK=[],y.prototype={initializer:function(){e.after(this._renderUIModal,this,r),e.after(this._syncUIModal,this,s),e.after(this._bindUIModal,this,i)},destructor:function(){this._uiSetHostVisibleModal(!1)},_uiHandlesModal:null,_renderUIModal:function(){var e=this.get(o);this._repositionMask(this),e.addClass(E.modal)},_bindUIModal:function(){this.after(a+l,this._afterHostVisibleChangeModal),this.after(f+l,this._afterHostZIndexChangeModal),this.after("focusOnChange",this._afterFocusOnChange),(!g||e.UA.ios&&e.UA.ios<5||e.UA.android&&e.UA.android<3)&&e.one("win").on("scroll",this._resyncMask,this)},_syncUIModal:function(){this._uiSetHostVisibleModal(this.get(a))},_focus:function(e){var t=this.get(o),n=t.get("tabIndex");t.set("tabIndex",n>=0?n:0),this.focus()},_blur:function(){this.blur()},_getMaskNode:function(){return y._GET_MASK()},_uiSetHostVisibleModal:function(t){var n=y.STACK,r=this.get("maskNode"),i=this.get("modal"),s,o;t?(e.Array.each(n,function(e){e._detachUIHandlesModal(),e._blur()}),n.unshift(this),this._repositionMask(this),this._uiSetHostZIndexModal(this.get(f)),i&&(r.show(),e.later(1,this,"_attachUIHandlesModal"),this._focus())):(o=e.Array.indexOf(n,this),o>=0&&n.splice(o,1),this._detachUIHandlesModal(),this._blur(),n.length?(s=n[0],this._repositionMask(s),s._uiSetHostZIndexModal(s.get(f)),s.get("modal")&&(e.later(1,s,"_attachUIHandlesModal"),s._focus())):r.getStyle("display")==="block"&&r.hide())},_uiSetHostZIndexModal:function(e){this.get("modal")&&this.get("maskNode").setStyle(f,e||0)},_attachUIHandlesModal:function(){if(this._uiHandlesModal||y.STACK[0]!==this)return;var t=this.get(o),n=this.get("maskNode"),r=this.get("focusOn"),i=e.bind(this._focus,this),s=[],u,a,f;for(u=0,a=r.length;u<a;u++)f={},f.node=r[u].node,f.ev=r[u].eventName,f.keyCode=r[u].keyCode,!f.node&&!f.keyCode&&f.ev?s.push(t.on(f.ev,i)):f.node&&!f.keyCode&&f.ev?s.push(f.node.on(f.ev,i)):f.node&&f.keyCode&&f.ev?s.push(f.node.on(f.ev,i,f.keyCode)):e.Log('focusOn ATTR Error: The event with name "'+f.ev+'" could not be attached.');g||s.push(e.one("win").on("scroll",e.bind(function(e){n.setStyle("top",n.get("docScrollY"))},this))),this._uiHandlesModal=s},_detachUIHandlesModal:function(){e.each(this._uiHandlesModal,function(e){e.detach()}),this._uiHandlesModal=null},_afterHostVisibleChangeModal:function(e){this._uiSetHostVisibleModal(e.newVal)},_afterHostZIndexChangeModal:function(e){this._uiSetHostZIndexModal(e.newVal)},isNested:function(){var e=y.STACK.length,t=e>1?!0:!1;return t},_repositionMask:function(t){var n=this.get("modal"),r=t.get("modal"),i=this.get("maskNode"),s,u;if(n&&!r)i.remove(),this.fire(d);else if(!n&&r||n&&r)i.remove(),this.fire(d),s=t.get(o),u=s.get("parentNode")||e.one("body"),u.insert(i,u.get("firstChild")),this.fire(p)},_resyncMask:function(e){var t=e.currentTarget,n=t.get("docScrollX"),r=t.get("docScrollY"),i=t.get("innerWidth")||t.get("winWidth"),s=t.get("innerHeight")||t.get("winHeight"),o=this.get("maskNode");o.setStyles({top:r+"px",left:n+"px",width:i+"px",height:s+"px"})},_afterFocusOnChange:function(e){this._detachUIHandlesModal(),this.get(a)&&this._attachUIHandlesModal()}},e.WidgetModality=y},"patched-v3.11.0",{requires:["base-build","event-outside","widget"],skinnable:!0});YUI.add("widget-stdmod",function(e,t){function H(e){}var n=e.Lang,r=e.Node,i=e.UA,s=e.Widget,o="",u="hd",a="bd",f="ft",l="header",c="body",h="footer",p="fillHeight",d="stdmod",v="Node",m="Content",g="firstChild",y="childNodes",b="ownerDocument",w="contentBox",E="height",S="offsetHeight",x="auto",T="headerContentChange",N="bodyContentChange",C="footerContentChange",k="fillHeightChange",L="heightChange",A="contentUpdate",O="renderUI",M="bindUI",_="syncUI",D="_applyParsedConfig",P=e.Widget.UI_SRC;H.HEADER=l,H.BODY=c,H.FOOTER=h,H.AFTER="after",H.BEFORE="before",H.REPLACE="replace";var B=H.HEADER,j=H.BODY,F=H.FOOTER,I=B+m,q=F+m,R=j+m;H.ATTRS={headerContent:{value:null},footerContent:{value:null},bodyContent:{value:null},fillHeight:{value:H.BODY,validator:function(e){return this._validateFillHeight(e)}}},H.HTML_PARSER={headerContent:function(e){return this._parseStdModHTML(B)},bodyContent:function(e){return this._parseStdModHTML(j)},footerContent:function(e){return this._parseStdModHTML(F)}},H.SECTION_CLASS_NAMES={header:s.getClassName(u),body:s.getClassName(a),footer:s.getClassName(f)},H.TEMPLATES={header:'<div class="'+H.SECTION_CLASS_NAMES[B]+'"></div>',body:'<div class="'+H.SECTION_CLASS_NAMES[j]+'"></div>',footer:'<div class="'+H.SECTION_CLASS_NAMES[F]+'"></div>'},H.prototype={initializer:function(){this._stdModNode=this.get(w),e.before(this._renderUIStdMod,this,O),e.before(this._bindUIStdMod,this,M),e.before(this._syncUIStdMod,this,_)},_syncUIStdMod:function(){var e=this._stdModParsed;(!e||!e[I])&&this._uiSetStdMod(B,this.get(I)),(!e||!e[R])&&this._uiSetStdMod(j,this.get(R)),(!e||!e[q])&&this._uiSetStdMod(F,this.get(q)),this._uiSetFillHeight(this.get(p))},_renderUIStdMod:function(){this._stdModNode.addClass(s.getClassName(d)),this._renderStdModSections(),this.after(T,this._afterHeaderChange),this.after(N,this._afterBodyChange),this.after(C,this._afterFooterChange)},_renderStdModSections:function(){n.isValue(this.get(I))&&this._renderStdMod(B),n.isValue(this.get(R))&&this._renderStdMod(j),n.isValue(this.get(q))&&this._renderStdMod(F)},_bindUIStdMod:function(){this.after(k,this._afterFillHeightChange),this.after(L,this._fillHeight),this.after(A,this._fillHeight)},_afterHeaderChange:function(e){e.src!==P&&this._uiSetStdMod(B,e.newVal,e.stdModPosition)},_afterBodyChange:function(e){e.src!==P&&this._uiSetStdMod(j,e.newVal,e.stdModPosition)},_afterFooterChange:function(e){e.src!==P&&this._uiSetStdMod(F,e.newVal,e.stdModPosition)},_afterFillHeightChange:function(e){this._uiSetFillHeight(e.newVal)},_validateFillHeight:function(e){return!e||e==H.BODY||e==H.HEADER||e==H.FOOTER},_uiSetFillHeight:function(e){var t=this.getStdModNode(e),n=this._currFillNode;n&&t!==n&&n.setStyle(E,o),t&&(this._currFillNode=t),this._fillHeight()},_fillHeight:function(){if(this.get(p)){var e=this.get(E);e!=o&&e!=x&&this.fillHeight(this.getStdModNode(this.get(p)))}},_uiSetStdMod:function(e,t,r){if(n.isValue(t)){var i=this.getStdModNode(e,!0);this._addStdModContent(i,t,r),this.set(e+m,this._getStdModContent(e),{src:P})}else this._eraseStdMod(e);this.fire(A)},_renderStdMod:function(e){var t=this.get(w),n=this._findStdModSection(e);return n||(n=this._getStdModTemplate(e)),this._insertStdModSection(t,e,n),this[e+v]=n,this[e+v]},_eraseStdMod:function(e){var t=this.getStdModNode(e);t&&(t.remove(!0),delete this[e+v])},_insertStdModSection:function(e,t,n){var r=e.get(g);if(t===F||!r)e.appendChild(n);else if(t===B)e.insertBefore(n,r);else{var i=this[F+v];i?e.insertBefore(n,i):e.appendChild(n)}},_getStdModTemplate:function(e){return r.create(H.TEMPLATES[e],this._stdModNode.get(b))},_addStdModContent:function(e,t,n){switch(n){case H.BEFORE:n=0;break;case H.AFTER:n=undefined;break;default:n=H.REPLACE}e.insert(t,n)},_getPreciseHeight:function(e){var t=e?e.get(S):0,n="getBoundingClientRect";if(e&&e.hasMethod(n)){var r=e.invoke(n);r&&(t=r.bottom-r.top)}return t},_findStdModSection:function(e){return this.get(w).one("> ."+H.SECTION_CLASS_NAMES[e])},_parseStdModHTML:function(t){var n=this._findStdModSection(t);return n?(this._stdModParsed||(this._stdModParsed={},e.before(this._applyStdModParsedConfig,this,D)),this._stdModParsed[t+m]=1,n.get("innerHTML")):null},_applyStdModParsedConfig:function(e,t,n){var r=this._stdModParsed;r&&(r[I]=!(I in t)&&I in r,r[R]=!(R in t)&&R in r,r[q]=!(q in t)&&q in r)},_getStdModContent:function(e){return this[e+v]?this[e+v].get(y):null},setStdModContent:function(e,t,n){this.set(e+m,t,{stdModPosition:n})},getStdModNode:function(e,t){var n=this[e+v]||null;return!n&&t&&(n=this._renderStdMod(e)),n},fillHeight:function(e){if(e){var t=this.get(w),r=[this.headerNode,this.bodyNode,this.footerNode],s,o,u=0,a=0,f=!1;for(var l=0,c=r.length;l<c;l++)s=r[l],s&&(s!==e?u+=this._getPreciseHeight(s):f=!0);f&&((i.ie||i.opera)&&e.set(S,0),o=t.get(S)-parseInt(t.getComputedStyle("paddingTop"),10)-parseInt(t.getComputedStyle("paddingBottom"),10)-parseInt(t.getComputedStyle("borderBottomWidth"),10)-parseInt(t.getComputedStyle("borderTopWidth"),10),n.isNumber(o)&&(a=o-u,a>=0&&e.set(S,a)))}}},e.WidgetStdMod=H},"patched-v3.11.0",{requires:["base-build","widget"]});YUI.add("anim-easing",function(e,t){var n={easeNone:function(e,t,n,r){return n*e/r+t},easeIn:function(e,t,n,r){return n*(e/=r)*e+t},easeOut:function(e,t,n,r){return-n*(e/=r)*(e-2)+t},easeBoth:function(e,t,n,r){return(e/=r/2)<1?n/2*e*e+t:-n/2*(--e*(e-2)-1)+t},easeInStrong:function(e,t,n,r){return n*(e/=r)*e*e*e+t},easeOutStrong:function(e,t,n,r){return-n*((e=e/r-1)*e*e*e-1)+t},easeBothStrong:function(e,t,n,r){return(e/=r/2)<1?n/2*e*e*e*e+t:-n/2*((e-=2)*e*e*e-2)+t},elasticIn:function(e,t,n,r,i,s){var o;return e===0?t:(e/=r)===1?t+n:(s||(s=r*.3),!i||i<Math.abs(n)?(i=n,o=s/4):o=s/(2*Math.PI)*Math.asin(n/i),-(i*Math.pow(2,10*(e-=1))*Math.sin((e*r-o)*2*Math.PI/s))+t)},elasticOut:function(e,t,n,r,i,s){var o;return e===0?t:(e/=r)===1?t+n:(s||(s=r*.3),!i||i<Math.abs(n)?(i=n,o=s/4):o=s/(2*Math.PI)*Math.asin(n/i),i*Math.pow(2,-10*e)*Math.sin((e*r-o)*2*Math.PI/s)+n+t)},elasticBoth:function(e,t,n,r,i,s){var o;return e===0?t:(e/=r/2)===2?t+n:(s||(s=r*.3*1.5),!i||i<Math.abs(n)?(i=n,o=s/4):o=s/(2*Math.PI)*Math.asin(n/i),e<1?-0.5*i*Math.pow(2,10*(e-=1))*Math.sin((e*r-o)*2*Math.PI/s)+t:i*Math.pow(2,-10*(e-=1))*Math.sin((e*r-o)*2*Math.PI/s)*.5+n+t)},backIn:function(e,t,n,r,i){return i===undefined&&(i=1.70158),e===r&&(e-=.001),n*(e/=r)*e*((i+1)*e-i)+t},backOut:function(e,t,n,r,i){return typeof i=="undefined"&&(i=1.70158),n*((e=e/r-1)*e*((i+1)*e+i)+1)+t},backBoth:function(e,t,n,r,i){return typeof i=="undefined"&&(i=1.70158),(e/=r/2)<1?n/2*e*e*(((i*=1.525)+1)*e-i)+t:n/2*((e-=2)*e*(((i*=1.525)+1)*e+i)+2)+t},bounceIn:function(t,n,r,i){return r-e.Easing.bounceOut(i-t,0,r,i)+n},bounceOut:function(e,t,n,r){return(e/=r)<1/2.75?n*7.5625*e*e+t:e<2/2.75?n*(7.5625*(e-=1.5/2.75)*e+.75)+t:e<2.5/2.75?n*(7.5625*(e-=2.25/2.75)*e+.9375)+t:n*(7.5625*(e-=2.625/2.75)*e+.984375)+t},bounceBoth:function(t,n,r,i){return t<i/2?e.Easing.bounceIn(t*2,0,r,i)*.5+n:e.Easing.bounceOut(t*2-i,0,r,i)*.5+r*.5+n}};e.Easing=n},"patched-v3.11.0",{requires:["anim-base"]});YUI.add("widget-position-align",function(e,t){function c(e){}var n=e.Lang,r="align",i="alignOn",s="visible",o="boundingBox",u="offsetWidth",a="offsetHeight",f="region",l="viewportRegion";c.ATTRS={align:{value:null},centered:{setter:"_setAlignCenter",lazyAdd:!1,value:!1},alignOn:{value:[],validator:e.Lang.isArray}},c.TL="tl",c.TR="tr",c.BL="bl",c.BR="br",c.TC="tc",c.RC="rc",c.BC="bc",c.LC="lc",c.CC="cc",c.prototype={initializer:function(){this._posNode||e.error("WidgetPosition needs to be added to the Widget, before WidgetPositionAlign is added"),e.after(this._bindUIPosAlign,this,"bindUI"),e.after(this._syncUIPosAlign,this,"syncUI")},_posAlignUIHandles:null,initializer:function(){this._posNode||e.error("WidgetPosition needs to be added to the Widget, before WidgetPositionAlign is added"),e.after(this._bindUIPosAlign,this,"bindUI"),e.after(this._syncUIPosAlign,this,"syncUI")},destructor:function(){this._detachPosAlignUIHandles()},_bindUIPosAlign:function(){this.after("alignChange",this._afterAlignChange),this.after("alignOnChange",this._afterAlignOnChange),this.after("visibleChange",this._syncUIPosAlign)},_syncUIPosAlign:function(){var e=this.get(r);this._uiSetVisiblePosAlign(this.get(s)),e&&this._uiSetAlign(e.node,e.points)},align:function(e,t){return arguments.length?this.set(r,{node:e,points:t}):this._syncUIPosAlign(),this},centered:function(e){return this.align(e,[c.CC,c.CC])},_getAlignToXY:function(e,t,n,r){var i;switch(t){case c.TL:i=[n,r];break;case c.TR:i=[n-e.get(u),r];break;case c.BL:i=[n,r-e.get(a)];break;case c.BR:i=[n-e.get(u),r-e.get(a)];break;case c.TC:i=[n-e.get(u)/2,r];break;case c.BC:i=[n-e.get(u)/2,r-e.get(a)];break;case c.LC:i=[n,r-e.get(a)/2];break;case c.RC:i=[n-e.get(u),r-e.get(a)/2];break;case c.CC:i=[n-e.get(u)/2,r-e.get(a)/2];break;default:}return i},_getAlignedXY:function(t,r){if(!n.isArray(r)||r.length!==2){e.error("align: Invalid Points Arguments");return}var i=this._getRegion(t),s,o;if(!i)return;s=r[1];switch(s){case c.TL:o=[i.left,i.top];break;case c.TR:o=[i.right,i.top];break;case c.BL:o=[i.left,i.bottom];break;case c.BR:o=[i.right,i.bottom];break;case c.TC:o=[i.left+Math.floor(i.width/2),i.top];break;case c.BC:o=[i.left+Math.floor(i.width/2),i.bottom];break;case c.LC:o=[i.left,i.top+Math.floor(i.height/2)];break;case c.RC:o=[i.right,i.top+Math.floor(i.height/2)];break;case c.CC:o=[i.left+Math.floor(i.width/2),i.top+Math.floor(i.height/2)];break;default:}return this._getAlignToXY(this._posNode,r[0],o[0],o[1])},_setAlignCenter:function(e){return e&&this.set(r,{node:e===!0?null:e,points:[c.CC,c.CC]}),e},_uiSetAlign:function(e,t){var n=this._getAlignedXY(e,t);n&&this._doAlign(n)},_uiSetVisiblePosAlign:function(e){e?this._attachPosAlignUIHandles():this._detachPosAlignUIHandles()},_attachPosAlignUIHandles:function(){if(this._posAlignUIHandles)return;var t=this.get(o),n=e.bind(this._syncUIPosAlign,this),r=[];e.Array.each(this.get(i),function(i){var s=i.eventName,o=e.one(i.node)||t;s&&r.push(o.on(s,n))}),this._posAlignUIHandles=r},_detachPosAlignUIHandles:function(){var t=this._posAlignUIHandles;t&&((new e.EventHandle(t)).detach(),this._posAlignUIHandles=null)},_doAlign:function(e){e&&this.move(e)},_getRegion:function(t){var n;return t?(t=e.Node.one(t),t&&(n=t.get(f))):n=this._posNode.get(l),n},_afterAlignChange:function(e){var t=e.newVal;t&&this._uiSetAlign(t.node,t.points)},_afterAlignOnChange:function(e){this._detachPosAlignUIHandles(),this.get(s)&&this._attachPosAlignUIHandles()}},e.WidgetPositionAlign=c},"patched-v3.11.0",{requires:["widget-position"]});YUI.add("anim-node-plugin",function(e,t){var n=function(t){t=t?e.merge(t):{},t.node=t.host,n.superclass.constructor.apply(this,arguments)};n.NAME="nodefx",n.NS="fx",e.extend(n,e.Anim),e.namespace("Plugin"),e.Plugin.NodeFX=n},"patched-v3.11.0",{requires:["node-pluginhost","anim-base"]});YUI.add("widget-position",function(e,t){function d(e){}var n=e.Lang,r=e.Widget,i="xy",s="position",o="positioned",u="boundingBox",a="relative",f="renderUI",l="bindUI",c="syncUI",h=r.UI_SRC,p="xyChange";d.ATTRS={x:{setter:function(e){this._setX(e)},getter:function(){return this._getX()},lazyAdd:!1},y:{setter:function(e){this._setY(e)},getter:function(){return this._getY()},lazyAdd:!1},xy:{value:[0,0],validator:function(e){return this._validateXY(e)}}},d.POSITIONED_CLASS_NAME=r.getClassName(o),d.prototype={initializer:function(){this._posNode=this.get(u),e.after(this._renderUIPosition,this,f),e.after(this._syncUIPosition,this,c),e.after(this._bindUIPosition,this,l)},_renderUIPosition:function(){this._posNode.addClass(d.POSITIONED_CLASS_NAME)},_syncUIPosition:function(){var e=this._posNode;e.getStyle(s)===a&&this.syncXY(),this._uiSetXY(this.get(i))},_bindUIPosition:function(){this.after(p,this._afterXYChange)},move:function(){var e=arguments,t=n.isArray(e[0])?e[0]:[e[0],e[1]];this.set(i,t)},syncXY:function(){this.set(i,this._posNode.getXY(),{src:h})},_validateXY:function(e){return n.isArray(e)&&n.isNumber(e[0])&&n.isNumber(e[1])},_setX:function(e){this.set(i,[e,this.get(i)[1]])},_setY:function(e){this.set(i,[this.get(i)[0],e])},_getX:function(){return this.get(i)[0]},_getY:function(){return this.get(i)[1]},_afterXYChange:function(e){e.src!=h&&this._uiSetXY(e.newVal)},_uiSetXY:function(e){this._posNode.setXY(e)}},e.WidgetPosition=d},"patched-v3.11.0",{requires:["base-build","node-screen","widget"]});YUI.add("anim-color",function(e,t){var n=Number;e.Anim.getUpdatedColorValue=function(t,r,i,s,o){return t=e.Color.re_RGB.exec(e.Color.toRGB(t)),r=e.Color.re_RGB.exec(e.Color.toRGB(r)),(!t||t.length<3||!r||r.length<3)&&e.error("invalid from or to passed to color behavior"),"rgb("+[Math.floor(o(i,n(t[1]),n(r[1])-n(t[1]),s)),Math.floor(o(i,n(t[2]),n(r[2])-n(t[2]),s)),Math.floor(o(i,n(t[3]),n(r[3])-n(t[3]),s))].join(", ")+")"},e.Anim.behaviors.color={set:function(t,n,r,i,s,o,u){t._node.setStyle(n,e.Anim.getUpdatedColorValue(r,i,s,o,u))},get:function(e,t){var n=e._node.getComputedStyle(t);return n=n==="transparent"?"rgb(255, 255, 255)":n,n}},e.each(["backgroundColor","borderColor","borderTopColor","borderRightColor","borderBottomColor","borderLeftColor"],function(t){e.Anim.behaviors[t]=e.Anim.behaviors.color})},"patched-v3.11.0",{requires:["anim-base"]});YUI.add("anim-scroll",function(e,t){var n=Number;e.Anim.behaviors.scroll={set:function(e,t,r,i,s,o,u){var a=e._node,f=[u(s,n(r[0]),n(i[0])-n(r[0]),o),u(s,n(r[1]),n(i[1])-n(r[1]),o)];f[0]&&a.set("scrollLeft",f[0]),f[1]&&a.set("scrollTop",f[1])},get:function(e){var t=e._node;return[t.get("scrollLeft"),t.get("scrollTop")]}}},"patched-v3.11.0",{requires:["anim-base"]});YUI.add("widget-position-constrain",function(e,t){function m(e){}var n="constrain",r="constrain|xyChange",i="constrainChange",s="preventOverlap",o="align",u="",a="bindUI",f="xy",l="x",c="y",h=e.Node,p="viewportRegion",d="region",v;m.ATTRS={constrain:{value:null,setter:"_setConstrain"},preventOverlap:{value:!1}},v=m._PREVENT_OVERLAP={x:{tltr:1,blbr:1,brbl:1,trtl:1},y:{trbr:1,tlbl:1,bltl:1,brtr:1}},m.prototype={initializer:function(){this._posNode||e.error("WidgetPosition needs to be added to the Widget, before WidgetPositionConstrain is added"),e.after(this._bindUIPosConstrained,this,a)},getConstrainedXY:function(e,t){t=t||this.get(n);var r=this._getRegion(t===!0?null:t),i=this._posNode.get(d);return[this._constrain(e[0],l,i,r),this._constrain(e[1],c,i,r)]},constrain:function(e,t){var r,i,s=t||this.get(n);s&&(r=e||this.get(f),i=this.getConstrainedXY(r,s),(i[0]!==r[0]||i[1]!==r[1])&&this.set(f,i,{constrained:!0}))},_setConstrain:function(e){return e===!0?e:h.one(e)},_constrain:function(e,t,n,r){if(r){this.get(s)&&(e=this._preventOverlap(e,t,n,r));var i=t==l,o=i?r.width:r.height,u=i?n.width:n.height,a=i?r.left:r.top,f=i?r.right-u:r.bottom-u;if(e<a||e>f)u<o?e<a?e=a:e>f&&(e=f):e=a}return e},_preventOverlap:function(e,t,n,r){var i=this.get(o),s=t===l,a,f,c,h,p,d;return i&&i.points&&v[t][i.points.join(u)]&&(f=this._getRegion(i.node),f&&(a=s?n.width:n.height,c=s?f.left:f.top,h=s?f.right:f.bottom,p=s?f.left-r.left:f.top-r.top,d=s?r.right-f.right:r.bottom-f.bottom),e>c?d<a&&p>a&&(e=c-a):p<a&&d>a&&(e=h)),e},_bindUIPosConstrained:function(){this.after(i,this._afterConstrainChange),this._enableConstraints(this.get(n))},_afterConstrainChange:function(e){this._enableConstraints(e.newVal)},_enableConstraints:function(e){e?(this.constrain(),this._cxyHandle=this._cxyHandle||this.on(r,this._constrainOnXYChange)):this._cxyHandle&&(this._cxyHandle.detach(),this._cxyHandle=null)},_constrainOnXYChange:function(e){e.constrained||(e.newVal=this.getConstrainedXY(e.newVal))},_getRegion:function(e){var t;return e?(e=h.one(e),e&&(t=e.get(d))):t=this._posNode.get(p),t}},e.WidgetPositionConstrain=m},"patched-v3.11.0",{requires:["widget-position"]});YUI.add("widget-stack",function(e,t){function O(e){}var n=e.Lang,r=e.UA,i=e.Node,s=e.Widget,o="zIndex",u="shim",a="visible",f="boundingBox",l="renderUI",c="bindUI",h="syncUI",p="offsetWidth",d="offsetHeight",v="parentNode",m="firstChild",g="ownerDocument",y="width",b="height",w="px",E="shimdeferred",S="shimresize",x="visibleChange",T="widthChange",N="heightChange",C="shimChange",k="zIndexChange",L="contentUpdate",A="stacked";O.ATTRS={shim:{value:r.ie==6},zIndex:{value:0,setter:"_setZIndex"}},O.HTML_PARSER={zIndex:function(e){return this._parseZIndex(e)}},O.SHIM_CLASS_NAME=s.getClassName(u),O.STACKED_CLASS_NAME=s.getClassName(A),O.SHIM_TEMPLATE='<iframe class="'+O.SHIM_CLASS_NAME+'" frameborder="0" title="Widget Stacking Shim" src="javascript:false" tabindex="-1" role="presentation"></iframe>',O.prototype={initializer:function(){this._stackNode=this.get(f),this._stackHandles={},e.after(this._renderUIStack,this,l),e.after(this._syncUIStack,this,h),e.after(this._bindUIStack,this,c)},_syncUIStack:function(){this._uiSetShim(this.get(u)),this._uiSetZIndex(this.get(o))},_bindUIStack:function(){this.after(C,this._afterShimChange),this.after(k,this._afterZIndexChange)},_renderUIStack:function(){this._stackNode.addClass(O.STACKED_CLASS_NAME)},_parseZIndex:function(e){var t;return!e.inDoc()||e.getStyle("position")==="static"?t="auto":t=e.getComputedStyle("zIndex"),t==="auto"?null:t},_setZIndex:function(e){return n.isString(e)&&(e=parseInt(e,10)),n.isNumber(e)||(e=0),e},_afterShimChange:function(e){this._uiSetShim(e.newVal)},_afterZIndexChange:function(e){this._uiSetZIndex(e.newVal)},_uiSetZIndex:function(e){this._stackNode.setStyle(o,e)},_uiSetShim:function(e){e?(this.get(a)?this._renderShim():this._renderShimDeferred(),r.ie==6&&this._addShimResizeHandlers()):this._destroyShim()},_renderShimDeferred:function(){this._stackHandles[E]=this._stackHandles[E]||[];var e=this._stackHandles[E],t=function(e){e.newVal&&this._renderShim()};e.push(this.on(x,t))},_addShimResizeHandlers:function(){this._stackHandles[S]=this._stackHandles[S]||[];var e=this.sizeShim,t=this._stackHandles[S];t.push(this.after(x,e)),t.push(this.after(T,e)),t.push(this.after(N,e)),t.push(this.after(L,e))},_detachStackHandles:function(e){var t=this._stackHandles[e],n;if(t&&t.length>0)while(n=t.pop())n.detach()},_renderShim:function(){var e=this._shimNode,t=this._stackNode;e||(e=this._shimNode=this._getShimTemplate(),t.insertBefore(e,t.get(m)),this._detachStackHandles(E),this.sizeShim())},_destroyShim:function(){this._shimNode&&(this._shimNode.get(v).removeChild(this._shimNode),this._shimNode=null,this._detachStackHandles(E),this._detachStackHandles(S))},sizeShim:function(){var e=this._shimNode,t=this._stackNode;e&&r.ie===6&&this.get(a)&&(e.setStyle(y,t.get(p)+w),e.setStyle(b,t.get(d)+w))},_getShimTemplate:function(){return i.create(O.SHIM_TEMPLATE,this._stackNode.get(g))}},e.WidgetStack=O},"patched-v3.11.0",{requires:["base-build","widget"],skinnable:!0});YUI.add("anim-xy",function(e,t){var n=Number;e.Anim.behaviors.xy={set:function(e,t,r,i,s,o,u){e._node.setXY([u(s,n(r[0]),n(i[0])-n(r[0]),o),u(s,n(r[1]),n(i[1])-n(r[1]),o)])},get:function(e){return e._node.getXY()}}},"patched-v3.11.0",{requires:["anim-base","node-screen"]});YUI.add("anim-base",function(e,t){var n="running",r="startTime",i="elapsedTime",s="start",o="tween",u="end",a="node",f="paused",l="reverse",c="iterationCount",h=Number,p={},d;e.Anim=function(){e.Anim.superclass.constructor.apply(this,arguments),e.Anim._instances[e.stamp(this)]=this},e.Anim.NAME="anim",e.Anim._instances={},e.Anim.RE_DEFAULT_UNIT=/^width|height|top|right|bottom|left|margin.*|padding.*|border.*$/i,e.Anim.DEFAULT_UNIT="px",e.Anim.DEFAULT_EASING=function(e,t,n,r){return n*e/r+t},e.Anim._intervalTime=20,e.Anim.behaviors={left:{get:function(e,t){return e._getOffset(t)}}},e.Anim.behaviors.top=e.Anim.behaviors.left,e.Anim.DEFAULT_SETTER=function(t,n,r,i,s,o,u,a){var f=t._node,l=f._node,c=u(s,h(r),h(i)-h(r),o);l?"style"in l&&(n in l.style||n in e.DOM.CUSTOM_STYLES)?(a=a||"",f.setStyle(n,c+a)):"attributes"in l&&n in l.attributes?f.setAttribute(n,c):n in l&&(l[n]=c):f.set?f.set(n,c):n in f&&(f[n]=c)},e.Anim.DEFAULT_GETTER=function(t,n){var r=t._node,i=r._node,s="";return i?"style"in i&&(n in i.style||n in e.DOM.CUSTOM_STYLES)?s=r.getComputedStyle(n):"attributes"in i&&n in i.attributes?s=r.getAttribute(n):n in i&&(s=i[n]):r.get?s=r.get(n):n in r&&(s=r[n]),s},e.Anim.ATTRS={node:{setter:function(t){return t&&(typeof t=="string"||t.nodeType)&&(t=e.one(t)),this._node=t,!t,t}},duration:{value:1},easing:{value:e.Anim.DEFAULT_EASING,setter:function(t){if(typeof t=="string"&&e.Easing)return e.Easing[t]}},from:{},to:{},startTime:{value:0,readOnly:!0},elapsedTime:{value:0,readOnly:!0},running:{getter:function(){return!!p[e.stamp(this)]},value:!1,readOnly:!0},iterations:{value:1},iterationCount:{value:0,readOnly:!0},direction:{value:"normal"},paused:{readOnly:!0,value:!1},reverse:{value:!1}},e.Anim.run=function(){var t=e.Anim._instances,n;for(n in t)t[n].run&&t[n].run()},e.Anim.pause=function(){for(var t in p)p[t].pause&&p[t].pause();e.Anim._stopTimer()},e.Anim.stop=function(){for(var t in p)p[t].stop&&p[t].stop();e.Anim._stopTimer()},e.Anim._startTimer=function(){d||(d=setInterval(e.Anim._runFrame,e.Anim._intervalTime))},e.Anim._stopTimer=function(){clearInterval(d),d=0},e.Anim._runFrame=function(){var t=!0,n;for(n in p)p[n]._runFrame&&(t=!1,p[n]._runFrame());t&&e.Anim._stopTimer()},e.Anim.RE_UNITS=/^(-?\d*\.?\d*){1}(em|ex|px|in|cm|mm|pt|pc|%)*$/;var v={run:function(){return this.get(f)?this._resume():this.get(n)||this._start(),this},pause:function(){return this.get(n)&&this._pause(),this},stop:function(e){return(this.get(n)||this.get(f))&&this._end(e),this},_added:!1,_start:function(){this._set(r,new Date-this.get(i)),this._actualFrames=0,this.get(f)||this._initAnimAttr(),p[e.stamp(this)]=this,e.Anim._startTimer(),this.fire(s)},_pause:function(){this._set(r,null),this._set(f,!0),delete p[e.stamp(this)],this.fire("pause")},_resume:function(){this._set(f,!1),p[e.stamp(this)]=this,this._set(r,new Date-this.get(i)),e.Anim._startTimer(),this.fire("resume")},_end:function(t){var n=this.get("duration")*1e3;t&&this._runAttrs(n,n,this.get(l)),this._set(r,null),this._set(i,0),this._set(f,!1),delete p[e.stamp(this)],this.fire(u,{elapsed:this.get(i)})},_runFrame:function(){var e=this._runtimeAttr.duration,t=new Date-this.get(r),n=this.get(l),s=t>=e;this._runAttrs(t,e,n),this._actualFrames+=1,this._set(i,t),this.fire(o),s&&this._lastFrame()},_runAttrs:function(t,n,r){var i=this._runtimeAttr,s=e.Anim.behaviors,o=i.easing,u=n,a=!1,f,l,c;t>=n&&(a=!0),r&&(t=n-t,u=0);for(c in i)i[c].to&&(f=i[c],l=c in s&&"set"in s[c]?s[c].set:e.Anim.DEFAULT_SETTER,a?l(this,c,f.from,f.to,u,n,o,f.unit):l(this,c,f.from,f.to,t,n,o,f.unit))},_lastFrame:function(){var e=this.get("iterations"),t=this.get(c);t+=1,e==="infinite"||t<e?(this.get("direction")==="alternate"&&this.set(l,!this.get(l)),this.fire("iteration")):(t=0,this._end()),this._set(r,new Date),this._set(c,t)},_initAnimAttr:function(){var t=this.get("from")||{},n=this.get("to")||{},r={duration:this.get("duration")*1e3,easing:this.get("easing")},i=e.Anim.behaviors,s=this.get(a),o,u,f;e.each(n,function(n,a){typeof n=="function"&&(n=n.call(this,s)),u=t[a],u===undefined?u=a in i&&"get"in i[a]?i[a].get(this,a):e.Anim.DEFAULT_GETTER(this,a):typeof u=="function"&&(u=u.call(this,s));var l=e.Anim.RE_UNITS.exec(u),c=e.Anim.RE_UNITS.exec(n);u=l?l[1]:u,f=c?c[1]:n,o=c?c[2]:l?l[2]:"",!o&&e.Anim.RE_DEFAULT_UNIT.test(a)&&(o=e.Anim.DEFAULT_UNIT);if(!u||!f){e.error('invalid "from" or "to" for "'+a+'"',"Anim");return}r[a]={from:e.Lang.isObject(u)?e.clone(u):u,to:f,unit:o}},this),this._runtimeAttr=r},_getOffset:function(e){var t=this._node,n=t.getComputedStyle(e),r=e==="left"?"getX":"getY",i=e==="left"?"setX":"setY",s;return n==="auto"&&(s=t.getStyle("position"),s==="absolute"||s==="fixed"?(n=t[r](),t[i](n)):n=0),n},destructor:function(){delete e.Anim._instances[e.stamp(this)]}};e.extend(e.Anim,e.Base,v)},"patched-v3.11.0",{requires:["base-base","node-style"]});YUI.add("aui-event-delegate-change",function(e,t){var n=e.Object,r=e.Node,i=e.Selector,s="beforeactivate",o="change";e.Event.define(o,{delegate:function(e,t,n,r){var i=this;i._attachEvents(e,t,n,r)},detach:function(e,t,n){var r=this;r._detachEvents(e,t,n)},detachDelegate:function(e,t,n){var r=this;r._detachEvents(e,t,n)},on:function(e,t,n){var r=this;r._attachEvent(e,t,n)},_attachEvent:function(t,r,s,o,u){var a=this,f=a._getEventName(t),l=a._prepareHandles(r,t);if(!n.owns(l,f)){var c=s.fire;o&&(c=function(n){var r=o.getDOM(),a=!0,f=t.getDOM(),l=e.clone(n);do f&&i.test(f,u)&&(l.currentTarget=e.one(f),l.container=o,a=s.fire(l)),f=f.parentNode;while(a!==!1&&!l.stopped&&f&&f!==r);return a!==!1&&l.stopped!==2}),l[f]=e.Event._attach([f,c,t,s])}},_attachEvents:function(e,t,n,r){var i=this,o=i._prepareHandles(t,e);o[s]=e.delegate(s,function(s){var o=s.target;i._attachEvent(o,t,n,e,r)},r)},_detachEvents:function(t,n,r){e.each(n._handles,function(t,n,r){e.each(t,function(e,t,n){e.detach()})}),delete n._handles},_getEventName:e.cached(function(e){var t=o,n=e.attr("tagName").toLowerCase(),r=e.attr("type").toLowerCase();return n=="input"&&(r=="checkbox"||r=="radio")&&(t="click"),t}),_prepareHandles:function(e,t){n.owns(e,"_handles")||(e._handles={});var r=e._handles;return n.owns(r,t)||(r[t]={}),r[t]}},!0)},"2.0.0",{requires:["aui-event-base","event-delegate","event-synthetic"]});