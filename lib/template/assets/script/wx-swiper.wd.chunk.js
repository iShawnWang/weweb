webpackJsonp([4],{293:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=window.exparser.registerElement({is:"wx-swiper",template:'\n    <div id="slidesWrapper" class="wx-swiper-wrapper">\n      <div id="slides" class="wx-swiper-slides">\n        <slot></slot>\n      </div>\n      <div id="slidesDots" hidden$="{{!indicatorDots}}" class="wx-swiper-dots" class.wx-swiper-dots-horizontal="{{!vertical}}" class.wx-swiper-dots-vertical="{{vertical}}">\n      </div>\n    </div>\n  ',behaviors:["wx-base","wx-touchtrack"],properties:{indicatorDots:{type:Boolean,value:!1,public:!0},vertical:{type:Boolean,value:!1,observer:"_initSlides",public:!0},autoplay:{type:Boolean,value:!1,observer:"_autoplayChanged",public:!0},circular:{type:Boolean,value:!1,observer:"_initSlides",public:!0},interval:{type:Number,value:5e3,public:!0,observer:"_autoplayChanged"},duration:{type:Number,value:500,public:!0},current:{type:Number,value:0,observer:"_currentSlideChanged",public:!0}},listeners:{"slidesDots.tap":"_handleDotTap","slides.canceltap":"_handleSlidesCancelTap","this.wxSwiperItemChanged":"_itemChanged"},created:function(){this.touchtrack(this.$.slides,"_handleContentTrack")},attached:function(){this._attached=!0,this._initSlides(),this.autoplay&&this._scheduleNextSlide()},detached:function(){this._attached=!1,this._cancelSchedule()},_initSlides:function(){if(this._attached){this._cancelSchedule();var t=this._items=[];!function e(i){for(var s=0;s<i.childNodes.length;s++){var a=i.childNodes[s];a instanceof exparser.Element&&(a.hasBehavior("wx-swiper-item")?t.push(a):e(a))}}(this);var e=t.length;this._slideCount=e;var i=-1;this._isCurrentSlideLegal(this.current)&&(i=this.current,this.autoplay&&this._scheduleNextSlide()),this._viewport=i,this._itemPos=[];for(var s=0;s<t.length;s++)t[s]._clearTransform(),i>=0?this._updateItemPos(s,s-i):this._updateItemPos(s,-1);this._updateDots(i)}},_updateViewport:function(t,e){var i=this,s=this._viewport;this._viewport=t;var a=this._slideCount,n=function(n){var r=(n%a+a)%a;i.circular&&i._slideCount>1||(n=r);var l=!1;e&&(s<=t?s-1<=n&&n<=t+1&&(l=!0):t-1<=n&&n<=s+1&&(l=!0)),l?i._updateItemPos(r,n-t,n-s):i._updateItemPos(r,n-t)};if(s<t)for(var r=Math.ceil(t),l=0;l<a;l++)n(l+r-a+1);else for(var h=Math.floor(t),l=0;l<a;l++)n(l+h)},_updateDots:function(t){var e=this.$.slidesDots;e.innerHTML="";for(var i=document.createDocumentFragment(),s=0;s<this._slideCount;s++){var a=document.createElement("div");a.setAttribute("data-dot-index",s),s===t?a.setAttribute("class","wx-swiper-dot wx-swiper-dot-active"):a.setAttribute("class","wx-swiper-dot"),i.appendChild(a)}e.appendChild(i)},_gotoSlide:function(t,e){if(this._slideCount){if(this._updateDots(t),this.circular&&this._slideCount>1){var i=Math.round(this._viewport),s=Math.floor(i/this._slideCount),a=s*this._slideCount+t;e>0?a<i&&(a+=this._slideCount):e<0&&a>i&&(a-=this._slideCount),this._updateViewport(a,!0)}else this._updateViewport(t,!0);this.autoplay&&this._scheduleNextSlide()}},_updateItemPos:function(t,e,i){if(void 0!==i||this._itemPos[t]!==e){this._itemPos[t]=e;var s="0ms",a="",n="";void 0!==i&&(s=this.duration+"ms",n=this.vertical?"translate(0,"+100*i+"%) translateZ(0)":"translate("+100*i+"%,0) translateZ(0)"),a=this.vertical?"translate(0,"+100*e+"%) translateZ(0)":"translate("+100*e+"%,0) translateZ(0)",this._items[t]._setTransform(s,a,n)}},_stopItemsAnimation:function(){for(var t=0;t<this._slideCount;t++){this._items[t]._clearTransform()}},_scheduleNextSlide:function(){var t=this;this._cancelSchedule(),this._attached&&(this._scheduleTimeoutObj=setTimeout(function(){t._scheduleTimeoutObj=null,t._nextDirection=1,t.current=t._normalizeCurrentSlide(t.current+1)},this.interval))},_cancelSchedule:function(){this._scheduleTimeoutObj&&(clearTimeout(this._scheduleTimeoutObj),this._scheduleTimeoutObj=null)},_normalizeCurrentSlide:function(t){return this._slideCount?(Math.round(t)%this._slideCount+this._slideCount)%this._slideCount:0},_isCurrentSlideLegal:function(t){return this._slideCount?t===this._normalizeCurrentSlide(t):0},_autoplayChanged:function(t){t?this._scheduleNextSlide():this._cancelSchedule()},_currentSlideChanged:function(t,e){this._isCurrentSlideLegal(t)&&this._isCurrentSlideLegal(e)?(this._gotoSlide(t,this._nextDirection||0),this._nextDirection=0,t!==e&&this.triggerEvent("change",{current:this.current})):this._initSlides()},_itemChanged:function(t){return t.target._relatedSwiper=this,this._initSlides(),!1},_getDirectionName:function(t){return t?"vertical":"horizontal"},_handleDotTap:function(t){if(this._isCurrentSlideLegal(this.current)){var e=Number(t.target.dataset.dotIndex);this.current=e}},_handleSlidesCancelTap:function(){this._userWaitingCancelTap=!1},_handleTrackStart:function(){this._cancelSchedule(),this._contentTrackViewport=this._viewport,this._contentTrackSpeed=0,this._contentTrackT=Date.now(),this._stopItemsAnimation()},_handleTrackMove:function(t){var e=this,i=this._contentTrackT;this._contentTrackT=Date.now();var s=this._slideCount,a=function(t){return.5-.25/(t+.5)},n=function(t,i){var n=e._contentTrackViewport+t;e._contentTrackSpeed=.6*e._contentTrackSpeed+.4*i,e.circular&&e._slideCount>1||(n<0||n>s-1)&&(n<0?n=-a(-n):n>s-1&&(n=s-1+a(n-(s-1))),e._contentTrackSpeed=0),e._updateViewport(n,!1)};this.vertical?n(-t.dy/this.$.slidesWrapper.offsetHeight,-t.ddy/(this._contentTrackT-i)):n(-t.dx/this.$.slidesWrapper.offsetWidth,-t.ddx/(this._contentTrackT-i))},_handleTrackEnd:function(){this.autoplay&&this._scheduleNextSlide(),this._tracking=!1;var t=0;Math.abs(this._contentTrackSpeed)>.2&&(t=.5*this._contentTrackSpeed/Math.abs(this._contentTrackSpeed));var e=this._normalizeCurrentSlide(this._viewport+t);this.current!==e?(this._nextDirection=this._contentTrackSpeed,this.current=e):this._gotoSlide(e,0),this.autoplay&&this._scheduleNextSlide()},_handleContentTrack:function(t){if(this._isCurrentSlideLegal(this.current)){if("start"===t.detail.state)return this._userTracking=!0,this._userWaitingCancelTap=!1,this._userDirectionChecked=!1,this._handleTrackStart();if(this._userTracking){if(this._userWaitingCancelTap)return!1;if(!this._userDirectionChecked){this._userDirectionChecked=!0;var e=Math.abs(t.detail.dx),i=Math.abs(t.detail.dy);if(e>=i&&this.vertical?this._userTracking=!1:e<=i&&!this.vertical&&(this._userTracking=!1),!this._userTracking)return void(this.autoplay&&this._scheduleNextSlide())}return"end"===t.detail.state?this._handleTrackEnd(t.detail):(this._handleTrackMove(t.detail),!1)}}}})}});