  const formatDate = (date, shift) => {
    let dd = date.getDate() - shift;
    if (dd < 10) dd = '0' + dd;

    let mm = date.getMonth() + 1;
    if (mm < 10) mm = '0' + mm;

    let yy = date.getFullYear();

    return dd + '/' + mm + '/' + yy;
  }
  let shiftStart = 0
  const getRate = (shift) => {
    let formattedDate = formatDate(new Date(), shift)
    let url = `https://www.cbr.ru/scripts/XML_dynamic.asp?date_req1=${formattedDate}&date_req2=${formattedDate}&VAL_NM_RQ=R01235`
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
      }).then(response => response.text())
      .then(data => {
        let oParser = new DOMParser();
        let oDOM = oParser.parseFromString(data, "application/xml");
        const rateArray = Array.from(oDOM.documentElement.getElementsByTagName('Value'))
        if (!rateArray[0]) {
          return getRate(shiftStart += 1)
        }
        const el = document.getElementsByClassName('header__rate-number')
        return el[0].innerHTML = rateArray[0].textContent + ' руб.'
      })
      .catch(error => console.log(error))
  }
  getRate(shiftStart)

  const openToggle = () => {
    document.querySelector('.header__mobile-nav').classList.toggle('header__mobile-nav--opened')
    document.querySelector('.main__nav').classList.toggle('main__nav--open')
  }

  const visibleModal = () => {
      document.querySelector('.modal').classList.toggle('modal--invisible')
  }

  const login = (event) => {
    event.preventDefault()
    const userName = document.querySelector('.form__login').value
    document.querySelector('.btn-login__wrapper').innerHTML = userName
    visibleModal()
  }
