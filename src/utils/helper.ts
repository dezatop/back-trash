function filterFields(body: { [k: string]: any }, arrayCheckField: string[]) {
  const filteredBody: { [k: string]: any } = {};

  Object.keys(body).filter((k) => {
    if (arrayCheckField.includes(k)) {
      filteredBody[k] = body[k];
    }
  });

  return filteredBody;
}

export { filterFields };
