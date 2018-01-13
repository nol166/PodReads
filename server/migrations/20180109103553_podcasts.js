
exports.up = function(knex, Promise) {
  return knex.schema.createTable('podcasts', (table) => {
    table.increments();
    table.string('email').notNullable().defaultTo('');
    table.string('hashed_password').notNullable().defaultTo('');
    table.string('name').notNullable().defaultTo('');
    table.string('itunes_url').notNullable().defaultTo('');
    table.string('website').defaultTo('');
    table.string('reader').defaultTo('');
    table.text('summary').defaultTo('');
    table.string('demo').defaultTo('');
    table.string('subject').defaultTo('');
    table.string('profile_image').defaultTo('');
    table.string('images').defaultTo('');
    table.string('contact').defaultTo('');
    table.timestamps(true, true);
    table.text('tags').defaultTo('');
  })
};


exports.down = function(knex) {
  return knex.schema.dropTable('podcasts');
};
