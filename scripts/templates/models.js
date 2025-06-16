const MODEL = {};

MODEL.circle = function(entity,alpha) {
    if (this.image) {
        push();
        tint(255, alpha); // Apply alpha transparency
        let size = 32; // Convert radius to diameter
        image(this.image, this.pos.x - size/2, this.pos.y - size/2, size, size);
        pop();
    } else {
        // Fallback to original circle if no image
        fill(this.color);
        stroke(0, alpha);
        ellipse(this.pos.x, this.pos.y, this.r, this.r);
    }
};

MODEL.filledCircle = function(alpha) {
    if (this.image) {
        push();
        tint(255, alpha);
        // let size = this.r * 2;
        let size = 44
        image(this.image, this.pos.x - size/2, this.pos.y - size/2, size, size);
        
        // Optional: Add colored border around image
        // noFill();
        // stroke(this.color);
        // strokeWeight(2);
        // ellipse(this.pos.x, this.pos.y, size, size);
        pop();
    } else {
        // Fallback to original
        fill(0, alpha);
        stroke(this.color);
        ellipse(this.pos.x, this.pos.y, this.r, this.r);
    }
};

MODEL.pointy = function(alpha) {
    if (this.image) {
        push();
        translate(this.pos.x, this.pos.y);
        // rotate(this.vel.heading()); // Rotate to face movement direction
        tint(255, alpha);
        
        // let size = this.r * 2;
        let size = 50;
        image(this.image, -size/2, -size/2, size, size);
        pop();
    } else {
        // Fallback to original pointy shape
        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.vel.heading());
        fill(0, alpha);
        stroke(this.color);
        let back = -this.r;
        let front = this.r * 4/3;
        let middle = -this.r/2;
        let side = this.r;
        quad(back, -side, middle, 0, back, side, front, 0);
        pop();
    }
};
