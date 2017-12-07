/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("routing-controllers");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 *
 *  USERS ADMIN INTERFACE
 *  Main application file.
 *
 *  Create and launch server here
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(8);
var routing_controllers_1 = __webpack_require__(0);
var UsersCtrl_ts_1 = __webpack_require__(3);
routing_controllers_1.createExpressServer({
    cors: true,
    controllers: [
        UsersCtrl_ts_1.UsersCtrl
    ]
}).listen(3000);


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 *
 *  USERS ADMIN INTERFACE
 *  Config file.
 *
 *
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = {
    pathToCsv: "./build/server/data/users.csv"
};


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 *
 *  USERS ADMIN INTERFACE
 *  Users controller file.
 *
 *  Controller for processing users entity requests
 *
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var routing_controllers_1 = __webpack_require__(0);
var UsersMdl_ts_1 = __webpack_require__(4);
var UsersCtrl = /** @class */ (function () {
    function UsersCtrl() {
        this.usersMdl = new UsersMdl_ts_1.UsersMdl();
    }
    UsersCtrl.prototype.users = function (request) {
        var data = request.query;
        return this.usersMdl.getAll((data.page && +data.page) || 0, (data.limit && +data.limit) || 0);
    };
    UsersCtrl.prototype.getOne = function (id) {
        return this.usersMdl.getOne(id || null);
    };
    UsersCtrl.prototype.save = function (data, id) {
        return this.usersMdl.save(id || null, (Object.keys(data).length && data) || null);
    };
    __decorate([
        routing_controllers_1.Get("/users"),
        __param(0, routing_controllers_1.Req()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], UsersCtrl.prototype, "users", null);
    __decorate([
        routing_controllers_1.Get("/user/:id"),
        __param(0, routing_controllers_1.Param("id")),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number]),
        __metadata("design:returntype", void 0)
    ], UsersCtrl.prototype, "getOne", null);
    __decorate([
        routing_controllers_1.Post("/user/:id"),
        __param(0, routing_controllers_1.Body()),
        __param(1, routing_controllers_1.Param("id")),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Number]),
        __metadata("design:returntype", void 0)
    ], UsersCtrl.prototype, "save", null);
    UsersCtrl = __decorate([
        routing_controllers_1.JsonController(),
        __metadata("design:paramtypes", [])
    ], UsersCtrl);
    return UsersCtrl;
}());
exports.UsersCtrl = UsersCtrl;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 *
 *  USERS ADMIN INTERFACE
 *  Users model file.
 *
 *  Model for users entity
 *
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = __webpack_require__(6);
var csvjson = __webpack_require__(5);
var lodash = __webpack_require__(7);
var routing_controllers_1 = __webpack_require__(0);
var config_1 = __webpack_require__(2);
var UsersMdl = /** @class */ (function () {
    function UsersMdl() {
        this.users = [];
        this.page = 1;
        this.allUsersAmount = 100; // by default will be 100
    }
    UsersMdl.prototype.getAll = function (page, limit) {
        var _this = this;
        lodash.forEach({ page: page, limit: limit }, function (param, key) {
            if (!param) {
                throw new routing_controllers_1.BadRequestError("Bad '" + key + "' param");
            }
        });
        if (this.users.length &&
            this.users.length === limit &&
            this.page === page) {
            return Promise.resolve(this.users);
        }
        return new Promise(function (resolve) {
            fs.readFile(config_1.config.pathToCsv, "utf-8", function (err, csvData) {
                if (err) {
                    throw new routing_controllers_1.InternalServerError("Reading data file error");
                }
                try {
                    _this.users = csvjson.toObject(csvData, {
                        delimiter: ","
                    });
                }
                catch (e) {
                    throw new routing_controllers_1.InternalServerError("Reading users data error");
                }
                _this.allUsersAmount = _this.users.length;
                // pagination
                var startPosition = (page - 1) * limit;
                var endPosition = startPosition + limit;
                _this.users = _this.users
                    .slice(startPosition, endPosition)
                    .map(function (item) { return Object.assign(item, { id: +item.id }); }); // convert string ids to number
                _this.page = page;
                _this.limit = limit;
                resolve(_this.users);
            });
        });
    };
    UsersMdl.prototype.getOne = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!id) {
                            throw new routing_controllers_1.BadRequestError("Bad 'id' param");
                        }
                        if (!!this.users.length) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getAll(1, this.allUsersAmount)];
                    case 1:
                        _a.sent(); // this code only useful in this case, not for DB
                        _a.label = 2;
                    case 2:
                        user = lodash.find(this.users, { id: id });
                        if (!user) {
                            throw new routing_controllers_1.NotFoundError("User was not found");
                        }
                        return [2 /*return*/, Promise.resolve(user)];
                }
            });
        });
    };
    UsersMdl.prototype.save = function (id, user) {
        return __awaiter(this, void 0, void 0, function () {
            var index, csvData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        lodash.forEach({ id: id, user: user }, function (param, key) {
                            if (!param) {
                                throw new routing_controllers_1.BadRequestError("Bad '" + key + "' param");
                            }
                        });
                        return [4 /*yield*/, this.getAll(1, this.allUsersAmount)];
                    case 1:
                        _a.sent(); // this code only useful in this case, not for DB
                        index = lodash.findIndex(this.users, { id: id });
                        if (index === -1) {
                            throw new routing_controllers_1.NotFoundError("User was not found");
                        }
                        this.users[index] = user;
                        try {
                            csvData = csvjson.toCSV(this.users, {
                                headers: "relative"
                            });
                        }
                        catch (e) {
                            throw new routing_controllers_1.InternalServerError("Converting data to csv error");
                        }
                        return [2 /*return*/, new Promise(function (resolve) {
                                fs.writeFile(config_1.config.pathToCsv, csvData, function (err) {
                                    if (err) {
                                        throw new routing_controllers_1.InternalServerError("Writing data file error");
                                    }
                                    resolve(user);
                                });
                            })];
                }
            });
        });
    };
    return UsersMdl;
}());
exports.UsersMdl = UsersMdl;


/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("csvjson");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("reflect-metadata");

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ })
/******/ ]);