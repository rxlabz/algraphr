@JS()

library svgx;

import 'package:js/js.dart';
import 'dart:html';
import 'dart:html' as dom;
import 'dart:svg';
import 'dart:svg' as V;
import 'dart:math' as M;

const int R = 1;

const String DEFAULT_COLOR = "#1A1A1A";

const double G = 2.0;

const double cG = 0.03;

const int LINE_WIDTH = 1;

enum Position { Top, Bottom, Left, Right }

class Circle {
  GeometryElement element;

  var _stroke;

  get stroke => _stroke;

  double cx = 0.0;

  set x(num value) {
    cx = value;
    update('cx', '${cx.round()}px');
  }

  num get x => cx;

  double cy = 0.0;

  set y(num value) {
    //print('Circle.y  value ${value}');
    cy = value;
    update('cy', '${cy.round()}px');
  }

  num get y => cy;

  M.Point get pt => new M.Point(attr('cx'), attr('cy'));

  update(String prop, dynamic value) => element.setAttribute(prop, value);
  String attr(String prop) => element.getAttribute(prop);

  void set stroke(String color) {
    element.setAttribute('stroke', color);
  }

  Circle({int radius: 5, String color: '#f0'}) {
    element = new CircleElement();
  }

  Circle.fromElement(GeometryElement this.element);

  Circle.fromPoint(V.Point p, {int radius: 10}) {
    element = new CircleElement()
      ..setAttribute('r', '${radius}px')
      ..setAttribute('cx', '${p.x}px')
      ..setAttribute('cy', '${p.y}px')
      ..setAttribute('fill', '#f00');
  }
}

class FallingCircle extends Circle {
  double gravity = G;

  fall() {
    y += gravity;
    gravity *= 1 + cG;
  }

  start() {
    window.animationFrame.then((num value) => fall());
  }

  FallingCircle.fromElement(GeometryElement el) {
    element = el;
    cx = double.parse(attr(el, 'cx'));
    cy = double.parse(attr(el, 'cy'));
  }
}

CircleElement getCircle(M.Point p,
    {String color: DEFAULT_COLOR, int radius: R}) {
  return new CircleElement()
    ..setAttribute('r', '${radius}px')
    ..setAttribute('cx', '${p.x.roundToDouble()}px')
    ..setAttribute('cy', '${p.y.roundToDouble()}px')
    ..setAttribute('fill', color)
    ..setAttribute('fill-opacity', '0.2');
}

getLine(M.Point p1, M.Point p2) => new LineElement()
  ..setAttribute('stroke', '#FF0')
  ..setAttribute('stroke-width', LINE_WIDTH.toString())
  ..setAttribute('x1', '${p1.x}')
  ..setAttribute('x2', '${p2.x}')
  ..setAttribute('y1', '${p1.y}')
  ..setAttribute('y2', '${p2.y}');

getPointsPolygon(String pts)=>new PolygonElement()
  ..setAttribute('stroke', "#333333")
  /*..setAttribute('stroke', DEFAULT_COLOR)*/
  ..setAttribute('fill', '#00ff00')
  ..setAttribute('points', pts);


lineToPoints(LineElement l, Circle c0, Circle c1) => l
  ..setAttribute('x1', '${c0.cx.roundToDouble() }px')
  ..setAttribute('y1', '${c0.cy.roundToDouble() - 1 }px')
  ..setAttribute('x2', '${c1.cx.roundToDouble() }px')
  ..setAttribute('y2', '${c1.cy.roundToDouble() + 2 }px');

updatePolygon(PolygonElement p, List<Circle> pts, [num opacity]){
  p.setAttribute('points', circles2PathPoints(pts));
}

rmOutLines(List<LineElement> lines, int limit) {
  lines
      .where((l) =>
  M.max(double.parse(attr(l, 'y2')), double.parse(attr(l, 'y1'))) >=
      limit)
      .forEach((l) => l.remove());
}

String attr(Element el, String propertyName) =>
    rmpx(el.getAttribute(propertyName));

String rmpx(String value) => value.replaceFirst('px', '');

void svgToCanvas(SvgElement svgElement, CanvasElement canvas) {
  final wW = window.innerWidth;
  final wH = window.innerHeight;
  var img = new dom.ImageElement(width: wW, height: wH);
  final CanvasRenderingContext2D context = canvas.getContext('2d');
  final svg = svgToUrl(svgElement, wW, wH);
  final url = Url.createObjectUrl(svg);

  img.onLoad.listen((e) => context.drawImage(img, 0, 0));
  img.src = url;

  Url.revokeObjectUrl(svg.toString());
}

Blob svgToUrl(SvgElement svgElement, int w, int h) {
  var svgValue = toSVGBloc(svgElement.innerHtml, w, h);
  return new Blob([svgValue], 'image/svg+xml;charset=utf-8');
}

String toSVGBloc(String svg, int width, int height) =>
    '''<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"${width}\"
     height=\"${height}\"> ${svg}</svg>''';

circles2PathPoints(List<FallingCircle> els) =>
    els.fold('', (String prv, FallingCircle c) => prv += "${c.cx.roundToDouble()},${c.cy.roundToDouble()} ");

String fillHexa(String v){
  int num = 6-v.length;
  if( num <= 0) return v;
  var l = new List(num)..fillRange(0,num,'0');
  print('l   ${l.length}');
  var _l = l.map((o)=>o).toList()..add(v);
  print('fillHexa » l.toString() ${_l.join('')}');
  return _l.join('');
}

@JS("blur")
external void blur();