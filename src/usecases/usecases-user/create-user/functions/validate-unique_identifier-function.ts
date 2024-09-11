export function validateUniqueIdentifierFunction(unique_identifier: string) {
  if (
    unique_identifier.length != 11 ||
    !Array.from(unique_identifier).filter((e) => e != unique_identifier[0])
      .length
  ) {
    return false;
  }

  var sum = 0;
  var remainder;

  for (var i = 1; i <= 9; i++) {
    sum = sum + parseInt(unique_identifier.substring(i - 1, i)) * (11 - i);
  }

  remainder = (sum * 10) % 11;

  if (remainder == 10 || remainder == 11) {
    remainder = 0;
  }

  if (remainder != parseInt(unique_identifier.substring(9, 10))) {
    return false;
  }

  sum = 0;

  for (var i = 1; i <= 10; i++) {
    sum = sum + parseInt(unique_identifier.substring(i - 1, i)) * (12 - i);
  }

  remainder = (sum * 10) % 11;

  if (remainder == 10 || remainder == 11) {
    remainder = 0;
  }

  if (remainder != parseInt(unique_identifier.substring(10, 11))) {
    return false;
  }

  return true;
}
