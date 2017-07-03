import 'dart:async';
import 'dart:html';
import 'dart:math' as M;
import 'dart:svg';
import 'dart:svg' as V;

import 'package:algraphr/svgx.dart';

const kBackgroundColor = "#202020";
const bool kAutoCapture = false;

const bool kLivingFill = true;
const bool kLivingStroke = false;
const bool kLiveOpacity = false;

const int kMaxDist = 16;
const int kLineBottomLimit = 100;
const int kCircleBottomLimit = 30;
const int kMaxNumPolygons = 64;

const double kDefaultOpacity = 0.0;
const double kOpacityStep = 0.004;

bool blurEnabled = false;
CanvasElement canvas;

SvgElement svg;

int cLimit;
int lLimit;
var H = window.innerHeight;

List<FallingCircle> pts0 = [];
List<FallingCircle> pts1 = [];

List<LineElement> lines = [];
Map<Circle, LineElement> circleLines = {};

Map<List<Circle>, PolygonElement> circlePolygones = {};
List<String> polygonsPts = [];

Timer timer;

DivElement menu;
AnchorElement btClose;
AnchorElement btOpen;
AnchorElement btSave;
AnchorElement btClear;

CanvasRenderingContext2D context;

CheckboxInputElement chkCapture;
CheckboxInputElement chkBlur;

InputElement sldCaptureFrq;

int capture_frequency = 1000;

int cR = 2;
int cG = 2;
int cB = 2;

int get canvasWidth => window.innerWidth;
int get canvasHeight => window.innerHeight;

void main() {
  initPage();
  initMenu();

  if (kAutoCapture)
    timer = new Timer.periodic(
        new Duration(milliseconds: capture_frequency), onCaptureTimer);

  window.animationFrame.then(drawLines);
}

void updateAutoCapture(bool on) {
  if (on)
    timer = new Timer.periodic(
        new Duration(milliseconds: capture_frequency), onCaptureTimer);
  else
    timer.cancel();

  querySelector("#sld-captureFrqGp").style.display = on ? 'flex' : 'none';
}

void initMenu() {
  menu = querySelector('#menu');
  btClose = querySelector('#bt-close')
    ..onClick.listen((MouseEvent e) => toggleMenu());
  btOpen = querySelector('#bt-open')
    ..onClick.listen((MouseEvent e) => toggleMenu());
  btSave = querySelector('#btSave')
    ..onClick.listen((MouseEvent e) => saveImg());
  btClear = querySelector('#btClear')
    ..onClick.listen((MouseEvent e) => clear());

  chkCapture = querySelector('#chk-capture')
    ..onChange.listen((e) => updateAutoCapture(chkCapture.checked));
  /*chkBlur = querySelector('#chk-blur')
    ..onChange.listen((e) => BLUR = chkBlur.checked);*/

  sldCaptureFrq = querySelector('#sld-captureFrq');
  sldCaptureFrq.onChange.listen((e) {
    capture_frequency = int.parse(sldCaptureFrq.value);
    timer.cancel();
    timer = new Timer.periodic(
        new Duration(milliseconds: capture_frequency), onCaptureTimer);
  });

  InputElement sldR = querySelector('#sld-r');
  sldR.onInput.listen((e) => cR = int.parse(sldR.value));
  InputElement sldG = querySelector('#sld-g');
  sldG.onInput.listen((e) => cG = int.parse(sldG.value));
  InputElement sldB = querySelector('#sld-b');
  sldB.onInput.listen((e) => cB = int.parse(sldB.value));
}

saveImg() {
  btSave.download = 'image.png';
  btSave.href = canvasToImage("#202020");
}

bool isMenuVisible = true;

void toggleMenu() {
  menu.style.display = isMenuVisible ? 'none' : 'flex';
  btOpen.style.display = isMenuVisible ? 'block' : 'none';
  isMenuVisible = !isMenuVisible;
}

