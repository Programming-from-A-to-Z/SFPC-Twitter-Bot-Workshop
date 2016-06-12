void setup() {
  size(320, 240);
  
  String filename = "media.jpeg";
  
  if (args !=null && args.length > 0) {
    filename = args[0];
  }

  //This is the image they send to us
  PImage source = loadImage(filename);
  
  //Choose a random dan image from the 3 possibilities (to go on top)
  int rimg = ceil(random(3));
  //load the Dan image
  PImage top = loadImage("dan" + rimg + ".png");
  //resize the dan image relative to the source image
  top.resize(0, source.height*2/5);

  //Create
  PGraphics g = createGraphics(source.width, source.height);
  g.beginDraw();
  g.background(0);
  
  //Place their source image at origin
  g.image(source, 0, 0);
  
  //Generate value for random placement along x-axis with 20px padding
  float rplace = ceil(random(20, source.width - top.width -20));
  //Place Dan image at a random spot along x axis aligned to the bottom of source 
  //(Dan is 2/5 tall so put him 3/5 down so he his 'bottom' does not show.)
  g.image(top, rplace, source.height*3/5 + 10);
  
  g.endDraw();
  g.save("output.png"); 
  exit();
}
