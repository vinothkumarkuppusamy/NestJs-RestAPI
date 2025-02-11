import { faker } from "@faker-js/faker/.";
import { Property } from "src/entities/property.entity";
import { setSeederFactory } from "typeorm-extension";

export const propertyFactory = setSeederFactory(Property, (faker) => {
   
        const newProperty = new Property();
        newProperty.name = faker.location.street();
        newProperty.price = +faker.commerce.price({ min: 3000, max: 40000 }); 
        newProperty.description = faker.lorem.sentence();
        
        return newProperty;
});