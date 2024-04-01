import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

export async function GET() {
  return Response.json({
    dishes: [
      {
        id: "hleb",
        name: "Хлеб",
        items: [
          {
            id: 1,
            name: "Фокачча Пшеничная",
            description: "на цельнозерновой закваске и оливковом масле",
            price: 300,
            img: "/b1.png",
          },
          {
            id: 2,
            name: "Пшеничный",
            description: "наш вариант французской булки",
            price: 450,
            img: "/b2.png",
          },
          {
            id: 3,
            name: "фокачча",
            description: "ржаная с двумя видами муки и солодом",
            price: 999,
            img: "/b3.png",
          },
          {
            id: 4,
            name: "фокачча пшеничная",
            description: "на цельнозерновой закваске и оливковом масле",
            price: 99,
            img: "/b4.png",
          },
        ],
      },

      {
        id: "zavtraki",
        name: "Завтраки",
        nameSrc: "/zavtraki.svg",
        timeFrom: "8.00",
        timeTo: "16.00",
        items: [
          {
            id: 5,
            name: "Фокачча Пшеничная",
            description: "на цельнозерновой закваске и оливковом масле",
            price: 300,
            img: "/b1.png",
          },
          {
            id: 6,
            name: "Пшеничный",
            description: "наш вариант французской булки",
            price: 450,
            img: "/b2.png",
          },
          {
            id: 7,
            name: "фокачча",
            description: "ржаная с двумя видами муки и солодом",
            price: 999,
            img: "/b3.png",
          },
          {
            id: 8,
            name: "фокачча пшеничная",
            description: "на цельнозерновой закваске и оливковом масле",
            price: 99,
            img: "/b4.png",
          },
        ],
      },
    ],
  });
}
