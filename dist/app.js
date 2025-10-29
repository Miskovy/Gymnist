"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const errorMiddleware_1 = __importDefault(require("./middlewares/errorMiddleware"));
// Import routes
const routes_1 = __importDefault(require("./trainee/routes"));
const routes_2 = __importDefault(require("./trainer/routes"));
const routes_3 = __importDefault(require("./location/routes"));
const routes_4 = __importDefault(require("./package/routes"));
const routes_5 = __importDefault(require("./payment-method/routes"));
const routes_6 = __importDefault(require("./class/routes"));
const routes_7 = __importDefault(require("./subscription/routes"));
const routes_8 = __importDefault(require("./major/routes"));
const routes_9 = __importDefault(require("./room/routes"));
const routes_10 = __importDefault(require("./admin/routes"));
const routes_11 = __importDefault(require("./auth/routes"));
const routes_12 = __importDefault(require("./rent/routes"));
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
// Routes
app.use('/api/trainees', routes_1.default);
app.use('/api/trainers', routes_2.default);
app.use('/api/locations', routes_3.default);
app.use('/api/packages', routes_4.default);
app.use('/api/payment-methods', routes_5.default);
app.use('/api/classes', routes_6.default);
app.use('/api/subscriptions', routes_7.default);
app.use('/api/majors', routes_8.default);
app.use('/api/rooms', routes_9.default);
app.use('/api/admins', routes_10.default);
app.use('/api/auth', routes_11.default);
app.use('/api/rents', routes_12.default);
app.use(errorMiddleware_1.default);
exports.default = app;
