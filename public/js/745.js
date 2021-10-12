"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[745],{1745:(e,r,t)=>{t.r(r),t.d(r,{default:()=>p});var n=t(7294),s=t(9680),a=t(1636),l=t(795),o=t(5893);function c(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function i(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?c(Object(t),!0).forEach((function(r){u(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):c(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function u(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function m(e,r){return function(e){if(Array.isArray(e))return e}(e)||function(e,r){var t=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==t)return;var n,s,a=[],l=!0,o=!1;try{for(t=t.call(e);!(l=(n=t.next()).done)&&(a.push(n.value),!r||a.length!==r);l=!0);}catch(e){o=!0,s=e}finally{try{l||null==t.return||t.return()}finally{if(o)throw s}}return a}(e,r)||function(e,r){if(!e)return;if("string"==typeof e)return d(e,r);var t=Object.prototype.toString.call(e).slice(8,-1);"Object"===t&&e.constructor&&(t=e.constructor.name);if("Map"===t||"Set"===t)return Array.from(e);if("Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return d(e,r)}(e,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function d(e,r){(null==r||r>e.length)&&(r=e.length);for(var t=0,n=new Array(r);t<r;t++)n[t]=e[t];return n}var f=function(){var e=(0,a.qt)().props.errors;console.log(e);var r=m((0,n.useState)({email:"",password:"",remember:!1}),2),t=r[0],l=r[1];function c(e){var r=e.target.id,t="checkbox"===e.target.type?e.target.checked:e.target.value;l((function(e){return i(i({},e),{},u({},r,t))}))}return(0,o.jsxs)("div",{className:"flex flex-col justify-center items-center",children:[(0,o.jsx)("div",{className:"mb-2 mt-8",children:(0,o.jsx)("img",{src:"https://res.cloudinary.com/dji0yvkef/image/upload/v1628691598/BDLogo.png",height:"150",width:"150"})}),(0,o.jsxs)("div",{className:"rounded-md shadow-sm bg-white p-4 w-96 m-2",children:[(0,o.jsx)("p",{className:"text-center text-2xl mb-2",children:"Login"}),(0,o.jsxs)("form",{onSubmit:function(e){e.preventDefault(),s.Inertia.post("/login",t)},children:[(0,o.jsxs)("div",{className:"my-2",children:[(0,o.jsx)("label",{htmlFor:"email",className:"block",children:(0,o.jsx)("span",{className:"text-gray-700",children:"Email"})}),(0,o.jsx)("input",{id:"email",value:t.email,onChange:c,type:"email",className:"form-input form"}),e.email&&(0,o.jsx)("div",{className:"text-sm text-red-500",children:e.email})]}),(0,o.jsxs)("div",{className:"my-2",children:[(0,o.jsx)("label",{htmlFor:"password",className:"block",children:(0,o.jsx)("span",{className:"text-gray-700",children:"Password"})}),(0,o.jsx)("input",{id:"password",value:t.password,onChange:c,type:"password",className:"form-input form"}),e.password&&(0,o.jsx)("div",{className:"text-sm text-red-500",children:e.password})]}),(0,o.jsx)("div",{className:"my-2",children:(0,o.jsxs)("label",{htmlFor:"remember",className:"inline-flex items-center",children:[(0,o.jsx)("input",{id:"remember",checked:t.remember,onChange:c,type:"checkbox",className:"form-checkbox rounded border-gray-300 text-orange-500 shadow-sm focus:border-orange-300 focus:ring focus:ring-offset-0 focus:ring-orange-200 focus:ring-opacity-50"}),(0,o.jsx)("span",{className:"text-gray-700 ml-2",children:"Remember me"})]})}),(0,o.jsx)("button",{className:"btn btn-primary w-full",children:"Login"})]}),(0,o.jsx)("div",{className:"mt-2",children:(0,o.jsx)(a.rU,{href:"/password",children:"Forgotten password?"})})]})]})};f.layout=function(e){return(0,o.jsx)(l.Z,{children:e,title:"Login"})};const p=f},795:(e,r,t)=>{t.d(r,{Z:()=>a});t(7294);var n=t(1636),s=t(5893);function a(e){var r=e.children,t=e.title,a=(0,n.qt)().props.flash;return(0,s.jsxs)("div",{className:"h-screen",style:{backgroundImage:'url("https://res.cloudinary.com/dji0yvkef/image/upload/v1629364231/BDVA/bg-1_llda6s.jpg")'},children:[(0,s.jsx)(n.Fb,{title:t}),a.error&&(0,s.jsx)("p",{className:"text-red-500",children:a.error}),a.success&&(0,s.jsx)("p",{className:"text-green-500",children:a.success}),r]})}}}]);