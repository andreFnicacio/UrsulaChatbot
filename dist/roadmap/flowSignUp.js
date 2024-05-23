"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var _require = require("express"),
  text = _require.text;
var whatsappModel = require("../shared/whatsappmodels");
var updateClient = require("../util/api/updateClient");
//const startSession = require("../util/api/startSession");
var redis = require("../util/redis/redis_config");
function capitalizeWords(str) {
  return str.replace(/\b\w/g, function (c) {
    return c.toUpperCase();
  });
}
function flowSignUp(_x, _x2) {
  return _flowSignUp.apply(this, arguments);
}
function _flowSignUp() {
  _flowSignUp = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(user, textUser) {
    var phoneClient, session, models, stepFlow, updateData, _updateData, responseToclient, decision_tree, button, _updateData2, cpfCnpjRegex, _decision_tree, textClient, decision_tree_way, _updateData3;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          textUser = textUser.toLowerCase();
          phoneClient = user.phone;
          session = user.id_session;
          models = [];
          stepFlow = user.step_flow;
          if (!(textUser === "await_session")) {
            _context.next = 17;
            break;
          }
          user.flow_roadmap = "session_flow";
          user.step_flow = "await_conect";
          updateData = {
            "id_phone": user.phone,
            "updateData": user
          };
          _context.next = 11;
          return updateClient(updateData);
        case 11:
          _context.next = 13;
          return redis.setUserState(session, user);
        case 13:
          // Atualiza o estado no Redis                

          models.push(whatsappModel.MessageText("Ok ".concat(user.name, "! Me chame novamento quando quiser!! \uD83D\uDE0A"), user.phone));
          return _context.abrupt("return", models);
        case 17:
          if (!(textUser === "await_step")) {
            _context.next = 26;
            break;
          }
          user.step_flow = "default";
          _updateData = {
            "id_phone": user.phone,
            "updateData": user
          };
          _context.next = 22;
          return updateClient(_updateData);
        case 22:
          models.push(whatsappModel.MessageText("Ok! Me chame novamento quando quiser!! \uD83D\uDE0A", user.phone));
          return _context.abrupt("return", models);
        case 26:
          if (!(textUser === "session_flow")) {
            _context.next = 35;
            break;
          }
          //Registrando nova etapa
          user.flow_roadmap = textUser;
          responseToclient = "Perfeito 🤖! Eu preciso que você faça a leitura do nosso *QrCode*\n\nRecomendamos abrir o *whatsapp web* para facilitar a leitura\n\nPronto, QrCode gerado!! Podemos encaminhar ?";
          decision_tree = ["next_step", "await_session"];
          button = whatsappModel.Button(responseToclient, user.phone, decision_tree);
          _updateData2 = {
            "id_phone": user.phone,
            "updateData": user
          };
          _context.next = 34;
          return updateClient(_updateData2);
        case 34:
          models.push(button);
        case 35:
          ;
          _context.t0 = stepFlow;
          _context.next = _context.t0 === 'start' ? 39 : _context.t0 === 'ask_name' ? 45 : _context.t0 === 'validate_email' ? 47 : _context.t0 === 'validate_unique_key' ? 49 : _context.t0 === 'default' ? 52 : 61;
          break;
        case 39:
          user.step_flow = 'ask_name'; // Ajustar o fluxo para perguntar o nome
          user.id_session = user.id_session;
          user.phone = user.phone;
          user.deadline = 300;
          models.push(whatsappModel.MessageText("Pra começar, me informe seu nome por favor!? 😊", phoneClient));
          return _context.abrupt("break", 61);
        case 45:
          // Novo caso para validar o nome
          if (isValidName(textUser)) {
            user.name = capitalizeWords(textUser);
            user.step_flow = 'validate_email';
            user.deadline = 300;
            models.push(whatsappModel.MessageText("Maravilha *".concat(user.name, "*! Agora preciso saber seu email."), phoneClient));
          } else {
            models.push(whatsappModel.MessageText("O nome fornecido não é válido. Por favor, informe um nome sem caracteres especiais e com pelo menos 3 letras.", phoneClient));
          }
          return _context.abrupt("break", 61);
        case 47:
          if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(textUser)) {
            // Verifica se o email é válido
            user.email = textUser;
            user.step_flow = 'validate_unique_key';
            models.push(whatsappModel.MessageText("Qual é o seu CPF ou CNPJ?", phoneClient));
          } else {
            // Caso email inválido, pede novamente
            models.push(whatsappModel.MessageText("Parece que o email fornecido não é válido. Por favor, informe um email válido.", phoneClient));
          }
          return _context.abrupt("break", 61);
        case 49:
          // Expressão regular para validar CPF ou CNPJ
          cpfCnpjRegex = /^(\d{3}\.?\d{3}\.?\d{3}-?\d{2}|\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d{2})$/;
          if (cpfCnpjRegex.test(textUser)) {
            user.unique_key = textUser;
            user.step_flow = 'finalized_signup';
            user.deadline = 86400;
            responseToclient = "Seu cadastro já está *Realizado*! 😁\n\nVamos iniciar a sessão?";
            _decision_tree = ["session_flow", "await_session"];
            button = whatsappModel.Button(responseToclient, phoneClient, _decision_tree);
            models.push(button);
          } else {
            models.push(whatsappModel.MessageText("O CPF ou CNPJ fornecido não é válido. Por favor, informe um válido.", phoneClient));
          }
          return _context.abrupt("break", 61);
        case 52:
          user.step_flow = 'start';
          user.deadline = 120;
          textClient = "Eita! Parece que você não finalizou seu cadastro no sistema 😅.\nPodemos continuar agora ?";
          decision_tree_way = ["signup_follow", "await_step"];
          button = whatsappModel.Button(textClient, user.phone, decision_tree_way);
          models.push(button);
          _context.next = 60;
          return updateClient({
            "id_phone": phoneClient,
            "updateData": user
          });
        case 60:
          return _context.abrupt("return", models);
        case 61:
          if (!(user.step_flow === "finalized_signup")) {
            _context.next = 66;
            break;
          }
          user.step_flow = "generate_qrcode";
          _updateData3 = {
            "id_phone": phoneClient,
            "updateData": user
          };
          _context.next = 66;
          return updateClient(_updateData3);
        case 66:
          _context.next = 68;
          return redis.setUserState(session, user);
        case 68:
          return _context.abrupt("return", models);
        case 69:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _flowSignUp.apply(this, arguments);
}
function isValidName(name) {
  // Verifica se o nome tem pelo menos 3 letras e não contém os caracteres inválidos
  return /^[A-Za-zÀ-ÖØ-öø-ÿ ']{3,}$/.test(name) && !/[@]|\.com|\.br/.test(name);
}
module.exports = flowSignUp;