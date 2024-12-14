// console.clear()
// const foo = (callback) => {
//      setTimeout(() => {
//          callback('A');
//      }, Math.floor(Math.random() * 100));
// };
// const bar = (callback) => {
//      setTimeout(() => {
//          callback('B');
//      }, Math.floor(Math.random() * 100));
// };
// const baz = (callback) => {
//      setTimeout(() => {
//          callback('C');
//      }, Math.floor(Math.random() * 100));
// };

// const promisifyArr = (...args) => {
//     return args.map(func => {
//         return new Promise(func)
//     })
// }

// const result = () => {
//     Promise.all(promisifyArr(baz, foo, bar))
//         .then(console.log)
// }

// result()
/*
    Даны три функции foo, bar, baz. Эти функции менять нельзя.
    Все функции имеют одинаковую сигнатуру: принимает два колбека и через случайное время выполняет один из них

    Функция foo - отвечает за группу А/В
    Функция bar - отвечает за группу C/D
    Функция baz - отвечает за группу E/F

    Необходимо написать функцию reault, которая в консоль выведет массив ['C/D', 'A/B', 'E/F']

    P.S. Вызов функции result и порядок передачи аргументов менять нельзя,
    все преобразования необходимо производить внутри result
*/
const foo = (callback1, callback2) => {
  // Goup [A, B]
  setTimeout(() => {
    if (!!Math.floor(Math.random() * 2)) {
      callback1("A");
    } else {
      callback2("B");
    }
  }, Math.floor(Math.random() * 100));
};

const bar = (callback1, callback2) => {
  // Goup [C, D]
  setTimeout(() => {
    if (!!Math.floor(Math.random() * 2)) {
      callback1("C");
    } else {
      callback2("D");
    }
  }, Math.floor(Math.random() * 100));
};

const baz = (callback1, callback2) => {
  // Goup [E, F]
  setTimeout(() => {
    if (!!Math.floor(Math.random() * 2)) {
      callback1("E");
    } else {
      callback2("F");
    }
  }, Math.floor(Math.random() * 100));
};

const promisify = (func, groupLabel) => {
  return new Promise((resolve) => {
    func(
      () => resolve(groupLabel),
      () => resolve(groupLabel)
    );
  });
};

const result = () => {
  Promise.all([
    promisify(bar, "C/D"),
    promisify(foo, "A/B"),
    promisify(baz, "E/F"),
  ]).then((result) => console.log(result));
};

result();
