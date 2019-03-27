class digit {
  constructor() {

  }

  sevenSegment(val, start) {
    noStroke();
    noFill();
    // A
    fill(this.getColor(val, 6));
    rect(60 + start, 40, 78, 18, 10, 10);
    // B
    fill(this.getColor(val, 5));
    rect(140 + start, 60, 18, 98, 10, 10);
    // C
    fill(this.getColor(val, 4));
    rect(140 + start, 180, 18, 98, 10, 10);
    // D
    fill(this.getColor(val, 3));
    rect(60 + start, 280, 78, 18, 10, 10);
    // E
    fill(this.getColor(val, 2));
    rect(40 + start, 180, 18, 98, 10, 10);
    // F
    fill(this.getColor(val, 1));
    rect(40 + start, 60, 18, 98, 10, 10);
    // A
    fill(this.getColor(val, 0));
    rect(60 + start, 160, 78, 18, 10, 10);
  }
  
  twoSegment(start, col) {
    noStroke();
    noFill();
    
    fill(this.getColor(1, col));
    circle(start*1.35, 110, 10);
    circle(start*1.35, 230, 10);
  }

  getColor(val, shift) {
    let r = 255;
    let g = 0;
    let b = 0;
    let a = 40 + 255 * ((val >> shift) & 1);
    return color(r, g, b, a);
  }

}