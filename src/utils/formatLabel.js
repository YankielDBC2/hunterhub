export function formatGraphLabels(interval, filter, type = "xAxis") {
  if (!interval) return "";

  // 📅 Soporte para semanas tipo 2025-W24 → convertir a fecha (lunes de esa semana ISO)
  if (/^\d{4}-W\d{2}$/.test(interval)) {
    const [yearStr, weekStr] = interval.split("-W");
    const year = parseInt(yearStr, 10);
    const week = parseInt(weekStr, 10);

    // Calcular el lunes de la semana ISO
    const simple = new Date(year, 0, 1 + (week - 1) * 7);
    const dow = simple.getDay(); // día de la semana
    const ISOstart = new Date(simple);
    if (dow <= 4) {
      ISOstart.setDate(simple.getDate() - simple.getDay() + 1);
    } else {
      ISOstart.setDate(simple.getDate() + 8 - simple.getDay());
    }

    if (type === "xAxis") {
      return `${ISOstart.getDate().toString().padStart(2, "0")}/${ISOstart.getMonth() + 1}`;
    }

    if (type === "tooltip") {
      const formattedDate = ISOstart.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      return `${formattedDate} – 00:00`;
    }

    return interval;
  }

  // 🌙 Soporte para fechas completas tipo 2025-07-21 16:30
  const [datePart, timePart] = interval.split(" ");
  const [year, month, day] = (datePart || "").split("-").map(Number);
  const date = new Date(year, (month || 1) - 1, day || 1);

  const normalizedFilter = filter === "30d" ? "month" : filter;

  if (type === "xAxis") {
    switch (normalizedFilter) {
      case "today":
        return timePart?.slice(0, 5) || ""; // HH:MM
      case "week":
      case "month":
        return `${day.toString().padStart(2, "0")}/${month}`;
      default:
        return interval;
    }
  }

  if (type === "tooltip") {
    const formattedDate = date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const formattedTime = timePart?.slice(0, 5) || "00:00";
    return `${formattedDate} – ${formattedTime}`;
  }

  return interval;
}
