/*
 * @Author: miao yu
 * @Date: 2020-03-03 17:41:12
 * @LastEditors: miao yu
 * @LastEditTime: 2020-03-03 17:44:41
 * @Description:
 */
import Konva from 'konva';

var width = 1000;
var height = 1000;

var stage = new Konva.Stage({
  container: "container",
  width: width,
  height: height
});
// get layer
var layer = new Konva.Layer();

/**
 * @description: 添加表
 * @return:
 */
function addTable(data, layer) {
  const { x, y, tableName, feilds } = data;
  const width = 200;

  /**
   * draw title
   */
  var tableNameText = new Konva.Text({
    x,
    y,
    text: tableName,
    fontSize: 18,
    fontFamily: "Calibri",
    fill: "#fff",
    width,
    padding: 20,
    align: "center"
  });

  var tableNameRect = new Konva.Rect({
    x,
    y,
    strokeWidth: 5,
    fill: "rgb(102, 129, 208)",
    width,
    height: tableNameText.height(),
    shadowColor: "black",
    shadowBlur: 10,
    shadowOffsetX: 10,
    shadowOffsetY: 10,
    shadowOpacity: 0.2
  });
  tableNameRect.on("click", function(evt) {
    console.log(tableName);
  });
  /**
   * draw table comtent
   */
  const pre = "feildText";
  const arr = [];
  const gap = 24;
  for (let i = 0; i < feilds.length; ++i) {
    arr.push(
      new Konva.Text({
        x: tableNameText.attrs.x,
        y: tableNameText.attrs.y + 55 + gap * i,
        text: feilds[i],
        fontSize: 18,
        fontFamily: "Calibri",
        fill: "#000",
        width: 300,
        padding: 8,
        align: "left"
      })
    );
  }

  var feildsRect = new Konva.Rect({
    x: arr[0].attrs.x,
    y: arr[0].attrs.y,
    strokeWidth: 5,
    fill: "rgb(249, 249, 249)",
    width,
    height: gap * feilds.length + 20,
    shadowColor: "black",
    shadowBlur: 10,
    shadowOffsetX: 10,
    shadowOffsetY: 10,
    shadowOpacity: 0.2
  });

  // add shape to layer
  layer.add(tableNameRect);
  layer.add(tableNameText);
  layer.add(feildsRect);
  arr.forEach(item => layer.add(item));
}

addTable(
  {
    x: 20,
    y: 60,
    tableName: "reg_table",
    feilds: ["age", "gender", "income"]
  },
  layer
);

addTable(
  {
    x: 250,
    y: 100,
    tableName: "student_talbe",
    feilds: ["name", "class", "grade"]
  },
  layer
);

// add layer to stage
stage.add(layer);
layer.draw();

layer.draw();

var scaleBy = 1.01;
stage.on("wheel", e => {
  e.evt.preventDefault();
  var oldScale = stage.scaleX();

  var mousePointTo = {
    x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
    y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale
  };

  var newScale = e.evt.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy;
  stage.scale({ x: newScale, y: newScale });

  var newPos = {
    x: -(mousePointTo.x - stage.getPointerPosition().x / newScale) * newScale,
    y: -(mousePointTo.y - stage.getPointerPosition().y / newScale) * newScale
  };
  stage.position(newPos);
  stage.batchDraw();
});
