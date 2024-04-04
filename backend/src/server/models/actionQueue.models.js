'use strict';

// Mock database, replace this with your db models, required to perform query to your database.

const actionQueue = () => {
  const actions = [];

  const addImage= (imageData) => {
    return new Promise(function (res) {
      res();
    }).then(() => {

    });
  };

  return {
    actions,
    addImage,
  };
};

module.exports = actionQueue();