from itertools import permutations

class Carton:
    def __init__(self, width, height, length):
        self.width = width
        self.height = height
        self.length = length

    @property
    def volume(self):
        return self.width * self.height * self.length

    def get_rotations(self):
        return permutations([self.width, self.height, self.length])

class Container:
    def __init__(self, width, height, length):
        self.width = width
        self.height = height
        self.length = length
        self.remaining_space = [(0, 0, 0)]  # list of available spaces within the container
        self.items = []

    def can_fit(self, carton):
        for rotation in carton.get_rotations():
            if self._can_place_item(*rotation):
                return rotation
        return None

    def _can_place_item(self, w, h, l):
        for space in self.remaining_space:
            if (w <= self.width - space[0] and
                h <= self.height - space[1] and
                l <= self.length - space[2]):
                return True
        return False

    def place_carton(self, carton, rotation):
        self.items.append(rotation)
        self._update_remaining_space(*rotation)

    def _update_remaining_space(self, w, h, l):
        new_spaces = []
        for space in self.remaining_space:
            if w <= self.width - space[0] and h <= self.height - space[1] and l <= self.length - space[2]:
                # create new spaces based on the placement
                new_spaces.append((space[0] + w, space[1], space[2]))
                new_spaces.append((space[0], space[1] + h, space[2]))
                new_spaces.append((space[0], space[1], space[2] + l))
                break  # we found a place for this item, no need to check more spaces
        self.remaining_space.extend(new_spaces)

def pack_cartons_into_containers(cartons, container_dimensions):
    containers = []
    cartons = sorted(cartons, key=lambda c: c.volume, reverse=True)  # sort cartons by volume

    for carton in cartons:
        placed = False
        for container in containers:
            rotation = container.can_fit(carton)
            if rotation:
                container.place_carton(carton, rotation)
                placed = True
                break

        if not placed:
            new_container = Container(*container_dimensions)
            rotation = new_container.can_fit(carton)
            if rotation:
                new_container.place_carton(carton, rotation)
                containers.append(new_container)

    return containers

# Example usage
container_dims = (20, 10, 5)  # container dimensions (width, height, length)
cartons = [
    Carton(20, 10, 5),
    Carton(20, 10, 5),
    Carton(1, 1, 1)
]

containers = pack_cartons_into_containers(cartons, container_dims)

print(f"Total containers used: {len(containers)}")
for i, container in enumerate(containers):
    print(f"Container {i + 1}:")
    for item in container.items:
        print(f"  Item dimensions: {item}")
