"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const crypto_1 = require("crypto");
const axios_1 = __importDefault(require("axios"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const posts = {};
// @method GET /posts
// @desc Get all posts
// @access public
app.get("/posts", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("GET /posts");
    res.status(200).json(posts);
}));
// @method POST /posts
// @desc Add a new post
// @access public
app.post("/posts", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("POST /posts");
    const id = (0, crypto_1.randomBytes)(4).toString("hex");
    const { title } = req.body;
    posts[id] = {
        id,
        title,
    };
    yield axios_1.default.post("http://localhost:4005/events", {
        type: "PostCreated",
        data: {
            id,
            title,
        },
    });
    res.status(201).json(posts[id]);
}));
// @method POST /events
// @desc Receive events
// @access public
app.post("/events", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("POST /events");
    console.log("Received event", req.body.type);
    res.status(200).json();
}));
const PORT = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 4000;
app.listen(PORT, () => {
    console.log(`Posts service is listening to port: ${PORT}`);
});
