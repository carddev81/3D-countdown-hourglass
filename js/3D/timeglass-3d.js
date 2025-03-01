(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("three"));
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["timeglass3D"] = factory(require("three"));
	else
		root["timeglass3D"] = factory(root["THREE"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__) {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = (function() {
  var MS_IN_DAY, MS_IN_HOUR, MS_IN_MINUTE, msIn, unitsIn;
  MS_IN_MINUTE = 1000 * 60;
  MS_IN_HOUR = 1000 * 60 * 60;
  MS_IN_DAY = 1000 * 60 * 60 * 24;
  msIn = function(unit) {
    switch (unit) {
      case 'minute':
        return MS_IN_MINUTE;
      case 'hour':
        return MS_IN_HOUR;
      case 'day':
        return MS_IN_DAY;
    }
  };
  unitsIn = function(ms, unit) {
    switch (unit) {
      case 'minute':
        return Math.floor(Math.abs(ms % MS_IN_HOUR / MS_IN_MINUTE));
      case 'hour':
        return Math.floor(Math.abs(ms % MS_IN_DAY / MS_IN_HOUR));
      case 'day':
        return Math.floor(Math.abs(ms / MS_IN_DAY));
    }
  };
  return {
    MS_IN_MINUTE: MS_IN_MINUTE,
    MS_IN_HOUR: MS_IN_HOUR,
    MS_IN_DAY: MS_IN_DAY,
    msIn: msIn,
    unitsIn: unitsIn
  };
})();


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = (function() {
  var error, log, warn;
  log = function(message) {
    return console.log("[Timeglass 3D] " + message);
  };
  warn = function(message) {
    return console.warn("[Timeglass 3D] " + message);
  };
  error = function(message) {
    return console.error("[Timeglass 3D] " + message);
  };
  return {
    log: log,
    warn: warn,
    error: error
  };
})();


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = (function() {
  var normalize, quadIn, quadInOut, quadOut;
  normalize = function(t) {
    return Math.max(0, Math.min(1, t));
  };
  quadIn = function(a, b, t) {
    t = normalize(t);
    return a + (b - a) * t * t;
  };
  quadOut = function(a, b, t) {
    t = normalize(t);
    return a + (b - a) * t * (2 - t);
  };
  quadInOut = function(a, b, t) {
    t = normalize(t);
    return a + (b - a) * (t < 0.5 ? t * t * 2 : t * (4 - t * 2) - 1);
  };
  return {
    quadIn: quadIn,
    quadOut: quadOut,
    quadInOut: quadInOut
  };
})();


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (function() {
  var MS_IN_MINUTE, THREE, animate, animateFlow, animateLookAround, animateOnTable, animateTurn, camera, log, mixers, msIn, props, ref, renderer, scene, timeNow, timeThen, unitsIn, updateTimeSlot;
  THREE = __webpack_require__(0);
  MS_IN_MINUTE = __webpack_require__(1).MS_IN_MINUTE;
  ref = __webpack_require__(1), msIn = ref.msIn, unitsIn = ref.unitsIn;
  updateTimeSlot = __webpack_require__(5).updateTimeSlot;
  log = __webpack_require__(2).log;
  props = null;
  renderer = null;
  scene = null;
  camera = null;
  animateTurn = null;
  animateFlow = null;
  animateOnTable = null;
  animateLookAround = null;
  mixers = {
    minute: [],
    hour: [],
    day: []
  };
  timeNow = null;
  timeThen = null;
  animate = function() {
    var i, j, k, l, len, len1, offset, ref1, ref2, timeSlot, unit;
    requestAnimationFrame(animate);
    timeNow = (function() {
      switch (props.mode) {
        case 'timer':
          return new Date();
        case 'countdown':
          return Math.min(new Date(), (new Date(props.date)) - 1);
      }
    })();
    ref1 = ['minute', 'hour', 'day'];
    for (j = 0, len = ref1.length; j < len; j++) {
      unit = ref1[j];
      for (i = k = 0; k < 8; i = ++k) {
        mixers[unit][i].update((timeNow - timeThen) / 1000);
      }
    }
    timeThen = timeNow;
    animateTurn(scene, timeNow);
    animateFlow(scene, timeNow);
    if (props.onTableMode) {
      animateOnTable(scene, timeNow);
    }
    if (props.lookAroundMode) {
      animateLookAround(scene, timeNow);
    }
    ref2 = ['minute', 'hour', 'day'];
    for (l = 0, len1 = ref2.length; l < len1; l++) {
      unit = ref2[l];
      timeSlot = (scene.getObjectByName("composite-" + unit)).getObjectByName('time-slot');
      offset = (function() {
        switch (props.mode) {
          case 'timer':
            return 0;
          case 'countdown':
            return 1 - MS_IN_MINUTE;
        }
      })();
      updateTimeSlot(timeSlot, unitsIn(timeNow - (new Date(props.date)) + offset + 1, unit));
    }
    return renderer.render(scene, camera);
  };
  return function(_props, noInfo, noWarnings) {
    var clip, composite, i, j, k, keyframes, l, len, lowerSand, ref1, unit, upperSand;
    if (_props == null) {
      _props = {};
    }
    if (noInfo == null) {
      noInfo = false;
    }
    if (noWarnings == null) {
      noWarnings = false;
    }
    if (!(props = (__webpack_require__(6))(_props))) {
      return;
    }
    if (!noInfo) {
      log("v" + "0.1.1");
    }
    renderer = (__webpack_require__(8))(props);
    scene = (__webpack_require__(9))(props);
    camera = (__webpack_require__(25))(props);
    animateTurn = (__webpack_require__(26))(props);
    animateFlow = (__webpack_require__(27))(props);
    if (props.onTableMode) {
      animateOnTable = (__webpack_require__(28))(props);
    }
    if (props.lookAroundMode) {
      animateLookAround = (__webpack_require__(29))(props);
    }
    props.container.appendChild(renderer.domElement);
    props.container.style.overflow = 'hidden';
    if (!props.transparent) {
      if (props.environment == null) {
        props.container.style.backgroundImage = (function() {
          switch (props.theme) {
            case 'lite':
              return 'linear-gradient(#eeeeee, #ffffff)';
            case 'dark':
              return 'linear-gradient(#555555, #666666)';
          }
        })();
      } else {
        props.container.style.backgroundImage = "url(" + props.environment + ")";
        props.container.style.backgroundSize = 'cover';
        props.container.style.backgroundPosition = 'center';
      }
    }
    keyframes = (__webpack_require__(30)).map(function(keyframe) {
      return THREE.KeyframeTrack.parse(keyframe);
    });
    clip = new THREE.AnimationClip('flow', 10, keyframes);
    ref1 = ['minute', 'hour', 'day'];
    for (j = 0, len = ref1.length; j < len; j++) {
      unit = ref1[j];
      composite = scene.getObjectByName("composite-" + unit);
      lowerSand = composite.getObjectByName('sand-lower');
      upperSand = composite.getObjectByName('sand-upper');
      for (i = k = 0; k < 4; i = ++k) {
        mixers[unit].push(new THREE.AnimationMixer(lowerSand.children[i]));
        mixers[unit].push(new THREE.AnimationMixer(upperSand.children[i]));
      }
      for (i = l = 0; l < 8; i = ++l) {
        ((mixers[unit][i].clipAction(clip)).setDuration((msIn(unit)) / 1000)).play();
      }
    }
    timeNow = new Date();
    timeThen = new Date(props.date);
    return requestAnimationFrame(animate);
  };
})();


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (function() {
  var THREE, resDigitSlot, setDigitSlot, updateTimeSlot;
  THREE = __webpack_require__(0);
  resDigitSlot = function(slot) {
    var i, j, results;
    results = [];
    for (i = j = 0; j <= 9; i = ++j) {
      results.push((slot.getObjectByName("digit-" + i)).visible = false);
    }
    return results;
  };
  setDigitSlot = function(slot, i) {
    return (slot.getObjectByName("digit-" + i)).visible = true;
  };
  updateTimeSlot = function(timeSlot, time) {
    var i, j, k, l, m, ref, results;
    for (i = j = 0, ref = 4 + 3; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
      resDigitSlot(timeSlot.children[i]);
    }
    if ((0 <= time && time < 10)) {
      setDigitSlot(timeSlot.children[1], 0);
      setDigitSlot(timeSlot.children[2], time);
    }
    if ((10 <= time && time < 100)) {
      for (i = k = 0; k < 2; i = ++k) {
        setDigitSlot(timeSlot.children[i + 1], ("" + time)[i]);
      }
    }
    if ((100 <= time && time < 1000)) {
      for (i = l = 0; l < 3; i = ++l) {
        setDigitSlot(timeSlot.children[i + 4], ("" + time)[i]);
      }
    }
    if ((1000 <= time && time < 10000)) {
      results = [];
      for (i = m = 0; m < 4; i = ++m) {
        results.push(setDigitSlot(timeSlot.children[i], ("" + time)[i]));
      }
      return results;
    }
  };
  return {
    resDigitSlot: resDigitSlot,
    setDigitSlot: setDigitSlot,
    updateTimeSlot: updateTimeSlot
  };
})();


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = function(props) {
  var base, base1, base2, base3, base4, base5, error, i, j, len, len1, ref, ref1, ref10, ref11, ref12, ref13, ref14, ref2, ref3, ref4, ref5, ref6, ref7, ref8, ref9, unit, validateTypeSet, validateValueSet;
  ref = __webpack_require__(7), validateTypeSet = ref.validateTypeSet, validateValueSet = ref.validateValueSet;
  error = __webpack_require__(2).error;
  if (props.container == null) {
    props.container = document.body;
  }
  if (props.date == null) {
    props.date = Date.now();
  }
  if (props.mode == null) {
    props.mode = 'timer';
  }
  if (props.theme == null) {
    props.theme = 'lite';
  }
  if (props.environment == null) {
    props.environment = null;
  }
  if (props.transparent == null) {
    props.transparent = false;
  }
  if (props.onTableMode == null) {
    props.onTableMode = false;
  }
  if (props.lookAroundMode == null) {
    props.lookAroundMode = false;
  }
  if (props.hourglasses == null) {
    props.hourglasses = {};
  }
  if ((base = props.hourglasses).all == null) {
    base.all = {};
  }
  if ((base1 = props.hourglasses.all).sides == null) {
    base1.sides = {};
  }
  if ((base2 = props.hourglasses.all).sands == null) {
    base2.sands = {};
  }
  if ((base3 = props.hourglasses.all.sides).material == null) {
    base3.material = 'plastic';
  }
  if ((base4 = props.hourglasses.all.sides).color == null) {
    base4.color = '#28282f';
  }
  if ((base5 = props.hourglasses.all.sands).color == null) {
    base5.color = '#fefe88';
  }
  ref1 = ['minute', 'hour', 'day'];
  for (i = 0, len = ref1.length; i < len; i++) {
    unit = ref1[i];
    props.hourglasses[unit] = {
      sides: {
        material: (ref2 = (ref3 = props.hourglasses) != null ? (ref4 = ref3[unit]) != null ? (ref5 = ref4.sides) != null ? ref5.material : void 0 : void 0 : void 0) != null ? ref2 : props.hourglasses.all.sides.material,
        color: (ref6 = (ref7 = props.hourglasses) != null ? (ref8 = ref7[unit]) != null ? (ref9 = ref8.sides) != null ? ref9.color : void 0 : void 0 : void 0) != null ? ref6 : props.hourglasses.all.sides.color
      },
      sands: {
        color: (ref10 = (ref11 = props.hourglasses) != null ? (ref12 = ref11[unit]) != null ? (ref13 = ref12.sands) != null ? ref13.color : void 0 : void 0 : void 0) != null ? ref10 : props.hourglasses.all.sands.color
      }
    };
  }
  if (props.scale == null) {
    props.scale = 1;
  }
  if (props.spacing == null) {
    props.spacing = 3.5;
  }
  if (props.offsetX == null) {
    props.offsetX = 0;
  }
  if (props.offsetY == null) {
    props.offsetY = 0;
  }
  if (!validateTypeSet(props, 'date', ['number', 'string', 'date'])) {
    return;
  }
  if ((props.date != null) && isNaN((new Date(props.date)).getTime())) {
    error('The \'date\' property contains an unsupported date format.');
    return;
  }
  if (!validateValueSet(props, 'mode', ['timer', 'countdown'])) {
    return;
  }
  if (!validateValueSet(props, 'theme', ['lite', 'dark'])) {
    return;
  }
  if (!validateTypeSet(props, 'environment', ['string'])) {
    return;
  }
  if (!validateTypeSet(props, 'transparent', ['boolean'])) {
    return;
  }
  if (!validateTypeSet(props, 'onTableMode', ['boolean'])) {
    return;
  }
  if (!validateTypeSet(props, 'lookAroundMode', ['boolean'])) {
    return;
  }
  ref14 = ['all', 'minute', 'hour', 'day'];
  for (j = 0, len1 = ref14.length; j < len1; j++) {
    unit = ref14[j];
    if (!validateValueSet(props, "hourglasses." + unit + ".sides.material", ['matte', 'plastic', 'glossy'])) {
      return;
    }
    if (!validateTypeSet(props, "hourglasses." + unit + ".sides.color", ['string'])) {
      return;
    }
    if (!validateTypeSet(props, "hourglasses." + unit + ".sands.color", ['string'])) {
      return;
    }
  }
  if (!validateTypeSet(props, 'scale', ['number'])) {
    return;
  }
  if (!validateTypeSet(props, 'spacing', ['number'])) {
    return;
  }
  if (!validateTypeSet(props, 'offsetX', ['number'])) {
    return;
  }
  if (!validateTypeSet(props, 'offsetY', ['number'])) {
    return;
  }
  return props;
};


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (function() {
  var error, expandProperty, validateTypeSet, validateValueSet;
  error = __webpack_require__(2).error;
  expandProperty = function(props, propFullName) {
    return propFullName.split('.').reduce(function(value, propName) {
      return value != null ? value[propName] : void 0;
    }, props);
  };
  validateTypeSet = function(props, propFullName, typeSet) {
    var constructors, i, len, type, value;
    constructors = [];
    for (i = 0, len = typeSet.length; i < len; i++) {
      type = typeSet[i];
      constructors.push((function() {
        switch (type) {
          case 'boolean':
            return Boolean;
          case 'number':
            return Number;
          case 'string':
            return String;
          case 'date':
            return Date;
        }
      })());
    }
    value = expandProperty(props, propFullName);
    if (!((value != null) && constructors.indexOf(value.constructor) < 0)) {
      return true;
    }
    if (typeSet.length !== 1) {
      return error("The value of the '" + propFullName + "' property should be a " + (typeSet.slice(0, -1).join(', a ')) + " or a " + (typeSet.slice(-1)[0]) + ".");
    } else {
      return error("The value of the '" + propFullName + "' property should be a " + type + ".");
    }
  };
  validateValueSet = function(props, propFullName, valueSet) {
    var value;
    value = expandProperty(props, propFullName);
    if (!((value != null) && valueSet.indexOf(value) < 0)) {
      return true;
    }
    return error("The value of the '" + propFullName + "' property should be \"" + (valueSet.slice(0, -1).join('\", \"')) + "\" or \"" + (valueSet.slice(-1)[0]) + "\".");
  };
  return {
    validateTypeSet: validateTypeSet,
    validateValueSet: validateValueSet
  };
})();


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = function(props) {
  var THREE, renderer;
  THREE = __webpack_require__(0);
  renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
  });
  renderer.setSize(props.container.clientWidth, props.container.clientHeight);
  addEventListener('resize', function() {
    return renderer.setSize(props.container.clientWidth, props.container.clientHeight);
  });
  return renderer;
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = function(props) {
  var THREE, composite, hourglasses, i, len, lighting, ref, scene, timeDisplays, unit;
  THREE = __webpack_require__(0);
  lighting = (__webpack_require__(10))(props);
  hourglasses = (__webpack_require__(11))(props);
  timeDisplays = (__webpack_require__(20))(props);
  scene = new THREE.Scene();
  scene.scale.set(props.scale, props.scale, props.scale);
  ref = ['minute', 'hour', 'day'];
  for (i = 0, len = ref.length; i < len; i++) {
    unit = ref[i];
    composite = new THREE.Group();
    composite.name = "composite-" + unit;
    composite.position.x = (function() {
      switch (unit) {
        case 'minute':
          return 0 + 8.2 + props.spacing;
        case 'hour':
          return 0;
        case 'day':
          return 0 - 8.2 - props.spacing;
      }
    })();
    composite.add(lighting, hourglasses[unit], timeDisplays[unit]);
    scene.add(composite);
  }
  return scene;
};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = function(props) {
  var THREE, ambientLight, backLight, fillLight, lightIntensityRatio, lighting, mainLight;
  THREE = __webpack_require__(0);
  lightIntensityRatio = (function() {
    switch (props.theme) {
      case 'lite':
        return 1.0;
      case 'dark':
        return 0.8;
    }
  })();
  mainLight = new THREE.SpotLight(0xffffff, 0.8 * lightIntensityRatio, 200);
  mainLight.position.set(24, 4, 44);
  fillLight = new THREE.SpotLight(0xffffff, 0.5 * lightIntensityRatio, 200);
  fillLight.position.set(-24, -4, 24);
  backLight = new THREE.SpotLight(0xffffff, 0.5 * lightIntensityRatio, 200);
  backLight.position.set(0, 0, -24);
  ambientLight = new THREE.AmbientLight(0xffffff, 0.25 * lightIntensityRatio);
  lighting = new THREE.Group();
  lighting.name = 'lighting';
  lighting.add.apply(lighting, [mainLight, fillLight, backLight, ambientLight]);
  return lighting;
};


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = function(props) {
  var THREE, blobs, bulbs, hourglasses, i, len, main, ref, sands, sides, unit;
  THREE = __webpack_require__(0);
  bulbs = (__webpack_require__(12))(props);
  sides = (__webpack_require__(14))(props);
  sands = (__webpack_require__(16))(props);
  blobs = (__webpack_require__(19))(props);
  hourglasses = {};
  ref = ['minute', 'hour', 'day'];
  for (i = 0, len = ref.length; i < len; i++) {
    unit = ref[i];
    main = new THREE.Group();
    main.name = 'main';
    main.add(bulbs[unit], sides[unit], sands[unit]);
    hourglasses[unit] = new THREE.Group();
    hourglasses[unit].name = 'hourglass';
    hourglasses[unit].add(main);
    if (props.onTableMode) {
      hourglasses[unit].add(blobs[unit]);
    }
  }
  return hourglasses;
};


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = function(props) {
  var THREE, bulbs, geometry, i, imageLoader, jsonLoader, len, material, ref, unit;
  THREE = __webpack_require__(0);
  jsonLoader = new THREE.JSONLoader();
  geometry = jsonLoader.parse(__webpack_require__(13)).geometry;
  geometry.merge(geometry, new THREE.Matrix4().makeRotationY(Math.PI / 2));
  geometry.merge(geometry, new THREE.Matrix4().makeRotationY(Math.PI));
  geometry.merge(geometry, new THREE.Matrix4().makeRotationX(Math.PI));
  geometry.mergeVertices();
  geometry.computeFaceNormals();
  geometry.computeVertexNormals();
  material = new THREE.MeshPhongMaterial({
    color: (function() {
      switch (props.theme) {
        case 'lite':
          return 0xffffff;
        case 'dark':
          return 0x999999;
      }
    })(),
    transparent: true,
    opacity: 0.5,
    shininess: 500,
    reflectivity: 0.5,
    refractionRatio: 0.2
  });
  if (props.environment != null) {
    imageLoader = new THREE.ImageLoader();
    imageLoader.crossOrigin = '';
    imageLoader.load(props.environment, function(image) {
      var offscreenCanvas;
      offscreenCanvas = document.createElement('canvas');
      offscreenCanvas.width = 512;
      offscreenCanvas.height = 512;
      (offscreenCanvas.getContext('2d')).drawImage(image, 0, 0, 512, 512);
      material.envMap = new THREE.CubeTexture([0, 1, 2, 3, 4, 5].map(function() {
        return offscreenCanvas;
      }));
      material.envMap.mapping = THREE.CubeRefractionMapping;
      material.envMap.format = THREE.RGBFormat;
      material.envMap.needsUpdate = true;
      return material.needsUpdate = true;
    });
  }
  bulbs = {};
  ref = ['minute', 'hour', 'day'];
  for (i = 0, len = ref.length; i < len; i++) {
    unit = ref[i];
    bulbs[unit] = new THREE.Mesh(geometry, material);
    bulbs[unit].name = 'bulbs';
    bulbs[unit].renderOrder = 1;
    bulbs[unit].scale.set(0.01, 0.01, 0.01);
  }
  return bulbs;
};


/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = {"metadata":{"generator":"io_three","version":3,"type":"Geometry","vertices":459,"faces":416},"vertices":[304,596,30,293,596,89,270,596,144,236,596,194,194,596,236,144,596,270,89,596,293,30,596,304,11,77,108,16,129,160,23,214,235,28,300,289,32,386,322,33,471,332,31,77,103,47,129,154,69,214,226,84,300,278,94,386,310,97,471,319,51,77,95,76,129,142,111,214,209,137,300,256,153,386,286,157,471,294,69,77,84,102,129,124,150,214,183,184,300,225,205,386,250,211,471,258,84,77,69,124,129,102,183,214,150,225,300,184,250,386,205,258,471,211,95,77,51,142,129,76,209,214,111,256,300,137,286,386,153,294,471,157,103,77,31,154,129,47,226,214,69,278,300,84,310,386,94,319,471,97,108,77,11,160,129,16,235,214,23,289,300,28,322,386,32,332,471,33,34,9,3,45,26,4,67,43,7,87,60,9,32,9,10,43,26,13,64,43,19,84,60,26,30,9,16,40,26,21,59,43,32,78,60,41,26,9,21,35,26,29,52,43,42,68,60,56,21,9,26,29,26,35,42,43,52,56,60,68,16,9,30,21,26,40,32,43,59,41,60,78,10,9,32,13,26,43,19,43,64,26,60,84,3,9,34,4,26,45,7,43,67,9,60,87,235,600,193,193,600,235,303,600,30,144,600,269,291,600,88,88,600,291,269,600,144,30,600,303,31,553,318,93,553,306,151,553,282,203,553,247,247,553,203,282,553,151,306,553,93,318,553,31,34,9,0,34,0,3,303,599,30,33,9,7,32,0,10,292,599,88,31,9,13,30,0,16,269,599,144,28,9,19,26,0,21,236,599,193,24,9,24,21,0,26,193,599,236,19,9,28,16,0,30,144,599,269,13,9,31,10,0,32,88,599,292,7,9,33,3,0,34,30,599,303,0,9,34,319,553,0,333,471,0,324,386,0,291,300,0,236,214,0,161,129,0,313,553,62,327,471,65,318,386,63,285,300,57,232,214,46,158,129,31,295,553,122,308,471,128,299,386,124,269,300,111,218,214,90,149,129,62,266,553,177,277,471,185,269,386,180,242,300,162,197,214,131,134,129,89,226,553,226,236,471,236,229,386,229,206,300,206,167,214,167,114,129,114,177,553,266,185,471,277,180,386,269,162,300,242,131,214,197,89,129,134,122,553,295,128,471,308,124,386,299,111,300,269,90,214,218,62,129,149,62,553,313,65,471,327,63,386,318,57,300,285,46,214,232,31,129,158,0,553,319,0,471,333,0,386,324,0,300,291,0,214,236,0,129,161,12,94,126,20,171,200,26,257,265,30,343,308,33,429,330,32,513,327,37,94,121,58,171,193,77,257,255,90,343,297,96,429,317,95,513,315,60,94,111,95,171,178,125,257,235,146,343,273,156,429,293,155,513,290,80,94,98,128,171,156,169,257,206,197,343,240,210,429,256,209,513,254,98,94,80,156,171,128,206,257,169,240,343,197,256,429,210,254,513,209,111,94,60,178,171,95,235,257,125,273,343,146,293,429,156,290,513,155,121,94,37,193,171,58,255,257,77,297,343,90,317,429,96,315,513,95,126,94,12,200,171,20,265,257,26,308,343,30,330,429,33,327,513,32,108,77,0,88,60,0,67,43,0,45,26,0,106,77,21,86,60,17,66,43,13,44,26,9,100,77,41,81,60,34,62,43,26,42,26,17,90,77,60,73,60,49,56,43,37,37,26,25,76,77,76,62,60,62,47,43,47,32,26,32,60,77,90,49,60,73,37,43,56,25,26,37,41,77,100,34,60,81,26,43,62,17,26,42,21,77,106,17,60,86,13,43,66,9,26,44,0,77,108,0,60,88,0,43,67,0,26,45,36,17,4,56,34,5,77,51,8,98,69,10,35,17,11,54,34,16,74,51,22,94,69,28,32,17,17,49,34,26,68,51,37,87,69,46,28,17,23,43,34,36,60,51,49,76,69,62,23,17,28,36,34,43,49,51,60,62,69,76,17,17,32,26,34,49,37,51,68,46,69,87,11,17,35,16,34,54,22,51,74,28,69,94,4,17,36,5,34,56,8,51,77,10,69,98,303,600,30,291,600,88,269,600,144,235,600,193,193,600,235,144,600,269,88,600,291,30,600,303,215,600,215,253,600,169,305,600,0,0,600,305,169,600,253,299,600,59,117,600,281,281,600,117,59,600,299,306,596,0,300,596,60,283,596,117,254,596,170,216,596,216,170,596,254,117,596,283,60,596,300,0,596,306,30,583,308,90,583,297,146,583,273,197,583,240,240,583,197,273,583,146,297,583,90,308,583,30,34,0,0,305,599,0,33,0,7,299,599,59,31,0,13,282,599,117,28,0,19,253,599,169,24,0,24,216,599,216,19,0,28,169,599,253,13,0,31,117,599,282,7,0,33,59,599,299,0,0,34,0,599,305,329,513,0,332,429,0,310,343,0,266,257,0,201,171,0,126,94,0,323,513,64,325,429,65,304,343,60,261,257,52,197,171,39,124,94,25,304,513,126,307,429,127,286,343,119,246,257,102,186,171,77,117,94,48,273,513,183,276,429,184,258,343,172,221,257,148,167,171,112,105,94,70,233,513,233,235,429,235,219,343,219,188,257,188,142,171,142,89,94,89,183,513,273,184,429,276,172,343,258,148,257,221,112,171,167,70,94,105,126,513,304,127,429,307,119,343,286,102,257,246,77,171,186,48,94,117,64,513,323,65,429,325,60,343,304,52,257,261,39,171,197,25,94,124,0,513,329,0,429,332,0,343,310,0,257,266,0,171,201,0,94,126,98,69,0,77,51,0,56,34,0,37,17,0,96,69,19,76,51,15,55,34,11,36,17,7,91,69,38,72,51,30,52,34,21,34,17,14,82,69,54,64,51,43,47,34,31,30,17,20,69,69,69,55,51,55,40,34,40,26,17,26,54,69,82,43,51,64,31,34,47,20,17,30,38,69,91,30,51,72,21,34,52,14,17,34,19,69,96,15,51,76,11,34,55,7,17,36,0,69,98,0,51,77,0,34,56,0,17,37,305,600,0,299,600,59,281,600,117,253,600,169,215,600,215,169,600,253,117,600,281,59,600,299,0,600,305,310,583,0,304,583,60,286,583,119,258,583,172,219,583,219,172,583,258,119,583,286,60,583,304,0,583,310],"faces":[1,0,332,450,316,1,0,316,334,106,1,0,106,336,317,1,0,317,451,332,1,1,331,451,317,1,1,317,336,109,1,1,109,338,318,1,1,318,452,331,1,2,330,452,318,1,2,318,338,112,1,2,112,340,319,1,2,319,453,330,1,3,329,453,319,1,3,319,340,115,1,3,115,342,320,1,3,320,454,329,1,4,328,454,320,1,4,320,342,118,1,4,118,344,321,1,4,321,455,328,1,5,327,455,321,1,5,321,344,121,1,5,121,346,322,1,5,322,456,327,1,6,326,456,322,1,6,322,346,124,1,6,124,348,323,1,6,323,457,326,1,7,325,457,323,1,7,323,348,127,1,7,127,350,324,1,7,324,458,325,1,8,298,433,259,1,8,259,398,183,1,8,183,404,263,1,8,263,437,298,1,9,183,398,176,1,9,176,397,184,1,9,184,403,182,1,9,182,404,183,1,10,184,397,175,1,10,175,396,185,1,10,185,402,181,1,10,181,403,184,1,11,185,396,174,1,11,174,395,186,1,11,186,401,180,1,11,180,402,185,1,12,186,395,173,1,12,173,394,187,1,12,187,400,179,1,12,179,401,186,1,13,187,394,172,1,13,172,393,188,1,13,188,399,178,1,13,178,400,187,1,14,294,429,255,1,14,255,392,189,1,14,189,398,259,1,14,259,433,294,1,15,189,392,170,1,15,170,391,190,1,15,190,397,176,1,15,176,398,189,1,16,190,391,169,1,16,169,390,191,1,16,191,396,175,1,16,175,397,190,1,17,191,390,168,1,17,168,389,192,1,17,192,395,174,1,17,174,396,191,1,18,192,389,167,1,18,167,388,193,1,18,193,394,173,1,18,173,395,192,1,19,193,388,166,1,19,166,387,194,1,19,194,393,172,1,19,172,394,193,1,20,290,425,251,1,20,251,386,195,1,20,195,392,255,1,20,255,429,290,1,21,195,386,164,1,21,164,385,196,1,21,196,391,170,1,21,170,392,195,1,22,196,385,163,1,22,163,384,197,1,22,197,390,169,1,22,169,391,196,1,23,197,384,162,1,23,162,383,198,1,23,198,389,168,1,23,168,390,197,1,24,198,383,161,1,24,161,382,199,1,24,199,388,167,1,24,167,389,198,1,25,199,382,160,1,25,160,381,200,1,25,200,387,166,1,25,166,388,199,1,26,286,421,247,1,26,247,380,201,1,26,201,386,251,1,26,251,425,286,1,27,201,380,158,1,27,158,379,202,1,27,202,385,164,1,27,164,386,201,1,28,202,379,157,1,28,157,378,203,1,28,203,384,163,1,28,163,385,202,1,29,203,378,156,1,29,156,377,204,1,29,204,383,162,1,29,162,384,203,1,30,204,377,155,1,30,155,376,205,1,30,205,382,161,1,30,161,383,204,1,31,205,376,154,1,31,154,375,206,1,31,206,381,160,1,31,160,382,205,1,32,282,417,243,1,32,243,374,207,1,32,207,380,247,1,32,247,421,282,1,33,207,374,152,1,33,152,373,208,1,33,208,379,158,1,33,158,380,207,1,34,208,373,151,1,34,151,372,209,1,34,209,378,157,1,34,157,379,208,1,35,209,372,150,1,35,150,371,210,1,35,210,377,156,1,35,156,378,209,1,36,210,371,149,1,36,149,370,211,1,36,211,376,155,1,36,155,377,210,1,37,211,370,148,1,37,148,369,212,1,37,212,375,154,1,37,154,376,211,1,38,278,413,239,1,38,239,368,213,1,38,213,374,243,1,38,243,417,278,1,39,213,368,146,1,39,146,367,214,1,39,214,373,152,1,39,152,374,213,1,40,214,367,145,1,40,145,366,215,1,40,215,372,151,1,40,151,373,214,1,41,215,366,144,1,41,144,365,216,1,41,216,371,150,1,41,150,372,215,1,42,216,365,143,1,42,143,364,217,1,42,217,370,149,1,42,149,371,216,1,43,217,364,142,1,43,142,363,218,1,43,218,369,148,1,43,148,370,217,1,44,274,409,235,1,44,235,362,219,1,44,219,368,239,1,44,239,413,274,1,45,219,362,140,1,45,140,361,220,1,45,220,367,146,1,45,146,368,219,1,46,220,361,139,1,46,139,360,221,1,46,221,366,145,1,46,145,367,220,1,47,221,360,138,1,47,138,359,222,1,47,222,365,144,1,47,144,366,221,1,48,222,359,137,1,48,137,358,223,1,48,223,364,143,1,48,143,365,222,1,49,223,358,136,1,49,136,357,224,1,49,224,363,142,1,49,142,364,223,1,50,270,405,231,1,50,231,356,225,1,50,225,362,235,1,50,235,409,270,1,51,225,356,134,1,51,134,355,226,1,51,226,361,140,1,51,140,362,225,1,52,226,355,133,1,52,133,354,227,1,52,227,360,139,1,52,139,361,226,1,53,227,354,132,1,53,132,353,228,1,53,228,359,138,1,53,138,360,227,1,54,228,353,131,1,54,131,352,229,1,54,229,358,137,1,54,137,359,228,1,55,229,352,130,1,55,130,351,230,1,55,230,357,136,1,55,136,358,229,1,56,105,333,104,1,56,104,408,267,1,56,267,412,107,1,56,107,335,105,1,57,267,408,234,1,57,234,407,268,1,57,268,411,238,1,57,238,412,267,1,58,268,407,233,1,58,233,406,269,1,58,269,410,237,1,58,237,411,268,1,59,269,406,232,1,59,232,405,270,1,59,270,409,236,1,59,236,410,269,1,60,108,335,107,1,60,107,412,271,1,60,271,416,110,1,60,110,337,108,1,61,271,412,238,1,61,238,411,272,1,61,272,415,242,1,61,242,416,271,1,62,272,411,237,1,62,237,410,273,1,62,273,414,241,1,62,241,415,272,1,63,273,410,236,1,63,236,409,274,1,63,274,413,240,1,63,240,414,273,1,64,111,337,110,1,64,110,416,275,1,64,275,420,113,1,64,113,339,111,1,65,275,416,242,1,65,242,415,276,1,65,276,419,246,1,65,246,420,275,1,66,276,415,241,1,66,241,414,277,1,66,277,418,245,1,66,245,419,276,1,67,277,414,240,1,67,240,413,278,1,67,278,417,244,1,67,244,418,277,1,68,114,339,113,1,68,113,420,279,1,68,279,424,116,1,68,116,341,114,1,69,279,420,246,1,69,246,419,280,1,69,280,423,250,1,69,250,424,279,1,70,280,419,245,1,70,245,418,281,1,70,281,422,249,1,70,249,423,280,1,71,281,418,244,1,71,244,417,282,1,71,282,421,248,1,71,248,422,281,1,72,117,341,116,1,72,116,424,283,1,72,283,428,119,1,72,119,343,117,1,73,283,424,250,1,73,250,423,284,1,73,284,427,254,1,73,254,428,283,1,74,284,423,249,1,74,249,422,285,1,74,285,426,253,1,74,253,427,284,1,75,285,422,248,1,75,248,421,286,1,75,286,425,252,1,75,252,426,285,1,76,120,343,119,1,76,119,428,287,1,76,287,432,122,1,76,122,345,120,1,77,287,428,254,1,77,254,427,288,1,77,288,431,258,1,77,258,432,287,1,78,288,427,253,1,78,253,426,289,1,78,289,430,257,1,78,257,431,288,1,79,289,426,252,1,79,252,425,290,1,79,290,429,256,1,79,256,430,289,1,80,123,345,122,1,80,122,432,291,1,80,291,436,125,1,80,125,347,123,1,81,291,432,258,1,81,258,431,292,1,81,292,435,262,1,81,262,436,291,1,82,292,431,257,1,82,257,430,293,1,82,293,434,261,1,82,261,435,292,1,83,293,430,256,1,83,256,429,294,1,83,294,433,260,1,83,260,434,293,1,84,126,347,125,1,84,125,436,295,1,84,295,440,128,1,84,128,349,126,1,85,295,436,262,1,85,262,435,296,1,85,296,439,266,1,85,266,440,295,1,86,296,435,261,1,86,261,434,297,1,86,297,438,265,1,86,265,439,296,1,87,297,434,260,1,87,260,433,298,1,87,298,437,264,1,87,264,438,297,1,88,307,342,115,1,88,115,340,308,1,88,308,444,302,1,88,302,445,307,1,89,311,344,118,1,89,118,342,307,1,89,307,445,303,1,89,303,446,311,1,90,312,336,106,1,90,106,334,309,1,90,309,441,299,1,90,299,442,312,1,91,313,346,121,1,91,121,344,311,1,91,311,446,304,1,91,304,447,313,1,92,314,338,109,1,92,109,336,312,1,92,312,442,300,1,92,300,443,314,1,93,315,348,124,1,93,124,346,313,1,93,313,447,305,1,93,305,448,315,1,94,308,340,112,1,94,112,338,314,1,94,314,443,301,1,94,301,444,308,1,95,310,350,127,1,95,127,348,315,1,95,315,448,306,1,95,306,449,310,1,96,188,393,171,1,96,171,457,325,1,96,325,458,177,1,96,177,399,188,1,97,194,387,165,1,97,165,456,326,1,97,326,457,171,1,97,171,393,194,1,98,200,381,159,1,98,159,455,327,1,98,327,456,165,1,98,165,387,200,1,99,206,375,153,1,99,153,454,328,1,99,328,455,159,1,99,159,381,206,1,100,212,369,147,1,100,147,453,329,1,100,329,454,153,1,100,153,375,212,1,101,218,363,141,1,101,141,452,330,1,101,330,453,147,1,101,147,369,218,1,102,224,357,135,1,102,135,451,331,1,102,331,452,141,1,102,141,363,224,1,103,230,351,129,1,103,129,450,332,1,103,332,451,135,1,103,135,357,230]}

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = function(props) {
  var THREE, geometry, i, jsonLoader, len, material, ref, sides, unit;
  THREE = __webpack_require__(0);
  jsonLoader = new THREE.JSONLoader();
  geometry = jsonLoader.parse(__webpack_require__(15)).geometry;
  geometry.merge(geometry, new THREE.Matrix4().makeRotationY(Math.PI / 2));
  geometry.merge(geometry, new THREE.Matrix4().makeRotationY(Math.PI));
  geometry.merge(geometry, new THREE.Matrix4().makeRotationX(Math.PI));
  geometry.mergeVertices();
  geometry.computeFaceNormals();
  geometry.computeVertexNormals();
  sides = {};
  ref = ['minute', 'hour', 'day'];
  for (i = 0, len = ref.length; i < len; i++) {
    unit = ref[i];
    material = new THREE.MeshPhongMaterial({
      color: (new THREE.Color(props.hourglasses[unit].sides.color)).multiplyScalar((function() {
        switch (props.theme) {
          case 'lite':
            return 1.0;
          case 'dark':
            return 0.9;
        }
      })()),
      shininess: (function() {
        switch (props.hourglasses[unit].sides.material) {
          case 'matte':
            return 5;
          case 'plastic':
            return 50;
          case 'glossy':
            return 1200;
        }
      })()
    });
    sides[unit] = new THREE.Mesh(geometry, material);
    sides[unit].name = 'sides';
    sides[unit].renderOrder = 2;
    sides[unit].scale.set(0.01, 0.01, 0.01);
  }
  return sides;
};


/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = {"metadata":{"generator":"io_three","version":3,"type":"Geometry","vertices":393,"faces":368},"vertices":[213,620,259,158,620,295,97,620,321,33,620,333,333,620,33,321,620,97,295,620,158,259,620,213,33,640,333,333,640,33,321,640,97,295,640,158,259,640,213,213,640,259,158,640,295,97,640,321,367,640,36,353,640,107,325,640,174,285,640,234,234,640,285,174,640,325,107,640,353,36,640,367,400,761,39,385,761,117,355,761,189,311,761,255,255,761,311,189,761,355,117,761,385,39,761,400,370,770,36,356,770,108,328,770,175,287,770,236,236,770,287,175,770,328,108,770,356,36,770,370,333,600,33,321,600,97,295,600,158,259,600,213,213,600,259,158,600,295,97,600,321,33,600,333,202,600,246,150,600,281,92,600,305,31,600,317,317,600,31,305,600,92,281,600,150,246,600,202,39,649,400,39,705,400,117,649,385,117,705,385,189,649,355,189,705,355,255,649,311,255,705,311,311,649,255,311,705,255,355,649,189,355,705,189,385,649,117,385,705,117,400,649,39,400,705,39,38,770,390,114,770,375,185,770,346,249,770,303,303,770,249,346,770,185,375,770,114,390,770,38,24,770,240,70,770,231,114,770,213,153,770,186,186,770,153,213,770,114,231,770,70,240,770,24,200,600,20,192,600,58,177,600,95,155,600,128,128,600,155,95,600,177,58,600,192,20,600,200,333,605,33,321,605,97,295,605,158,259,605,213,213,605,259,158,605,295,97,605,321,33,605,333,333,635,33,321,635,97,295,635,158,259,635,213,213,635,259,158,635,295,97,635,321,33,635,333,186,620,279,237,620,237,128,620,309,65,620,329,0,620,335,335,620,0,329,620,65,309,620,128,279,620,186,342,640,34,329,640,100,303,640,162,265,640,218,218,640,265,162,640,303,100,640,329,34,640,342,0,640,335,65,640,329,335,640,0,329,640,65,309,640,128,279,640,186,237,640,237,186,640,279,128,640,309,392,642,39,377,642,114,347,642,186,304,642,250,250,642,304,186,642,347,114,642,377,39,642,392,368,640,0,361,640,72,340,640,141,306,640,205,261,640,261,205,640,306,141,640,340,72,640,361,0,640,368,398,768,39,382,768,116,352,768,188,309,768,253,253,768,309,188,768,352,116,768,382,39,768,398,394,649,78,402,761,0,371,649,154,334,649,223,284,649,284,223,649,334,154,649,371,78,649,394,0,649,402,333,770,33,320,770,97,295,770,158,258,770,212,212,770,258,158,770,295,97,770,320,33,770,333,392,770,0,384,770,76,362,770,150,326,770,218,277,770,277,218,770,326,150,770,362,76,770,384,0,770,392,329,600,32,317,600,96,292,600,156,256,600,210,210,600,256,156,600,292,96,600,317,32,600,329,0,600,335,335,600,0,329,600,65,309,600,128,279,600,186,237,600,237,186,600,279,128,600,309,65,600,329,279,600,27,268,600,81,247,600,132,217,600,178,178,600,217,132,600,247,81,600,268,27,600,279,177,600,265,225,600,225,122,600,294,62,600,312,0,600,318,318,600,0,312,600,62,294,600,122,265,600,177,394,761,78,394,705,78,402,649,0,402,705,0,371,761,154,371,705,154,334,761,223,334,705,223,284,761,284,284,705,284,223,761,334,223,705,334,154,761,371,154,705,371,78,761,394,78,705,394,0,761,402,0,705,402,39,668,400,39,742,400,117,668,385,117,742,385,189,668,355,189,742,355,255,668,311,255,742,311,311,668,255,311,742,255,355,668,189,355,742,189,385,668,117,385,742,117,400,668,39,400,742,39,372,770,0,365,770,73,344,770,142,309,770,207,263,770,263,207,770,309,142,770,344,73,770,365,0,770,372,37,770,380,111,770,365,180,770,337,242,770,295,295,770,242,337,770,180,365,770,111,380,770,37,0,770,211,41,770,207,81,770,195,117,770,175,149,770,149,175,770,117,195,770,81,207,770,41,211,770,0,176,600,0,172,600,34,162,600,67,146,600,98,124,600,124,98,600,146,67,600,162,34,600,172,0,600,176,335,605,0,329,605,65,309,605,128,279,605,186,237,605,237,186,605,279,128,605,309,65,605,329,0,605,335,335,635,0,329,635,65,309,635,128,279,635,186,237,635,237,186,635,279,128,635,309,65,635,329,0,635,335,343,640,0,337,640,67,317,640,131,285,640,191,243,640,243,191,640,285,131,640,317,67,640,337,0,640,343,394,642,0,386,642,77,364,642,151,327,642,219,278,642,278,219,642,327,151,642,364,77,642,386,0,642,394,399,768,0,392,768,78,369,768,153,332,768,222,282,768,282,222,768,332,153,768,369,78,768,392,0,768,399,327,770,0,320,770,64,302,770,125,272,770,181,231,770,231,181,770,272,125,770,302,64,770,320,0,770,327,331,600,0,324,600,65,306,600,127,275,600,184,234,600,234,184,600,275,127,600,306,65,600,324,0,600,331,274,600,0,269,600,54,253,600,105,228,600,152,194,600,194,152,600,228,105,600,253,54,600,269,0,600,274,394,742,78,394,668,78,402,668,0,402,742,0,371,742,154,371,668,154,334,742,223,334,668,223,284,742,284,284,668,284,223,742,334,223,668,334,154,742,371,154,668,371,78,742,394,78,668,394,0,742,402,0,668,402,382,770,0,375,770,75,353,770,146,318,770,212,270,770,270,212,770,318,146,770,353,75,770,375,0,770,382,0,770,0,0,600,0],"faces":[1,0,112,297,100,1,0,100,296,113,1,0,113,305,108,1,0,108,306,112,1,1,114,298,101,1,1,101,297,112,1,1,112,306,109,1,1,109,307,114,1,2,115,299,102,1,2,102,298,114,1,2,114,307,110,1,2,110,308,115,1,3,116,300,103,1,3,103,299,115,1,3,115,308,111,1,3,111,309,116,1,4,118,293,96,1,4,96,292,117,1,4,117,301,104,1,4,104,302,118,1,5,119,294,97,1,5,97,293,118,1,5,118,302,105,1,5,105,303,119,1,6,120,295,98,1,6,98,294,119,1,6,119,303,106,1,6,106,304,120,1,7,113,296,99,1,7,99,295,120,1,7,120,304,107,1,7,107,305,113,1,8,129,309,111,1,8,111,308,130,1,8,130,317,128,1,8,128,318,129,1,9,132,302,104,1,9,104,301,131,1,9,131,310,121,1,9,121,311,132,1,10,133,303,105,1,10,105,302,132,1,10,132,311,122,1,10,122,312,133,1,11,134,304,106,1,11,106,303,133,1,11,133,312,123,1,11,123,313,134,1,12,135,305,107,1,12,107,304,134,1,12,134,313,124,1,12,124,314,135,1,13,136,306,108,1,13,108,305,135,1,13,135,314,125,1,13,125,315,136,1,14,137,307,109,1,14,109,306,136,1,14,136,315,126,1,14,126,316,137,1,15,130,308,110,1,15,110,307,137,1,15,137,316,127,1,15,127,317,130,1,16,147,311,121,1,16,121,310,146,1,16,146,319,138,1,16,138,320,147,1,17,148,312,122,1,17,122,311,147,1,17,147,320,139,1,17,139,321,148,1,18,149,313,123,1,18,123,312,148,1,18,148,321,140,1,18,140,322,149,1,19,150,314,124,1,19,124,313,149,1,19,149,322,141,1,19,141,323,150,1,20,151,315,125,1,20,125,314,150,1,20,150,323,142,1,20,142,324,151,1,21,152,316,126,1,21,126,315,151,1,21,151,324,143,1,21,143,325,152,1,22,153,317,127,1,22,127,316,152,1,22,152,325,144,1,22,144,326,153,1,23,154,318,128,1,23,128,317,153,1,23,153,326,145,1,23,145,327,154,1,24,223,364,256,1,24,256,367,164,1,24,164,328,155,1,24,155,329,223,1,25,227,368,254,1,25,254,364,223,1,25,223,329,156,1,25,156,330,227,1,26,229,370,252,1,26,252,368,227,1,26,227,330,157,1,26,157,331,229,1,27,231,372,250,1,27,250,370,229,1,27,229,331,158,1,27,158,332,231,1,28,233,374,248,1,28,248,372,231,1,28,231,332,159,1,28,159,333,233,1,29,235,376,246,1,29,246,374,233,1,29,233,333,160,1,29,160,334,235,1,30,237,378,244,1,30,244,376,235,1,30,235,334,161,1,30,161,335,237,1,31,239,380,242,1,31,242,378,237,1,31,237,335,162,1,31,162,336,239,1,32,258,383,273,1,32,273,382,257,1,32,257,337,172,1,32,172,338,258,1,33,259,384,272,1,33,272,383,258,1,33,258,338,173,1,33,173,339,259,1,34,260,385,271,1,34,271,384,259,1,34,259,339,174,1,34,174,340,260,1,35,261,386,270,1,35,270,385,260,1,35,260,340,175,1,35,175,341,261,1,36,262,387,269,1,36,269,386,261,1,36,261,341,176,1,36,176,342,262,1,37,263,388,268,1,37,268,387,262,1,37,262,342,177,1,37,177,343,263,1,38,264,389,267,1,38,267,388,263,1,38,263,343,178,1,38,178,344,264,1,39,265,390,266,1,39,266,389,264,1,39,264,344,179,1,39,179,345,265,1,40,198,292,96,1,40,96,293,199,1,40,199,347,189,1,40,189,346,198,1,41,199,293,97,1,41,97,294,200,1,41,200,348,190,1,41,190,347,199,1,42,200,294,98,1,42,98,295,201,1,42,201,349,191,1,42,191,348,200,1,43,201,295,99,1,43,99,296,202,1,43,202,350,192,1,43,192,349,201,1,44,202,296,100,1,44,100,297,203,1,44,203,351,193,1,44,193,350,202,1,45,203,297,101,1,45,101,298,204,1,45,204,352,194,1,45,194,351,203,1,46,204,298,102,1,46,102,299,205,1,46,205,353,195,1,46,195,352,204,1,47,205,299,103,1,47,103,300,197,1,47,197,354,196,1,47,196,353,205,1,48,215,350,193,1,48,193,351,214,1,48,214,360,210,1,48,210,359,215,1,49,214,351,194,1,49,194,352,216,1,49,216,361,211,1,49,211,360,214,1,50,216,352,195,1,50,195,353,217,1,50,217,362,212,1,50,212,361,216,1,51,217,353,196,1,51,196,354,218,1,51,218,363,213,1,51,213,362,217,1,52,219,346,189,1,52,189,347,220,1,52,220,356,206,1,52,206,355,219,1,53,220,347,190,1,53,190,348,221,1,53,221,357,207,1,53,207,356,220,1,54,221,348,191,1,54,191,349,222,1,54,222,358,208,1,54,208,357,221,1,55,222,349,192,1,55,192,350,215,1,55,215,359,209,1,55,209,358,222,1,56,171,327,145,1,56,145,326,170,1,56,170,379,241,1,56,241,381,171,1,57,240,381,241,1,57,241,379,238,1,57,238,378,242,1,57,242,380,240,1,58,170,326,144,1,58,144,325,169,1,58,169,377,243,1,58,243,379,170,1,59,238,379,243,1,59,243,377,236,1,59,236,376,244,1,59,244,378,238,1,60,169,325,143,1,60,143,324,168,1,60,168,375,245,1,60,245,377,169,1,61,236,377,245,1,61,245,375,234,1,61,234,374,246,1,61,246,376,236,1,62,168,324,142,1,62,142,323,167,1,62,167,373,247,1,62,247,375,168,1,63,234,375,247,1,63,247,373,232,1,63,232,372,248,1,63,248,374,234,1,64,167,323,141,1,64,141,322,166,1,64,166,371,249,1,64,249,373,167,1,65,232,373,249,1,65,249,371,230,1,65,230,370,250,1,65,250,372,232,1,66,166,322,140,1,66,140,321,165,1,66,165,369,251,1,66,251,371,166,1,67,230,371,251,1,67,251,369,228,1,67,228,368,252,1,67,252,370,230,1,68,165,321,139,1,68,139,320,163,1,68,163,365,253,1,68,253,369,165,1,69,228,369,253,1,69,253,365,224,1,69,224,364,254,1,69,254,368,228,1,70,163,320,138,1,70,138,319,225,1,70,225,366,255,1,70,255,365,163,1,71,224,365,255,1,71,255,366,226,1,71,226,367,256,1,71,256,364,224,1,72,188,336,162,1,72,162,335,187,1,72,187,389,266,1,72,266,390,188,1,73,187,335,161,1,73,161,334,186,1,73,186,388,267,1,73,267,389,187,1,74,186,334,160,1,74,160,333,185,1,74,185,387,268,1,74,268,388,186,1,75,185,333,159,1,75,159,332,184,1,75,184,386,269,1,75,269,387,185,1,76,184,332,158,1,76,158,331,183,1,76,183,385,270,1,76,270,386,184,1,77,183,331,157,1,77,157,330,182,1,77,182,384,271,1,77,271,385,183,1,78,182,330,156,1,78,156,329,181,1,78,181,383,272,1,78,272,384,182,1,79,181,329,155,1,79,155,328,180,1,79,180,382,273,1,79,273,383,181,1,80,274,345,179,1,80,179,344,275,1,80,275,391,274,1,81,275,344,178,1,81,178,343,276,1,81,276,391,275,1,82,276,343,177,1,82,177,342,277,1,82,277,391,276,1,83,277,342,176,1,83,176,341,278,1,83,278,391,277,1,84,278,341,175,1,84,175,340,279,1,84,279,391,278,1,85,279,340,174,1,85,174,339,280,1,85,280,391,279,1,86,280,339,173,1,86,173,338,281,1,86,281,391,280,1,87,281,338,172,1,87,172,337,282,1,87,282,391,281,1,88,283,355,206,1,88,206,356,284,1,88,284,392,283,1,89,284,356,207,1,89,207,357,285,1,89,285,392,284,1,90,285,357,208,1,90,208,358,286,1,90,286,392,285,1,91,286,358,209,1,91,209,359,287,1,91,287,392,286,1,92,287,359,210,1,92,210,360,288,1,92,288,392,287,1,93,288,360,211,1,93,211,361,289,1,93,289,392,288,1,94,289,361,212,1,94,212,362,290,1,94,290,392,289,1,95,290,362,213,1,95,213,363,291,1,95,291,392,290]}

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = function(props) {
  var THREE, i, j, jsonLoader, k, len, lowerSand, lowerSandGeometry, lowerSandPart, ref, sandMaterial, sands, stream, streamGeometry, streamMaterial, unit, upperSand, upperSandGeometry, upperSandPart;
  THREE = __webpack_require__(0);
  jsonLoader = new THREE.JSONLoader();
  lowerSandGeometry = (jsonLoader.parse(__webpack_require__(17))).geometry;
  upperSandGeometry = (jsonLoader.parse(__webpack_require__(18))).geometry;
  [lowerSandGeometry, upperSandGeometry].forEach(function(geometry) {
    geometry.computeFaceNormals();
    return geometry.computeVertexNormals();
  });
  streamGeometry = new THREE.CylinderGeometry(0.05, 0.05, 5.8, 3);
  sands = {};
  ref = ['minute', 'hour', 'day'];
  for (j = 0, len = ref.length; j < len; j++) {
    unit = ref[j];
    sandMaterial = new THREE.MeshLambertMaterial({
      color: new THREE.Color(props.hourglasses[unit].sands.color),
      transparent: true,
      opacity: 1,
      morphTargets: true,
      side: THREE.DoubleSide
    });
    lowerSand = new THREE.Group();
    lowerSand.name = 'sand-lower';
    upperSand = new THREE.Group();
    upperSand.name = 'sand-upper';
    for (i = k = 0; k < 4; i = ++k) {
      lowerSandPart = new THREE.Mesh(lowerSandGeometry, sandMaterial);
      upperSandPart = new THREE.Mesh(upperSandGeometry, sandMaterial);
      [lowerSandPart, upperSandPart].forEach(function(part) {
        part.rotation.y = i * Math.PI / 2;
        return part.scale.set(0.01, 0.01, 0.01);
      });
      lowerSand.add(lowerSandPart);
      upperSand.add(upperSandPart);
    }
    streamMaterial = new THREE.MeshBasicMaterial({
      color: (new THREE.Color(props.hourglasses[unit].sands.color)).multiplyScalar(0.5),
      transparent: true,
      opacity: 1
    });
    stream = new THREE.Mesh(streamGeometry, streamMaterial);
    stream.name = 'stream';
    stream.position.y = -2.8;
    sands[unit] = new THREE.Group();
    sands[unit].name = 'sands';
    sands[unit].add(lowerSand, upperSand, stream);
  }
  return sands;
};


/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = {"metadata":{"generator":"io_three","version":3,"type":"Geometry","vertices":409,"faces":376,"morphTargets":10},"vertices":[27,-313,274,30,-390,303,31,-471,312,80,-313,263,88,-390,291,91,-471,300,130,-313,243,144,-390,269,148,-471,276,175,-313,213,193,-390,235,199,-471,242,213,-313,175,235,-390,193,242,-471,199,243,-313,130,269,-390,144,276,-471,148,263,-313,80,291,-390,88,300,-471,91,274,-313,27,303,-390,30,312,-471,31,29,-548,299,87,-548,287,141,-548,265,190,-548,232,232,-548,190,265,-548,141,287,-548,87,299,-548,29,211,-268,113,113,-268,211,229,-268,69,152,-268,185,23,-268,238,238,-268,23,185,-268,152,69,-268,229,253,-272,25,243,-272,74,224,-272,120,196,-272,161,161,-272,196,120,-272,224,74,-272,243,25,-272,253,136,-239,73,20,-262,203,59,-262,195,96,-262,180,129,-262,158,158,-262,129,180,-262,96,195,-262,59,203,-262,20,148,-239,45,153,-239,15,15,-239,153,45,-239,148,73,-239,136,98,-239,119,119,-239,98,10,-193,101,29,-193,97,48,-193,90,64,-193,79,79,-193,64,90,-193,48,97,-193,29,101,-193,10,2,-108,21,6,-136,57,17,-136,55,27,-136,50,36,-136,44,44,-136,36,50,-136,27,55,-136,17,57,-136,6,6,-108,20,10,-108,18,13,-108,16,16,-108,13,18,-108,10,20,-108,6,21,-108,2,3,-108,0,2,-108,1,2,-108,1,2,-108,2,2,-108,2,1,-108,2,1,-108,2,0,-108,3,300,-548,0,314,-471,0,305,-390,0,254,-272,0,294,-548,59,307,-471,61,299,-390,59,249,-272,50,277,-548,115,290,-471,120,281,-390,117,235,-272,97,249,-548,167,261,-471,174,253,-390,169,211,-272,141,212,-548,212,222,-471,222,215,-390,215,180,-272,180,167,-548,249,174,-471,261,169,-390,253,141,-272,211,115,-548,277,120,-471,290,117,-390,281,97,-272,235,59,-548,294,61,-471,307,59,-390,299,50,-272,249,0,-548,300,0,-471,314,0,-390,305,0,-272,254,24,-269,248,29,-351,290,31,-431,311,30,-510,308,72,-269,239,85,-351,279,91,-431,299,90,-510,296,118,-269,220,138,-351,257,147,-431,275,146,-510,273,158,-269,193,185,-351,226,198,-431,241,196,-510,239,193,-269,158,226,-351,185,241,-431,198,239,-510,196,220,-269,118,257,-351,138,275,-431,147,273,-510,146,239,-269,72,279,-351,85,299,-431,91,296,-510,90,248,-269,24,290,-351,29,311,-431,31,308,-510,30,28,-585,287,84,-585,276,136,-585,254,183,-585,223,223,-585,183,254,-585,136,276,-585,84,287,-585,28,22,-266,223,65,-266,215,106,-266,198,142,-266,173,173,-266,142,198,-266,106,215,-266,65,223,-266,22,239,-268,0,199,-268,133,221,-268,92,92,-268,221,133,-268,199,0,-268,239,235,-268,47,169,-268,169,47,-268,235,275,-313,0,270,-313,54,254,-313,105,229,-313,153,195,-313,195,153,-313,229,105,-313,254,54,-313,270,0,-313,275,259,-284,26,249,-284,76,230,-284,123,201,-284,165,165,-284,201,123,-284,230,76,-284,249,26,-284,259,18,-254,179,52,-254,173,85,-254,159,114,-254,139,139,-254,114,159,-254,85,173,-254,52,179,-254,18,0,-262,204,40,-262,200,78,-262,189,113,-262,170,144,-262,144,170,-262,113,189,-262,78,200,-262,40,204,-262,0,12,-218,127,37,-218,122,60,-218,112,81,-218,99,99,-218,81,112,-218,60,122,-218,37,127,-218,12,128,-239,86,142,-239,59,151,-239,30,154,-239,0,0,-239,154,30,-239,151,59,-239,142,86,-239,128,109,-239,109,8,-164,77,23,-164,74,37,-164,69,49,-164,60,60,-164,49,69,-164,37,74,-164,23,77,-164,8,102,-193,0,0,-193,102,20,-193,100,39,-193,94,56,-193,84,72,-193,72,84,-193,56,94,-193,39,100,-193,20,4,-115,38,11,-115,37,18,-115,34,24,-115,30,30,-115,24,34,-115,18,37,-115,11,38,-115,4,0,-136,57,11,-136,56,22,-136,53,32,-136,48,40,-136,40,48,-136,32,53,-136,22,56,-136,11,57,-136,0,1,-108,8,2,-108,7,4,-108,7,5,-108,6,6,-108,5,7,-108,4,7,-108,2,8,-108,1,0,-108,21,4,-108,21,8,-108,19,12,-108,17,15,-108,15,17,-108,12,19,-108,8,21,-108,4,21,-108,0,2,-108,0,2,-108,0,2,-108,1,2,-108,1,2,-108,2,1,-108,2,1,-108,2,0,-108,2,0,-108,2,309,-510,0,312,-431,0,292,-351,0,249,-269,0,303,-510,60,306,-431,61,286,-351,57,245,-269,49,286,-510,118,288,-431,119,270,-351,112,230,-269,95,257,-510,172,260,-431,173,243,-351,162,207,-269,139,219,-510,219,221,-431,221,206,-351,206,176,-269,176,172,-510,257,173,-431,260,162,-351,243,139,-269,207,118,-510,286,119,-431,288,112,-351,270,95,-269,230,60,-510,303,61,-431,306,57,-351,286,49,-269,245,0,-510,309,0,-431,312,0,-351,292,0,-269,249,288,-585,0,283,-585,56,266,-585,110,240,-585,160,204,-585,204,160,-585,240,110,-585,266,56,-585,283,0,-585,288,0,-266,224,44,-266,220,86,-266,207,125,-266,186,159,-266,159,186,-266,125,207,-266,86,220,-266,44,224,-266,0,260,-284,0,255,-284,51,241,-284,100,217,-284,145,184,-284,184,145,-284,217,100,-284,241,51,-284,255,0,-284,260,0,-254,180,35,-254,177,69,-254,167,100,-254,150,127,-254,127,150,-254,100,167,-254,69,177,-254,35,180,-254,0,0,-218,127,25,-218,125,49,-218,118,71,-218,106,90,-218,90,106,-218,71,118,-218,49,125,-218,25,127,-218,0,0,-164,78,15,-164,76,30,-164,72,43,-164,65,55,-164,55,65,-164,43,72,-164,30,76,-164,15,78,-164,0,0,-115,39,8,-115,38,15,-115,36,21,-115,32,27,-115,27,32,-115,21,36,-115,15,38,-115,8,39,-115,0,0,-108,8,2,-108,8,3,-108,7,4,-108,6,5,-108,5,6,-108,4,7,-108,3,8,-108,2,8,-108,0,0,-108,0],"faces":[1,0,205,361,196,1,0,196,330,133,1,0,133,334,197,1,0,197,362,205,1,1,133,330,126,1,1,126,329,134,1,1,134,333,130,1,1,130,334,133,1,2,134,329,125,1,2,125,328,135,1,2,135,332,129,1,2,129,333,134,1,3,204,360,195,1,3,195,326,137,1,3,137,330,196,1,3,196,361,204,1,4,137,326,122,1,4,122,325,138,1,4,138,329,126,1,4,126,330,137,1,5,138,325,121,1,5,121,324,139,1,5,139,328,125,1,5,125,329,138,1,6,203,359,194,1,6,194,322,141,1,6,141,326,195,1,6,195,360,203,1,7,141,322,118,1,7,118,321,142,1,7,142,325,122,1,7,122,326,141,1,8,142,321,117,1,8,117,320,143,1,8,143,324,121,1,8,121,325,142,1,9,202,358,193,1,9,193,318,145,1,9,145,322,194,1,9,194,359,202,1,10,145,318,114,1,10,114,317,146,1,10,146,321,118,1,10,118,322,145,1,11,146,317,113,1,11,113,316,147,1,11,147,320,117,1,11,117,321,146,1,12,201,357,192,1,12,192,314,149,1,12,149,318,193,1,12,193,358,201,1,13,149,314,110,1,13,110,313,150,1,13,150,317,114,1,13,114,318,149,1,14,150,313,109,1,14,109,312,151,1,14,151,316,113,1,14,113,317,150,1,15,200,356,191,1,15,191,310,153,1,15,153,314,192,1,15,192,357,200,1,16,153,310,106,1,16,106,309,154,1,16,154,313,110,1,16,110,314,153,1,17,154,309,105,1,17,105,308,155,1,17,155,312,109,1,17,109,313,154,1,18,199,355,190,1,18,190,306,157,1,18,157,310,191,1,18,191,356,199,1,19,157,306,102,1,19,102,305,158,1,19,158,309,106,1,19,106,310,157,1,20,158,305,101,1,20,101,304,159,1,20,159,308,105,1,20,105,309,158,1,21,198,354,189,1,21,189,302,161,1,21,161,306,190,1,21,190,355,198,1,22,161,302,98,1,22,98,301,162,1,22,162,305,102,1,22,102,306,161,1,23,162,301,97,1,23,97,300,163,1,23,163,304,101,1,23,101,305,162,1,24,135,328,124,1,24,124,343,164,1,24,164,344,128,1,24,128,332,135,1,25,139,324,120,1,25,120,342,165,1,25,165,343,124,1,25,124,328,139,1,26,143,320,116,1,26,116,341,166,1,26,166,342,120,1,26,120,324,143,1,27,147,316,112,1,27,112,340,167,1,27,167,341,116,1,27,116,320,147,1,28,151,312,108,1,28,108,339,168,1,28,168,340,112,1,28,112,316,151,1,29,155,308,104,1,29,104,338,169,1,29,169,339,108,1,29,108,312,155,1,30,159,304,100,1,30,100,337,170,1,30,170,338,104,1,30,104,308,159,1,31,163,300,96,1,31,96,336,171,1,31,171,337,100,1,31,100,304,163,1,32,182,311,152,1,32,152,315,181,1,32,181,350,177,1,32,177,351,182,1,33,184,323,140,1,33,140,327,183,1,33,183,347,174,1,33,174,348,184,1,34,186,307,156,1,34,156,311,182,1,34,182,351,178,1,34,178,352,186,1,35,187,319,144,1,35,144,323,184,1,35,184,348,175,1,35,175,349,187,1,36,188,331,132,1,36,132,335,185,1,36,185,345,172,1,36,172,346,188,1,37,180,303,160,1,37,160,307,186,1,37,186,352,179,1,37,179,353,180,1,38,181,315,148,1,38,148,319,187,1,38,187,349,176,1,38,176,350,181,1,39,183,327,136,1,39,136,331,188,1,39,188,346,173,1,39,173,347,183,1,40,160,303,99,1,40,99,354,198,1,40,198,355,103,1,40,103,307,160,1,41,156,307,103,1,41,103,355,199,1,41,199,356,107,1,41,107,311,156,1,42,152,311,107,1,42,107,356,200,1,42,200,357,111,1,42,111,315,152,1,43,148,315,111,1,43,111,357,201,1,43,201,358,115,1,43,115,319,148,1,44,144,319,115,1,44,115,358,202,1,44,202,359,119,1,44,119,323,144,1,45,140,323,119,1,45,119,359,203,1,45,203,360,123,1,45,123,327,140,1,46,136,327,123,1,46,123,360,204,1,46,204,361,127,1,46,127,331,136,1,47,132,331,127,1,47,127,361,205,1,47,205,362,131,1,47,131,335,132,1,48,232,369,211,1,48,211,368,231,1,48,231,377,228,1,48,228,378,232,1,49,215,346,172,1,49,172,345,214,1,49,214,363,206,1,49,206,364,215,1,50,216,347,173,1,50,173,346,215,1,50,215,364,207,1,50,207,365,216,1,51,217,348,174,1,51,174,347,216,1,51,216,365,208,1,51,208,366,217,1,52,218,349,175,1,52,175,348,217,1,52,217,366,209,1,52,209,367,218,1,53,219,350,176,1,53,176,349,218,1,53,218,367,210,1,53,210,368,219,1,54,220,351,177,1,54,177,350,219,1,54,219,368,211,1,54,211,369,220,1,55,221,352,178,1,55,178,351,220,1,55,220,369,212,1,55,212,370,221,1,56,222,353,179,1,56,179,352,221,1,56,221,370,213,1,56,213,371,222,1,57,233,370,212,1,57,212,369,232,1,57,232,378,229,1,57,229,379,233,1,58,234,371,213,1,58,213,370,233,1,58,233,379,230,1,58,230,380,234,1,59,236,364,206,1,59,206,363,235,1,59,235,372,223,1,59,223,373,236,1,60,237,365,207,1,60,207,364,236,1,60,236,373,224,1,60,224,374,237,1,61,238,366,208,1,61,208,365,237,1,61,237,374,225,1,61,225,375,238,1,62,239,367,209,1,62,209,366,238,1,62,238,375,226,1,62,226,376,239,1,63,231,368,210,1,63,210,367,239,1,63,239,376,227,1,63,227,377,231,1,64,250,373,223,1,64,223,372,249,1,64,249,381,240,1,64,240,382,250,1,65,251,374,224,1,65,224,373,250,1,65,250,382,241,1,65,241,383,251,1,66,252,375,225,1,66,225,374,251,1,66,251,383,242,1,66,242,384,252,1,67,253,376,226,1,67,226,375,252,1,67,252,384,243,1,67,243,385,253,1,68,254,377,227,1,68,227,376,253,1,68,253,385,244,1,68,244,386,254,1,69,255,378,228,1,69,228,377,254,1,69,254,386,245,1,69,245,387,255,1,70,256,379,229,1,70,229,378,255,1,70,255,387,246,1,70,246,388,256,1,71,248,380,230,1,71,230,379,256,1,71,256,388,247,1,71,247,389,248,1,72,283,391,257,1,72,257,390,282,1,72,282,399,274,1,72,274,400,283,1,73,266,382,240,1,73,240,381,265,1,73,265,390,257,1,73,257,391,266,1,74,267,383,241,1,74,241,382,266,1,74,266,391,258,1,74,258,392,267,1,75,268,384,242,1,75,242,383,267,1,75,267,392,259,1,75,259,393,268,1,76,269,385,243,1,76,243,384,268,1,76,268,393,260,1,76,260,394,269,1,77,270,386,244,1,77,244,385,269,1,77,269,394,261,1,77,261,395,270,1,78,271,387,245,1,78,245,386,270,1,78,270,395,262,1,78,262,396,271,1,79,272,388,246,1,79,246,387,271,1,79,271,396,263,1,79,263,397,272,1,80,273,389,247,1,80,247,388,272,1,80,272,397,264,1,80,264,398,273,1,81,284,392,258,1,81,258,391,283,1,81,283,400,275,1,81,275,401,284,1,82,285,393,259,1,82,259,392,284,1,82,284,401,276,1,82,276,402,285,1,83,286,394,260,1,83,260,393,285,1,83,285,402,277,1,83,277,403,286,1,84,287,395,261,1,84,261,394,286,1,84,286,403,278,1,84,278,404,287,1,85,288,396,262,1,85,262,395,287,1,85,287,404,279,1,85,279,405,288,1,86,289,397,263,1,86,263,396,288,1,86,288,405,280,1,86,280,406,289,1,87,290,398,264,1,87,264,397,289,1,87,289,406,281,1,87,281,407,290,1,88,291,407,281,1,88,281,406,292,1,88,292,408,291,1,89,292,406,280,1,89,280,405,293,1,89,293,408,292,1,90,293,405,279,1,90,279,404,294,1,90,294,408,293,1,91,294,404,278,1,91,278,403,295,1,91,295,408,294,1,92,295,403,277,1,92,277,402,296,1,92,296,408,295,1,93,296,402,276,1,93,276,401,297,1,93,297,408,296,1,94,297,401,275,1,94,275,400,298,1,94,298,408,297,1,95,298,400,274,1,95,274,399,299,1,95,299,408,298],"morphTargets":[{"name":"animation_000000","vertices":[0,-585,2,0,-585,2,0,-585,2,1,-585,2,1,-585,2,1,-585,2,1,-585,2,1,-585,2,1,-585,2,1,-585,2,1,-585,2,1,-585,2,2,-585,1,2,-585,1,2,-585,1,2,-585,1,2,-585,1,2,-585,1,2,-585,1,2,-585,1,2,-585,1,2,-585,0,2,-585,0,2,-585,0,0,-585,2,1,-585,2,1,-585,2,1,-585,2,2,-585,1,2,-585,1,2,-585,1,2,-585,0,2,-585,1,1,-585,2,2,-585,1,1,-585,2,0,-585,2,2,-585,0,2,-585,1,1,-585,2,2,-585,0,2,-585,1,2,-585,1,2,-585,1,1,-585,2,1,-585,2,1,-585,2,0,-585,2,1,-584,1,0,-585,2,0,-585,2,1,-585,1,1,-585,1,1,-585,1,1,-585,1,2,-585,0,2,-585,0,1,-584,0,1,-584,0,0,-584,1,0,-584,1,1,-584,1,1,-584,1,1,-584,1,0,-584,1,0,-584,1,0,-584,1,1,-584,1,1,-584,1,1,-584,0,1,-584,0,1,-584,0,0,-584,0,0,-584,0,0,-584,0,0,-584,0,0,-584,0,0,-584,0,0,-584,0,0,-584,0,0,-584,0,0,-584,0,0,-584,0,0,-584,0,0,-584,0,0,-584,0,0,-584,0,0,-584,0,0,-584,0,0,-584,0,0,-584,0,0,-584,0,0,-584,0,0,-584,0,0,-584,0,0,-584,0,2,-585,0,2,-585,0,2,-585,0,2,-585,0,2,-585,0,2,-585,0,2,-585,0,2,-585,0,2,-585,1,2,-585,1,2,-585,1,2,-585,1,2,-585,1,2,-585,1,2,-585,1,2,-585,1,1,-585,1,1,-585,1,1,-585,1,1,-585,1,1,-585,2,1,-585,2,1,-585,2,1,-585,2,1,-585,2,1,-585,2,1,-585,2,1,-585,2,0,-585,2,0,-585,2,0,-585,2,0,-585,2,0,-585,2,0,-585,2,0,-585,2,0,-585,2,0,-585,2,0,-585,2,0,-585,2,0,-585,2,1,-585,2,1,-585,2,1,-585,2,1,-585,2,1,-585,2,1,-585,2,1,-585,2,1,-585,2,1,-585,2,1,-585,2,1,-585,2,1,-585,2,2,-585,1,2,-585,1,2,-585,1,2,-585,1,2,-585,1,2,-585,1,2,-585,1,2,-585,1,2,-585,1,2,-585,1,2,-585,1,2,-585,1,2,-585,0,2,-585,0,2,-585,0,2,-585,0,0,-585,2,1,-585,2,1,-585,2,1,-585,2,2,-585,1,2,-585,1,2,-585,1,2,-585,0,0,-585,2,1,-585,2,1,-585,2,1,-585,1,1,-585,1,2,-585,1,2,-585,1,2,-585,0,2,-585,0,2,-585,1,2,-585,1,1,-585,2,1,-585,2,0,-585,2,2,-585,0,1,-585,1,0,-585,2,2,-585,0,2,-585,0,2,-585,1,2,-585,1,1,-585,1,1,-585,2,1,-585,2,0,-585,2,0,-585,2,2,-585,0,2,-585,1,2,-585,1,2,-585,1,1,-585,2,1,-585,2,1,-585,2,0,-585,2,0,-585,1,0,-585,1,1,-585,1,1,-585,1,1,-585,1,1,-585,1,1,-585,0,1,-585,0,0,-585,2,0,-585,2,1,-585,2,1,-585,1,1,-585,1,1,-585,1,2,-585,1,2,-585,0,2,-585,0,0,-584,1,0,-584,1,0,-584,1,1,-584,1,1,-584,1,1,-584,0,1,-584,0,1,-584,0,1,-584,1,1,-584,0,1,-584,0,1,-584,0,0,-584,1,0,-584,1,0,-584,1,1,-584,1,1,-584,1,0,-584,1,0,-584,1,0,-584,1,0,-584,0,0,-584,0,1,-584,0,1,-584,0,1,-584,0,1,-584,0,0,-584,1,0,-584,1,0,-584,1,0,-584,1,1,-584,1,1,-584,0,1,-584,0,1,-584,0,0,-584,0,0,-584,0,0,-584,0,0,-584,0,0,-584,0,0,-584,0,0,-584,0,0,-584,0,0,-584,0,0,-584,0,0,-584,0,0,-584,0,0,-584,0,0,-584,0,0,-584,0,0,-584,0,0,-584,0,0,-584,0,0,-584,0,0,-584,0,0,-584,0,0,-584,0,0,-584,0,0,-584,0,0,-584,0,0,-584,0,0,-584,0,0,-584,0,0,-584,0,0,-584,0,0,-584,0,0,-584,0,0,-584,0,0,-584,0,0,-584,0,0,-584,0,0,-584,0,0,-584,0,0,-584,0,0,-584,0,0,-584,0,0,-584,0,0,-584,0,2,-585,0,2,-585,0,2,-585,0,2,-585,0,2,-585,0,2,-585,0,2,-585,0,2,-585,0,2,-585,1,2,-585,1,2,-585,1,2,-585,1,2,-585,1,2,-585,1,2,-585,1,2,-585,1,1,-585,1,1,-585,1,1,-585,1,1,-585,1,1,-585,2,1,-585,2,1,-585,2,1,-585,2,1,-585,2,1,-585,2,1,-585,2,1,-585,2,0,-585,2,0,-585,2,0,-585,2,0,-585,2,0,-585,2,0,-585,2,0,-585,2,0,-585,2,2,-585,0,2,-585,0,2,-585,1,2,-585,1,1,-585,1,1,-585,2,1,-585,2,0,-585,2,0,-585,2,0,-585,2,0,-585,2,1,-585,2,1,-585,2,1,-585,1,2,-585,1,2,-585,1,2,-585,0,2,-585,0,2,-585,0,2,-585,0,2,-585,1,2,-585,1,1,-585,1,1,-585,2,1,-585,2,0,-585,2,0,-585,2,0,-585,1,0,-585,1,1,-585,1,1,-585,1,1,-585,1,1,-585,1,1,-585,1,1,-585,0,1,-585,0,0,-584,1,0,-584,1,0,-584,1,1,-584,1,1,-584,1,1,-584,1,1,-584,0,1,-584,0,1,-584,0,0,-584,1,0,-584,1,0,-584,1,0,-584,1,0,-584,0,1,-584,0,1,-584,0,1,-584,0,1,-584,0,0,-584,0,0,-584,0,0,-584,0,0,-584,0,0,-584,0,0,-584,0,0,-584,0,0,-584,0,0,-584,0,0,-584,0,0,-584,0,0,-584,0,0,-584,0,0,-584,0,0,-584,0,0,-584,0,0,-584,0,0,-584,0,0,-584,0]},{"name":"animation_000001","vertices":[3,-585,34,3,-585,34,3,-585,34,10,-585,33,10,-585,33,10,-585,33,16,-585,30,16,-585,30,16,-585,30,22,-585,26,22,-585,26,22,-585,26,26,-585,22,26,-585,22,26,-585,22,30,-585,16,30,-585,16,30,-585,16,33,-585,10,33,-585,10,33,-585,10,34,-585,3,34,-585,3,34,-585,3,3,-585,34,10,-585,33,16,-585,30,22,-585,26,26,-585,22,30,-585,16,33,-585,10,34,-585,3,28,-584,15,15,-584,28,31,-584,9,20,-584,25,3,-584,32,32,-584,3,25,-584,20,9,-584,31,34,-585,3,32,-585,10,30,-585,16,26,-585,21,21,-585,26,16,-585,30,10,-585,32,3,-585,34,18,-571,10,3,-579,27,8,-579,26,13,-579,24,17,-579,21,21,-579,17,24,-579,13,26,-579,8,27,-579,3,20,-571,6,20,-571,2,2,-571,20,6,-571,20,10,-571,18,13,-571,16,16,-571,13,1,-561,13,4,-561,13,6,-561,12,9,-561,10,10,-561,9,12,-561,6,13,-561,4,13,-561,1,0,-555,3,1,-556,8,2,-556,7,4,-556,7,5,-556,6,6,-556,5,7,-556,4,7,-556,2,8,-556,1,1,-555,3,1,-555,2,2,-555,2,2,-555,2,2,-555,1,3,-555,1,3,-555,0,0,-555,0,0,-555,0,0,-555,0,0,-555,0,0,-555,0,0,-555,0,0,-555,0,0,-555,0,34,-585,0,34,-585,0,34,-585,0,34,-585,0,33,-585,7,33,-585,7,33,-585,7,33,-585,7,32,-585,13,32,-585,13,32,-585,13,31,-585,13,28,-585,19,28,-585,19,28,-585,19,28,-585,19,24,-585,24,24,-585,24,24,-585,24,24,-585,24,19,-585,28,19,-585,28,19,-585,28,19,-585,28,13,-585,32,13,-585,32,13,-585,32,13,-585,31,7,-585,33,7,-585,33,7,-585,33,7,-585,33,0,-585,34,0,-585,34,0,-585,34,0,-585,34,3,-585,33,3,-585,34,3,-585,34,3,-585,34,10,-585,32,10,-585,33,10,-585,33,10,-585,33,16,-585,29,16,-585,30,16,-585,30,16,-585,30,21,-585,26,22,-585,26,22,-585,26,22,-585,26,26,-585,21,26,-585,22,26,-585,22,26,-585,22,29,-585,16,30,-585,16,30,-585,16,30,-585,16,32,-585,10,33,-585,10,33,-585,10,33,-585,10,33,-585,3,34,-585,3,34,-585,3,34,-585,3,3,-585,34,10,-585,33,16,-585,30,22,-585,26,26,-585,22,30,-585,16,33,-585,10,34,-585,3,3,-582,30,9,-582,29,14,-582,26,19,-582,23,23,-582,19,26,-582,14,29,-582,9,30,-582,3,32,-584,0,27,-584,18,29,-584,12,12,-584,29,18,-584,27,0,-584,32,31,-584,6,23,-584,23,6,-584,31,34,-585,0,33,-585,7,32,-585,13,28,-585,19,24,-585,24,19,-585,28,13,-585,32,7,-585,33,0,-585,34,34,-585,3,33,-585,10,30,-585,16,26,-585,22,22,-585,26,16,-585,30,10,-585,33,3,-585,34,2,-575,24,7,-575,23,11,-575,21,15,-575,19,19,-575,15,21,-575,11,23,-575,7,24,-575,2,0,-579,27,5,-579,27,10,-579,25,15,-579,23,19,-579,19,23,-579,15,25,-579,10,27,-579,5,27,-579,0,2,-566,17,5,-566,16,8,-566,15,11,-566,13,13,-566,11,15,-566,8,16,-566,5,17,-566,2,17,-571,11,19,-571,8,20,-571,4,21,-571,0,0,-571,21,4,-571,20,8,-571,19,11,-571,17,15,-571,15,1,-558,10,3,-558,10,5,-558,9,7,-558,8,8,-558,7,9,-558,5,10,-558,3,10,-558,1,14,-561,0,0,-561,14,3,-561,13,5,-561,13,8,-561,11,10,-561,10,11,-561,8,13,-561,5,13,-561,3,1,-555,5,1,-555,5,2,-555,5,3,-555,4,4,-555,3,5,-555,2,5,-555,1,5,-555,1,0,-556,8,1,-556,7,3,-556,7,4,-556,6,5,-556,5,6,-556,4,7,-556,3,7,-556,1,8,-556,0,0,-555,1,0,-555,1,0,-555,1,1,-555,1,1,-555,1,1,-555,0,1,-555,0,1,-555,0,0,-555,3,1,-555,3,1,-555,3,2,-555,2,2,-555,2,2,-555,2,3,-555,1,3,-555,1,3,-555,0,0,-555,0,0,-555,0,0,-555,0,0,-555,0,0,-555,0,0,-555,0,0,-555,0,0,-555,0,0,-555,0,34,-585,0,34,-585,0,34,-585,0,33,-585,0,33,-585,7,33,-585,7,33,-585,7,33,-585,6,32,-585,13,32,-585,13,32,-585,13,31,-585,13,28,-585,19,28,-585,19,28,-585,19,28,-585,18,24,-585,24,24,-585,24,24,-585,24,24,-585,24,19,-585,28,19,-585,28,19,-585,28,18,-585,28,13,-585,32,13,-585,32,13,-585,32,13,-585,31,7,-585,33,7,-585,33,7,-585,33,6,-585,33,0,-585,34,0,-585,34,0,-585,34,0,-585,33,34,-585,0,33,-585,7,32,-585,13,28,-585,19,24,-585,24,19,-585,28,13,-585,32,7,-585,33,0,-585,34,0,-582,30,6,-582,29,11,-582,28,17,-582,25,21,-582,21,25,-582,17,28,-582,11,29,-582,6,30,-582,0,34,-585,0,33,-585,7,31,-585,13,28,-585,19,24,-585,24,19,-585,28,13,-585,31,7,-585,33,0,-585,34,0,-575,24,5,-575,24,9,-575,22,13,-575,20,17,-575,17,20,-575,13,22,-575,9,24,-575,5,24,-575,0,0,-566,17,3,-566,17,7,-566,16,9,-566,14,12,-566,12,14,-566,9,16,-566,7,17,-566,3,17,-566,0,0,-558,10,2,-558,10,4,-558,10,6,-558,9,7,-558,7,9,-558,6,10,-558,4,10,-558,2,10,-558,0,0,-555,5,1,-555,5,2,-555,5,3,-555,4,4,-555,4,4,-555,3,5,-555,2,5,-555,1,5,-555,0,0,-555,1,0,-555,1,0,-555,1,1,-555,1,1,-555,1,1,-555,1,1,-555,0,1,-555,0,1,-555,0,0,-555,0]},{"name":"animation_000002","vertices":[10,-585,104,10,-585,104,10,-585,104,30,-585,100,30,-585,100,30,-585,100,49,-585,92,49,-585,92,49,-585,92,66,-585,81,66,-585,81,66,-585,81,81,-585,66,81,-585,66,81,-585,66,92,-585,49,92,-585,49,92,-585,49,100,-585,30,100,-585,30,100,-585,30,104,-585,10,104,-585,10,104,-585,10,10,-585,104,30,-585,100,49,-585,92,66,-585,81,81,-585,66,92,-585,49,100,-585,30,104,-585,10,86,-580,46,46,-580,86,93,-580,28,62,-580,75,10,-580,97,97,-580,10,75,-580,62,28,-580,93,103,-585,10,99,-585,30,91,-585,49,80,-585,66,66,-585,80,49,-585,91,30,-585,99,10,-585,103,55,-540,30,8,-565,83,24,-565,80,39,-565,73,53,-565,64,64,-565,53,73,-565,39,80,-565,24,83,-565,8,60,-540,18,63,-540,6,6,-540,63,18,-540,60,30,-540,55,40,-540,49,49,-540,40,4,-511,41,12,-511,40,20,-511,37,26,-511,32,32,-511,26,37,-511,20,40,-511,12,41,-511,4,1,-491,8,2,-495,23,7,-495,22,11,-495,21,15,-495,18,18,-495,15,21,-495,11,22,-495,7,23,-495,2,2,-491,8,4,-491,8,5,-491,7,7,-491,5,8,-491,4,8,-491,2,8,-491,1,1,-491,0,1,-491,0,1,-491,0,1,-491,1,1,-491,1,0,-491,1,0,-491,1,0,-491,1,104,-585,0,104,-585,0,104,-585,0,104,-585,0,102,-585,20,102,-585,20,102,-585,20,102,-585,20,96,-585,40,96,-585,40,96,-585,40,96,-585,40,87,-585,58,87,-585,58,87,-585,58,86,-585,58,74,-585,74,74,-585,74,74,-585,74,73,-585,73,58,-585,87,58,-585,87,58,-585,87,58,-585,86,40,-585,96,40,-585,96,40,-585,96,40,-585,96,20,-585,102,20,-585,102,20,-585,102,20,-585,102,0,-585,104,0,-585,104,0,-585,104,0,-585,104,10,-584,101,10,-585,104,10,-585,104,10,-585,104,29,-584,97,30,-585,100,30,-585,100,30,-585,100,48,-584,90,49,-585,92,49,-585,92,49,-585,92,64,-584,79,66,-585,81,66,-585,81,66,-585,81,79,-584,64,81,-585,66,81,-585,66,81,-585,66,90,-584,48,92,-585,49,92,-585,49,92,-585,49,97,-584,29,100,-585,30,100,-585,30,100,-585,30,101,-584,10,104,-585,10,104,-585,10,104,-585,10,10,-585,104,30,-585,100,49,-585,92,66,-585,81,81,-585,66,92,-585,49,100,-585,30,104,-585,10,9,-574,91,27,-574,87,43,-574,81,58,-574,71,71,-574,58,81,-574,43,87,-574,27,91,-574,9,98,-580,0,81,-580,54,90,-580,37,37,-580,90,54,-580,81,0,-580,98,96,-580,19,69,-580,69,19,-580,96,104,-585,0,102,-585,20,96,-585,40,87,-585,58,74,-585,74,58,-585,87,40,-585,96,20,-585,102,0,-585,104,104,-585,10,100,-585,30,92,-585,49,81,-585,66,66,-585,81,49,-585,92,30,-585,100,10,-585,104,7,-554,73,21,-554,70,35,-554,65,47,-554,57,57,-554,47,65,-554,35,70,-554,21,73,-554,7,0,-565,83,16,-565,82,32,-565,77,46,-565,69,59,-565,59,69,-565,46,77,-565,32,82,-565,16,83,-565,0,5,-525,52,15,-525,50,24,-525,46,33,-525,40,40,-525,33,46,-525,24,50,-525,15,52,-525,5,52,-540,35,58,-540,24,62,-540,12,63,-540,0,0,-540,63,12,-540,62,24,-540,58,35,-540,52,44,-540,44,3,-501,32,9,-501,30,15,-501,28,20,-501,24,24,-501,20,28,-501,15,30,-501,9,32,-501,3,41,-511,0,0,-511,41,8,-511,41,16,-511,38,23,-511,34,29,-511,29,34,-511,23,38,-511,16,41,-511,8,2,-492,16,5,-492,15,7,-492,14,10,-492,12,12,-492,10,14,-492,7,15,-492,5,16,-492,2,0,-495,23,5,-495,23,9,-495,22,13,-495,19,16,-495,16,19,-495,13,22,-495,9,23,-495,5,23,-495,0,0,-491,3,1,-491,3,1,-491,3,2,-491,2,2,-491,2,3,-491,1,3,-491,1,3,-491,0,0,-491,9,2,-491,8,3,-491,8,5,-491,7,6,-491,6,7,-491,5,8,-491,3,8,-491,2,9,-491,0,1,-491,0,1,-491,0,1,-491,0,1,-491,1,1,-491,1,1,-491,1,0,-491,1,0,-491,1,0,-491,1,104,-585,0,104,-585,0,104,-585,0,102,-584,0,102,-585,20,102,-585,20,102,-585,20,100,-584,20,96,-585,40,96,-585,40,96,-585,40,94,-584,39,87,-585,58,87,-585,58,87,-585,58,84,-584,56,74,-585,74,74,-585,74,74,-585,74,72,-584,72,58,-585,87,58,-585,87,58,-585,87,56,-584,84,40,-585,96,40,-585,96,40,-585,96,39,-584,94,20,-585,102,20,-585,102,20,-585,102,20,-584,100,0,-585,104,0,-585,104,0,-585,104,0,-584,102,104,-585,0,102,-585,20,96,-585,40,87,-585,58,74,-585,74,58,-585,87,40,-585,96,20,-585,102,0,-585,104,0,-574,91,18,-574,90,35,-574,84,51,-574,76,65,-574,65,76,-574,51,84,-574,35,90,-574,18,91,-574,0,104,-585,0,102,-585,20,96,-585,40,87,-585,58,74,-585,74,58,-585,87,40,-585,96,20,-585,102,0,-585,104,0,-554,73,14,-554,72,28,-554,68,41,-554,61,52,-554,52,61,-554,41,68,-554,28,72,-554,14,73,-554,0,0,-525,52,10,-525,51,20,-525,48,29,-525,43,37,-525,37,43,-525,29,48,-525,20,51,-525,10,52,-525,0,0,-501,32,6,-501,31,12,-501,29,18,-501,26,22,-501,22,26,-501,18,29,-501,12,31,-501,6,32,-501,0,0,-492,16,3,-492,15,6,-492,15,9,-492,13,11,-492,11,13,-492,9,15,-492,6,15,-492,3,16,-492,0,0,-491,3,1,-491,3,1,-491,3,2,-491,3,2,-491,2,3,-491,2,3,-491,1,3,-491,1,3,-491,0,0,-491,0]},{"name":"animation_000003","vertices":[20,-585,208,20,-585,208,20,-585,208,61,-585,200,61,-585,200,61,-585,200,98,-585,184,98,-585,184,98,-585,184,133,-585,161,133,-585,161,133,-585,161,161,-585,133,161,-585,133,161,-585,133,184,-585,98,184,-585,98,184,-585,98,200,-585,61,200,-585,61,200,-585,61,208,-585,20,208,-585,20,208,-585,20,20,-585,208,61,-585,200,98,-585,184,133,-585,161,161,-585,133,184,-585,98,200,-585,61,208,-585,20,166,-578,89,89,-578,166,180,-578,55,119,-578,145,18,-578,187,187,-578,18,145,-578,119,55,-578,180,206,-585,20,198,-585,60,183,-585,98,160,-585,131,131,-585,160,98,-585,183,60,-585,198,20,-585,206,111,-531,59,16,-560,159,46,-560,152,75,-560,140,101,-560,123,123,-560,101,140,-560,75,152,-560,46,159,-560,16,120,-531,36,125,-531,12,12,-531,125,36,-531,120,59,-531,111,80,-531,97,97,-531,80,8,-488,82,24,-488,79,39,-488,73,53,-488,64,64,-488,53,73,-488,39,79,-488,24,82,-488,8,2,-435,17,5,-450,46,14,-450,45,22,-450,41,30,-450,36,36,-450,30,41,-450,22,45,-450,14,46,-450,5,5,-435,16,8,-435,15,11,-435,13,13,-435,11,15,-435,8,16,-435,5,17,-435,2,2,-435,0,2,-435,1,2,-435,1,2,-435,1,1,-435,2,1,-435,2,1,-435,2,0,-435,2,209,-585,0,209,-585,0,209,-585,0,207,-585,0,205,-585,41,205,-585,41,205,-585,41,203,-585,40,193,-585,80,193,-585,80,193,-585,80,191,-585,79,174,-585,116,174,-585,116,174,-585,116,172,-585,115,148,-585,148,148,-585,148,148,-585,148,146,-585,146,116,-585,174,116,-585,174,116,-585,174,115,-585,172,80,-585,193,80,-585,193,80,-585,193,79,-585,191,41,-585,205,41,-585,205,41,-585,205,40,-585,203,0,-585,209,0,-585,209,0,-585,209,0,-585,207,20,-583,201,20,-585,208,20,-585,208,20,-585,208,58,-583,193,61,-585,200,61,-585,200,61,-585,200,95,-583,178,98,-585,184,98,-585,184,98,-585,184,128,-583,156,133,-585,161,133,-585,161,133,-585,161,156,-583,128,161,-585,133,161,-585,133,161,-585,133,178,-583,95,184,-585,98,184,-585,98,184,-585,98,193,-583,58,200,-585,61,200,-585,61,200,-585,61,201,-583,20,208,-585,20,208,-585,20,208,-585,20,20,-585,208,61,-585,200,98,-585,184,133,-585,161,161,-585,133,184,-585,98,200,-585,61,208,-585,20,17,-570,171,50,-570,165,81,-570,152,109,-570,133,133,-570,109,152,-570,81,165,-570,50,171,-570,17,188,-578,0,156,-578,104,174,-578,72,72,-578,174,104,-578,156,0,-578,188,184,-578,37,133,-578,133,37,-578,184,209,-585,0,205,-585,41,193,-585,80,174,-585,116,148,-585,148,116,-585,174,80,-585,193,41,-585,205,0,-585,209,207,-585,20,199,-585,61,184,-585,98,161,-585,132,132,-585,161,98,-585,184,61,-585,199,20,-585,207,14,-548,145,42,-548,139,68,-548,128,92,-548,112,112,-548,92,128,-548,68,139,-548,42,145,-548,14,0,-560,159,31,-560,156,61,-560,147,88,-560,132,113,-560,113,132,-560,88,147,-560,61,156,-560,31,159,-560,0,10,-510,103,30,-510,99,49,-510,92,66,-510,80,80,-510,66,92,-510,49,99,-510,30,103,-510,10,105,-531,70,116,-531,48,123,-531,25,126,-531,0,0,-531,126,25,-531,123,48,-531,116,70,-531,105,89,-531,89,6,-467,63,18,-467,61,30,-467,56,40,-467,49,49,-467,40,56,-467,30,61,-467,18,63,-467,6,83,-488,0,0,-488,83,16,-488,81,32,-488,77,46,-488,69,59,-488,59,69,-488,46,77,-488,32,81,-488,16,3,-439,31,9,-439,30,15,-439,28,20,-439,24,24,-439,20,28,-439,15,30,-439,9,31,-439,3,0,-450,47,9,-450,46,18,-450,43,26,-450,39,33,-450,33,39,-450,26,43,-450,18,46,-450,9,47,-450,0,1,-435,6,2,-435,6,3,-435,6,4,-435,5,5,-435,4,6,-435,3,6,-435,2,6,-435,1,0,-435,17,3,-435,17,7,-435,16,9,-435,14,12,-435,12,14,-435,9,16,-435,7,17,-435,3,17,-435,0,2,-435,0,2,-435,0,2,-435,1,2,-435,1,1,-435,1,1,-435,2,1,-435,2,0,-435,2,0,-435,2,209,-585,0,209,-585,0,209,-585,0,202,-583,0,205,-585,41,205,-585,41,205,-585,41,198,-583,39,193,-585,80,193,-585,80,193,-585,80,186,-583,77,174,-585,116,174,-585,116,174,-585,116,168,-583,112,148,-585,148,148,-585,148,148,-585,148,142,-583,142,116,-585,174,116,-585,174,116,-585,174,112,-583,168,80,-585,193,80,-585,193,80,-585,193,77,-583,186,41,-585,205,41,-585,205,41,-585,205,39,-583,198,0,-585,209,0,-585,209,0,-585,209,0,-583,202,209,-585,0,205,-585,41,193,-585,80,174,-585,116,148,-585,148,116,-585,174,80,-585,193,41,-585,205,0,-585,209,0,-570,172,34,-570,169,66,-570,159,96,-570,143,122,-570,122,143,-570,96,159,-570,66,169,-570,34,172,-570,0,208,-585,0,204,-585,41,193,-585,80,173,-585,116,147,-585,147,116,-585,173,80,-585,193,41,-585,204,0,-585,208,0,-548,145,28,-548,142,56,-548,134,81,-548,121,103,-548,103,121,-548,81,134,-548,56,142,-548,28,145,-548,0,0,-510,104,20,-510,102,40,-510,96,58,-510,86,73,-510,73,86,-510,58,96,-510,40,102,-510,20,104,-510,0,0,-467,63,12,-467,62,24,-467,59,35,-467,53,45,-467,45,53,-467,35,59,-467,24,62,-467,12,63,-467,0,0,-439,31,6,-439,31,12,-439,29,17,-439,26,22,-439,22,26,-439,17,29,-439,12,31,-439,6,31,-439,0,0,-435,6,1,-435,6,2,-435,6,3,-435,5,4,-435,4,5,-435,3,6,-435,2,6,-435,1,6,-435,0,0,-435,0]},{"name":"animation_000004","vertices":[29,-558,295,29,-558,295,29,-559,295,86,-558,284,86,-558,284,86,-559,284,140,-558,261,140,-558,261,140,-559,261,188,-558,229,188,-558,229,188,-559,229,229,-558,188,229,-558,188,229,-559,188,261,-558,140,261,-558,140,261,-559,140,284,-558,86,284,-558,86,284,-559,86,295,-558,29,295,-558,29,295,-559,29,29,-572,291,85,-572,280,138,-572,258,185,-572,226,226,-572,185,258,-572,138,280,-572,85,291,-572,29,235,-549,126,126,-549,235,255,-549,77,169,-549,206,26,-549,265,265,-549,26,206,-549,169,77,-549,255,293,-556,29,281,-556,85,259,-556,139,227,-556,187,187,-556,227,139,-556,259,85,-556,281,29,-556,293,157,-515,84,22,-538,225,66,-538,216,106,-538,199,143,-538,175,175,-538,143,199,-538,106,216,-538,66,225,-538,22,171,-515,52,178,-515,17,17,-515,178,52,-515,171,84,-515,157,113,-515,138,138,-515,113,12,-469,117,34,-469,113,55,-469,104,75,-469,91,91,-469,75,104,-469,55,113,-469,34,117,-469,12,2,-384,24,6,-412,66,19,-412,63,31,-412,58,42,-412,51,51,-412,42,58,-412,31,63,-412,19,66,-412,6,7,-384,23,11,-384,21,15,-384,19,19,-384,15,21,-384,11,23,-384,7,24,-384,2,3,-384,0,3,-384,1,3,-384,1,2,-384,2,2,-384,2,1,-384,3,1,-384,3,0,-384,3,292,-572,0,296,-559,0,296,-558,0,294,-556,0,287,-572,57,291,-559,58,291,-558,58,288,-556,57,270,-572,112,274,-559,113,274,-558,113,272,-556,113,243,-572,162,247,-559,165,247,-558,165,244,-556,163,207,-572,207,210,-559,210,210,-558,210,208,-556,208,162,-572,243,165,-559,247,165,-558,247,163,-556,244,112,-572,270,113,-559,274,113,-558,274,113,-556,272,57,-572,287,58,-559,291,58,-558,291,57,-556,288,0,-572,292,0,-559,296,0,-558,296,0,-556,294,28,-553,285,29,-558,295,29,-559,295,29,-563,294,83,-553,274,86,-558,284,86,-559,284,86,-563,283,135,-553,252,140,-558,261,140,-559,261,139,-563,261,181,-553,221,188,-558,229,188,-559,229,187,-563,228,221,-553,181,229,-558,188,229,-559,188,228,-563,187,252,-553,135,261,-558,140,261,-559,140,261,-563,139,274,-553,83,284,-558,86,284,-559,86,283,-563,86,285,-553,28,295,-558,29,295,-559,29,294,-563,29,28,-585,287,84,-585,276,136,-585,254,183,-585,223,223,-585,183,254,-585,136,276,-585,84,287,-585,28,24,-544,243,71,-544,234,115,-544,215,155,-544,189,189,-544,155,215,-544,115,234,-544,71,243,-544,24,267,-549,0,222,-549,148,246,-549,102,102,-549,246,148,-549,222,0,-549,267,262,-549,52,189,-549,189,52,-549,262,296,-558,0,291,-558,58,274,-558,113,247,-558,165,210,-558,210,165,-558,247,113,-558,274,58,-558,291,0,-558,296,294,-557,29,283,-557,86,261,-557,139,229,-557,188,188,-557,229,139,-557,261,86,-557,283,29,-557,294,20,-530,205,60,-530,197,97,-530,182,131,-530,159,159,-530,131,182,-530,97,197,-530,60,205,-530,20,0,-538,226,44,-538,222,86,-538,209,125,-538,188,160,-538,160,188,-538,125,209,-538,86,222,-538,44,226,-538,0,14,-494,147,43,-494,141,70,-494,130,94,-494,114,114,-494,94,130,-494,70,141,-494,43,147,-494,14,148,-515,99,165,-515,68,175,-515,35,178,-515,0,0,-515,178,35,-515,175,68,-515,165,99,-515,148,126,-515,126,9,-440,90,26,-440,86,42,-440,79,57,-440,70,70,-440,57,79,-440,42,86,-440,26,90,-440,9,118,-469,0,0,-469,118,23,-469,115,45,-469,109,65,-469,98,83,-469,83,98,-469,65,109,-469,45,115,-469,23,4,-391,44,13,-391,43,21,-391,39,28,-391,35,35,-391,28,39,-391,21,43,-391,13,44,-391,4,0,-412,66,13,-412,65,25,-412,61,37,-412,55,47,-412,47,55,-412,37,61,-412,25,65,-412,13,66,-412,0,1,-384,9,3,-384,9,4,-384,8,6,-384,7,7,-384,6,8,-384,4,9,-384,3,9,-384,1,0,-384,24,5,-384,24,9,-384,22,13,-384,20,17,-384,17,20,-384,13,22,-384,9,24,-384,5,24,-384,0,3,-384,0,3,-384,1,2,-384,1,2,-384,1,2,-384,2,1,-384,2,1,-384,2,1,-384,3,0,-384,3,295,-563,0,296,-559,0,296,-558,0,286,-553,0,290,-563,58,291,-559,58,291,-558,58,281,-553,56,273,-563,113,274,-559,113,274,-558,113,264,-553,109,246,-563,164,247,-559,165,247,-558,165,238,-553,159,209,-563,209,210,-559,210,210,-558,210,202,-553,202,164,-563,246,165,-559,247,165,-558,247,159,-553,238,113,-563,273,113,-559,274,113,-558,274,109,-553,264,58,-563,290,58,-559,291,58,-558,291,56,-553,281,0,-563,295,0,-559,296,0,-558,296,0,-553,286,288,-585,0,283,-585,56,266,-585,110,240,-585,160,204,-585,204,160,-585,240,110,-585,266,56,-585,283,0,-585,288,0,-544,244,48,-544,239,93,-544,225,136,-544,203,173,-544,173,203,-544,136,225,-544,93,239,-544,48,244,-544,0,296,-557,0,290,-557,58,273,-557,113,246,-557,164,209,-557,209,164,-557,246,113,-557,273,58,-557,290,0,-557,296,0,-530,206,40,-530,202,79,-530,190,114,-530,171,146,-530,146,171,-530,114,190,-530,79,202,-530,40,206,-530,0,0,-494,148,29,-494,145,56,-494,136,82,-494,123,104,-494,104,123,-494,82,136,-494,56,145,-494,29,148,-494,0,0,-440,90,18,-440,88,34,-440,83,50,-440,75,64,-440,64,75,-440,50,83,-440,34,88,-440,18,90,-440,0,0,-391,45,9,-391,44,17,-391,41,25,-391,37,32,-391,32,37,-391,25,41,-391,17,44,-391,9,45,-391,0,0,-384,9,2,-384,9,3,-384,8,5,-384,7,6,-384,6,7,-384,5,8,-384,3,9,-384,2,9,-384,0,0,-384,0]},{"name":"animation_000005","vertices":[31,-480,311,31,-482,311,31,-497,311,91,-480,299,91,-482,299,91,-497,299,148,-480,276,148,-482,276,147,-497,275,199,-480,242,199,-482,242,198,-497,241,242,-480,199,242,-482,199,241,-497,198,276,-480,148,276,-482,148,275,-497,147,299,-480,91,299,-482,91,299,-497,91,311,-480,31,311,-482,31,311,-497,31,29,-548,299,87,-548,287,141,-548,265,190,-548,232,232,-548,190,265,-548,141,287,-548,87,299,-548,29,258,-471,138,138,-471,258,280,-471,85,186,-471,226,29,-471,291,291,-471,29,226,-471,186,85,-471,280,309,-475,30,297,-475,90,274,-475,146,240,-475,197,197,-475,240,146,-475,274,90,-475,297,30,-475,309,166,-442,89,24,-466,248,72,-466,239,118,-466,220,158,-466,193,193,-466,158,220,-466,118,239,-466,72,248,-466,24,180,-442,55,187,-442,18,18,-442,187,55,-442,180,89,-442,166,120,-442,146,146,-442,120,12,-396,124,36,-396,119,59,-396,109,79,-396,96,96,-396,79,109,-396,59,119,-396,36,124,-396,12,3,-311,25,7,-339,69,20,-339,67,33,-339,62,44,-339,54,54,-339,44,62,-339,33,67,-339,20,69,-339,7,7,-311,24,12,-311,23,16,-311,20,20,-311,16,23,-311,12,24,-311,7,25,-311,3,3,-311,0,3,-311,1,3,-311,1,2,-311,2,2,-311,2,1,-311,3,1,-311,3,0,-311,3,300,-548,0,312,-497,0,313,-482,0,310,-475,0,294,-548,59,306,-497,61,307,-482,61,304,-475,61,277,-548,115,289,-497,120,289,-482,120,287,-475,119,249,-548,167,260,-497,174,260,-482,174,258,-475,172,212,-548,212,221,-497,221,221,-482,221,219,-475,219,167,-548,249,174,-497,260,174,-482,260,172,-475,258,115,-548,277,120,-497,289,120,-482,289,119,-475,287,59,-548,294,61,-497,306,61,-482,307,61,-475,304,0,-548,300,0,-497,312,0,-482,313,0,-475,310,30,-472,303,31,-481,311,31,-486,311,30,-517,308,88,-472,291,91,-481,299,91,-486,299,90,-517,296,144,-472,269,148,-481,276,147,-486,276,146,-517,273,193,-472,235,199,-481,242,198,-486,242,196,-517,239,235,-472,193,242,-481,199,242,-486,198,239,-517,196,269,-472,144,276,-481,148,276,-486,147,273,-517,146,291,-472,88,299,-481,91,299,-486,91,296,-517,90,303,-472,30,311,-481,31,311,-486,31,308,-517,30,28,-585,287,84,-585,276,136,-585,254,183,-585,223,223,-585,183,254,-585,136,276,-585,84,287,-585,28,27,-470,273,80,-470,262,129,-470,242,174,-470,212,212,-470,174,242,-470,129,262,-470,80,273,-470,27,292,-471,0,243,-471,162,270,-471,112,112,-471,270,162,-471,243,0,-471,292,287,-471,57,207,-471,207,57,-471,287,313,-480,0,307,-480,61,289,-480,120,260,-480,174,221,-480,221,174,-480,260,120,-480,289,61,-480,307,0,-480,313,311,-478,31,299,-478,91,275,-478,147,241,-478,198,198,-478,241,147,-478,275,91,-478,299,31,-478,311,22,-457,219,64,-457,211,104,-457,194,140,-457,170,170,-457,140,194,-457,104,211,-457,64,219,-457,22,0,-466,249,49,-466,245,95,-466,230,139,-466,207,176,-466,176,207,-466,139,230,-466,95,245,-466,49,249,-466,0,15,-422,155,45,-422,149,73,-422,137,99,-422,120,120,-422,99,137,-422,73,149,-422,45,155,-422,15,157,-442,105,174,-442,72,185,-442,37,188,-442,0,0,-442,188,37,-442,185,72,-442,174,105,-442,157,133,-442,133,9,-368,95,28,-368,91,45,-368,84,60,-368,73,73,-368,60,84,-368,45,91,-368,28,95,-368,9,124,-396,0,0,-396,124,24,-396,122,47,-396,115,69,-396,103,88,-396,88,103,-396,69,115,-396,47,122,-396,24,5,-318,47,14,-318,45,22,-318,42,30,-318,36,36,-318,30,42,-318,22,45,-318,14,47,-318,5,0,-339,70,14,-339,68,27,-339,64,39,-339,58,49,-339,49,58,-339,39,64,-339,27,68,-339,14,70,-339,0,1,-311,9,3,-311,9,4,-311,8,6,-311,7,7,-311,6,8,-311,4,9,-311,3,9,-311,1,0,-311,26,5,-311,25,10,-311,24,14,-311,21,18,-311,18,21,-311,14,24,-311,10,25,-311,5,26,-311,0,3,-311,0,3,-311,1,3,-311,1,2,-311,2,2,-311,2,2,-311,2,1,-311,3,1,-311,3,0,-311,3,309,-517,0,313,-486,0,313,-481,0,305,-472,0,303,-517,60,307,-486,61,307,-481,61,299,-472,59,285,-517,118,289,-486,120,289,-481,120,281,-472,117,257,-517,172,260,-486,174,260,-481,174,253,-472,169,218,-517,218,221,-486,221,221,-481,221,215,-472,215,172,-517,257,174,-486,260,174,-481,260,169,-472,253,118,-517,285,120,-486,289,120,-481,289,117,-472,281,60,-517,303,61,-486,307,61,-481,307,59,-472,299,0,-517,309,0,-486,313,0,-481,313,0,-472,305,288,-585,0,283,-585,56,266,-585,110,240,-585,160,204,-585,204,160,-585,240,110,-585,266,56,-585,283,0,-585,288,0,-470,274,53,-470,269,105,-470,253,152,-470,228,194,-470,194,228,-470,152,253,-470,105,269,-470,53,274,-470,0,312,-478,0,306,-478,61,289,-478,120,260,-478,173,221,-478,221,173,-478,260,120,-478,289,61,-478,306,0,-478,312,0,-457,220,43,-457,216,84,-457,203,122,-457,183,156,-457,156,183,-457,122,203,-457,84,216,-457,43,220,-457,0,0,-422,156,30,-422,153,60,-422,144,86,-422,129,110,-422,110,129,-422,86,144,-422,60,153,-422,30,156,-422,0,0,-368,95,19,-368,93,36,-368,88,53,-368,79,67,-368,67,79,-368,53,88,-368,36,93,-368,19,95,-368,0,0,-318,47,9,-318,46,18,-318,44,26,-318,39,33,-318,33,39,-318,26,44,-318,18,46,-318,9,47,-318,0,0,-311,9,2,-311,9,4,-311,9,5,-311,8,7,-311,7,8,-311,5,9,-311,4,9,-311,2,9,-311,0,0,-311,0]},{"name":"animation_000006","vertices":[30,-407,308,31,-419,311,31,-471,312,90,-407,296,91,-419,299,91,-471,300,146,-407,273,147,-419,276,148,-471,276,196,-407,239,198,-419,241,199,-471,242,239,-407,196,241,-419,198,242,-471,199,273,-407,146,276,-419,147,276,-471,148,296,-407,90,299,-419,91,300,-471,91,308,-407,30,311,-419,31,312,-471,31,29,-548,299,87,-548,287,141,-548,265,190,-548,232,232,-548,190,265,-548,141,287,-548,87,299,-548,29,255,-397,136,136,-397,255,277,-397,84,184,-397,224,28,-397,288,288,-397,28,224,-397,184,84,-397,277,306,-402,30,294,-402,89,271,-402,145,237,-402,195,195,-402,237,145,-402,271,89,-402,294,30,-402,306,164,-369,88,24,-392,245,72,-392,236,116,-392,218,156,-392,191,191,-392,156,218,-392,116,236,-392,72,245,-392,24,178,-369,54,185,-369,18,18,-369,185,54,-369,178,88,-369,164,118,-369,144,144,-369,118,12,-322,122,36,-322,117,58,-322,108,78,-322,95,95,-322,78,108,-322,58,117,-322,36,122,-322,12,2,-238,25,7,-266,69,20,-266,66,33,-266,61,44,-266,53,53,-266,44,61,-266,33,66,-266,20,69,-266,7,7,-238,24,12,-238,22,16,-238,20,20,-238,16,22,-238,12,24,-238,7,25,-238,2,3,-238,0,3,-238,1,3,-238,1,2,-238,2,2,-238,2,1,-238,3,1,-238,3,0,-238,3,300,-548,0,314,-471,0,312,-419,0,307,-402,0,294,-548,59,307,-471,61,306,-419,61,301,-402,60,277,-548,115,290,-471,120,289,-419,120,284,-402,118,249,-548,167,261,-471,174,260,-419,174,255,-402,171,212,-548,212,222,-471,222,221,-419,221,217,-402,217,167,-548,249,174,-471,261,174,-419,260,171,-402,255,115,-548,277,120,-471,290,120,-419,289,118,-402,284,59,-548,294,61,-471,307,61,-419,306,60,-402,301,0,-548,300,0,-471,314,0,-419,312,0,-402,307,30,-399,300,30,-410,309,31,-438,313,30,-510,308,87,-399,288,90,-410,297,91,-438,301,90,-510,296,142,-399,266,146,-410,274,148,-438,277,146,-510,273,191,-399,233,197,-410,240,199,-438,243,196,-510,239,233,-399,191,240,-410,197,243,-438,199,239,-510,196,266,-399,142,274,-410,146,277,-438,148,273,-510,146,288,-399,87,297,-410,90,301,-438,91,296,-510,90,300,-399,30,309,-410,30,313,-438,31,308,-510,30,28,-585,287,84,-585,276,136,-585,254,183,-585,223,223,-585,183,254,-585,136,276,-585,84,287,-585,28,27,-396,270,79,-396,259,128,-396,239,172,-396,209,209,-396,172,239,-396,128,259,-396,79,270,-396,27,289,-397,0,241,-397,161,267,-397,111,111,-397,267,161,-397,241,0,-397,289,284,-397,56,205,-397,205,56,-397,284,310,-407,0,304,-407,60,286,-407,118,257,-407,172,219,-407,219,172,-407,257,118,-407,286,60,-407,304,0,-407,310,307,-405,30,296,-405,90,272,-405,146,239,-405,196,196,-405,239,146,-405,272,90,-405,296,30,-405,307,21,-384,217,63,-384,208,103,-384,192,138,-384,168,168,-384,138,192,-384,103,208,-384,63,217,-384,21,0,-392,247,48,-392,242,94,-392,228,137,-392,205,174,-392,174,205,-392,137,228,-392,94,242,-392,48,247,-392,0,15,-348,153,45,-348,147,73,-348,136,98,-348,119,119,-348,98,136,-348,73,147,-348,45,153,-348,15,155,-369,104,172,-369,71,183,-369,36,186,-369,0,0,-369,186,36,-369,183,71,-369,172,104,-369,155,132,-369,132,9,-294,94,27,-294,90,44,-294,83,60,-294,73,73,-294,60,83,-294,44,90,-294,27,94,-294,9,123,-322,0,0,-322,123,24,-322,120,47,-322,113,68,-322,102,87,-322,87,102,-322,68,113,-322,47,120,-322,24,5,-245,46,14,-245,45,22,-245,41,30,-245,36,36,-245,30,41,-245,22,45,-245,14,46,-245,5,0,-266,69,13,-266,68,26,-266,64,38,-266,57,49,-266,49,57,-266,38,64,-266,26,68,-266,13,69,-266,0,1,-238,9,3,-238,9,4,-238,8,6,-238,7,7,-238,6,8,-238,4,9,-238,3,9,-238,1,0,-238,25,5,-238,25,10,-238,23,14,-238,21,18,-238,18,21,-238,14,23,-238,10,25,-238,5,25,-238,0,3,-238,0,3,-238,1,2,-238,1,2,-238,1,2,-238,2,1,-238,2,1,-238,2,1,-238,3,0,-238,3,309,-510,0,314,-438,0,310,-410,0,301,-399,0,303,-510,60,308,-438,61,304,-410,61,296,-399,59,286,-510,118,290,-438,120,287,-410,119,278,-399,115,257,-510,172,261,-438,175,258,-410,172,251,-399,167,219,-510,219,222,-438,222,219,-410,219,213,-399,213,172,-510,257,175,-438,261,172,-410,258,167,-399,251,118,-510,286,120,-438,290,119,-410,287,115,-399,278,60,-510,303,61,-438,308,61,-410,304,59,-399,296,0,-510,309,0,-438,314,0,-410,310,0,-399,301,288,-585,0,283,-585,56,266,-585,110,240,-585,160,204,-585,204,160,-585,240,110,-585,266,56,-585,283,0,-585,288,0,-396,271,53,-396,266,104,-396,250,151,-396,225,192,-396,192,225,-396,151,250,-396,104,266,-396,53,271,-396,0,309,-405,0,303,-405,60,285,-405,118,257,-405,172,218,-405,218,172,-405,257,118,-405,285,60,-405,303,0,-405,309,0,-384,218,43,-384,214,83,-384,201,121,-384,181,154,-384,154,181,-384,121,201,-384,83,214,-384,43,218,-384,0,0,-348,154,30,-348,151,59,-348,142,86,-348,128,109,-348,109,128,-348,86,142,-348,59,151,-348,30,154,-348,0,0,-294,94,18,-294,92,36,-294,87,52,-294,78,66,-294,66,78,-294,52,87,-294,36,92,-294,18,94,-294,0,0,-245,47,9,-245,46,18,-245,43,26,-245,39,33,-245,33,39,-245,26,43,-245,18,46,-245,9,47,-245,0,0,-238,9,2,-238,9,4,-238,9,5,-238,8,7,-238,7,8,-238,5,9,-238,4,9,-238,2,9,-238,0,0,-238,0]},{"name":"animation_000007","vertices":[29,-347,291,30,-390,303,31,-471,312,85,-347,280,88,-390,291,91,-471,300,138,-347,258,144,-390,269,148,-471,276,186,-347,226,193,-390,235,199,-471,242,226,-347,186,235,-390,193,242,-471,199,258,-347,138,269,-390,144,276,-471,148,280,-347,85,291,-390,88,300,-471,91,291,-347,29,303,-390,30,312,-471,31,29,-548,299,87,-548,287,141,-548,265,190,-548,232,232,-548,190,265,-548,141,287,-548,87,299,-548,29,240,-335,129,129,-335,240,261,-335,79,173,-335,211,27,-335,271,271,-335,27,211,-335,173,79,-335,261,288,-340,28,277,-340,84,255,-340,136,224,-340,184,184,-340,224,136,-340,255,84,-340,277,28,-340,288,155,-307,83,23,-330,231,67,-330,222,110,-330,205,147,-330,180,180,-330,147,205,-330,110,222,-330,67,231,-330,23,168,-307,51,175,-307,17,17,-307,175,51,-307,168,83,-307,155,111,-307,136,136,-307,111,11,-260,115,34,-260,111,55,-260,102,73,-260,89,89,-260,73,102,-260,55,111,-260,34,115,-260,11,2,-176,24,6,-204,65,19,-204,62,31,-204,57,41,-204,50,50,-204,41,57,-204,31,62,-204,19,65,-204,6,7,-176,23,11,-176,21,15,-176,18,18,-176,15,21,-176,11,23,-176,7,24,-176,2,3,-176,0,3,-176,1,3,-176,1,2,-176,2,2,-176,2,1,-176,3,1,-176,3,0,-176,3,300,-548,0,314,-471,0,305,-390,0,289,-340,0,294,-548,59,307,-471,61,299,-390,59,284,-340,56,277,-548,115,290,-471,120,281,-390,117,267,-340,111,249,-548,167,261,-471,174,253,-390,169,241,-340,161,212,-548,212,222,-471,222,215,-390,215,205,-340,205,167,-548,249,174,-471,261,169,-390,253,161,-340,241,115,-548,277,120,-471,290,117,-390,281,111,-340,267,59,-548,294,61,-471,307,59,-390,299,56,-340,284,0,-548,300,0,-471,314,0,-390,305,0,-340,289,28,-337,283,29,-359,295,31,-431,311,30,-510,308,82,-337,272,86,-359,284,91,-431,299,90,-510,296,134,-337,250,140,-359,261,147,-431,275,146,-510,273,180,-337,220,188,-359,229,198,-431,241,196,-510,239,220,-337,180,229,-359,188,241,-431,198,239,-510,196,250,-337,134,261,-359,140,275,-431,147,273,-510,146,272,-337,82,284,-359,86,299,-431,91,296,-510,90,283,-337,28,295,-359,29,311,-431,31,308,-510,30,28,-585,287,84,-585,276,136,-585,254,183,-585,223,223,-585,183,254,-585,136,276,-585,84,287,-585,28,25,-334,254,74,-334,244,120,-334,225,162,-334,197,197,-334,162,225,-334,120,244,-334,74,254,-334,25,273,-335,0,227,-335,151,252,-335,104,104,-335,252,151,-335,227,0,-335,273,267,-335,53,193,-335,193,53,-335,267,293,-347,0,287,-347,57,271,-347,112,243,-347,163,207,-347,207,163,-347,243,112,-347,271,57,-347,287,0,-347,293,290,-344,29,279,-344,85,257,-344,137,225,-344,185,185,-344,225,137,-344,257,85,-344,279,29,-344,290,20,-321,204,60,-321,196,97,-321,181,130,-321,159,159,-321,130,181,-321,97,196,-321,60,204,-321,20,0,-330,232,45,-330,228,89,-330,215,129,-330,193,164,-330,164,193,-330,129,215,-330,89,228,-330,45,232,-330,0,14,-286,144,42,-286,139,68,-286,128,92,-286,112,112,-286,92,128,-286,68,139,-286,42,144,-286,14,146,-307,98,162,-307,67,172,-307,34,176,-307,0,0,-307,176,34,-307,172,67,-307,162,98,-307,146,124,-307,124,9,-232,88,26,-232,85,42,-232,78,56,-232,68,68,-232,56,78,-232,42,85,-232,26,88,-232,9,116,-260,0,0,-260,116,23,-260,113,44,-260,107,64,-260,96,82,-260,82,96,-260,64,107,-260,44,113,-260,23,4,-183,44,13,-183,42,21,-183,39,28,-183,34,34,-183,28,39,-183,21,42,-183,13,44,-183,4,0,-204,65,13,-204,64,25,-204,60,36,-204,54,46,-204,46,54,-204,36,60,-204,25,64,-204,13,65,-204,0,1,-176,9,3,-176,8,4,-176,8,6,-176,7,7,-176,6,8,-176,4,8,-176,3,9,-176,1,0,-176,24,5,-176,23,9,-176,22,13,-176,20,17,-176,17,20,-176,13,22,-176,9,23,-176,5,24,-176,0,3,-176,0,2,-176,0,2,-176,1,2,-176,1,2,-176,2,1,-176,2,1,-176,2,0,-176,2,0,-176,3,309,-510,0,312,-431,0,296,-359,0,284,-337,0,303,-510,60,306,-431,61,291,-359,58,279,-337,55,286,-510,118,288,-431,119,274,-359,113,262,-337,109,257,-510,172,260,-431,173,246,-359,165,236,-337,158,219,-510,219,221,-431,221,210,-359,210,201,-337,201,172,-510,257,173,-431,260,165,-359,246,158,-337,236,118,-510,286,119,-431,288,113,-359,274,109,-337,262,60,-510,303,61,-431,306,58,-359,291,55,-337,279,0,-510,309,0,-431,312,0,-359,296,0,-337,284,288,-585,0,283,-585,56,266,-585,110,240,-585,160,204,-585,204,160,-585,240,110,-585,266,56,-585,283,0,-585,288,0,-334,255,50,-334,250,98,-334,236,142,-334,212,181,-334,181,212,-334,142,236,-334,98,250,-334,50,255,-334,0,291,-344,0,286,-344,57,269,-344,112,242,-344,162,206,-344,206,162,-344,242,112,-344,269,57,-344,286,0,-344,291,0,-321,205,40,-321,201,79,-321,190,114,-321,171,145,-321,145,171,-321,114,190,-321,79,201,-321,40,205,-321,0,0,-286,145,28,-286,142,56,-286,134,81,-286,121,103,-286,103,121,-286,81,134,-286,56,142,-286,28,145,-286,0,0,-232,89,17,-232,87,34,-232,82,49,-232,74,63,-232,63,74,-232,49,82,-232,34,87,-232,17,89,-232,0,0,-183,44,9,-183,43,17,-183,41,24,-183,37,31,-183,31,37,-183,24,41,-183,17,43,-183,9,44,-183,0,0,-176,9,2,-176,9,3,-176,8,5,-176,7,6,-176,6,7,-176,5,8,-176,3,9,-176,2,9,-176,0,0,-176,0]},{"name":"animation_000008","vertices":[28,-326,281,30,-390,303,31,-471,312,82,-326,270,88,-390,291,91,-471,300,133,-326,249,144,-390,269,148,-471,276,179,-326,218,193,-390,235,199,-471,242,218,-326,179,235,-390,193,242,-471,199,249,-326,133,269,-390,144,276,-471,148,270,-326,82,291,-390,88,300,-471,91,281,-326,28,303,-390,30,312,-471,31,29,-548,299,87,-548,287,141,-548,265,190,-548,232,232,-548,190,265,-548,141,287,-548,87,299,-548,29,223,-294,119,119,-294,223,242,-294,73,160,-294,195,25,-294,251,251,-294,25,195,-294,160,73,-294,242,267,-299,26,256,-299,78,236,-299,126,207,-299,170,170,-299,207,126,-299,236,78,-299,256,26,-299,267,143,-266,77,21,-289,214,62,-289,206,101,-289,190,137,-289,166,166,-289,137,190,-289,101,206,-289,62,214,-289,21,156,-266,47,162,-266,16,16,-266,162,47,-266,156,77,-266,143,103,-266,126,126,-266,103,11,-219,107,31,-219,103,51,-219,95,68,-219,83,83,-219,68,95,-219,51,103,-219,31,107,-219,11,2,-134,22,6,-163,60,17,-163,58,28,-163,53,38,-163,47,47,-163,38,53,-163,28,58,-163,17,60,-163,6,6,-134,21,10,-134,19,14,-134,17,17,-134,14,19,-134,10,21,-134,6,22,-134,2,3,-134,0,3,-134,1,2,-134,1,2,-134,2,2,-134,2,1,-134,2,1,-134,3,0,-134,3,300,-548,0,314,-471,0,305,-390,0,268,-299,0,294,-548,59,307,-471,61,299,-390,59,263,-299,52,277,-548,115,290,-471,120,281,-390,117,248,-299,103,249,-548,167,261,-471,174,253,-390,169,223,-299,149,212,-548,212,222,-471,222,215,-390,215,189,-299,189,167,-548,249,174,-471,261,169,-390,253,149,-299,223,115,-548,277,120,-471,290,117,-390,281,103,-299,248,59,-548,294,61,-471,307,59,-390,299,52,-299,263,0,-548,300,0,-471,314,0,-390,305,0,-299,268,26,-295,262,29,-354,292,31,-431,311,30,-510,308,76,-295,252,85,-354,281,91,-431,299,90,-510,296,124,-295,232,138,-354,259,147,-431,275,146,-510,273,167,-295,203,186,-354,227,198,-431,241,196,-510,239,203,-295,167,227,-354,186,241,-431,198,239,-510,196,232,-295,124,259,-354,138,275,-431,147,273,-510,146,252,-295,76,281,-354,85,299,-431,91,296,-510,90,262,-295,26,292,-354,29,311,-431,31,308,-510,30,28,-585,287,84,-585,276,136,-585,254,183,-585,223,223,-585,183,254,-585,136,276,-585,84,287,-585,28,23,-293,235,69,-293,226,111,-293,209,150,-293,183,183,-293,150,209,-293,111,226,-293,69,235,-293,23,252,-294,0,210,-294,140,233,-294,97,97,-294,233,140,-294,210,0,-294,252,248,-294,49,179,-294,179,49,-294,248,282,-326,0,277,-326,55,261,-326,108,235,-326,157,199,-326,199,157,-326,235,108,-326,261,55,-326,277,0,-326,282,271,-308,27,261,-308,79,240,-308,129,211,-308,173,173,-308,211,129,-308,240,79,-308,261,27,-308,271,19,-280,189,55,-280,182,90,-280,168,121,-280,147,147,-280,121,168,-280,90,182,-280,55,189,-280,19,0,-289,215,42,-289,211,82,-289,199,120,-289,179,152,-289,152,179,-289,120,199,-289,82,211,-289,42,215,-289,0,13,-245,134,39,-245,129,63,-245,119,85,-245,104,104,-245,85,119,-245,63,129,-245,39,134,-245,13,135,-266,90,150,-266,62,160,-266,32,163,-266,0,0,-266,163,32,-266,160,62,-266,150,90,-266,135,115,-266,115,8,-191,82,24,-191,79,39,-191,72,52,-191,63,63,-191,52,72,-191,39,79,-191,24,82,-191,8,107,-219,0,0,-219,107,21,-219,105,41,-219,99,60,-219,89,76,-219,76,89,-219,60,99,-219,41,105,-219,21,4,-142,40,12,-142,39,19,-142,36,26,-142,31,31,-142,26,36,-142,19,39,-142,12,40,-142,4,0,-163,60,12,-163,59,23,-163,56,33,-163,50,43,-163,43,50,-163,33,56,-163,23,59,-163,12,60,-163,0,1,-134,8,2,-134,8,4,-134,7,5,-134,6,6,-134,5,7,-134,4,8,-134,2,8,-134,1,0,-134,22,4,-134,22,8,-134,20,12,-134,18,16,-134,16,18,-134,12,20,-134,8,22,-134,4,22,-134,0,2,-134,0,2,-134,0,2,-134,1,2,-134,1,2,-134,2,1,-134,2,1,-134,2,0,-134,2,0,-134,2,309,-510,0,312,-431,0,294,-354,0,263,-295,0,303,-510,60,306,-431,61,288,-354,57,258,-295,51,286,-510,118,288,-431,119,271,-354,112,243,-295,101,257,-510,172,260,-431,173,244,-354,163,219,-295,146,219,-510,219,221,-431,221,208,-354,208,186,-295,186,172,-510,257,173,-431,260,163,-354,244,146,-295,219,118,-510,286,119,-431,288,112,-354,271,101,-295,243,60,-510,303,61,-431,306,57,-354,288,51,-295,258,0,-510,309,0,-431,312,0,-354,294,0,-295,263,288,-585,0,283,-585,56,266,-585,110,240,-585,160,204,-585,204,160,-585,240,110,-585,266,56,-585,283,0,-585,288,0,-293,237,46,-293,232,91,-293,219,131,-293,197,167,-293,167,197,-293,131,219,-293,91,232,-293,46,237,-293,0,273,-308,0,267,-308,53,252,-308,104,227,-308,151,193,-308,193,151,-308,227,104,-308,252,53,-308,267,0,-308,273,0,-280,190,37,-280,186,73,-280,176,106,-280,158,134,-280,134,158,-280,106,176,-280,73,186,-280,37,190,-280,0,0,-245,134,26,-245,132,51,-245,124,75,-245,112,95,-245,95,112,-245,75,124,-245,51,132,-245,26,134,-245,0,0,-191,82,16,-191,80,31,-191,76,46,-191,68,58,-191,58,68,-191,46,76,-191,31,80,-191,16,82,-191,0,0,-142,41,8,-142,40,16,-142,38,23,-142,34,29,-142,29,34,-142,23,38,-142,16,40,-142,8,41,-142,0,0,-134,8,2,-134,8,3,-134,8,5,-134,7,6,-134,6,7,-134,5,8,-134,3,8,-134,2,8,-134,0,0,-134,0]},{"name":"animation_000009","vertices":[27,-315,275,30,-390,303,31,-471,312,80,-315,264,88,-390,291,91,-471,300,130,-315,244,144,-390,269,148,-471,276,175,-315,213,193,-390,235,199,-471,242,213,-315,175,235,-390,193,242,-471,199,244,-315,130,269,-390,144,276,-471,148,264,-315,80,291,-390,88,300,-471,91,275,-315,27,303,-390,30,312,-471,31,29,-548,299,87,-548,287,141,-548,265,190,-548,232,232,-548,190,265,-548,141,287,-548,87,299,-548,29,213,-272,114,114,-272,213,231,-272,70,153,-272,187,24,-272,240,240,-272,24,187,-272,153,70,-272,231,255,-276,25,245,-276,74,226,-276,121,198,-276,163,163,-276,198,121,-276,226,74,-276,245,25,-276,255,137,-243,73,20,-266,205,60,-266,197,97,-266,182,131,-266,159,159,-266,131,182,-266,97,197,-266,60,205,-266,20,149,-243,45,155,-243,15,15,-243,155,45,-243,149,73,-243,137,99,-243,120,120,-243,99,10,-197,102,30,-197,98,48,-197,90,65,-197,79,79,-197,65,90,-197,48,98,-197,30,102,-197,10,2,-112,21,6,-140,57,17,-140,55,27,-140,51,37,-140,45,45,-140,37,51,-140,27,55,-140,17,57,-140,6,6,-112,20,10,-112,19,13,-112,16,16,-112,13,19,-112,10,20,-112,6,21,-112,2,3,-112,0,2,-112,1,2,-112,1,2,-112,2,2,-112,2,1,-112,2,1,-112,2,0,-112,3,300,-548,0,314,-471,0,305,-390,0,256,-276,0,294,-548,59,307,-471,61,299,-390,59,251,-276,50,277,-548,115,290,-471,120,281,-390,117,237,-276,98,249,-548,167,261,-471,174,253,-390,169,213,-276,142,212,-548,212,222,-471,222,215,-390,215,181,-276,181,167,-548,249,174,-471,261,169,-390,253,142,-276,213,115,-548,277,120,-471,290,117,-390,281,98,-276,237,59,-548,294,61,-471,307,59,-390,299,50,-276,251,0,-548,300,0,-471,314,0,-390,305,0,-276,256,25,-273,250,29,-351,291,31,-431,311,30,-510,308,73,-273,241,85,-351,280,91,-431,299,90,-510,296,119,-273,222,138,-351,258,147,-431,275,146,-510,273,160,-273,194,185,-351,226,198,-431,241,196,-510,239,194,-273,160,226,-351,185,241,-431,198,239,-510,196,222,-273,119,258,-351,138,275,-431,147,273,-510,146,241,-273,73,280,-351,85,299,-431,91,296,-510,90,250,-273,25,291,-351,29,311,-431,31,308,-510,30,28,-585,287,84,-585,276,136,-585,254,183,-585,223,223,-585,183,254,-585,136,276,-585,84,287,-585,28,22,-271,225,66,-271,216,107,-271,200,144,-271,175,175,-271,144,200,-271,107,216,-271,66,225,-271,22,241,-272,0,201,-272,134,223,-272,92,92,-272,223,134,-272,201,0,-272,241,237,-272,47,171,-272,171,47,-272,237,276,-315,0,271,-315,54,255,-315,106,230,-315,153,195,-315,195,153,-315,230,106,-315,255,54,-315,271,0,-315,276,261,-288,26,251,-288,76,231,-288,124,203,-288,166,166,-288,203,124,-288,231,76,-288,251,26,-288,261,18,-258,181,53,-258,174,86,-258,160,115,-258,141,141,-258,115,160,-258,86,174,-258,53,181,-258,18,0,-266,206,40,-266,202,79,-266,190,114,-266,171,146,-266,146,171,-266,114,190,-266,79,202,-266,40,206,-266,0,13,-223,128,37,-223,123,61,-223,113,82,-223,99,99,-223,82,113,-223,61,123,-223,37,128,-223,13,129,-243,86,144,-243,60,153,-243,30,156,-243,0,0,-243,156,30,-243,153,60,-243,144,86,-243,129,110,-243,110,8,-169,78,23,-169,75,37,-169,69,50,-169,61,61,-169,50,69,-169,37,75,-169,23,78,-169,8,102,-197,0,0,-197,102,20,-197,101,39,-197,95,57,-197,85,72,-197,72,85,-197,57,95,-197,39,101,-197,20,4,-119,39,11,-119,37,18,-119,34,25,-119,30,30,-119,25,34,-119,18,37,-119,11,39,-119,4,0,-140,58,11,-140,57,22,-140,53,32,-140,48,41,-140,41,48,-140,32,53,-140,22,57,-140,11,58,-140,0,1,-112,8,2,-112,8,4,-112,7,5,-112,6,6,-112,5,7,-112,4,8,-112,2,8,-112,1,0,-112,21,4,-112,21,8,-112,20,12,-112,18,15,-112,15,18,-112,12,20,-112,8,21,-112,4,21,-112,0,2,-112,0,2,-112,0,2,-112,1,2,-112,1,2,-112,2,1,-112,2,1,-112,2,0,-112,2,0,-112,2,309,-510,0,312,-431,0,292,-351,0,252,-273,0,303,-510,60,306,-431,61,287,-351,57,247,-273,49,286,-510,118,288,-431,119,270,-351,112,232,-273,96,257,-510,172,260,-431,173,243,-351,162,209,-273,140,219,-510,219,221,-431,221,207,-351,207,178,-273,178,172,-510,257,173,-431,260,162,-351,243,140,-273,209,118,-510,286,119,-431,288,112,-351,270,96,-273,232,60,-510,303,61,-431,306,57,-351,287,49,-273,247,0,-510,309,0,-431,312,0,-351,292,0,-273,252,288,-585,0,283,-585,56,266,-585,110,240,-585,160,204,-585,204,160,-585,240,110,-585,266,56,-585,283,0,-585,288,0,-271,226,44,-271,222,87,-271,209,126,-271,188,160,-271,160,188,-271,126,209,-271,87,222,-271,44,226,-271,0,262,-288,0,257,-288,51,242,-288,100,218,-288,146,185,-288,185,146,-288,218,100,-288,242,51,-288,257,0,-288,262,0,-258,182,35,-258,178,70,-258,168,101,-258,151,129,-258,129,151,-258,101,168,-258,70,178,-258,35,182,-258,0,0,-223,129,25,-223,126,49,-223,119,71,-223,107,91,-223,91,107,-223,71,119,-223,49,126,-223,25,129,-223,0,0,-169,78,15,-169,77,30,-169,72,44,-169,65,55,-169,55,65,-169,44,72,-169,30,77,-169,15,78,-169,0,0,-119,39,8,-119,38,15,-119,36,22,-119,32,28,-119,28,32,-119,22,36,-119,15,38,-119,8,39,-119,0,0,-112,8,2,-112,8,3,-112,7,4,-112,6,5,-112,5,6,-112,4,7,-112,3,8,-112,2,8,-112,0,0,-112,0]}]}

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = {"metadata":{"generator":"io_three","version":3,"type":"Geometry","vertices":427,"faces":400,"morphTargets":10},"vertices":[9,92,94,14,142,146,22,226,219,27,309,272,30,390,303,31,507,310,28,92,91,43,142,140,64,226,211,79,309,261,88,390,291,91,507,299,45,92,84,69,142,129,104,226,194,129,309,241,144,390,269,147,507,275,60,92,73,93,142,113,140,226,170,173,309,211,193,390,235,198,507,241,73,92,60,113,142,93,170,226,140,211,309,173,235,390,193,241,507,198,84,92,45,129,142,69,194,226,104,241,309,129,269,390,144,275,507,147,91,92,28,140,142,43,211,226,64,261,309,79,291,390,88,299,507,91,94,92,9,146,142,14,219,226,22,272,309,27,303,390,30,310,507,31,11,17,1,30,38,3,54,59,5,75,75,7,10,17,3,29,38,9,52,59,16,72,75,22,9,17,5,26,38,14,48,59,26,66,75,35,8,17,7,23,38,19,42,59,35,58,75,48,7,17,8,19,38,23,35,59,42,48,75,58,5,17,9,14,38,26,26,59,48,35,75,66,3,17,10,9,38,29,16,59,52,22,75,72,1,17,11,3,38,30,5,59,54,7,75,75,86,511,283,283,511,86,229,511,188,140,511,261,29,511,295,295,511,29,261,511,140,188,511,229,312,467,31,300,467,91,277,467,148,242,467,199,199,467,242,148,467,277,91,467,300,31,467,312,18,511,186,54,511,179,88,511,165,119,511,145,145,511,119,165,511,88,179,511,54,186,511,18,0,15,9,113,511,274,246,511,165,314,467,0,305,390,0,273,309,0,221,226,0,147,142,0,308,467,61,299,390,59,268,309,53,216,226,43,144,142,29,290,467,120,281,390,117,252,309,104,204,226,84,136,142,56,291,511,58,261,467,174,253,390,169,227,309,152,183,226,123,122,142,82,222,467,222,215,390,215,193,309,193,156,226,156,104,142,104,174,467,261,169,390,253,152,309,227,123,226,183,82,142,122,120,467,290,117,390,281,104,309,252,84,226,204,56,142,136,0,511,296,61,467,308,59,390,299,53,309,268,43,226,216,29,142,144,0,467,314,0,390,305,0,309,273,0,226,221,0,142,147,250,511,76,202,511,166,123,511,230,26,511,260,11,109,112,18,184,185,24,268,248,29,350,290,31,430,311,30,510,306,33,109,108,54,184,178,72,268,239,85,350,279,91,430,299,89,510,295,53,109,99,88,184,164,118,268,220,137,350,257,147,430,275,145,510,272,71,109,87,118,184,144,158,268,193,185,350,225,198,430,241,195,510,238,87,109,71,144,184,118,193,268,158,225,350,185,241,430,198,238,510,195,99,109,53,164,184,88,220,268,118,257,350,137,275,430,147,272,510,145,108,109,33,178,184,54,239,268,72,279,350,85,299,430,91,295,510,89,112,109,11,185,184,18,248,268,24,290,350,29,311,430,31,306,510,30,95,92,0,75,75,0,54,59,0,30,38,0,93,92,19,74,75,15,53,59,11,29,38,6,88,92,36,69,75,29,50,59,21,28,38,11,79,92,53,63,75,42,45,59,30,25,38,17,67,92,67,53,75,53,39,59,39,21,38,21,53,92,79,42,75,63,30,59,45,17,38,25,36,92,88,29,75,69,21,59,50,11,38,28,19,92,93,15,75,74,11,59,53,6,38,29,0,92,95,0,75,75,0,59,54,0,38,30,18,27,2,43,49,4,65,67,6,85,84,8,17,27,5,41,49,12,62,67,19,82,84,25,16,27,9,38,49,20,57,67,31,75,84,40,14,27,12,33,49,27,50,67,41,66,84,54,12,27,14,27,49,33,41,67,50,54,84,66,9,27,16,20,49,38,31,67,57,40,84,75,5,27,17,12,49,41,19,67,62,25,84,82,2,27,18,4,49,43,6,67,65,8,84,85,2,15,9,4,15,9,5,15,8,7,15,7,8,15,5,9,15,4,9,15,2,9,15,0,76,511,250,166,511,202,230,511,123,260,511,26,296,511,0,274,511,113,209,511,209,165,511,246,58,511,291,312,507,0,306,507,61,288,507,119,259,507,173,221,507,221,173,507,259,119,507,288,61,507,306,0,507,312,311,495,31,299,495,91,276,495,147,242,495,198,198,495,242,147,495,276,91,495,299,31,495,311,0,511,164,32,511,160,63,511,151,91,511,136,116,511,116,136,511,91,151,511,63,160,511,32,164,511,0,0,1,0,308,510,0,312,430,0,291,350,0,249,268,0,186,184,0,113,109,0,302,510,60,306,430,61,286,350,57,245,268,49,183,184,36,110,109,22,285,510,118,288,430,119,269,350,112,230,268,95,172,184,71,104,109,43,256,510,171,260,430,173,242,350,162,207,268,139,155,184,104,94,109,63,218,510,218,221,430,221,206,350,206,176,268,176,132,184,132,80,109,80,171,510,256,173,430,260,162,350,242,139,268,207,104,184,155,63,109,94,118,510,285,119,430,288,112,350,269,95,268,230,71,184,172,43,109,104,60,510,302,61,430,306,57,350,286,49,268,245,36,184,183,22,109,110,0,510,308,0,430,312,0,350,291,0,268,249,0,184,186,0,109,113,85,84,0,65,67,0,43,49,0,18,26,0,84,84,17,64,67,13,42,49,8,18,26,3,79,84,33,60,67,25,40,49,16,17,26,7,71,84,47,54,67,36,36,49,24,15,26,10,60,84,60,46,67,46,30,49,30,13,26,13,47,84,71,36,67,54,24,49,36,10,26,15,33,84,79,25,67,60,16,49,40,7,26,17,17,84,84,13,67,64,8,49,42,3,26,18,0,84,85,0,67,65,0,49,43,0,26,18,255,511,0,250,511,50,236,511,98,212,511,142,180,511,180,142,511,212,98,511,236,50,511,250,0,511,255,312,495,0,306,495,61,289,495,120,260,495,174,221,495,221,174,495,260,120,495,289,61,495,306,0,495,312,0,511,0],"faces":[1,0,273,400,234,1,0,234,365,158,1,0,158,371,238,1,0,238,404,273,1,1,158,365,148,1,1,148,364,159,1,1,159,370,153,1,1,153,371,158,1,2,159,364,147,1,2,147,363,160,1,2,160,369,152,1,2,152,370,159,1,3,160,363,146,1,3,146,362,161,1,3,161,368,151,1,3,151,369,160,1,4,161,362,145,1,4,145,361,162,1,4,162,367,150,1,4,150,368,161,1,5,307,424,298,1,5,298,360,163,1,5,163,366,299,1,5,299,425,307,1,6,269,396,230,1,6,230,359,164,1,6,164,365,234,1,6,234,400,269,1,7,164,359,142,1,7,142,358,165,1,7,165,364,148,1,7,148,365,164,1,8,165,358,141,1,8,141,357,166,1,8,166,363,147,1,8,147,364,165,1,9,166,357,140,1,9,140,356,167,1,9,167,362,146,1,9,146,363,166,1,10,167,356,139,1,10,139,355,168,1,10,168,361,145,1,10,145,362,167,1,11,306,423,297,1,11,297,354,169,1,11,169,360,298,1,11,298,424,306,1,12,265,392,226,1,12,226,353,170,1,12,170,359,230,1,12,230,396,265,1,13,170,353,137,1,13,137,352,171,1,13,171,358,142,1,13,142,359,170,1,14,171,352,136,1,14,136,351,172,1,14,172,357,141,1,14,141,358,171,1,15,172,351,135,1,15,135,350,173,1,15,173,356,140,1,15,140,357,172,1,16,173,350,134,1,16,134,349,174,1,16,174,355,139,1,16,139,356,173,1,17,305,422,296,1,17,296,348,175,1,17,175,354,297,1,17,297,423,305,1,18,261,388,222,1,18,222,347,176,1,18,176,353,226,1,18,226,392,261,1,19,176,347,132,1,19,132,346,177,1,19,177,352,137,1,19,137,353,176,1,20,177,346,131,1,20,131,345,178,1,20,178,351,136,1,20,136,352,177,1,21,178,345,130,1,21,130,344,179,1,21,179,350,135,1,21,135,351,178,1,22,179,344,129,1,22,129,343,180,1,22,180,349,134,1,22,134,350,179,1,23,304,421,295,1,23,295,342,181,1,23,181,348,296,1,23,296,422,304,1,24,257,384,218,1,24,218,341,182,1,24,182,347,222,1,24,222,388,257,1,25,182,341,127,1,25,127,340,183,1,25,183,346,132,1,25,132,347,182,1,26,183,340,126,1,26,126,339,184,1,26,184,345,131,1,26,131,346,183,1,27,184,339,125,1,27,125,338,185,1,27,185,344,130,1,27,130,345,184,1,28,185,338,124,1,28,124,337,186,1,28,186,343,129,1,28,129,344,185,1,29,303,420,294,1,29,294,336,187,1,29,187,342,295,1,29,295,421,303,1,30,253,380,214,1,30,214,335,188,1,30,188,341,218,1,30,218,384,253,1,31,188,335,121,1,31,121,334,189,1,31,189,340,127,1,31,127,341,188,1,32,189,334,120,1,32,120,333,190,1,32,190,339,126,1,32,126,340,189,1,33,190,333,119,1,33,119,332,191,1,33,191,338,125,1,33,125,339,190,1,34,191,332,118,1,34,118,331,192,1,34,192,337,124,1,34,124,338,191,1,35,302,419,293,1,35,293,330,193,1,35,193,336,294,1,35,294,420,302,1,36,249,376,210,1,36,210,329,194,1,36,194,335,214,1,36,214,380,249,1,37,194,329,116,1,37,116,328,195,1,37,195,334,121,1,37,121,335,194,1,38,195,328,115,1,38,115,327,196,1,38,196,333,120,1,38,120,334,195,1,39,196,327,114,1,39,114,326,197,1,39,197,332,119,1,39,119,333,196,1,40,197,326,113,1,40,113,325,198,1,40,198,331,118,1,40,118,332,197,1,41,301,418,292,1,41,292,324,199,1,41,199,330,293,1,41,293,419,301,1,42,245,372,206,1,42,206,323,200,1,42,200,329,210,1,42,210,376,245,1,43,200,323,111,1,43,111,322,201,1,43,201,328,116,1,43,116,329,200,1,44,201,322,110,1,44,110,321,202,1,44,202,327,115,1,44,115,328,201,1,45,202,321,109,1,45,109,320,203,1,45,203,326,114,1,45,114,327,202,1,46,203,320,108,1,46,108,319,204,1,46,204,325,113,1,46,113,326,203,1,47,300,417,291,1,47,291,318,205,1,47,205,324,292,1,47,292,418,300,1,48,280,317,281,1,48,281,375,242,1,48,242,379,280,1,49,242,375,209,1,49,209,374,243,1,49,243,378,213,1,49,213,379,242,1,50,243,374,208,1,50,208,373,244,1,50,244,377,212,1,50,212,378,243,1,51,244,373,207,1,51,207,372,245,1,51,245,376,211,1,51,211,377,244,1,52,279,317,280,1,52,280,379,246,1,52,246,383,279,1,53,246,379,213,1,53,213,378,247,1,53,247,382,217,1,53,217,383,246,1,54,247,378,212,1,54,212,377,248,1,54,248,381,216,1,54,216,382,247,1,55,248,377,211,1,55,211,376,249,1,55,249,380,215,1,55,215,381,248,1,56,278,317,279,1,56,279,383,250,1,56,250,387,278,1,57,250,383,217,1,57,217,382,251,1,57,251,386,221,1,57,221,387,250,1,58,251,382,216,1,58,216,381,252,1,58,252,385,220,1,58,220,386,251,1,59,252,381,215,1,59,215,380,253,1,59,253,384,219,1,59,219,385,252,1,60,277,317,278,1,60,278,387,254,1,60,254,391,277,1,61,254,387,221,1,61,221,386,255,1,61,255,390,225,1,61,225,391,254,1,62,255,386,220,1,62,220,385,256,1,62,256,389,224,1,62,224,390,255,1,63,256,385,219,1,63,219,384,257,1,63,257,388,223,1,63,223,389,256,1,64,276,317,277,1,64,277,391,258,1,64,258,395,276,1,65,258,391,225,1,65,225,390,259,1,65,259,394,229,1,65,229,395,258,1,66,259,390,224,1,66,224,389,260,1,66,260,393,228,1,66,228,394,259,1,67,260,389,223,1,67,223,388,261,1,67,261,392,227,1,67,227,393,260,1,68,275,317,276,1,68,276,395,262,1,68,262,399,275,1,69,262,395,229,1,69,229,394,263,1,69,263,398,233,1,69,233,399,262,1,70,263,394,228,1,70,228,393,264,1,70,264,397,232,1,70,232,398,263,1,71,264,393,227,1,71,227,392,265,1,71,265,396,231,1,71,231,397,264,1,72,274,317,275,1,72,275,399,266,1,72,266,403,274,1,73,266,399,233,1,73,233,398,267,1,73,267,402,237,1,73,237,403,266,1,74,267,398,232,1,74,232,397,268,1,74,268,401,236,1,74,236,402,267,1,75,268,397,231,1,75,231,396,269,1,75,269,400,235,1,75,235,401,268,1,76,104,317,274,1,76,274,403,270,1,76,270,407,104,1,77,270,403,237,1,77,237,402,271,1,77,271,406,241,1,77,241,407,270,1,78,271,402,236,1,78,236,401,272,1,78,272,405,240,1,78,240,406,271,1,79,272,401,235,1,79,235,400,273,1,79,273,404,239,1,79,239,405,272,1,80,290,360,169,1,80,169,354,105,1,80,105,414,282,1,80,282,415,290,1,81,287,330,199,1,81,199,324,122,1,81,122,409,154,1,81,154,410,287,1,82,288,342,187,1,82,187,336,106,1,82,106,411,155,1,82,155,412,288,1,83,105,354,175,1,83,175,348,289,1,83,289,413,156,1,83,156,414,105,1,84,143,366,163,1,84,163,360,290,1,84,290,415,157,1,84,157,416,143,1,85,122,324,205,1,85,205,318,286,1,85,286,408,285,1,85,285,409,122,1,86,106,336,193,1,86,193,330,287,1,86,287,410,284,1,86,284,411,106,1,87,289,348,181,1,87,181,342,288,1,87,288,412,283,1,87,283,413,289,1,88,204,319,107,1,88,107,417,300,1,88,300,418,112,1,88,112,325,204,1,89,198,325,112,1,89,112,418,301,1,89,301,419,117,1,89,117,331,198,1,90,192,331,117,1,90,117,419,302,1,90,302,420,123,1,90,123,337,192,1,91,186,337,123,1,91,123,420,303,1,91,303,421,128,1,91,128,343,186,1,92,180,343,128,1,92,128,421,304,1,92,304,422,133,1,92,133,349,180,1,93,174,349,133,1,93,133,422,305,1,93,305,423,138,1,93,138,355,174,1,94,168,355,138,1,94,138,423,306,1,94,306,424,144,1,94,144,361,168,1,95,162,361,144,1,95,144,424,307,1,95,307,425,149,1,95,149,367,162,1,96,308,416,157,1,96,157,415,309,1,96,309,426,308,1,97,309,415,282,1,97,282,414,310,1,97,310,426,309,1,98,310,414,156,1,98,156,413,311,1,98,311,426,310,1,99,311,413,283,1,99,283,412,312,1,99,312,426,311,1,100,312,412,155,1,100,155,411,313,1,100,313,426,312,1,101,313,411,284,1,101,284,410,314,1,101,314,426,313,1,102,314,410,154,1,102,154,409,315,1,102,315,426,314,1,103,315,409,285,1,103,285,408,316,1,103,316,426,315],"morphTargets":[{"name":"animation_000000","vertices":[9,92,94,14,142,146,22,226,219,27,309,272,30,390,303,31,506,311,28,92,91,43,142,140,64,226,211,79,309,261,88,390,291,91,506,299,45,92,84,69,142,129,104,226,194,129,309,241,144,390,269,147,506,275,60,92,73,93,142,113,140,226,170,173,309,211,193,390,235,198,506,241,73,92,60,113,142,93,170,226,140,211,309,173,235,390,193,241,506,198,84,92,45,129,142,69,194,226,104,241,309,129,269,390,144,275,506,147,91,92,28,140,142,43,211,226,64,261,309,79,291,390,88,299,506,91,94,92,9,146,142,14,219,226,22,272,309,27,303,390,30,311,506,31,11,17,1,30,38,3,54,59,5,75,75,7,10,17,3,29,38,9,52,59,16,72,75,22,9,17,5,26,38,14,48,59,26,66,75,35,8,17,7,23,38,19,42,59,35,58,75,48,7,17,8,19,38,23,35,59,42,48,75,58,5,17,9,14,38,26,26,59,48,35,75,66,3,17,10,9,38,29,16,59,52,22,75,72,1,17,11,3,38,30,5,59,54,7,75,75,86,510,283,283,510,86,229,510,188,140,510,261,29,510,295,295,510,29,261,510,140,188,510,229,312,466,31,300,466,91,277,466,148,243,466,199,199,466,243,148,466,277,91,466,300,31,466,312,18,510,186,54,510,179,88,510,165,119,510,145,145,510,119,165,510,88,179,510,54,186,510,18,0,15,9,113,510,274,246,510,165,314,466,0,305,390,0,273,309,0,221,226,0,147,142,0,308,466,61,299,390,59,268,309,53,216,226,43,144,142,29,290,466,120,281,390,117,252,309,104,204,226,84,136,142,56,291,510,58,261,466,174,253,390,169,227,309,152,183,226,123,122,142,82,222,466,222,215,390,215,193,309,193,156,226,156,104,142,104,174,466,261,169,390,253,152,309,227,123,226,183,82,142,122,120,466,290,117,390,281,104,309,252,84,226,204,56,142,136,0,510,296,61,466,308,59,390,299,53,309,268,43,226,216,29,142,144,0,466,314,0,390,305,0,309,273,0,226,221,0,142,147,250,510,76,202,510,166,123,510,230,26,510,260,11,109,112,18,184,185,24,268,248,29,350,290,31,429,311,30,509,307,33,109,108,54,184,178,72,268,239,85,350,279,91,429,299,89,509,295,53,109,99,88,184,164,118,268,220,137,350,257,147,429,275,145,509,272,71,109,87,118,184,144,158,268,193,185,350,225,198,429,241,195,509,238,87,109,71,144,184,118,193,268,158,225,350,185,241,429,198,238,509,195,99,109,53,164,184,88,220,268,118,257,350,137,275,429,147,272,509,145,108,109,33,178,184,54,239,268,72,279,350,85,299,429,91,295,509,89,112,109,11,185,184,18,248,268,24,290,350,29,311,429,31,307,509,30,95,92,0,75,75,0,54,59,0,30,38,0,93,92,19,74,75,15,53,59,11,29,38,6,88,92,36,69,75,29,50,59,21,28,38,11,79,92,53,63,75,42,45,59,30,25,38,17,67,92,67,53,75,53,39,59,39,21,38,21,53,92,79,42,75,63,30,59,45,17,38,25,36,92,88,29,75,69,21,59,50,11,38,28,19,92,93,15,75,74,11,59,53,6,38,29,0,92,95,0,75,75,0,59,54,0,38,30,18,27,2,43,49,4,65,67,6,85,84,8,17,27,5,41,49,12,62,67,19,82,84,25,16,27,9,38,49,20,57,67,31,75,84,40,14,27,12,33,49,27,50,67,41,66,84,54,12,27,14,27,49,33,41,67,50,54,84,66,9,27,16,20,49,38,31,67,57,40,84,75,5,27,17,12,49,41,19,67,62,25,84,82,2,27,18,4,49,43,6,67,65,8,84,85,2,15,9,4,15,9,5,15,8,7,15,7,8,15,5,9,15,4,9,15,2,9,15,0,76,510,250,166,510,202,230,510,123,260,510,26,296,510,0,274,510,113,209,510,209,165,510,246,58,510,291,312,506,0,306,506,61,288,506,119,259,506,173,221,506,221,173,506,259,119,506,288,61,506,306,0,506,312,311,494,31,299,494,91,276,494,147,242,494,198,198,494,242,147,494,276,91,494,299,31,494,311,0,510,164,32,510,160,63,510,151,91,510,136,116,510,116,136,510,91,151,510,63,160,510,32,164,510,0,0,1,0,308,509,0,312,429,0,291,350,0,249,268,0,186,184,0,113,109,0,302,509,60,306,429,61,286,350,57,245,268,49,183,184,36,110,109,22,285,509,118,288,429,119,269,350,112,230,268,95,172,184,71,104,109,43,256,509,171,260,429,173,242,350,162,207,268,139,155,184,104,94,109,63,218,509,218,221,429,221,206,350,206,176,268,176,132,184,132,80,109,80,171,509,256,173,429,260,162,350,242,139,268,207,104,184,155,63,109,94,118,509,285,119,429,288,112,350,269,95,268,230,71,184,172,43,109,104,60,509,302,61,429,306,57,350,286,49,268,245,36,184,183,22,109,110,0,509,308,0,429,312,0,350,291,0,268,249,0,184,186,0,109,113,85,84,0,65,67,0,43,49,0,18,26,0,84,84,17,64,67,13,42,49,8,18,26,3,79,84,33,60,67,25,40,49,16,17,26,7,71,84,47,54,67,36,36,49,24,15,26,10,60,84,60,46,67,46,30,49,30,13,26,13,47,84,71,36,67,54,24,49,36,10,26,15,33,84,79,25,67,60,16,49,40,7,26,17,17,84,84,13,67,64,8,49,42,3,26,18,0,84,85,0,67,65,0,49,43,0,26,18,255,510,0,250,510,50,236,510,98,212,510,142,181,510,181,142,510,212,98,510,236,50,510,250,0,510,255,313,494,0,307,494,61,289,494,120,260,494,174,221,494,221,174,494,260,120,494,289,61,494,307,0,494,313,0,510,0]},{"name":"animation_000001","vertices":[9,92,94,14,142,146,22,226,219,27,309,272,30,390,303,31,490,311,28,92,91,43,142,140,64,226,211,79,309,261,88,390,291,91,490,299,45,92,84,69,142,129,104,226,194,129,309,241,144,390,269,147,490,276,60,92,73,93,142,113,140,226,170,173,309,211,193,390,235,198,490,242,73,92,60,113,142,93,170,226,140,211,309,173,235,390,193,242,490,198,84,92,45,129,142,69,194,226,104,241,309,129,269,390,144,276,490,147,91,92,28,140,142,43,211,226,64,261,309,79,291,390,88,299,490,91,94,92,9,146,142,14,219,226,22,272,309,27,303,390,30,311,490,31,11,17,1,30,38,3,54,59,5,75,75,7,10,17,3,29,38,9,52,59,16,72,75,22,9,17,5,26,38,14,48,59,26,66,75,35,8,17,7,23,38,19,42,59,35,58,75,48,7,17,8,19,38,23,35,59,42,48,75,58,5,17,9,14,38,26,26,59,48,35,75,66,3,17,10,9,38,29,16,59,52,22,75,72,1,17,11,3,38,30,5,59,54,7,75,75,86,494,284,284,494,86,230,494,188,140,494,262,29,494,295,295,494,29,262,494,140,188,494,230,313,458,31,301,458,91,277,458,148,243,458,199,199,458,243,148,458,277,91,458,301,31,458,313,18,494,187,54,494,179,88,494,165,119,494,145,145,494,119,165,494,88,179,494,54,187,494,18,0,15,9,114,494,274,247,494,165,314,458,0,305,390,0,273,309,0,221,226,0,147,142,0,308,458,61,299,390,59,268,309,53,216,226,43,144,142,29,290,458,120,281,390,117,252,309,104,204,226,84,136,142,56,291,494,58,261,458,174,253,390,169,227,309,152,183,226,123,122,142,82,222,458,222,215,390,215,193,309,193,156,226,156,104,142,104,174,458,261,169,390,253,152,309,227,123,226,183,82,142,122,120,458,290,117,390,281,104,309,252,84,226,204,56,142,136,0,494,297,61,458,308,59,390,299,53,309,268,43,226,216,29,142,144,0,458,314,0,390,305,0,309,273,0,226,221,0,142,147,250,494,76,202,494,166,123,494,231,26,494,260,11,109,112,18,184,185,24,268,248,29,350,290,31,428,311,30,493,307,33,109,108,54,184,178,72,268,239,85,350,279,91,428,299,90,493,295,53,109,99,88,184,164,118,268,220,137,350,257,147,428,275,146,493,272,71,109,87,118,184,144,158,268,193,185,350,225,198,428,241,196,493,239,87,109,71,144,184,118,193,268,158,225,350,185,241,428,198,239,493,196,99,109,53,164,184,88,220,268,118,257,350,137,275,428,147,272,493,146,108,109,33,178,184,54,239,268,72,279,350,85,299,428,91,295,493,90,112,109,11,185,184,18,248,268,24,290,350,29,311,428,31,307,493,30,95,92,0,75,75,0,54,59,0,30,38,0,93,92,19,74,75,15,53,59,11,29,38,6,88,92,36,69,75,29,50,59,21,28,38,11,79,92,53,63,75,42,45,59,30,25,38,17,67,92,67,53,75,53,39,59,39,21,38,21,53,92,79,42,75,63,30,59,45,17,38,25,36,92,88,29,75,69,21,59,50,11,38,28,19,92,93,15,75,74,11,59,53,6,38,29,0,92,95,0,75,75,0,59,54,0,38,30,18,27,2,43,49,4,65,67,6,85,84,8,17,27,5,41,49,12,62,67,19,82,84,25,16,27,9,38,49,20,57,67,31,75,84,40,14,27,12,33,49,27,50,67,41,66,84,54,12,27,14,27,49,33,41,67,50,54,84,66,9,27,16,20,49,38,31,67,57,40,84,75,5,27,17,12,49,41,19,67,62,25,84,82,2,27,18,4,49,43,6,67,65,8,84,85,2,15,9,4,15,9,5,15,8,7,15,7,8,15,5,9,15,4,9,15,2,9,15,0,76,494,250,166,494,202,231,494,123,260,494,26,297,494,0,274,494,114,210,494,210,165,494,247,58,494,291,313,490,0,307,490,61,289,490,120,260,490,174,221,490,221,174,490,260,120,490,289,61,490,307,0,490,313,312,480,31,300,480,91,276,480,148,242,480,199,199,480,242,148,480,276,91,480,300,31,480,312,0,494,164,32,494,161,63,494,151,91,494,136,116,494,116,136,494,91,151,494,63,161,494,32,164,494,0,0,1,0,309,493,0,312,428,0,291,350,0,249,268,0,186,184,0,113,109,0,303,493,60,306,428,61,286,350,57,245,268,49,183,184,36,110,109,22,285,493,118,289,428,120,269,350,112,230,268,95,172,184,71,104,109,43,257,493,171,260,428,173,242,350,162,207,268,139,155,184,104,94,109,63,218,493,218,221,428,221,206,350,206,176,268,176,132,184,132,80,109,80,171,493,257,173,428,260,162,350,242,139,268,207,104,184,155,63,109,94,118,493,285,120,428,289,112,350,269,95,268,230,71,184,172,43,109,104,60,493,303,61,428,306,57,350,286,49,268,245,36,184,183,22,109,110,0,493,309,0,428,312,0,350,291,0,268,249,0,184,186,0,109,113,85,84,0,65,67,0,43,49,0,18,26,0,84,84,17,64,67,13,42,49,8,18,26,3,79,84,33,60,67,25,40,49,16,17,26,7,71,84,47,54,67,36,36,49,24,15,26,10,60,84,60,46,67,46,30,49,30,13,26,13,47,84,71,36,67,54,24,49,36,10,26,15,33,84,79,25,67,60,16,49,40,7,26,17,17,84,84,13,67,64,8,49,42,3,26,18,0,84,85,0,67,65,0,49,43,0,26,18,256,494,0,251,494,50,236,494,98,213,494,142,181,494,181,142,494,213,98,494,236,50,494,251,0,494,256,313,480,0,307,480,61,289,480,120,260,480,174,221,480,221,174,480,260,120,480,289,61,480,307,0,480,313,0,494,0]},{"name":"animation_000002","vertices":[9,92,94,14,142,146,22,226,219,27,309,272,30,390,303,31,456,313,28,92,91,43,142,140,64,226,211,79,309,261,88,390,291,91,456,301,45,92,84,69,142,129,104,226,194,129,309,241,144,390,269,148,456,277,60,92,73,93,142,113,140,226,170,173,309,211,193,390,235,199,456,243,73,92,60,113,142,93,170,226,140,211,309,173,235,390,193,243,456,199,84,92,45,129,142,69,194,226,104,241,309,129,269,390,144,277,456,148,91,92,28,140,142,43,211,226,64,261,309,79,291,390,88,301,456,91,94,92,9,146,142,14,219,226,22,272,309,27,303,390,30,313,456,31,11,17,1,30,38,3,54,59,5,75,75,7,10,17,3,29,38,9,52,59,16,72,75,22,9,17,5,26,38,14,48,59,26,66,75,35,8,17,7,23,38,19,42,59,35,58,75,48,7,17,8,19,38,23,35,59,42,48,75,58,5,17,9,14,38,26,26,59,48,35,75,66,3,17,10,9,38,29,16,59,52,22,75,72,1,17,11,3,38,30,5,59,54,7,75,75,87,460,285,285,460,87,231,460,189,141,460,263,29,460,297,297,460,29,263,460,141,189,460,231,313,441,31,301,441,91,278,441,148,243,441,200,200,441,243,148,441,278,91,441,301,31,441,313,18,460,188,55,460,180,89,460,166,120,460,146,146,460,120,166,460,89,180,460,55,188,460,18,0,15,9,114,460,276,248,460,166,315,441,0,305,390,0,273,309,0,221,226,0,147,142,0,309,441,61,299,390,59,268,309,53,216,226,43,144,142,29,291,441,120,281,390,117,252,309,104,204,226,84,136,142,56,293,460,58,262,441,175,253,390,169,227,309,152,183,226,123,122,142,82,223,441,223,215,390,215,193,309,193,156,226,156,104,142,104,175,441,262,169,390,253,152,309,227,123,226,183,82,142,122,120,441,291,117,390,281,104,309,252,84,226,204,56,142,136,0,460,298,61,441,309,59,390,299,53,309,268,43,226,216,29,142,144,0,441,315,0,390,305,0,309,273,0,226,221,0,142,147,252,460,76,203,460,167,124,460,232,26,460,262,11,109,112,18,184,185,24,268,248,29,350,290,31,423,311,30,459,309,33,109,108,54,184,178,72,268,239,85,350,279,91,423,299,90,459,297,53,109,99,88,184,164,118,268,220,137,350,257,147,423,276,146,459,274,71,109,87,118,184,144,158,268,193,185,350,225,198,423,242,197,459,240,87,109,71,144,184,118,193,268,158,225,350,185,242,423,198,240,459,197,99,109,53,164,184,88,220,268,118,257,350,137,276,423,147,274,459,146,108,109,33,178,184,54,239,268,72,279,350,85,299,423,91,297,459,90,112,109,11,185,184,18,248,268,24,290,350,29,311,423,31,309,459,30,95,92,0,75,75,0,54,59,0,30,38,0,93,92,19,74,75,15,53,59,11,29,38,6,88,92,36,69,75,29,50,59,21,28,38,11,79,92,53,63,75,42,45,59,30,25,38,17,67,92,67,53,75,53,39,59,39,21,38,21,53,92,79,42,75,63,30,59,45,17,38,25,36,92,88,29,75,69,21,59,50,11,38,28,19,92,93,15,75,74,11,59,53,6,38,29,0,92,95,0,75,75,0,59,54,0,38,30,18,27,2,43,49,4,65,67,6,85,84,8,17,27,5,41,49,12,62,67,19,82,84,25,16,27,9,38,49,20,57,67,31,75,84,40,14,27,12,33,49,27,50,67,41,66,84,54,12,27,14,27,49,33,41,67,50,54,84,66,9,27,16,20,49,38,31,67,57,40,84,75,5,27,17,12,49,41,19,67,62,25,84,82,2,27,18,4,49,43,6,67,65,8,84,85,2,15,9,4,15,9,5,15,8,7,15,7,8,15,5,9,15,4,9,15,2,9,15,0,76,460,252,167,460,203,232,460,124,262,460,26,298,460,0,276,460,114,211,460,211,166,460,248,58,460,293,314,456,0,308,456,61,290,456,120,261,456,175,222,456,222,175,456,261,120,456,290,61,456,308,0,456,314,313,450,31,301,450,91,277,450,148,243,450,199,199,450,243,148,450,277,91,450,301,31,450,313,0,460,165,32,460,162,63,460,152,92,460,137,117,460,117,137,460,92,152,460,63,162,460,32,165,460,0,0,1,0,310,459,0,312,423,0,291,350,0,249,268,0,186,184,0,113,109,0,304,459,61,306,423,61,286,350,57,245,268,49,183,184,36,110,109,22,287,459,119,289,423,120,269,350,112,230,268,95,172,184,71,104,109,43,258,459,172,260,423,174,242,350,162,207,268,139,155,184,104,94,109,63,219,459,219,221,423,221,206,350,206,176,268,176,132,184,132,80,109,80,172,459,258,174,423,260,162,350,242,139,268,207,104,184,155,63,109,94,119,459,287,120,423,289,112,350,269,95,268,230,71,184,172,43,109,104,61,459,304,61,423,306,57,350,286,49,268,245,36,184,183,22,109,110,0,459,310,0,423,312,0,350,291,0,268,249,0,184,186,0,109,113,85,84,0,65,67,0,43,49,0,18,26,0,84,84,17,64,67,13,42,49,8,18,26,3,79,84,33,60,67,25,40,49,16,17,26,7,71,84,47,54,67,36,36,49,24,15,26,10,60,84,60,46,67,46,30,49,30,13,26,13,47,84,71,36,67,54,24,49,36,10,26,15,33,84,79,25,67,60,16,49,40,7,26,17,17,84,84,13,67,64,8,49,42,3,26,18,0,84,85,0,67,65,0,49,43,0,26,18,257,460,0,252,460,50,238,460,98,214,460,143,182,460,182,143,460,214,98,460,238,50,460,252,0,460,257,314,450,0,308,450,61,291,450,120,261,450,175,222,450,222,175,450,261,120,450,291,61,450,308,0,450,314,0,460,0]},{"name":"animation_000003","vertices":[9,92,94,14,142,146,22,226,219,27,309,272,29,373,298,30,401,304,28,92,91,43,142,140,64,226,211,79,309,261,87,373,287,89,401,292,45,92,84,69,142,129,104,226,194,129,309,241,141,373,264,144,401,269,60,92,73,93,142,113,140,226,170,173,309,211,190,373,232,194,401,236,73,92,60,113,142,93,170,226,140,211,309,173,232,373,190,236,401,194,84,92,45,129,142,69,194,226,104,241,309,129,264,373,141,269,401,144,91,92,28,140,142,43,211,226,64,261,309,79,287,373,87,292,401,89,94,92,9,146,142,14,219,226,22,272,309,27,298,373,29,304,401,30,11,17,1,30,38,3,54,59,5,75,75,7,10,17,3,29,38,9,52,59,16,72,75,22,9,17,5,26,38,14,48,59,26,66,75,35,8,17,7,23,38,19,42,59,35,58,75,48,7,17,8,19,38,23,35,59,42,48,75,58,5,17,9,14,38,26,26,59,48,35,75,66,3,17,10,9,38,29,16,59,52,22,75,72,1,17,11,3,38,30,5,59,54,7,75,75,84,405,278,278,405,84,224,405,184,137,405,256,28,405,289,289,405,28,256,405,137,184,405,224,304,396,30,293,396,89,270,396,144,236,396,194,194,396,236,144,396,270,89,396,293,30,396,304,18,405,182,53,405,175,86,405,162,116,405,142,142,405,116,162,405,86,175,405,53,182,405,18,0,15,9,111,405,268,241,405,161,306,396,0,300,373,0,273,309,0,221,226,0,147,142,0,300,396,60,294,373,58,268,309,53,216,226,43,144,142,29,282,396,117,277,373,115,252,309,104,204,226,84,136,142,56,284,405,57,254,396,170,249,373,167,227,309,152,183,226,123,122,142,82,216,396,216,212,373,212,193,309,193,156,226,156,104,142,104,170,396,254,167,373,249,152,309,227,123,226,183,82,142,122,117,396,282,115,373,277,104,309,252,84,226,204,56,142,136,0,405,290,60,396,300,58,373,294,53,309,268,43,226,216,29,142,144,0,396,306,0,373,300,0,309,273,0,226,221,0,142,147,245,405,74,198,405,162,121,405,226,25,405,254,11,109,112,18,184,185,24,268,248,28,345,289,30,390,303,30,404,300,33,109,108,54,184,178,72,268,239,84,345,278,88,390,291,88,404,289,53,109,99,88,184,164,118,268,220,137,345,256,143,390,268,142,404,266,71,109,87,118,184,144,158,268,193,184,345,224,193,390,235,191,404,233,87,109,71,144,184,118,193,268,158,224,345,184,235,390,193,233,404,191,99,109,53,164,184,88,220,268,118,256,345,137,268,390,143,266,404,142,108,109,33,178,184,54,239,268,72,278,345,84,291,390,88,289,404,88,112,109,11,185,184,18,248,268,24,289,345,28,303,390,30,300,404,30,95,92,0,75,75,0,54,59,0,30,38,0,93,92,19,74,75,15,53,59,11,29,38,6,88,92,36,69,75,29,50,59,21,28,38,11,79,92,53,63,75,42,45,59,30,25,38,17,67,92,67,53,75,53,39,59,39,21,38,21,53,92,79,42,75,63,30,59,45,17,38,25,36,92,88,29,75,69,21,59,50,11,38,28,19,92,93,15,75,74,11,59,53,6,38,29,0,92,95,0,75,75,0,59,54,0,38,30,18,27,2,43,49,4,65,67,6,85,84,8,17,27,5,41,49,12,62,67,19,82,84,25,16,27,9,38,49,20,57,67,31,75,84,40,14,27,12,33,49,27,50,67,41,66,84,54,12,27,14,27,49,33,41,67,50,54,84,66,9,27,16,20,49,38,31,67,57,40,84,75,5,27,17,12,49,41,19,67,62,25,84,82,2,27,18,4,49,43,6,67,65,8,84,85,2,15,9,4,15,9,5,15,8,7,15,7,8,15,5,9,15,4,9,15,2,9,15,0,74,405,245,162,405,198,226,405,121,254,405,25,290,405,0,268,405,111,205,405,205,161,405,241,57,405,284,306,401,0,300,401,60,282,401,117,254,401,170,216,401,216,170,401,254,117,401,282,60,401,300,0,401,306,304,398,30,292,398,89,270,398,144,236,398,194,194,398,236,144,398,270,89,398,292,30,398,304,0,405,160,31,405,157,61,405,148,89,405,133,113,405,113,133,405,89,148,405,61,157,405,31,160,405,0,0,1,0,302,404,0,304,390,0,290,345,0,249,268,0,186,184,0,113,109,0,296,404,59,298,390,59,285,345,57,245,268,49,183,184,36,110,109,22,279,404,115,281,390,116,268,345,111,230,268,95,172,184,71,104,109,43,251,404,168,253,390,169,241,345,161,207,268,139,155,184,104,94,109,63,213,404,213,215,390,215,205,345,205,176,268,176,132,184,132,80,109,80,168,404,251,169,390,253,161,345,241,139,268,207,104,184,155,63,109,94,115,404,279,116,390,281,111,345,268,95,268,230,71,184,172,43,109,104,59,404,296,59,390,298,57,345,285,49,268,245,36,184,183,22,109,110,0,404,302,0,390,304,0,345,290,0,268,249,0,184,186,0,109,113,85,84,0,65,67,0,43,49,0,18,26,0,84,84,17,64,67,13,42,49,8,18,26,3,79,84,33,60,67,25,40,49,16,17,26,7,71,84,47,54,67,36,36,49,24,15,26,10,60,84,60,46,67,46,30,49,30,13,26,13,47,84,71,36,67,54,24,49,36,10,26,15,33,84,79,25,67,60,16,49,40,7,26,17,17,84,84,13,67,64,8,49,42,3,26,18,0,84,85,0,67,65,0,49,43,0,26,18,250,405,0,245,405,49,231,405,96,208,405,139,177,405,177,139,405,208,96,405,231,49,405,245,0,405,250,306,398,0,300,398,60,282,398,117,254,398,170,216,398,216,170,398,254,117,398,282,60,398,300,0,398,306,0,405,0]},{"name":"animation_000004","vertices":[9,92,94,14,142,146,22,226,219,26,295,264,27,323,278,27,330,278,28,92,91,43,142,140,64,226,211,77,295,254,81,323,267,81,330,267,45,92,84,69,142,129,104,226,194,125,295,234,132,323,246,132,330,246,60,92,73,93,142,113,140,226,170,169,295,205,177,323,216,177,330,216,73,92,60,113,142,93,170,226,140,205,295,169,216,323,177,216,330,177,84,92,45,129,142,69,194,226,104,234,295,125,246,323,132,246,330,132,91,92,28,140,142,43,211,226,64,254,295,77,267,323,81,267,330,81,94,92,9,146,142,14,219,226,22,264,295,26,278,323,27,278,330,27,11,17,1,30,38,3,54,59,5,75,75,7,10,17,3,29,38,9,52,59,16,72,75,22,9,17,5,26,38,14,48,59,26,66,75,35,8,17,7,23,38,19,42,59,35,58,75,48,7,17,8,19,38,23,35,59,42,48,75,58,5,17,9,14,38,26,26,59,48,35,75,66,3,17,10,9,38,29,16,59,52,22,75,72,1,17,11,3,38,30,5,59,54,7,75,75,77,334,254,254,334,77,205,334,168,125,334,234,26,334,264,264,334,26,234,334,125,168,334,205,278,325,27,267,325,81,246,325,132,216,325,177,177,325,216,132,325,246,81,325,267,27,325,278,16,334,167,49,334,160,79,334,148,106,334,129,129,334,106,148,334,79,160,334,49,167,334,16,0,15,9,101,334,245,220,334,147,279,325,0,279,323,0,266,295,0,221,226,0,147,142,0,274,325,54,274,323,54,261,295,52,216,226,43,144,142,29,258,325,107,258,323,107,245,295,102,204,226,84,136,142,56,260,334,52,232,325,155,232,323,155,221,295,148,183,226,123,122,142,82,197,325,197,197,323,197,188,295,188,156,226,156,104,142,104,155,325,232,155,323,232,148,295,221,123,226,183,82,142,122,107,325,258,107,323,258,102,295,245,84,226,204,56,142,136,0,334,265,54,325,274,54,323,274,52,295,261,43,226,216,29,142,144,0,325,279,0,323,279,0,295,266,0,226,221,0,142,147,224,334,68,181,334,148,110,334,206,23,334,233,11,109,112,18,184,185,24,264,246,27,315,275,27,324,278,27,333,274,33,109,108,54,184,178,72,264,237,80,315,264,81,324,267,80,333,264,53,109,99,88,184,164,117,264,218,130,315,243,132,324,246,130,333,243,71,109,87,118,184,144,157,264,191,175,315,213,177,324,216,175,333,213,87,109,71,144,184,118,191,264,157,213,315,175,216,324,177,213,333,175,99,109,53,164,184,88,218,264,117,243,315,130,246,324,132,243,333,130,108,109,33,178,184,54,237,264,72,264,315,80,267,324,81,264,333,80,112,109,11,185,184,18,246,264,24,275,315,27,278,324,27,274,333,27,95,92,0,75,75,0,54,59,0,30,38,0,93,92,19,74,75,15,53,59,11,29,38,6,88,92,36,69,75,29,50,59,21,28,38,11,79,92,53,63,75,42,45,59,30,25,38,17,67,92,67,53,75,53,39,59,39,21,38,21,53,92,79,42,75,63,30,59,45,17,38,25,36,92,88,29,75,69,21,59,50,11,38,28,19,92,93,15,75,74,11,59,53,6,38,29,0,92,95,0,75,75,0,59,54,0,38,30,18,27,2,43,49,4,65,67,6,85,84,8,17,27,5,41,49,12,62,67,19,82,84,25,16,27,9,38,49,20,57,67,31,75,84,40,14,27,12,33,49,27,50,67,41,66,84,54,12,27,14,27,49,33,41,67,50,54,84,66,9,27,16,20,49,38,31,67,57,40,84,75,5,27,17,12,49,41,19,67,62,25,84,82,2,27,18,4,49,43,6,67,65,8,84,85,2,15,9,4,15,9,5,15,8,7,15,7,8,15,5,9,15,4,9,15,2,9,15,0,68,334,224,148,334,181,206,334,110,233,334,23,265,334,0,245,334,101,187,334,187,147,334,220,52,334,260,279,330,0,274,330,54,258,330,107,232,330,155,197,330,197,155,330,232,107,330,258,54,330,274,0,330,279,278,327,27,267,327,81,246,327,132,216,327,177,177,327,216,132,327,246,81,327,267,27,327,278,0,334,146,29,334,144,56,334,135,81,334,122,103,334,103,122,334,81,135,334,56,144,334,29,146,334,0,0,1,0,276,333,0,279,324,0,276,315,0,248,264,0,186,184,0,113,109,0,270,333,54,274,324,54,271,315,54,243,264,48,183,184,36,110,109,22,255,333,105,258,324,107,255,315,106,229,264,95,172,184,71,104,109,43,229,333,153,232,324,155,229,315,153,206,264,138,155,184,104,94,109,63,195,333,195,197,324,197,195,315,195,175,264,175,132,184,132,80,109,80,153,333,229,155,324,232,153,315,229,138,264,206,104,184,155,63,109,94,105,333,255,107,324,258,106,315,255,95,264,229,71,184,172,43,109,104,54,333,270,54,324,274,54,315,271,48,264,243,36,184,183,22,109,110,0,333,276,0,324,279,0,315,276,0,264,248,0,184,186,0,109,113,85,84,0,65,67,0,43,49,0,18,26,0,84,84,17,64,67,13,42,49,8,18,26,3,79,84,33,60,67,25,40,49,16,17,26,7,71,84,47,54,67,36,36,49,24,15,26,10,60,84,60,46,67,46,30,49,30,13,26,13,47,84,71,36,67,54,24,49,36,10,26,15,33,84,79,25,67,60,16,49,40,7,26,17,17,84,84,13,67,64,8,49,42,3,26,18,0,84,85,0,67,65,0,49,43,0,26,18,228,334,0,224,334,45,211,334,87,190,334,127,161,334,161,127,334,190,87,334,211,45,334,224,0,334,228,279,327,0,274,327,54,258,327,107,232,327,155,197,327,197,155,327,232,107,327,258,54,327,274,0,327,279,0,334,0]},{"name":"animation_000005","vertices":[9,92,94,14,142,146,21,213,209,23,242,230,23,244,230,23,251,230,28,92,91,43,142,140,61,213,201,67,242,221,67,244,221,67,251,221,45,92,84,69,142,129,99,213,185,109,242,204,109,244,204,109,251,204,60,92,73,93,142,113,133,213,162,147,242,179,147,244,179,147,251,179,73,92,60,113,142,93,162,213,133,179,242,147,179,244,147,179,251,147,84,92,45,129,142,69,185,213,99,204,242,109,204,244,109,204,251,109,91,92,28,140,142,43,201,213,61,221,242,67,221,244,67,221,251,67,94,92,9,146,142,14,209,213,21,230,242,23,230,244,23,230,251,23,11,17,1,30,38,3,54,59,5,75,75,7,10,17,3,29,38,9,52,59,16,72,75,22,9,17,5,26,38,14,48,59,26,66,75,35,8,17,7,23,38,19,42,59,35,58,75,48,7,17,8,19,38,23,35,59,42,48,75,58,5,17,9,14,38,26,26,59,48,35,75,66,3,17,10,9,38,29,16,59,52,22,75,72,1,17,11,3,38,30,5,59,54,7,75,75,64,255,210,210,255,64,170,255,139,104,255,194,22,255,219,219,255,22,194,255,104,139,255,170,230,246,23,221,246,67,204,246,109,179,246,147,147,246,179,109,246,204,67,246,221,23,246,230,14,255,138,40,255,133,65,255,122,88,255,107,107,255,88,122,255,65,133,255,40,138,255,14,0,15,9,84,255,203,183,255,122,231,246,0,231,244,0,231,242,0,210,213,0,147,142,0,227,246,45,227,244,45,227,242,45,206,213,41,144,142,29,214,246,89,214,244,89,214,242,89,194,213,80,136,142,56,215,255,43,192,246,129,192,244,129,192,242,129,175,213,117,122,142,82,164,246,164,164,244,164,164,242,164,149,213,149,104,142,104,129,246,192,129,244,192,129,242,192,117,213,175,82,142,122,89,246,214,89,244,214,89,242,214,80,213,194,56,142,136,0,255,220,45,246,227,45,244,227,45,242,227,41,213,206,29,142,144,0,246,231,0,244,231,0,242,231,0,213,210,0,142,147,185,255,56,150,255,123,91,255,171,19,255,193,11,109,112,18,181,183,22,234,225,23,243,230,23,245,230,22,254,227,33,109,108,53,181,176,66,234,216,67,243,221,67,245,221,66,254,218,53,109,99,87,181,162,107,234,199,109,243,204,109,245,204,108,254,201,71,109,87,117,181,142,143,234,175,147,243,179,147,245,179,145,254,176,87,109,71,142,181,117,175,234,143,179,243,147,179,245,147,176,254,145,99,109,53,162,181,87,199,234,107,204,243,109,204,245,109,201,254,108,108,109,33,176,181,53,216,234,66,221,243,67,221,245,67,218,254,66,112,109,11,183,181,18,225,234,22,230,243,23,230,245,23,227,254,22,95,92,0,75,75,0,54,59,0,30,38,0,93,92,19,74,75,15,53,59,11,29,38,6,88,92,36,69,75,29,50,59,21,28,38,11,79,92,53,63,75,42,45,59,30,25,38,17,67,92,67,53,75,53,39,59,39,21,38,21,53,92,79,42,75,63,30,59,45,17,38,25,36,92,88,29,75,69,21,59,50,11,38,28,19,92,93,15,75,74,11,59,53,6,38,29,0,92,95,0,75,75,0,59,54,0,38,30,18,27,2,43,49,4,65,67,6,85,84,8,17,27,5,41,49,12,62,67,19,82,84,25,16,27,9,38,49,20,57,67,31,75,84,40,14,27,12,33,49,27,50,67,41,66,84,54,12,27,14,27,49,33,41,67,50,54,84,66,9,27,16,20,49,38,31,67,57,40,84,75,5,27,17,12,49,41,19,67,62,25,84,82,2,27,18,4,49,43,6,67,65,8,84,85,2,15,9,4,15,9,5,15,8,7,15,7,8,15,5,9,15,4,9,15,2,9,15,0,56,255,185,123,255,150,171,255,91,193,255,19,220,255,0,203,255,84,155,255,155,122,255,183,43,255,215,231,251,0,227,251,45,214,251,88,192,251,128,164,251,164,128,251,192,88,251,214,45,251,227,0,251,231,230,248,23,221,248,67,204,248,109,179,248,147,147,248,179,109,248,204,67,248,221,23,248,230,0,255,121,24,255,119,46,255,112,67,255,101,86,255,86,101,255,67,112,255,46,119,255,24,121,255,0,0,1,0,228,254,0,231,245,0,231,243,0,226,234,0,184,181,0,113,109,0,224,254,45,227,245,45,227,243,45,222,234,44,180,181,36,110,109,22,211,254,87,214,245,89,214,243,89,209,234,87,170,181,70,104,109,43,190,254,127,192,245,129,192,243,129,188,234,126,153,181,102,94,109,63,161,254,161,164,245,164,164,243,164,160,234,160,130,181,130,80,109,80,127,254,190,129,245,192,129,243,192,126,234,188,102,181,153,63,109,94,87,254,211,89,245,214,89,243,214,87,234,209,70,181,170,43,109,104,45,254,224,45,245,227,45,243,227,44,234,222,36,181,180,22,109,110,0,254,228,0,245,231,0,243,231,0,234,226,0,181,184,0,109,113,85,84,0,65,67,0,43,49,0,18,26,0,84,84,17,64,67,13,42,49,8,18,26,3,79,84,33,60,67,25,40,49,16,17,26,7,71,84,47,54,67,36,36,49,24,15,26,10,60,84,60,46,67,46,30,49,30,13,26,13,47,84,71,36,67,54,24,49,36,10,26,15,33,84,79,25,67,60,16,49,40,7,26,17,17,84,84,13,67,64,8,49,42,3,26,18,0,84,85,0,67,65,0,49,43,0,26,18,189,255,0,186,255,37,175,255,72,157,255,105,134,255,134,105,255,157,72,255,175,37,255,186,0,255,189,231,248,0,227,248,45,214,248,89,192,248,129,164,248,164,129,248,192,89,248,214,45,248,227,0,248,231,0,255,0]},{"name":"animation_000006","vertices":[9,92,94,13,132,135,16,164,166,16,166,166,16,168,166,16,175,166,28,92,91,39,132,130,48,164,159,48,166,159,48,168,159,48,175,159,45,92,84,64,132,119,78,164,147,78,166,147,78,168,147,78,175,147,60,92,73,86,132,105,106,164,129,106,166,129,106,168,129,106,175,129,73,92,60,105,132,86,129,164,106,129,166,106,129,168,106,129,175,106,84,92,45,119,132,64,147,164,78,147,166,78,147,168,78,147,175,78,91,92,28,130,132,39,159,164,48,159,166,48,159,168,48,159,175,48,94,92,9,135,132,13,166,164,16,166,166,16,166,168,16,166,175,16,11,17,1,30,38,3,54,59,5,75,75,7,10,17,3,29,38,9,52,59,16,72,75,22,9,17,5,26,38,14,48,59,26,66,75,35,8,17,7,23,38,19,42,59,35,58,75,48,7,17,8,19,38,23,35,59,42,48,75,58,5,17,9,14,38,26,26,59,48,35,75,66,3,17,10,9,38,29,16,59,52,22,75,72,1,17,11,3,38,30,5,59,54,7,75,75,46,179,151,151,179,46,122,179,100,74,179,139,15,179,157,157,179,15,139,179,74,100,179,122,166,170,16,159,170,48,147,170,78,129,170,106,106,170,129,78,170,147,48,170,159,16,170,166,10,179,99,29,179,96,47,179,88,63,179,77,77,179,63,88,179,47,96,179,29,99,179,10,0,15,9,60,179,146,131,179,88,167,170,0,167,168,0,167,166,0,167,164,0,135,132,0,163,170,32,163,168,32,163,166,32,163,164,32,133,132,26,154,170,64,154,168,64,154,166,64,154,164,64,125,132,52,155,179,31,138,170,93,138,168,93,138,166,93,138,164,93,113,132,75,118,170,118,118,168,118,118,166,118,118,164,118,96,132,96,93,170,138,93,168,138,93,166,138,93,164,138,75,132,113,64,170,154,64,168,154,64,166,154,64,164,154,52,132,125,0,179,158,32,170,163,32,168,163,32,166,163,32,164,163,26,132,133,0,170,167,0,168,167,0,166,167,0,164,167,0,132,135,133,179,40,108,179,88,66,179,123,14,179,139,11,106,109,16,155,158,16,165,166,16,167,166,16,169,166,16,178,163,32,106,105,46,155,152,48,165,159,48,167,159,48,169,159,48,178,157,52,106,97,75,155,140,78,165,147,78,167,147,78,169,147,77,178,145,70,106,85,101,155,123,106,165,129,106,167,129,106,169,129,104,178,127,85,106,70,123,155,101,129,165,106,129,167,106,129,169,106,127,178,104,97,106,52,140,155,75,147,165,78,147,167,78,147,169,78,145,178,77,105,106,32,152,155,46,159,165,48,159,167,48,159,169,48,157,178,48,109,106,11,158,155,16,166,165,16,166,167,16,166,169,16,163,178,16,95,92,0,75,75,0,54,59,0,30,38,0,93,92,19,74,75,15,53,59,11,29,38,6,88,92,36,69,75,29,50,59,21,28,38,11,79,92,53,63,75,42,45,59,30,25,38,17,67,92,67,53,75,53,39,59,39,21,38,21,53,92,79,42,75,63,30,59,45,17,38,25,36,92,88,29,75,69,21,59,50,11,38,28,19,92,93,15,75,74,11,59,53,6,38,29,0,92,95,0,75,75,0,59,54,0,38,30,18,27,2,43,49,4,65,67,6,85,84,8,17,27,5,41,49,12,62,67,19,82,84,25,16,27,9,38,49,20,57,67,31,75,84,40,14,27,12,33,49,27,50,67,41,66,84,54,12,27,14,27,49,33,41,67,50,54,84,66,9,27,16,20,49,38,31,67,57,40,84,75,5,27,17,12,49,41,19,67,62,25,84,82,2,27,18,4,49,43,6,67,65,8,84,85,2,15,9,4,15,9,5,15,8,7,15,7,8,15,5,9,15,4,9,15,2,9,15,0,40,179,133,88,179,108,123,179,66,139,179,14,158,179,0,146,179,60,112,179,112,88,179,131,31,179,155,166,175,0,163,175,32,154,175,64,138,175,92,118,175,118,92,175,138,64,175,154,32,175,163,0,175,166,166,171,16,159,171,48,147,171,78,129,171,106,106,171,129,78,171,147,48,171,159,16,171,166,0,179,87,17,179,86,33,179,81,48,179,73,62,179,62,73,179,48,81,179,33,86,179,17,87,179,0,0,1,0,164,178,0,167,169,0,167,167,0,167,165,0,159,155,0,110,106,0,161,178,32,163,169,32,163,167,32,163,165,32,156,155,31,108,106,21,152,178,63,154,169,64,154,167,64,154,165,64,147,155,61,101,106,42,137,178,91,138,169,93,138,167,93,138,165,93,132,155,88,91,106,61,116,178,116,118,169,118,118,167,118,118,165,118,112,155,112,78,106,78,91,178,137,93,169,138,93,167,138,93,165,138,88,155,132,61,106,91,63,178,152,64,169,154,64,167,154,64,165,154,61,155,147,42,106,101,32,178,161,32,169,163,32,167,163,32,165,163,31,155,156,21,106,108,0,178,164,0,169,167,0,167,167,0,165,167,0,155,159,0,106,110,85,84,0,65,67,0,43,49,0,18,26,0,84,84,17,64,67,13,42,49,8,18,26,3,79,84,33,60,67,25,40,49,16,17,26,7,71,84,47,54,67,36,36,49,24,15,26,10,60,84,60,46,67,46,30,49,30,13,26,13,47,84,71,36,67,54,24,49,36,10,26,15,33,84,79,25,67,60,16,49,40,7,26,17,17,84,84,13,67,64,8,49,42,3,26,18,0,84,85,0,67,65,0,49,43,0,26,18,136,179,0,134,179,27,126,179,52,113,179,76,96,179,96,76,179,113,52,179,126,27,179,134,0,179,136,166,171,0,163,171,32,154,171,64,138,171,93,118,171,118,93,171,138,64,171,154,32,171,163,0,171,166,0,179,0]},{"name":"animation_000007","vertices":[9,90,92,10,97,98,10,99,98,10,101,98,10,103,98,10,110,98,27,90,88,29,97,95,29,99,95,29,101,95,29,103,95,29,110,95,43,90,81,47,97,87,47,99,87,47,101,87,47,103,87,47,110,87,58,90,71,63,97,76,63,99,76,63,101,76,63,103,76,63,110,76,71,90,58,76,97,63,76,99,63,76,101,63,76,103,63,76,110,63,81,90,43,87,97,47,87,99,47,87,101,47,87,103,47,87,110,47,88,90,27,95,97,29,95,99,29,95,101,29,95,103,29,95,110,29,92,90,9,98,97,10,98,99,10,98,101,10,98,103,10,98,110,10,11,17,1,30,38,3,54,59,5,75,75,7,10,17,3,29,38,9,52,59,16,72,75,22,9,17,5,26,38,14,48,59,26,66,75,35,8,17,7,23,38,19,42,59,35,58,75,48,7,17,8,19,38,23,35,59,42,48,75,58,5,17,9,14,38,26,26,59,48,35,75,66,3,17,10,9,38,29,16,59,52,22,75,72,1,17,11,3,38,30,5,59,54,7,75,75,27,114,90,90,114,27,73,114,60,44,114,83,9,114,93,93,114,9,83,114,44,60,114,73,98,105,10,95,105,29,87,105,47,76,105,63,63,105,76,47,105,87,29,105,95,10,105,98,6,114,59,17,114,57,28,114,52,38,114,46,46,114,38,52,114,28,57,114,17,59,114,6,0,15,9,36,114,87,78,114,52,99,105,0,99,103,0,99,101,0,99,99,0,99,97,0,97,105,19,97,103,19,97,101,19,97,99,19,97,97,19,91,105,38,91,103,38,91,101,38,91,99,38,91,97,38,92,114,18,82,105,55,82,103,55,82,101,55,82,99,55,82,97,55,70,105,70,70,103,70,70,101,70,70,99,70,70,97,70,55,105,82,55,103,82,55,101,82,55,99,82,55,97,82,38,105,91,38,103,91,38,101,91,38,99,91,38,97,91,0,114,94,19,105,97,19,103,97,19,101,97,19,99,97,19,97,97,0,105,99,0,103,99,0,101,99,0,99,99,0,97,99,79,114,24,64,114,52,39,114,73,8,114,82,10,95,97,10,98,98,10,100,98,10,102,98,10,104,98,10,113,97,28,95,93,29,98,95,29,100,95,29,102,95,29,104,95,28,113,93,46,95,86,47,98,87,47,100,87,47,102,87,47,104,87,46,113,86,62,95,75,63,98,76,63,100,76,63,102,76,63,104,76,62,113,75,75,95,62,76,98,63,76,100,63,76,102,63,76,104,63,75,113,62,86,95,46,87,98,47,87,100,47,87,102,47,87,104,47,86,113,46,93,95,28,95,98,29,95,100,29,95,102,29,95,104,29,93,113,28,97,95,10,98,98,10,98,100,10,98,102,10,98,104,10,97,113,10,92,90,0,75,75,0,54,59,0,30,38,0,90,90,18,74,75,15,53,59,11,29,38,6,85,90,35,69,75,29,50,59,21,28,38,11,77,90,51,63,75,42,45,59,30,25,38,17,65,90,65,53,75,53,39,59,39,21,38,21,51,90,77,42,75,63,30,59,45,17,38,25,35,90,85,29,75,69,21,59,50,11,38,28,18,90,90,15,75,74,11,59,53,6,38,29,0,90,92,0,75,75,0,59,54,0,38,30,18,27,2,43,49,4,65,67,6,84,83,8,17,27,5,41,49,12,62,67,19,81,83,25,16,27,9,38,49,20,57,67,31,75,83,40,14,27,12,33,49,27,50,67,41,65,83,54,12,27,14,27,49,33,41,67,50,54,83,65,9,27,16,20,49,38,31,67,57,40,83,75,5,27,17,12,49,41,19,67,62,25,83,81,2,27,18,4,49,43,6,67,65,8,83,84,2,15,9,4,15,9,5,15,8,7,15,7,8,15,5,9,15,4,9,15,2,9,15,0,24,114,79,52,114,64,73,114,39,82,114,8,94,114,0,87,114,36,66,114,66,52,114,78,18,114,92,99,110,0,97,110,19,91,110,38,82,110,55,70,110,70,55,110,82,38,110,91,19,110,97,0,110,99,98,107,10,95,107,29,87,107,47,76,107,63,63,107,76,47,107,87,29,107,95,10,107,98,0,114,52,10,114,51,20,114,48,29,114,43,37,114,37,43,114,29,48,114,20,51,114,10,52,114,0,0,1,0,98,113,0,99,104,0,99,102,0,99,100,0,99,98,0,97,95,0,96,113,19,97,104,19,97,102,19,97,100,19,97,98,19,95,95,19,90,113,37,91,104,38,91,102,38,91,100,38,91,98,38,90,95,37,81,113,54,82,104,55,82,102,55,82,100,55,82,98,55,81,95,54,69,113,69,70,104,70,70,102,70,70,100,70,70,98,70,69,95,69,54,113,81,55,104,82,55,102,82,55,100,82,55,98,82,54,95,81,37,113,90,38,104,91,38,102,91,38,100,91,38,98,91,37,95,90,19,113,96,19,104,97,19,102,97,19,100,97,19,98,97,19,95,95,0,113,98,0,104,99,0,102,99,0,100,99,0,98,99,0,95,97,84,83,0,65,67,0,43,49,0,18,26,0,83,83,16,64,67,13,42,49,8,18,26,3,78,83,32,60,67,25,40,49,16,17,26,7,70,83,47,54,67,36,36,49,24,15,26,10,60,83,60,46,67,46,30,49,30,13,26,13,47,83,70,36,67,54,24,49,36,10,26,15,32,83,78,25,67,60,16,49,40,7,26,17,16,83,83,13,67,64,8,49,42,3,26,18,0,83,84,0,67,65,0,49,43,0,26,18,81,114,0,79,114,16,75,114,31,67,114,45,57,114,57,45,114,67,31,114,75,16,114,79,0,114,81,99,107,0,97,107,19,91,107,38,82,107,55,70,107,70,55,107,82,38,107,91,19,107,97,0,107,99,0,114,0]},{"name":"animation_000008","vertices":[4,52,40,4,54,40,4,56,40,4,58,40,4,60,40,4,67,40,12,52,38,12,54,38,12,56,38,12,58,38,12,60,38,12,67,38,19,52,35,19,54,35,19,56,35,19,58,35,19,60,35,19,67,35,25,52,31,25,54,31,25,56,31,25,58,31,25,60,31,25,67,31,31,52,25,31,54,25,31,56,25,31,58,25,31,60,25,31,67,25,35,52,19,35,54,19,35,56,19,35,58,19,35,60,19,35,67,19,38,52,12,38,54,12,38,56,12,38,58,12,38,60,12,38,67,12,40,52,4,40,54,4,40,56,4,40,58,4,40,60,4,40,67,4,11,17,1,28,37,3,40,48,4,40,50,4,10,17,3,27,37,8,38,48,12,38,50,12,9,17,5,25,37,13,35,48,19,35,50,19,8,17,7,22,37,18,31,48,25,31,50,25,7,17,8,18,37,22,25,48,31,25,50,31,5,17,9,13,37,25,19,48,35,19,50,35,3,17,10,8,37,27,12,48,38,12,50,38,1,17,11,3,37,28,4,48,40,4,50,40,11,71,36,36,71,11,29,71,24,18,71,33,4,71,38,38,71,4,33,71,18,24,71,29,40,62,4,38,62,12,35,62,19,31,62,25,25,62,31,19,62,35,12,62,38,4,62,40,2,71,24,7,71,23,11,71,21,15,71,18,18,71,15,21,71,11,23,71,7,24,71,2,0,15,9,14,71,35,31,71,21,40,62,0,40,60,0,40,58,0,40,56,0,40,54,0,39,62,8,39,60,8,39,58,8,39,56,8,39,54,8,37,62,15,37,60,15,37,58,15,37,56,15,37,54,15,37,71,7,33,62,22,33,60,22,33,58,22,33,56,22,33,54,22,28,62,28,28,60,28,28,58,28,28,56,28,28,54,28,22,62,33,22,60,33,22,58,33,22,56,33,22,54,33,15,62,37,15,60,37,15,58,37,15,56,37,15,54,37,0,71,38,8,62,39,8,60,39,8,58,39,8,56,39,8,54,39,0,62,40,0,60,40,0,58,40,0,56,40,0,54,40,32,71,10,26,71,21,16,71,29,3,71,33,4,53,40,4,55,40,4,57,40,4,59,40,4,61,40,4,70,39,12,53,38,12,55,38,12,57,38,12,59,38,12,61,38,11,70,38,19,53,35,19,55,35,19,57,35,19,59,35,19,61,35,19,70,35,25,53,31,25,55,31,25,57,31,25,59,31,25,61,31,25,70,30,31,53,25,31,55,25,31,57,25,31,59,25,31,61,25,30,70,25,35,53,19,35,55,19,35,57,19,35,59,19,35,61,19,35,70,19,38,53,12,38,55,12,38,57,12,38,59,12,38,61,12,38,70,11,40,53,4,40,55,4,40,57,4,40,59,4,40,61,4,39,70,4,40,52,0,40,50,0,40,48,0,28,37,0,39,52,8,39,50,8,39,48,8,27,37,5,37,52,15,37,50,15,37,48,15,26,37,11,33,52,22,33,50,22,33,48,22,23,37,16,28,52,28,28,50,28,28,48,28,20,37,20,22,52,33,22,50,33,22,48,33,16,37,23,15,52,37,15,50,37,15,48,37,11,37,26,8,52,39,8,50,39,8,48,39,5,37,27,0,52,40,0,50,40,0,48,40,0,37,28,18,27,2,37,45,4,40,49,4,40,51,4,17,27,5,35,45,11,38,49,12,38,51,12,16,27,8,32,45,17,35,49,19,35,51,19,14,27,11,28,45,23,31,49,25,31,51,25,11,27,14,23,45,28,25,49,31,25,51,31,8,27,16,17,45,32,19,49,35,19,51,35,5,27,17,11,45,35,12,49,38,12,51,38,2,27,18,4,45,37,4,49,40,4,51,40,2,15,9,4,15,9,5,15,8,7,15,7,8,15,5,9,15,4,9,15,2,9,15,0,10,71,32,21,71,26,29,71,16,33,71,3,38,71,0,35,71,14,27,71,27,21,71,31,7,71,37,40,67,0,39,67,8,37,67,15,33,67,22,28,67,28,22,67,33,15,67,37,8,67,39,0,67,40,40,64,4,38,64,12,35,64,19,31,64,25,25,64,31,19,64,35,12,64,38,4,64,40,0,71,21,4,71,20,8,71,19,12,71,17,15,71,15,17,71,12,19,71,8,20,71,4,21,71,0,0,1,0,39,70,0,40,61,0,40,59,0,40,57,0,40,55,0,40,53,0,39,70,8,39,61,8,39,59,8,39,57,8,39,55,8,39,53,8,36,70,15,37,61,15,37,59,15,37,57,15,37,55,15,37,53,15,33,70,22,33,61,22,33,59,22,33,57,22,33,55,22,33,53,22,28,70,28,28,61,28,28,59,28,28,57,28,28,55,28,28,53,28,22,70,33,22,61,33,22,59,33,22,57,33,22,55,33,22,53,33,15,70,36,15,61,37,15,59,37,15,57,37,15,55,37,15,53,37,8,70,39,8,61,39,8,59,39,8,57,39,8,55,39,8,53,39,0,70,39,0,61,40,0,59,40,0,57,40,0,55,40,0,53,40,40,51,0,40,49,0,37,45,0,17,26,0,39,51,8,39,49,8,36,45,7,17,26,3,37,51,15,37,49,15,34,45,14,16,26,7,33,51,22,33,49,22,31,45,20,14,26,10,28,51,28,28,49,28,26,45,26,12,26,12,22,51,33,22,49,33,20,45,31,10,26,14,15,51,37,15,49,37,14,45,34,7,26,16,8,51,39,8,49,39,7,45,36,3,26,17,0,51,40,0,49,40,0,45,37,0,26,17,33,71,0,32,71,6,30,71,12,27,71,18,23,71,23,18,71,27,12,71,30,6,71,32,0,71,33,40,64,0,39,64,8,37,64,15,33,64,22,28,64,28,22,64,33,15,64,37,8,64,39,0,64,40,0,71,0]},{"name":"animation_000009","vertices":[0,10,5,0,10,5,0,11,5,0,12,5,0,12,5,0,14,5,1,10,5,1,10,5,1,11,5,1,12,5,1,12,5,1,14,5,2,10,4,2,10,4,2,11,4,2,12,4,2,12,4,2,14,4,3,10,4,3,10,4,3,11,4,3,12,4,3,12,4,3,14,4,4,10,3,4,10,3,4,11,3,4,12,3,4,12,3,4,14,3,4,10,2,4,10,2,4,11,2,4,12,2,4,12,2,4,14,2,5,10,1,5,10,1,5,11,1,5,12,1,5,12,1,5,14,1,5,10,0,5,10,0,5,11,0,5,12,0,5,12,0,5,14,0,3,5,0,5,8,0,5,9,0,5,9,0,3,5,1,5,8,1,5,9,1,5,9,1,3,5,1,4,8,2,4,9,2,4,9,2,2,5,2,4,8,3,4,9,3,4,9,3,2,5,2,3,8,4,3,9,4,3,9,4,1,5,3,2,8,4,2,9,4,2,9,4,1,5,3,1,8,5,1,9,5,1,9,5,0,5,3,0,8,5,0,9,5,0,9,5,1,15,4,4,15,1,3,15,3,2,15,4,0,15,4,4,15,0,4,15,2,3,15,3,5,13,0,5,13,1,4,13,2,4,13,3,3,13,4,2,13,4,1,13,5,0,13,5,0,15,3,1,15,3,1,15,3,2,15,2,2,15,2,3,15,1,3,15,1,3,15,0,0,5,3,2,15,4,4,15,3,5,13,0,5,12,0,5,12,0,5,11,0,5,10,0,5,13,1,5,12,1,5,12,1,5,11,1,5,10,1,4,13,2,4,12,2,4,12,2,4,11,2,4,10,2,4,15,1,4,13,3,4,12,3,4,12,3,4,11,3,4,10,3,3,13,3,3,12,3,3,12,3,3,11,3,3,10,3,3,13,4,3,12,4,3,12,4,3,11,4,3,10,4,2,13,4,2,12,4,2,12,4,2,11,4,2,10,4,0,15,5,1,13,5,1,12,5,1,12,5,1,11,5,1,10,5,0,13,5,0,12,5,0,12,5,0,11,5,0,10,5,4,15,1,3,15,3,2,15,4,0,15,4,0,10,5,0,11,5,0,11,5,0,12,5,0,12,5,0,15,5,1,10,5,1,11,5,1,11,5,1,12,5,1,12,5,1,15,4,2,10,4,2,11,4,2,11,4,2,12,4,2,12,4,2,15,4,3,10,4,3,11,4,3,11,4,3,12,4,3,12,4,3,15,4,4,10,3,4,11,3,4,11,3,4,12,3,4,12,3,4,15,3,4,10,2,4,11,2,4,11,2,4,12,2,4,12,2,4,15,2,5,10,1,5,11,1,5,11,1,5,12,1,5,12,1,4,15,1,5,10,0,5,11,0,5,11,0,5,12,0,5,12,0,5,15,0,5,10,0,5,9,0,5,9,0,5,8,0,5,10,1,5,9,1,5,9,1,5,8,1,4,10,2,4,9,2,4,9,2,4,8,2,4,10,3,4,9,3,4,9,3,4,8,3,3,10,3,3,9,3,3,9,3,3,8,3,3,10,4,3,9,4,3,9,4,3,8,4,2,10,4,2,9,4,2,9,4,2,8,4,1,10,5,1,9,5,1,9,5,1,8,5,0,10,5,0,9,5,0,9,5,0,8,5,4,7,0,5,8,0,5,9,0,5,9,0,4,7,1,5,8,1,5,9,1,5,9,1,4,7,2,4,8,2,4,9,2,4,9,2,3,7,3,4,8,3,4,9,3,4,9,3,3,7,3,3,8,4,3,9,4,3,9,4,2,7,4,2,8,4,2,9,4,2,9,4,1,7,4,1,8,5,1,9,5,1,9,5,0,7,4,0,8,5,0,9,5,0,9,5,1,5,3,1,5,3,2,5,2,2,5,2,2,5,2,3,5,1,3,5,1,3,5,0,1,15,4,3,15,3,4,15,2,4,15,0,5,15,0,4,15,2,3,15,3,3,15,4,1,15,4,5,14,0,5,14,1,4,14,2,4,14,3,3,14,3,3,14,4,2,14,4,1,14,5,0,14,5,5,13,0,5,13,1,4,13,2,4,13,3,3,13,4,2,13,4,1,13,5,0,13,5,0,15,2,0,15,2,1,15,2,1,15,2,2,15,2,2,15,1,2,15,1,2,15,0,2,15,0,0,0,0,5,15,0,5,12,0,5,12,0,5,11,0,5,11,0,5,10,0,5,15,1,5,12,1,5,12,1,5,11,1,5,11,1,5,10,1,4,15,2,4,12,2,4,12,2,4,11,2,4,11,2,4,10,2,4,15,3,4,12,3,4,12,3,4,11,3,4,11,3,4,10,3,3,15,3,3,12,3,3,12,3,3,11,3,3,11,3,3,10,3,3,15,4,3,12,4,3,12,4,3,11,4,3,11,4,3,10,4,2,15,4,2,12,4,2,12,4,2,11,4,2,11,4,2,10,4,1,15,5,1,12,5,1,12,5,1,11,5,1,11,5,1,10,5,0,15,5,0,12,5,0,12,5,0,11,5,0,11,5,0,10,5,5,9,0,5,9,0,5,8,0,4,7,0,5,9,1,5,9,1,5,8,1,4,7,1,4,9,2,4,9,2,4,8,2,4,7,2,4,9,3,4,9,3,4,8,3,4,7,2,3,9,3,3,9,3,3,8,3,3,7,3,3,9,4,3,9,4,3,8,4,2,7,4,2,9,4,2,9,4,2,8,4,2,7,4,1,9,5,1,9,5,1,8,5,1,7,4,0,9,5,0,9,5,0,8,5,0,7,4,4,15,0,4,15,1,4,15,1,3,15,2,3,15,3,2,15,3,1,15,4,1,15,4,0,15,4,5,13,0,5,13,1,4,13,2,4,13,3,3,13,3,3,13,4,2,13,4,1,13,5,0,13,5,0,15,0]}]}

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = function(props) {
  var THREE, blobs, geometry, gradient, i, len, material, offscreenCanvas, offscreenContext2D, ref, unit;
  THREE = __webpack_require__(0);
  geometry = new THREE.PlaneGeometry(10, 10);
  offscreenCanvas = document.createElement('canvas');
  offscreenCanvas.width = 512;
  offscreenCanvas.height = 512;
  offscreenContext2D = offscreenCanvas.getContext('2d');
  gradient = offscreenContext2D.createRadialGradient(256, 256, 256, 256, 256, 128);
  gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
  gradient.addColorStop(1, 'rgba(0, 0, 0, 1)');
  offscreenContext2D.fillStyle = gradient;
  offscreenContext2D.fillRect(0, 0, 512, 512);
  blobs = {};
  ref = ['minute', 'hour', 'day'];
  for (i = 0, len = ref.length; i < len; i++) {
    unit = ref[i];
    material = new THREE.MeshBasicMaterial({
      map: new THREE.CanvasTexture(offscreenCanvas),
      transparent: true,
      opacity: (function() {
        switch (props.theme) {
          case 'lite':
            return 0.5;
          case 'dark':
            return 0.8;
        }
      })()
    });
    blobs[unit] = new THREE.Mesh(geometry, material);
    blobs[unit].name = 'blob';
    blobs[unit].position.y = -7.75;
    blobs[unit].rotation.x = -Math.PI / 2;
  }
  return blobs;
};


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = function(props) {
  var THREE, i, len, ref, timeDisplays, timeSlots, unit, unitNames;
  THREE = __webpack_require__(0);
  timeSlots = (__webpack_require__(21))(props);
  unitNames = (__webpack_require__(23))(props);
  timeDisplays = {};
  ref = ['minute', 'hour', 'day'];
  for (i = 0, len = ref.length; i < len; i++) {
    unit = ref[i];
    timeDisplays[unit] = new THREE.Group();
    timeDisplays[unit].name = 'time-display';
    timeDisplays[unit].position.y = !props.onTableMode ? 12.5 : 14;
    timeDisplays[unit].add(timeSlots[unit], unitNames[unit]);
  }
  return timeDisplays;
};


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = function(props) {
  var THREE, baseGeometries, baseMaterial, digit, digitSlot, edgeGeometries, edgeMaterial, font, fontLoader, i, j, k, l, len, m, n, ref, ref1, timeSlots, unit;
  THREE = __webpack_require__(0);
  fontLoader = new THREE.FontLoader();
  font = fontLoader.parse(__webpack_require__(22));
  baseMaterial = new THREE.MeshBasicMaterial({
    color: (function() {
      switch (props.theme) {
        case 'lite':
          return 0x222222;
        case 'dark':
          return 0xdddddd;
      }
    })(),
    transparent: true,
    opacity: 0.8
  });
  edgeMaterial = new THREE.LineBasicMaterial({
    color: (function() {
      switch (props.theme) {
        case 'lite':
          return 0x222222;
        case 'dark':
          return 0xdddddd;
      }
    })()
  });
  baseGeometries = [];
  edgeGeometries = [];
  for (i = k = 0; k <= 9; i = ++k) {
    baseGeometries[i] = new THREE.TextGeometry("" + i, {
      font: font,
      size: 2.5,
      height: 0,
      curveSegments: 12
    });
    edgeGeometries[i] = new THREE.EdgesGeometry(baseGeometries[i]);
    baseGeometries[i].center();
    edgeGeometries[i].center();
  }
  timeSlots = {};
  ref = ['minute', 'hour', 'day'];
  for (l = 0, len = ref.length; l < len; l++) {
    unit = ref[l];
    timeSlots[unit] = new THREE.Group();
    timeSlots[unit].name = 'time-slot';
    for (j = m = 0, ref1 = 4 + 3; 0 <= ref1 ? m < ref1 : m > ref1; j = 0 <= ref1 ? ++m : --m) {
      digitSlot = new THREE.Group();
      digitSlot.name = "digit-slot-" + j;
      digitSlot.position.x = 2.7 * j - (j < 4 ? 4.05 : 13.5);
      for (i = n = 0; n <= 9; i = ++n) {
        digit = new THREE.Group();
        digit.name = "digit-" + i;
        digit.add.apply(digit, [new THREE.Mesh(baseGeometries[i], baseMaterial), new THREE.LineSegments(edgeGeometries[i], edgeMaterial)]);
        digitSlot.add(digit);
      }
      timeSlots[unit].add(digitSlot);
    }
  }
  return timeSlots;
};


/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = {"glyphs":{"0":{"ha":1017,"x_min":19,"x_max":997,"o":"m 508 -19 q 147 114 274 -19 q 19 540 19 247 q 147 967 19 833 q 508 1100 274 1100 q 870 967 743 1100 q 997 540 997 833 q 880 125 997 269 q 508 -19 763 -19 m 508 228 q 603 331 603 228 l 603 750 q 508 853 603 853 q 414 750 414 853 l 414 331 q 508 228 414 228 z "},"1":{"ha":725,"x_min":19,"x_max":678,"o":"m 61 0 l 61 228 l 194 228 l 194 853 l 19 853 l 19 1010 l 328 1081 l 561 1081 l 561 228 l 678 228 l 678 0 l 61 0 z "},"2":{"ha":901,"x_min":17,"x_max":869,"o":"m 17 119 q 52 331 17 239 q 168 503 88 422 q 390 672 249 585 q 449 717 432 699 q 467 763 467 736 q 385 819 467 819 q 244 788 324 819 q 101 707 165 756 l 19 1003 q 224 1078 108 1047 q 456 1110 339 1110 q 753 1025 647 1110 q 858 785 858 940 q 822 638 858 701 q 733 532 785 575 q 597 433 681 489 q 460 328 504 372 q 417 228 417 285 l 585 228 l 585 307 l 869 307 l 869 0 l 17 0 l 17 119 z "},"3":{"ha":865,"x_min":19,"x_max":849,"o":"m 675 551 q 758 506 718 540 q 823 421 797 472 q 849 307 849 369 q 740 67 849 154 q 417 -19 631 -19 q 214 3 315 -19 q 33 60 113 26 l 33 356 q 212 294 119 318 q 388 271 304 271 q 473 289 446 271 q 500 349 500 307 q 403 429 500 429 l 303 429 l 303 657 l 381 657 q 472 735 472 657 q 381 810 472 810 q 242 778 314 810 q 101 697 169 747 l 19 993 q 213 1069 104 1038 q 431 1100 321 1100 q 725 1019 622 1100 q 828 792 828 939 q 785 641 828 700 q 675 551 742 582 z "},"4":{"ha":964,"x_min":25,"x_max":939,"o":"m 476 0 l 476 174 l 25 174 l 25 401 l 504 1081 l 843 1081 l 843 385 l 939 385 l 939 174 l 843 174 l 843 0 l 476 0 m 282 385 l 476 385 l 476 658 l 282 385 z "},"5":{"ha":904,"x_min":31,"x_max":885,"o":"m 565 714 q 803 622 721 714 q 885 374 885 531 q 831 167 885 256 q 672 29 778 78 q 417 -19 567 -19 q 214 3 315 -19 q 33 60 113 26 l 33 356 q 361 271 214 271 q 475 302 438 271 q 513 400 513 333 q 490 476 513 449 q 419 504 468 504 q 359 485 382 504 q 322 432 336 467 l 31 432 l 90 1081 l 829 1081 l 829 811 l 368 811 l 356 668 q 565 714 443 714 z "},"6":{"ha":963,"x_min":25,"x_max":951,"o":"m 624 682 q 865 593 778 682 q 951 346 951 504 q 835 75 951 169 q 508 -19 719 -19 q 144 113 264 -19 q 25 519 25 246 q 166 960 25 819 q 554 1100 307 1100 q 743 1083 656 1100 q 883 1038 831 1065 l 883 757 q 763 795 831 781 q 618 810 694 810 q 419 663 419 810 l 419 646 q 517 672 463 661 q 624 682 571 682 m 514 228 q 585 256 561 228 q 608 346 608 285 q 584 433 608 401 q 510 464 560 464 q 419 446 463 464 l 419 335 q 443 253 419 279 q 514 228 467 228 z "},"7":{"ha":900,"x_min":14,"x_max":886,"o":"m 169 0 q 222 274 169 124 q 353 565 274 424 q 513 811 432 706 l 306 811 l 306 683 l 14 683 l 14 1081 l 886 1081 l 886 869 q 735 603 810 756 q 612 291 661 451 q 563 0 563 131 l 169 0 z "},"8":{"ha":972,"x_min":14,"x_max":958,"o":"m 768 561 q 902 469 846 533 q 958 299 958 404 q 838 61 958 142 q 486 -19 718 -19 q 134 59 254 -19 q 14 290 14 138 q 74 467 14 400 q 218 561 135 533 q 94 647 144 588 q 44 799 44 706 q 156 1024 44 947 q 486 1100 268 1100 q 814 1024 703 1100 q 925 799 925 947 q 881 646 925 704 q 768 561 836 588 m 486 853 q 392 756 392 853 q 486 664 392 664 q 581 756 581 664 q 486 853 581 853 m 486 228 q 594 339 594 228 q 567 424 594 394 q 486 453 539 453 q 406 424 433 453 q 378 339 378 394 q 486 228 378 228 z "},"9":{"ha":963,"x_min":14,"x_max":940,"o":"m 451 1100 q 819 967 699 1100 q 940 561 940 835 q 799 121 940 261 q 411 -19 658 -19 q 222 -2 310 -19 q 82 43 135 15 l 82 324 q 203 285 135 300 q 347 271 271 271 q 546 418 546 271 l 546 433 q 354 399 457 399 q 103 485 193 399 q 14 728 14 572 q 128 1006 14 913 q 451 1100 242 1100 m 357 733 q 381 647 357 678 q 456 617 406 617 q 546 635 503 617 l 546 746 q 522 827 546 801 q 451 853 499 853 q 381 824 404 853 q 357 733 357 794 z "}},"familyName":"Alfa Slab One","ascender":1439,"descender":-462,"underlinePosition":-104,"underlineThickness":69,"boundingBox":{"yMin":-454,"xMin":-443,"yMax":1719,"xMax":2208},"resolution":1000,"original_font_information":{"format":0,"copyright":"Copyright 2016 The Alfa Slab One Project Authors (http://www.jmsole.cl | info@jmsole.cl), with Reserved Font Name \"Alfa Slab\".","fontFamily":"Alfa Slab One","fontSubfamily":"Regular","uniqueID":"2.000;UKWN;AlfaSlabOne-Regular","fullName":"Alfa Slab One Regular","version":"Version 2.000","postScriptName":"AlfaSlabOne-Regular","trademark":"Alfa Slab is a trademark of JM Sole.","manufacturer":"JM Sole","designer":"JM Sole","manufacturerURL":"http://www.jmsole.cl","designerURL":"http://www.jmsole.cl","licence":"This Font Software is licensed under the SIL Open Font License, Version 1.1. This license is available with a FAQ at: http://scripts.sil.org/OFL","licenceURL":"http://scripts.sil.org/OFL"},"cssFontWeight":"normal","cssFontStyle":"normal"}

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = function(props) {
  var THREE, font, fontLoader, geometry, i, len, material, ref, text, unit, unitNames;
  THREE = __webpack_require__(0);
  fontLoader = new THREE.FontLoader();
  font = fontLoader.parse(__webpack_require__(24));
  material = new THREE.MeshBasicMaterial({
    color: (function() {
      switch (props.theme) {
        case 'lite':
          return 0x222222;
        case 'dark':
          return 0xdddddd;
      }
    })(),
    transparent: true,
    opacity: 0.8
  });
  unitNames = {};
  ref = ['minute', 'hour', 'day'];
  for (i = 0, len = ref.length; i < len; i++) {
    unit = ref[i];
    text = (function() {
      switch (unit) {
        case 'minute':
          return 'MINS';
        case 'hour':
          return 'HOURS';
        case 'day':
          return 'DAYS';
      }
    })();
    geometry = new THREE.TextGeometry(text, {
      font: font,
      size: 0.8,
      height: 0,
      curveSegments: 8
    });
    geometry.center();
    unitNames[unit] = new THREE.Mesh(geometry, material);
    unitNames[unit].name = 'unit-label';
    unitNames[unit].position.y = -2.5;
  }
  return unitNames;
};


/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = {"glyphs":{"A":{"ha":1159,"x_min":84,"x_max":1057,"o":"m 1057 0 l 880 0 l 880 239 l 260 239 l 260 0 l 84 0 l 84 486 q 121 682 84 593 q 222 836 157 772 q 376 937 288 901 q 570 972 465 972 l 968 972 q 1002 966 986 972 q 1031 947 1019 959 q 1050 918 1043 935 q 1057 884 1057 902 l 1057 0 m 260 415 l 880 415 l 880 796 l 570 796 q 536 794 562 796 q 476 782 510 791 q 404 753 441 772 q 334 699 366 733 q 281 612 302 664 q 260 486 260 560 l 260 415 z "},"D":{"ha":1143,"x_min":101,"x_max":1073,"o":"m 1073 407 q 1042 243 1073 318 q 957 115 1011 169 q 828 31 903 61 q 666 0 753 0 l 190 0 q 155 7 171 0 q 126 25 138 14 q 108 54 115 37 q 101 89 101 70 l 101 884 q 108 918 101 902 q 126 947 115 935 q 155 966 138 959 q 190 972 171 972 l 666 972 q 828 942 753 972 q 957 858 903 911 q 1042 729 1011 804 q 1073 566 1073 654 l 1073 407 m 897 566 q 880 660 897 617 q 833 733 863 703 q 760 780 802 763 q 666 796 718 796 l 277 796 l 277 176 l 666 176 q 760 193 718 176 q 833 240 802 210 q 880 312 863 270 q 897 407 897 355 l 897 566 z "},"H":{"ha":1179,"x_min":104,"x_max":1076,"o":"m 280 575 l 899 575 l 899 972 l 1076 972 l 1076 0 l 899 0 l 899 397 l 280 397 l 280 0 l 104 0 l 104 972 l 280 972 l 280 575 z "},"I":{"ha":384,"x_min":104,"x_max":280,"o":"m 280 0 l 104 0 l 104 972 l 280 972 l 280 0 z "},"M":{"ha":1337,"x_min":102,"x_max":1234,"o":"m 1234 0 l 1057 0 l 1057 579 l 744 29 q 712 -3 732 8 q 667 -14 691 -14 q 624 -3 644 -14 q 593 29 604 8 l 279 579 l 279 0 l 102 0 l 102 897 q 120 951 102 928 q 168 983 138 975 q 196 986 182 987 q 223 980 210 985 q 248 965 237 975 q 266 943 258 956 l 667 245 l 1069 943 q 1112 980 1084 969 q 1169 983 1139 991 q 1216 951 1198 975 q 1234 897 1234 928 l 1234 0 z "},"N":{"ha":1177,"x_min":102,"x_max":1074,"o":"m 1074 75 q 1067 40 1074 56 q 1048 12 1060 24 q 1020 -7 1036 0 q 985 -14 1004 -14 q 952 -7 969 -14 q 923 12 936 -1 l 279 685 l 279 0 l 102 0 l 102 897 q 118 946 102 924 q 157 979 133 968 q 208 984 182 989 q 254 960 235 979 l 898 288 l 898 972 l 1074 972 l 1074 75 z "},"O":{"ha":1195,"x_min":72,"x_max":1123,"o":"m 1123 393 q 1093 230 1123 304 q 1008 101 1062 155 q 879 17 954 47 q 718 -14 805 -14 l 479 -14 q 317 17 391 -14 q 188 101 242 47 q 103 230 134 155 q 72 393 72 304 l 72 579 q 103 742 72 667 q 188 871 134 817 q 317 956 242 925 q 479 986 391 986 l 718 986 q 879 956 805 986 q 1008 871 954 925 q 1093 742 1062 817 q 1123 579 1123 667 l 1123 393 m 947 579 q 930 674 947 631 q 883 746 913 716 q 811 793 853 777 q 718 810 768 810 l 479 810 q 385 793 427 810 q 312 746 342 777 q 265 674 281 716 q 248 579 248 631 l 248 393 q 265 299 248 341 q 312 226 281 256 q 385 179 342 196 q 479 163 427 163 l 716 163 q 810 179 768 163 q 883 226 852 196 q 930 299 913 256 q 947 393 947 341 l 947 579 z "},"R":{"ha":1149,"x_min":102,"x_max":1116,"o":"m 1074 646 q 1059 538 1074 585 q 1019 454 1044 490 q 960 392 994 418 q 891 350 927 366 q 818 326 854 333 q 748 318 781 318 l 1116 0 l 844 0 l 476 318 l 349 318 l 349 494 l 748 494 q 809 508 781 497 q 856 538 836 519 q 887 584 876 557 q 898 646 898 611 l 898 757 q 894 780 898 772 q 885 791 890 787 q 872 795 879 795 q 861 796 866 796 l 279 796 l 279 0 l 102 0 l 102 884 q 109 918 102 902 q 128 947 116 935 q 156 966 140 959 q 191 972 172 972 l 861 972 q 960 951 920 972 q 1026 898 1001 930 q 1063 828 1052 865 q 1074 758 1074 791 l 1074 646 z "},"S":{"ha":1081,"x_min":65,"x_max":1037,"o":"m 1037 286 q 1024 192 1037 234 q 989 119 1010 151 q 938 64 967 87 q 878 28 909 42 q 814 7 846 14 q 753 0 782 0 l 73 0 l 73 176 l 753 176 q 832 206 804 176 q 861 286 861 236 q 853 331 861 311 q 832 366 846 351 q 798 389 818 381 q 753 397 778 397 l 348 397 q 256 413 305 397 q 164 462 206 428 q 93 551 121 496 q 65 685 65 606 q 93 819 65 764 q 164 908 121 873 q 256 957 206 942 q 348 972 305 972 l 948 972 l 948 796 l 348 796 q 270 766 298 796 q 241 685 241 735 q 270 605 241 634 q 348 575 298 575 l 753 575 l 755 575 q 815 567 783 574 q 879 545 847 560 q 939 508 910 530 q 989 453 967 485 q 1024 380 1011 421 q 1037 286 1037 338 z "},"U":{"ha":1158,"x_min":83,"x_max":1055,"o":"m 1055 89 q 1048 54 1055 70 q 1029 25 1042 37 q 1001 7 1017 14 q 966 0 985 0 l 569 0 q 455 12 513 0 q 343 50 397 24 q 242 115 290 75 q 159 208 195 154 q 103 331 123 262 q 83 486 83 401 l 83 972 l 259 972 l 259 486 q 280 360 259 412 q 332 274 300 309 q 402 220 364 239 q 474 191 440 200 q 535 179 509 181 q 569 176 561 176 l 879 176 l 879 972 l 1055 972 l 1055 89 z "},"Y":{"ha":1085,"x_min":56,"x_max":1029,"o":"m 1029 647 q 1014 539 1029 587 q 973 455 998 492 q 915 393 948 419 q 845 351 881 368 q 772 327 809 334 q 703 319 735 319 l 631 319 l 631 0 l 454 0 l 454 319 l 383 319 q 314 327 351 319 q 240 351 277 334 q 171 393 204 368 q 112 455 138 419 q 72 539 87 492 q 56 647 56 587 l 56 972 l 233 972 l 233 647 q 243 585 233 612 q 274 538 254 557 q 322 508 294 518 q 385 497 350 497 l 703 497 q 754 508 728 501 q 802 530 781 514 q 838 573 824 545 q 852 647 852 601 l 852 972 l 1029 972 l 1029 647 z "}},"familyName":"Audiowide","ascender":1375,"descender":-396,"underlinePosition":-104,"underlineThickness":69,"boundingBox":{"yMin":-396,"xMin":-303,"yMax":1375,"xMax":1830},"resolution":1000,"original_font_information":{"format":0,"copyright":"Copyright (c) 2012 by Brian J. Bonislawsky DBA Astigmatic (AOETI) (astigma@astigmatic.com), with Reserved\rFont Name \"Audiowide\"","fontFamily":"Audiowide","fontSubfamily":"Regular","uniqueID":"1.003;AOEF;Audiowide-Regular","fullName":"Audiowide Regular","version":"Version 1.003","postScriptName":"Audiowide-Regular","trademark":"Audiowide is a trademark of Astigmatic.","manufacturer":"Astigmatic (AOETI)","designer":"Astigmatic (AOETI)","manufacturerURL":"http://www.astigmatic.com/","designerURL":"http://www.astigmatic.com/","licence":"This Font Software is licensed under the SIL Open Font License,\rVersion 1.1. This license is available with a FAQ at:\rhttp://scripts.sil.org/OFL","licenceURL":"http://scripts.sil.org/OFL"},"cssFontWeight":"normal","cssFontStyle":"normal"}

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = function(props) {
  var THREE, camera;
  THREE = __webpack_require__(0);
  camera = new THREE.PerspectiveCamera(25, props.container.clientWidth / props.container.clientHeight, 0.1, 1000);
  camera.name = 'camera';
  camera.position.set(props.offsetX, props.offsetY, 80);
  addEventListener('resize', function() {
    camera.aspect = props.container.clientWidth / props.container.clientHeight;
    return camera.updateProjectionMatrix();
  });
  return camera;
};


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = function(props) {
  var msIn, quadIn, quadOut, ref;
  msIn = __webpack_require__(1).msIn;
  ref = __webpack_require__(3), quadIn = ref.quadIn, quadOut = ref.quadOut;
  return function(scene, now) {
    var composite, diff, i, len, lowerSand, main, opacity, ref1, results, rotation, stream, unit, upperSand;
    ref1 = ['minute', 'hour', 'day'];
    results = [];
    for (i = 0, len = ref1.length; i < len; i++) {
      unit = ref1[i];
      composite = scene.getObjectByName("composite-" + unit);
      main = composite.getObjectByName('main');
      lowerSand = composite.getObjectByName('sand-lower');
      upperSand = composite.getObjectByName('sand-upper');
      stream = composite.getObjectByName('stream');
      diff = Math.abs(now - new Date(props.date));
      if (!(diff < 500)) {
        main.rotation.x = rotation = (function() {
          switch (false) {
            case !(diff % (msIn(unit)) > (msIn(unit)) - 500):
              return quadIn(Math.PI * 0.0, Math.PI * 0.5, diff % 500 / 500);
            case !(diff % (msIn(unit)) < 500):
              return quadOut(Math.PI * 1.5, Math.PI * 2.0, diff % 500 / 500);
            default:
              return 0;
          }
        })();
      }
      opacity = Math.abs((main.rotation.x % Math.PI / Math.PI) * 2 - 1);
      lowerSand.children[0].material.opacity = opacity;
      upperSand.children[0].material.opacity = opacity;
      results.push(stream.visible = main.rotation.x === 0);
    }
    return results;
  };
};


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = function(props) {
  var msIn;
  msIn = __webpack_require__(1).msIn;
  return function(scene, now) {
    var diff, i, len, ref, results, stream, unit;
    ref = ['minute', 'hour', 'day'];
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      unit = ref[i];
      stream = (scene.getObjectByName("composite-" + unit)).getObjectByName('stream');
      diff = Math.abs(now - new Date(props.date));
      results.push(stream.material.opacity = (1 - Math.pow((diff % msIn(unit)) / (msIn(unit)) * 2 - 1, 4)) * (function() {
        switch (unit) {
          case 'minute':
            return 0.8 * 0.4 + Math.random() * (1 - 0.4);
          case 'hour':
            return 0.4 * 0.6 + Math.random() * (1 - 0.6);
          case 'day':
            return 0.2 * 0.8 + Math.random() * (1 - 0.8);
        }
      })());
    }
    return results;
  };
};


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = function(props) {
  var msIn, quadInOut;
  msIn = __webpack_require__(1).msIn;
  quadInOut = __webpack_require__(3).quadInOut;
  return function(scene, now) {
    var blob, diff, i, len, main, ref, results, scale, unit;
    ref = ['minute', 'hour', 'day'];
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      unit = ref[i];
      main = (scene.getObjectByName("composite-" + unit)).getObjectByName('main');
      blob = (scene.getObjectByName("composite-" + unit)).getObjectByName('blob');
      diff = Math.abs(now - new Date(props.date));
      if (!(diff < 1000)) {
        main.position.y = (function() {
          switch (false) {
            case !(diff % (msIn(unit)) > (msIn(unit)) - 1000):
              return quadInOut(0, 1.5, diff % 1000 / 500);
            case !(diff % (msIn(unit)) < 1000):
              return quadInOut(1.5, 0, diff % 1000 / 500 - 1);
            default:
              return 0;
          }
        })();
        blob.material.opacity = (function() {
          switch (props.theme) {
            case 'lite':
              return 0.5 - main.position.y / 4;
            case 'dark':
              return 0.8 - main.position.y / 3;
          }
        })();
        scale = 1 + main.position.y / 5;
        blob.scale.x = scale;
        results.push(blob.scale.y = scale);
      } else {
        results.push(void 0);
      }
    }
    return results;
  };
};


