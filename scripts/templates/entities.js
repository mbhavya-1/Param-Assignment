const ENTITY = {};

ENTITY.food = {
    perception: 0,
    color: '#2ECC71',
    // imgSize: 40,
    canStarve: false,
    foodDropChance: 0,
    type: 'food',
    r: 4,
    maxSpeed: 0,
    maxForce: 0,
    reproduceChance: 0.8,
};

ENTITY.prey = {

    priorityAvoid: 0.1,
    toEat: ['food'],
    toAvoid: ['predator'],
    toPursue: ['food'],
    color: '#22A7F0',
    model: MODEL.prey,
    childrenExtra: 1,
    foodDropChance: 0,
    hunger: 100,
    reproduceChance: 0.8,
    type: 'prey',
    maxForce: 0.2,
    maxSpeed: 3,
    r: 8
};

ENTITY.predator = {
    // AI
    multiplePursue: true,
    perception: 150,
    priorityAvoid: 0.25,
    priorityPursue: 2,
    toAvoid: ['predator'],
    toEat: ['prey'],
    toPursue: ['prey'],
    // Display
    color: '#D73C2C',
    model: MODEL.predator,
    hunger: 150,
    foodDropChance: 0.1,
    reproduceChance: 0.1,
    type: 'predator',
    maxSpeed: 4,
    // maxForce: 0.18,
    r: 12
};
