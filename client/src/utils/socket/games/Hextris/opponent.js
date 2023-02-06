import $ from 'jquery'
import socket from '../../../socket/main.js'
import JSONfn from 'json-fn'

export default function start(index){
    var win
    var doc

    win = window.frames[index]
    doc = window.frames[index].document


    function fadeOutEffect(id, interval) {
        var fadeTarget = doc.getElementById(id);
        if (fadeTarget == null) return;
        var fadeEffect = setInterval(function () {
            if (!fadeTarget.style.opacity) {
                fadeTarget.style.opacity = 1;
            }
            if (parseFloat(fadeTarget.style.opacity) > 0) {
                var opacity = parseFloat(fadeTarget.style.opacity) - 0.1
                fadeTarget.style.opacity = opacity;
            } else {
                fadeTarget.style.opacity = 0;
                fadeTarget.style.display = 'none';          
                clearInterval(fadeEffect);
            }
        }, interval);
    }
    
    function fadeInEffect(id, interval) {
        var fadeTarget = doc.getElementById(id);
        if (fadeTarget == null) return;
        fadeTarget.style.display = 'block';
        fadeTarget.style.opacity = 0;
        var fadeEffect2 = setInterval(function () {
            if (parseFloat(fadeTarget.style.opacity) < 1.0) {
                var opacity = parseFloat(fadeTarget.style.opacity) + 0.1
                fadeTarget.style.opacity = opacity;
            } else {
                clearInterval(fadeEffect2);
            }
        }, interval);
    }

    function fadeToggleEffect(id, interval) {
        var fadeTarget = doc.getElementById(id);
        if (fadeTarget == null) return;
        if (fadeTarget.style.opacity == 0) {
            fadeInEffect(id, interval);
        }
        else {
            fadeOutEffect(id, interval)
        }
    }

    const show = function(id){
        if (doc.getElementById(id)){
            doc.getElementById(id).style.display = 'block';
        }
    }
      
    const hide = function(id){
        if (doc.getElementById(id)){
            doc.getElementById(id).style.display = 'none';
        }
    }
      
    const toggle = function(id){
        var ele = doc.getElementById(id);
        if (ele.style.display == 'none'){
          ele.show(id);
        } else {
          ele.hide(id);
        }
    }

    const visible = function(id){
        if (doc.getElementById(id) == null) return;
        return doc.getElementById(id).offsetParent === null
    }    



    var highscores;
    var canvas;
    var trueCanvas;
    var ctx;
    var gameState;
    var framerate;
    var settings;
    var rush;
    var lastTime;
    var iframHasLoaded;
    var colors;
    var hexColorsToTintedColors;
    var rgbToHex;
    var rgbColorsToTintedColors;   
    var hexagonBackgroundColor;
    var hexagonBackgroundColorClear;
    var centerBlue;
    var angularVelocityConst;
    var scoreOpacity;
    var textOpacity;
    var prevGameState;
    var op;
    var textShown;
    var saveState;
    var canvas;
    var trueCanvas;
    var framerate;
    var history;
    var score;
    var scoreAdditionCoeff;
    var prevScore;
    var numHighScores;
    var blocks;
    var MainHex;
    var gdx;
    var gdy;
    var devMode;
    var lastGen;
    var prevTimeScored;
    var nextGen;
    var spawnLane;
    var importing;
    var importedHistory;
    var startTime;
    var gameState;
    var canRestart;
    var infobuttonfading;
    var comboTime;
    var waveone;
    var blockHist;
    var requestAnimFrame;
    var input_text;
    var readyState = false;
    var action_text;
    var score_text;

    function initialize(a) {
        rush = 1;
        lastTime = Date.now();
        iframHasLoaded = false;
        colors = ["#e74c3c", "#f1c40f", "#3498db", "#2ecc71"];
        hexColorsToTintedColors = {
            "#e74c3c": "rgb(241,163,155)",
            "#f1c40f": "rgb(246,223,133)",
            "#3498db": "rgb(151,201,235)",
            "#2ecc71": "rgb(150,227,183)"
        };
    
        rgbToHex = {
            "rgb(231,76,60)": "#e74c3c",
            "rgb(241,196,15)": "#f1c40f",
            "rgb(52,152,219)": "#3498db",
            "rgb(46,204,113)": "#2ecc71"
        };
    
        rgbColorsToTintedColors = {
            "rgb(231,76,60)": "rgb(241,163,155)",
            "rgb(241,196,15)": "rgb(246,223,133)",
            "rgb(52,152,219)": "rgb(151,201,235)",
            "rgb(46,204,113)": "rgb(150,227,183)"
        };
    
        hexagonBackgroundColor = 'rgb(236, 240, 241)';
        hexagonBackgroundColorClear = 'rgba(236, 240, 241, 0.5)';
        centerBlue = 'rgb(44,62,80)';
        angularVelocityConst = 4;
        scoreOpacity = 0;
        textOpacity = 0;
        prevGameState = undefined;
        op = 0;
        saveState = "{}";
        if (saveState !== "{}") {
            op = 1;
        }
    
        textShown = false;
        requestAnimFrame = (function() {
            return win.requestAnimationFrame || win.webkitRequestAnimationFrame || win.mozRequestAnimationFrame || function(callback) {
                win.setTimeout(callback, 1000 / framerate);
            };
        })();
        // doc.querySelector('#clickToExit').addEventListener('click', toggleDevTools);
        if (/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            //doc.querySelector('.rrssb-email').remove();
            settings = {
                os: "other",
                platform: "mobile",
                startDist: 227,
                creationDt: 60,
                baseScale: 1.4,
                scale: 1,
                prevScale: 1,
                baseHexWidth: 87,
                hexWidth: 87,
                baseBlockHeight: 20,
                blockHeight: 20,
                rows: 8,
                speedModifier: 0.73,
                speedUpKeyHeld: false,
                creationSpeedModifier: 0.73,
                comboTime: 310
            };
        } else {
            settings = {
                os: "other",
                platform: "nonmobile",
                baseScale: 1,
                startDist: 340,
                creationDt: 9,
                scale: 1,
                prevScale: 1,
                hexWidth: 65,
                baseHexWidth: 87,
                baseBlockHeight: 20,
                blockHeight: 15,
                rows: 8,
                speedModifier: 0.65,
                speedUpKeyHeld: false,
                creationSpeedModifier: 0.65,
                comboTime: 310
            };
    
        }
        if(/Android/i.test(navigator.userAgent)) {
            settings.os = "android";
        }
    
        if(navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i)){
            settings.os="ios";
        }
    
        canvas = doc.getElementById('canvas');
        ctx = canvas.getContext('2d');
        

        trueCanvas = {
            width: canvas.width,
            height: canvas.height
        };
        scaleCanvas();
    
        framerate = 60;
        history = {};
        score = 0;
        scoreAdditionCoeff = 1;
        prevScore = 0;
        numHighScores = 3;
    
        highscores = [];
        blocks = [];
        gdx = 0;
        gdy = 0;
        devMode = 0;
        lastGen = undefined;
        prevTimeScored = undefined;
        nextGen = undefined;
        spawnLane = 0;
        importing = 0;
        importedHistory = undefined;
        startTime = undefined;
        setStartScreen();
        if (a != 1) {
            canRestart = 1;
            win.onblur = function(e) {
                if (gameState == 1) {
                    pause();
                }
            };
            //doc.querySelector('#startBtn').removeEventListener('touchstart', startBtnHandler);
            //doc.querySelector('#startBtn').removeEventListener('mousedown', startBtnHandler);
            if (settings.platform == 'mobile') {
                //doc.querySelector('#startBtn').addEventListener('touchstart', startBtnHandler);
            } else {
                //doc.querySelector('#startBtn').addEventListener('mousedown', startBtnHandler);
            }
    
            // doc.addEventListener('touchmove', function(e) {
            //     e.preventDefault();
            // }, false);
            win.onresize = scaleCanvas;
            win.onunload = (function() {
    
                // if (gameState == 1 || gameState == -1 || gameState === 0) localStorage.setItem("saveState", exportSaveState());
                // else localStorage.setItem("saveState", "{}");
            });
    
            // addKeyListeners();
            
            // doc.addEventListener("pause", handlePause, false);
            // doc.addEventListener("backbutton", handlePause, false);
            // doc.addEventListener("menubutton", handlePause, false); //menu button on android
    
            // setTimeout(function() {
            //     if (settings.platform == "mobile") {
            //         try {
            //             doc.body.removeEventListener('touchstart', handleTapBefore, false);
            //         } catch (e) {
    
            //         }
    
            //         try {
            //             doc.body.removeEventListener('touchstart', handleTap, false);
            //         } catch (e) {
    
            //         }
    
            //         doc.body.addEventListener('touchstart', handleTapBefore, false);
            //     } else {
            //         try {
            //             doc.body.removeEventListener('mousedown', handleClickBefore, false);
            //         } catch (e) {
    
            //         }
    
            //         try {
            //             doc.body.removeEventListener('mousedown', handleClick, false);
            //         } catch (e) {
    
            //         }
    
            //         doc.body.addEventListener('mousedown', handleClickBefore, false);
            //     }
            // }, 1);
        }
    }
    
     function startBtnHandler() {
        // setTimeout(function() {
        //     if (settings.platform == "mobile") {
        //         try {
        //             doc.body.removeEventListener('touchstart', handleTapBefore, false);
        //         } catch (e) {
    
        //         }
    
        //         try {
        //             doc.body.removeEventListener('touchstart', handleTap, false);
        //         } catch (e) {
    
        //         }
    
        //         doc.body.addEventListener('touchstart', handleTap, false);
        //     } else {
        //         try {
        //             doc.body.removeEventListener('mousedown', handleClickBefore, false);
        //         } catch (e) {
    
        //         }
    
        //         try {
        //             doc.body.removeEventListener('mousedown', handleClick, false);
        //         } catch (e) {
    
        //        }
    
        //         doc.body.addEventListener('mousedown', handleClick, false);
        //     }
        // }, 5);
    
        if (!canRestart) return false;
    
        if (visible('openSideBar')) {
            fadeOutEffect('openSideBar', 30);
        }
    
        if (importing == 1) {
            init(1);
            checkVisualElements(0);
        } else {
            init(1);
            checkVisualElements(0);
        }
    }
    
    // function handlePause() {
    //     if (gameState == 1 || gameState == 2) {
    //         pause();
    //     }
    // }
    
    // function handleTap(e) {
    //     handleClickTap(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
    // }
    
    // function handleClick(e) {
    //     handleClickTap(e.clientX, e.clientY);
    // }
    
    // function handleTapBefore(e) {
    //     var x = e.changedTouches[0].clientX;
    //     var y = e.changedTouches[0].clientY;
    
    //     if (x < 120 && y < 83 && visible('helpText')) {
    //         showHelp();
    //         return;
    //     }
    // }
    
    // function handleClickBefore(e) {
    //     var x = e.clientX;
    //     var y = e.clientY;
    
    //     if (x < 120 && y < 83 && visible('helpText')) {
    //         showHelp();
    //         return;
    //     }
    // }
    
    function blockDestroyed() {
        if (waveone.nextGen > 1350) {
            waveone.nextGen -= 30 * settings.creationSpeedModifier;
        } else if (waveone.nextGen > 600) {
            waveone.nextGen -= 8 * settings.creationSpeedModifier;
        } else {
            waveone.nextGen = 600;
        }
    
        if (waveone.difficulty < 35) {
            waveone.difficulty += 0.085 * settings.speedModifier;
        } else {
            waveone.difficulty = 35;
        }
    }
    
    function waveGen(hex) {
        this.lastGen = 0;
        this.last = 0;
        this.nextGen = 2700;
        this.start = 0;
        this.colors = colors;
        this.ct = 0;
        this.hex = hex;
        this.difficulty = 1;
        this.dt = 0;
        this.update = function() {
            this.currentFunction();
            this.dt = (settings.platform == 'mobile' ? 14 : 16.6667) * MainHex.ct;
            this.computeDifficulty();
            if ((this.dt - this.lastGen) * settings.creationSpeedModifier > this.nextGen) {
                if (this.nextGen > 600) {
                    this.nextGen -= 11 * ((this.nextGen / 1300)) * settings.creationSpeedModifier;
                }
            }
        };
    
        this.randomGeneration = function() {
            if (this.dt - this.lastGen > this.nextGen) {
                this.ct++;
                this.lastGen = this.dt;
                var fv = randInt(0, MainHex.sides);
                addNewBlock(fv, colors[randInt(0, colors.length)], 1.6 + (this.difficulty / 15) * 3);
                var lim = 5;
                if (this.ct > lim) {
                    var nextPattern = randInt(0, 3 + 21);
                    if (nextPattern > 15) {
                        this.ct = 0;
                        this.currentFunction = this.doubleGeneration;
                    } else if (nextPattern > 10) {
                        this.ct = 0;
                        this.currentFunction = this.crosswiseGeneration;
                    } else if (nextPattern > 7) {
                        this.ct = 0;
                        this.currentFunction = this.spiralGeneration;
                    } else if (nextPattern > 4) {
                        this.ct = 0;
                        this.currentFunction = this.circleGeneration;
                    } else if (nextPattern > 1) {
                        this.ct = 0;
                        this.currentFunction = this.halfCircleGeneration;
                    }
                }
            }
        };
    
        this.computeDifficulty = function() {
            if (this.difficulty < 35) {
                var increment;
                if (this.difficulty < 8) {
                     increment = (this.dt - this.last) / (5166667) * settings.speedModifier;
                } else if (this.difficulty < 15) {
                    increment = (this.dt - this.last) / (72333333) * settings.speedModifier;
                } else {
                    increment = (this.dt - this.last) / (90000000) * settings.speedModifier;
                }
    
                this.difficulty += increment * (1/2);
            }
        };
    
        this.circleGeneration = function() {
            if (this.dt - this.lastGen > this.nextGen + 500) {
                var numColors = randInt(1, 4);
                if (numColors == 3) {
                    numColors = randInt(1, 4);
                }
    
                var colorList = [];
                nextLoop: for (var i = 0; i < numColors; i++) {
                    var q = randInt(0, colors.length);
                    for (var j in colorList) {
                        if (colorList[j] == colors[q]) {
                            i--;
                            continue nextLoop;
                        }
                    }
                    colorList.push(colors[q]);
                }
    
                for (var i = 0; i < MainHex.sides; i++) {
                    addNewBlock(i, colorList[i % numColors], 1.5 + (this.difficulty / 15) * 3);
                }
    
                this.ct += 15;
                this.lastGen = this.dt;
                this.shouldChangePattern(1);
            }
        };
    
        this.halfCircleGeneration = function() {
            if (this.dt - this.lastGen > (this.nextGen + 500) / 2) {
                var numColors = randInt(1, 3);
                var c = colors[randInt(0, colors.length)];
                var colorList = [c, c, c];
                if (numColors == 2) {
                    colorList = [c, colors[randInt(0, colors.length)], c];
                }
    
                var d = randInt(0, 6);
                for (var i = 0; i < 3; i++) {
                    addNewBlock((d + i) % 6, colorList[i], 1.5 + (this.difficulty / 15) * 3);
                }
    
                this.ct += 8;
                this.lastGen = this.dt;
                this.shouldChangePattern();
            }
        };
    
        this.crosswiseGeneration = function() {
            if (this.dt - this.lastGen > this.nextGen) {
                var ri = randInt(0, colors.length);
                var i = randInt(0, colors.length);
                addNewBlock(i, colors[ri], 0.6 + (this.difficulty / 15) * 3);
                addNewBlock((i + 3) % MainHex.sides, colors[ri], 0.6 + (this.difficulty / 15) * 3);
                this.ct += 1.5;
                this.lastGen = this.dt;
                this.shouldChangePattern();
            }
        };
    
        this.spiralGeneration = function() {
            var dir = randInt(0, 2);
            if (this.dt - this.lastGen > this.nextGen * (2 / 3)) {
                if (dir) {
                    addNewBlock(5 - (this.ct % MainHex.sides), colors[randInt(0, colors.length)], 1.5 + (this.difficulty / 15) * (3 / 2));
                } else {
                    addNewBlock(this.ct % MainHex.sides, colors[randInt(0, colors.length)], 1.5 + (this.difficulty / 15) * (3 / 2));
                }
                this.ct += 1;
                this.lastGen = this.dt;
                this.shouldChangePattern();
            }
        };
    
        this.doubleGeneration = function() {
            if (this.dt - this.lastGen > this.nextGen) {
                var i = randInt(0, colors.length);
                addNewBlock(i, colors[randInt(0, colors.length)], 1.5 + (this.difficulty / 15) * 3);
                addNewBlock((i + 1) % MainHex.sides, colors[randInt(0, colors.length)], 1.5 + (this.difficulty / 15) * 3);
                this.ct += 2;
                this.lastGen = this.dt;
                this.shouldChangePattern();
            }
        };
    
        this.setRandom = function() {
            this.ct = 0;
            this.currentFunction = this.randomGeneration;
        };
    
        this.shouldChangePattern = function(x) {
            if (x) {
                var q = randInt(0, 4);
                this.ct = 0;
                switch (q) {
                    case 0:
                        this.currentFunction = this.doubleGeneration;
                        break;
                    case 1:
                        this.currentFunction = this.spiralGeneration;
                        break;
                    case 2:
                        this.currentFunction = this.crosswiseGeneration;
                        break;
                }
            } else if (this.ct > 8) {
                if (randInt(0, 2) === 0) {
                    this.setRandom();
                    return 1;
                }
            }
    
            return 0;
        };
    
        // rest of generation functions
    
        this.currentFunction = this.randomGeneration;
    }

    function Block(fallingLane, color, iter, distFromHex, settled) {
        // whether or not a block is rested on the center hex or another block
        this.settled = (settled === undefined) ? 0 : 1;
        this.height = settings.blockHeight;
        //the lane which the block was shot from
        this.fallingLane = fallingLane;
    
            this.checked=0;
        //the angle at which the block falls
        this.angle = 90 - (30 + 60 * fallingLane);
        //for calculating the rotation of blocks attached to the center hex
        this.angularVelocity = 0;
        this.targetAngle = this.angle;
        this.color = color;
        //blocks that are slated to be deleted after a valid score has happened
        this.deleted = 0;
        //blocks slated to be removed from falling and added to the hex
        this.removed = 0;
        //value for the opacity of the white blcok drawn over falling block to give it the glow as it attaches to the hex
        this.tint = 0;
        //value used for deletion animation
        this.opacity = 1;
        //boolean for when the block is expanding
        this.initializing = 1;
        this.ict = MainHex.ct;
        //speed of block
        this.iter = iter;
        //number of iterations before starting to drop
        this.initLen = settings.creationDt;
        //side which block is attached too
        this.attachedLane = 0;
        //distance from center hex
        this.distFromHex = distFromHex || settings.startDist * settings.scale ;
    
        this.incrementOpacity = function() {
            if (this.deleted) {
                //add shakes
                if (this.opacity >= 0.925) {
                    var tLane = this.attachedLane - MainHex.position;
                    tLane = MainHex.sides - tLane;
                    while (tLane < 0) {
                        tLane += MainHex.sides;
                    }
    
                    tLane %= MainHex.sides;
                    MainHex.shakes.push({lane:tLane, magnitude:3 * (win.devicePixelRatio ? win.devicePixelRatio : 1) * (settings.scale)});
                }
                //fade out the opacity
                this.opacity = this.opacity - 0.075 * MainHex.dt;
                if (this.opacity <= 0) {
                    //slate for final deletion
                    this.opacity = 0;
                    this.deleted = 2;
                    if (gameState == 1 || gameState==0) {
                        // localStorage.setItem("saveState", exportSaveState());
                    }
                }
            }
        };
    
        this.getIndex = function (){
            //get the index of the block in its stack
            var parentArr = MainHex.blocks[this.attachedLane];
            for (var i = 0; i < parentArr.length; i++) {
                if (parentArr[i] == this) {
                    return i;
                }
            }
        };
    
        this.draw = function(attached, index) {
            this.height = settings.blockHeight;
            if (Math.abs(settings.scale - settings.prevScale) > 0.000000001) {
                this.distFromHex *= (settings.scale/settings.prevScale);
            }
    
            this.incrementOpacity();
            if(attached === undefined)
                attached = false;
    
            if(this.angle > this.targetAngle) {
                this.angularVelocity -= angularVelocityConst * MainHex.dt;
            }
            else if(this.angle < this.targetAngle) {
                this.angularVelocity += angularVelocityConst * MainHex.dt;
            }
    
            if (Math.abs(this.angle - this.targetAngle + this.angularVelocity) <= Math.abs(this.angularVelocity)) { //do better soon
                this.angle = this.targetAngle;
                this.angularVelocity = 0;
            }
            else {
                this.angle += this.angularVelocity;
            }
            
            this.width = 2 * this.distFromHex / Math.sqrt(3);
            this.widthWide = 2 * (this.distFromHex + this.height) / Math.sqrt(3);
            //this.widthWide = this.width + this.height + 3;
            var p1;
            var p2;
            var p3;
            var p4;
            if (this.initializing) {
                var rat = ((MainHex.ct - this.ict)/this.initLen);
                if (rat > 1) {
                    rat = 1;
                }
                p1 = rotatePoint((-this.width / 2) * rat, this.height / 2, this.angle);
                p2 = rotatePoint((this.width / 2) * rat, this.height / 2, this.angle);
                p3 = rotatePoint((this.widthWide / 2) * rat, -this.height / 2, this.angle);
                p4 = rotatePoint((-this.widthWide / 2) * rat, -this.height / 2, this.angle);
                if ((MainHex.ct - this.ict) >= this.initLen) {
                    this.initializing = 0;
                }
            } else {
                p1 = rotatePoint(-this.width / 2, this.height / 2, this.angle);
                p2 = rotatePoint(this.width / 2, this.height / 2, this.angle);
                p3 = rotatePoint(this.widthWide / 2, -this.height / 2, this.angle);
                p4 = rotatePoint(-this.widthWide / 2, -this.height / 2, this.angle);
            }
    
            if (this.deleted) {
                ctx.fillStyle = "#FFF";
            } else if (gameState === 0) {
                if (this.color.charAt(0) == 'r') {
                    ctx.fillStyle = rgbColorsToTintedColors[this.color];
                }
                else {
                    ctx.fillStyle = hexColorsToTintedColors[this.color];
                }
            }
            else {
                ctx.fillStyle = this.color;
            }
    
            ctx.globalAlpha = this.opacity;
            var baseX = trueCanvas.width / 2 + Math.sin((this.angle) * (Math.PI / 180)) * (this.distFromHex + this.height / 2) + gdx;
            var baseY = trueCanvas.height / 2 - Math.cos((this.angle) * (Math.PI / 180)) * (this.distFromHex + this.height / 2) + gdy;
            ctx.beginPath();
            ctx.moveTo(baseX + p1.x, baseY + p1.y);
            ctx.lineTo(baseX + p2.x, baseY + p2.y);
            ctx.lineTo(baseX + p3.x, baseY + p3.y);
            ctx.lineTo(baseX + p4.x, baseY + p4.y);
            ctx.lineTo(baseX + p1.x, baseY + p1.y);
            ctx.closePath();
            ctx.fill();
    
            if (this.tint) {
                if (this.opacity < 1) {
                    if (gameState == 1 || gameState==0) {
                        // localStorage.setItem("saveState", exportSaveState());
                    }
    
                    this.iter = 2.25;
                    this.tint = 0;
                }
    
                ctx.fillStyle = "#FFF";
                ctx.globalAlpha = this.tint;
                ctx.beginPath();
                ctx.moveTo(baseX + p1.x, baseY + p1.y);
                ctx.lineTo(baseX + p2.x, baseY + p2.y);
                ctx.lineTo(baseX + p3.x, baseY + p3.y);
                ctx.lineTo(baseX + p4.x, baseY + p4.y);
                ctx.lineTo(baseX + p1.x, baseY + p1.y);
                ctx.closePath();
                ctx.fill();
                this.tint -= 0.02 * MainHex.dt;
                if (this.tint < 0) {
                    this.tint = 0;
                }
            }
    
            ctx.globalAlpha = 1;
        };
    }
    
    function findCenterOfBlocks(arr) {
        var avgDFH = 0;
        var avgAngle = 0;
        for (var i = 0; i < arr.length; i++) {
            avgDFH += arr[i].distFromHex;
            var ang = arr[i].angle;
            while (ang < 0) {
                ang += 360;
            }
            
            avgAngle += ang % 360;
        }
    
        avgDFH /= arr.length;
        avgAngle /= arr.length;
    
        return {
            x:trueCanvas.width/2 + Math.cos(avgAngle * (Math.PI / 180)) * avgDFH,
            y:trueCanvas.height/2 + Math.sin(avgAngle * (Math.PI / 180)) * avgDFH
        };
    }

    function scaleCanvas() {
        canvas.width = win.innerWidth;
        canvas.height = win.innerHeight;
    
        if (canvas.height > canvas.width) {
            settings.scale = (canvas.width / 800) * settings.baseScale;
        } else {
            settings.scale = (canvas.height / 800) * settings.baseScale;
        }
    
        trueCanvas = {
            width: canvas.width,
            height: canvas.height
        };
    
        if (win.devicePixelRatio) {
            var cw = doc.querySelector("#canvas").clientWidth;
            var ch = doc.querySelector("#canvas").clientHeight;
        
            doc.getElementById('canvas').setAttribute('height', ch * win.devicePixelRatio);
            doc.getElementById('canvas').setAttribute('width', cw * win.devicePixelRatio);
            doc.getElementById('canvas').style.width = cw;
            doc.getElementById('canvas').style.height = ch;
    
            trueCanvas = {
                width: cw,
                height: ch
            };
    
            ctx.scale(win.devicePixelRatio, win.devicePixelRatio);
        }
        setBottomContainer();
        set_score_pos();
    }
    
    function setBottomContainer() {
        // var buttonOffset = $("#buttonCont").offset().top;
        var buttonOffset = doc.getElementById("buttonCont").offsetTop;
        var playOffset = trueCanvas.height / 2 + 100 * settings.scale;
        var delta = buttonOffset - playOffset - 29;
        if (delta < 0) {
            doc.getElementById("bottomContainer").style.marginBottom = "-" + Math.abs(delta) + "px";
        }
    }

    function set_score_pos() {
        doc.getElementById('container').style.marginTop = '45px';
        // var middle_of_container = ($("#container").height()/2 + $("#container").offset().top);
        // var middle_of_container = (doc.getElementById("container").offsetHeight/2 + doc.getElementById("container").offsetTop);
        // var top_of_bottom_container = $("#buttonCont").offset().top
        // var top_of_bottom_container = doc.getElementById("buttonCont").offsetTop
        // var igt = doc.querySelector("#highScoreInGameText")
        //var igt_bottom = igt.offsetTop + igt.offsetHeight
        //var target_midpoint = (top_of_bottom_container + igt_bottom)/2
        //var diff = (target_midpoint - middle_of_container + 80)
        
        // doc.getElementById("container").style.offsetTop = diff + 'px';
    }
    
    // function toggleDevTools() {
    //     toggle('devtools');
    // }
    
    function resumeGame() {
        gameState = 1;
        hideUIElements();
        //show('pauseBtn');
        //hide('restartBtn');
        importing = 0;
        startTime = Date.now();
        setTimeout(function() {
            if ((gameState == 1 || gameState == 2) && ! visible('helpScreen')) {
                fadeOutEffect('openSideBar', 30);
            }
        }, 7000);
    
        checkVisualElements(0);
    }
    
    function checkVisualElements(arg) {
        // if (arg && visible('helpScreen'))  fadeOutEffect('openSideBar', 30);
        // if (!visible('pauseBtn')) fadeInEffect('pauseBtn', 30);
        // fadeOutEffect('fork-ribbon', 30);
        // if (!visible('restartBtn'))  fadeOutEffect('restartBtn', 30);
        // if (visible('buttonCont'))  fadeOutEffect('buttonCont', 30);
    }
    
    function hideUIElements() {
        // hide('pauseBtn');
        // hide('restartBtn');
        hide('startBtn');
    }
    
    function init(b) {
        if(settings.ending_block && b == 1){return;}
        if (b) {
            //doc.querySelector("#pauseBtn").setAttribute('src',"/assets/Hextris/images/btn_pause.svg");
            if (visible('helpScreen')) {
                // fadeOutEffect('helpScreen', 30);
            }
    
            setTimeout(function() {
                if (gameState == 1) {
                    // fadeOutEffect('openSideBar', 30);
                }
                infobuttonfading = false;
            }, 7000);
            clearSaveState();
            checkVisualElements(1);
        }
        if (highscores.length === 0 ){
            // doc.querySelector("#currentHighScore").innerHTML = '0';
        }
        else {
            // doc.querySelector("#currentHighScore").innerHTML = highscores[0].toString()
        }
        infobuttonfading = true;
        //doc.querySelector("#pauseBtn").setAttribute('src',"/assets/Hextris/images/btn_pause.svg");
        hideUIElements();
        var saveState = "{}";
        saveState = JSONfn.parse(saveState);
        if(doc.getElementById("canvas")){
            doc.getElementById("canvas").className = "";
        }
        
        history = {};
        importedHistory = undefined;
        importing = 0;
        score = saveState.score || 0;
        prevScore = 0;
        spawnLane = 0;
        op = 0;
        scoreOpacity = 0;
        gameState = 1;
        // hide("restartBtn");
        // show("pauseBtn");
        if (saveState.hex !== undefined) gameState = 1;
    
        settings.blockHeight = settings.baseBlockHeight * settings.scale;
        settings.hexWidth = settings.baseHexWidth * settings.scale;
        MainHex = saveState.hex || new Hex(settings.hexWidth);
        if (saveState.hex) {
            MainHex.playThrough += 1;
        }
        MainHex.sideLength = settings.hexWidth;
    
        var i;
        var block;
        if (saveState.blocks) {
            saveState.blocks.map(function(o) {
                if (rgbToHex[o.color]) {
                    o.color = rgbToHex[o.color];
                }
            });
    
            for (i = 0; i < saveState.blocks.length; i++) {
                block = saveState.blocks[i];
                blocks.push(block);
            }
        } else {
            blocks = [];
        }
    
        gdx = saveState.gdx || 0;
        gdy = saveState.gdy || 0;
        comboTime = saveState.comboTime || 0;
    
        for (i = 0; i < MainHex.blocks.length; i++) {
            for (var j = 0; j < MainHex.blocks[i].length; j++) {
                MainHex.blocks[i][j].height = settings.blockHeight;
                MainHex.blocks[i][j].settled = 0;
            }
        }
    
        MainHex.blocks.map(function(i) {
            i.map(function(o) {
                if (rgbToHex[o.color]) {
                    o.color = rgbToHex[o.color];
                }
            });
        });
    
        MainHex.y = -100;
    
        startTime = Date.now();
        waveone = saveState.wavegen || new waveGen(MainHex);
    
        MainHex.texts = []; //clear texts
        MainHex.delay = 15;
        hideText();
    }
    
    function addNewBlock(){
        return;
    }

    function addNewBlock2(blocklane, color, iter, distFromHex, settled) { //last two are optional parameters
        iter *= settings.speedModifier;
        if (!history[MainHex.ct]) {
            history[MainHex.ct] = {};
        }
    
        history[MainHex.ct].block = {
            blocklane: blocklane,
            color: color,
            iter: iter
        };
    
        if (distFromHex) {
            history[MainHex.ct].distFromHex = distFromHex;
        }
        if (settled) {
            blockHist[MainHex.ct].settled = settled;
        }
        blocks.push(new Block(blocklane, color, iter, distFromHex, settled));
    }
    
    // function exportHistory() {
    //     doc.querySelector('#devtoolsText').innerHTML = (JSON.stringify(history));
    //     toggleDevTools();
    // }
    
    function setStartScreen() {
        show('startBtn');
        init();
        if (isStateSaved()) {
            importing = 0;
        } else {
            importing = 1;
        }
    
        //hide('pauseBtn');
        //hide('restartBtn');
        show('startBtn');
    
        gameState = 0;
        requestAnimFrame(animLoop);
    }
    
    var spd = 1;
    
    function animLoop() {
        switch (gameState) {
        case 1:
            requestAnimFrame(animLoop);
            render();
            var now = Date.now();
            var dt = (now - lastTime)/16.666 * rush;
            if (spd > 1) {
                dt *= spd;
            }
    
            if(gameState == 1 ){
                if(!MainHex.delay) {
                    update(dt);
                }
                else{
                    MainHex.delay--;
                }
            }
    
            lastTime = now;
    
            if (checkGameOver() && !importing) {
                var saveState = "{}";
                saveState = JSONfn.parse(saveState);
                gameState = 2;
    
                setTimeout(function() {
                    enableRestart();
                }, 30);
    
                if (visible('helpScreen')) {
                    fadeOutEffect('helpScreen', 30);
                }
    
                //if (visible('pauseBtn')) fadeOutEffect('pauseBtn', 30);
                //if (visible('restartBtn')) fadeOutEffect('restartBtn', 30);
                //if (visible('openSideBar')) fadeOutEffect('openSideBar', 30);
    
                canRestart = 0;
                clearSaveState();
            }
            break;
    
        case 0:
            requestAnimFrame(animLoop);
            render();
            break;
    
        case -1:
            requestAnimFrame(animLoop);
            render();
            break;
    
        case 2:
            var now = Date.now();
            var dt = (now - lastTime)/16.666 * rush;
            requestAnimFrame(animLoop);
            update(dt);
            render();
            lastTime = now;
            break;
    
        case 3:
            requestAnimFrame(animLoop);
           
            render();
            break;
    
        case 4:
            setTimeout(function() {
                initialize(1);
            }, 1);
            render();
            return;
    
        default:
            initialize();
            setStartScreen();
            break;
        }
    
        if (!(gameState == 1 || gameState == 2)) {
            lastTime = Date.now();
        }
    }
    
    function enableRestart() {
        canRestart = 1;
    }
    
    function isInfringing(hex) {
        for (var i = 0; i < hex.sides; i++) {
            var subTotal = 0;
            for (var j = 0; j < hex.blocks[i].length; j++) {
                subTotal += hex.blocks[i][j].deleted;
            }
    
            if (hex.blocks[i].length - subTotal > settings.rows) {
                return true;
            }
        }
        return false;
    }
    
    function checkGameOver() {
        for (var i = 0; i < MainHex.sides; i++) {
            if (isInfringing(MainHex)) {
                //$.get('http://54.183.184.126/' + String(score))
                if (highscores.indexOf(score) == -1) {
                    highscores.push(score);
                }
                writeHighScores();
                gameOverDisplay();
                return true;
            }
        }
        return false;
    }
    
    function showHelp() {
        return;
    }
    
        
    function Hex(sideLength) {
        this.playThrough = 0;
        this.fillColor = [44,62,80];
        this.tempColor = [44,62,80];
        this.angularVelocity = 0;
        this.position = 0;
        this.dy = 0;
        this.dt = 1;
        this.sides = 6;
        this.blocks = [];
        this.angle = 180 / this.sides;
        this.targetAngle = this.angle;
        this.shakes = [];
        this.sideLength = sideLength;
        this.strokeColor = 'blue';
        this.x = trueCanvas.width / 2;
        this.y = trueCanvas.height / 2;
        this.ct = 0;
        this.lastCombo = this.ct - settings.comboTime;
        this.lastColorScored = "#000";
        this.comboTime = 1;
        this.texts = [];
        this.blockArr = [];
        this.count = 0;
        this.pendingSteps = 0;
        //this.count = 0;
            this.lastRotate = Date.now();
        for (var i = 0; i < this.sides; i++) {
            this.blocks.push([]);
        }
    
        this.shake = function(obj) { //lane as in particle lane
            var angle = 30 + obj.lane * 60;
            angle *= Math.PI / 180;
            var dx = Math.cos(angle) * obj.magnitude;
            var dy = Math.sin(angle) * obj.magnitude;
            gdx -= dx;
            gdy += dy;
            obj.magnitude /= 2 * this.dt;
            if (obj.magnitude < 1) {
                for (var i = 0; i < this.shakes.length; i++) {
                    if (this.shakes[i] == obj) {
                        this.shakes.splice(i, 1);
                    }
                }
            }
        };
    
        this.addBlock = function(block) {
            if (!(gameState == 1 || gameState === 0)) return;
            block.settled = 1;
            //block.tint = 0.6;
            //var lane = this.sides - block.fallingLane;// -this.position;
            this.shakes.push({lane:block.fallingLane, magnitude:4.5 * (win.devicePixelRatio ? win.devicePixelRatio : 1) * (settings.scale)});
            //lane += this.position;
            //lane = (lane + this.sides) % this.sides;
            //block.distFromHex = MainHex.sideLength / 2 * Math.sqrt(3) + block.height * this.blocks[lane].length;
            //this.blocks[lane].push(block);
            //block.attachedLane = lane;
            block.checked = 1;

            //var steps = (-(this.blockArr[0].hexAngle - this.targetAngle)/60)%6
            //this.rotate(steps)
            this.count = 0
            
            if (this.blockArr.length) {
                this.blocks = [];
                for (var i = 0; i < this.sides; i++) {
                    this.blocks.push([]);
                }
                this.blockArr.forEach((ele) => {
                    var blk = new Block(ele.fallingLane, ele.color, ele.iter, ele.dist, 1)
                    blk.initializing = 0
                    blk.initLen = block.width
                    
                    blk.distFromHex = MainHex.sideLength / 2 * Math.sqrt(3) + blk.height * this.blocks[ele.lane].length
                    blk.attachedLane = ele.lane
                    blk.targetAngle = ele.targetAngle
                    blk.angle = ele.angle
                    this.blocks[ele.lane].push(blk)
                    blk.checked = 1
                    this.count++;
                })
            }

            this.rotate(this.pendingSteps%6)

            //this.rotate(-steps)
        };

        this.checkBlocks = function(blocks) {
            this.blockArr = [...blocks]
        };
    
        this.doesBlockCollide = function(block, position, tArr) {
            if (block.settled) {
                return;
            }
    
            if (position !== undefined) {
                arr = tArr;
                if (position <= 0) {
                    if (block.distFromHex - block.iter * this.dt * settings.scale - (this.sideLength / 2) * Math.sqrt(3) <= 0) {
                        block.distFromHex = (this.sideLength / 2) * Math.sqrt(3);
                        block.settled = 1;
                        block.checked = 1;
                    } else {
                        block.settled = 0;
                        block.iter = 1.5 + (waveone.difficulty/15) * 3;
                    }
                } else {
                    if (arr[position - 1].settled && block.distFromHex - block.iter * this.dt * settings.scale - arr[position - 1].distFromHex - arr[position - 1].height <= 0) {
                        block.distFromHex = arr[position - 1].distFromHex + arr[position - 1].height;
                        block.settled = 1;
                        block.checked = 1;
                    }
                    else {
                        block.settled = 0;
                        block.iter = 1.5 + (waveone.difficulty/15) * 3;
                    }
                }
            } else {
                var lane = this.sides - block.fallingLane;//  -this.position;
                lane += this.position;
    
                lane = (lane+this.sides) % this.sides;
                var arr = this.blocks[lane];
    
                if (arr.length > 0) {
                    if (block.distFromHex + block.iter * this.dt * settings.scale - arr[arr.length - 1].distFromHex - arr[arr.length - 1].height <= 0) {
                        block.distFromHex = arr[arr.length - 1].distFromHex + arr[arr.length - 1].height;
                        this.addBlock(block);
                    }
                } else {
                    if (block.distFromHex + block.iter * this.dt * settings.scale - (this.sideLength / 2) * Math.sqrt(3) <= 0) {
                        block.distFromHex = (this.sideLength / 2) * Math.sqrt(3);
                        this.addBlock(block);
                    }
                }
            }
        };
    
        this.rotate = function(steps) {
                    if(Date.now()-this.lastRotate<75 && !(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) ) return;
            if (!(gameState === 1 || gameState === 0)) return;

            if (this.blockArr.length !== this.count) {
                this.pendingSteps += steps
                return
            }
            this.pendingSteps = 0;

            this.position += steps;
            if (!history[this.ct]) {
                history[this.ct] = {};
            }

    
            if (!history[this.ct].rotate) {
                history[this.ct].rotate = steps;
            }
            else {
                history[this.ct].rotate += steps;
            }
    
            while (this.position < 0) {
                this.position += 6;
            }
    
            this.position = this.position % this.sides;
            this.blocks.forEach(function(blocks) {
                blocks.forEach(function(block) {
                    block.targetAngle = block.targetAngle - steps * 60;
                });
            });
    
            this.targetAngle = this.targetAngle - steps * 60;
                    this.lastRotate = Date.now();
        };
    
        this.draw = function() {
            this.x = trueCanvas.width/2;
    
            if (gameState != -2) {
                this.y = trueCanvas.height/2;
            }
            this.sideLength = settings.hexWidth;
            gdx = 0;
            gdy = 0;
            for (var i = 0; i < this.shakes.length; i++) {
                this.shake(this.shakes[i]);
            }
            if (this.angle > this.targetAngle) {
                this.angularVelocity -= angularVelocityConst * this.dt;
            }
            else if(this.angle < this.targetAngle) {
                this.angularVelocity += angularVelocityConst * this.dt;
            }
    
            if (Math.abs(this.angle - this.targetAngle + this.angularVelocity) <= Math.abs(this.angularVelocity)) { //do better soon
                this.angle = this.targetAngle;
                this.angularVelocity = 0;
            }
            else {
                this.angle += this.angularVelocity;
            }
     
            drawPolygon(this.x + gdx, this.y + gdy + this.dy, this.sides, this.sideLength, this.angle,arrayToColor(this.fillColor) , 0, 'rgba(0,0,0,0)');
        };
    }
    
    function arrayToColor(arr){
        return 'rgb(' + arr[0]+ ','+arr[1]+','+arr[2]+')';
    }
    
    // function addKeyListeners() {
    //     win.addEventListener('keydown', e => {
            
    //         if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
    //             if (MainHex && gameState !== 0) {
    //                 MainHex.rotate(1);
    //             }
    //         }
    //         if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
    //             if (MainHex && gameState !== 0) {
    //                 MainHex.rotate(-1);
    //             }
    //         }
    //         if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
    //             var tempSpeed = settings.speedModifier;
            //     if (MainHex && gameState !== 0){
            //         //speed up block temporarily
            //         if(settings.speedUpKeyHeld == false){
            //             settings.speedUpKeyHeld = true;
            //             rush *=4;
            //         }
            //     }
            //     //settings.speedModifier = tempSpeed;
            // }
            // if (e.key === 'q') {
            //     // if (devMode) toggleDevTools();
            // }
            // if (e.key === 'Enter') {
                // if (gameState==1 || importing == 1) {
                //     init(1);
                // }
                // if (gameState == 2) {
                //     init();
                //     fadeOutEffect("gameoverscreen", 30);
                // }
                // if (gameState===0) {
                //     resumeGame();
                // }
        //     }

        // })

        // win.addEventListener('keyup', e => {
                 
        //     if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
        //         if (MainHex && gameState !== 0){
        //             //speed up block temporarily
                    
        //             rush /=4;
        //             settings.speedUpKeyHeld = false;
        //         }
        //     }
        // })
        // win.keypress.register_combo({
        //     keys: "left",
        //     on_keydown: function() {
        //         if (MainHex && gameState !== 0) {
        //             MainHex.rotate(1);
        //         }
        //     }
        // });
    
        // win.keypress.register_combo({
        //     keys: "right",
        //     on_keydown: function() {
        //         if (MainHex && gameState !== 0){
        //             MainHex.rotate(-1);
        //         }
        //     }
        // });
        // win.keypress.register_combo({
        //     keys: "down",
        //     on_keydown: function() {
        //         var tempSpeed = settings.speedModifier;
        //         if (MainHex && gameState !== 0){
        //             //speed up block temporarily
        //             if(settings.speedUpKeyHeld == false){
        //                 settings.speedUpKeyHeld = true;
        //                 rush *=4;
        //             }
        //         }
        //         //settings.speedModifier = tempSpeed;
        //     },
        //     on_keyup:function(){
        //         if (MainHex && gameState !== 0){
        //             //speed up block temporarily
                    
        //             rush /=4;
        //             settings.speedUpKeyHeld = false;
        //         }
        //     }	
        // });
        
        // win.keypress.register_combo({
        //     keys: "a",
        //     on_keydown: function() {
        //         if (MainHex && gameState !== 0) {
        //             MainHex.rotate(1);
        //         }
        //     }
        // });
    
        // win.keypress.register_combo({
        //     keys: "d",
        //     on_keydown: function() {
        //         if (MainHex && gameState !== 0){
        //             MainHex.rotate(-1);
        //         }
        //     }
        // });
        
        // win.keypress.register_combo({
        //     keys: "s",
        //     on_keydown: function() {
        //         var tempSpeed = settings.speedModifier;
        //         if (MainHex && gameState !== 0){
        //             //speed up block temporarily
        //             if(settings.speedUpKeyHeld == false){
        //                 settings.speedUpKeyHeld = true;
        //                 rush *=4;
        //             }
        //         }
        //         //settings.speedModifier = tempSpeed;
        //     },
        //     on_keyup:function(){
        //         if (MainHex && gameState !== 0){
        //             //speed up block temporarily
                    
        //             rush /=4;
        //             settings.speedUpKeyHeld = false;
        //         }
        //     }	
        // });
        // win.keypress.register_combo({
        //     keys: "p",
        //     on_keydown: function(){pause();}
        // });
    
        // win.keypress.register_combo({
        //     keys: "space",
        //     on_keydown: function(){pause();}
        // });
    
        // win.keypress.register_combo({
        //     keys: "q",
        //     on_keydown: function() {
        //         if (devMode) toggleDevTools();
        //     }
        // });
    
        // win.keypress.register_combo({
        //     keys: "enter",
        //     on_keydown: function() {
        //         if (gameState==1 || importing == 1) {
        //             init(1);
        //         }
        //         if (gameState == 2) {
        //             init();
        //             $("#gameoverscreen").fadeOut();
        //         }
        //         if (gameState===0) {
        //             resumeGame();
        //         }
        //     }
        // });

        // var _fn = function() {
        //     if (gameState != 1 && gameState != -1) {
        //         return;
        //     }
    
        //     if (visible('helpScreen')) {
        //         fadeOutEffect('helpScreen', 30);
        //     }
        //     pause();
        //     return false;
        // };
        // doc.getElementById("pauseBtn").ontouchstart = _fn
        // doc.getElementById("pauseBtn").onmousedown = _fn
    
        // var color_fn = function() {
        // colors = ["#8e44ad", "#f1c40f", "#3498db", "#d35400"];
    
        // hexColorsToTintedColors = {
        //     "#8e44ad": "rgb(229,152,102)",
        //     "#f1c40f": "rgb(246,223,133)",
        //     "#3498db": "rgb(151,201,235)",
        //     "#d35400": "rgb(210,180,222)"
        // };
    
        // rgbToHex = {
        //     "rgb(142,68,173)": "#8e44ad",
        //     "rgb(241,196,15)": "#f1c40f",
        //     "rgb(52,152,219)": "#3498db",
        //     "rgb(211,84,0)": "#d35400"
        // };
    
        // rgbColorsToTintedColors = {
        //     "rgb(142,68,173)": "rgb(229,152,102)",
        //     "rgb(241,196,15)": "rgb(246,223,133)",
        //     "rgb(52,152,219)": "rgb(151,201,235)",
        //     "rgb(46,204,113)": "rgb(210,180,222)"
        // };
        // };

        //doc.getElementById("colorBlindBtn").addEventListener('touchstart', color_fn);
        //doc.getElementById("colorBlindBtn").addEventListener('mousedown', color_fn);
    
    
        // if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        //         doc.getElementById("restart").addEventListener('touchstart', function() {
        //         init();
        //         canRestart = false;
        //         fadeOutEffect("gameoverscreen", 30);
        //     });
    
        // }
        // else {
        //     doc.getElementById("restart").addEventListener('mousedown', function() {
        //         init();
        //         canRestart = false;
        //         fadeOutEffect("gameoverscreen", 30);
        //     });
    
        // }
        // if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        //     doc.getElementById("restart").addEventListener('touchstart', function() {
        //         init(1);
        //         canRestart = false;
        //         fadeOutEffect("gameoverscreen", 30);

        //     });
    
    //     }
    //     else {
    //         doc.getElementById("restart").addEventListener('mousedown', function() {
    //             init(1);
    //             canRestart = false;
    //             fadeOutEffect("gameoverscreen", 30);

    //         });
    
    
    //     }
    
    // }
    // function inside (point, vs) {
    //     // ray-casting algorithm based on
    //     // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html
        
    //     var x = point[0], y = point[1];
        
    //     var inside = false;
    //     for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
    //         var xi = vs[i][0], yi = vs[i][1];
    //         var xj = vs[j][0], yj = vs[j][1];
            
    //         var intersect = ((yi > y) != (yj > y))
    //             && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
    //         if (intersect) inside = !inside;
    //     }
        
    //     return inside;
    // };
    
    // function handleClickTap(x,y) {
    //     if (x < 120 && y < 83 && visible('helpText')) {
    //         showHelp();
    //         return;
    //     }
    //     var radius = settings.hexWidth ;
    //     var halfRadius = radius/2;
    //     var triHeight = radius *(Math.sqrt(3)/2);
    //     var Vertexes =[
    //         [radius,0],
    //         [halfRadius,-triHeight],
    //         [-halfRadius,-triHeight],
    //         [-radius,0],
    //         [-halfRadius,triHeight],
    //         [halfRadius,triHeight]];
    //     Vertexes = Vertexes.map(function(coord){ 
    //         return [coord[0] + trueCanvas.width/2, coord[1] + trueCanvas.height/2]});
    
    //     if (!MainHex || gameState === 0 || gameState==-1) {
    //         return;
    //     }
    
    //     if (x < win.innerWidth/2) {
    //         MainHex.rotate(1);
    //     }
    //     if (x > win.innerWidth/2) {
    //         MainHex.rotate(-1);
    //     }
    // }
    
    function rotatePoint(x, y, theta) {
        var thetaRad = theta * (Math.PI / 180);
        var rotX = Math.cos(thetaRad) * x - Math.sin(thetaRad) * y;
        var rotY = Math.sin(thetaRad) * x + Math.cos(thetaRad) * y;
    
        return {
            x: rotX,
            y: rotY
        };
    }
    
    function randInt(min, max) {
        return Math.floor((Math.random() * max) + min);
    }
    
    function search(twoD,oneD){
        // Searches a two dimensional array to see if it contains a one dimensional array. indexOf doesn't work in this case
        for(var i=0;i<twoD.length;i++){
            if(twoD[i][0] == oneD[0] && twoD[i][1] == oneD[1]) {
                return true;
            }
        }
        return false;
    }
    
    function floodFill(hex, side, index, deleting) {
        if (hex.blocks[side] === undefined || hex.blocks[side][index] === undefined) return;
    
        //store the color
        var color = hex.blocks[side][index].color;
        //nested for loops for navigating the blocks
        for(var x =-1;x<2;x++){
            for(var y =-1;y<2;y++){
                //make sure the they aren't diagonals
                if(Math.abs(x)==Math.abs(y)){continue;}
                //calculate the side were exploring using mods
                var curSide =(side+x+hex.sides)%hex.sides;
                //calculate the index
                var curIndex = index+y;
                //making sure the block exists at this side and index
                if(hex.blocks[curSide] === undefined){continue;}
                if(hex.blocks[curSide][curIndex] !== undefined){
                    // checking equivalency of color, if its already been explored, and if it isn't already deleted
                    if(hex.blocks[curSide][curIndex].color == color && search(deleting,[curSide,curIndex]) === false && hex.blocks[curSide][curIndex].deleted === 0 ) {
                        //add this to the array of already explored
                        deleting.push([curSide,curIndex]);
                        //recall with next block explored
                        floodFill(hex,curSide,curIndex,deleting);
                    }
                }
            }
        }
    }
    
    function consolidateBlocks(hex,side,index){
        //record which sides have been changed
        var sidesChanged =[];
        var deleting=[];
        var deletedBlocks = [];
        //add start case
        deleting.push([side,index]);
        //fill deleting	
        floodFill(hex,side,index,deleting);
        //make sure there are more than 3 blocks to be deleted
        if(deleting.length<3){return;}
        var i;
        for(i=0; i<deleting.length;i++) {
            var arr = deleting[i];
            //just making sure the arrays are as they should be
            if(arr !== undefined && arr.length==2) {
                //add to sides changed if not in there
                if(sidesChanged.indexOf(arr[0])==-1){
                    sidesChanged.push(arr[0]);
                }
                //mark as deleted
                hex.blocks[arr[0]][arr[1]].deleted = 1;
                deletedBlocks.push(hex.blocks[arr[0]][arr[1]]);
            }
        }
    
        // add scores
        var now = MainHex.ct;
        if(now - hex.lastCombo < settings.comboTime ){
            settings.comboTime = (1/settings.creationSpeedModifier) * (waveone.nextGen/16.666667) * 3;
            hex.comboMultiplier += 1;
            hex.lastCombo = now;
            var coords = findCenterOfBlocks(deletedBlocks);
            hex.texts.push(new Text(coords['x'],coords['y'],"x "+hex.comboMultiplier.toString(),"bold Q","#fff",fadeUpAndOut));
        }
        else{
            settings.comboTime = 240;
            hex.lastCombo = now;
            hex.comboMultiplier = 1;
        }
        var adder = deleting.length * deleting.length * hex.comboMultiplier;
        hex.texts.push(new Text(hex.x,hex.y,"+ "+adder.toString(),"bold Q ",deletedBlocks[0].color,fadeUpAndOut));
            hex.lastColorScored = deletedBlocks[0].color;
        score += adder;
    }
    
    function drawTimer() {
        if(gameState==1){
            var leftVertexes = [];
            var rightVertexes = [];
        if(MainHex.ct - MainHex.lastCombo < settings.comboTime){
            for(var i=0;i<6;i++){
                var done = (MainHex.ct -MainHex.lastCombo);
                if(done<(settings.comboTime)*(5-i)*(1/6)){
                    leftVertexes.push(calcSide(i,i+1,1,1));
                                    rightVertexes.push(calcSide(12-i,11-i,1,1));
                }
                else{
                    leftVertexes.push(calcSide(i,i+1,1-((done*6)/settings.comboTime)%(1),1));
                    rightVertexes.push(calcSide(12-i,11-i,1-((done*6)/settings.comboTime)%(1),1));
                    break;
                }
            }
        }
            if(rightVertexes.length !== 0) drawSide(rightVertexes);
            if(leftVertexes.length !== 0) drawSide(leftVertexes);
        }
    }
    
    function calcSide(startVertex,endVertex,fraction,offset){
        startVertex = (startVertex+offset)%12;
        endVertex = (endVertex+offset)%12;
        ctx.globalAlpha=1;
        ctx.beginPath();
        ctx.lineCap = "round";
    
        var radius = (settings.rows * settings.blockHeight) * (2/Math.sqrt(3)) + settings.hexWidth ;
        var halfRadius = radius/2;
        var triHeight = radius *(Math.sqrt(3)/2);
        var Vertexes =[
            [(halfRadius*3)/2,triHeight/2],
            [radius,0],
            [(halfRadius*3)/2,-triHeight/2],
            [halfRadius,-triHeight],
            [0,-triHeight],
            [-halfRadius,-triHeight],
            [-(halfRadius*3)/2,-triHeight/2],
            [-radius,0],
            [-(halfRadius*3)/2,triHeight/2],
            [-halfRadius,triHeight],
            [0,triHeight],
            [halfRadius,triHeight]
        ].reverse();
        var startX =trueCanvas.width/2 + Vertexes[startVertex][0];
        var startY =trueCanvas.height/2 + Vertexes[startVertex][1];
        var endX = trueCanvas.width/2 + Vertexes[endVertex][0];
        var endY = trueCanvas.height/2 + Vertexes[endVertex][1];
            return [[startX,startY],[((endX-startX)*fraction)+startX,((endY-startY)*fraction)+startY]];
    }
    function drawSide(vertexes){
        if (gameState === 0) {
            ctx.strokeStyle = hexColorsToTintedColors[MainHex.lastColorScored];
        } else {
            ctx.strokeStyle = MainHex.lastColorScored;
        }
        ctx.lineWidth =4*settings.scale;
            ctx.moveTo(vertexes[0][0][0],vertexes[0][0][1]);
        ctx.lineTo(vertexes[0][1][0],vertexes[0][1][1]);
            for(var i=1;i<vertexes.length;i++){
                ctx.lineTo(vertexes[i][1][0],vertexes[i][1][1]);
                ctx.moveTo(vertexes[i][1][0],vertexes[i][1][1]);
            }
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    
    }
    
    function render() {
        var grey = '#bdc3c7';
        if (gameState === 0) {
            grey = "rgb(220, 223, 225)";
        }
        
        ctx.clearRect(0, 0, trueCanvas.width, trueCanvas.height);
        clearGameBoard();
        if (gameState === 1 || gameState === 2 || gameState === -1 || gameState === 0) {
            if (op < 1) {
                op += 0.01;
            }
            ctx.globalAlpha = op;
            drawPolygon(trueCanvas.width / 2 , trueCanvas.height / 2 , 6, (settings.rows * settings.blockHeight) * (2/Math.sqrt(3)) + settings.hexWidth, 30, grey, false,6);
            drawTimer();
            ctx.globalAlpha = 1;
        }
    
        var i;
        for (i = 0; i < MainHex.blocks.length; i++) {
            for (var j = 0; j < MainHex.blocks[i].length; j++) {
                var block = MainHex.blocks[i][j];
                block.draw(true, j);
            }
        }
        for (i = 0; i < blocks.length; i++) {
            blocks[i].draw();
        }
    
        MainHex.draw();
        if (gameState ==1 || gameState ==-1 || gameState === 0) {
            drawScoreboard();
        }
    
        for (i = 0; i < MainHex.texts.length; i++) {
            var alive = MainHex.texts[i].draw();
            if(!alive){
                MainHex.texts.splice(i,1);
                i--;
            }
        }
    
        if ((MainHex.ct < 650 && (gameState !== 0) && !MainHex.playThrough)) {
            if (MainHex.ct > (650 - 50)) {
                ctx.globalAlpha = (50 - (MainHex.ct - (650 - 50)))/50;
            }
    
            if (MainHex.ct < 50) {
                ctx.globalAlpha = (MainHex.ct)/50;
            }
    
            // renderBeginningText();
            ctx.globalAlpha = 1;
        }
    
        if (gameState == -1) {
            ctx.globalAlpha = 0.9;
            ctx.fillStyle = 'rgb(236,240,241)';
            ctx.fillRect(0, 0, trueCanvas.width, trueCanvas.height);
            ctx.globalAlpha = 1;
        }
    
        settings.prevScale = settings.scale;
        settings.hexWidth = settings.baseHexWidth * settings.scale;
        settings.blockHeight = settings.baseBlockHeight * settings.scale;
    }
    
    // function renderBeginningText() {
    //     var upperheight = (trueCanvas.height/2) - ((settings.rows * settings.blockHeight) * (2/Math.sqrt(3))) * (5/6);
    //     var lowerheight = (trueCanvas.height/2) + ((settings.rows * settings.blockHeight) * (2/Math.sqrt(3))) * (11/16);
    //     var text = '';
    //     var mob, fontSize;
    //     if(/mobile|Mobile|iOS|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    //         mob = true;
    //         input_text = 'Tap the screen\'s left and right'
    //         action_text = 'sides to rotate the hexagon'
    //         score_text = 'Match 3+ blocks to score'
    //         fontSize = 35
    //     } else {
    //         mob = false
    //         input_text = 'Use the right and left arrow keys'
    //         action_text = 'to rotate the hexagon'
    //         score_text = 'Match 3+ blocks to score!'
    //         fontSize = 27
    //     }
    //     renderText((trueCanvas.width)/2 + 2 * settings.scale,upperheight-0*settings.scale, fontSize, '#2c3e50', input_text);
    //     renderText((trueCanvas.width)/2 + 2 * settings.scale,upperheight+33*settings.scale, fontSize, '#2c3e50', action_text);
    //     if (!mob) {
    //         drawKey("",(trueCanvas.width)/2 + 2 * settings.scale-2.5,upperheight+38*settings.scale);
    //     }
    
    //     renderText((trueCanvas.width)/2 + 2 * settings.scale,lowerheight,fontSize, '#2c3e50', score_text);
    // }
    
    function drawKey(key, x, y) {
        ctx.save();
        switch (key) {
            case "left":
                ctx.translate(x, y + settings.scale * 13);
                ctx.rotate(3.14159);
                ctx.font = "20px Fontawesome";
                ctx.scale(settings.scale, settings.scale);
                ctx.fillText(String.fromCharCode("0x25ba"), 0, 0);
                break;
            case "right":
                ctx.font = "20px Fontawesome";
                ctx.translate(x , y + settings.scale * 27.5);
                ctx.scale(settings.scale, settings.scale);
                ctx.fillText(String.fromCharCode("0x25ba"), 0, 0);
                break;
            
            default:
                drawKey("left", x - 5, y);
                drawKey("right", x + 5, y);
        }
        ctx.restore();
    }
    
    function exportSaveState() {
        var state = {};
    
        if(gameState == 1 || gameState == -1 || (gameState === 0 && localStorage.getItem('saveState') !== undefined)) {
            state = {
                hex: $.extend(true, {}, MainHex),
                blocks: $.extend(true, [], blocks),
                score: score,
                wavegen: waveone,
                gdx: gdx,
                gdy: gdy,
                comboTime:settings.comboTime
            };
    
            state.hex.blocks.map(function(a){
                for (var i = 0; i < a.length; i++) {
                    a[i] = $.extend(true, {}, a[i]);
                }
    
                a.map(descaleBlock);
            });
    
            for (var i = 0; i < state.blocks.length; i++) {
                state.blocks[i] = $.extend(true, {}, state.blocks[i]);
            }
    
            state.blocks.map(descaleBlock);
        }
    
        // localStorage.setItem('highscores', JSON.stringify(highscores));
    
        return JSONfn.stringify(state);
    }
    
    function descaleBlock(b) {
        b.distFromHex /= settings.scale;
    }
    
    function writeHighScores() {
            highscores.sort(
            function(a,b){
                a = parseInt(a, 10);
                b = parseInt(b, 10);
                if (a < b) {
                    return 1;
                } else if (a > b) {
                    return -1;
                }else {
                    return 0;
                }
            }
        );
        highscores = highscores.slice(0,3);
        // localStorage.setItem("highscores", JSON.stringify(highscores));
    }
    
    function clearSaveState() {
        // localStorage.setItem("saveState", "{}");
    }
    
    function isStateSaved() {
        return localStorage.getItem("saveState") != "{}" && localStorage.getItem("saveState") != undefined;
    }
    
    function Text(x,y,text,font,color,incrementFunction){
        this.x = x;
        this.y = y;
        this.font = font;
        this.color = color;
        this.opacity =1;
        this.text = text;
        this.alive=1;
        this.draw = function(){
            if (this.alive>0) {
                ctx.globalAlpha = this.opacity;
                renderText((this.x + gdx), (this.y + gdy),50,this.color,this.text);
                ctx.globalAlpha = 1;
                incrementFunction(this);
                return true;
            }
            else {
                return false;
            }
        };
    }
    
    function fadeUpAndOut(text){
        text.opacity -= MainHex.dt * Math.pow(Math.pow((1-text.opacity), 1/3)+1,3)/100;
        text.alive = text.opacity;
        text.y -= 3 * MainHex.dt;
    }
    

