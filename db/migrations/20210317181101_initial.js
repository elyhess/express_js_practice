// Up defines what should happen when we run the migration. (i.e. What changes do we want to make to our database?)
exports.up = function(knex) {
  return Promise.all([
    knex.schema.createTable('papers', function(table) {
      table.increments('id').primary();
      table.string('title');
      table.string('author');

      table.timestamps(true, true);
    }),

    knex.schema.createTable('footnotes', function(table) {
      table.increments('id').primary();
      table.string('notes');
      table.integer('paper_id').unsigned();
      table.foreign('paper_id')
        .references('papers.id');

      table.timestamps(true, true);
    })
  ])
};
// down is the reverse. If we want to roll back to a previous version, then down undoes whatever up did.
exports.down = function(knex) {
  return Promise.all([
    knex.schema.dropTable('footnotes'),
    knex.schema.dropTable('papers')
  ])
};
