
void setup() {
  size(320, 240);
  
  String filename = "media.jpeg";
  
  if (args !=null && args.length > 0) {
    filename = args[0];
  }

  PImage source = loadImage(filename);
  
  //Adding the loading of dan image to go on top
  PImage top = loadImage("dan1.png");

  PGraphics g = createGraphics(source.width, source.height);
  g.beginDraw();
  g.background(0);
  
  //added to put media image first
  g.image(source, 0, 0);
  
  //added to put dan image on top
  //(0, height/2) at half of its size
  //image(img, 0, height/2, img.width/2, img.height/2);
  g.image(top, 0, top.height-250, top.width/2, top.height/2);
  
  

/*
  for (int i = 0; i < 10000; i++) {
    float x = random(g.width);
    float y = random(g.height);
    color c = source.get(int(x), int(y));
    g.fill(c, 50);
    g.noStroke();
    g.ellipse(x, y, 20, 20);
  }
  */
  
  g.endDraw();
  g.save("output.png"); 
  exit();

  //exit();
}
