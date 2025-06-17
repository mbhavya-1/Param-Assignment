const MODEL = {};

MODEL.food = function(entity,alpha) {
        push();
        let size = 32;
        image(this.image, this.pos.x - size/2, this.pos.y - size/2, size, size);
        pop();
};

MODEL.prey = function(alpha) {
        push();
        let size = 44
        image(this.image, this.pos.x - size/2, this.pos.y - size/2, size, size);
        pop();
};

MODEL.predator = function(alpha) {
        push();
        translate(this.pos.x, this.pos.y);
        let size = 50;
        image(this.image, -size/2, -size/2, size, size);
        pop();
};