initPage() {
  canvas = querySelector("canvas")
    ..setAttribute('width', '${canvasWidth}px')
    ..setAttribute('height', '${canvasHeight}px')
    ..style.backgroundColor = kBackgroundColor;
  context = canvas.context2D;

  svg = querySelector("svg")
        ..setAttribute('width', '${canvasWidth}px')
        ..setAttribute('height', '${canvasHeight /*- 60*/}px')
        ..onTouchMove.listen(onTMove)
        ..onMouseMove.listen(onMMove)
      /*..onClick.listen(onCaptureClick)
    ..onTouchStart.listen(onCaptureClick)*/
      ;
  window..onClick.listen(onCaptureClick)..onTouchStart.listen(onCaptureClick);

  /*querySelector('body')
    ..onMouseMove.listen(onMMove)
    ..onClick.listen(onCaptureClick);*/

  H = window.innerHeight;
  cLimit = H - kCircleBottomLimit;
  lLimit = H - kLineBottomLimit;
}

void onCaptureClick(Event e) {
  print("onCaptureClick");
  if (e.target == svg || svg.childNodes.contains(e.target)) capture();
}

void onCaptureTimer(Timer t) {
  capture();
}

void onTMove(TouchEvent e) {
  addPoints(e.touches.first.client.x, e.touches.first.client.y);
}

void onMMove(MouseEvent e) {
  addPoints(e.client.x, e.client.y);
}

void capture() {
  svgToCanvas(svg, canvas);
}

void clear() {
  context.clearRect(0, 0, canvasWidth, canvasHeight);
}

void addPoints(int x, int y) {
  var dist = pts0.isEmpty
      ? kMaxNumPolygons
      : M.max(kMaxDist * 2 - ((pts0[pts0.length - 1].cx - x).abs() / 2), 1);

  //creation des points+ pour position en cours
  var c1_0 = addDerivedPoints(new M.Point(x, y - dist), Position.Top);
  var c1_1 = addDerivedPoints(new M.Point(x, y + dist), Position.Bottom);

  // si d'autres points existent » creation et affichage du polygone correspondant
  if (pts0.length > 1 && pts1.length > 1) {
    final polygon = getPolygon(c1_0, c1_1);
    svg.append(polygon);
  }
}

FallingCircle addDerivedPoints(M.Point p, Position pos) {
  final c = new FallingCircle.fromElement(getCircle(p));
  svg.append(c.element);
  c.start();
  var t = pos == Position.Bottom ? pts1 : pts0;
  t.add(c);
  if (t.length > 1) {
    LineElement l = getLine(t[t.length - 1].pt, c.pt);
    l.setAttribute('stroke', DEFAULT_COLOR);
    lines.add(l);
    svg.append(l);
    circleLines[c] = l;
  }
  return c;
}

PolygonElement getPolygon(Circle c1_0, Circle c1_1) {
  var c0_0 = pts0[pts0.length - 2];
  var c0_1 = pts1[pts1.length - 2];

  var ptsChain = circles2PathPoints([c0_0, c1_0, c1_1, c0_1]);
  polygonsPts.add(ptsChain);

  PolygonElement polygon = getPointsPolygon(ptsChain);
  circlePolygones[[c0_0, c1_0, c1_1, c0_1]] = polygon;
  return polygon;
}

void drawLines(num value) {
  filterPoints(pts0).forEach((c) => c.fall());
  filterPoints(pts1).forEach((c) => c.fall());

  rmOutLines(lines, lLimit);

  // trouve les points hors zones » les désaffiche + liste pour suppression
  filterPolygons(pts0, Position.Top);

  // trouve les points hors zones » les désaffiche + liste pour suppression
  filterPolygons(pts1, Position.Bottom);

  updatePolygons();

  window.animationFrame.then(drawLines);
}

