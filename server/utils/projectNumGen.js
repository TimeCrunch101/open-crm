let projectCounter = 0;
let projectIteration = new Date().getDate()
let projectNumber;

const projectNumGen = () => {
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
        if (projectIteration === new Date().getDate()) {
          projectCounter++;
          switch (projectCounter.toString().length) {
            case 1:
              projectNumber = "00" + projectCounter.toString();
              break;
            case 2:
              projectNumber = "0" + projectCounter.toString();
              break;
            case 3:
              projectNumber = projectCounter.toString();
              break;
          }
        } else {
          iteration = new Date().getDate();
          projectCounter = 1;
          projectNumber = "00" + projectCounter.toString();
        }
        const projectNumConcat = "P" + year + month + day + "." + projectNumber;
        resolve(projectNumConcat)
    })
};

module.exports = {
  projectNumGen: projectNumGen,
}