//remember to update history function to show the respective iter speeds
    function update(dt) {
        MainHex.dt = dt;
        if (gameState == 1) {
            waveone.update();
            if (MainHex.ct - waveone.prevTimeScored > 1000) {
                waveone.prevTimeScored = MainHex.ct;
            }
        }
        var lowestDeletedIndex = 99;
        var i;
        var j;
        var block;

        var objectsToRemove = [];
        for (i = 0; i < blocks.length; i++) {
            MainHex.doesBlockCollide(blocks[i]);
            if (!blocks[i].settled) {
                if (!blocks[i].initializing) blocks[i].distFromHex -= blocks[i].iter * dt * settings.scale;
            } else if (!blocks[i].removed) {
                blocks[i].removed = 1;
            }
        }

        for (i = 0; i < MainHex.blocks.length; i++) {
            for (j = 0; j < MainHex.blocks[i].length; j++) {
                if (MainHex.blocks[i][j].checked ==1 ) {
                    consolidateBlocks(MainHex,MainHex.blocks[i][j].attachedLane,MainHex.blocks[i][j].getIndex());
                    MainHex.blocks[i][j].checked=0;
                }
            }
        }

        for (i = 0; i < MainHex.blocks.length; i++) {
            lowestDeletedIndex = 99;
            for (j = 0; j < MainHex.blocks[i].length; j++) {
                block = MainHex.blocks[i][j];
                if (block.deleted == 2) {
                    MainHex.blocks[i].splice(j,1);
                    blockDestroyed();
                    if (j < lowestDeletedIndex) lowestDeletedIndex = j;
                    j--;
                }
            }

            if (lowestDeletedIndex < MainHex.blocks[i].length) {
                for (j = lowestDeletedIndex; j < MainHex.blocks[i].length; j++) {
                    MainHex.blocks[i][j].settled = 0;
                }
            }
        }

        for (i = 0; i < MainHex.blocks.length; i++) {
            for (j = 0; j < MainHex.blocks[i].length; j++) {
                block = MainHex.blocks[i][j];
                MainHex.doesBlockCollide(block, j, MainHex.blocks[i]);

                if (!MainHex.blocks[i][j].settled) {
                    MainHex.blocks[i][j].distFromHex -= block.iter * dt * settings.scale;
                }
            }
        }

        for(i = 0; i < blocks.length;i++){
            if (blocks[i].removed == 1) {
                blocks.splice(i,1);
                i--;
            }
        }

        MainHex.ct += dt;
    }

    // t: current time, b: begInnIng value, c: change In value, d: duration
    function easeOutCubic(t, b, c, d) {
        return c * ((t = t / d - 1) * t * t + 1) + b;
    }

    function renderText(x, y, fontSize, color, text, font) {
        ctx.save();
        if (!font) {
            var font = '20px Exo';
        }

        fontSize *= settings.scale;
        ctx.font = fontSize + font;
        ctx.textAlign = 'center';
        ctx.fillStyle = color;
        ctx.fillText(text, x, y + (fontSize / 2) - 9 * settings.scale);
        ctx.restore();
    }

    function drawScoreboard() {
        if (scoreOpacity < 1) {
            scoreOpacity += 0.01;
            textOpacity += 0.01;
        }
        ctx.globalAlpha = textOpacity;
        var scoreSize = 50;
        var scoreString = String(score);
        if (scoreString.length == 6) {
            scoreSize = 43;
        } else if (scoreString.length == 7) {
            scoreSize = 35;
        } else if (scoreString.length == 8) {
            scoreSize = 31;
        } else if (scoreString.length == 9) {
            scoreSize = 27;
        }
        //if (rush ==1){
            var color = "rgb(236, 240, 241)";
        //}
        var fontSize = scoreSize
        var h = trueCanvas.height / 2 + gdy + 100 * settings.scale;

        var txt = readyState === true ? 'Ready' : 'Not Ready!'
        
        if (gameState === 0) {
            renderText(trueCanvas.width / 2 + gdx + (scoreSize/15)*settings.scale, trueCanvas.height / 2 + gdy + (scoreSize/20)*settings.scale, fontSize, "rgb(236, 240, 241)", String.fromCharCode("0x25B6"), 'px Arial');
            renderText(trueCanvas.width / 2 + gdx + 6 * settings.scale, trueCanvas.height / 2 + gdy - 155 * settings.scale, 100, "#2c3e50", "Hextris");
            renderText(trueCanvas.width / 2 + gdx + 5 * settings.scale, h + 10, fontSize, "rgb(44,62,80)", 'Not Ready!');
        } else if (gameState != 0 && textOpacity > 0) {
            textOpacity -= 0.05;
            renderText(trueCanvas.width / 2 + gdx + (scoreSize/15)*settings.scale, trueCanvas.height / 2 + gdy + (scoreSize/20)*settings.scale, fontSize, "rgb(236, 240, 241)", String.fromCharCode("0x25B6"), 'px Arial');
            renderText(trueCanvas.width / 2 + gdx + 6 * settings.scale, trueCanvas.height / 2 + gdy - 155 * settings.scale, 100, "#2c3e50", "Hextris");
            renderText(trueCanvas.width / 2 + gdx + 5 * settings.scale, h, fontSize, "rgb(44,62,80)", 'Not Ready!');
            ctx.globalAlpha = scoreOpacity;
            renderText(trueCanvas.width / 2 + gdx, trueCanvas.height / 2 + gdy, scoreSize, color, score);
        } else {
            ctx.globalAlpha = scoreOpacity;
            renderText(trueCanvas.width / 2 + gdx, trueCanvas.height / 2 + gdy, scoreSize, color, score);
        }

        ctx.globalAlpha = 1;
    }

    function clearGameBoard() {
        drawPolygon(trueCanvas.width / 2, trueCanvas.height / 2, 6, trueCanvas.width / 2, 30, hexagonBackgroundColor, 0, 'rgba(0,0,0,0)');
    }
    
    function drawPolygon(x, y, sides, radius, theta, fillColor, lineWidth, lineColor) {
        ctx.fillStyle = fillColor;
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = lineColor;

        ctx.beginPath();
        var coords = rotatePoint(0, radius, theta);
        ctx.moveTo(coords.x + x, coords.y + y);
        var oldX = coords.x;
        var oldY = coords.y;
        for (var i = 0; i < sides; i++) {
            coords = rotatePoint(oldX, oldY, 360 / sides);
            ctx.lineTo(coords.x + x, coords.y + y);
            oldX = coords.x;
            oldY = coords.y;
        }

        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.strokeStyle = 'rgba(0,0,0,0)';
    }

    function toggleClass(element, active) {
        if ($(element).hasClass(active)) {
            $(element).removeClass(active);
        } else {
            $(element).addClass(active);
        }
    }

    function showText(text) {
        var messages = {
            'paused': "<div class='centeredHeader unselectable'>Game Paused</div>",
            'pausedAndroid': "<div class='centeredHeader unselectable'>Game Paused</div><div class='unselectable centeredSubHeader' style='position:absolute;margin-left:-150px;left:50%;margin-top:20px;width:300px;font-size:16px;'><a href = 'https://play.google.com/store/apps/details?id=com.hextris.hextrisadfree' target='_blank'Want to support the developers? Don't like ads? Tap for Hextris ad-free!</a></div>",
            'pausediOS': "<div class='centeredHeader unselectable'>Game Paused</div><div class='unselectable centeredSubHeader' style='position:absolute;margin-left:-150px;left:50%;margin-top:20px;width:300px;font-size:16px;'><a href = 'https://itunes.apple.com/us/app/hextris-ad-free/id912895524?mt=8' target='_blank'>Want to support the developers? Don't like ads? Tap for Hextris ad-free!</a></div>",
            'pausedOther': "<div class='centeredHeader unselectable'>Game Paused</div><div class='unselectable centeredSubHeader' style='margin-top:10px;position:absolute;left:50%;margin-left:-190px;max-width:380px;font-size:18px;'><a href = 'http://hextris.github.io/' target='_blank'>Want to support the developers? Click here to buy one of the ad-free mobile versions!</a></div>",
            'start': "<div class='centeredHeader unselectable' style='line-height:80px;'>Press enter to start</div>"
        };

        if (text == 'paused') {
            if (settings.os == 'android') {
                text = 'pausedAndroid'
            } else if (settings.os == 'ios') {
                text = 'pausediOS'
            } else if (settings.platform == 'nonmobile') {
                text = 'pausedOther'
            }
        }

        if (text == 'gameover') {
        //Clay('client.share.any', {text: 'Think you can beat my score of '+ score + ' in Super Cool Game?'})
            fadeInEffect("gameoverscreen", 30);
            }
        var els = doc.getElementsByClassName("overlay") 
        Array.prototype.forEach.call(els, function(el) {
            el.innerHTML = messages[text];
            fadeInEffect(el.id, 30)
        })

    }

    function hideText() {
        var els = doc.getElementsByClassName("overlay") 
        Array.prototype.forEach.call(els, function(el) {
            fadeOutEffect(el.id, 30);
            el.innerHTML = '';
        })
    }

    function gameOverDisplay() {
        settings.ending_block=false;
        var c = doc.getElementById("canvas");
        c.className = "blur";
        updateHighScores();
        if (highscores.length === 0 ){
            // doc.querySelector("#currentHighScore").innerHTML = '0';
        }
        else {
            // doc.querySelector("#currentHighScore").innerHTML = highscores[0].toString()
        }
    
        fadeInEffect("gameoverscreen", 30);
        //fadeInEffect("buttonCont", 30);
        fadeInEffect("container", 30);
        //fadeInEffect("socialShare", 30);
        //fadeInEffect("restart", 30);
        set_score_pos();
        
    }

    function updateHighScores (){
        doc.querySelector("#cScore").innerHTML = (score).toString();
        // doc.querySelector("#1place").innerHTML = (highscores[0]).toString();
        // doc.querySelector("#2place").innerHTML = (highscores[1]).toString();
        // doc.querySelector("#3place").innerHTML = (highscores[2]).toString();
    }

    var pausable = true;
    function pause(o) {
        if (gameState == 0 || gameState == 2 || !pausable) {
            return;
        }

        pausable = false;
        writeHighScores();
        var message;
        if (o) {
            message = '';
        } else {
            message = 'paused';
        }

        var c = doc.getElementById("canvas");
        if (gameState == -1) {
            //fadeOutEffect('fork-ribbon', 300);
            //fadeOutEffect('restartBtn', 300);
            //fadeOutEffect('buttonCont', 300);
            if (visible('helpScreen')) {
                //fadeOutEffect('helpScreen', 300);
            }

            // doc.getElementById("pauseBtn").setAttribute("src", "/assets/Hextris/images/btn_pause.svg");
            fadeOutEffect(doc.getElementsByClassName('helpText')[0].id, 300);
            fadeOutEffect('overlay', 300);
            hideText();
            setTimeout(function() {
                gameState = prevGameState;
                pausable =true;
            }, 400);
        } else if (gameState != -2 && gameState !== 0 && gameState !== 2) {
            //fadeInEffect('restartBtn', 300);
            //fadeInEffect('buttonCont', 300);
            //fadeInEffect(doc.getElementsByClassName('helpText')[0].id, 300);

            if (message == 'paused') {
                showText(message);
            }
            //fadeInEffect('fork-ribbon', 300);
            // doc.getElementById("pauseBtn").setAttribute("src","/assets/Hextris/images/btn_resume.svg");
            fadeInEffect('overlay', 300);
            prevGameState = gameState;
            setTimeout(function() {
                pausable = true;
            }, 400);
            gameState = -1;
        }
    }


    socket.on('opponentReady', () => {
        readyState = true
    })

    socket.on('opponentStart', () => {
        readyState = false
        startBtnHandler();
    })

    socket.on('allEnd', () => {
        setTimeout(() => {
            gameState = 0;
            fadeOutEffect("gameoverscreen", 30);
            canvas.className = ""
            blocks = [];
            MainHex.blocks = [];
            fadeInEffect('startBtn');
        }, 3000);
    })

    socket.on('opponentBlock', ({blocklane, color, iter, distFromHex, settled}) => {
        addNewBlock2(blocklane, color, iter, distFromHex, settled)
    })

    socket.on('opponentLeftKeyDown', () => {
        if (MainHex && gameState !== 0) {
            MainHex.rotate(1);
        }
    })
    
    socket.on('opponentRightKeyDown', () => {
        if (MainHex && gameState !== 0) {
            MainHex.rotate(-1);
        }
    })

    socket.on('opponentDownKeyDown', () => {
        var tempSpeed = settings.speedModifier;
        if (MainHex && gameState !== 0){
            //speed up block temporarily
            if(settings.speedUpKeyHeld == false){
                settings.speedUpKeyHeld = true;
                rush *=4;
            }
        }
    })

    socket.on('opponentEnterKeyDown', () => {
        if (gameState==1 || importing == 1) {
            init(1);
        }
    })

    socket.on('opponentDownKeyUp', () => {     
        if (MainHex && gameState !== 0){
            //speed up block temporarily
            rush /=4;
            settings.speedUpKeyHeld = false;
        }
    })

    socket.on('opponentSettled', ({blocks, newScore}) => {
        MainHex.checkBlocks(blocks)
        score = newScore
    })

    
    initialize();
}