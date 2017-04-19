function Node(id, latitude, longitude) {
  this.id = id;
  this.lat = latitude;
  this.lng = longitude;

  // calculation
  this.f = 0;
  this.g = 0;
  this.h = -1;
  this.closed = false;
  this.parent = 0;
}


/**
 * Euclidean distance between two points
 *
 * @param node {Node}
 *
 * return {Double}
 */
Node.prototype.distanceTo = function (node) {
    const RAD = 0.000008998719243599958;
    const x = Math.abs(this.lat - node.lat);
    const y = Math.abs(this.lng - node.lng);

    var distance = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)) / RAD;

    return distance;
}

module.exports = Node
