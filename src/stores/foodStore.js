import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useFoodStore = defineStore("food", {
  state: () => ({
    foods: [
      {
        rID: 1,
        foods: [
          {
            name: "hamburger",
            price: 10,
            imageUrl:
              "https://fastly.picsum.photos/id/518/200/200.jpg?hmac=nY2cAnZ0_ItWhhAsJ_XL3RsNkDo7_zobodK8FWIoCDM",
          },
          {
            name: "chicken",
            price: 15,
            imageUrl:
              "https://fastly.picsum.photos/id/206/200/200.jpg?hmac=4sOfaJaxYl_SjIfzFMVrIqIi3bdvwGke2r0MBg7Q1i8",
          },
          {
            name: "fries",
            price: 5,
            imageUrl:
              "https://fastly.picsum.photos/id/608/200/200.jpg?hmac=-p1htX-mFieavdRDr9vUIJKyDHCXZAY5B35nhdcgIgQ",
          },
          {
            name: "soda",
            price: 2,
            imageUrl:
              "https://fastly.picsum.photos/id/310/200/200.jpg?hmac=gpEKQ-zUG9L-jZga6K0jQ2NHHqqoPzMKUR-_ZmiL734",
          },
          {
            name: "salad",
            price: 7,
            imageUrl:
              "https://fastly.picsum.photos/id/1062/200/200.jpg?hmac=F_trr44XLYeth1u5FIqJIgtD4pR7WOlzKZ2xrQ3tzww",
          },
          {
            name: "pizza",
            price: 12,
            imageUrl:
              "https://fastly.picsum.photos/id/806/200/200.jpg?hmac=Bjuj5EjPlNaE2kT8ABN920giQlNy0lKelxx9zh5rrhw",
          },
        ],
      },
      {
        rID: 2,
        foods: [
          {
            name: "sushi",
            price: 20,
            imageUrl: "https://picsum.photos/200?random=7",
          },
          {
            name: "ramen",
            price: 14,
            imageUrl: "https://picsum.photos/200?random=8",
          },
          {
            name: "tempura",
            price: 18,
            imageUrl: "https://picsum.photos/200?random=9",
          },
          {
            name: "udon",
            price: 12,
            imageUrl: "https://picsum.photos/200?random=10",
          },
          {
            name: "takoyaki",
            price: 10,
            imageUrl: "https://picsum.photos/200?random=11",
          },
        ],
      },
      {
        rID: 3,
        foods: [
          {
            name: "spaghetti",
            price: 13,
            imageUrl: "https://picsum.photos/200?random=12",
          },
          {
            name: "lasagna",
            price: 16,
            imageUrl: "https://picsum.photos/200?random=13",
          },
          {
            name: "carbonara",
            price: 14,
            imageUrl: "https://picsum.photos/200?random=14",
          },
          {
            name: "garlic bread",
            price: 5,
            imageUrl: "https://picsum.photos/200?random=15",
          },
          {
            name: "pesto",
            price: 11,
            imageUrl: "https://picsum.photos/200?random=16",
          },
          {
            name: "bruschetta",
            price: 8,
            imageUrl: "https://picsum.photos/200?random=17",
          },
        ],
      },
    ],
    selectedFood: {},
  }),
  actions: {
    getFood(resID) {
      return (this.selectedFood = this.foods.find(
        (food) => food.rID === resID
      ));
    },
  },
});
