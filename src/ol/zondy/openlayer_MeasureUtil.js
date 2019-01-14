let measureDraw = null;
let helpTooltip;
let measureTips = [];
let measureSource = null; // 图层数据源

// 停止量算
export const stopMeasureTool = function() {
    if (measureDraw) {
        map.removeInteraction(measureDraw); //移除绘制图形
    }
    if (helpTooltip) {helpTooltip.setPosition([-10000,-10000])}
    // $(helpTooltipElement).addClass('hidden');
    if (measureTips) {
        for (var i = 0; i < measureTips.length; i++) {
            var measureTip = measureTips[i];
            map.removeOverlay(measureTip);
            map.un('pointermove', pointerMoveHandler); 
        }
    }
    if (measureSource) {
        measureSource.clear();
    }
}