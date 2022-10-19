//пишем обёртку для jQuery что бы он выполнялся, когда документ загружен полностью

$(document).ready(function () {
  //ВЫБОР ЦВЕТА - на цену не влияет
  //находим тег и вешаем на него действие
  $('#colorSelector .colorItem').on('click', function () {
    //создаем переменную,в которую поместим путь(src) до нужной картинки из атрибута data-img-path
    let imgSrc = $(this).attr('data-img-path');
    //меняем значение нужного атрибута на то, что лежит в переменной
    $('#container-img img').attr('src', imgSrc);
  });

  //калькулятор цены

  //создадим нужные переменные
  let modelSpecs, //выбранные характеристики модели
    modelPrice, //цена модели
    specsHolder, //итоговый тег куда помещаем специф
    priceHolder; //итоговый тег куда помещаем цену

  //запишем те переменные, которые определены
  specsHolder = $('#model-name span');
  priceHolder = $('#model-price');

  //зададим начальные параметры
  modelSpecs = '';
  modelPrice = 0;

  //напишем функцию которая будет считать нашу цену:
  function calculatePrice() {
    //определим переменные которые будут складываться
    modelPriceRemember = $('input[name=remember]:checked', '#autoForm').val();

    modelPriceCondition = $('input[name=condition]:checked').val();
    //переведём переменные в числовое значение
    modelPriceRemember = Number(modelPriceRemember);
    modelPriceCondition = Number(modelPriceCondition);
    // сложим значения
    modelPrice = modelPriceRemember + modelPriceCondition;

    //поместим цену в определенный тег на странице
    priceHolder.text(`${addSpace(modelPrice)} рублей`);

    //получаем курс валют с API (с этим я пока не разобралась как работать )
    // let myHeaders = new Headers();
    // myHeaders.append("apikey", "d8myJ9YI758hTvROKvKNj6gHBGD6Ziuf");

    // let requestOptions = {
    // method: 'GET',
    // redirect: 'follow',
    // headers: myHeaders
    // };

    // const fetchResult = fetch(`https://api.apilayer.com/fixer/convert?to=USD&from=RUB&amount=${modelPrice}`, requestOptions)
    // .then(response => response.text())
    // .then(result => console.log(result))
    // .catch(error => console.log('error', error));

    // console.log(resultRate.result);
  }

  function compileSpecs() {
    //поместим в переменную текст выбранных характеристик
    modelSpecs = $('input[name=remember]:checked+label').text();
    modelSpecs =
      modelSpecs + ',' + $('input[name=condition]:checked+label').text();
    //поместим в тег где будет выводиться информация эту переменную
    specsHolder.text(`${modelSpecs}`);
  }

  //пропишем что эта функция будет вызываться когда будут изменения в выборе
  $('#autoForm input').on('change', function () {
    calculatePrice();
    compileSpecs();
  });

  //функция которая добавляет пробел к числу для удобства чтения(где цена)
  function addSpace(nStr) {
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    let rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, '$1' + ' ' + '$2');
    }
    return x1 + x2;
  }
});
