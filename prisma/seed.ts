import { faker } from "@faker-js/faker";
import { db } from "../src/db";

async function main() {
  await db.user.createMany({
    data: Array.from({ length: 132 }).map(() => ({
      companyEmail: faker.internet.email(),
      companyName: faker.company.name(),
      firstName: faker.person.firstName(),
      jobTitle: faker.person.jobTitle(),
      lastName: faker.person.lastName(),
      partnershipType: faker.helpers.arrayElement(["Referral", "Reseller"]),
      phone: faker.phone.number(),
      country: faker.location.country(),
      state: faker.location.state(),
      remark: faker.lorem.lines({ min: 1, max: 4 }),
      applicationStatus: faker.helpers.arrayElement([
        "Approved",
        "UnderProcess",
        "Submitted",
        "Rejected",
      ]),
    })),
  });
}
main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
