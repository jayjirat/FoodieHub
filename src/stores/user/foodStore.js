import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useFoodStore = defineStore("food", {
  state: () => ({
    foods: [
      {
        rID: 1,
        foods: [
          {
            fID: 1,
            name: "hamburger",
            price: 10,
            imageUrl:
              "https://fastly.picsum.photos/id/518/200/200.jpg?hmac=nY2cAnZ0_ItWhhAsJ_XL3RsNkDo7_zobodK8FWIoCDM",
            quantity: 100,
            remainQuantity: 100,
          },
          {
            fID: 2,
            name: "chicken",
            price: 15,
            imageUrl:
              "https://fastly.picsum.photos/id/206/200/200.jpg?hmac=4sOfaJaxYl_SjIfzFMVrIqIi3bdvwGke2r0MBg7Q1i8",
            quantity: 150,
            remainQuantity: 150,
          },
          {
            fID: 3,
            name: "fries",
            price: 5,
            imageUrl:
              "https://fastly.picsum.photos/id/608/200/200.jpg?hmac=-p1htX-mFieavdRDr9vUIJKyDHCXZAY5B35nhdcgIgQ",
            quantity: 200,
            remainQuantity: 200,
          },
          {
            fID: 4,
            name: "soda",
            price: 2,
            imageUrl:
              "https://fastly.picsum.photos/id/310/200/200.jpg?hmac=gpEKQ-zUG9L-jZga6K0jQ2NHHqqoPzMKUR-_ZmiL734",
            quantity: 500,
            remainQuantity: 500,
          },
          {
            fID: 5,
            name: "salad",
            price: 7,
            imageUrl:
              "https://fastly.picsum.photos/id/1062/200/200.jpg?hmac=F_trr44XLYeth1u5FIqJIgtD4pR7WOlzKZ2xrQ3tzww",
            quantity: 80,
            remainQuantity: 80,
          },
          {
            fID: 6,
            name: "pizza",
            price: 12,
            imageUrl:
              "https://fastly.picsum.photos/id/806/200/200.jpg?hmac=Bjuj5EjPlNaE2kT8ABN920giQlNy0lKelxx9zh5rrhw",
            quantity: 60,
            remainQuantity: 60,
          },
        ],
      },
      {
        rID: 2,
        foods: [
          {
            fID: 1,
            name: "hamburger",
            price: 10,
            imageUrl:
              "https://fastly.picsum.photos/id/518/200/200.jpg?hmac=nY2cAnZ0_ItWhhAsJ_XL3RsNkDo7_zobodK8FWIoCDM",
            quantity: 100,
            remainQuantity: 100,
          },
          {
            fID: 2,
            name: "chicken",
            price: 15,
            imageUrl:
              "https://fastly.picsum.photos/id/206/200/200.jpg?hmac=4sOfaJaxYl_SjIfzFMVrIqIi3bdvwGke2r0MBg7Q1i8",
            quantity: 150,
            remainQuantity: 150,
          },
          {
            fID: 3,
            name: "fries",
            price: 5,
            imageUrl:
              "https://fastly.picsum.photos/id/608/200/200.jpg?hmac=-p1htX-mFieavdRDr9vUIJKyDHCXZAY5B35nhdcgIgQ",
            quantity: 200,
            remainQuantity: 200,
          },
          {
            fID: 4,
            name: "soda",
            price: 2,
            imageUrl:
              "https://fastly.picsum.photos/id/310/200/200.jpg?hmac=gpEKQ-zUG9L-jZga6K0jQ2NHHqqoPzMKUR-_ZmiL734",
            quantity: 500,
            remainQuantity: 500,
          },
          {
            fID: 5,
            name: "salad",
            price: 7,
            imageUrl:
              "https://fastly.picsum.photos/id/1062/200/200.jpg?hmac=F_trr44XLYeth1u5FIqJIgtD4pR7WOlzKZ2xrQ3tzww",
            quantity: 80,
            remainQuantity: 80,
          },
          {
            fID: 6,
            name: "pizza",
            price: 12,
            imageUrl:
              "https://fastly.picsum.photos/id/806/200/200.jpg?hmac=Bjuj5EjPlNaE2kT8ABN920giQlNy0lKelxx9zh5rrhw",
            quantity: 60,
            remainQuantity: 60,
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
