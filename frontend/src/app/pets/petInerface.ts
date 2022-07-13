export default interface PetInterface {
  petName: string;
  birthDate: Date;
  breed: string;
  expectedSize: number;
  price: number;
  weight: number;
  img?: string;
  parentBreed: {
    mom: string;
    dad: string;
  };
  location: number[];
}
