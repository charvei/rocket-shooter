"use strict";
exports.__esModule = true;
var Commands_1 = require("./Commands");
/**
 * Input handler
 */
var InputHandler = /** @class */ (function () {
    function InputHandler(characterManager) {
        var _this = this;
        this.keys = {}; // record of keyboard keys and their corresponding state of pressed down or up
        this.previousKeysState = {}; // 
        this.savePreviousKeyState = function () {
            _this.previousKeysState = _this.keys;
        };
        /**
         * Set up keydown listeners to detect when keys are pressed down and lifted up
         */
        // private setupKeyDownListeners = (): void => {
        //     window.onkeyup = (e: KeyboardEvent) => {
        //         this.keys[e.key] = false            
        //     }
        //     window.onkeydown = (e: KeyboardEvent): void => {
        //         this.keys[e.key] = true
        //     }
        // }
        /**
         * Set up keydown listeners to detect when keys are pressed down and lifted up
         */
        this.setupKeyDownListeners = function () {
            _this.keys["w"] = {
                heldDown: false,
                firstPress: false
            };
            window.onkeyup = function (e) {
                _this.keys[e.key] = {
                    heldDown: false,
                    firstPress: false
                };
            };
            window.onkeydown = function (e) {
                var firstPress = !_this.keys[e.key].heldDown;
                console.log("keys before stuff happens in onkeydown: " + _this.keys[e.key].heldDown);
                _this.keys[e.key] = {
                    heldDown: true,
                    firstPress: firstPress
                };
                console.log(_this.keys[e.key].firstPress);
            };
        };
        /**
         * Runs once a loop, detects user's raw input and handles it
         */
        this.handleInput = function (delta) {
            console.log("handle input w key: " + _this.keys["w"]);
            if (_this.getKeyPressState('w').firstPress) {
                _this.jump(delta);
            }
            if (_this.getKeyPressState('w').heldDown) {
                _this.jetPack(delta);
            }
            if (_this.getKeyPressState('a').heldDown) {
                _this.moveLeft(delta);
            }
            if (_this.getKeyPressState('s').heldDown) {
                _this.moveDown(delta);
            }
            if (_this.getKeyPressState('d').heldDown) {
                _this.moveRight(delta);
            }
        };
        /**
         * Check if given key is currently pressed down
         */
        this.getKeyPressState = function (key) {
            return _this.keys[key] ? _this.keys[key] : { firstPress: false, heldDown: false };
            //     let res = {
            //         heldDown: this.keys[key] ? true : false,
            //         firstPress: this.keys[key] && !this.previousKeysState[key] ? true : false
            //     }
            //     if (key == "w"){
            //     console.log("prevKeyPress: " + this.previousKeysState["w"] + " || thisKeyPress: " + this.keys["w"])
            // }
            //     return res
        };
        this.setupKeyDownListeners();
        this.characterManagerRef = characterManager;
        this.moveRight = Commands_1["default"].makeMoveUnitCommand(this.characterManagerRef.getCharacterByName("Adam"), "Right");
        this.moveLeft = Commands_1["default"].makeMoveUnitCommand(this.characterManagerRef.getCharacterByName("Adam"), "Left");
        this.jump = Commands_1["default"].makeJumpCommand(this.characterManagerRef.getCharacterByName("Adam"));
        this.jetPack = Commands_1["default"].makeJetPackCommand(this.characterManagerRef.getCharacterByName("Adam"));
        this.moveDown = Commands_1["default"].makeMoveUnitCommand(this.characterManagerRef.getCharacterByName("Adam"), "Down");
    }
    return InputHandler;
}());
exports["default"] = InputHandler;
