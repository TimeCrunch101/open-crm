let counter = 0;
let iteration = new Date().getDate();
let ticketNumber;

const ticketNumGen = () => {
  return new Promise((resolve, reject) => {
    const year = new Date().getFullYear().toString();
    let day = new Date().getDate().toString();
    let month = new Date().getMonth().toString();
    if (day.length !== 2) {
      day = "0" + day;
    }
    if (month.length !== 2) {
      if (month === 0) {
        month = "01";
      } else {
        month = "0" + month;
      }
    }
    if (iteration === new Date().getDate()) {
      counter++;
      switch (counter.toString().length) {
        case 1:
          ticketNumber = "00" + counter.toString();
          break;
        case 2:
          ticketNumber = "0" + counter.toString();
          break;
        case 3:
          ticketNumber = counter.toString();
          break;
      }
    } else {
      iteration = new Date().getDate();
      counter = 1;
      ticketNumber = "00" + counter.toString();
    }
    const ticketNumberConcat = "T" + year + month + day + "." + ticketNumber;
    resolve(ticketNumberConcat);
  });
};

module.exports = {
  ticketNumGen: ticketNumGen,
};
