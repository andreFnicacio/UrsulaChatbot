"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var whatsappService = require("../services/whatsappService");
var whatsappModel = require("../shared/whatsappmodels");
var fs = require('fs');
var path = require('path');
var axios = require('axios');

// Caminho para o arquivo JSON
var redisFilePath = path.join(__dirname, '../roadmap/redis.json');
function loadRedisJson() {
  try {
    var data = fs.readFileSync(redisFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    // Se o arquivo não existir ou der erro, retornamos um objeto vazio
    return {};
  }
}
function saveRedisJson(data) {
  fs.writeFileSync(redisFilePath, JSON.stringify(data, null, 2), 'utf8');
}
function flowDefault(_x, _x2, _x3) {
  return _flowDefault.apply(this, arguments);
}
function _flowDefault() {
  _flowDefault = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(number, user, textUser) {
    var models, client, user_id, phone, name, step, uuidRegex, redisData, document_id, response, assistant, _redisData, lastFiveChats, rows, _operationList, operationList, textClient, decision_tree_way, button;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          // Se não existir, manda mensagem de despedida
          models = [];
          textUser = textUser.toLowerCase();
          client = user['data'] || user;
          user_id = client.id;
          phone = number;
          name = client.username;
          step = textUser;
          uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
          _context.next = 10;
          return loadRedisJson();
        case 10:
          redisData = _context.sent;
          document_id = redisData[phone] || false; // Verifica se o document_id é válido e foi registrado
          if (!(document_id && uuidRegex.test(document_id))) {
            _context.next = 26;
            break;
          }
          _context.prev = 13;
          _context.next = 16;
          return axios.post('https://educational-rag-production.up.railway.app/chat', null, {
            params: {
              question: textUser,
              document_id: document_id,
              user_id: user_id
            },
            headers: {
              'Content-Type': 'application/json' // Ajuste o cabeçalho se necessário
            }
          });
        case 16:
          response = _context.sent;
          console.log(response.data);
          assistant = whatsappModel.MessageText(response['data'].content, phone);
          _context.next = 21;
          return whatsappService.SendMessageWhatsApp(assistant);
        case 21:
          _context.next = 26;
          break;
        case 23:
          _context.prev = 23;
          _context.t0 = _context["catch"](13);
          console.error("Erro ao fazer a requisição para a API: ", _context.t0);
        case 26:
          if (uuidRegex.test(step)) {
            try {
              // Carrega o conteúdo atual do JSON
              _redisData = loadRedisJson(); // Atualiza ou adiciona o número do cliente com o document_id (step)
              _redisData[phone] = step;

              // Salva o JSON atualizado de volta no arquivo
              saveRedisJson(_redisData);
              console.log("Arquivo JSON atualizado com o IDDocument LastChat:", _redisData);

              // Envia uma resposta de confirmação para o cliente
              models.push(whatsappModel.MessageText("Perfeito ".concat(name, "!! Ja estou preparada pra te ajudar \uD83D\uDE0A. Do que voc\xEA precisa hoje ?"), phone));
            } catch (error) {
              console.error("Erro ao salvar no arquivo JSON:", error);
              models.push(whatsappModel.MessageText("Erro ao salvar o Document ID. Tente novamente mais tarde.", phone));
            }
          }
          if (!(step == 'urs_assistant')) {
            _context.next = 41;
            break;
          }
          if (!(client.last_chats && client.last_chats.length > 0)) {
            _context.next = 36;
            break;
          }
          lastFiveChats = client.last_chats.slice(-5);
          rows = lastFiveChats.map(function (chat) {
            return {
              id: chat.id,
              title: "Testing",
              description: "Chat salvo pelo sistema FiveGuys"
            };
          });
          console.log(rows);
          // Chamando a função listLastFiveChats com os dados montados
          _operationList = whatsappModel.listLastFiveChats(phone, rows);
          models.push(_operationList);
          _context.next = 40;
          break;
        case 36:
          _context.next = 38;
          return whatsappService.SendMessageWhatsApp(whatsappModel.MessageText("Opa, percebi que você ainda não tem um chat inciado\nAcesse nossa plataforma web para iniciar as anotações e liberar seu assistente ou se prefirir podemos iniciar por aqui tambem, gostaria de ver outras funções ? 😉", number));
        case 38:
          operationList = whatsappModel.GetOutDoorData(phone);
          models.push(operationList);
        case 40:
          return _context.abrupt("return", models);
        case 41:
          _context.t1 = step;
          _context.next = _context.t1 === 'urs_backoffice' ? 44 : _context.t1 === 'urs_analist' ? 47 : _context.t1 === 'urs_faqs' ? 50 : _context.t1 === 'urs_who' ? 53 : _context.t1 === 'urs_work' ? 55 : _context.t1 === 'urs_access' ? 57 : _context.t1 === 'urs_operation' ? 60 : 63;
          break;
        case 44:
          operationList = whatsappModel.GetOutDoorBackoffice(phone);
          models.push(operationList);
          return _context.abrupt("break", 68);
        case 47:
          operationList = whatsappModel.operationAgent(phone);
          models.push(operationList);
          return _context.abrupt("break", 68);
        case 50:
          operationList = whatsappModel.OperationFAQ(phone);
          models.push(operationList);
          return _context.abrupt("break", 68);
        case 53:
          models.push(whatsappModel.MessageText("Conheça Aurora, nossa assistente digital avançada 🚀, treinada para ser sua educadora pessoal. Aurora é especialista em analisar documentos e extrair informações cruciais, oferecendo suporte automatizado para otimizar a gestão dos seus contratos. Com ela, você tem à disposição uma ferramenta poderosa para facilitar seu dia a dia. 😉", number));
          return _context.abrupt("break", 68);
        case 55:
          models.push(whatsappModel.MessageText("A mágica por trás da Aurora é usar a Meta Cloud API, nossa própria API e uma conexão verificada com a OpenAI. Ela processa audios legíveis (a nível de computação) 🖥️, extrai os dados relevantes e responde de forma rápida e segura. 💡", number));
          return _context.abrupt("break", 68);
        case 57:
          models.push(whatsappModel.MessageText("Você pode acessar a Aurora pelo nosso portal online 🌐. Só fazer login e começar a usar os serviços da nossa assistente digital top! 😃", number));
          models.push(whatsappModel.GetOutDoorData(number));
          return _context.abrupt("break", 68);
        case 60:
          operationList = whatsappModel.OperationUrsula(phone);
          models.push(operationList);
          return _context.abrupt("break", 68);
        case 63:
          textClient = "Ol\xE1 ".concat(name, ", Bem vindo!! Gostaria de entrar no *menu* da sua sess\xE3o?");
          decision_tree_way = ["urs_operation", "await_session"];
          button = whatsappModel.Button(textClient, phone, decision_tree_way);
          models.push(button);
          return _context.abrupt("break", 68);
        case 68:
          return _context.abrupt("return", models);
        case 69:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[13, 23]]);
  }));
  return _flowDefault.apply(this, arguments);
}
module.exports = flowDefault;