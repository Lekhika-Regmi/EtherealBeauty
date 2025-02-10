module.exports = {
  async up(queryInterface, Sequelize) {
    // Add new column govtIssuedIds (JSON format)
    await queryInterface.addColumn("Vendors", "govtIssuedIds", {
      type: Sequelize.STRING, // Store JSON string (Sequelize does not support JSON in SQLite)
      allowNull: true,
    });

    // Fetch all existing vendors
    const vendors = await queryInterface.sequelize.query(
      `SELECT id, govtIssuedId1, govtIssuedId2 FROM "Vendors";`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    // Migrate existing data
    for (const vendor of vendors) {
      const govtIssuedIds = JSON.stringify(
        [vendor.govtIssuedId1, vendor.govtIssuedId2].filter(Boolean)
      );

      await queryInterface.sequelize.query(
        `UPDATE "Vendors" SET "govtIssuedIds" = :govtIssuedIds WHERE id = :id;`,
        {
          replacements: { govtIssuedIds, id: vendor.id },
          type: queryInterface.sequelize.QueryTypes.UPDATE,
        }
      );
    }

    // Drop old columns
    await queryInterface.removeColumn("Vendors", "govtIssuedId1");
    await queryInterface.removeColumn("Vendors", "govtIssuedId2");
  },

  async down(queryInterface, Sequelize) {
    // Re-add old columns if rollback is needed
    await queryInterface.addColumn("Vendors", "govtIssuedId1", {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn("Vendors", "govtIssuedId2", {
      type: Sequelize.STRING,
      allowNull: true,
    });

    // Fetch all vendors to restore old data
    const vendors = await queryInterface.sequelize.query(
      `SELECT id, govtIssuedIds FROM "Vendors";`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    for (const vendor of vendors) {
      const govtIssuedIds = JSON.parse(vendor.govtIssuedIds || "[]");
      const govtIssuedId1 = govtIssuedIds[0] || null;
      const govtIssuedId2 = govtIssuedIds[1] || null;

      await queryInterface.sequelize.query(
        `UPDATE "Vendors" SET "govtIssuedId1" = :govtIssuedId1, "govtIssuedId2" = :govtIssuedId2 WHERE id = :id;`,
        {
          replacements: { govtIssuedId1, govtIssuedId2, id: vendor.id },
          type: queryInterface.sequelize.QueryTypes.UPDATE,
        }
      );
    }

    // Remove the new column
    await queryInterface.removeColumn("Vendors", "govtIssuedIds");
  }
};
