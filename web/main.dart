import 'dart:async';
import 'dart:html';
import 'dart:math' as M;
import 'dart:svg';
import 'dart:svg' as V;

import 'package:algraphr/svgx.dart';

const bool AUTO_CAPTURE = false;

const bool LIVING_FILL = true;
const bool LIVING_STROKE = false;
const bool LIVE_OPACITY = false;
bool BLUR = false;

const int MAX_DIST = 16;
const int LINE_BOTTOM_LIMIT = 100;
const int CIRCLE_BOTTOM_LIMIT = 30;
const int MAX_NUM_POLYGONS = 64;

const double DEFAULT_OPACITY = 0.0;
const double OPACITY_STEP = 0.004;

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

CheckboxInputElement chkCapture;
CheckboxInputElement chkBlur;

InputElement sldCaptureFrq;

int capture_frequency = 1000;

int cR = 2;
int cG = 2;
int cB = 2;

void main() {
  initPage();
  initMenu();

  if (AUTO_CAPTURE)
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
  btClose = querySelector('#bt-close');
  btOpen = querySelector('#bt-open');

  chkCapture = querySelector('#chk-capture')..onChange.listen((e)=>
    updateAutoCapture(chkCapture.checked)
  );
  chkBlur = querySelector('#chk-blur')..onChange.listen((e)=>
      BLUR = chkBlur.checked
  );

  sldCaptureFrq = querySelector('#sld-captureFrq');
  sldCaptureFrq.onChange.listen((e) {
    capture_frequency = int.parse(sldCaptureFrq.value);
    timer.cancel();
    timer = new Timer.periodic(
        new Duration(milliseconds: capture_frequency), onCaptureTimer);
  });

  InputElement sldR = querySelector('#sld-r');
  sldR.onChange.listen((e) => cR = int.parse(sldR.value));
  InputElement sldG = querySelector('#sld-g');
  sldG.onChange.listen((e) => cG = int.parse(sldG.value));
  InputElement sldB = querySelector('#sld-b');
  sldB.onChange.listen((e) => cB = int.parse(sldB.value));
  btClose.onClick.listen((MouseEvent e) => toggleMenu());
  btOpen.onClick.listen((MouseEvent e) => toggleMenu());
}

bool isMenuVisible = false;

void toggleMenu() {
  menu.style.display = isMenuVisible ? 'none' : 'flex';
  btOpen.style.display = isMenuVisible ? 'block' : 'none';
  isMenuVisible = !isMenuVisible;
}

initPage() {
  canvas = querySelector("canvas")
    ..setAttribute('width', '${window.innerWidth}px')..setAttribute(
        'height', '${window.innerHeight /*- 60*/}px');

  svg = querySelector("svg")
    ..setAttribute('width', '${window.innerWidth}px')..setAttribute(
        'height', '${window.innerHeight /*- 60*/}px');

  querySelector('body')
    ..onMouseMove.listen(onMMove)
    ..onClick.listen(onCaptureClick);

  H = window.innerHeight;
  cLimit = H - CIRCLE_BOTTOM_LIMIT;
  lLimit = H - LINE_BOTTOM_LIMIT;
}

onCaptureClick(MouseEvent e) {
  //if( e.target != menu && ! menu.childNodes.contains(e.target) && ! menu.children.contains(e.target) )
  if (e.target == svg || svg.childNodes.contains(e.target))
    capture();
}

onCaptureTimer(Timer t) {
  capture();
}

capture() {
  //print('capture... ');
  svgToCanvas(svg, canvas);
}

onMMove(MouseEvent e) {
  addPoints(e.client.x, e.client.y);
}

void addPoints(int x, int y) {
  var dist = pts0.isEmpty
      ? MAX_NUM_POLYGONS
      : M.max(MAX_DIST * 2 - ((pts0[pts0.length - 1].cx - x).abs() / 2), 1);

  //creation des points pour position en cours
  var c1_0 = addCircle(new M.Point(x, y - dist), Position.Top);
  var c1_1 = addCircle(new M.Point(x, y + dist), Position.Bottom);

  // si ce d'autres points existent » creation et affichage du polygone correspondant
  if (pts0.length > 1 && pts1.length > 1) {
    final polygon = getPolygon(c1_0, c1_1);
    svg.append(polygon);
  }
}

Circle addCircle(M.Point p, Position pos) {
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

  //print("${pts0.length} ${pts1.length}");

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
        //circleLines[c].setAttribute('stroke', DEFAULT_COLOR);
      }
    }
  });
}

List<Circle> filterPoints(List<Circle> pts) {
  /*if(! pts.isEmpty)
    print('filterPoints  c.cy ${pts[0].cy}');*/
  return pts.where((c) => c.cy < cLimit).toList();
}

void updatePolygons() {
  var opacity = DEFAULT_OPACITY;
  var numP = circlePolygones.length;
  num alphaCoef = 1 / numP / 3;
  int currentColor = 0;
  int counter = 0;
  int blurCoef = (numP / 7).round();

  circlePolygones.forEach((List<Circle> pts, PolygonElement p) {
    counter++;
    opacity += alphaCoef;

    updatePolygon(p, pts, LIVE_OPACITY ? opacity : DEFAULT_OPACITY);

    if (LIVING_FILL) {
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

      //print('updatePolygons  fillCol.toRadixString(16) ${currentColor.toRadixString(16)}');
      p.setAttribute('fill', "#${fillHexa(currentColor.toRadixString(16))}");

      // stroke
      if (LIVING_STROKE) {
        final int strokeCol = currentColor;
        //final int strokeCol = M.min(2105376, currentColor);
        p.setAttribute(
            'stroke',
            "#${fillHexa((strokeCol / 2).round().toRadixString(16))}");
      }
    }

    if( BLUR && counter < ( numP - 20 ) ){
      V.FilterElement f = new V.FilterElement();
      f.id = "B$counter";
      var fBlur = new FEGaussianBlurElement();
      fBlur.setAttribute("stdDeviation", '${(1 - ( counter / numP ))}') ;
      f.append(fBlur);

      var existingId = svg.children.where( ( SvgElement item ) => item.id == "B${counter}" );
      if( existingId.isNotEmpty )
        existingId.first.remove();
      svg.append(f);

      /*int level = ((counter / numP)*blurCoef).round();
      level = level > 7 ? 7 : level;
      print('updatePolygons » level ${level} / $numP');
      p.style.filter = 'url(#blur$level)';*/

      //int level = ((counter / numP)*blurCoef).round();
      //p.style.filter = 'url(#blur$level)';
    }

    if (LIVE_OPACITY) {

      p.setAttribute('fill-opacity', "$opacity");
      //p.setAttribute('stroke-opacity', "${opacity*1.2}");
      p.setAttribute('stroke-opacity', "0.1");
    }
    //p.setAttribute('fill', "#${newFill.toRadixString(16)}" );
  });
}
