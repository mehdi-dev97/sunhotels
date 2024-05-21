export type Parameters = {
    destinationID: number,
    checkInDate: string,
    checkOutDate: string,
    numberOfRooms: number,
    accommodationTypes: string,
    CustomerCountry: string,
    language: string,
    currencies: string,
    numberOfAdults: number,
    numberOfChildren: number,
    hotelIDs?: string,
    childrenAges?: string,
    infant?: number,
    minPrice?: number,
    maxPrice?: number,
    minStarRating?: number,
    maxStarRating?: number,
    featureIds?: string,
    mealIds?: string,
    themeIds?: string,
    sortBy?: string,
    sortOrder?: string,
    exactDestinationMatch?: string,
    blockSuperdeal?: number,
    referencePointLatitude?: string,
    referencePointLongitude?: string,
    totalRoomsInBatch?: string,
}

export type RoomType = {
    roomId: number,
    mealId: number
};