/***/ }),
/* 29 */
/***/ (function(module, exports) {

module.exports = function(props) {
  var mouseX, mouseY;
  mouseX = -1;
  mouseY = -1;
  props.container.addEventListener('mousemove', function(event) {
    mouseX = event.clientX;
    return mouseY = event.clientY;
  });
  props.container.addEventListener('mouseleave', function() {
    mouseX = -1;
    return mouseY = -1;
  });
  return function(scene, now) {
    var d, x, y;
    x = (mouseX - props.container.offsetLeft) / props.container.clientWidth * 2 - 1;
    y = (mouseY - props.container.offsetTop) / props.container.clientHeight * (props.onTableMode ? 1 : 2) - 1;
    d = Math.sqrt(x * x + y * y);
    if ((-1 <= x && x <= 1) && (-1 <= y && y <= 1)) {
      scene.rotation.x += (y * -0.2 - scene.rotation.x) / 16;
      scene.rotation.y += (x * -0.2 - scene.rotation.y) / 16;
      return scene.position.z += (d * -5.5 - scene.position.z) / 16;
    } else {
      scene.rotation.x -= scene.rotation.x / 64;
      scene.rotation.y -= scene.rotation.y / 64;
      return scene.position.z -= scene.position.z / 64;
    }
  };
};


/***/ }),
/* 30 */
/***/ (function(module, exports) {

module.exports = [{"name":".morphTargetInfluences[animation_000000]","times":[0,1,9],"values":[1,0,0],"type":"number"},{"name":".morphTargetInfluences[animation_000001]","times":[0,1,2],"values":[0,1,0],"type":"number"},{"name":".morphTargetInfluences[animation_000002]","times":[1,2,3],"values":[0,1,0],"type":"number"},{"name":".morphTargetInfluences[animation_000003]","times":[2,3,4],"values":[0,1,0],"type":"number"},{"name":".morphTargetInfluences[animation_000004]","times":[3,4,5],"values":[0,1,0],"type":"number"},{"name":".morphTargetInfluences[animation_000005]","times":[4,5,6],"values":[0,1,0],"type":"number"},{"name":".morphTargetInfluences[animation_000006]","times":[5,6,7],"values":[0,1,0],"type":"number"},{"name":".morphTargetInfluences[animation_000007]","times":[6,7,8],"values":[0,1,0],"type":"number"},{"name":".morphTargetInfluences[animation_000008]","times":[7,8,9],"values":[0,1,0],"type":"number"},{"name":".morphTargetInfluences[animation_000009]","times":[0,8,9],"values":[0,0,1],"type":"number"}]

/***/ })
/******/ ]);
});
//# sourceMappingURL=timeglass-3d.js.map