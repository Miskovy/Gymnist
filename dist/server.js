"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = __importDefault(require("./config/database"));
const app_1 = __importDefault(require("./app"));
// Load environment variables
dotenv_1.default.config();
const PORT = process.env.PORT || 3000;
// Test database connection
database_1.default.authenticate()
    .then(() => {
    console.log('Database connection established successfully.');
})
    .catch((err) => {
    console.error('Unable to connect to the database:', err);
});
database_1.default.sync({ alter: true });
// Start server
app_1.default.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
