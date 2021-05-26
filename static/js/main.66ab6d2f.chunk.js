(this["webpackJsonpreact-colors"]=this["webpackJsonpreact-colors"]||[]).push([[0],{337:function(e,t,a){},338:function(e,t,a){"use strict";a.r(t);var o=a(0),l=a(10),n=a.n(l),c=a(43),r=a(15),i=a(99),s=a(17),d=a(18),h=a(9),b=a(20),j=a(19),u=a(25),m=a(166),p=a.n(m),O=a(3),f=function(e){Object(b.a)(a,e);var t=Object(j.a)(a);function a(e){var o;return Object(s.a)(this,a),(o=t.call(this,e)).state={copying:!1},o.handleCopy=o.handleCopy.bind(Object(h.a)(o)),o}return Object(d.a)(a,[{key:"handleCopy",value:function(){var e=this;this.setState({copying:!0},(function(){setTimeout((function(){e.setState({copying:!1})}),800)}))}},{key:"render",value:function(){var e=this.props,t=e.nameColor,a=e.format,o=e.moreUrl,l=e.singleColorPalette,n=void 0!==l&&l,r=this.state.copying;return Object(O.jsx)(p.a,{text:a,onCopy:this.handleCopy,children:Object(O.jsxs)("div",{className:"ColorBox",style:{background:a},children:[Object(O.jsx)("div",{className:"copy-overlay ".concat(r&&"show"),style:{background:a}}),Object(O.jsxs)("div",{className:"copy-overlay-text ".concat(r&&"show"),children:[Object(O.jsx)("h1",{style:{color:t},children:"Copied"}),Object(O.jsx)("h4",{style:{color:t},children:a})]}),Object(O.jsxs)("div",{className:"copy-container",children:[Object(O.jsx)("div",{className:"box-content",children:Object(O.jsx)("span",{style:{color:t},className:"name",children:a})}),Object(O.jsx)("button",{className:"copy",children:"copy"})]}),!n&&Object(O.jsx)(c.b,{to:o,style:{color:t},className:"more",children:Object(O.jsx)("div",{children:"more"})})]})})}}]),a}(o.Component),v=a(369),C=a(383),x=a(388),g=a(386),k=a(377),N=a(171),y=a.n(N),P=a(181),S=(a(215),function(e){Object(b.a)(a,e);var t=Object(j.a)(a);function a(e){var o;return Object(s.a)(this,a),(o=t.call(this,e)).state={snackbar:!1,format:"hex"},o.handleFormatChange=o.handleFormatChange.bind(Object(h.a)(o)),o.handleClose=o.handleClose.bind(Object(h.a)(o)),o}return Object(d.a)(a,[{key:"handleFormatChange",value:function(e){var t=this;this.setState({format:e.target.value},(function(){t.setState({snackbar:!0})})),this.props.changeFormat(e.target.value)}},{key:"handleClose",value:function(){this.setState({snackbar:!1})}},{key:"render",value:function(){var e=this.props,t=e.brightness,a=e.changeLevel,o=e.singleColorPalette,l=void 0!==o&&o,n=this.state,r=n.snackbar,i=n.format;return Object(O.jsxs)("div",{className:"Navbar",children:[Object(O.jsx)("div",{className:"Navbar__title",children:Object(O.jsx)(c.b,{to:"/React-Colors",children:Object(O.jsx)("h2",{children:"React Colors"})})}),Object(O.jsxs)("div",{className:"slider-container",children:[Object(O.jsx)("div",{className:"level",children:t}),!l&&Object(O.jsx)("div",{className:"slider",children:Object(O.jsx)(P.a,{min:100,max:800,step:100,defaultValue:t,onChange:a})})]}),Object(O.jsx)("div",{className:"select-container",children:Object(O.jsx)(v.a,{className:"form",children:Object(O.jsxs)(C.a,{value:i,onChange:this.handleFormatChange,children:[Object(O.jsx)(x.a,{value:"hex",children:"HEX"}),Object(O.jsx)(x.a,{value:"rgb",children:"RGB"}),Object(O.jsx)(x.a,{value:"rgba",children:"RGBA"})]})})}),Object(O.jsx)(g.a,{anchorOrigin:{vertical:"bottom",horizontal:"left"},open:r,autoHideDuration:3e3,onClose:this.handleClose,message:Object(O.jsxs)("span",{className:"snackbar-msg",children:["Format changed to ",i.toUpperCase()]}),action:Object(O.jsx)(O.Fragment,{children:Object(O.jsx)(k.a,{size:"small","aria-label":"close",color:"inherit",onClick:this.handleClose,children:Object(O.jsx)(y.a,{fontSize:"small"})})})})]})}}]),a}(o.Component)),F=function(e){Object(b.a)(a,e);var t=Object(j.a)(a);function a(e){var o;return Object(s.a)(this,a),(o=t.call(this,e)).state={brightness:400,format:"hex"},o.changeLevel=o.changeLevel.bind(Object(h.a)(o)),o.changeFormat=o.changeFormat.bind(Object(h.a)(o)),o}return Object(d.a)(a,[{key:"changeLevel",value:function(e){this.setState({brightness:e})}},{key:"changeFormat",value:function(e){this.setState({format:e})}},{key:"render",value:function(){var e=this.state,t=e.brightness,a=e.format,o=this.props.palette,l=o.colors[t].map((function(e,t){var l=o.colors[400][t].hexNoHash;return Object(O.jsx)(f,{format:e[a],nameColor:e.nameColor,moreUrl:"/React-Colors/palette/".concat(o.id,"/").concat(l)},t)}));return Object(O.jsxs)("div",{className:"Palette",children:[Object(O.jsx)(S,{brightness:t,changeLevel:this.changeLevel,changeFormat:this.changeFormat}),Object(O.jsx)("div",{className:"Palette-colors",children:l}),Object(O.jsx)("footer",{className:"Palette-footer",children:Object(O.jsxs)("div",{className:"footer-text",children:[Object(O.jsx)("div",{children:o.paletteName}),Object(O.jsx)("span",{className:"emoji",children:o.emoji})]})})]})}}]),a}(o.Component),E=[{paletteName:"Material UI Colors",id:"material-ui-colors",emoji:"\ud83c\udfa8",colors:["#F44336","#E91E63","#9C27B0","#673AB7","#3F51B5","#2196F3","#03A9F4","#00BCD4","#009688","#4CAF50","#8BC34A","#CDDC39","#FFEB3B","#FFC107","#FF9800","#FF5722","#795548","#9E9E9E","#607D8B"]},{paletteName:"Flat UI Colors v1",id:"flat-ui-colors-v1",emoji:"\ud83e\udd19",colors:["#1abc9c","#2ecc71","#3498db","#9b59b6","#34495e","#16a085","#27ae60","#2980b9","#8e44ad","#2c3e50","#f1c40f","#e67e22","#e74c3c","#ecf0f1","#95a5a6","#f39c12","#d35400","#c0392b","#bdc3c7","#7f8c8d"]},{paletteName:"Bold UI Colors",id:"bold-ui-colors",emoji:"\ud83c\udd71\ufe0f",colors:["#FFC312","#C4E538","#12CBC4","#FDA7DF","#ED4C67","#F79F1F","#A3CB38","#1289A7","#D980FA","#B53471","#EE5A24","#009432","#0652DD","#9980FA","#833471","#EA2027","#006266","#1B1464","#5758BB","#6F1E51"]},{paletteName:"Pastels",id:"pastels",emoji:"\ud83c\udff5\ufe0f",colors:["#55efc4","#81ecec","#74b9ff","#a29bfe","#dfe6e9","#00b894","#00cec9","#0984e3","#6c5ce7","#b2bec3","#ffeaa7","#fab1a0","#ff7675","#fd79a8","#636e72","#fdcb6e","#e17055","#d63031","#e84393","#2d3436"]},{paletteName:"Flat UI Colors v2",id:"flat-ui-colors-v2",emoji:"\ud83d\udc4a",colors:["#f6e58d","#ffbe76","#ff7979","#badc58","#dff9fb","#f9ca24","#f0932b","#eb4d4b","#6ab04c","#c7ecee","#7ed6df","#e056fd","#686de0","#30336b","#95afc0","#22a6b3","#be2edd","#4834d4","#130f40","#535c68"]},{paletteName:"Bold UI Colors v2",id:"bold-ui-colors-v2",emoji:"\ud83c\udd71\ufe0f",colors:["#00a8ff","#9c88ff","#fbc531","#4cd137","#487eb0","#0097e6","#8c7ae6","#e1b12c","#44bd32","#40739e","#e84118","#f5f6fa","#7f8fa6","#273c75","#353b48","#c23616","#dcdde1","#718093","#192a56","#2f3640"]},{paletteName:"Spanish Countryside",id:"spanish-countryside",emoji:"\ud83c\uddea\ud83c\uddf8",colors:["#40407a","#706fd3","#f7f1e3","#34ace0","#33d9b2","#2c2c54","#474787","#aaa69d","#227093","#218c74","#ff5252","#ff793f","#d1ccc0","#ffb142","#ffda79","#b33939","#cd6133","#84817a","#cc8e35","#ccae62"]},{paletteName:"Sorbet",id:"sorbet",emoji:"\ud83c\udf66",colors:["#FEA47F","#25CCF7","#EAB543","#55E6C1","#CAD3C8","#F97F51","#1B9CFC","#F8EFBA","#58B19F","#2C3A47","#B33771","#3B3B98","#FD7272","#9AECDB","#D6A2E8","#6D214F","#182C61","#FC427B","#BDC581","#82589F"]},{paletteName:"Game Colors",id:"game-colors",emoji:"\ud83d\udc7e",colors:["#fad390","#f8c291","#6a89cc","#82ccdd","#b8e994","#f6b93b","#e55039","#4a69bd","#60a3bc","#78e08f","#fa983a","#eb2f06","#1e3799","#3c6382","#38ada9","#e58e26","#b71540","#0c2461","#0a3d62","#079992"]}],_=function(e){Object(b.a)(a,e);var t=Object(j.a)(a);function a(e){var o;return Object(s.a)(this,a),(o=t.call(this,e)).state={format:"hex"},o.handleChangeFormat=o.handleChangeFormat.bind(Object(h.a)(o)),o}return Object(d.a)(a,[{key:"handleChangeFormat",value:function(e){this.setState({format:e})}},{key:"render",value:function(){var e=this.state.format,t=this.props.palette,a=t.colors.map((function(t,a){return Object(O.jsx)(f,{nameColor:t.nameColor,singleColorPalette:!0,format:t[e]},a)}));return Object(O.jsxs)("div",{className:"SCP",children:[Object(O.jsx)(S,{singleColorPalette:!0,changeFormat:this.handleChangeFormat}),Object(O.jsx)("div",{className:"SCP__colorbox-container",children:a}),Object(O.jsxs)("div",{className:"SCP__footer",children:[Object(O.jsx)("div",{children:t.paletteName}),Object(O.jsx)("span",{className:"emoji",children:t.emoji})]})]})}}]),a}(o.Component),w=a(172),D=a.n(w),B=["material-ui-colors","flat-ui-colors-v1","bold-ui-colors","pastels","flat-ui-colors-v2","bold-ui-colors-v2","spanish-countryside","sorbet","game-colors"],I=function(e){return!B.includes(e)},A=function(e){Object(b.a)(a,e);var t=Object(j.a)(a);function a(e){var o;return Object(s.a)(this,a),(o=t.call(this,e)).handleDelete=o.handleDelete.bind(Object(h.a)(o)),o}return Object(d.a)(a,[{key:"handleDelete",value:function(e){e.stopPropagation();var t=this.props;(0,t.deletePalette)(t.palette.id)}},{key:"render",value:function(){var e=this.props.palette,t=e.paletteName,a=e.emoji,o=e.colors,l=e.id,n=o.map((function(e){return Object(O.jsx)("div",{className:"MiniPalette__colorboxes__colorbox",style:{background:e}},e)}));return Object(O.jsxs)("div",{className:"MiniPalette",children:[Object(O.jsx)("div",{className:"MiniPalette__colorboxes",children:n}),Object(O.jsxs)("div",{className:"MiniPalette__bottom",children:[Object(O.jsxs)("h1",{children:[" ",t," "]}),Object(O.jsxs)("span",{children:[" ",a," "]})]}),I(l)&&Object(O.jsx)("button",{className:"MiniPalette__delete",onClick:this.handleDelete,children:Object(O.jsx)(D.a,{})})]})}}]),a}(o.Component),R=function(e){Object(b.a)(a,e);var t=Object(j.a)(a);function a(){return Object(s.a)(this,a),t.apply(this,arguments)}return Object(d.a)(a,[{key:"render",value:function(){var e=this.props,t=e.palettes,a=e.deletePalette,o=t.map((function(e){return Object(O.jsx)(c.b,{to:"/React-Colors/palette/".concat(e.id),className:"",children:Object(O.jsx)(A,{palette:e,deletePalette:a})},e.id)}));return Object(O.jsxs)("div",{className:"PaletteList",children:[Object(O.jsx)("nav",{className:"PaletteList__nav",children:Object(O.jsxs)("div",{className:"PaletteList__nav__content",children:[Object(O.jsx)("h1",{className:"PaletteList__nav__content__title",children:"React Colors"}),Object(O.jsx)(c.b,{to:"/React-Colors/palette/new",className:"PaletteList__nav__content__create",children:Object(O.jsx)("div",{children:"Create Palette"})})]})}),Object(O.jsx)("div",{className:"PaletteList__container",children:Object(O.jsx)("div",{className:"PaletteList__body",children:o})})]})}}]),a}(o.Component),T=a(75),L=a(67),M=a(180),H=a(101),U=a(183),J=a(39),G=a.n(J),V=[0,100,200,300,400,500,600,700,800,900];function z(e){return G.a.scale(["white","black"]).colors(2)[Math.floor(2*e)]}function q(e){for(var t={},a=0;a<e.colors.length;a++)for(var o=e.colors[a],l=G.a.scale([G()(o).darken(1.4),G()(o),"white"]).mode("lab").colors(V.length+1,"null").slice(0,10).reverse(),n=0;n<V.length;n++){var c=l[n];t[V[n]]||(t[V[n]]=[]);var i=t[V[n]],s={hex:c.hex(),hexNoHash:c.hex().slice(1),nameColor:z(G()(c.hex()).luminance()),rgb:c.css(),rgba:c.css().replace(")",", 1.0)")};i.push(s)}return Object(r.a)(Object(r.a)({},e),{},{colors:t})}function W(e,t){var a=G.a.scale([G()(t).darken(1.4),G()(t),"white"]).mode("lab").colors(V.length+1,"null").slice(0,10).reverse();return Object(r.a)(Object(r.a)({},e),{},{colors:a.map((function(e){return{hex:e.hex(),hexNoHash:e.hex().slice(1),nameColor:z(G()(e.hex()).luminance()),rgb:e.css(),rgba:e.css().replace(")",", 1.0)")}}))})}function X(e){return e.map((function(e){var t=Object(U.a)(e,3),a=t[0],o=t[1],l=t[2];return G()(a,o,l).hex()}))}function K(e){if(e)return G()(e).luminance()>.5?"black":"white"}var Q=function(e){Object(b.a)(a,e);var t=Object(j.a)(a);function a(e){var o;return Object(s.a)(this,a),(o=t.call(this,e)).state={color:"#000000",colorFormErrors:{colorError:""}},o.handleOnChange=Object(H.debounce)(o.handleOnChange.bind(Object(h.a)(o)),2),o.handleAddColor=o.handleAddColor.bind(Object(h.a)(o)),o.handleRecommendColor=Object(H.throttle)(o.handleRecommendColor.bind(Object(h.a)(o)),300),o.handleGeneratePalette=Object(H.debounce)(o.handleGeneratePalette.bind(Object(h.a)(o)),500),o.clickClearPalette=o.clickClearPalette.bind(Object(h.a)(o)),o.clickEditColor=o.clickEditColor.bind(Object(h.a)(o)),o.clickCancelEdit=o.clickCancelEdit.bind(Object(h.a)(o)),o.apiErrorHandler=o.apiErrorHandler.bind(Object(h.a)(o)),o}return Object(d.a)(a,[{key:"componentDidMount",value:function(){localStorage.getItem("currentEdit")||this.handleGeneratePalette()}},{key:"componentDidUpdate",value:function(e){if(this.props.paletteColors.length!==e.paletteColors.length){var t=JSON.stringify(this.props.paletteColors);localStorage.setItem("currentEdit",t)}this.props.editColor.color!==e.editColor.color&&this.setState({color:this.props.editColor.color})}},{key:"resetErrors",value:function(){this.setState((function(e){return Object(r.a)(Object(r.a)({},e),{},{colorFormErrors:{colorNameError:""}})}))}},{key:"resetForm",value:function(){this.setState((function(e){return Object(r.a)(Object(r.a)({},e),{},{color:e.color})}))}},{key:"isValid",value:function(){var e=this,t=this.props.paletteColors,a=this.state.color,o="",l=20===t.length,n=t.some((function(e){return e===a}));return n&&(o=Object(O.jsxs)("div",{className:"color-error",children:["Cannot have duplicate color:",Object(O.jsx)("div",{style:{backgroundColor:a,border:"1px solid rgba(0, 0, 0, 0.212)"}})]})),![l,n].some((function(e){return!0===e}))||(this.setState({colorFormErrors:{colorError:o}},(function(){setTimeout((function(){e.resetErrors()}),3e3)})),!1)}},{key:"handleOnChange",value:function(e){this.setState({color:e.hex}),this.props.changeColor(e.hex)}},{key:"handleAddColor",value:function(e){e.preventDefault(),this.isValid()&&(this.props.updatePalette(this.state.color),this.resetForm())}},{key:"apiErrorHandler",value:function(e){var t=this;this.setState({colorFormErrors:{colorError:e}},(function(){setTimeout((function(){t.resetErrors()}),3e3)}))}},{key:"handleGeneratePalette",value:function(){var e=this,t=this.props,a=t.setPalette,o=t.cancelEdit;fetch("https://guarded-plateau-27863.herokuapp.com/http://colormind.io/api/",{method:"POST",credentials:"omit",body:JSON.stringify({model:"default"})}).then((function(e){return e.json()})).then((function(t){a(X(t.result)),e.setState({color:"#000000"}),o()})).catch((function(t){e.apiErrorHandler(t)}))}},{key:"handleRecommendColor",value:function(){var e=this,t=this.props,a=t.updatePalette,o=t.paletteColors;if(!(20===o.length||o.length+1>20)){var l=function(e){for(var t=new Set,a=e.length;t.size<4;)t.add(Math.floor(Math.random()*a));return Array.from(t).map((function(t){return e[t]}))}(o).map((function(e){return G()(e).rgb()}));l.push("N");var n={model:"default",input:l};fetch("https://guarded-plateau-27863.herokuapp.com/http://colormind.io/api/",{method:"POST",credentials:"omit",body:JSON.stringify(n)}).then((function(e){return e.json()})).then((function(e){a(X(e.result)[e.result.length-1])})).catch((function(t){e.apiErrorHandler(t)}))}}},{key:"clickClearPalette",value:function(){(0,this.props.clearPalette)(),this.setState({color:"#000000"})}},{key:"clickEditColor",value:function(e){e.preventDefault();var t=this.props,a=t.updateColor,o=t.editColor,l=this.state.color;a(o.originalColor,l)}},{key:"clickCancelEdit",value:function(e){e.preventDefault(),(0,this.props.cancelEdit)()}},{key:"render",value:function(){var e=this.state,t=e.color,a=e.colorFormErrors.colorError,o=this.props,l=o.showSidebar,n=o.handleSidebarToggle,c=o.paletteColors,r=o.editColor,i=Object(O.jsxs)("div",{className:"edit-buttons",children:[Object(O.jsx)("button",{className:"edit-color-button",onClick:this.clickEditColor,children:Object(O.jsx)("div",{children:Object(O.jsx)("h2",{children:" Edit Color "})})}),Object(O.jsx)("button",{className:"cancel-edit-button",onClick:this.clickCancelEdit,children:Object(O.jsx)("div",{children:Object(O.jsx)("h2",{children:" Cancel "})})})]}),s=Object(O.jsx)("button",{type:"submit",className:"add-color-button",disabled:20===c.length,children:Object(O.jsx)("div",{className:"add-color-button__text",style:{backgroundColor:t,color:K(t)},children:Object(O.jsx)("h2",{children:" Add Color"})})});return Object(O.jsxs)("div",{className:"NewPaletteForm__sidebar ".concat(l&&"show"),children:[Object(O.jsx)("div",{className:"NewPaletteForm__sidebar__nav",children:Object(O.jsx)("div",{onClick:n,children:"hide tool"})}),Object(O.jsxs)("div",{className:"NewPaletteForm__sidebar__head",children:[Object(O.jsx)("button",{className:"random-palette-button",onClick:this.handleGeneratePalette,children:Object(O.jsx)("h3",{children:"Generate Random Palette"})}),Object(O.jsx)("button",{className:"random-color-button",onClick:this.handleRecommendColor,disabled:c.length<4||c.length>=20,children:Object(O.jsx)("h3",{children:"Recommend a Color"})}),Object(O.jsx)("button",{className:"clear-button",onClick:this.clickClearPalette,children:Object(O.jsx)("h3",{children:"Clear Palette"})})]}),Object(O.jsxs)("form",{onSubmit:this.handleAddColor,children:[Object(O.jsx)(M.a,{disableAlpha:!0,color:t,onChange:this.handleOnChange}),Object(O.jsx)("div",{className:"color-input",children:Object(O.jsx)("ul",{className:"error-list",children:Object(O.jsxs)("li",{children:[" ",a," "]})})}),r.edit?i:s]})]})}}]),a}(o.Component),Y=a(382),Z=a(385),$=a(381),ee=a(379),te=a(380),ae=a(378),oe=function(e){Object(b.a)(a,e);var t=Object(j.a)(a);function a(){return Object(s.a)(this,a),t.apply(this,arguments)}return Object(d.a)(a,[{key:"render",value:function(){var e=this.props,t=e.showSidebar,a=e.handleSidebarToggle,o=e.handleOpenInput,l=e.handleCloseInput,n=e.open,c=e.isEmpty,r=e.handleExit,i=Object(O.jsx)("div",{className:"toggle-sidebar-nav",onClick:a,children:"show tool"});return Object(O.jsxs)("nav",{className:"NewPaletteForm__main__nav",children:[Object(O.jsxs)("div",{className:"NewPaletteForm__main__nav__content",children:[Object(O.jsxs)("div",{className:"NewPaletteForm__main__nav__content--left",children:[!t&&i,Object(O.jsx)("div",{className:"title ".concat(t&&"show"),children:"Create Palette"})]}),Object(O.jsx)("div",{className:"NewPaletteForm__main__nav__content--right",children:Object(O.jsx)("button",{className:"save-palette-button",onClick:o,disabled:c,children:Object(O.jsx)("div",{children:"Save Palette"})})})]}),Object(O.jsxs)(Z.a,{open:"pickConfirm"===n,onClose:l,"aria-labelledby":"alert-dialog-title","aria-describedby":"alert-dialog-description",children:[Object(O.jsx)(ae.a,{id:"alert-dialog-title",children:"Leave without saving palette?"}),Object(O.jsx)(ee.a,{children:Object(O.jsx)(te.a,{id:"alert-dialog-description",children:"Any work done on an unsaved palette will be lost. Are you sure you want to leave without saving?"})}),Object(O.jsxs)($.a,{children:[Object(O.jsx)(Y.a,{onClick:r,color:"primary",children:"Leave"}),Object(O.jsx)(Y.a,{onClick:l,color:"primary",autoFocus:!0,children:"Stay"})]})]})]})}}]),a}(o.Component),le=a(182),ne=(a(336),function(e){Object(b.a)(a,e);var t=Object(j.a)(a);function a(){return Object(s.a)(this,a),t.apply(this,arguments)}return Object(d.a)(a,[{key:"render",value:function(){var e=this.props,t=e.open,a=e.handleCloseInput,o=e.handleOnTextChange,l=e.handleEmojiChange,n=e.handleEmojiDialog,c=e.paletteName;return Object(O.jsxs)(O.Fragment,{children:[Object(O.jsxs)(Z.a,{className:"PaletteSubmitForm",open:"pickPaletteName"===t,onClose:a,"aria-labelledby":"form-dialog-title",children:[Object(O.jsx)(ae.a,{id:"form-dialog-title",children:"Palette Name"}),Object(O.jsxs)(ee.a,{children:[Object(O.jsx)(te.a,{children:"Please enter a palette name for your new palette. Make sure it's unique!"}),Object(O.jsxs)(T.ValidatorForm,{onSubmit:n,children:[Object(O.jsx)(T.TextValidator,{label:"Palette Name",value:null!==c&&void 0!==c?c:"",onChange:o,validators:["required","isPaletteNameUnique"],errorMessages:["Name cannot be blank","Cannot have duplicate palette names"],fullWidth:!0,margin:"normal"}),Object(O.jsxs)($.a,{children:[Object(O.jsx)(Y.a,{onClick:a,color:"primary",children:"Cancel"}),Object(O.jsx)(Y.a,{type:"submit",color:"primary",children:"Next"})]})]})]})]}),Object(O.jsxs)(Z.a,{open:"pickEmoji"===t,onClose:a,children:[Object(O.jsx)(ae.a,{id:"form-dialog-title",children:"Emoji"}),Object(O.jsxs)(ee.a,{children:[Object(O.jsx)(te.a,{children:"Pick an emoji to represent your new palette"}),Object(O.jsx)(le.a,{onClick:l})]})]})]})}}]),a}(o.Component)),ce=a(179),re=a.n(ce),ie=function(e){Object(b.a)(a,e);var t=Object(j.a)(a);function a(e){var o;return Object(s.a)(this,a),(o=t.call(this,e)).clickDelete=o.clickDelete.bind(Object(h.a)(o)),o.clickBox=o.clickBox.bind(Object(h.a)(o)),o}return Object(d.a)(a,[{key:"clickBox",value:function(){var e=this.props,t=e.selectColor,a=e.color;e.showSidebar&&t(a)}},{key:"clickDelete",value:function(e){var t=this.props,a=t.handleDeleteColor,o=t.color;e.stopPropagation(),a(o)}},{key:"render",value:function(){var e=this.props,t=e.color,a=e.editColor,o=Object(O.jsx)(O.Fragment,{children:Object(O.jsx)("div",{className:"draggable-colorbox--edit",style:{backgroundColor:a.color}})}),l=a.edit&&a.originalColor===t;return Object(O.jsx)("div",{className:"draggable-colorbox-container",onClick:this.clickBox,children:Object(O.jsxs)("div",{className:"draggable-colorbox",style:{backgroundColor:t},children:[Object(O.jsxs)("div",{className:"draggable-colorbox__content ".concat(l&&"edit"),children:[Object(O.jsx)("div",{style:{color:K(t)},children:t}),Object(O.jsx)(k.a,{size:"small",onClick:this.clickDelete,children:Object(O.jsx)(re.a,{fontSize:"small",className:"font-"+K(t)})})]}),l&&o,Object(O.jsx)("div",{className:"draggable-colorbox--border",style:{transition:"border-width 150ms ease-in-out",border:"".concat(l?"max(3px, 0.4vw) solid "+K(t):"0px solid "+K(t))}})]})})}}]),a}(o.Component),se=Object(L.b)(ie);var de=Object(L.a)((function(e){var t=e.colors,a=e.editColor,o=e.showSidebar,l=e.handleDeleteColor,n=e.selectColor;return Object(O.jsx)("div",{className:"NewPaletteForm__main__content__colorbox-container",children:t.map((function(e,t){return Object(O.jsx)(se,{color:e,index:t,showSidebar:o,selectColor:n,handleDeleteColor:l,editColor:a},e)}))})})),he=function(e){Object(b.a)(a,e);var t=Object(j.a)(a);function a(e){var o;return Object(s.a)(this,a),(o=t.call(this,e)).onSortEnd=function(e){var t=e.oldIndex,a=e.newIndex;o.setState((function(e){return{paletteForm:Object(r.a)(Object(r.a)({},e.paletteForm),{},{colors:Object(L.c)(e.paletteForm.colors,t,a)})}}),(function(){localStorage.setItem("currentEdit",JSON.stringify(o.state.paletteForm.colors))}))},o.state={paletteForm:{paletteName:"",id:"",emoji:"",colors:JSON.parse(localStorage.getItem("currentEdit"))||[]},paletteNameError:"",showSidebar:!0,showSubmission:!1,exitBlock:!0,editColor:{edit:!1,color:"#000000",originalColor:"#000002"}},o.handleSidebarToggle=o.handleSidebarToggle.bind(Object(h.a)(o)),o.handleOpenInput=o.handleOpenInput.bind(Object(h.a)(o)),o.handleCloseInput=o.handleCloseInput.bind(Object(h.a)(o)),o.handleAddPalette=o.handleAddPalette.bind(Object(h.a)(o)),o.handleExit=o.handleExit.bind(Object(h.a)(o)),o.handleDeleteColor=o.handleDeleteColor.bind(Object(h.a)(o)),o.handleOnTextChange=o.handleOnTextChange.bind(Object(h.a)(o)),o.handleEmojiChange=o.handleEmojiChange.bind(Object(h.a)(o)),o.handleEmojiDialog=o.handleEmojiDialog.bind(Object(h.a)(o)),o.handleConfirmDialog=o.handleConfirmDialog.bind(Object(h.a)(o)),o.handleBrowserBack=o.handleBrowserBack.bind(Object(h.a)(o)),o.selectColor=o.selectColor.bind(Object(h.a)(o)),o.cancelEdit=o.cancelEdit.bind(Object(h.a)(o)),o.updateColor=o.updateColor.bind(Object(h.a)(o)),o.changeColor=o.changeColor.bind(Object(h.a)(o)),o.updatePalette=o.updatePalette.bind(Object(h.a)(o)),o.setPalette=o.setPalette.bind(Object(h.a)(o)),o.clearPalette=o.clearPalette.bind(Object(h.a)(o)),o}return Object(d.a)(a,[{key:"componentDidMount",value:function(){var e=this.props.palettes;T.ValidatorForm.addValidationRule("isPaletteNameUnique",(function(t){return e.every((function(e){var a=e.paletteName;return t.toLowerCase()!==a.toLowerCase()}))}))}},{key:"handleCloseInput",value:function(){this.setState({showSubmission:!1})}},{key:"handleOpenInput",value:function(e){e.stopPropagation(),this.setState({showSubmission:"pickPaletteName"})}},{key:"convertPaletteName",value:function(e){return e.split(" ").map((function(e){return e.toLowerCase()})).join("-")}},{key:"handleSidebarToggle",value:function(){var e=this;this.setState({showSidebar:!this.state.showSidebar},(function(){return e.cancelEdit()}))}},{key:"handleDeleteColor",value:function(e){var t=this.state.paletteForm.colors.filter((function(t){return t!==e}));this.setState({paletteForm:{colors:t},editColor:Object(r.a)(Object(r.a)({},this.state.editColor),{},{edit:!1,originalColor:"#fffff2"})})}},{key:"handleOnTextChange",value:function(e){this.setState({paletteForm:Object(r.a)(Object(r.a)({},this.state.paletteForm),{},{paletteName:e.target.value})})}},{key:"handleEmojiChange",value:function(e){var t=this;this.setState({paletteForm:Object(r.a)(Object(r.a)({},this.state.paletteForm),{},{emoji:e.native})},(function(){t.handleAddPalette()}))}},{key:"handleEmojiDialog",value:function(){this.setState({showSubmission:"pickEmoji"})}},{key:"handleConfirmDialog",value:function(){this.setState({showSubmission:"pickConfirm"})}},{key:"handleBrowserBack",value:function(){return this.handleConfirmDialog(),!1}},{key:"handleAddPalette",value:function(){var e=this,t=this.state.paletteForm,a=t.paletteName,o=t.emoji,l=t.colors,n={paletteName:a,id:this.convertPaletteName(this.state.paletteForm.paletteName),emoji:o,colors:l};this.setState({exitBlock:!1},(function(){e.props.savePalette(n),e.props.history.push("/React-Colors")}))}},{key:"handleExit",value:function(){var e=this;localStorage.removeItem("currentEdit"),this.setState({exitBlock:!1},(function(){e.props.history.push("/React-Colors")}))}},{key:"clearPalette",value:function(){var e=this;this.setState({paletteForm:{paletteName:"",colors:[],emoji:""}},(function(){e.cancelEdit()}))}},{key:"setPalette",value:function(e){var t=this;this.setState({paletteForm:{colors:e}},(function(){localStorage.setItem("currentEdit",JSON.stringify(t.state.paletteForm.colors))}))}},{key:"selectColor",value:function(e){e!==this.state.editColor.originalColor?this.setState({editColor:{edit:!0,color:e,originalColor:e}}):this.cancelEdit()}},{key:"changeColor",value:function(e){this.setState({editColor:Object(r.a)(Object(r.a)({},this.state.editColor),{},{color:e})})}},{key:"cancelEdit",value:function(){this.setState({editColor:Object(r.a)(Object(r.a)({},this.state.editColor),{},{edit:!1,originalColor:"#fffff2"})})}},{key:"updateColor",value:function(e,t){var a=this;if(e!==t){var o=this.state.paletteForm.colors.map((function(a){return a===e?t:a}));this.setState({paletteForm:{colors:o}},(function(){a.cancelEdit(),localStorage.setItem("currentEdit",JSON.stringify(a.state.paletteForm.colors))}))}else this.cancelEdit()}},{key:"updatePalette",value:function(e){this.setState({paletteForm:{colors:[].concat(Object(i.a)(this.state.paletteForm.colors),[e])}})}},{key:"render",value:function(){var e=this.state,t=e.showSidebar,a=e.showSubmission,o=e.exitBlock,l=e.editColor,n=e.paletteForm,c=n.colors,r=n.paletteName;return Object(O.jsxs)("div",{className:"NewPaletteForm",children:[Object(O.jsx)(u.a,{when:o,message:this.handleBrowserBack}),Object(O.jsx)(ne,{open:a,paletteName:r,handleCloseInput:this.handleCloseInput,handleOnTextChange:this.handleOnTextChange,handleEmojiChange:this.handleEmojiChange,handleEmojiDialog:this.handleEmojiDialog}),Object(O.jsxs)("main",{className:"NewPaletteForm__main ".concat(t&&"show"),children:[Object(O.jsx)(oe,{open:a,showSidebar:t,isEmpty:0===c.length,handleSidebarToggle:this.handleSidebarToggle,handleOpenInput:this.handleOpenInput,handleCloseInput:this.handleCloseInput,handleConfirmDialog:this.handleConfirmDialog,handleExit:this.handleExit}),Object(O.jsx)("div",{className:"NewPaletteForm__main__content",children:Object(O.jsx)(de,{colors:c,editColor:l,showSidebar:t,handleDeleteColor:this.handleDeleteColor,selectColor:this.selectColor,onSortEnd:this.onSortEnd,axis:"xy",distance:1})})]}),Object(O.jsx)(Q,{showSidebar:t,paletteColors:c,editColor:l,handleSidebarToggle:this.handleSidebarToggle,clearPalette:this.clearPalette,updatePalette:this.updatePalette,setPalette:this.setPalette,updateColor:this.updateColor,changeColor:this.changeColor,cancelEdit:this.cancelEdit})]})}}]),a}(o.Component),be=(a(337),function(e){Object(b.a)(a,e);var t=Object(j.a)(a);function a(e){var o;return Object(s.a)(this,a),(o=t.call(this,e)).state={palettes:JSON.parse(localStorage.getItem("palettes"))||E},o.savePalette=o.savePalette.bind(Object(h.a)(o)),o.deletePalette=o.deletePalette.bind(Object(h.a)(o)),o.findPalette=o.findPalette.bind(Object(h.a)(o)),o.findSinglePalette=o.findSinglePalette.bind(Object(h.a)(o)),o}return Object(d.a)(a,[{key:"componentDidUpdate",value:function(){localStorage.removeItem("currentEdit");var e=JSON.stringify(this.state.palettes);localStorage.setItem("palettes",e)}},{key:"findPalette",value:function(e){var t=e.match.params.id,a=this.state.palettes.find((function(e){return e.id===t}));return void 0===a?Object(O.jsx)(u.b,{to:"/React-Colors"}):Object(O.jsx)(F,{palette:q(a)})}},{key:"findSinglePalette",value:function(e){var t=this.state.palettes,a=e.match.params.id,o=e.match.params.hexNoHash,l=t.find((function(e){return e.id===a})),n=l.colors.find((function(e){return e.slice(1).toLowerCase()===o}));return Object(O.jsx)(_,{renderProps:e,palette:W(l,n)})}},{key:"savePalette",value:function(e){var t=[].concat(Object(i.a)(this.state.palettes),[e]);this.setState({palettes:t})}},{key:"deletePalette",value:function(e){var t=this.state.palettes.filter((function(t){return t.id!==e}));this.setState({palettes:t})}},{key:"render",value:function(){var e=this,t=this.state.palettes;return Object(O.jsx)(O.Fragment,{children:Object(O.jsxs)(u.e,{children:[Object(O.jsx)(u.c,{exact:!0,path:"/React-Colors/palette/new",render:function(a){return Object(O.jsx)(he,Object(r.a)(Object(r.a)({},a),{},{savePalette:e.savePalette,palettes:t}))}}),Object(O.jsx)(u.c,{exact:!0,path:"/React-Colors/palette/:id",render:this.findPalette}),Object(O.jsx)(u.c,{exact:!0,path:"/React-Colors/palette/:id/:hexNoHash",render:this.findSinglePalette}),Object(O.jsx)(u.c,{exact:!0,path:"/React-Colors",render:function(){return Object(O.jsx)(R,{palettes:t,deletePalette:e.deletePalette})}})]})})}}]),a}(o.Component));n.a.render(Object(O.jsx)(c.a,{children:Object(O.jsx)(be,{})}),document.getElementById("root"))}},[[338,1,2]]]);
//# sourceMappingURL=main.66ab6d2f.chunk.js.map