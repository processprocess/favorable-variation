const noValidation = () => {
  return true
}

const validateNotBlank = (value) => {
  const stringWithoutWhitespace = value.replace(/\s/g,'');
  return stringWithoutWhitespace.length > 0
}

const validateLength = (length) => {
  return (value) => {
    return value.length === length;
  }
}

const validateEmailFormat = (value) => {
  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(value)
}

const standardInputMiddleware = (value) => {
  return value;
}

const limitLengthNumbersOnly = (length) => {
  return (value, previousValue) => {
    const v = value.split('').filter((char) => /^[0-9]*$/.test(char) ).join('')
    if (v.length > length) {
      return previousValue
    }
    return v;
  }
}

const limitLengthDollars = (length) => {
  return (value, previousValue) => {
    const v = value.split('').filter((char) => /^[0-9]*$/.test(char) ).join('')
    if (v.length > length) {
      return previousValue
    }
    if (parseInt(v) > 0)
      return '$' + v;
    else return v;
  }
}

const phoneMask = (value, previousValue) => {
  const nums = value.split('').filter((char) => /^[0-9]*$/.test(char) )

  // stop taking input at length 10
  if (nums.length > 10) {
    return previousValue
  }

  if (nums.length < 4) {
    return nums.join('')
  }

  if (nums.length < 7) {
    return `${nums.slice(0,3).join('')}-${nums.slice(3).join('')}`
  }

  return `${nums.slice(0,3).join('')}-${nums.slice(3,6).join('')}-${nums.slice(6).join('')}`

  // additional digits for international numbers
  // return `${nums.slice(0,-10).join('')}.${nums.slice(-10,-7).join('')}.${nums.slice(-7,-4).join('')}.${nums.slice(-4).join('')}`

}

const dateMask = (value, previousValue) => {
  const nums = value.split('').filter((char) => /^[0-9]*$/.test(char) )

  // stop taking input at length 8
  if (nums.length > 8) {
    return previousValue
  }

  // short input, just check day and do not add slashes
  const month = nums.slice(0,2).join('');
  if (nums.length < 3) {
    if (month === '' || parseInt(month, 10) < 13) {
      return month;
    } else {
      return previousValue;
    }
  }

  // longer input, check day and month and add slashes
  const day = nums.slice(2,4).join('');
  if (parseInt(day, 10) < 32 && parseInt(month, 10) < 13) {
    if (nums.length > 4) {
      return `${month}/${day}/${nums.slice(4).join('')}`
    } else {
      return `${month}/${day}`
    }
  } else {
    return previousValue;
  }

}

const zipCode = (value, previousValue) => {
  const nums = value.split('').filter((char) => /^[0-9]*$/.test(char) ).join('')

  if (nums.length > 5) {
    return previousValue
  }
  return nums;
}

const numbersOnly = (value) => {
  return value.split('').filter((char) => /^[0-9]*$/.test(char) ).join('')
}

const labelFromName = (str) => {
  return str.split('_').map(function (word) {
      return word.charAt(0).toUpperCase() + word.substring(1);
  }).join(' ');
}

export {
  noValidation,
  validateNotBlank,
  validateLength,
  validateEmailFormat,
  standardInputMiddleware,
  limitLengthNumbersOnly,
  phoneMask,
  dateMask,
  numbersOnly,
  zipCode,
  labelFromName,
  limitLengthDollars
}