void filterPolygons(List<Circle> pts, Position pos) {
  var toRm = [];
  pts.where((c) => c.cy >= cLimit).toList().forEach((c) {
    // filtre les points visible
    c.element.remove();

    if (pos == Position.Bottom) // si points inférieur » supprime polygon lié
      circlePolygones.forEach((List<Circle> pts, V.PolygonElement p) {
        if (pts.contains(c)) {
          p.remove();
          toRm.add(pts);
        }
      });
  });

  toRm.forEach((pts) => circlePolygones.remove(pts));

  pts = filterPoints(pts);
  updateLines(pts);
}

void updateLines(List<FallingCircle> pts) {
  pts.forEach((FallingCircle c) {
    if (circleLines[c] != null && c.cy > 0) {
      if (pts.indexOf(c) > 0) {
        FallingCircle c0 = pts[pts.indexOf(c) - 1]; // previous points
        lineToPoints(circleLines[c], c0, c);
      }
    }
  });
}

List<FallingCircle> filterPoints(List<FallingCircle> pts) =>
    pts.where((c) => c.cy < cLimit).toList();

void updatePolygons() {
  var opacity = kDefaultOpacity;
  var numP = circlePolygones.length;
  num alphaCoef = 1 / numP / 3;
  int currentColor = 0;
  int counter = 0;
  int blurCoef = (numP / 7).round();

  circlePolygones.forEach((List<Circle> pts, PolygonElement p) {
    counter++;
    opacity += alphaCoef;

    updatePolygon(p, pts, kLiveOpacity ? opacity : kDefaultOpacity);

    if (kLivingFill) {
      // recup couleur courante : String currentFill = p.getAttribute('fill');

      // linear rgb
      int color = currentColor;
      int r = (color >> 16) & 255;
      int g = (color >> 8) & 255;
      int b = color & 255;
      r += cR;
      r = r > 255 ? 255 : r;
      g += cG;
      g = g > 255 ? 255 : g;
      b += cB;
      b = b > 255 ? 255 : b;
      currentColor = r << 16 | g << 8 | b;

      p.setAttribute('fill', "#${fillHexa(currentColor.toRadixString(16))}");

      // stroke
      if (kLivingStroke) {
        final int strokeCol = currentColor;
        p.setAttribute('stroke',
            "#${fillHexa((strokeCol / 2).round().toRadixString(16))}");
      }
    }

    if (blurEnabled && counter < (numP - 20)) {
      V.FilterElement f = new V.FilterElement();
      f.id = "B$counter";
      var fBlur = new FEGaussianBlurElement();
      fBlur.setAttribute("stdDeviation", '${(1 - ( counter / numP ))}');
      f.append(fBlur);

      var existingId =
          svg.children.where((Element item) => item.id == "B${counter}");
      if (existingId.isNotEmpty) existingId.first.remove();
      svg.append(f);

      /*int level = ((counter / numP)*blurCoef).round();
      level = level > 7 ? 7 : level;
      print('updatePolygons » level ${level} / $numP');
      p.style.filter = 'url(#blur$level)';*/

      //int level = ((counter / numP)*blurCoef).round();
      //p.style.filter = 'url(#blur$level)';
    }

    if (kLiveOpacity) {
      p.setAttribute('fill-opacity', "$opacity");
      p.setAttribute('stroke-opacity', "0.1");
    }
  });
}

/// saves a canvas to png, add the backgroundColor
String canvasToImage(String backgroundColor) {
  num w = canvas.width;
  num h = canvas.height;

  ImageData data = context.getImageData(0, 0, w, h);

  //store the current globalCompositeOperation
  String compositeOperation = context.globalCompositeOperation;

  //set to draw behind current content
  context.globalCompositeOperation = "destination-over";

  //set background color
  context.fillStyle = backgroundColor;

  //draw background / rect on entire canvas
  context.fillRect(0, 0, w, h);

  //get the image data from the canvas
  var imageData = canvas.toDataUrl("image/png");

  //clear the canvas
  context.clearRect(0, 0, w, h);

  //restore it with original / cached ImageData
  context.putImageData(data, 0, 0);

  //reset the globalCompositeOperation to what it was
  context.globalCompositeOperation = compositeOperation;

  //return the Base64 encoded data url string
  return imageData;
}
