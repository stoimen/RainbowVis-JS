define(['rainbow'], function(Color) {
    var color = new Color();
    color.setSpectrum("#FF0000", "#0000FF")
    console.log(color.colorAt(90));
});
