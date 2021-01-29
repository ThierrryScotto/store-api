'use strict';

module.exports.product = {
  body: {
    name        : "name_test",
    category    : "category_test",
    price       : 2.52,
    sizes       : [44, 46, 48],
    colors      : ["colors_test"],
    amount      : 20,
    gender      : "gender_test",
    description : "description_test",
    status      : 1
  },
  edit: {
    name        : "test_name",
    category    : "test_category",
    price       : 5,
    sizes       : [48, 46, 44],
    colors      : ["colors_test"],
    amount      : 10,
    gender      : "test_gender",
    description : "test_description",
    status      : 1
  },
  notFound: { 
    _id : '600252d206a8cb00f035f724'
  },
  error: {
    id        : '600252d206a8cb00f035f724',
    name      : "name_test",
    category  : "category",
    price     : 2.52
  }
};