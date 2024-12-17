export const workshopData = [
  {
    name: "Elf Tiberius III",
    toysMade: {
      "Teddy Bear": 10,
      "Race Car": 5,
      Doll: 7,
    },
    toysShipped: {
      NorthPole: {
        MainWarehouse: [
          { toy: "Teddy Bear", count: 3 },
          { toy: "Race Car", count: 5 },
        ],
        Overflow: [{ toy: "Teddy Bear", count: 2 }],
      },
      Europe: {
        Germany: [{ toy: "Teddy Bear", count: 5 }],
        France: [{ toy: "Doll", count: 7 }],
      },
    },
  },
  {
    name: "Elf Herbert Drinklater",
    toysMade: {
      Puzzle: 15,
      Blocks: 20,
    },
    toysShipped: {
      Asia: {
        Japan: [{ toy: "Puzzle", count: 15 }],
        China: [{ toy: "Blocks", count: 5 }],
      },
      NorthAmerica: {
        Canada: [{ toy: "Blocks", count: 5 }],
        USA: [{ toy: "Blocks", count: 10 }],
      },
    },
  },
  {
    name: "Elf Kalvin Armadillo",
    toysMade: {
      Drone: 3,
      Robot: 10,
    },
    toysShipped: {
      SouthAmerica: {
        Brazil: [{ toy: "Drone", count: 1 }],
        Argentina: [],
      },
      Oceania: {
        Australia: [{ toy: "Robot", count: 5 }],
        Fiji: [{ toy: "Robot", count: 5 }],
      },
    },
  },
  {
    name: "Elf Ernest Tinkerer",
    toysMade: {
      "Board Game": 3,
      Doll: 18,
    },
    toysShipped: {
      SouthAmerica: {
        Brazil: [{ toy: "Board Game", count: 3 }],
        Argentina: [],
      },
      Africa: {
        Nigeria: [{ toy: "Doll", count: 10 }],
        Namibia: [{ toy: "Doll", count: 8 }],
      },
    },
  },
];
