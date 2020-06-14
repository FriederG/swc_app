export default (value) => {
  const date = new Date(value);
  return date.toLocaleString(["de-AT"], {
    weekday: "short",
    //month: "short",
    //day: "2-digit",
    //year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
