module.exports = {
  status: ['$filter', function ($filter) {
    return function (input) {
      if(input === 0) return 'PENDING';
      if(input === 1) return 'ERROR';
      if(input === 2) return 'FAILED';
      if(input === 3) return 'DONE';
      return 'UNKNOWN STATUS';
    };
  }]
}