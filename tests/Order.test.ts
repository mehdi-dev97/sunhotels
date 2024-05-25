import { describe, expect, test } from "@jest/globals";
import Client from "../src/Client";
import { Book, BookingGetter, PreBook } from "../src/types";

describe("Order module test", () => {
  const client = new Client("API_USERNAME", "API_PASSWORD");

  // test pre book order
  test("test pre book order", async () => {
    const params: PreBook = {
      currency: "USD",
      language: "en",
      searchPrice: 38,
      checkInDate: "2024-06-01",
      checkOutDate: "2024-06-02",
      email: "supportemail@email.com",
      rooms: 1,
      roomId: "176936782",
      mealId: "3",
      adults: 1,
      children: 0,
      infant: 0,
      customerCountry: "FR",
      childrenAges: "",
      hotelId: "",
      roomtypeId: "",
      blockSuperDeal: "",
      showPriceBreakdown: "",
      B2C: "",
      specialrequest: "",
      yourRef: "DERF89",
    };
    const preBook = await client.order.preBook(params);

    expect(preBook).toEqual(
      expect.objectContaining({
        status: expect.any(Boolean),
        preBookCode: expect.any(String),
        price: expect.any(Number),
        notes: expect.any(Array),
        cancellationPolicies: expect.any(Array),
      })
    );
  });

  // test pre book order
  test("test book order", async () => {
    const params: Book = {
      currency: "USD",
      language: "en",
      checkInDate: "2024-06-01",
      checkOutDate: "2024-06-02",
      email: "supportemail@email.com",
      rooms: "1",
      roomId: "176936782",
      mealId: "3",
      adults: "1",
      children: "0",
      infant: "0",
      customerCountry: "FR",
      b2c: "",
      specialrequest: "",
      yourRef: "DERF89",
      preBookCode: "8483484f-3534-4f5f-a14c-55509249097f",
      customerEmail: "clientEmail@email.com",
      paymentMethodId: "1",
      creditCardType: "",
      creditCardNumber: "",
      creditCardHolder: "",
      creditCardCVV2: "",
      creditCardExpYear: "",
      creditCardExpMonth: "",
      invoiceRef: "",
      commissionAmountInHotelCurrency: "",
    };
    const guests = [
      {
        type: "adult",
        firstName: "Mehdi",
        lastName: "Ait Mouh",
      },
    ];

    const book = await client.order.book(params, guests);

    expect(book).toEqual(
      expect.objectContaining({
        bookingnumber: expect.any(String),
        "hotel.id": expect.any(Number),
        "hotel.name": expect.any(String),
        "hotel.address": expect.any(String),
        "hotel.phone": expect.any(String),
        numberofrooms: expect.any(Number),
        "room.type": expect.any(String),
        "room.englishType": expect.any(String),
        mealId: expect.any(Number),
        meal: expect.any(String),
        mealLabel: expect.any(String),
        englishMeal: expect.any(String),
        englishMealLabel: expect.any(String),
        checkindate: expect.any(Date),
        checkoutdate: expect.any(Date),
        prices: expect.any(Array),
        currency: expect.any(String),
        bookingdate: expect.any(Date),
        "bookingdate.timezone": expect.any(Date),
        cancellationpolicies: expect.any(Array),
        "earliestNonFreeCancellationDate.CET": expect.any(Date),
        "earliestNonFreeCancellationDate.Local": expect.any(Date),
        yourref: expect.any(String),
        voucher: expect.any(String),
        bookedBy: expect.any(String),
        transferbooked: expect.any(Number),
        paymentmethod: expect.any(String),
        hotelNotes: expect.any(Array),
        englishHotelNotes: expect.any(Array),
        roomNotes: expect.any(String),
        englishRoomNotes: expect.any(String),
        invoiceref: expect.any(String),
      })
    );
  });

  // test get booking informations
  test("test get booking informations", async () => {
    const params: BookingGetter = {
      language: "en",
      bookingID: "3782883",
      reference: "",
      createdDateFrom: "",
      createdDateTo: "",
      arrivalDateFrom: "",
      arrivalDateTo: "",
      showGuests: 0,
    };
    const getBook = await client.order.get(params);

    expect(getBook).toEqual(
      expect.objectContaining({
        bookingnumber: expect.any(String),
        "hotel.id": expect.any(Number),
        "hotel.name": expect.any(String),
        "hotel.address": expect.any(String),
        "hotel.phone": expect.any(String),
        numberofrooms: expect.any(Number),
        "room.type": expect.any(String),
        "room.englishType": expect.any(String),
        mealId: expect.any(Number),
        meal: expect.any(String),
        mealLabel: expect.any(String),
        englishMeal: expect.any(String),
        englishMealLabel: expect.any(String),
        checkindate: expect.any(Date),
        checkoutdate: expect.any(Date),
        prices: expect.any(Array),
        currency: expect.any(String),
        bookingdate: expect.any(Date),
        "bookingdate.timezone": expect.any(Date),
        cancellationpolicies: expect.any(Array),
        "earliestNonFreeCancellationDate.CET": expect.any(Date),
        "earliestNonFreeCancellationDate.Local": expect.any(Date),
        yourref: expect.any(String),
        voucher: expect.any(String),
        bookedBy: expect.any(String),
        transferbooked: expect.any(Number),
        paymentmethod: expect.any(String),
        hotelNotes: expect.any(Array),
        englishHotelNotes: expect.any(Array),
        roomNotes: expect.any(String),
        englishRoomNotes: expect.any(String),
        invoiceref: expect.any(String),
      })
    );
  });

  // test cancel booking
  test("test cancel booking", async () => {
    const cancelation = await client.order.cancel("3782883", "en");

    expect(cancelation).toBeInstanceOf(Object);
  });
});
